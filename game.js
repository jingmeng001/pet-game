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

// ===== Game State =====
let state = null;
let thoughtTimer = null;
let pettingState = { active: false, strokes: 0, lastX: 0, lastY: 0 };

function getDefaultState() {
  return {
    petType: null,
    petName: '',
    growth: 0,
    intimacy: 0,
    hunger: 80,
    mood: 80,
    age: 0,
    inventory: [],
    dailyTasksCompleted: [],
    dailyTasksDate: '',
    lastSave: Date.now(),
    totalPlayTime: 0
  };
}

// ===== DOM References =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
  adopt: $('#adopt-screen'),
  name:  $('#name-screen'),
  game:  $('#game-screen')
};

// ===== Screen Management =====
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ===== Save / Load =====
function save() {
  state.lastSave = Date.now();
  localStorage.setItem('pet_game_state', JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem('pet_game_state');
  if (raw) {
    try {
      state = JSON.parse(raw);
      return true;
    } catch(e) { return false; }
  }
  return false;
}

// ===== Init =====
function init() {
  if (load() && state.petType) {
    checkDayReset();
    showScreen('game');
    renderGame();
    startGrowthLoop();
    startThoughtBubble();
  } else {
    showScreen('adopt');
  }
  bindEvents();
}

// ===== Pet Selection =====
function selectPet(type) {
  state = getDefaultState();
  state.petType = type;
  $('#name-preview').textContent = PETS[type].emoji;
  $('#pet-name-input').value = '';
  showScreen('name');
  setTimeout(() => $('#pet-name-input').focus(), 100);
}

// ===== Confirm Name =====
function confirmName() {
  const name = $('#pet-name-input').value.trim();
  if (!name) {
    $('#pet-name-input').style.borderColor = '#e91e63';
    $('#pet-name-input').placeholder = '请给宠物取个名字哦~';
    return;
  }
  state.petName = name;
  state.dailyTasksDate = getToday();
  save();
  showScreen('game');
  renderGame();
  startGrowthLoop();
  startThoughtBubble();
  speak(`${name}来到新家啦！要好好照顾我哦~`);
}

// ===== Day Reset =====
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function checkDayReset() {
  const today = getToday();
  if (state.dailyTasksDate !== today) {
    state.dailyTasksDate = today;
    state.dailyTasksCompleted = [];
    save();
  }
}

// ===== Growth Loop =====
let growthTimer = null;

function startGrowthLoop() {
  if (growthTimer) clearInterval(growthTimer);
  growthTimer = setInterval(() => {
    state.growth += 1;
    state.hunger = Math.max(0, state.hunger - 0.5);
    if (state.hunger < 20) {
      state.mood = Math.max(0, state.mood - 0.3);
    }
    state.age += 0.01;
    renderStats();
    checkStageUp();
    save();
  }, 10000);
}

// ===== Stage Check =====
function getCurrentStage() {
  let stage = STAGES[0];
  for (const s of STAGES) {
    if (state.growth >= s.min) stage = s;
  }
  return stage;
}

function checkStageUp() {
  const stage = getCurrentStage();
  const prevGrowth = state.growth - 1;
  let prevStage = STAGES[0];
  for (const s of STAGES) {
    if (prevGrowth >= s.min) prevStage = s;
  }
  if (stage.name !== prevStage.name) {
    speak(`恭喜！我进化到【${stage.name}】啦！`);
    triggerAnimation('happy');
    showFloatReward(`进化到 ${stage.name}！`);
  }
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
}

function renderStats() {
  const stage = getCurrentStage();
  $('#game-pet-stage').textContent = stage.name;
  $('#stat-age').textContent = formatAge(state.age);

  const nextStage = STAGES.find(s => s.min > state.growth) || STAGES[STAGES.length - 1];
  const prevStageMin = STAGES.filter(s => s.min <= state.growth).pop()?.min || 0;
  const growthPercent = nextStage.min === prevStageMin
    ? 100
    : Math.min(100, ((state.growth - prevStageMin) / (nextStage.min - prevStageMin)) * 100);
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

function formatAge(age) {
  if (age < 1) return Math.floor(age * 30) + ' 天';
  return age.toFixed(1) + ' 岁';
}

// ===== Daily Tasks =====
function renderTasks() {
  const list = $('#task-list');
  const completed = state.dailyTasksCompleted || [];
  const doneCount = completed.length;

  $('#task-progress').textContent = `${doneCount}/10`;

  list.innerHTML = DAILY_TASKS.map(task => {
    const isDone = completed.includes(task.id);
    return `
      <div class="task-item ${isDone ? 'completed' : ''}" data-task="${task.id}">
        <div class="task-check">${isDone ? '✓' : ''}</div>
        <div class="task-info">
          <div class="task-title">${task.title}</div>
          <div class="task-reward">+${task.intimacy} 亲密度 ${task.item ? '| ' + task.item : ''}</div>
        </div>
      </div>
    `;
  }).join('');
}

function completeTask(taskId) {
  if (!state.dailyTasksCompleted) state.dailyTasksCompleted = [];
  if (state.dailyTasksCompleted.includes(taskId)) return;

  const task = DAILY_TASKS.find(t => t.id === taskId);
  if (!task) return;

  state.dailyTasksCompleted.push(taskId);
  state.intimacy += task.intimacy;

  if (task.item) {
    state.inventory.push(task.item);
  }

  save();
  renderTasks();
  renderStats();
  renderInventory();
  showFloatReward(`+${task.intimacy} 亲密度`);
  speak(getRandomPhrase());
}

// ===== Actions =====
function doAction(action) {
  const actionMap = {
    feed:  { stat: 'hunger', value: 20, max: 100, animation: 'eating', msg: '好好吃~' },
    play:  { stat: 'mood',   value: 15, max: 100, animation: 'happy',  msg: '好好玩！' },
    bath:  { stat: 'mood',   value: 10, max: 100, animation: 'happy',  msg: '洗香香~' },
    walk:  { stat: 'mood',   value: 12, max: 100, animation: 'happy',  msg: '出去玩好开心！' },
    talk:  { stat: 'mood',   value: 8,  max: 100, animation: 'happy',  msg: '' },
    photo: { stat: 'mood',   value: 5,  max: 100, animation: 'happy',  msg: '拍得好看吗？' },
    skill: { stat: 'mood',   value: 10, max: 100, animation: 'happy',  msg: '我学会新技能了！' },
    toy:   { stat: 'mood',   value: 12, max: 100, animation: 'happy',  msg: '新玩具！好喜欢！' },
    brush: { stat: 'mood',   value: 8,  max: 100, animation: 'happy',  msg: '好舒服~' },
    sleep: { stat: 'mood',   value: 15, max: 100, animation: 'sleeping', msg: '好困...晚安...' }
  };

  const cfg = actionMap[action];
  if (!cfg) return;

  state[cfg.stat] = Math.min(cfg.max, state[cfg.stat] + cfg.value);
  state.intimacy += 1;

  triggerAnimation(cfg.animation);
  speak(cfg.msg || getRandomPhrase());

  const task = DAILY_TASKS.find(t => t.action === action);
  if (task) {
    completeTask(task.id);
  }

  save();
  renderStats();
}

// ===== 1. Enhanced Click Interaction =====
function handleClick(e) {
  const pet = PETS[state.petType];
  const reactions = pet.clickReactions;
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];

  // Random reaction type
  const reactionType = Math.random();
  if (reactionType < 0.4) {
    // Jump reaction
    triggerAnimation('click-react');
    speak(reaction);
  } else if (reactionType < 0.7) {
    // Tail wag / happy
    triggerAnimation('happy');
    speak(pet.loveClicks[Math.floor(Math.random() * pet.loveClicks.length)]);
  } else {
    // Just speech
    speak(reaction);
  }

  // Spawn hearts
  spawnHearts(e.clientX || e.touches?.[0]?.clientX, e.clientY || e.touches?.[0]?.clientY);

  // Small stat boost
  state.intimacy += 0.5;
  state.mood = Math.min(100, state.mood + 0.3);
  renderStats();
  save();
}

// ===== Hearts Effect =====
function spawnHearts(x, y) {
  const container = $('#hearts-container');
  const count = 3 + Math.floor(Math.random() * 3);
  const hearts = ['❤️', '💕', '💗', '💖', '✨'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Position relative to pet display
    const rect = $('#pet-display').getBoundingClientRect();
    const relX = (x || rect.left + rect.width / 2) - rect.left;
    const relY = (y || rect.top + rect.height / 2) - rect.top;

    heart.style.left = relX + 'px';
    heart.style.top = relY + 'px';
    heart.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    heart.style.fontSize = (16 + Math.random() * 12) + 'px';

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

// ===== 2. Drag & Drop System =====
function initDragDrop() {
  const dragItems = $$('.drag-item');
  const petDisplay = $('#pet-display');
  const petMain = $('#pet-main');

  dragItems.forEach(item => {
    // Mouse drag
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.dataset.dragAction);
      item.classList.add('dragging');
      $('#drag-hint-text').textContent = `把${item.dataset.dragLabel}拖到宠物身上~`;
      $('#drag-hint').classList.remove('hidden');
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      $('#drag-hint').classList.add('hidden');
      petDisplay.classList.remove('drag-over');
    });

    // Touch drag for mobile
    let touchClone = null;
    let touchAction = null;

    item.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchAction = item.dataset.dragAction;
      const touch = e.touches[0];

      touchClone = document.createElement('div');
      touchClone.textContent = item.dataset.dragEmoji;
      touchClone.style.cssText = `
        position: fixed; font-size: 40px; pointer-events: none; z-index: 1000;
        left: ${touch.clientX - 20}px; top: ${touch.clientY - 20}px;
        transition: none;
      `;
      document.body.appendChild(touchClone);
      item.classList.add('dragging');
      $('#drag-hint-text').textContent = `把${item.dataset.dragLabel}拖到宠物身上~`;
      $('#drag-hint').classList.remove('hidden');
    }, { passive: false });

    item.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!touchClone) return;
      const touch = e.touches[0];
      touchClone.style.left = (touch.clientX - 20) + 'px';
      touchClone.style.top = (touch.clientY - 20) + 'px';

      // Check if over pet
      const petRect = petMain.getBoundingClientRect();
      const overPet = touch.clientX >= petRect.left && touch.clientX <= petRect.right &&
                      touch.clientY >= petRect.top && touch.clientY <= petRect.bottom;
      petDisplay.classList.toggle('drag-over', overPet);
    }, { passive: false });

    item.addEventListener('touchend', (e) => {
      if (touchClone) {
        touchClone.remove();
        touchClone = null;
      }
      item.classList.remove('dragging');
      $('#drag-hint').classList.add('hidden');
      petDisplay.classList.remove('drag-over');

      // Check if dropped on pet
      if (touchAction && e.changedTouches[0]) {
        const touch = e.changedTouches[0];
        const petRect = petMain.getBoundingClientRect();
        const overPet = touch.clientX >= petRect.left && touch.clientX <= petRect.right &&
                        touch.clientY >= petRect.top && touch.clientY <= petRect.bottom;
        if (overPet) {
          doAction(touchAction);
          spawnHearts(touch.clientX, touch.clientY);
        }
      }
      touchAction = null;
    });
  });

  // Drop zone
  petDisplay.addEventListener('dragover', (e) => {
    e.preventDefault();
    petDisplay.classList.add('drag-over');
  });

  petDisplay.addEventListener('dragleave', () => {
    petDisplay.classList.remove('drag-over');
  });

  petDisplay.addEventListener('drop', (e) => {
    e.preventDefault();
    petDisplay.classList.remove('drag-over');
    const action = e.dataTransfer.getData('text/plain');
    if (action) {
      doAction(action);
      spawnHearts(e.clientX, e.clientY);
    }
    $('#drag-hint').classList.add('hidden');
  });
}

