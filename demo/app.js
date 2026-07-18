import * as d3 from 'd3';

const pageLabels = {
  0: '00 系统导览',
  1: '01 工作台任务页',
  2: '02 新建工作流程 - 产品输入',
  3: '03 卖点输出 + 人工调校',
  4: '04 推广方向确认',
  5: '05 达人列表',
  6: '06 方案管理',
  7: '07 优化内容工作间',
  8: '08 效果回收预期',
  9: '09 真实结果回收',
  10: '10 评价及优化',
};

const creators = [
  { id: 0, name: '达人 A｜旅行', platform: '小红书', tier: '腰部', followers: '7.2w', audience: '18-28 / 女性为主', content: '旅拍 / Vlog', engagement: '7.8%', risk: '低', match: '内容场景高匹配', reason: '场景贴合、节奏自然，适合旅拍切入。' },
  { id: 1, name: '达人 B｜Vlog', platform: 'B站', tier: '腰部', followers: '12.6w', audience: '18-34 / 男女性均衡', content: 'Vlog / 教程', engagement: '8.3%', risk: '低', match: '叙事方式契合', reason: '适合第一人称讲故事，能顺带功能说明。' },
  { id: 2, name: '达人 C｜测评', platform: 'B站', tier: '头部', followers: '45.1w', audience: '18-40 / 男性偏高', content: '测评 / 对比', engagement: '6.9%', risk: '中', match: '转化潜力高', reason: '功能讲解清晰，适合教育型传播。' },
  { id: 3, name: '达人 D｜户外', platform: '抖音', tier: '腰部', followers: '18.8w', audience: '20-35 / 户外兴趣', content: '户外 / 挑战', engagement: '9.1%', risk: '低', match: '曝光扩散强', reason: '视觉冲击强，适合曝光与话题。' },
  { id: 4, name: '达人 E｜摄影教程', platform: '小红书', tier: '长尾', followers: '3.4w', audience: '18-30 / 创作者', content: '教程 / 参数', engagement: '10.2%', risk: '低', match: '教学转化好', reason: '更适合产品功能教育与种草。' },
  { id: 5, name: '达人 F｜运动装备', platform: '抖音', tier: '腰部', followers: '14.3w', audience: '18-28 / 运动人群', content: '运动 / 挑战', engagement: '8.0%', risk: '中', match: '活动引流高', reason: '适合活动引流和短期爆发。' },
  { id: 6, name: '达人 G｜旅行攻略', platform: '小红书', tier: '长尾', followers: '2.8w', audience: '20-35 / 旅行用户', content: '攻略 / 场景', engagement: '11.4%', risk: '低', match: '场景一致', reason: '内容可信度高，适合种草转化。' },
  { id: 7, name: '达人 H｜科技分享', platform: 'B站', tier: '长尾', followers: '5.6w', audience: '18-40 / 科技爱好者', content: '测评 / 教程', engagement: '7.4%', risk: '低', match: '参数讲解强', reason: '适合功能教育与对比测评。' },
];

const briefVariants = [
  { title: '方案 1', duration: '60 秒', format: '旅拍场景', opening: '用真实旅拍场景引出产品', structure: '场景 → 使用 → 亮点 → CTA', cta: '收藏 / 点赞 / 跳转', note: '适合达人 A、G' },
  { title: '方案 2', duration: '90 秒', format: '教程拆解', opening: '先抛出一个使用痛点', structure: '痛点 → 功能说明 → 对比 → 结尾', cta: '关注 / 收藏 / 评论', note: '适合达人 B、E、H' },
  { title: '方案 3', duration: '80 秒', format: '测评对比', opening: '从参数或体验切入', structure: '对比 → 实测 → 优缺点 → 结论', cta: '点击 / 留资 / 转化', note: '适合达人 C、F' },
];

const tasks = [
  {
    title: 'Insta360 X5 中国市场推广',
    status: '进行中',
    progress: 60,
    stage: '卖点已生成｜等待达人匹配',
    actionLabel: '打开当前进度',
    nav: { demand: 4, creator: 5, creatorMode: 'list', dashboard: 8, dashboardTab: 'expected', entryPage: 5, entryMode: 'list' },
    demand: {
      productName: 'Insta360 X5',
      market: '中国市场',
      goalType: '新品曝光',
      targetType: '旅行 / 影像爱好者',
      productType: '运动相机',
      budgetRange: '¥40万-60万',
      direction: '旅拍 / 教程 / 测评',
      taboo: '避免过度硬广',
    },
    creators: { selectedIds: [], shortlistIds: [], summaryReady: false },
    dashboard: {
      expected: { reach: '20w-30w', interaction: '7%-9%', saveRate: '4,800+', conversion: '1.8%-2.4%' },
      real: null,
      optimize: null,
    },
    selectedBriefIndex: null,
    aiPrompt: '希望内容更偏旅拍真实感，同时兼顾功能教育。',
  },
  {
    title: 'Insta360 X4 旅拍测试',
    status: '待匹配',
    progress: 30,
    stage: '已确认方向｜待 shortlist',
    actionLabel: '打开当前进度',
    nav: { demand: 4, creator: 5, creatorMode: 'list', dashboard: 8, dashboardTab: 'expected', entryPage: 5, entryMode: 'list' },
    demand: {
      productName: 'Insta360 X4',
      market: '中国市场',
      goalType: '种草转化',
      targetType: '旅行 / 露营 / 周末出行',
      productType: '全景相机',
      budgetRange: '¥20万-35万',
      direction: '旅拍 Vlog / 场景种草',
      taboo: '避免参数堆砌',
    },
    creators: { selectedIds: [0, 6], shortlistIds: [0, 6], summaryReady: false },
    dashboard: {
      expected: { reach: '12w-20w', interaction: '8%-10%', saveRate: '2,400+', conversion: '2.0%-2.8%' },
      real: null,
      optimize: null,
    },
    selectedBriefIndex: null,
    aiPrompt: '希望以旅拍攻略的方式呈现，轻松一点。',
  },
  {
    title: '360 口袋相机种草',
    status: '待回收',
    progress: 75,
    stage: '已发布 3 支视频｜等待数据回收',
    actionLabel: '打开当前进度',
    nav: { demand: 4, creator: 6, creatorMode: 'manage', dashboard: 9, dashboardTab: 'real', entryPage: 9, entryMode: 'manage' },
    demand: {
      productName: '360 口袋相机',
      market: '中国市场',
      goalType: '种草转化',
      targetType: '年轻内容创作者',
      productType: '口袋相机',
      budgetRange: '¥15万-25万',
      direction: '教程 / 测评 / Vlog',
      taboo: '避免复杂专业术语',
    },
    creators: { selectedIds: [1, 4, 6], shortlistIds: [1, 4, 6], summaryReady: true },
    dashboard: {
      expected: { reach: '18w-28w', interaction: '7%-8.5%', saveRate: '3,200+', conversion: '1.2%-1.8%' },
      real: { reach: '16.8w', interaction: '7.9%', saveRate: '3,410', conversion: '1.5%', notes: '已发布视频 3 条，等待链路回收。' },
      optimize: { verdict: '真实数据接近预期，种草链路偏稳。', gap: '转化略低于预期，评论区问答还可增强。', next: '建议补一个教程型内容，补足产品功能说明。' },
    },
    selectedBriefIndex: 1,
    aiPrompt: '强调教程型内容和真实使用场景。',
  },
  {
    title: '海外新品预热',
    status: '已完成',
    progress: 100,
    stage: '已完成复盘｜可查看结论',
    actionLabel: '打开当前进度',
    nav: { demand: 4, creator: 6, creatorMode: 'manage', dashboard: 10, dashboardTab: 'opt', entryPage: 10, entryMode: 'manage' },
    demand: {
      productName: 'Insta360 新品海外版',
      market: '海外市场',
      goalType: '活动引流',
      targetType: '旅行 / 科技 / 摄影用户',
      productType: '运动相机',
      budgetRange: '¥50万-80万',
      direction: '挑战 / 测评 / 故事型内容',
      taboo: '避免地区语言不匹配',
    },
    creators: { selectedIds: [1, 2, 7], shortlistIds: [1, 2, 7], summaryReady: true },
    dashboard: {
      expected: { reach: '28w-40w', interaction: '6.5%-8%', saveRate: '5,200+', conversion: '2.0%-3.0%' },
      real: { reach: '31.4w', interaction: '8.2%', saveRate: '5,780', conversion: '2.7%', notes: '整体超出预期，品牌词搜索明显提升。' },
      optimize: { verdict: '完成复盘，保留高匹配达人组合。', gap: '挑战型内容扩散强，但解释深度可再补。', next: '下一轮建议维持 B 站 + 小红书组合。' },
    },
    selectedBriefIndex: 2,
    aiPrompt: '希望保留海外挑战感，同时增加产品说明。',
  },
];

