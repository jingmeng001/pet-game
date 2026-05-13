// ===== Pet Definitions =====
const PETS = {
  cat:     { emoji: '🐱', name: '小猫咪', phrases: ['喵~ 好开心！', '喵呜~ 想吃小鱼干', '蹭蹭你~', '呼噜呼噜...', '喵~ 陪你玩！'], clickReactions: ['喵！吓我一跳~', '喵呜~ 再摸摸', '咕噜咕噜~', '用爪子拍拍你~', '喵~ 别碰我尾巴！'], hungryThoughts: ['肚子咕咕叫了...', '好想吃小鱼干...', '闻到好吃的味道了！'], moodThoughts: ['想玩毛线球~', '窗外有只鸟！', '好无聊啊...', '想晒太阳~'], loveClicks: ['❤️ 喜欢你！', '蹭蹭~', '呼噜呼噜~', '主人最好了~'] },
  dog:     { emoji: '🐶', name: '小狗狗', phrases: ['汪！最喜欢你了！', '汪汪~ 出去玩！', '摇尾巴摇尾巴~', '汪~ 好饿呀', '汪！我学会了新技能！'], clickReactions: ['汪！', '摇摇尾巴~', '扑到你身上！', '汪汪！再来一次！', '开心转圈圈！'], hungryThoughts: ['想啃骨头...', '肚子好饿...', '闻到肉味了！'], moodThoughts: ['想出去遛弯~', '有蝴蝶！追！', '球球在哪？', '想和你玩飞盘~'], loveClicks: ['❤️ 汪！爱你！', '摇尾巴~', '舔舔你~', '最好的主人！'] },
  rabbit:  { emoji: '🐰', name: '小兔子', phrases: ['蹦蹦跳跳~', '想吃胡萝卜！', '蹭蹭~ 好舒服', '耳朵竖起来啦~', '软软的~'], clickReactions: ['蹦！', '耳朵抖动~', '用鼻子蹭你~', '缩成一团~', '竖起耳朵听！'], hungryThoughts: ['想吃胡萝卜...', '青菜也好...', '饿得耳朵都耷拉了...'], moodThoughts: ['想挖洞洞~', '草地上好舒服~', '有蝴蝶飞过！', '想打个盹~'], loveClicks: ['❤️ 蹭蹭~', '竖耳朵~', '蹦蹦跳~', '好喜欢你~'] },
  hamster: { emoji: '🐹', name: '小仓鼠', phrases: ['囤囤囤~', '小爪子捧着瓜子~', '圆滚滚~', '吱吱~', '藏了好多好吃的！'], clickReactions: ['吱！', '缩成小球~', '小爪子抱住你~', '眨眨小眼睛~', '囤！'], hungryThoughts: ['瓜子...想吃瓜子...', '腮帮子空了...', '好饿好饿...'], moodThoughts: ['想跑转轮~', '藏东西！', '沙沙沙~挖洞', '好困想睡觉~'], loveClicks: ['❤️ 吱吱~', '蹭蹭手心~', '小爪子握你~', '最爱你了~'] },
  bird:    { emoji: '🐦', name: '小鹦鹉', phrases: ['你好你好~', '叽叽喳喳！', '拍拍翅膀~', '飞到你肩膀上！', '学你说话~'], clickReactions: ['叽！', '拍拍翅膀~', '歪头看你~', '啾啾啾~', '飞到你头上！'], hungryThoughts: ['想吃小米粒...', '好饿呀~', '种子...给我种子...'], moodThoughts: ['想唱歌~', '镜子在哪？', '飞飞飞~', '想洗澡~'], loveClicks: ['❤️ 你好~', '蹭蹭脸~', '梳梳羽毛~', '最喜欢你~'] }
};

const STAGES = [
  { name: '幼年期', min: 0,  emoji: '🥚' },
  { name: '成长期', min: 100, emoji: '🌱' },
  { name: '成熟期', min: 300, emoji: '🌸' },
  { name: '完全体', min: 600, emoji: '⭐' }
];

const DAILY_TASKS = [
  { id: 'feed',  title: '喂食一次',       action: 'feed',  intimacy: 5,  item: '🍖 高级饲料' },
  { id: 'play',  title: '陪宠物玩耍',     action: 'play',  intimacy: 8,  item: '🎾 新皮球' },
  { id: 'bath',  title: '给宠物洗澡',     action: 'bath',  intimacy: 6,  item: '🧴 香波' },
  { id: 'walk',  title: '带宠物散步',     action: 'walk',  intimacy: 7,  item: '🦴 小零食' },
  { id: 'talk',  title: '和宠物对话',     action: 'talk',  intimacy: 4,  item: '📖 故事书' },
  { id: 'photo', title: '给宠物拍照',     action: 'photo', intimacy: 5,  item: '📷 相片' },
  { id: 'skill', title: '教宠物一个新技能', action: 'skill', intimacy: 10, item: '🎓 技能书' },
  { id: 'toy',   title: '给宠物买新玩具', action: 'toy',   intimacy: 8,  item: '🧸 新玩具' },
  { id: 'brush', title: '帮宠物梳理毛发', action: 'brush', intimacy: 5,  item: '✨ 梳子' },
  { id: 'sleep', title: '陪宠物睡觉',     action: 'sleep', intimacy: 6,  item: '🌙 枕头' }
];

// ===== Furniture =====
const FURNITURE = [
  { id: 'bed',     emoji: '🛏️', name: '温馨小床',     price: 30,  effect: '心情+2/分钟',    stat: 'mood',   boost: 2 },
  { id: 'bowl',    emoji: '🥣', name: '高级饭碗',     price: 20,  effect: '饥饿度减缓50%',  stat: 'hunger', boost: 0.5 },
  { id: 'sofa',    emoji: '🛋️', name: '柔软沙发',     price: 40,  effect: '亲密度+1/分钟',  stat: 'intimacy', boost: 1 },
  { id: 'lamp',    emoji: '💡', name: '暖光灯',       price: 15,  effect: '心情+1/分钟',    stat: 'mood',   boost: 1 },
  { id: 'plant',   emoji: '🪴', name: '绿植盆栽',     price: 10,  effect: '成长+1/分钟',    stat: 'growth', boost: 1 },
  { id: 'shelf',   emoji: '📚', name: '书架',         price: 25,  effect: '成长+2/分钟',    stat: 'growth', boost: 2 },
  { id: 'tv',      emoji: '📺', name: '小电视',       price: 50,  effect: '心情+3/分钟',    stat: 'mood',   boost: 3 },
  { id: 'carpet',  emoji: '🧶', name: '毛绒地毯',     price: 20,  effect: '亲密度+1/分钟',  stat: 'intimacy', boost: 1 },
  { id: 'aquarium',emoji: '🐠', name: '小鱼缸',       price: 35,  effect: '心情+2/分钟',    stat: 'mood',   boost: 2 },
];