// ===== 3. Thought Bubble System =====
const THOUGHT_TYPES = {
  hungry: (pet) => ({
    texts: pet.hungryThoughts,
    response: () => {
      state.hunger = Math.min(100, state.hunger + 15);
      speak('谢谢！好好吃~');
      triggerAnimation('eating');
    }
  }),
  mood: (pet) => ({
    texts: pet.moodThoughts,
    response: () => {
      state.mood = Math.min(100, state.mood + 10);
      speak('好开心！' + getRandomPhrase());
      triggerAnimation('happy');
    }
  }),
  love: (pet) => ({
    texts: [`${state.petName}想你了~`, '可以陪我玩吗？', '摸摸我~', '最喜欢你了！'],
    response: () => {
      state.intimacy += 3;
      spawnHearts(null, null);
      speak(pet.loveClicks[Math.floor(Math.random() * pet.loveClicks.length)]);
      triggerAnimation('happy');
    }
  })
};

function startThoughtBubble() {
  if (thoughtTimer) clearInterval(thoughtTimer);

  const showThought = () => {
    if (!state?.petType) return;
    const pet = PETS[state.petType];

    // Choose thought type based on state
    let type;
    if (state.hunger < 30) type = 'hungry';
    else if (state.mood < 40) type = 'mood';
    else type = ['hungry', 'mood', 'love'][Math.floor(Math.random() * 3)];

    const thought = THOUGHT_TYPES[type](pet);
    const text = thought.texts[Math.floor(Math.random() * thought.texts.length)];

    const bubble = $('#thought-bubble');
    const textEl = $('#thought-text');
    const btnEl = $('#thought-respond');

    textEl.textContent = text;
    bubble.classList.remove('hidden');
    bubble.style.animation = 'none';
    void bubble.offsetWidth;
    bubble.style.animation = 'bubblePop 0.4s cubic-bezier(.34,1.56,.64,1)';

    // Auto hide after 8s
    const hideTimeout = setTimeout(() => {
      bubble.classList.add('hidden');
    }, 8000);

    // Respond button
    btnEl.onclick = () => {
      clearTimeout(hideTimeout);
      bubble.classList.add('hidden');
      thought.response();
      state.intimacy += 2;
      renderStats();
      save();
    };
  };

  // Show first thought after 15s, then every 25-40s
  setTimeout(() => {
    showThought();
    thoughtTimer = setInterval(showThought, 25000 + Math.random() * 15000);
  }, 15000);
}