const state = {
  currentPage: 0,
  selectedTask: null,
  creatorMode: 'list',
  creatorFocusId: null,
  dashboardTab: 'expected',
  filterPlatform: '全部',
  filterTier: '全部',
  filterContent: '全部',
  filterRisk: '全部',
  filterBudget: '全部',
};

const creatorIndex = new Map(creators.map((creator) => [creator.id, creator]));

function el(tag, className, parent, text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== '') node.textContent = text;
  if (parent) parent.appendChild(node);
  return node;
}

function button(parent, text, className, onClick) {
  const node = el('button', className, parent, text);
  node.type = 'button';
  node.addEventListener('click', (event) => {
    event.stopPropagation();
    onClick?.(event);
  });
  return node;
}

function currentTask() {
  return typeof state.selectedTask === 'number' ? tasks[state.selectedTask] || tasks[0] : tasks[0];
}

function selectedTaskObject() {
  return typeof state.selectedTask === 'number' ? tasks[state.selectedTask] || null : null;
}

function taskEntry(task) {
  return {
    page: task.nav.entryPage ?? task.nav.creator ?? task.nav.dashboard,
    creatorMode: task.nav.entryMode || task.nav.creatorMode,
    dashboardTab: task.nav.dashboardTab,
  };
}

function go(page, options = {}) {
  if (Object.prototype.hasOwnProperty.call(options, 'selectedTask')) state.selectedTask = options.selectedTask;
  if (options.creatorMode) state.creatorMode = options.creatorMode;
  if (Object.prototype.hasOwnProperty.call(options, 'creatorFocusId')) state.creatorFocusId = options.creatorFocusId;
  if (options.dashboardTab) state.dashboardTab = options.dashboardTab;
  if (Object.prototype.hasOwnProperty.call(options, 'selectedBriefIndex')) {
    const task = currentTask();
    task.selectedBriefIndex = options.selectedBriefIndex;
  }
  state.currentPage = page;
  render();
}

function inputField(parent, label, value, onChange, placeholder = '') {
  const wrap = el('div', 'field-block', parent);
  el('div', 'field-label', wrap, label);
  const input = el('input', 'input', wrap);
  input.value = value || '';
  input.placeholder = placeholder;
  input.addEventListener('input', (event) => onChange(event.target.value));
  return wrap;
}

function selectField(parent, label, value, onChange, options) {
  const wrap = el('div', 'field-block', parent);
  el('div', 'field-label', wrap, label);
  const select = el('select', 'input', wrap);
  options.forEach((option) => {
    const item = document.createElement('option');
    item.value = option;
    item.textContent = option;
    select.appendChild(item);
  });
  select.value = value;
  select.addEventListener('change', (event) => onChange(event.target.value));
  return wrap;
}

function textareaField(parent, label, value, onChange, placeholder = '') {
  const wrap = el('div', 'field-block', parent);
  el('div', 'field-label', wrap, label);
  const area = el('textarea', 'input textarea', wrap);
  area.rows = 4;
  area.value = value || '';
  area.placeholder = placeholder;
  area.addEventListener('input', (event) => onChange(event.target.value));
  return wrap;
}

function pageShell(pageId) {
  const root = document.getElementById('app');
  root.innerHTML = '';

  const doc = el('div', 'doc', root);
  const top = el('div', 'topbar', doc);
  const row = el('div', 'title-row', top);
  const left = el('div', 'title', row);
  el('h1', '', left, 'Insta360 一体化营销工作台 Demo');
  el('p', '', left, '工作台围绕需求管理、达人管理和仪表盘展开，点击任务即可进入当前进度页。');
  const right = el('div', 'title-actions', row);
  el('div', 'badge', right, `所在页面：${pageLabels[pageId]}`);
  if (pageId === 0) {
    el('div', 'badge', right, '系统导览页');
  } else if (pageId === 1) {
    button(right, '返回产品任务总览', 'btn', () => go(0, { selectedTask: null }));
  } else {
    button(right, '返回工作台', 'btn', () => go(1, { selectedTask: state.selectedTask, creatorMode: state.creatorMode, dashboardTab: state.dashboardTab }));
  }

  const section = el('div', 'section', doc);
  const head = el('div', 'section-header', section);
  const headLeft = el('div', '', head);
  el('h2', '', headLeft, pageLabels[pageId].replace(/^\d+\s*/, ''));
  el('div', 'sub', headLeft, pageLabels[pageId]);

  const task = selectedTaskObject();
  if (task) {
    const headRight = el('div', 'section-meta', head);
    el('div', 'sub', headRight, `当前任务：${task.title}`);
    el('div', 'sub', headRight, `阶段：${task.stage}`);
  }

  return { doc, section };
}