// ===== Outdoor Events =====
const OUTDOOR_EVENTS = {
  park: [
    { emoji: '🪙', text: '在长椅下发现了金币！', coins: 10 },
    { emoji: '🦴', text: '捡到了一根骨头！', item: '🦴 大骨头', coins: 3 },
    { emoji: '🐱', text: '遇到了一只流浪猫，它很友好！', intimacy: 5, coins: 5 },
    { emoji: '🌸', text: '看到了美丽的樱花树！心情变好了~', mood: 15, coins: 3 },
    { emoji: '🎾', text: '发现了一个皮球！', item: '🎾 皮球', coins: 5 },
    { emoji: '🐦', text: '树上有只小鸟在唱歌~', mood: 10, coins: 2 },
    { emoji: '💰', text: '在草丛里找到了一个宝箱！', coins: 25 },
  ],
  beach: [
    { emoji: '🐚', text: '捡到了漂亮的贝壳！', item: '🐚 贝壳', coins: 5 },
    { emoji: '🪙', text: '沙滩上发现了金币！', coins: 12 },
    { emoji: '🦀', text: '遇到了一只小螃蟹！它挥了挥钳子~', mood: 10, coins: 3 },
    { emoji: '⭐', text: '找到了一颗海星！', item: '⭐ 海星', coins: 8 },
    { emoji: '🏊', text: '在浅水区玩水好开心！', mood: 15, coins: 5 },
    { emoji: '💰', text: '发现了一个漂流瓶，里面有金币！', coins: 20 },
    { emoji: '🐬', text: '远处有海豚在跳跃！', mood: 20, coins: 5 },
  ],
  forest: [
    { emoji: '🍄', text: '发现了神奇蘑菇！', item: '🍄 神奇蘑菇', coins: 8 },
    { emoji: '🪙', text: '树洞里有金币！', coins: 15 },
    { emoji: '🦊', text: '遇到了一只小狐狸！', intimacy: 8, coins: 5 },
    { emoji: '💎', text: '在溪边发现了一颗宝石！', item: '💎 宝石', coins: 30 },
    { emoji: '🌰', text: '捡到了很多栗子！', item: '🌰 栗子', coins: 5 },
    { emoji: '🌈', text: '看到了一道彩虹！心情大好~', mood: 25, coins: 8 },
    { emoji: '🦋', text: '蝴蝶停在了你的肩膀上~', intimacy: 5, coins: 3 },
  ]
};

// ===== AI Visitors =====
const AI_VISITORS = [
  { emoji: '🐕', name: '旺财', type: 'dog', intimacy: 50, growth: 150, mood: 70 },
  { emoji: '🐈', name: '咪咪', type: 'cat', intimacy: 80, growth: 250, mood: 90 },
  { emoji: '🐇', name: '团团', type: 'rabbit', intimacy: 30, growth: 80, mood: 60 },
  { emoji: '🐹', name: '小圆', type: 'hamster', intimacy: 60, growth: 200, mood: 80 },
  { emoji: '🦜', name: '皮皮', type: 'bird', intimacy: 100, growth: 400, mood: 85 },
  { emoji: '🐕‍🦺', name: '大黄', type: 'dog', intimacy: 120, growth: 500, mood: 95 },
  { emoji: '🐱', name: '小花', type: 'cat', intimacy: 45, growth: 120, mood: 55 },
];

// ===== Game State =====
let state = null;
let currentPlayer = null;
let thoughtTimer = null;
let furnitureBoostTimer = null;
let currentMiniGame = null;
let miniGameRAF = null;

function getDefaultState() {
  return {
    petType: null, petName: '', growth: 0, intimacy: 0, hunger: 80, mood: 80, age: 0,
    coins: 0, inventory: [], furniture: [], placedFurniture: [],
    dailyTasksCompleted: [], dailyTasksDate: '', lastSave: Date.now(), totalPlayTime: 0,
    exploreLog: [], highScores: { catch: 0, memory: 0, runner: 0 }
  };
}

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const screens = { login: $('#login-screen'), adopt: $('#adopt-screen'), name: $('#name-screen'), game: $('#game-screen') };

// ===== Save / Load (namespaced by player name) =====
function getSaveKey(name) { return `pet_save_${name}`; }

function save() {
  if (!currentPlayer) return;
  state.lastSave = Date.now();
  localStorage.setItem(getSaveKey(currentPlayer), JSON.stringify(state));
}

function loadPlayer(name) {
  const raw = localStorage.getItem(getSaveKey(name));
  if (raw) { try { state = JSON.parse(raw); currentPlayer = name; return true; } catch(e) {} }
  return false;
}

// Get all saved players
function getAllSaves() {
  const saves = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('pet_save_')) {
      const name = key.replace('pet_save_', '');
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.petType) {
          saves.push({ name, petType: data.petType, petName: data.petName, growth: data.growth, coins: data.coins || 0, lastSave: data.lastSave });
        }
      } catch(e) {}
    }
  }
  // Also check for old un-namespaced save and migrate
  const oldSave = localStorage.getItem('pet_game_state');
  if (oldSave) {
    try {
      const data = JSON.parse(oldSave);
      if (data && data.petType) {
        saves.push({ name: '(旧存档)', petType: data.petType, petName: data.petName, growth: data.growth, coins: data.coins || 0, lastSave: data.lastSave, isOld: true, rawData: data });
      }
    } catch(e) {}
  }
  return saves;
}

function deleteSave(name) {
  localStorage.removeItem(getSaveKey(name));
}

// ===== Init =====
function init() {
  showScreen('login');
  renderLoginSaves();
  bindEvents();
}

function loginWithName(name) {
  if (!name) return;
  name = name.trim();
  if (!name) return;

  if (loadPlayer(name) && state.petType) {
    // Existing save found
    if (!state.coins) state.coins = 0;
    if (!state.furniture) state.furniture = [];
    if (!state.placedFurniture) state.placedFurniture = [];
    if (!state.exploreLog) state.exploreLog = [];
    if (!state.highScores) state.highScores = { catch: 0, memory: 0, runner: 0 };
    checkDayReset();
    showScreen('game');
    renderGame();
    startGrowthLoop();
    startThoughtBubble();
    startFurnitureBoost();
    try { initOnline(); } catch(e) { console.warn('在线功能初始化失败:', e); }
    startOnlineSync();
    showFloatReward(`欢迎回来，${name}！`);
  } else {
    // New player
    currentPlayer = name;
    state = getDefaultState();
    showScreen('adopt');
    try { initOnline(); } catch(e) { console.warn('在线功能初始化失败:', e); }
  }
}

function migrateOldSave(name) {
  const oldSave = localStorage.getItem('pet_game_state');
  if (oldSave) {
    try {
      const data = JSON.parse(oldSave);
      if (data && data.petType) {
        currentPlayer = name;
        state = data;
        save(); // Save under new namespaced key
        localStorage.removeItem('pet_game_state'); // Remove old key
        if (!state.coins) state.coins = 0;
        if (!state.furniture) state.furniture = [];
        if (!state.placedFurniture) state.placedFurniture = [];
        if (!state.exploreLog) state.exploreLog = [];
        if (!state.highScores) state.highScores = { catch: 0, memory: 0, runner: 0 };
        checkDayReset();
        showScreen('game');
        renderGame();
        startGrowthLoop();
        startThoughtBubble();
        startFurnitureBoost();
        showFloatReward('旧存档已迁移！');
        return true;
      }
    } catch(e) {}
  }
  return false;
}

function renderLoginSaves() {
  const saves = getAllSaves();
  const container = $('#login-saves');
  const list = $('#saves-list');
  if (saves.length === 0) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  list.innerHTML = saves.map(s => {
    const pet = PETS[s.petType];
    const stage = STAGES.filter(st => s.growth >= st.min).pop() || STAGES[0];
    const dateStr = s.lastSave ? new Date(s.lastSave).toLocaleDateString() : '';
    return `<div class="save-item" data-save-name="${s.name}" data-is-old="${s.isOld || false}">
      <div class="save-emoji">${pet?.emoji || '🐾'}</div>
      <div class="save-info">
        <span class="save-name">${s.name}</span>
        <span class="save-detail">${s.petName} | ${stage.name} | 🪙${s.coins} ${dateStr ? '| ' + dateStr : ''}</span>
      </div>
      ${s.isOld ? '<span style="font-size:11px;color:#ff9800;">迁移</span>' : '<button class="save-delete" title="删除存档">🗑️</button>'}
    </div>`;
  }).join('');

  list.querySelectorAll('.save-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.save-delete')) {
        e.stopPropagation();
        const name = el.dataset.saveName;
        if (confirm(`确定删除「${name}」的存档吗？`)) {
          deleteSave(name);
          renderLoginSaves();
        }
        return;
      }
      const saveName = el.dataset.saveName;
      const isOld = el.dataset.isOld === 'true';
      if (isOld) {
        migrateOldSave($('#login-name-input').value.trim() || saveName);
      } else {
        $('#login-name-input').value = saveName;
        loginWithName(saveName);
      }
    });
  });
}

