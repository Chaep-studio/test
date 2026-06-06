/* 智选商城 - AI 智能助手
 * 用法：在需要展示的页面引入 <script src="ai-assistant.js"></script>
 * 能力：自然语言理解 + 商品匹配 + 多轮对话 + 一键跳转详情
 */
(function () {
	'use strict';

	// ===== 商品库（与 index.html 的 products 保持同步）=====
	const PRODUCTS = [
		{ id: 1, name: 'ChatGPT Plus 共享账号', desc: 'GPT-4o 畅享，每月额度充足', price: 49.9, oldPrice: 89, tag: 'account', tagLabel: 'AI账号', img: 'img/chatgpt.jpg.jpg', sold: 2300 },
		{ id: 2, name: 'Claude Pro 独享账号', desc: 'Anthropic Claude 旗舰模型', price: 99, oldPrice: 159, tag: 'account', tagLabel: 'AI账号', img: 'img/Claude.jpg.jpg', sold: 890 },
		{ id: 3, name: 'Midjourney 标准会员', desc: 'AI绘画利器，15小时快速出图', price: 68, oldPrice: 128, tag: 'account', tagLabel: 'AI账号', img: 'img/mid.jpg.jpg', sold: 1560 },
		{ id: 4, name: 'AI 写作提示词合集', desc: '200+ 精选写作提示词', price: 19.9, oldPrice: 39, tag: 'prompt', tagLabel: '提示词', img: 'img/xiezuo.jpg.jpeg', sold: 3200 },
		{ id: 5, name: 'AI 绘画大师提示词', desc: 'Midjourney/SD 出图提示词', price: 29.9, oldPrice: 59, tag: 'prompt', tagLabel: '提示词', img: 'img/2.jpg.jpg', sold: 2100 },
		{ id: 6, name: 'AI 编程辅助提示词', desc: '代码生成调试重构模板', price: 15.9, oldPrice: 35, tag: 'prompt', tagLabel: '提示词', img: 'img/codex,jpg.jpeg', sold: 1800 },
		{ id: 7, name: 'Coze 智能客服工作流', desc: '开箱即用自动客服Agent', price: 39.9, oldPrice: 79, tag: 'workflow', tagLabel: '工作流', img: 'img/coze.jpg.png', sold: 670 },
		{ id: 8, name: 'Dify 内容创作工作流', desc: '文章/摘要/翻译自动化', price: 35, oldPrice: 69, tag: 'workflow', tagLabel: '工作流', img: 'img/dify.jpg.png', sold: 540 },
		{ id: 9, name: 'n8n 数据采集工作流', desc: '网页抓取+AI分析处理', price: 45, oldPrice: 89, tag: 'workflow', tagLabel: '工作流', img: 'img/n8n.jpg.png', sold: 430 },
		{ id: 10, name: 'Cursor Pro 激活码', desc: 'AI编程神器效率翻倍', price: 59, oldPrice: 99, tag: 'tool', tagLabel: 'AI工具', img: 'img/cursor.jpg', sold: 1200 }
	];

	// ===== 注入样式 =====
	const style = document.createElement('style');
	style.textContent = `
		/* 悬浮气泡 */
		.ai-bubble{position:fixed;right:24px;bottom:40px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#e60012 0%,#ff4d4f 100%);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(230,0,18,.35);z-index:998;transition:all .25s;font-size:24px;user-select:none}
		.ai-bubble:hover{transform:scale(1.08);box-shadow:0 8px 24px rgba(230,0,18,.45)}
		.ai-bubble:active{transform:scale(.95)}
		.ai-bubble.hide{display:none}
		.ai-bubble .pulse{position:absolute;top:-2px;right:-2px;width:12px;height:12px;background:#52c41a;border:2px solid #fff;border-radius:50%;animation:aiPulse 1.6s infinite}
		@keyframes aiPulse{0%{box-shadow:0 0 0 0 rgba(82,196,26,.6)}70%{box-shadow:0 0 0 8px rgba(82,196,26,0)}100%{box-shadow:0 0 0 0 rgba(82,196,26,0)}}

		/* 聊天窗口 */
		.ai-panel{position:fixed;right:24px;bottom:112px;width:380px;height:560px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.18);z-index:999;display:none;flex-direction:column;overflow:hidden;border:1px solid #eee;animation:aiSlideUp .25s ease}
		.ai-panel.open{display:flex}
		@keyframes aiSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

		/* 头部 */
		.ai-header{background:linear-gradient(135deg,#e60012 0%,#ff4d4f 100%);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
		.ai-avatar{width:36px;height:36px;border-radius:50%;background:#fff;color:#e60012;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0}
		.ai-header-info{flex:1;min-width:0}
		.ai-header-info h4{font-size:14px;font-weight:600;margin-bottom:2px}
		.ai-header-info p{font-size:11px;opacity:.9;display:flex;align-items:center;gap:4px}
		.ai-header-info p::before{content:'';display:inline-block;width:6px;height:6px;background:#52c41a;border-radius:50%;box-shadow:0 0 0 2px rgba(82,196,26,.3)}
		.ai-close{background:rgba(255,255,255,.2);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .2s}
		.ai-close:hover{background:rgba(255,255,255,.35)}

		/* 对话区 */
		.ai-body{flex:1;overflow-y:auto;padding:16px;background:#f7f8fa;scroll-behavior:smooth}
		.ai-body::-webkit-scrollbar{width:4px}
		.ai-body::-webkit-scrollbar-thumb{background:#d9d9d9;border-radius:2px}
		.ai-msg{display:flex;gap:8px;margin-bottom:14px;animation:aiFadeIn .3s}
		@keyframes aiFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
		.ai-msg .av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#e60012,#ff4d4f);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
		.ai-msg .bubble{background:#fff;border:1px solid #eee;border-radius:10px 10px 10px 2px;padding:10px 12px;font-size:13px;line-height:1.6;color:#333;max-width:78%;word-break:break-word;box-shadow:0 1px 2px rgba(0,0,0,.04)}
		.ai-msg.user{flex-direction:row-reverse}
		.ai-msg.user .av{background:#333}
		.ai-msg.user .bubble{background:#e60012;color:#fff;border-color:#e60012;border-radius:10px 10px 2px 10px}

		/* 快捷问题 */
		.ai-quick{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
		.ai-quick .chip{background:#fff;border:1px solid #e60012;color:#e60012;padding:5px 12px;border-radius:14px;font-size:12px;cursor:pointer;transition:all .2s}
		.ai-quick .chip:hover{background:#e60012;color:#fff}

		/* 商品卡 */
		.ai-products{display:grid;grid-template-columns:1fr;gap:8px;margin-top:8px}
		.ai-prod{background:#fff;border:1px solid #eee;border-radius:8px;padding:8px;display:flex;gap:10px;align-items:center;cursor:pointer;transition:all .2s;text-decoration:none;color:inherit}
		.ai-prod:hover{border-color:#e60012;box-shadow:0 4px 12px rgba(0,0,0,.06);transform:translateY(-1px)}
		.ai-prod img{width:56px;height:56px;border-radius:6px;object-fit:cover;flex-shrink:0;background:#fafafa}
		.ai-prod-info{flex:1;min-width:0}
		.ai-prod-info h5{font-size:13px;color:#333;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.ai-prod-info p{font-size:11px;color:#999;margin-bottom:4px}
		.ai-prod-info .price{color:#e60012;font-weight:700;font-size:14px}
		.ai-prod-info .price .old{color:#ccc;text-decoration:line-through;font-size:11px;font-weight:400;margin-left:4px}
		.ai-prod-tag{display:inline-block;background:#fff0f0;color:#e60012;font-size:10px;padding:1px 6px;border-radius:3px;margin-right:4px}

		/* 输入区 */
		.ai-input{padding:10px 12px;background:#fff;border-top:1px solid #eee;display:flex;gap:8px;align-items:center;flex-shrink:0}
		.ai-input input{flex:1;border:1px solid #e8e8e8;border-radius:20px;padding:9px 14px;font-size:13px;outline:none;transition:border-color .2s;background:#f7f8fa}
		.ai-input input:focus{border-color:#e60012;background:#fff}
		.ai-send{width:36px;height:36px;border-radius:50%;background:#e60012;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}
		.ai-send:hover{background:#c40010}
		.ai-send:disabled{background:#ccc;cursor:not-allowed}
		.ai-send svg{width:16px;height:16px}

		/* 打字动画 */
		.ai-typing{display:inline-flex;gap:3px;padding:4px 0}
		.ai-typing span{width:6px;height:6px;background:#999;border-radius:50%;animation:aiTyping 1.2s infinite}
		.ai-typing span:nth-child(2){animation-delay:.2s}
		.ai-typing span:nth-child(3){animation-delay:.4s}
		@keyframes aiTyping{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}

		/* 移动端适配 */
		@media(max-width:480px){
			.ai-panel{right:0;bottom:0;width:100vw;height:100vh;max-height:100vh;border-radius:0}
			.ai-bubble{bottom:20px;right:20px;width:54px;height:54px;font-size:22px}
		}
	`;
	document.head.appendChild(style);

	// ===== 创建 DOM =====
	const bubble = document.createElement('div');
	bubble.className = 'ai-bubble';
	bubble.title = 'AI 智能助手';
	bubble.innerHTML = '🤖<span class="pulse"></span>';

	const panel = document.createElement('div');
	panel.className = 'ai-panel';
	panel.innerHTML = `
		<div class="ai-header">
			<div class="ai-avatar">AI</div>
			<div class="ai-header-info">
				<h4>智选小助手</h4>
				<p>在线 · 为你挑选最合适的AI商品</p>
			</div>
			<button class="ai-close" aria-label="关闭">×</button>
		</div>
		<div class="ai-body" id="aiBody">
			<div class="ai-msg">
				<div class="av">AI</div>
				<div>
					<div class="bubble">你好！我是智选商城的 AI 助手 👋<br/>告诉我你的需求，比如「我想写小说，预算50以内」或「最便宜的账号」，我帮你找最合适的商品。</div>
					<div class="ai-quick" id="aiQuick">
						<div class="chip" data-q="热门推荐">🔥 热门推荐</div>
						<div class="chip" data-q="最便宜的">💰 最便宜的</div>
						<div class="chip" data-q="有什么AI账号">🤖 AI账号</div>
						<div class="chip" data-q="怎么选提示词">💡 怎么选提示词</div>
						<div class="chip" data-q="工作流能做什么">⚙️ 工作流介绍</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ai-input">
			<input type="text" id="aiInput" placeholder="说说你的需求..." maxlength="200" />
			<button class="ai-send" id="aiSend" aria-label="发送">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
			</button>
		</div>
	`;
	document.body.appendChild(bubble);
	document.body.appendChild(panel);

	// ===== 状态 =====
	const body = panel.querySelector('#aiBody');
	const input = panel.querySelector('#aiInput');
	const sendBtn = panel.querySelector('#aiSend');
	const quick = panel.querySelector('#aiQuick');
	let opened = false;
	let busy = false;

	// ===== 事件 =====
	bubble.addEventListener('click', togglePanel);
	panel.querySelector('.ai-close').addEventListener('click', togglePanel);
	sendBtn.addEventListener('click', send);
	input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) send(); });
	quick.addEventListener('click', e => {
		const chip = e.target.closest('.chip');
		if (chip) handleUserText(chip.dataset.q);
	});

	function togglePanel() {
		opened = !opened;
		panel.classList.toggle('open', opened);
		bubble.classList.toggle('hide', opened);
		if (opened) setTimeout(() => input.focus(), 100);
	}

	function send() {
		const text = input.value.trim();
		if (!text || busy) return;
		input.value = '';
		handleUserText(text);
	}

	function handleUserText(text) {
		if (busy) return;
		busy = true;
		sendBtn.disabled = true;
		appendMsg('user', text);
		showTyping();
		const delay = 380 + Math.random() * 380;
		setTimeout(() => {
			removeTyping();
			const resp = understand(text);
			appendMsg('ai', resp.text, resp.products);
			busy = false;
			sendBtn.disabled = false;
		}, delay);
	}

	function appendMsg(role, text, products) {
		const msg = document.createElement('div');
		msg.className = 'ai-msg ' + role;
		const av = role === 'ai' ? '<div class="av">AI</div>' : '<div class="av">我</div>';
		const bubbleHtml = `<div class="bubble">${escapeHtml(text).replace(/\n/g, '<br/>')}</div>`;
		let extra = '';
		if (products && products.length) {
			extra += '<div class="ai-products">' + products.map(renderProductCard).join('') + '</div>';
		}
		msg.innerHTML = av + '<div>' + bubbleHtml + extra + '</div>';
		body.appendChild(msg);
		body.scrollTop = body.scrollHeight;
		bindProductCards(msg);
	}

	function renderProductCard(p) {
		return `<a class="ai-prod" data-id="${p.id}" href="detail.html?id=${p.id}">
			<img src="${p.img}" alt="${p.name}" onerror="this.style.background='#fafafa';this.removeAttribute('src')"/>
			<div class="ai-prod-info">
				<h5>${escapeHtml(p.name)}</h5>
				<p>${escapeHtml(p.desc)}</p>
				<div><span class="ai-prod-tag">${p.tagLabel}</span><span class="price">¥${p.price}<span class="old">¥${p.oldPrice}</span></span></div>
			</div>
		</a>`;
	}

	function bindProductCards(root) {
		root.querySelectorAll('.ai-prod').forEach(el => {
			el.addEventListener('click', e => {
				// 阻止外层 <a> 默认跳转,自行跳转以便可以关闭面板
				e.preventDefault();
				const id = el.dataset.id;
				togglePanel();
				setTimeout(() => { location.href = 'detail.html?id=' + id; }, 200);
			});
		});
	}

	function showTyping() {
		const t = document.createElement('div');
		t.className = 'ai-msg';
		t.id = 'aiTyping';
		t.innerHTML = '<div class="av">AI</div><div><div class="bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div></div>';
		body.appendChild(t);
		body.scrollTop = body.scrollHeight;
	}
	function removeTyping() {
		const t = document.getElementById('aiTyping');
		if (t) t.remove();
	}

	// ===== 自然语言理解 + 商品匹配 =====
	function understand(text) {
		const q = text.toLowerCase().trim();
		const tokens = q.split(/\s+/).filter(Boolean);

		// 1) 闲聊/问候
		if (/^(你好|hi|hello|嗨|您好|在吗|hey)/i.test(q)) {
			return { text: '你好呀~ 我能帮你：\n• 推荐合适的 AI 账号/提示词/工作流\n• 对比不同商品\n• 解答购买问题\n\n请告诉我你的需求吧！' };
		}
		if (/(谢谢|感谢|thx|thanks)/i.test(q)) {
			return { text: '不客气~ 找到想要的商品了吗？随时再问我 😊' };
		}

		// 2) 分类意图
		const wantAccount = /(账号|账户|会员|gpt|chatgpt|claude|midjourney|mj|cursor)/i.test(q);
		const wantPrompt = /(提示词|prompt|咒语|词条)/i.test(q);
		const wantWorkflow = /(工作流|workflow|coze|dify|n8n|自动化)/i.test(q);
		const wantTool = /(工具|tool|插件|模板|激活码)/i.test(q);

		// 3) 价格意图
		const priceMatch = q.match(/(?:预算|不超过|低于|便宜|少于|小于|≤|<=)?\s*(\d+(?:\.\d+)?)\s*(?:块|元|rmb|¥|￥)?/);
		const budget = priceMatch ? parseFloat(priceMatch[1]) : null;
		const wantCheap = /(便宜|低价|划算|性价比|最便宜|实惠|白菜)/i.test(q);
		const wantExpensive = /(贵的|高端|旗舰|最强|最好|顶级|独享)/i.test(q);
		const wantHot = /(热|爆款|销量|top|推荐|流行|流行)/i.test(q);

		// 4) 用途场景
		const sceneMap = [
			{ keys: ['写作','写文','小说','文案','文章','总结','总结'], tag: 'prompt', label: '写作' },
			{ keys: ['画画','绘画','出图','插画','设计','海报','logo'], tag: 'prompt', label: '绘画', extra: ['midjourney','mj'] },
			{ keys: ['编程','代码','开发','程序员','debug','debug'], tag: 'prompt', label: '编程', extra: ['cursor'] },
			{ keys: ['客服','自动回','机器人','agent'], tag: 'workflow', label: '客服' },
			{ keys: ['采集','爬虫','抓取','数据'], tag: 'workflow', label: '数据采集' },
			{ keys: ['翻译','转写','摘要'], tag: 'workflow', label: '内容处理' }
		];
		const scenes = sceneMap.filter(s => s.keys.some(k => q.includes(k)) || (s.extra && s.extra.some(k => q.includes(k))));

		// 5) 工作流/提示词知识问答
		if (/工作流.{0,5}(是什么|能做什么|干嘛的|介绍)/.test(q) || q === '工作流能做什么') {
			return { text: '工作流 = 预编排好的 AI 自动化流程，开箱即用 🎁\n\n本店三款：\n• Coze 智能客服：自动应答常见问题\n• Dify 内容创作：文章/摘要/翻译一条龙\n• n8n 数据采集：网页抓取 + AI 分析\n\n需要看具体商品吗？' };
		}
		if (/(怎么|如何|怎样).{0,4}选(提示词|prompt)/.test(q) || q === '怎么选提示词') {
			return { text: '选提示词看 3 件事：\n1️⃣ 用途匹配：写作/绘画/编程对应不同词集\n2️⃣ 数量与质量：200+ 合集性价比高\n3️⃣ 适用模型：Midjourney/SD/GPT 词不通用\n\n不确定的话告诉我你用来干嘛，我帮你挑 👇' };
		}
		if (/(怎么|如何|怎样).{0,4}(买|购买|下单|付款)/.test(q)) {
			return { text: '购买超简单：\n1. 选好商品点「立即购买」\n2. 确认订单付款（支持微信/支付宝）\n3. 秒到账 + 自动发货到订单页\n\n需要我推荐几款试试吗？' };
		}
		if (/(售后|退款|发票|安全|靠谱吗|正品)/.test(q)) {
			return { text: '放心下单 🛡️\n• 正品保障：严选供应商\n• 自动发货：付款即到\n• 7天无忧售后：问题包解决\n• 7x24 专属客服' };
		}

		// 6) 按销量/价格/用途筛选
		let results = PRODUCTS.slice();
		let reason = '为你找到这些商品：';

		if (wantAccount) results = results.filter(p => p.tag === 'account');
		else if (wantPrompt) results = results.filter(p => p.tag === 'prompt');
		else if (wantWorkflow) results = results.filter(p => p.tag === 'workflow');
		else if (wantTool) results = results.filter(p => p.tag === 'tool');
		else if (scenes.length) {
			const tags = new Set(scenes.map(s => s.tag));
			results = results.filter(p => tags.has(p.tag));
			reason = '根据你的' + scenes.map(s => s.label).join('/') + '需求，推荐：';
		} else {
			// 模糊关键词匹配
			const kwHits = PRODUCTS.filter(p => tokens.some(t => p.name.toLowerCase().includes(t) || p.desc.toLowerCase().includes(t)));
			if (kwHits.length) { results = kwHits; reason = '可能符合「' + text + '」的商品：'; }
			else if (wantHot) reason = '本店销量 TOP：';
			else reason = '推荐几款热门商品：';
		}

		if (budget != null && budget > 0) {
			const before = results.length;
			results = results.filter(p => p.price <= budget);
			if (!results.length) {
				return { text: '预算 ¥' + budget + ' 以内暂时没有合适商品 😢\n要不要提高一点预算？最便宜的提示词只要 ¥15.9' };
			}
			reason = before === results.length ? '¥' + budget + ' 预算内的相关商品：' : '¥' + budget + ' 预算内的相关商品：';
		} else if (wantCheap) {
			results.sort((a, b) => a.price - b.price);
			reason = '从便宜到贵排：';
		} else if (wantExpensive) {
			results.sort((a, b) => b.price - a.price);
			reason = '店里高端款：';
		} else if (wantHot) {
			results.sort((a, b) => b.sold - a.sold);
		}

		results = results.slice(0, 4);
		if (!results.length) {
			return { text: '暂时没找到匹配的商品，试试说「账号」「提示词」「工作流」这类关键词？' };
		}
		return { text: reason, products: results };
	}

	function escapeHtml(s) {
		return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
	}
})();