function sectionTabs(parent, activeKey) {
  const task = currentTask();
  const tabs = [
    { key: 'demand', label: '需求管理', page: task.nav.demand },
    { key: 'creator', label: '达人管理', page: task.nav.creator },
    { key: 'dashboard', label: '仪表盘', page: task.nav.dashboard },
  ];
  const row = el('div', 'section-tabs', parent);
  tabs.forEach((tab) => {
    button(row, tab.label, `tab-btn ${activeKey === tab.key ? 'active' : ''}`, () => {
      if (tab.key === 'creator') {
        go(tab.page, { creatorMode: task.nav.creatorMode });
      } else if (tab.key === 'dashboard') {
        go(tab.page, { dashboardTab: task.nav.dashboardTab });
      } else {
        go(tab.page);
      }
    });
  });
  return row;
}

function dashboardTabs(parent, activeTab) {
  const task = currentTask();
  const row = el('div', 'section-tabs dashboard-tabs', parent);
  [
    { key: 'expected', label: '预期', page: 8 },
    { key: 'real', label: '真实', page: 9 },
    { key: 'opt', label: '评估及优化', page: 10 },
  ].forEach((tab) => {
    button(row, tab.label, `tab-btn ${activeTab === tab.key ? 'active' : ''}`, () => {
      go(tab.page, { dashboardTab: tab.key, selectedTask: state.selectedTask });
    });
  });
  return row;
}

function yellowNote(parent, title, text) {
  const box = el('div', 'note-box', parent);
  el('div', 'note-title', box, title);
  el('div', 'note-text', box, text);
  return box;
}

function selectedCreatorObjects(task = currentTask()) {
  return task.creators.selectedIds.map((id) => creatorIndex.get(id)).filter(Boolean);
}

function creatorBriefIndex(creator) {
  if (!creator) return null;
  if ([0, 6].includes(creator.id)) return 0;
  if ([1, 4, 7].includes(creator.id)) return 1;
  if ([2, 3, 5].includes(creator.id)) return 2;
  return 1;
}

function creatorBriefFor(creator) {
  const index = creatorBriefIndex(creator);
  return typeof index === 'number' ? briefVariants[index] : null;
}

function focusedCreator(task = currentTask()) {
  const selected = selectedCreatorObjects(task);
  if (!selected.length) return null;
  if (state.creatorFocusId !== null && state.creatorFocusId !== undefined) {
    const match = creatorIndex.get(state.creatorFocusId);
    if (match && selected.some((creator) => creator.id === match.id)) return match;
  }
  return selected[0];
}

function shortlistCreatorObjects(task = currentTask()) {
  const ids = task.creators.shortlistIds.length ? task.creators.shortlistIds : task.creators.selectedIds;
  return ids.map((id) => creatorIndex.get(id)).filter(Boolean);
}

function creatorSummary(task = currentTask()) {
  const list = selectedCreatorObjects(task);
  if (!list.length) return null;

  const platforms = list.reduce((acc, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + 1;
    return acc;
  }, {});
  const tiers = list.reduce((acc, item) => {
    acc[item.tier] = (acc[item.tier] || 0) + 1;
    return acc;
  }, {});
  const formats = list.reduce((acc, item) => {
    acc[item.content] = (acc[item.content] || 0) + 1;
    return acc;
  }, {});
  const platformText = Object.entries(platforms).map(([key, value]) => `${key} ${Math.round((value / list.length) * 100)}%`).join(' / ');
  const tierText = Object.entries(tiers).map(([key, value]) => `${key} ${Math.round((value / list.length) * 100)}%`).join(' / ');
  const formatText = Object.entries(formats).map(([key, value]) => `${key} ${Math.round((value / list.length) * 100)}%`).join(' / ');
  return {
    platformText,
    tierText,
    formatText,
    budgetText: task.demand.budgetRange,
    kpiText: task.dashboard.expected ? `${task.dashboard.expected.reach}｜${task.dashboard.expected.interaction}` : '待生成',
  };
}

function creatorPoolFiltered(task = currentTask()) {
  return creators.filter((creator) => {
    const platformHit = state.filterPlatform === '全部' || creator.platform === state.filterPlatform;
    const tierHit = state.filterTier === '全部' || creator.tier === state.filterTier;
    const contentHit = state.filterContent === '全部' || creator.content.includes(state.filterContent);
    const riskHit = state.filterRisk === '全部' || creator.risk === state.filterRisk;
    const budgetHit = state.filterBudget === '全部' || task.demand.budgetRange.includes(state.filterBudget);
    return platformHit && tierHit && contentHit && riskHit && budgetHit;
  });
}

function creatorCard(parent, creator, selected, onToggle, mode = 'pool') {
  const card = el('div', `card creator-card ${selected ? 'active-card' : ''}`, parent);
  card.title = mode === 'shortlist'
    ? (selected ? '点击卡片移出初选' : '点击卡片加入初选')
    : (selected ? '点击卡片取消选择' : '点击卡片选择');
  card.addEventListener('click', () => onToggle?.(creator.id));
  const top = el('div', 'creator-head', card);
  el('strong', '', top, creator.name);
  el('div', 'status', top, selected ? '已选' : '可选');
  el('div', 'subtle', card, `${creator.platform}｜${creator.tier}｜${creator.content}`);
  const meta = el('div', 'creator-meta', card);
  el('div', 'meta-pill', meta, `粉丝 ${creator.followers}`);
  el('div', 'meta-pill', meta, `受众 ${creator.audience}`);
  el('div', 'meta-pill', meta, `互动 ${creator.engagement}`);
  el('div', 'meta-pill', meta, `风险 ${creator.risk}`);
  el('div', 'subtle', card, creator.reason);
  el('div', 'creator-check', card, mode === 'shortlist'
    ? (selected ? '点击卡片移出初选' : '点击卡片加入初选')
    : (selected ? '点击卡片取消选择' : '点击卡片选择'));
  if (mode === 'shortlist') {
    const row = el('div', 'btn-row', card);
    button(row, selected ? '移出初选' : '加入初选', 'btn', () => onToggle?.(creator.id));
  }
  return card;
}