function selectPet(type) {
  state = getDefaultState();
  state.petType = type;
  $('#name-preview').textContent = PETS[type].emoji;
  $('#pet-name-input').value = '';
  showScreen('name');
  setTimeout(() => $('#pet-name-input').focus(), 100);
}

function confirmName() {
  const name = $('#pet-name-input').value.trim();
  if (!name) { $('#pet-name-input').style.borderColor = '#e91e63'; $('#pet-name-input').placeholder = '请给宠物取个名字哦~'; return; }
  state.petName = name;
  state.dailyTasksDate = getToday();
  save();
  showScreen('game');
  renderGame();
  startGrowthLoop();
  startThoughtBubble();
  startFurnitureBoost();
  speak(`${name}来到新家啦！要好好照顾我哦~`);
}

function getToday() { return new Date().toISOString().slice(0, 10); }
function checkDayReset() {
  const today = getToday();
  if (state.dailyTasksDate !== today) { state.dailyTasksDate = today; state.dailyTasksCompleted = []; save(); }
}

// ===== Growth Loop =====
let growthTimer = null;
function startGrowthLoop() {
  if (growthTimer) clearInterval(growthTimer);
  growthTimer = setInterval(() => {
    state.growth += 1;
    state.hunger = Math.max(0, state.hunger - 0.5);
    if (state.hunger < 20) state.mood = Math.max(0, state.mood - 0.3);
    state.age += 0.01;
    renderStats();
    checkStageUp();
    save();
  }, 10000);
}

function getCurrentStage() {
  let stage = STAGES[0];
  for (const s of STAGES) { if (state.growth >= s.min) stage = s; }
  return stage;
}

function checkStageUp() {
  const stage = getCurrentStage();
  const prevGrowth = state.growth - 1;
  let prevStage = STAGES[0];
  for (const s of STAGES) { if (prevGrowth >= s.min) prevStage = s; }
  if (stage.name !== prevStage.name) {
    speak(`恭喜！我进化到【${stage.name}】啦！`);
    triggerAnimation('happy');
    showFloatReward(`进化到 ${stage.name}！`);
    addCoins(20);
  }
}

// ===== Furniture Boost =====
function startFurnitureBoost() {
  if (furnitureBoostTimer) clearInterval(furnitureBoostTimer);
  furnitureBoostTimer = setInterval(() => {
    if (!state?.placedFurniture?.length) return;
    state.placedFurniture.forEach(fId => {
      const f = FURNITURE.find(x => x.id === fId);
      if (!f) return;
      if (f.stat === 'mood') state.mood = Math.min(100, state.mood + f.boost);
      if (f.stat === 'hunger') state.hunger = Math.max(0, state.hunger - f.boost * 0.1);
      if (f.stat === 'intimacy') state.intimacy += f.boost;
      if (f.stat === 'growth') state.growth += f.boost;
    });
    renderStats();
  }, 60000);
}

// ===== Coins =====
function addCoins(amount) {
  state.coins = (state.coins || 0) + amount;
  renderCoins();
  save();
}
function renderCoins() {
  const c = state.coins || 0;
  if ($('#coin-display')) $('#coin-display').textContent = `🪙 ${c}`;
  if ($('#decor-coin')) $('#decor-coin').textContent = `🪙 ${c}`;
  if ($('#outdoor-coin')) $('#outdoor-coin').textContent = `🪙 ${c}`;
  if ($('#social-coin')) $('#social-coin').textContent = `🪙 ${c}`;
  if ($('#games-coin')) $('#games-coin').textContent = `🪙 ${c}`;
}

// ===== Tab Navigation =====
function switchTab(tabName) {
  $$('.tab-panel').forEach(p => p.classList.remove('active'));
  $$('.nav-item').forEach(n => n.classList.remove('active'));
  const panel = $(`#tab-${tabName}`);
  if (panel) panel.classList.add('active');
  const nav = $(`.nav-item[data-tab="${tabName}"]`);
  if (nav) nav.classList.add('active');

  if (tabName === 'decor') renderDecor();
  if (tabName === 'outdoor') renderOutdoor();
  if (tabName === 'social') renderSocial();
  if (tabName === 'games') renderGamesMenu();
  if (tabName === 'online') renderOnline();
  renderCoins();
}

// ===== Render Game =====
function renderGame() {
  const pet = PETS[state.petType];
  $('#game-pet-emoji').textContent = pet.emoji;
  $('#game-pet-name').textContent = state.petName;
  $('#game-pet-stage').textContent = getCurrentStage().name;
  $('#pet-main').textContent = pet.emoji;
  renderStats();
  renderTasks();
  renderInventory();
  renderCoins();
}

function renderStats() {
  const stage = getCurrentStage();
  $('#game-pet-stage').textContent = stage.name;
  $('#stat-age').textContent = formatAge(state.age);
  const nextStage = STAGES.find(s => s.min > state.growth) || STAGES[STAGES.length - 1];
  const prevStageMin = STAGES.filter(s => s.min <= state.growth).pop()?.min || 0;
  const growthPercent = nextStage.min === prevStageMin ? 100 : Math.min(100, ((state.growth - prevStageMin) / (nextStage.min - prevStageMin)) * 100);
  $('#growth-bar').style.width = growthPercent + '%';
  $('#stat-growth').textContent = `${state.growth}/${nextStage.min}`;
  const intimacyPercent = Math.min(100, state.intimacy / 10);
  $('#intimacy-bar').style.width = intimacyPercent + '%';
  $('#stat-intimacy').textContent = Math.floor(state.intimacy);
  $('#hunger-bar').style.width = state.hunger + '%';
  $('#stat-hunger').textContent = Math.floor(state.hunger) + '%';
  $('#mood-bar').style.width = state.mood + '%';
  $('#stat-mood').textContent = Math.floor(state.mood) + '%';
}

function formatAge(age) { if (age < 1) return Math.floor(age * 30) + ' 天'; return age.toFixed(1) + ' 岁'; }

// ===== Daily Tasks =====
function renderTasks() {
  const list = $('#task-list');
  const completed = state.dailyTasksCompleted || [];
  $('#task-progress').textContent = `${completed.length}/10`;
  list.innerHTML = DAILY_TASKS.map(task => {
    const isDone = completed.includes(task.id);
    return `<div class="task-item ${isDone ? 'completed' : ''}" data-task="${task.id}"><div class="task-check">${isDone ? '✓' : ''}</div><div class="task-info"><div class="task-title">${task.title}</div><div class="task-reward">+${task.intimacy} 亲密度 ${task.item ? '| ' + task.item : ''}</div></div></div>`;
  }).join('');
}

function completeTask(taskId) {
  if (!state.dailyTasksCompleted) state.dailyTasksCompleted = [];
  if (state.dailyTasksCompleted.includes(taskId)) return;
  const task = DAILY_TASKS.find(t => t.id === taskId);
  if (!task) return;
  state.dailyTasksCompleted.push(taskId);
  state.intimacy += task.intimacy;
  if (task.item) state.inventory.push(task.item);
  addCoins(5);
  save(); renderTasks(); renderStats(); renderInventory();
  showFloatReward(`+${task.intimacy} 亲密度 +5🪙`);
  speak(getRandomPhrase());
}

