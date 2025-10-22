// 游戏规则显示功能

// 游戏规则内容
const gameRules = {
    cardGame: {
        title: "🎴 扑克牌游戏规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>在不超过淘汰线的前提下，通过摸牌获得尽可能高的总分，最终总分最高且未爆牌者获胜。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>🎴 游戏共有3名玩家：小明、小红和你</li>
                    <li>♻️ 每位玩家轮流选择摸牌或不摸</li>
                    <li>🎯 每人最多可以摸3次牌</li>
                    <li>💥 如果总分超过淘汰线，该玩家爆牌（淘汰）</li>
                    <li>🏆 所有玩家回合结束后，总分最高且未爆牌者获胜</li>
                </ul>
                
                <h3>🎮 怎么玩</h3>
                <ol>
                    <li>选择难度（难度越高，牌点范围越大，淘汰线越高）</li>
                    <li>等待轮到你的回合（界面会高亮显示）</li>
                    <li>查看当前总分，决定是"摸牌"还是"不摸了"</li>
                    <li>总分越接近淘汰线，风险越大</li>
                    <li>所有玩家停止摸牌后，亮牌比大小</li>
                </ol>
                
                <h3>💡 策略提示</h3>
                <p>建议在总分达到淘汰线的70%-85%时停止摸牌，每人最多摸3次，要把握好机会！</p>
            </div>
        `
    },
    
    guessGame: {
        title: "💣 猜数游戏规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>在数字范围内轮流猜数字，谁先踩到"炸弹数字"谁就输了！可以一个人玩，也可以和家长、小伙伴一起轮流玩！</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>💣 系统会在指定范围内随机生成一个"炸弹数字"</li>
                    <li>🎯 玩家轮流点击数字进行猜测</li>
                    <li>📊 每次猜测后，系统会缩小范围</li>
                    <li>✅ 如果你猜的数字比炸弹小，则炸弹比你猜的数字大</li>
                    <li>✅ 如果你猜的数字比炸弹大，则炸弹比你猜的数字小</li>
                    <li>💥 谁猜中炸弹数字，谁就输了！</li>
                </ul>
                
                <h3>🎮 玩法模式</h3>
                <p><strong>👤 单人模式：</strong>尽量避开炸弹，把范围缩小到只剩炸弹数字即可获胜。</p>
                <p><strong>👨‍👩‍👧 多人模式（推荐和家长一起玩）：</strong></p>
                <ol>
                    <li>选择难度（简单1-50，中等1-100，困难1-200）</li>
                    <li>你和家长（或小伙伴）轮流点击数字</li>
                    <li>每次点击后，查看提示信息（比炸弹大/小）</li>
                    <li>范围会持续缩小，越来越刺激！</li>
                    <li>谁点到炸弹数字，谁就输了，对方获胜！</li>
                </ol>
                
                <h3>💡 策略提示</h3>
                <p><strong>单人模式：</strong>建议从中间位置开始猜，这样能更快缩小范围。当范围缩小到很小时，要格外小心！</p>
                <p><strong>多人模式：</strong>轮流猜数字时，要动脑筋选择安全的数字，给对方留下更危险的选择。越接近最后，越考验运气和策略！</p>
                
                <h3>🎉 游戏乐趣</h3>
                <p>和家长一起玩时，每次点击都充满紧张和期待！是谁会踩到炸弹呢？快来挑战吧！</p>
            </div>
        `
    },
    
    matchGame: {
        title: "🎮 数学消消乐规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>通过配对相同结果的数学算式，消除所有方块，完成关卡挑战。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>🧩 网格中有多个包含算式的方块</li>
                    <li>👆 点击两个算式结果相同的方块进行配对</li>
                    <li>✅ 配对成功后方块消失</li>
                    <li>❌ 配对失败会扣除生命值</li>
                    <li>❤️ 生命值耗尽游戏结束</li>
                </ul>
                
                <h3>🎮 游戏模式</h3>
                <ul>
                    <li><strong>普通模式（难度0-3）</strong>：直接显示所有算式，快速心算找出相同结果</li>
                    <li><strong>记忆模式（难度4）</strong>：卡牌初始展示5秒后翻转，考验记忆力</li>
                    <li><strong>无尽模式（难度5）</strong>：每配对成功一组会补充新方块，挑战高分</li>
                </ul>
                
                <h3>💡 策略提示</h3>
                <p>记忆模式要在卡牌展示时快速记忆位置。无尽模式注意保持生命值，不要急于点击！</p>
            </div>
        `
    },
    
    mathWallGame: {
        title: "🧱 数学墙来了规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>控制小熊左右移动，选择正确答案的墙道通过，避开错误答案，成功通过指定数量的墙。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>🎯 屏幕顶部显示目标（算式或结果）</li>
                    <li>🧱 墙从上方下落，每道墙上有不同的答案</li>
                    <li>🐻 玩家需要站在正确答案的墙道上</li>
                    <li>✅ 通过正确答案的墙得分</li>
                    <li>❌ 通过错误答案的墙扣生命</li>
                </ul>
                
                <h3>🎮 怎么玩</h3>
                <ol>
                    <li>选择难度（难度越高，墙道越多）</li>
                    <li>查看屏幕上方的目标</li>
                    <li>使用方向键（← →）或A/D键移动小熊</li>
                    <li>移动到正确答案的墙道下方</li>
                    <li>墙下落到小熊位置时判定</li>
                </ol>
                
                <h3>🕹️ 操作方式</h3>
                <p>电脑：使用键盘 ← → 或 A D 键<br>手机：点击屏幕下方左右按钮</p>
                
                <h3>💡 策略提示</h3>
                <p>快速心算找出正确答案，墙下落速度较快，要提前移动到位！</p>
            </div>
        `
    },
    
    pianoGame: {
        title: "🎹 数学钢琴块规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>判断从上方下落的算式是否正确，点击正确的算式，不点击错误的算式，完成指定数量的正确判断。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>🎹 算式从5列中随机下落</li>
                    <li>✅ 每个算式可能是正确的或错误的</li>
                    <li>👆 点击正确的算式得分</li>
                    <li>❌ 点击错误的算式扣生命</li>
                    <li>💔 正确的算式掉落到底部也会扣生命</li>
                    <li>😊 错误的算式掉落到底部算作正确处理（加分）</li>
                </ul>
                
                <h3>🎮 怎么玩</h3>
                <ol>
                    <li>选择难度（加减法、乘法或无尽模式）</li>
                    <li>观察从顶部下落的算式</li>
                    <li>快速判断算式是否正确</li>
                    <li>看到正确算式：立即点击</li>
                    <li>看到错误算式：不要点击，让它掉落</li>
                </ol>
                
                <h3>💡 策略提示</h3>
                <p>快速扫描算式，心算验证。不确定时宁可不点，减少风险！</p>
            </div>
        `
    },
    
    shoppingGame: {
        title: "🛍️ 购物小达人规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>完成一次完整的购物流程：选购商品、计算总价、支付款项、计算找零，学习实用的购物数学。</p>
                
                <h3>📖 游戏流程（4个步骤）</h3>
                <ol>
                    <li><strong>步骤1：选择商品（扮演顾客）</strong><br>
                    在玩具区、零食区、水果区选购商品</li>
                    
                    <li><strong>步骤2：计算总价（扮演售货员）</strong><br>
                    查看商品清单，计算所有商品的总价</li>
                    
                    <li><strong>步骤3：支付款项（扮演顾客）</strong><br>
                    选择不同面额的钱币进行支付（必须≥应付金额）</li>
                    
                    <li><strong>步骤4：计算找零（扮演售货员）</strong><br>
                    计算应该找给顾客的零钱（支付金额 - 应付金额）</li>
                </ol>
                
                <h3>🎮 怎么玩</h3>
                <ul>
                    <li>💰 选购商品时注意价格，避免超出限制</li>
                    <li>🧮 计算总价时可以按顺序逐个相加</li>
                    <li>💵 支付时尽量选择接近应付金额的钱币组合</li>
                    <li>🔍 找零计算要仔细，检查一遍再提交</li>
                </ul>
                
                <h3>❤️ 生命值系统</h3>
                <p>每个难度都有3次机会，计算错误会扣除生命值，生命值耗尽游戏失败。</p>
            </div>
        `
    },
    
    sudokuGame: {
        title: "🧩 数独游戏规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>在空格中填入数字，使每行、每列（以及子区域）都包含1到N的所有数字，不重复。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>📏 每行必须包含1到N的所有数字（N为网格大小）</li>
                    <li>📐 每列必须包含1到N的所有数字</li>
                    <li>🔲 每个子区域（宫）必须包含1到N的所有数字</li>
                </ul>
                
                <h3>🎮 怎么玩</h3>
                <ol>
                    <li>选择难度（3×3、4×4、6×6或9×9）</li>
                    <li>点击空白格子选中它</li>
                    <li>点击下方的数字按钮填入数字</li>
                    <li>点击"清除"按钮可以删除刚填的数字</li>
                    <li>填满所有格子后，系统会自动检查</li>
                </ol>
                
                <h3>💡 解题技巧</h3>
                <ul>
                    <li><strong>排除法</strong>：看某行/列/宫缺少哪个数字</li>
                    <li><strong>唯一候选法</strong>：某个格子只能填一个数字</li>
                    <li><strong>从简单开始</strong>：先填确定的格子</li>
                    <li><strong>逐步推理</strong>：填入一个数字后，可能会影响其他格子</li>
                </ul>
                
                <h3>🏆 完成标志</h3>
                <p>全部正确会显示通关信息和用时，挑战自己的最快记录吧！</p>
            </div>
        `
    },
    
    klotskiGame: {
        title: "🧩 数字华容道规则",
        content: `
            <div class="rules-content">
                <h3>🎯 游戏目标</h3>
                <p>通过滑动数字方块，将所有数字按从小到大的顺序排列，空格在右下角。</p>
                
                <h3>📖 基本规则</h3>
                <ul>
                    <li>🔢 方块上显示数字和可爱的动物贴纸</li>
                    <li>👆 只能点击与空格相邻的方块进行移动</li>
                    <li>🎯 目标是从左到右、从上到下排列成1、2、3...</li>
                    <li>⏱️ 游戏会记录你的用时和步数</li>
                    <li>🏆 挑战最少步数和最短时间！</li>
                </ul>
                
                <h3>🎮 怎么玩</h3>
                <ol>
                    <li>选择难度（3×3简单、4×4中等、5×5困难）</li>
                    <li>点击与空格相邻的方块，方块会滑动到空格位置</li>
                    <li>逐步移动方块，将所有数字排列正确</li>
                    <li>完成后会显示用时和步数</li>
                    <li>尝试打破自己的最佳记录！</li>
                </ol>
                
                <h3>💡 解题技巧</h3>
                <ul>
                    <li><strong>先完成第一行</strong>：从左到右依次放置1、2、3...</li>
                    <li><strong>再完成第一列</strong>：从上到下继续排列</li>
                    <li><strong>逐步缩小</strong>：将大问题分解成小问题</li>
                    <li><strong>最后3×2区域</strong>：需要特殊技巧，可以点击"提示"查看</li>
                    <li><strong>耐心尝试</strong>：多练习就能找到窍门！</li>
                </ul>
                
                <h3>🏆 挑战目标</h3>
                <p><strong>3×3：</strong>尝试在30步内、1分钟内完成</p>
                <p><strong>4×4：</strong>尝试在80步内、3分钟内完成</p>
                <p><strong>5×5：</strong>尝试在150步内、5分钟内完成</p>
            </div>
        `
    }
};

// 显示游戏规则模态框
function showGameRules(gameType) {
    const rule = gameRules[gameType];
    if (!rule) return;
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'game-rules-modal';
    modal.innerHTML = `
        <div class="game-rules-content">
            <span class="game-rules-close" onclick="closeGameRules()">&times;</span>
            <h2 class="game-rules-title">${rule.title}</h2>
            ${rule.content}
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGameRules();
        }
    });
    
    // 禁止body滚动
    document.body.style.overflow = 'hidden';
}

// 关闭游戏规则模态框
function closeGameRules() {
    const modal = document.querySelector('.game-rules-modal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = 'auto';
}

// 各游戏规则显示函数
function showCardGameRules() {
    showGameRules('cardGame');
}

function showGuessGameRules() {
    showGameRules('guessGame');
}

function showMatchGameRules() {
    showGameRules('matchGame');
}

function showMathWallGameRules() {
    showGameRules('mathWallGame');
}

function showPianoGameRules() {
    showGameRules('pianoGame');
}

function showShoppingGameRules() {
    showGameRules('shoppingGame');
}

function showSudokuGameRules() {
    showGameRules('sudokuGame');
}

function showKlotskiGameRules() {
    showGameRules('klotskiGame');
}