function renderOverviewFlow(section) {
  const panel = el('div', 'panel', section);
  el('h3', '', panel, '页面跳转关系');
  const svg = d3.select(panel)
    .append('svg')
    .attr('viewBox', '0 0 1700 170')
    .style('width', '100%')
    .style('height', '170px');

  svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 8)
    .attr('refY', 5)
    .attr('markerWidth', 7)
    .attr('markerHeight', 7)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
    .attr('fill', '#5a78ff');

  const nodes = [
    { x: 60, label: '00 产品任务总览' },
    { x: 270, label: '01 工作台任务页' },
    { x: 500, label: '02 产品输入' },
    { x: 730, label: '03 卖点输出' },
    { x: 960, label: '04 推广方向确认' },
    { x: 1210, label: '05 达人列表' },
    { x: 1440, label: '06 / 07 / 08 / 09 / 10' },
  ];

  svg.selectAll('line').data(nodes.slice(0, -1)).enter().append('line')
    .attr('x1', (d) => d.x + 140)
    .attr('y1', 76)
    .attr('x2', (d) => d.x + 192)
    .attr('y2', 76)
    .attr('stroke', '#5a78ff')
    .attr('stroke-width', 3)
    .attr('marker-end', 'url(#arrow)');

  const group = svg.selectAll('g').data(nodes).enter().append('g').attr('transform', (d) => `translate(${d.x}, 28)`);
  group.append('rect')
    .attr('rx', 18)
    .attr('ry', 18)
    .attr('width', 150)
    .attr('height', 96)
    .attr('fill', '#ffffff')
    .attr('stroke', '#d7dce4');
  group.append('text')
    .attr('x', 75)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('fill', '#1f2937')
    .style('font-size', '14px')
    .style('font-weight', 700)
    .text((d) => d.label);
  group.append('text')
    .attr('x', 75)
    .attr('y', 64)
    .attr('text-anchor', 'middle')
    .attr('fill', '#667085')
    .style('font-size', '12px')
    .text((d, i) => `P${i}`);

  const row = el('div', 'btn-row', panel);
  button(row, '进入：01 工作台任务页', 'btn primary', () => go(1));
}

function renderPage0() {
  const { section } = pageShell(0);
  const layout = el('div', 'page0-layout', section);
  renderSystemGuide(layout);
  renderNewTaskFlow(layout);
}

function taskJumpText(task) {
  const creatorTarget = task.nav.creator === 5 ? '05 达人列表' : task.nav.creator === 6 ? '06 方案管理' : '07 优化内容工作间';
  const dashboardTarget = task.nav.dashboard === 8 ? '08 效果回收预期' : task.nav.dashboard === 9 ? '09 真实结果回收' : '10 评价及优化';
  return `需求 → 04 推广方向确认｜达人 → ${creatorTarget}｜仪表盘 → ${dashboardTarget}`;
}

function renderTaskProgressCards(parent, task) {
  const grid = el('div', 'workspace-section-grid', parent);
  const sections = [
    { key: 'demand', label: '需求管理', page: task.nav.demand, done: Boolean(task.demand.productName), text: task.demand.direction || '未完成' },
    { key: 'creator', label: '达人管理', page: task.nav.creator, done: task.creators.selectedIds.length > 0, text: task.creators.selectedIds.length ? `${task.creators.selectedIds.length} 位达人已选` : '未完成' },
    { key: 'dashboard', label: '仪表盘', page: task.nav.dashboard, done: Boolean(task.dashboard.real || task.dashboard.optimize), text: task.nav.dashboard === 8 ? '预期' : task.nav.dashboard === 9 ? '真实' : '评估及优化' },
  ];
  sections.forEach((item) => {
    const card = el('div', 'workspace-section', grid);
    const head = el('div', 'section-head', card);
    el('div', 'label', head, item.label);
    el('div', 'desc', head, item.done ? '已完成' : '未完成');
    el('div', 'subtle', card, item.text);
    button(card, `跳到：${pageLabels[item.page].replace(/^\d+\s*/, '')}`, 'btn', () => go(item.page, {
      selectedTask: state.selectedTask,
      creatorMode: item.key === 'creator' && item.page === 5 ? task.nav.creatorMode : state.creatorMode,
      dashboardTab: item.key === 'dashboard' ? task.nav.dashboardTab : state.dashboardTab,
    }));
  });
}

function renderSystemGuide(parent) {
  const panel = el('div', 'panel', parent);
  el('h3', '', panel, '系统导览（展示系统的页面结构及跳转关系）');

  const tree = el('div', 'tree-guide', panel);
  const root = el('div', 'tree-root', tree);
  el('div', 'tree-code', root, '00');
  el('div', 'tree-label', root, '系统导览');
  el('div', 'tree-note', root, '展示页面结构及跳转关系');

  const workbenchBranch = el('div', 'tree-chain tree-chain-tight', tree);
  treeNode(workbenchBranch, '01', '工作台任务页', '点击任务卡片后，用「打开当前进度」进入对应任务');
  const workbenchSub = el('div', 'tree-subchain tree-subchain-tight', workbenchBranch);
  treeNode(workbenchSub, '任务A', '打开当前进度', '进入任务当前阶段页面');
  treeNode(workbenchSub, '任务B', '打开当前进度', '进入任务当前阶段页面');

  const flowBranch = el('div', 'tree-chain tree-chain-tight', tree);
  treeNode(flowBranch, '02', '新建工作流程', '创建一条新的推广任务');
  const flowSub = el('div', 'tree-subchain tree-subchain-tight', flowBranch);
  treeNode(flowSub, '03', '产品输入', '输入产品名与基础信息');
  treeNode(flowSub, '04', '卖点输出 + 人工调校', '系统生成卖点，人工补充校正');
  treeNode(flowSub, '05', '推广方向确认', '确认目标、市场、预算与方向');
  treeNode(flowSub, '06', '达人管理', '候选池 / 初选列表 / 方案管理');
  treeNode(flowSub, '07', '优化内容工作间', '按选定方案进入 AI 优化');
  treeNode(flowSub, '08', '效果回收预期', '投放前预期仪表盘');
  treeNode(flowSub, '09', '真实结果回收', '自动监测 + 人工补录');
  treeNode(flowSub, '10', '评价及优化', '复盘并沉淀结论');

  const actions = el('div', 'btn-row', panel);
  button(actions, '进入工作台任务页', 'btn primary', () => go(1, { selectedTask: null }));

  return panel;
}

function treeNode(parent, code, label, note) {
  const node = el('div', 'tree-node', parent);
  const badge = el('div', 'tree-code', node, code);
  el('div', 'tree-label', node, label);
  if (note) el('div', 'tree-note', node, note);
  return badge;
}