// ===== Actions =====
function doAction(action) {
  const actionMap = {
    feed: { stat: 'hunger', value: 20, max: 100, animation: 'eating', msg: '好好吃~' },
    play: { stat: 'mood', value: 15, max: 100, animation: 'happy', msg: '好好玩！' },
    bath: { stat: 'mood', value: 10, max: 100, animation: 'happy', msg: '洗香香~' },
    walk: { stat: 'mood', value: 12, max: 100, animation: 'happy', msg: '出去玩好开心！' },
    talk: { stat: 'mood', value: 8, max: 100, animation: 'happy', msg: '' },
    photo: { stat: 'mood', value: 5, max: 100, animation: 'happy', msg: '拍得好看吗？' },
    skill: { stat: 'mood', value: 10, max: 100, animation: 'happy', msg: '我学会新技能了！' },
    toy: { stat: 'mood', value: 12, max: 100, animation: 'happy', msg: '新玩具！好喜欢！' },
    brush: { stat: 'mood', value: 8, max: 100, animation: 'happy', msg: '好舒服~' },
    sleep: { stat: 'mood', value: 15, max: 100, animation: 'sleeping', msg: '好困...晚安...' }
  };
  const cfg = actionMap[action];
  if (!cfg) return;
  state[cfg.stat] = Math.min(cfg.max, state[cfg.stat] + cfg.value);
  state.intimacy += 1;
  triggerAnimation(cfg.animation);
  speak(cfg.msg || getRandomPhrase());
  const task = DAILY_TASKS.find(t => t.action === action);
  if (task) completeTask(task.id);
  save(); renderStats();
}

// ===== Click Interaction =====
function handleClick(e) {
  const pet = PETS[state.petType];
  const reactions = pet.clickReactions;
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  const reactionType = Math.random();
  if (reactionType < 0.4) { triggerAnimation('click-react'); speak(reaction); }
  else if (reactionType < 0.7) { triggerAnimation('happy'); speak(pet.loveClicks[Math.floor(Math.random() * pet.loveClicks.length)]); }
  else speak(reaction);
  spawnHearts(e.clientX || e.touches?.[0]?.clientX, e.clientY || e.touches?.[0]?.clientY);
  state.intimacy += 0.5; state.mood = Math.min(100, state.mood + 0.3);
  renderStats(); save();
}

function spawnHearts(x, y) {
  const container = $('#hearts-container');
  const count = 3 + Math.floor(Math.random() * 3);
  const hearts = ['❤️', '💕', '💗', '💖', '✨'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const rect = $('#pet-display').getBoundingClientRect();
    heart.style.left = ((x || rect.left + rect.width / 2) - rect.left) + 'px';
    heart.style.top = ((y || rect.top + rect.height / 2) - rect.top) + 'px';
    heart.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    heart.style.fontSize = (16 + Math.random() * 12) + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

// ===== Drag & Drop =====
function initDragDrop() {
  const petDisplay = $('#pet-display');
  const petMain = $('#pet-main');
  $$('.drag-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.dataset.dragAction);
      item.classList.add('dragging');
      $('#drag-hint-text').textContent = `把${item.dataset.dragLabel}拖到宠物身上~`;
      $('#drag-hint').classList.remove('hidden');
    });
    item.addEventListener('dragend', () => { item.classList.remove('dragging'); $('#drag-hint').classList.add('hidden'); petDisplay.classList.remove('drag-over'); });

    let touchClone = null, touchAction = null;
    item.addEventListener('touchstart', (e) => {
      e.preventDefault(); touchAction = item.dataset.dragAction;
      touchClone = document.createElement('div');
      touchClone.textContent = item.dataset.dragEmoji;
      touchClone.style.cssText = `position:fixed;font-size:40px;pointer-events:none;z-index:1000;left:${e.touches[0].clientX-20}px;top:${e.touches[0].clientY-20}px;`;
      document.body.appendChild(touchClone);
      item.classList.add('dragging');
      $('#drag-hint-text').textContent = `把${item.dataset.dragLabel}拖到宠物身上~`;
      $('#drag-hint').classList.remove('hidden');
    }, { passive: false });
    item.addEventListener('touchmove', (e) => {
      e.preventDefault(); if (!touchClone) return;
      touchClone.style.left = (e.touches[0].clientX - 20) + 'px';
      touchClone.style.top = (e.touches[0].clientY - 20) + 'px';
      const petRect = petMain.getBoundingClientRect();
      petDisplay.classList.toggle('drag-over', e.touches[0].clientX >= petRect.left && e.touches[0].clientX <= petRect.right && e.touches[0].clientY >= petRect.top && e.touches[0].clientY <= petRect.bottom);
    }, { passive: false });
    item.addEventListener('touchend', (e) => {
      if (touchClone) { touchClone.remove(); touchClone = null; }
      item.classList.remove('dragging'); $('#drag-hint').classList.add('hidden'); petDisplay.classList.remove('drag-over');
      if (touchAction && e.changedTouches[0]) {
        const t = e.changedTouches[0], petRect = petMain.getBoundingClientRect();
        if (t.clientX >= petRect.left && t.clientX <= petRect.right && t.clientY >= petRect.top && t.clientY <= petRect.bottom) {
          doAction(touchAction); spawnHearts(t.clientX, t.clientY);
        }
      }
      touchAction = null;
    });
  });
  petDisplay.addEventListener('dragover', (e) => { e.preventDefault(); petDisplay.classList.add('drag-over'); });
  petDisplay.addEventListener('dragleave', () => petDisplay.classList.remove('drag-over'));
  petDisplay.addEventListener('drop', (e) => {
    e.preventDefault(); petDisplay.classList.remove('drag-over');
    const action = e.dataTransfer.getData('text/plain');
    if (action) { doAction(action); spawnHearts(e.clientX, e.clientY); }
    $('#drag-hint').classList.add('hidden');
  });
}

// ===== Thought Bubble =====
const THOUGHT_TYPES = {
  hungry: (pet) => ({ texts: pet.hungryThoughts, response: () => { state.hunger = Math.min(100, state.hunger + 15); speak('谢谢！好好吃~'); triggerAnimation('eating'); } }),
  mood: (pet) => ({ texts: pet.moodThoughts, response: () => { state.mood = Math.min(100, state.mood + 10); speak('好开心！' + getRandomPhrase()); triggerAnimation('happy'); } }),
  love: (pet) => ({ texts: [`${state.petName}想你了~`, '可以陪我玩吗？', '摸摸我~', '最喜欢你了！'], response: () => { state.intimacy += 3; spawnHearts(null, null); speak(pet.loveClicks[Math.floor(Math.random() * pet.loveClicks.length)]); triggerAnimation('happy'); } })
};
function startThoughtBubble() {
  if (thoughtTimer) clearInterval(thoughtTimer);
  const showThought = () => {
    if (!state?.petType) return;
    const pet = PETS[state.petType];
    let type = state.hunger < 30 ? 'hungry' : state.mood < 40 ? 'mood' : ['hungry', 'mood', 'love'][Math.floor(Math.random() * 3)];
    const thought = THOUGHT_TYPES[type](pet);
    const text = thought.texts[Math.floor(Math.random() * thought.texts.length)];
    const bubble = $('#thought-bubble');
    $('#thought-text').textContent = text;
    bubble.classList.remove('hidden');
    bubble.style.animation = 'none'; void bubble.offsetWidth;
    bubble.style.animation = 'bubblePop 0.4s cubic-bezier(.34,1.56,.64,1)';
    const hideTimeout = setTimeout(() => bubble.classList.add('hidden'), 8000);
    $('#thought-respond').onclick = () => {
      clearTimeout(hideTimeout); bubble.classList.add('hidden');
      thought.response(); state.intimacy += 2; renderStats(); save();
    };
  };
  setTimeout(() => { showThought(); thoughtTimer = setInterval(showThought, 25000 + Math.random() * 15000); }, 15000);
}

