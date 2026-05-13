// ===== Pet Definitions =====
const PETS = {
  cat:     { emoji: '🐱', name: '小猫咪', phrases: ['喵~ 好开心！', '喵呜~ 想吃小鱼干', '蹭蹭你~', '呼噜呼噜...', '喵~ 陪你玩！'] },
  dog:     { emoji: '🐶', name: '小狗狗', phrases: ['汪！最喜欢你了！', '汪汪~ 出去玩！', '摇尾巴摇尾巴~', '汪~ 好饿呀', '汪！我学会了新技能！'] },
  rabbit:  { emoji: '🐰', name: '小兔子', phrases: ['蹦蹦跳跳~', '想吃胡萝卜！', '蹭蹭~ 好舒服', '耳朵竖起来啦~', '软软的~'] },
  hamster: { emoji: '🐹', name: '小仓鼠', phrases: ['囤囤囤~', '小爪子捧着瓜子~', '圆滚滚~', '吱吱~', '藏了好多好吃的！'] },
  bird:    { emoji: '🐦', name: '小鹦鹉', phrases: ['你好你好~', '叽叽喳喳！', '拍拍翅膀~', '飞到你肩膀上！', '学你说话~'] }
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
    // Online growth
    state.growth += 1;

    // Hunger decreases slowly
    state.hunger = Math.max(0, state.hunger - 0.5);

    // Mood affected by hunger
    if (state.hunger < 20) {
      state.mood = Math.max(0, state.mood - 0.3);
    }

    // Age increases
    state.age += 0.01;

    renderStats();
    checkStageUp();
    save();
  }, 10000); // every 10 seconds
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

  // Growth bar
  const nextStage = STAGES.find(s => s.min > state.growth) || STAGES[STAGES.length - 1];
  const prevStageMin = STAGES.filter(s => s.min <= state.growth).pop()?.min || 0;
  const growthPercent = nextStage.min === prevStageMin
    ? 100
    : Math.min(100, ((state.growth - prevStageMin) / (nextStage.min - prevStageMin)) * 100);
  $('#growth-bar').style.width = growthPercent + '%';
  $('#stat-growth').textContent = `${state.growth}/${nextStage.min}`;

  // Intimacy bar
  const intimacyPercent = Math.min(100, state.intimacy / 10);
  $('#intimacy-bar').style.width = intimacyPercent + '%';
  $('#stat-intimacy').textContent = Math.floor(state.intimacy);

  // Hunger bar
  $('#hunger-bar').style.width = state.hunger + '%';
  $('#stat-hunger').textContent = Math.floor(state.hunger) + '%';

  // Mood bar
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

  // Update stat
  state[cfg.stat] = Math.min(cfg.max, state[cfg.stat] + cfg.value);

  // Small intimacy boost for any interaction
  state.intimacy += 1;

  // Animation
  triggerAnimation(cfg.animation);

  // Speech
  speak(cfg.msg || getRandomPhrase());

  // Check if this completes a daily task
  const task = DAILY_TASKS.find(t => t.action === action);
  if (task) {
    completeTask(task.id);
  }

  save();
  renderStats();
}

// ===== Animations & Effects =====
function triggerAnimation(type) {
  const el = $('#pet-main');
  el.className = 'pet-main-emoji';
  void el.offsetWidth; // force reflow
  el.classList.add(type);
  setTimeout(() => el.className = 'pet-main-emoji', type === 'sleeping' ? 4000 : 2000);
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
  // Count items
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

  // Pet tap
  $('#pet-main').addEventListener('click', () => {
    triggerAnimation('happy');
    speak(getRandomPhrase());
    state.intimacy += 0.5;
    renderStats();
  });

  // Auto-save every 30s
  setInterval(() => { if (state?.petType) save(); }, 30000);
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