function renderNewTaskFlow(parent) {
  const panel = el('div', 'panel', parent);
  el('h3', '', panel, '新增任务流程');
  const flow = el('div', 'flow-map', panel);
  [
    ['02', '产品输入'],
    ['03', '卖点输出 + 人工调校'],
    ['04', '推广方向确认'],
    ['05', '达人列表'],
    ['候选池', '修改列表后进入筛选'],
    ['06', '方案管理'],
    ['07', '优化内容工作间'],
    ['08', '效果回收预期'],
    ['09', '真实结果回收'],
    ['10', '评价及优化'],
  ].forEach((item, index) => {
    const node = el('div', 'flow-node', flow);
    el('div', 'flow-id', node, item[0]);
    el('div', 'flow-label', node, item[1]);
    if (index < 9) el('div', 'flow-arrow', flow, '→');
  });

  return panel;
}

function renderPage1() {
  const { section } = pageShell(1);
  const layout = el('div', 'workspace-layout', section);

  const taskBoard = el('div', 'panel', layout);
  const taskHead = el('div', 'taskbar', taskBoard);
  el('h3', '', taskHead, '工作任务');
  const taskActionRow = el('div', 'btn-row', taskHead);
  button(taskActionRow, '新建工作流程', 'btn primary', () => go(2, { selectedTask: null }));
  button(taskActionRow, '返回产品任务总览', 'btn', () => go(0, { selectedTask: null }));

  const taskGrid = el('div', 'grid-auto', taskBoard);
  tasks.forEach((task, index) => {
    const card = el('div', 'task-card card', taskGrid);
    if (index === state.selectedTask) card.classList.add('active-card');
    card.addEventListener('click', () => {
      state.selectedTask = index;
      render();
    });
    el('div', 'status', card, task.status);
    el('div', 'title', card, task.title);
    el('div', 'subtle', card, task.stage);
    const progress = el('div', 'progress', card);
    const fill = el('span', '', progress);
    fill.style.width = `${task.progress}%`;
    el('div', 'subtle', card, taskJumpText(task));
    const row = el('div', 'btn-row', card);
    button(row, task.actionLabel, 'btn primary', () => {
      state.selectedTask = index;
      const entry = taskEntry(task);
      go(entry.page, { selectedTask: index, creatorMode: entry.creatorMode, dashboardTab: entry.dashboardTab });
    });
  });

  const current = selectedTaskObject();
  const overview = el('div', 'panel', layout);
  const head = el('div', 'taskbar', overview);
  const titleWrap = el('div', '', head);
  el('h3', '', titleWrap, '当前进度');
  if (current) {
    el('div', 'subtle', titleWrap, `${current.title}｜${current.stage}`);

    const progressGrid = el('div', 'workspace-summary', overview);
    const progCard = el('div', 'kpi', progressGrid);
    el('div', 'label', progCard, '当前页面');
    el('strong', '', progCard, pageLabels[state.currentPage]);
    el('div', 'subtle', progCard, taskJumpText(current));
    renderTaskProgressCards(progressGrid, current);
  } else {
    el('div', 'subtle', titleWrap, '未选择任务');
    el('div', 'empty-state', overview, '未完成');
  }

  yellowNote(overview, '跳转提示', '点击任务卡仅选中任务；点击“打开当前进度”才会进入对应页面。');
}

function renderDemandTopTabs(section) {
  sectionTabs(section, 'demand');
}

function renderPage2() {
  const task = currentTask();
  const { section } = pageShell(2);
  renderDemandTopTabs(section);
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '产品输入');
  inputField(left, '产品名称', task.demand.productName, (value) => { task.demand.productName = value; render(); }, '请输入产品名称');
  inputField(left, '目标市场', task.demand.market, (value) => { task.demand.market = value; render(); }, '例如：中国市场');
  inputField(left, '产品类型', task.demand.productType, (value) => { task.demand.productType = value; render(); }, '例如：运动相机');
  selectField(left, '目标类型', task.demand.goalType, (value) => { task.demand.goalType = value; render(); }, ['新品曝光', '种草转化', '功能教育', '活动引流']);
  inputField(left, '预算范围', task.demand.budgetRange, (value) => { task.demand.budgetRange = value; render(); }, '例如：¥20万-30万');

  const right = el('div', 'panel', grid);
  el('h3', '', right, '当前需求状态');
  if (!task.demand.productName) {
    el('div', 'empty-state', right, '未完成');
  } else {
    [['产品名称', task.demand.productName], ['目标市场', task.demand.market], ['目标类型', task.demand.goalType], ['内容方向', task.demand.direction], ['预算范围', task.demand.budgetRange]].forEach(([label, value]) => {
      const row = el('div', 'list-item', right);
      el('div', 'title', row, label);
      el('div', 'meta', row, value || '未完成');
    });
  }
  yellowNote(right, '跳转提示', '完成产品输入后，点击底部按钮进入卖点输出页面。');

  const actions = el('div', 'btn-row', section);
  button(actions, '下一步：03 卖点输出 + 人工调校', 'btn primary', () => go(3, { selectedTask: state.selectedTask }));
  button(actions, '查看确认页：04 推广方向确认', 'btn', () => go(4, { selectedTask: state.selectedTask }));
}

function renderPage3() {
  const task = currentTask();
  const { section } = pageShell(3);
  renderDemandTopTabs(section);
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '卖点输出');
  const sellingPoints = [
    `1. ${task.demand.productName || '当前产品'} 的核心功能可直接感知`,
    `2. 场景化内容更适合 ${task.demand.targetType || '目标受众'}`,
    `3. 可结合 ${task.demand.goalType || '传播目标'} 设计更自然的开场`,
  ];
  sellingPoints.forEach((item) => el('div', 'list-item', left, item));

  textareaField(left, '人工调校与补充', task.demand.taboo, (value) => { task.demand.taboo = value; render(); }, '例如：避免硬广、避免过度参数');

  const right = el('div', 'panel', grid);
  el('h3', '', right, '校正标签');
  inputField(right, '目标市场', task.demand.market, (value) => { task.demand.market = value; render(); }, '输入目标市场');
  inputField(right, '预算范围', task.demand.budgetRange, (value) => { task.demand.budgetRange = value; render(); }, '输入预算范围');
  inputField(right, '产品类型', task.demand.productType, (value) => { task.demand.productType = value; render(); }, '输入产品类型');
  selectField(right, '推广方向', task.demand.direction, (value) => { task.demand.direction = value; render(); }, ['旅拍 / 教程 / 测评', '种草 / 口碑 / 转化', '挑战 / 互动 / 引流', '功能教育 / 参数说明']);
  yellowNote(right, '跳转提示', '完成卖点输出后，可继续确认推广方向，或者直接切换到达人管理查看当前阶段。');

  const actions = el('div', 'btn-row', section);
  button(actions, '下一步：04 推广方向确认', 'btn primary', () => go(4, { selectedTask: state.selectedTask }));
  button(actions, '返回：02 产品输入', 'btn', () => go(2, { selectedTask: state.selectedTask }));
}