// ===== Petting =====
function initPetting() {
  const petDisplay = $('#pet-display'), petMain = $('#pet-main');
  let isPetting = false, strokeCount = 0, lastPos = { x: 0, y: 0 };
  function startPet(x, y) {
    const rect = petMain.getBoundingClientRect();
    if (x < rect.left - 20 || x > rect.right + 20 || y < rect.top - 20 || y > rect.bottom + 20) return;
    isPetting = true; strokeCount = 0; lastPos = { x, y };
    petDisplay.classList.add('petting'); triggerAnimation('petting');
  }
  function movePet(x, y) {
    if (!isPetting) return;
    const dist = Math.sqrt((x - lastPos.x) ** 2 + (y - lastPos.y) ** 2);
    if (dist > 15) { strokeCount++; lastPos = { x, y };
      if (strokeCount % 3 === 0) { spawnHearts(x, y); state.intimacy += 0.3; state.mood = Math.min(100, state.mood + 0.2); renderStats(); }
      if (strokeCount === 5) speak(PETS[state.petType].phrases[Math.floor(Math.random() * PETS[state.petType].phrases.length)]);
      if (strokeCount === 12) speak('呼噜呼噜~ 好舒服...');
      if (strokeCount === 20) { speak('太舒服了~ 要融化了~'); triggerAnimation('happy'); showFloatReward('+5 亲密度'); state.intimacy += 5; renderStats(); save(); stopPet(); }
    }
  }
  function stopPet() { if (!isPetting) return; isPetting = false; petDisplay.classList.remove('petting'); if (strokeCount >= 3) { speak('好舒服~ 还要摸~'); save(); } strokeCount = 0; }
  petDisplay.addEventListener('mousedown', (e) => { if (e.target.closest('.thought-bubble')) return; startPet(e.clientX, e.clientY); });
  document.addEventListener('mousemove', (e) => movePet(e.clientX, e.clientY));
  document.addEventListener('mouseup', stopPet);
  petDisplay.addEventListener('touchstart', (e) => {
    if (e.target.closest('.thought-bubble')) return;
    const t = e.touches[0], rect = petMain.getBoundingClientRect();
    if (t.clientX >= rect.left - 30 && t.clientX <= rect.right + 30 && t.clientY >= rect.top - 30 && t.clientY <= rect.bottom + 30) {
      e.preventDefault(); startPet(t.clientX, t.clientY);
    }
  }, { passive: false });
  document.addEventListener('touchmove', (e) => { if (isPetting) { e.preventDefault(); movePet(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
  document.addEventListener('touchend', stopPet);
  document.addEventListener('touchcancel', stopPet);
}

// ===== Decoration System =====
function renderDecor() {
  renderCoins();
  renderRoomPreview();
  renderShop();
  renderOwned();
}
function renderRoomPreview() {
  const roomPet = $('#room-pet-spot');
  roomPet.textContent = PETS[state.petType]?.emoji || '🐱';
  const grid = $('#room-furniture-grid');
  grid.innerHTML = (state.placedFurniture || []).map(fId => {
    const f = FURNITURE.find(x => x.id === fId);
    return f ? `<div class="room-furniture-item" data-fid="${f.id}" title="${f.name}">${f.emoji}</div>` : '';
  }).join('');
}
function renderShop() {
  const grid = $('#shop-grid');
  grid.innerHTML = FURNITURE.map(f => {
    const owned = (state.furniture || []).includes(f.id);
    return `<div class="shop-item ${owned ? 'owned' : ''}" data-fid="${f.id}"><span class="shop-emoji">${f.emoji}</span><span class="shop-name">${f.name}</span><span class="shop-price">${owned ? '已拥有' : `🪙 ${f.price}`}</span><span class="shop-effect">${f.effect}</span></div>`;
  }).join('');
  grid.querySelectorAll('.shop-item:not(.owned)').forEach(el => {
    el.addEventListener('click', () => buyFurniture(el.dataset.fid));
  });
}
function renderOwned() {
  const grid = $('#owned-grid');
  const owned = state.furniture || [];
  $('#owned-count').textContent = `(${owned.length}/${FURNITURE.length})`;
  if (!owned.length) { grid.innerHTML = '<span style="color:#ccc;font-size:13px;">还没有家具，去商店购买吧</span>'; return; }
  grid.innerHTML = owned.map(fId => {
    const f = FURNITURE.find(x => x.id === fId);
    const placed = (state.placedFurniture || []).includes(fId);
    return f ? `<div class="owned-item ${placed ? 'placed' : ''}" data-fid="${fId}">${f.emoji} ${f.name} ${placed ? '✅已放置' : '点击放置'}</div>` : '';
  }).join('');
  grid.querySelectorAll('.owned-item').forEach(el => {
    el.addEventListener('click', () => toggleFurniture(el.dataset.fid));
  });
}
function buyFurniture(fId) {
  const f = FURNITURE.find(x => x.id === fId);
  if (!f) return;
  if ((state.furniture || []).includes(fId)) return;
  if ((state.coins || 0) < f.price) { showFloatReward('金币不够！'); return; }
  state.coins -= f.price;
  if (!state.furniture) state.furniture = [];
  state.furniture.push(fId);
  showFloatReward(`购买了 ${f.name}！`);
  save(); renderDecor();
}
function toggleFurniture(fId) {
  if (!state.placedFurniture) state.placedFurniture = [];
  const idx = state.placedFurniture.indexOf(fId);
  if (idx >= 0) { state.placedFurniture.splice(idx, 1); showFloatReward('已收回'); }
  else { state.placedFurniture.push(fId); showFloatReward('已放置'); }
  save(); renderDecor();
}

// ===== Outdoor Exploration =====
function renderOutdoor() {
  renderCoins();
  const logList = $('#explore-log-list');
  logList.innerHTML = (state.exploreLog || []).slice(-10).reverse().map(log =>
    `<div class="log-item"><span class="log-time">${log.time}</span>${log.text}</div>`
  ).join('');
}
function startExplore(location) {
  const names = { park: '城市公园', beach: '阳光海滩', forest: '神秘森林' };
  $('#explore-scene').classList.remove('hidden');
  const bg = $('#explore-bg');
  bg.className = 'explore-bg ' + location;
  $('#explore-pet').textContent = PETS[state.petType]?.emoji || '🐱';
  $('#explore-event').classList.add('hidden');

  const exploreBtn = $('#explore-btn');
  exploreBtn.textContent = '探险中...';
  exploreBtn.disabled = true;

  setTimeout(() => {
    const events = OUTDOOR_EVENTS[location];
    const event = events[Math.floor(Math.random() * events.length)];
    $('#event-emoji').textContent = event.emoji;
    $('#event-text').textContent = event.text;
    let rewardText = '';
    if (event.coins) { addCoins(event.coins); rewardText += `+${event.coins}🪙 `; }
    if (event.mood) { state.mood = Math.min(100, state.mood + event.mood); rewardText += `心情+${event.mood} `; }
    if (event.intimacy) { state.intimacy += event.intimacy; rewardText += `亲密度+${event.intimacy} `; }
    if (event.item) { state.inventory.push(event.item); rewardText += `获得${event.item} `; }
    $('#event-reward').textContent = rewardText;
    $('#explore-event').classList.remove('hidden');
    triggerAnimation('happy');

    if (!state.exploreLog) state.exploreLog = [];
    state.exploreLog.push({ time: new Date().toLocaleTimeString(), text: `[${names[location]}] ${event.text}` });
    save(); renderStats(); renderInventory();
  }, 1500);

  $('#event-accept').onclick = () => {
    $('#explore-event').classList.add('hidden');
    exploreBtn.textContent = '开始探险';
    exploreBtn.disabled = false;
    renderOutdoor();
  };
}

// ===== Social System =====
function renderSocial() {
  renderCoins();
  renderMyPetCard();
  renderVisitors();
}
function renderMyPetCard() {
  const pet = PETS[state.petType];
  const stage = getCurrentStage();
  $('#my-pet-card').innerHTML = `<div class="pet-card-avatar">${pet.emoji}</div><div class="pet-card-info"><h4>${state.petName}</h4><p>${stage.name} | 年龄: ${formatAge(state.age)}</p><p>亲密度: ${Math.floor(state.intimacy)} | 心情: ${Math.floor(state.mood)}</p><p>🪙 金币: ${state.coins || 0}</p></div>`;
}
function renderVisitors() {
  const list = $('#visit-list');
  const shuffled = [...AI_VISITORS].sort(() => Math.random() - 0.5).slice(0, 3);
  list.innerHTML = shuffled.map((v, i) =>
    `<div class="visit-card" data-idx="${i}"><div class="visit-emoji">${v.emoji}</div><div class="visit-info"><span class="visit-name">${v.name}</span><span class="visit-stats">亲密度: ${v.intimacy} | 等级: ${v.growth >= 600 ? '完全体' : v.growth >= 300 ? '成熟期' : v.growth >= 100 ? '成长期' : '幼年期'}</span></div><div class="visit-actions"><button class="visit-btn" data-visit="${i}">串门</button></div></div>`
  ).join('');
  list.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('click', () => visitPet(shuffled[btn.dataset.visit]));
  });
}
function visitPet(visitor) {
  state.intimacy += 3;
  state.mood = Math.min(100, state.mood + 5);
  addCoins(5);
  showFloatReward(`和${visitor.name}串门 +5🪙`);
  speak(`和${visitor.name}玩得好开心！`);
  triggerAnimation('happy');
  save(); renderStats(); renderSocial();
}
function doCompetition(type) {
  const myScore = type === 'cute' ? state.intimacy : type === 'smart' ? state.growth : state.mood;
  const visitor = AI_VISITORS[Math.floor(Math.random() * AI_VISITORS.length)];
  const vScore = type === 'cute' ? visitor.intimacy : type === 'smart' ? visitor.growth : visitor.mood;
  const names = { cute: '选美大赛', smart: '智力竞赛', athletic: '运动会' };
  const win = myScore >= vScore;
  const result = $('#compete-result');
  result.classList.remove('hidden');
  result.innerHTML = `<h3>🏆 ${names[type]}</h3><p>${state.petName} (${Math.floor(myScore)}) VS ${visitor.name} (${vScore})</p><p class="${win ? 'compete-win' : 'compete-lose'}">${win ? '🎉 胜利！' : '😢 失败...'}</p>`;
  if (win) { addCoins(15); state.intimacy += 5; showFloatReward('胜利！+15🪙 +5亲密度'); }
  else { addCoins(3); showFloatReward('安慰奖 +3🪙'); }
  triggerAnimation(win ? 'happy' : 'eating');
  save(); renderStats();
}

// ===== Mini Games =====
function renderGamesMenu() {
  renderCoins();
  if ($('#catch-high')) $('#catch-high').textContent = state.highScores?.catch || 0;
  if ($('#memory-high')) $('#memory-high').textContent = state.highScores?.memory || 0;
  if ($('#runner-high')) $('#runner-high').textContent = state.highScores?.runner || 0;
}
function startMiniGame(type) {
  currentMiniGame = type;
  $('#game-menu').parentElement.querySelector('.game-menu-grid')?.classList.add('hidden');
  $('#game-area').classList.remove('hidden');
  $('#game-over').classList.add('hidden');
  $('#game-score').textContent = '得分: 0';
  $('#game-timer').textContent = '';
  if (type === 'catch') startCatchGame();
  else if (type === 'memory') startMemoryGame();
  else if (type === 'runner') startRunnerGame();
}
function endMiniGame(score) {
  if (miniGameRAF) { cancelAnimationFrame(miniGameRAF); miniGameRAF = null; }
  const reward = Math.floor(score / 10);
  addCoins(reward);
  if (score > (state.highScores[currentMiniGame] || 0)) {
    state.highScores[currentMiniGame] = score;
    showFloatReward('新纪录！');
  }
  state.mood = Math.min(100, state.mood + 10);
  save(); renderStats();
  $('#game-over').classList.remove('hidden');
  const names = { catch: '接水果', memory: '记忆翻牌', runner: '跑酷' };
  $('#game-over-title').textContent = `${names[currentMiniGame]} - 游戏结束`;
  $('#game-over-score').textContent = `得分: ${score}`;
  $('#game-over-reward').textContent = `获得 ${reward} 🪙 金币`;
}
function quitMiniGame() {
  if (miniGameRAF) { cancelAnimationFrame(miniGameRAF); miniGameRAF = null; }
  $('#game-area').classList.add('hidden');
  const grid = document.querySelector('#tab-games .game-menu-grid');
  if (grid) grid.classList.remove('hidden');
  renderGamesMenu();
}

// --- Catch Game ---
function startCatchGame() {
  const canvas = $('#game-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let basket = { x: W / 2, y: H - 40, w: 60, h: 20 };
  let items = [];
  let score = 0;
  let spawnTimer = 0;
  let gameOver = false;
  const fruits = ['🍎', '🍊', '🍋', '🍇', '🍓'];
  const bomb = '💣';

  function spawn() {
    const isBomb = Math.random() < 0.2;
    items.push({ x: Math.random() * (W - 30) + 15, y: -20, speed: 1.5 + Math.random() * 2, emoji: isBomb ? bomb : fruits[Math.floor(Math.random() * fruits.length)], isBomb });
  }

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    basket.x = ((e.clientX - rect.left) / rect.width) * W;
  };
  canvas.ontouchmove = (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    basket.x = ((e.touches[0].clientX - rect.left) / rect.width) * W;
  };
  canvas.ontouchstart = (e) => e.preventDefault();

  function loop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, W, H);
    spawnTimer++;
    if (spawnTimer % 40 === 0) spawn();

    items.forEach(item => {
      item.y += item.speed;
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.emoji, item.x, item.y);

      if (item.y > basket.y - 15 && item.y < basket.y + 15 && Math.abs(item.x - basket.x) < basket.w / 2) {
        if (item.isBomb) { gameOver = true; endMiniGame(score); return; }
        else { score += 10; item.y = H + 100; }
      }
    });
    items = items.filter(i => i.y < H + 50);

    ctx.fillStyle = '#ec407a';
    ctx.fillRect(basket.x - basket.w / 2, basket.y - basket.h / 2, basket.w, basket.h);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`得分: ${score}`, 10, 25);

    if (!gameOver) miniGameRAF = requestAnimationFrame(loop);
  }
  spawn(); loop();
}

