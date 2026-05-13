// ===== 在线服务模块 =====
// 基于 Firebase Realtime Database 的多人互动系统

const Online = (() => {
  let db = null;
  let auth = null;
  let currentUser = null;
  let onlineRef = null;
  let playersRef = null;
  let initialized = false;

  // 初始化 Firebase
  function init() {
    try {
      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK 未加载，离线模式运行');
        return false;
      }
      firebase.initializeApp(firebaseConfig);
      db = firebase.database();
      auth = firebase.auth();
      playersRef = db.ref('players');
      onlineRef = db.ref('online');
      initialized = true;
      return true;
    } catch (e) {
      console.warn('Firebase 初始化失败:', e);
      return false;
    }
  }

  // 匿名登录
  async function signIn(playerName) {
    if (!initialized) return false;
    try {
      const result = await auth.signInAnonymously();
      currentUser = result.user;
      // 用玩家昵称作为显示名
      await currentUser.updateProfile({ displayName: playerName });
      return true;
    } catch (e) {
      console.warn('登录失败:', e);
      return false;
    }
  }

  // 上传/同步玩家数据到云端
  async function syncPlayerData(gameState) {
    if (!initialized || !currentUser) return false;
    try {
      const playerData = {
        uid: currentUser.uid,
        name: currentUser.displayName || gameState.petName,
        petType: gameState.petType,
        petName: gameState.petName,
        growth: gameState.growth,
        intimacy: Math.floor(gameState.intimacy),
        mood: Math.floor(gameState.mood),
        coins: gameState.coins || 0,
        stage: getCurrentStageName(gameState.growth),
        furniture: (gameState.placedFurniture || []).length,
        lastOnline: firebase.database.ServerValue.TIMESTAMP,
        online: true
      };
      await playersRef.child(currentUser.uid).set(playerData);
      return true;
    } catch (e) {
      console.warn('同步失败:', e);
      return false;
    }
  }

  function getCurrentStageName(growth) {
    if (growth >= 600) return '完全体';
    if (growth >= 300) return '成熟期';
    if (growth >= 100) return '成长期';
    return '幼年期';
  }

  // 设置在线状态
  async function setOnline(gameState) {
    if (!initialized || !currentUser) return;
    try {
      const userRef = playersRef.child(currentUser.uid);
      await userRef.update({ online: true });

      // 断线时自动设为离线
      const presenceRef = db.ref(`players/${currentUser.uid}/online`);
      presenceRef.onDisconnect().set(false);

      // 同步数据
      await syncPlayerData(gameState);
    } catch (e) {}
  }

  // 设置离线
  async function setOffline() {
    if (!initialized || !currentUser) return;
    try {
      await playersRef.child(currentUser.uid).update({ online: false });
    } catch (e) {}
  }

  // 获取所有在线玩家（实时监听）
  function listenOnlinePlayers(callback) {
    if (!initialized) return () => {};
    try {
      const q = playersRef.orderByChild('online').equalTo(true);
      const handler = q.on('value', (snap) => {
        const players = [];
        snap.forEach(child => {
          const data = child.val();
          if (data && data.uid !== currentUser?.uid) {
            players.push(data);
          }
        });
        callback(players);
      });
      return () => playersRef.off('value', handler);
    } catch (e) {
      callback([]);
      return () => {};
    }
  }

  // 获取排行榜（按亲密度排序，取前20）
  function listenLeaderboard(callback) {
    if (!initialized) return () => {};
    try {
      const q = playersRef.orderByChild('intimacy').limitToLast(20);
      const handler = q.on('value', (snap) => {
        const players = [];
        snap.forEach(child => {
          const data = child.val();
          if (data) players.push(data);
        });
        players.reverse(); // 高分在前
        callback(players);
      });
      return () => playersRef.off('value', handler);
    } catch (e) {
      callback([]);
      return () => {};
    }
  }

  // 点赞
  async function likePlayer(targetUid) {
    if (!initialized || !currentUser) return false;
    try {
      const likeRef = db.ref(`likes/${targetUid}/${currentUser.uid}`);
      const snap = await likeRef.once('value');
      if (snap.exists()) {
        // 已经点过赞，取消
        await likeRef.remove();
        await db.ref(`players/${targetUid}/likes`).transaction(current => (current || 1) - 1);
        return false; // 取消赞
      } else {
        await likeRef.set(true);
        await db.ref(`players/${targetUid}/likes`).transaction(current => (current || 0) + 1);
        return true; // 点赞成功
      }
    } catch (e) {
      console.warn('点赞失败:', e);
      return null;
    }
  }

  // 检查是否已点赞
  async function hasLiked(targetUid) {
    if (!initialized || !currentUser) return false;
    try {
      const snap = await db.ref(`likes/${targetUid}/${currentUser.uid}`).once('value');
      return snap.exists();
    } catch (e) { return false; }
  }

  // 送礼物
  async function sendGift(targetUid, giftEmoji, giftName) {
    if (!initialized || !currentUser) return false;
    try {
      const giftRef = db.ref(`gifts/${targetUid}`).push();
      await giftRef.set({
        from: currentUser.displayName || '匿名',
        fromUid: currentUser.uid,
        emoji: giftEmoji,
        name: giftName,
        time: firebase.database.ServerValue.TIMESTAMP,
        read: false
      });
      return true;
    } catch (e) {
      console.warn('送礼失败:', e);
      return false;
    }
  }

  // 监听收到的礼物
  function listenGifts(callback) {
    if (!initialized || !currentUser) return () => {};
    try {
      const giftsRef = db.ref(`gifts/${currentUser.uid}`).orderByChild('read').equalTo(false);
      const handler = giftsRef.on('child_added', (snap) => {
        const gift = snap.val();
        if (gift) {
          gift.id = snap.key;
          callback(gift);
          // 标记为已读
          snap.ref.update({ read: true });
        }
      });
      return () => giftsRef.off('child_added', handler);
    } catch (e) { return () => {}; }
  }

  // 留言
  async function leaveMessage(targetUid, message) {
    if (!initialized || !currentUser) return false;
    try {
      const msgRef = db.ref(`messages/${targetUid}`).push();
      await msgRef.set({
        from: currentUser.displayName || '匿名',
        fromUid: currentUser.uid,
        text: message,
        time: firebase.database.ServerValue.TIMESTAMP
      });
      return true;
    } catch (e) { return false; }
  }

  // 监听留言
  function listenMessages(callback) {
    if (!initialized || !currentUser) return () => {};
    try {
      const msgRef = db.ref(`messages/${currentUser.uid}`).limitToLast(20);
      const handler = msgRef.on('child_added', (snap) => {
        const msg = snap.val();
        if (msg) {
          msg.id = snap.key;
          callback(msg);
        }
      });
      return () => msgRef.off('child_added', handler);
    } catch (e) { return () => {}; }
  }

  // 获取指定玩家信息
  async function getPlayer(uid) {
    if (!initialized) return null;
    try {
      const snap = await playersRef.child(uid).once('value');
      return snap.val();
    } catch (e) { return null; }
  }

  // 获取当前用户 UID
  function getUid() { return currentUser?.uid || null; }
  function isOnline() { return initialized && currentUser !== null; }

  return {
    init, signIn, syncPlayerData, setOnline, setOffline,
    listenOnlinePlayers, listenLeaderboard,
    likePlayer, hasLiked, sendGift, listenGifts,
    leaveMessage, listenMessages, getPlayer,
    getUid, isOnline
  };
})();