function renderPage4() {
  const task = currentTask();
  const { section } = pageShell(4);
  renderDemandTopTabs(section);
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '需求与推广方向确认');
  if (!task.demand.productName) {
    el('div', 'empty-state', left, '未完成');
  } else {
    [['产品名称', task.demand.productName], ['目标市场', task.demand.market], ['目标类型', task.demand.goalType], ['产品类型', task.demand.productType], ['推广方向', task.demand.direction], ['预算范围', task.demand.budgetRange], ['禁忌条件', task.demand.taboo]].forEach(([label, value]) => {
      const row = el('div', 'list-item', left);
      el('div', 'title', row, label);
      el('div', 'meta', row, value || '未完成');
    });
  }

  const right = el('div', 'panel', grid);
  el('h3', '', right, '状态提示');
  yellowNote(right, '当前阶段', task.demand.productName ? '需求已完成，可继续进入达人列表。' : '当前任务尚未完成需求输入。');

  const actions = el('div', 'btn-row', section);
  button(actions, '进入：05 达人列表', 'btn primary', () => go(task.nav.creator, { selectedTask: state.selectedTask, creatorMode: task.nav.creatorMode }));
  button(actions, '修改需求：02 产品输入', 'btn', () => go(2, { selectedTask: state.selectedTask }));
}

function renderCreatorDashboard(task, parent) {
  const summary = creatorSummary(task);
  const card = el('div', 'panel', parent);
  el('h3', '', card, '方案总览仪表盘');
  if (!summary) {
    el('div', 'empty-state', card, '未完成');
    return;
  }
  const grid = el('div', 'grid-2', card);
  [['平台比例', summary.platformText], ['达人层级比例', summary.tierText], ['内容形式比例', summary.formatText], ['预算建议', summary.budgetText], ['预期 KPI 区间', summary.kpiText], ['当前状态', task.stage]].forEach(([label, value]) => {
    const item = el('div', 'kpi', grid);
    el('div', 'label', item, label);
    el('strong', '', item, value || '未完成');
  });
}

function renderCreatorRationale(task, parent) {
  const list = selectedCreatorObjects(task);
  const card = el('div', 'panel', parent);
  el('h3', '', card, '方案理由');
  if (!list.length) {
    el('div', 'empty-state', card, '未完成');
    return;
  }
  const items = [
    { label: '内容匹配', value: `${list.length} 位达人与产品场景匹配` },
    { label: '受众匹配', value: list.map((item) => item.audience).join('；') },
    { label: '风格匹配', value: list.map((item) => item.match).join('；') },
    { label: '转化潜力', value: list.map((item) => item.engagement).join('；') },
    { label: '风险提示', value: list.some((item) => item.risk !== '低') ? '存在中风险达人，建议平衡搭配' : '整体风险较低' },
  ];
  items.forEach((item) => {
    const row = el('div', 'rationale', card);
    el('div', 'title', row, item.label);
    el('div', 'subtle', row, item.value);
  });
}

function renderSelectedCreatorPanel(task, parent) {
  const panel = el('div', 'panel', parent);
  el('h3', '', panel, '已选达人卡片');
  const list = selectedCreatorObjects(task);
  if (!list.length) {
    el('div', 'empty-state', panel, '未完成');
    return;
  }
  const grid = el('div', 'selected-strip', panel);
  list.forEach((creator) => {
    const card = el('div', 'creator-card selected', grid);
    el('div', 'creator-head', card, creator.name);
    el('div', 'creator-meta', card, `${creator.platform}｜${creator.tier}｜${creator.followers}`);
    el('div', 'subtle', card, `评价：${creator.reason}`);
  });
}

function renderCreatorTabs(parent, activeKey, includeAi = true) {
  const row = el('div', 'section-tabs compact-tabs', parent);
  button(row, '达人列表', `tab-btn ${activeKey === 'list' ? 'active' : ''}`, () => go(5, { selectedTask: state.selectedTask, creatorMode: 'list' }));
  button(row, '方案管理', `tab-btn ${activeKey === 'manage' ? 'active' : ''}`, () => go(6, { selectedTask: state.selectedTask, creatorMode: 'manage' }));
  if (includeAi) {
    button(row, '优化内容工作间', `tab-btn ${activeKey === 'ai' ? 'active' : ''}`, () => go(7, { selectedTask: state.selectedTask, creatorMode: 'ai' }));
  }
}

function renderCreatorFilterAndCards(task, parent, mode) {
  const filterCard = el('div', 'filter-box filter-top', parent);
  el('div', 'field-label', filterCard, '筛选条件（直接影响方案组合）');
  const filterGrid = el('div', 'filter-grid', filterCard);
  selectField(filterGrid, '平台', state.filterPlatform, (value) => { state.filterPlatform = value; render(); }, ['全部', '小红书', 'B站', '抖音']);
  selectField(filterGrid, '层级', state.filterTier, (value) => { state.filterTier = value; render(); }, ['全部', '头部', '腰部', '长尾']);
  selectField(filterGrid, '内容形式', state.filterContent, (value) => { state.filterContent = value; render(); }, ['全部', '测评', '教程', 'Vlog', '挑战', '攻略']);
  selectField(filterGrid, '风险', state.filterRisk, (value) => { state.filterRisk = value; render(); }, ['全部', '低', '中']);
  selectField(filterGrid, '预算', state.filterBudget, (value) => { state.filterBudget = value; render(); }, ['全部', '20万', '30万', '40万', '50万']);

  const header = el('div', 'taskbar', parent);
  el('h3', '', header, mode === 'pool' ? '候选池' : '初选名单');

  const cards = el('div', 'grid-auto', parent);
  const creatorList = mode === 'pool' ? creatorPoolFiltered(task) : shortlistCreatorObjects(task);
  if (!creatorList.length) {
    el('div', 'empty-state', parent, '未完成');
    return;
  }
  creatorList.forEach((creator) => {
    const selected = task.creators.selectedIds.includes(creator.id);
    creatorCard(cards, creator, selected, (id) => {
      if (task.creators.selectedIds.includes(id)) {
        task.creators.selectedIds = task.creators.selectedIds.filter((item) => item !== id);
        task.creators.shortlistIds = task.creators.shortlistIds.filter((item) => item !== id);
      } else {
        task.creators.selectedIds = [...task.creators.selectedIds, id];
        task.creators.shortlistIds = [...new Set([...task.creators.shortlistIds, id])];
      }
      render();
    }, mode);
  });
}