// --- Memory Game ---
function startMemoryGame() {
  const canvas = $('#game-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const emojis = ['🐱', '🐶', '🐰', '🐹', '🐦', '🌸', '⭐', '🍎'];
  const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  const cols = 4, rows = 4;
  const cardW = W / cols - 10, cardH = H / rows - 10;
  let revealed = new Array(16).fill(false);
  let matched = new Array(16).fill(false);
  let firstPick = -1, secondPick = -1;
  let score = 0, moves = 0;
  let lockBoard = false;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < 16; i++) {
      const col = i % cols, row = Math.floor(i / cols);
      const x = col * (cardW + 10) + 5, y = row * (cardH + 10) + 5;
      ctx.fillStyle = matched[i] ? '#c8e6c9' : revealed[i] ? '#fff9c4' : '#e1bee7';
      ctx.beginPath(); ctx.roundRect(x, y, cardW, cardH, 10); ctx.fill();
      ctx.strokeStyle = '#ce93d8'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = '32px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (revealed[i] || matched[i]) ctx.fillText(cards[i], x + cardW / 2, y + cardH / 2);
      else ctx.fillText('❓', x + cardW / 2, y + cardH / 2);
    }
    ctx.fillStyle = '#7b1fa2'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`步数: ${moves}  得分: ${score}`, 10, 20);
  }

  canvas.onclick = (e) => {
    if (lockBoard) return;
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * W;
    const cy = ((e.clientY - rect.top) / rect.height) * H;
    const col = Math.floor(cx / (cardW + 10));
    const row = Math.floor(cy / (cardH + 10));
    const idx = row * cols + col;
    if (idx < 0 || idx >= 16 || revealed[idx] || matched[idx]) return;

    revealed[idx] = true;
    moves++;

    if (firstPick === -1) { firstPick = idx; }
    else {
      secondPick = idx;
      lockBoard = true;
      setTimeout(() => {
        if (cards[firstPick] === cards[secondPick]) {
          matched[firstPick] = matched[secondPick] = true;
          score += 20;
          if (matched.every(m => m)) { endMiniGame(score + 50); return; }
        } else {
          revealed[firstPick] = revealed[secondPick] = false;
        }
        firstPick = secondPick = -1;
        lockBoard = false;
        draw();
      }, 600);
    }
    draw();
  };
  canvas.ontouchstart = (e) => { e.preventDefault(); };
  draw();
}