// ===== 4. Petting System =====
function initPetting() {
  const petDisplay = $('#pet-display');
  const petMain = $('#pet-main');
  let isPetting = false;
  let strokeCount = 0;
  let lastPos = { x: 0, y: 0 };
  let pettingTimeout = null;

  function startPet(x, y) {
    // Only start if touching on the pet emoji area
    const rect = petMain.getBoundingClientRect();
    if (x < rect.left - 20 || x > rect.right + 20 || y < rect.top - 20 || y > rect.bottom + 20) return;

    isPetting = true;
    strokeCount = 0;
    lastPos = { x, y };
    petDisplay.classList.add('petting');
    triggerAnimation('petting');
  }

  function movePet(x, y) {
    if (!isPetting) return;

    const dx = x - lastPos.x;
    const dy = y - lastPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 15) {
      strokeCount++;
      lastPos = { x, y };

      // Spawn small hearts during petting
      if (strokeCount % 3 === 0) {
        spawnHearts(x, y);
        state.intimacy += 0.3;
        state.mood = Math.min(100, state.mood + 0.2);
        renderStats();
      }

      // Pet reacts to petting
      if (strokeCount === 5) {
        const pet = PETS[state.petType];
        speak(pet.phrases[Math.floor(Math.random() * pet.phrases.length)]);
      }
      if (strokeCount === 12) {
        speak('呼噜呼噜~ 好舒服...');
      }
      if (strokeCount === 20) {
        speak('太舒服了~ 要融化了~');
        triggerAnimation('happy');
        showFloatReward('+5 亲密度');
        state.intimacy += 5;
        renderStats();
        save();
        stopPet();
      }
    }
  }

  function stopPet() {
    if (!isPetting) return;
    isPetting = false;
    petDisplay.classList.remove('petting');

    if (strokeCount >= 3) {
      speak('好舒服~ 还要摸~');
      save();
    }
    strokeCount = 0;
  }

  // Mouse events
  petDisplay.addEventListener('mousedown', (e) => {
    if (e.target.closest('.thought-bubble')) return;
    startPet(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', (e) => {
    movePet(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', stopPet);

  // Touch events
  petDisplay.addEventListener('touchstart', (e) => {
    if (e.target.closest('.thought-bubble')) return;
    // Don't prevent default here to allow clicking on thought bubble
    if (isPetTouch(e)) {
      e.preventDefault();
      startPet(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if (isPetting) {
      e.preventDefault();
      movePet(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  document.addEventListener('touchend', stopPet);
  document.addEventListener('touchcancel', stopPet);
}

function isPetTouch(e) {
  const petMain = $('#pet-main');
  const rect = petMain.getBoundingClientRect();
  const touch = e.touches[0];
  return touch.clientX >= rect.left - 30 && touch.clientX <= rect.right + 30 &&
         touch.clientY >= rect.top - 30 && touch.clientY <= rect.bottom + 30;
}

// ===== Animations & Effects =====
function triggerAnimation(type) {
  const el = $('#pet-main');
  el.className = 'pet-main-emoji';
  void el.offsetWidth;
  el.classList.add(type);
  const duration = type === 'sleeping' ? 4000 : type === 'petting' ? 3000 : type === 'click-react' ? 400 : 2000;
  setTimeout(() => el.className = 'pet-main-emoji', duration);
}

function speak(text) {
  const el = $('#pet-speech');
  el.textContent = `"${text}"`;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'fadeIn 0.3s ease';
}

function getRandomPhrase() {
  const phrases = PETS[state.petType]?.phrases || ['...'];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function showFloatReward(text) {
  const el = document.createElement('div');
  el.className = 'float-reward';
  el.textContent = text;
  el.style.left = '50%';
  el.style.top = '40%';
  el.style.transform = 'translateX(-50%)';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

// ===== Inventory =====
function renderInventory() {
  const grid = $('#inventory');
  if (!state.inventory || state.inventory.length === 0) {
    grid.innerHTML = '<span style="color:#ccc;font-size:13px;">暂无道具，完成任务获取奖励</span>';
    return;
  }
  const counts = {};
  state.inventory.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  grid.innerHTML = Object.entries(counts).map(([item, count]) => {
    return `<div class="inventory-item">${item} ×${count}</div>`;
  }).join('');
}

// ===== Event Binding =====
function bindEvents() {
  // Pet selection
  $$('.pet-card').forEach(card => {
    card.addEventListener('click', () => selectPet(card.dataset.pet));
  });

  // Name confirmation
  $('#confirm-name-btn').addEventListener('click', confirmName);
  $('#pet-name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmName();
  });
  $('#back-to-select').addEventListener('click', () => showScreen('adopt'));

  // Save button
  $('#save-btn').addEventListener('click', () => {
    save();
    showFloatReward('已保存！');
  });

  // Action buttons
  $$('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => doAction(btn.dataset.action));
  });

  // Enhanced click on pet
  $('#pet-main').addEventListener('click', handleClick);

  // Initialize new systems
  initDragDrop();
  initPetting();

  // Auto-save every 30s
  setInterval(() => { if (state?.petType) save(); }, 30000);
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