function renderPage5() {
  const task = currentTask();
  const { section } = pageShell(5);
  sectionTabs(section, 'creator');
  const activeTab = state.creatorMode === 'manage' ? 'manage' : state.creatorMode === 'ai' ? 'ai' : 'list';
  renderCreatorTabs(section, activeTab);

  if (state.creatorMode === 'pool') {
    const topbar = el('div', 'taskbar', section);
    const left = el('div', '', topbar);
    el('h3', '', left, '候选池');
    el('div', 'subtle', left, '系统召回的候选达人，可多选加入初选。');
    const actions = el('div', 'btn-row', topbar);
    button(actions, '返回达人列表', 'btn', () => go(5, { selectedTask: state.selectedTask, creatorMode: 'list' }));
    button(actions, '进入初选名单', 'btn primary', () => go(5, { selectedTask: state.selectedTask, creatorMode: 'list' }));
    renderCreatorFilterAndCards(task, section, 'pool');
    return;
  }

  const topGrid = el('div', 'grid-2', section);
  renderCreatorDashboard(task, topGrid);
  renderCreatorRationale(task, topGrid);

  const selectedPanel = el('div', 'panel', section);
  el('h3', '', selectedPanel, '已选达人');
  const selected = selectedCreatorObjects(task);
  if (!selected.length) {
    el('div', 'empty-state', selectedPanel, '未完成');
  } else {
    const strip = el('div', 'selected-strip', selectedPanel);
    selected.forEach((creator) => {
      const card = el('div', 'creator-card selected', strip);
      el('div', 'creator-head', card, creator.name);
      el('div', 'creator-meta', card, `${creator.platform}｜${creator.tier}｜${creator.followers}`);
      el('div', 'subtle', card, `评价：${creator.reason}`);
    });
  }
  const selectedActions = el('div', 'btn-row', selectedPanel);
  button(selectedActions, '修改列表', 'btn primary', () => go(5, { selectedTask: state.selectedTask, creatorMode: 'pool' }));
  button(selectedActions, '进入方案管理', 'btn', () => go(6, { selectedTask: state.selectedTask, creatorMode: 'manage', creatorFocusId: selected[0]?.id ?? null }));
}

function renderCreatorFocusCard(task, parent, creator, active) {
  const card = el('div', `card creator-card ${active ? 'active-card' : ''}`, parent);
  card.title = '点击卡片查看对应方案，并联动右侧方案管理';
  card.addEventListener('click', () => go(6, {
    selectedTask: state.selectedTask,
    creatorMode: 'manage',
    creatorFocusId: creator.id,
  }));
  const top = el('div', 'creator-head', card);
  el('strong', '', top, creator.name);
  el('div', 'status', top, active ? '当前查看' : '可查看');
  el('div', 'subtle', card, `${creator.platform}｜${creator.tier}｜${creator.content}`);
  const meta = el('div', 'creator-meta', card);
  el('div', 'meta-pill', meta, `粉丝 ${creator.followers}`);
  el('div', 'meta-pill', meta, `受众 ${creator.audience}`);
  el('div', 'meta-pill', meta, `互动 ${creator.engagement}`);
  el('div', 'meta-pill', meta, `风险 ${creator.risk}`);
  el('div', 'subtle', card, creator.reason);
  el('div', 'creator-check', card, '点击卡片查看对应方案 →');
  return card;
}

function renderPage6() {
  const task = currentTask();
  const { section } = pageShell(6);
  sectionTabs(section, 'creator');
  renderCreatorTabs(section, 'manage', false);

  const selectedCreators = selectedCreatorObjects(task);
  const focus = focusedCreator(task);
  const focusBrief = creatorBriefFor(focus);
  const selectedBrief = task.selectedBriefIndex !== null && task.selectedBriefIndex !== undefined ? briefVariants[task.selectedBriefIndex] : null;
  const activeBrief = selectedBrief || focusBrief || briefVariants[0];

  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '达人列表');
  if (!selectedCreators.length) {
    el('div', 'empty-state', left, '未完成');
  } else {
    const strip = el('div', 'selected-strip', left);
    selectedCreators.forEach((creator) => renderCreatorFocusCard(task, strip, creator, focus && focus.id === creator.id));
  }
  const leftActions = el('div', 'btn-row', left);
  button(leftActions, '修改列表', 'btn', () => go(5, { selectedTask: state.selectedTask, creatorMode: 'pool' }));

  const right = el('div', 'panel', grid);
  el('h3', '', right, '方案管理');
  el('div', 'subtle', right, '共 3 个推荐方案，可按达人与目标进行选择。');
  if (focus) {
    const focusRow = el('div', 'list-item', right);
    el('div', 'title', focusRow, '当前达人');
    el('div', 'meta', focusRow, `${focus.name}｜${focus.platform}｜${focus.tier}`);
  }

  const selectedIds = new Set(selectedCreators.map((creator) => creator.id));
  briefVariants.forEach((item, index) => {
    const matchedCreators = creators.filter((creator) => creatorBriefIndex(creator) === index && selectedIds.has(creator.id));
    const isSelected = selectedBrief?.title === item.title;
    const card = el('div', `brief ${isSelected ? 'active-card' : ''}`, right);
    el('div', 'title', card, item.title);
    el('div', 'subtle', card, `${item.duration}｜${item.format}`);
    el('div', 'subtle', card, item.opening);
    el('div', 'subtle', card, item.structure);
    el('div', 'subtle', card, item.note);
    if (focus && focusBrief && focusBrief.title === item.title) {
      el('div', 'creator-check', card, `当前达人：${focus.name}`);
    } else if (matchedCreators.length) {
      el('div', 'creator-check', card, `匹配达人：${matchedCreators.map((creator) => creator.name).join('、')}`);
    } else {
      el('div', 'creator-check', card, '当前未选达人对应此方案');
    }
    const actionRow = el('div', 'btn-row', card);
    button(actionRow, isSelected ? '已选' : '选择此方案', isSelected ? 'btn primary' : 'btn', () => {
      task.selectedBriefIndex = index;
      render();
    });
    button(actionRow, '取消', 'btn', () => {
      if (task.selectedBriefIndex === index) task.selectedBriefIndex = null;
      render();
    });
    button(actionRow, '进入优化内容工作间', 'btn primary', () => go(7, {
      selectedTask: state.selectedTask,
      creatorMode: 'ai',
      creatorFocusId: focus?.id ?? null,
      selectedBriefIndex: index,
    }));
  });
}