// --- Runner Game ---
function startRunnerGame() {
  const canvas = $('#game-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let player = { x: 60, y: H - 80, w: 30, h: 30, vy: 0, jumping: false };
  let obstacles = [];
  let score = 0;
  let speed = 3;
  let spawnTimer = 0;
  let gameOver = false;
  let groundY = H - 50;
  const pet = PETS[state.petType];

  function jump() {
    if (!player.jumping) {
      player.vy = -12;
      player.jumping = true;
    }
  }

  canvas.onclick = jump;
  canvas.ontouchstart = (e) => { e.preventDefault(); jump(); };
  document.onkeydown = (e) => { if (e.code === 'Space') jump(); };

  function loop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#81c784';
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = '#66bb6a';
    ctx.fillRect(0, groundY, W, 3);

    // Player
    player.vy += 0.6;
    player.y += player.vy;
    if (player.y > groundY - player.h) { player.y = groundY - player.h; player.vy = 0; player.jumping = false; }
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.fillText(pet?.emoji || '🐱', player.x, player.y + player.h);

    // Obstacles
    spawnTimer++;
    if (spawnTimer % 60 === 0) {
      obstacles.push({ x: W, y: groundY - 25, w: 20, h: 25 });
      speed = Math.min(8, 3 + score / 100);
    }

    obstacles.forEach(obs => {
      obs.x -= speed;
      ctx.fillText('🌵', obs.x + obs.w / 2, obs.y + obs.h);
      if (player.x + player.w / 2 > obs.x && player.x - player.w / 2 < obs.x + obs.w && player.y + player.h > obs.y) {
        gameOver = true;
        endMiniGame(score);
        return;
      }
    });
    obstacles = obstacles.filter(o => o.x > -30);

    score++;
    ctx.fillStyle = '#7b1fa2'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`得分: ${score}`, 10, 25);

    if (!gameOver) miniGameRAF = requestAnimationFrame(loop);
  }
  loop();
}

// ===== Animations =====
function triggerAnimation(type) {
  const el = $('#pet-main');
  el.className = 'pet-main-emoji'; void el.offsetWidth; el.classList.add(type);
  setTimeout(() => el.className = 'pet-main-emoji', type === 'sleeping' ? 4000 : type === 'petting' ? 3000 : type === 'click-react' ? 400 : 2000);
}
function speak(text) { const el = $('#pet-speech'); el.textContent = `"${text}"`; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'fadeIn 0.3s ease'; }
function getRandomPhrase() { return (PETS[state.petType]?.phrases || ['...'])[Math.floor(Math.random() * PETS[state.petType]?.phrases.length)]; }
function showFloatReward(text) { const el = document.createElement('div'); el.className = 'float-reward'; el.textContent = text; el.style.left = '50%'; el.style.top = '40%'; el.style.transform = 'translateX(-50%)'; document.body.appendChild(el); setTimeout(() => el.remove(), 1500); }

function renderInventory() {
  const grid = $('#inventory');
  if (!state.inventory?.length) { grid.innerHTML = '<span style="color:#ccc;font-size:13px;">暂无道具，完成任务获取奖励</span>'; return; }
  const counts = {};
  state.inventory.forEach(item => { counts[item] = (counts[item] || 0) + 1; });
  grid.innerHTML = Object.entries(counts).map(([item, count]) => `<div class="inventory-item">${item} ×${count}</div>`).join('');
}

// ===== Online System =====
let onlineUnsubscribes = [];
let giftUnsubscribe = null;
let messageUnsubscribe = null;

function initOnline() {
  try {
    // Firebase 可能还没加载完，延迟重试
    const tryInit = () => {
      if (typeof firebase === 'undefined') {
        // 3秒后重试一次
        setTimeout(() => {
          if (typeof firebase === 'undefined') return; // 放弃
          doInit();
        }, 3000);
        return;
      }
      doInit();
    };
    const doInit = () => {
      try {
        if (!Online.init()) return;
        Online.signIn(currentPlayer).then(ok => {
          if (ok) {
            Online.setOnline(state);
            updateOnlineStatus(true);
            listenOnlineData();
          }
        }).catch(e => console.warn('在线登录失败:', e));
      } catch(e) { console.warn('在线功能初始化失败:', e); }
    };
    tryInit();
  } catch(e) {
    console.warn('在线功能初始化失败:', e);
  }
}

function updateOnlineStatus(online) {
  const el = $('#online-status');
  if (el) {
    el.textContent = online ? '在线' : '离线';
    el.className = `online-status ${online ? 'online' : 'offline'}`;
  }
}

function listenOnlineData() {
  // Clean up previous listeners
  onlineUnsubscribes.forEach(fn => fn());
  onlineUnsubscribes = [];

  onlineUnsubscribes.push(Online.listenOnlinePlayers(players => {
    const list = $('#online-players-list');
    const count = $('#online-count');
    if (count) count.textContent = `(${players.length}人)`;
    if (!list) return;
    if (!players.length) { list.innerHTML = '<div class="no-data">暂无其他玩家在线</div>'; return; }
    list.innerHTML = players.map(p => {
      const pet = PETS[p.petType];
      return `<div class="online-player-card" data-uid="${p.uid}"><div class="online-pet-emoji">${pet?.emoji || '🐾'}</div><span class="online-pet-name">${p.name}</span><span class="online-pet-stage">${p.stage || '幼年期'}</span></div>`;
    }).join('');
    list.querySelectorAll('.online-player-card').forEach(card => {
      card.addEventListener('click', () => showPlayerDetail(card.dataset.uid));
    });
  }));

  onlineUnsubscribes.push(Online.listenLeaderboard(players => {
    const list = $('#leaderboard-list');
    if (!list) return;
    if (!players.length) { list.innerHTML = '<div class="no-data">暂无排行数据</div>'; return; }
    list.innerHTML = players.map((p, i) => {
      const pet = PETS[p.petType];
      const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
      return `<div class="lb-item" data-uid="${p.uid}"><span class="lb-rank ${rankClass}">${medal}</span><span class="lb-emoji">${pet?.emoji || '🐾'}</span><div class="lb-info"><span class="lb-name">${p.name}</span><span class="lb-detail">${p.stage || '幼年期'} | 🪙${p.coins || 0}</span></div><span class="lb-intimacy">💕${p.intimacy || 0}</span></div>`;
    }).join('');
    list.querySelectorAll('.lb-item').forEach(item => {
      item.addEventListener('click', () => showPlayerDetail(item.dataset.uid));
    });
  }));

  // Listen for gifts
  if (giftUnsubscribe) giftUnsubscribe();
  giftUnsubscribe = Online.listenGifts(gift => {
    showFloatReward(`${gift.from} 送了 ${gift.emoji}！`);
    addCoins(3);
    renderGifts();
  });

  // Listen for messages
  if (messageUnsubscribe) messageUnsubscribe();
  messageUnsubscribe = Online.listenMessages(msg => {
    renderMessages();
  });
}

async function showPlayerDetail(uid) {
  const player = await Online.getPlayer(uid);
  if (!player) return;
  const pet = PETS[player.petType];
  const modal = $('#player-detail-modal');
  const content = $('#player-detail-content');
  const liked = await Online.hasLiked(uid);

  content.innerHTML = `
    <div class="modal-pet-header">
      <span class="modal-pet-emoji">${pet?.emoji || '🐾'}</span>
      <span class="modal-pet-name">${player.name}</span>
      <span class="modal-pet-stage">${player.stage || '幼年期'}</span>
    </div>
    <div class="modal-stats">
      <div class="modal-stat"><span class="modal-stat-value">💕${player.intimacy || 0}</span><span class="modal-stat-label">亲密度</span></div>
      <div class="modal-stat"><span class="modal-stat-value">🪙${player.coins || 0}</span><span class="modal-stat-label">金币</span></div>
      <div class="modal-stat"><span class="modal-stat-value">😊${player.mood || 0}</span><span class="modal-stat-label">心情</span></div>
      <div class="modal-stat"><span class="modal-stat-value">❤️${player.likes || 0}</span><span class="modal-stat-label">获赞</span></div>
    </div>
    <div class="modal-actions">
      <button class="modal-action-btn" id="modal-like">${liked ? '💔 取消赞' : '❤️ 点赞'}</button>
      <button class="modal-action-btn secondary" id="modal-gift-btn">🎁 送礼物</button>
      <button class="modal-action-btn secondary" id="modal-msg-btn">💬 留言</button>
    </div>
    <div id="modal-gift-grid" class="modal-gift-grid hidden"></div>
    <div id="modal-msg-wrap" class="message-input-wrap hidden" style="margin-top:12px;">
      <input type="text" id="modal-msg-input" placeholder="说点什么..." maxlength="30">
      <button id="modal-msg-send" class="btn-primary" style="padding:6px 12px;font-size:12px;">发送</button>
    </div>
  `;
  modal.classList.remove('hidden');

  // Like button
  $('#modal-like').addEventListener('click', async () => {
    const result = await Online.likePlayer(uid);
    if (result === true) showFloatReward('点赞成功！');
    else if (result === false) showFloatReward('已取消点赞');
    modal.classList.add('hidden');
  });

  // Gift button
  $('#modal-gift-btn').addEventListener('click', () => {
    const grid = $('#modal-gift-grid');
    const msgWrap = $('#modal-msg-wrap');
    msgWrap.classList.add('hidden');
    grid.classList.toggle('hidden');
    if (!grid.classList.contains('hidden')) {
      const gifts = [
        { emoji: '🌹', name: '玫瑰花' }, { emoji: '🎂', name: '蛋糕' }, { emoji: '🍫', name: '巧克力' },
        { emoji: '🧸', name: '小熊' }, { emoji: '💎', name: '宝石' }, { emoji: '⭐', name: '星星' }
      ];
      grid.innerHTML = gifts.map(g => `<div class="modal-gift-item" data-gift-emoji="${g.emoji}" data-gift-name="${g.name}" title="${g.name}">${g.emoji}</div>`).join('');
      grid.querySelectorAll('.modal-gift-item').forEach(item => {
        item.addEventListener('click', async () => {
          await Online.sendGift(uid, item.dataset.giftEmoji, item.dataset.giftName);
          showFloatReward(`送了 ${item.dataset.giftEmoji} ${item.dataset.giftName}！`);
          modal.classList.add('hidden');
        });
      });
    }
  });

  // Message button
  $('#modal-msg-btn').addEventListener('click', () => {
    const msgWrap = $('#modal-msg-wrap');
    const grid = $('#modal-gift-grid');
    grid.classList.add('hidden');
    msgWrap.classList.toggle('hidden');
    if (!msgWrap.classList.contains('hidden')) {
      $('#modal-msg-input').focus();
      $('#modal-msg-send').addEventListener('click', async () => {
        const text = $('#modal-msg-input').value.trim();
        if (!text) return;
        await Online.leaveMessage(uid, text);
        showFloatReward('留言已发送！');
        modal.classList.add('hidden');
      });
      $('#modal-msg-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') $('#modal-msg-send').click();
      });
    }
  });

  // Close modal
  $('#modal-close').addEventListener('click', () => modal.classList.add('hidden'));
  modal.querySelector('.modal-overlay').addEventListener('click', () => modal.classList.add('hidden'));
}

function renderGifts() {
  const list = $('#gifts-list');
  if (!list) return;
  // Read from localStorage since gifts are ephemeral
  list.innerHTML = '<div class="no-data">收到的礼物会在这里显示</div>';
}

function renderMessages() {
  const list = $('#message-list');
  if (!list) return;
  list.innerHTML = '<div class="no-data">留言会在这里显示</div>';
}

function renderOnline() {
  renderCoins();
  updateOnlineStatus(Online.isOnline());
  if (Online.isOnline()) Online.syncPlayerData(state);
}

// Sync data periodically when online
function startOnlineSync() {
  setInterval(() => {
    if (Online.isOnline() && state?.petType) {
      Online.syncPlayerData(state);
    }
  }, 60000);
}

// ===== Event Binding =====
function bindEvents() {
  // Login
  $('#login-btn').addEventListener('click', () => loginWithName($('#login-name-input').value));
  $('#login-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') loginWithName($('#login-name-input').value); });

  // Logout
  $('#logout-btn').addEventListener('click', () => {
    if (confirm('确定要切换账号吗？当前进度已自动保存。')) {
      save();
      if (thoughtTimer) clearInterval(thoughtTimer);
      if (furnitureBoostTimer) clearInterval(furnitureBoostTimer);
      if (growthTimer) clearInterval(growthTimer);
      if (miniGameRAF) { cancelAnimationFrame(miniGameRAF); miniGameRAF = null; }
      if (Online.isOnline()) Online.setOffline();
      onlineUnsubscribes.forEach(fn => fn());
      onlineUnsubscribes = [];
      state = null;
      currentPlayer = null;
      showScreen('login');
      renderLoginSaves();
      $('#login-name-input').value = '';
    }
  });

  $$('.pet-card').forEach(card => card.addEventListener('click', () => selectPet(card.dataset.pet)));
  $('#confirm-name-btn').addEventListener('click', confirmName);
  $('#pet-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') confirmName(); });
  $('#back-to-select').addEventListener('click', () => showScreen('adopt'));
  $('#save-btn').addEventListener('click', () => { save(); showFloatReward('已保存！'); });
  $$('.action-btn').forEach(btn => btn.addEventListener('click', () => doAction(btn.dataset.action)));
  $('#pet-main').addEventListener('click', handleClick);

  // Tab navigation
  $$('.nav-item').forEach(nav => nav.addEventListener('click', () => switchTab(nav.dataset.tab)));

  // Outdoor locations
  $$('.location-card').forEach(card => card.addEventListener('click', () => startExplore(card.dataset.location)));
  $('#explore-back').addEventListener('click', () => { $('#explore-scene').classList.add('hidden'); });

  // Social competitions
  $$('.compete-card').forEach(card => card.addEventListener('click', () => doCompetition(card.dataset.compete)));
  $('#refresh-visitors').addEventListener('click', renderVisitors);

  // Mini games
  $$('.game-menu-card').forEach(card => card.addEventListener('click', () => startMiniGame(card.dataset.minigame)));
  $('#game-quit').addEventListener('click', quitMiniGame);
  $('#game-restart').addEventListener('click', () => startMiniGame(currentMiniGame));
  $('#game-back-menu').addEventListener('click', quitMiniGame);

  // Online message send
  const msgSend = $('#message-send');
  const msgInput = $('#message-input');
  if (msgSend && msgInput) {
    msgSend.addEventListener('click', async () => {
      const text = msgInput.value.trim();
      if (!text || !Online.isOnline()) return;
      // Broadcast to all online players - simplified: just send to leaderboard top player
      showFloatReward('留言功能需要选择具体玩家');
      msgInput.value = '';
    });
    msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') msgSend.click(); });
  }

  initDragDrop();
  initPetting();
  setInterval(() => { if (state?.petType) save(); }, 30000);
  startOnlineSync();
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