function renderPage7() {
  const task = currentTask();
  const { section } = pageShell(7);
  sectionTabs(section, 'creator');
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, 'AI 接口');
  const creatorList = selectedCreatorObjects(task);
  const brief = task.selectedBriefIndex !== null && task.selectedBriefIndex !== undefined ? briefVariants[task.selectedBriefIndex] : null;
  if (creatorList.length) {
    const head = el('div', 'list-item', left);
    el('div', 'title', head, '已选达人');
    el('div', 'meta', head, creatorList.map((creator) => creator.name).join('、'));
  } else {
    el('div', 'empty-state', left, '未完成');
  }
  if (brief) {
    const briefCard = el('div', 'brief', left);
    el('div', 'title', briefCard, '已选方案');
    el('div', 'subtle', briefCard, `${brief.title}｜${brief.duration}｜${brief.format}`);
    el('div', 'subtle', briefCard, brief.structure);
  }
  textareaField(left, 'AI 优化提示词', task.aiPrompt, (value) => { task.aiPrompt = value; render(); }, '输入你希望 AI 优化的方向，例如：更偏种草、教程、测评');

  const right = el('div', 'panel', grid);
  el('h3', '', right, '生成结果');
  [['内容角度', '更偏真实使用场景与产品教育'], ['脚本节奏', '开场快、信息分段清晰'], ['镜头建议', '先场景、再功能、最后 CTA'], ['风险修正', '避免过度广告化表达']].forEach(([label, value]) => {
    const row = el('div', 'list-item', right);
    el('div', 'title', row, label);
    el('div', 'meta', row, value);
  });
  yellowNote(right, '说明', brief ? '会根据已选达人与方案生成内容优化建议。' : '当前任务尚未选择方案。');

  const actions = el('div', 'btn-row', section);
  button(actions, '返回达人管理页', 'btn primary', () => go(6, { selectedTask: state.selectedTask, creatorMode: 'manage' }));
}

function renderPage8() {
  const task = currentTask();
  const { section } = pageShell(8);
  sectionTabs(section, 'dashboard');
  dashboardTabs(section, 'expected');
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '预期仪表盘');
  const selectedCreators = selectedCreatorObjects(task);
  const expected = task.dashboard.expected;
  if (!selectedCreators.length) {
    el('div', 'empty-state', left, '未完成');
  } else if (!expected) {
    el('div', 'empty-state', left, '未完成');
  } else {
    [['预期播放', expected.reach], ['预期互动率', expected.interaction], ['预期收藏', expected.saveRate], ['预期转化', expected.conversion]].forEach(([label, value]) => {
      const card = el('div', 'metric', left);
      el('div', 'label', card, label);
      el('strong', '', card, value);
    });
  }

  const right = el('div', 'panel', grid);
  el('h3', '', right, '方案结构');
  const summary = creatorSummary(task);
  if (!summary) {
    el('div', 'empty-state', right, '未完成');
  } else {
    [['平台比例', summary.platformText], ['达人层级比例', summary.tierText], ['内容形式比例', summary.formatText], ['预算建议', summary.budgetText], ['预期 KPI 区间', summary.kpiText]].forEach(([label, value]) => {
      const item = el('div', 'list-item', right);
      el('div', 'title', item, label);
      el('div', 'meta', item, value);
    });
  }
}

function renderPage9() {
  const task = currentTask();
  const { section } = pageShell(9);
  sectionTabs(section, 'dashboard');
  dashboardTabs(section, 'real');
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '真实结果仪表盘');
  if (!task.dashboard.real) {
    el('div', 'empty-state', left, '未完成');
  } else {
    [['真实播放', task.dashboard.real.reach], ['真实互动率', task.dashboard.real.interaction], ['真实收藏', task.dashboard.real.saveRate], ['真实转化', task.dashboard.real.conversion]].forEach(([label, value]) => {
      const card = el('div', 'metric', left);
      el('div', 'label', card, label);
      el('strong', '', card, value);
    });
  }

  const right = el('div', 'panel', grid);
  el('h3', '', right, '自动监测 + 人工补录');
  if (!task.dashboard.real) {
    el('div', 'empty-state', right, '未完成');
  } else {
    ['公开视频数据：播放 / 点赞 / 评论 / 收藏 / 分享', '品牌词搜索 / 官网访问 / 跳转率', '合作发布时间 / 改稿 / 异常备注'].forEach((item) => el('div', 'list-item', right, item));
    textareaField(right, '人工补录', task.dashboard.real.notes || '', (value) => { task.dashboard.real.notes = value; render(); }, '输入人工补录信息');
  }
}

function renderPage10() {
  const task = currentTask();
  const { section } = pageShell(10);
  sectionTabs(section, 'dashboard');
  dashboardTabs(section, 'opt');
  const grid = el('div', 'grid-2', section);

  const left = el('div', 'panel', grid);
  el('h3', '', left, '评估及优化');
  if (!task.dashboard.optimize) {
    el('div', 'empty-state', left, '未完成');
  } else {
    [['复盘结论', task.dashboard.optimize.verdict], ['差距分析', task.dashboard.optimize.gap], ['下一轮建议', task.dashboard.optimize.next]].forEach(([label, value]) => {
      const card = el('div', 'list-item', left);
      el('div', 'title', card, label);
      el('div', 'meta', card, value);
    });
  }

  const right = el('div', 'panel', grid);
  el('h3', '', right, '复盘信息');
  if (!task.dashboard.optimize) {
    el('div', 'empty-state', right, '未完成');
  } else {
    ['保留高匹配达人组合', '补强解释型内容', '优化评论区引导', '下一轮继续跟踪转化链路'].forEach((item) => el('div', 'list-item', right, item));
    yellowNote(right, '跳转提示', '完成复盘后，可以回到工作台开始下一轮任务。');
  }
}

function render() {
  switch (state.currentPage) {
    case 0:
      renderPage0();
      break;
    case 1:
      renderPage1();
      break;
    case 2:
      renderPage2();
      break;
    case 3:
      renderPage3();
      break;
    case 4:
      renderPage4();
      break;
    case 5:
      renderPage5();
      break;
    case 6:
      renderPage6();
      break;
    case 7:
      renderPage7();
      break;
    case 8:
      renderPage8();
      break;
    case 9:
      renderPage9();
      break;
    case 10:
      renderPage10();
      break;
    default:
      renderPage0();
      break;
  }
}

render();
