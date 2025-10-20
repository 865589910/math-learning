// 购物小达人游戏

let shoppingGameState = {
    difficulty: 1,
    step: 1, // 1:选商品 2:算总价 3:付款 4:找零
    selectedItems: [], // 已选商品
    totalPrice: 0, // 总价
    userCalculatedPrice: 0, // 用户计算的总价
    paidAmount: 0, // 用户支付的金额
    userCalculatedChange: 0, // 用户计算的找零
    correctChange: 0, // 正确的找零
    score: 0,
    lives: 3
};

// 商品数据
const SHOP_ITEMS = {
    toys: [
        { id: 1, name: '小汽车', price: 15, emoji: '🚗', category: 'toys' },
        { id: 2, name: '洋娃娃', price: 25, emoji: '🪆', category: 'toys' },
        { id: 3, name: '积木', price: 30, emoji: '🧱', category: 'toys' },
        { id: 4, name: '足球', price: 20, emoji: '⚽', category: 'toys' },
        { id: 5, name: '泰迪熊', price: 35, emoji: '🧸', category: 'toys' },
        { id: 6, name: '魔方', price: 12, emoji: '🎲', category: 'toys' },
        { id: 7, name: '飞机', price: 18, emoji: '✈️', category: 'toys' },
        { id: 8, name: '机器人', price: 40, emoji: '🤖', category: 'toys' },
        { id: 9, name: '拼图', price: 22, emoji: '🧩', category: 'toys' },
        { id: 10, name: '玩具枪', price: 28, emoji: '🔫', category: 'toys' }
    ],
    snacks: [
        { id: 11, name: '饼干', price: 8, emoji: '🍪', category: 'snacks' },
        { id: 12, name: '薯片', price: 10, emoji: '🥔', category: 'snacks' },
        { id: 13, name: '巧克力', price: 15, emoji: '🍫', category: 'snacks' },
        { id: 14, name: '糖果', price: 5, emoji: '🍬', category: 'snacks' },
        { id: 15, name: '棒棒糖', price: 3, emoji: '🍭', category: 'snacks' },
        { id: 16, name: '果冻', price: 6, emoji: '🧃', category: 'snacks' },
        { id: 17, name: '蛋糕', price: 20, emoji: '🍰', category: 'snacks' },
        { id: 18, name: '冰淇淋', price: 12, emoji: '🍦', category: 'snacks' },
        { id: 19, name: '爆米花', price: 8, emoji: '🍿', category: 'snacks' },
        { id: 20, name: '甜甜圈', price: 9, emoji: '🍩', category: 'snacks' }
    ],
    fruits: [
        { id: 21, name: '苹果', price: 4, emoji: '🍎', category: 'fruits' },
        { id: 22, name: '香蕉', price: 3, emoji: '🍌', category: 'fruits' },
        { id: 23, name: '橙子', price: 5, emoji: '🍊', category: 'fruits' },
        { id: 24, name: '葡萄', price: 8, emoji: '🍇', category: 'fruits' },
        { id: 25, name: '西瓜', price: 12, emoji: '🍉', category: 'fruits' },
        { id: 26, name: '草莓', price: 10, emoji: '🍓', category: 'fruits' },
        { id: 27, name: '桃子', price: 6, emoji: '🍑', category: 'fruits' },
        { id: 28, name: '樱桃', price: 15, emoji: '🍒', category: 'fruits' },
        { id: 29, name: '菠萝', price: 11, emoji: '🍍', category: 'fruits' },
        { id: 30, name: '柠檬', price: 4, emoji: '🍋', category: 'fruits' }
    ]
};

// 难度配置
const SHOPPING_DIFFICULTY = {
    1: { 
        name: '简单模式', 
        icon: '🐰',
        maxItems: 3, // 最多选3件商品
        maxPrice: 50, // 总价不超过50元
        moneyOptions: [1, 2, 5, 10, 20, 50], // 可用的钱币面额
        description: '最多选3件商品，总价不超过50元'
    },
    2: { 
        name: '普通模式', 
        icon: '🐼',
        maxItems: 5,
        maxPrice: 100,
        moneyOptions: [1, 2, 5, 10, 20, 50, 100],
        description: '最多选5件商品，总价不超过100元'
    },
    3: { 
        name: '困难模式', 
        icon: '🦁',
        maxItems: 8,
        maxPrice: 200,
        moneyOptions: [1, 2, 5, 10, 20, 50, 100],
        description: '最多选8件商品，总价不超过200元'
    }
};

// 打开购物游戏
function openShoppingGame() {
    const modal = document.getElementById('shopping-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 显示难度选择
    document.getElementById('shopping-difficulty-screen').style.display = 'block';
    document.getElementById('shopping-game-screen').style.display = 'none';
}

// 关闭购物游戏
function closeShoppingGame() {
    const modal = document.getElementById('shopping-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 选择难度
function selectShoppingDifficulty(difficulty) {
    shoppingGameState.difficulty = difficulty;
    shoppingGameState.step = 1;
    shoppingGameState.selectedItems = [];
    shoppingGameState.totalPrice = 0;
    shoppingGameState.score = 0;
    shoppingGameState.lives = 3;
    
    // 切换到游戏界面
    document.getElementById('shopping-difficulty-screen').style.display = 'none';
    document.getElementById('shopping-game-screen').style.display = 'block';
    
    // 初始化步骤1：选商品
    initStep1_SelectItems();
}

// 返回难度选择
function backToShoppingDifficulty() {
    document.getElementById('shopping-game-screen').style.display = 'none';
    document.getElementById('shopping-difficulty-screen').style.display = 'block';
}

// ========== 步骤1：选择商品 ==========
function initStep1_SelectItems() {
    shoppingGameState.step = 1;
    shoppingGameState.selectedItems = [];
    
    updateShoppingHeader();
    
    const container = document.getElementById('shopping-step-container');
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    
    container.innerHTML = `
        <div class="shopping-step-title">
            <div class="role-badge customer">🛒 我是顾客</div>
            <h2>第一步：选择要购买的商品</h2>
            <p class="step-hint">最多可以选择 ${config.maxItems} 件商品</p>
        </div>
        
        <div class="shop-categories">
            <div class="category-section">
                <h3 class="category-title">🎮 玩具区</h3>
                <div class="items-grid" id="toys-grid"></div>
            </div>
            
            <div class="category-section">
                <h3 class="category-title">🍭 零食区</h3>
                <div class="items-grid" id="snacks-grid"></div>
            </div>
            
            <div class="category-section">
                <h3 class="category-title">🍎 水果区</h3>
                <div class="items-grid" id="fruits-grid"></div>
            </div>
        </div>
        
        <div class="shopping-cart-preview">
            <h3>🛒 购物车 (<span id="cart-count">0</span>/${config.maxItems})</h3>
            <div id="cart-items" class="cart-items-list">
                <p class="empty-cart">购物车是空的，快去选购商品吧！</p>
            </div>
        </div>
        
        <div class="step-actions">
            <button class="shopping-btn secondary-btn" onclick="backToShoppingDifficulty()">🔙 返回</button>
            <button class="shopping-btn primary-btn" onclick="confirmSelectedItems()" id="confirm-selection-btn" disabled>
                ✅ 确认选购 (继续结账)
            </button>
        </div>
    `;
    
    // 渲染商品
    renderShopItems('toys', SHOP_ITEMS.toys);
    renderShopItems('snacks', SHOP_ITEMS.snacks);
    renderShopItems('fruits', SHOP_ITEMS.fruits);
}

// 渲染商品列表
function renderShopItems(category, items) {
    const grid = document.getElementById(`${category}-grid`);
    grid.innerHTML = '';
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'shop-item-card';
        itemCard.innerHTML = `
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">¥${item.price}</div>
            <button class="add-item-btn" onclick="toggleSelectItem(${item.id})">
                <span class="btn-text">➕ 选择</span>
                <span class="btn-check">✅ 已选</span>
            </button>
        `;
        grid.appendChild(itemCard);
    });
}

// 切换选择商品
function toggleSelectItem(itemId) {
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    const allItems = [...SHOP_ITEMS.toys, ...SHOP_ITEMS.snacks, ...SHOP_ITEMS.fruits];
    const item = allItems.find(i => i.id === itemId);
    
    const index = shoppingGameState.selectedItems.findIndex(i => i.id === itemId);
    
    if (index > -1) {
        // 已选中，取消选择
        shoppingGameState.selectedItems.splice(index, 1);
    } else {
        // 未选中，添加选择
        if (shoppingGameState.selectedItems.length >= config.maxItems) {
            showShoppingMessage(`最多只能选择${config.maxItems}件商品哦！`, 'warning');
            return;
        }
        shoppingGameState.selectedItems.push(item);
    }
    
    updateCartPreview();
    updateItemButtons();
}

// 更新购物车预览
function updateCartPreview() {
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const confirmBtn = document.getElementById('confirm-selection-btn');
    
    cartCount.textContent = shoppingGameState.selectedItems.length;
    
    if (shoppingGameState.selectedItems.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">购物车是空的，快去选购商品吧！</p>';
        confirmBtn.disabled = true;
    } else {
        cartItems.innerHTML = shoppingGameState.selectedItems.map(item => {
            return `
                <div class="cart-item">
                    <span class="cart-item-emoji">${item.emoji}</span>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">¥${item.price}</span>
                    <button class="remove-cart-item" onclick="toggleSelectItem(${item.id})">❌</button>
                </div>
            `;
        }).join('');
        
        confirmBtn.disabled = false;
    }
}

// 更新商品按钮状态
function updateItemButtons() {
    const allItems = [...SHOP_ITEMS.toys, ...SHOP_ITEMS.snacks, ...SHOP_ITEMS.fruits];
    
    allItems.forEach(item => {
        const cards = document.querySelectorAll('.shop-item-card');
        cards.forEach(card => {
            const itemName = card.querySelector('.item-name').textContent;
            if (itemName === item.name) {
                const isSelected = shoppingGameState.selectedItems.some(i => i.id === item.id);
                if (isSelected) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            }
        });
    });
}

// 确认选购的商品
function confirmSelectedItems() {
    if (shoppingGameState.selectedItems.length === 0) {
        showShoppingMessage('请至少选择一件商品！', 'warning');
        return;
    }
    
    // 计算总价
    shoppingGameState.totalPrice = shoppingGameState.selectedItems.reduce((sum, item) => sum + item.price, 0);
    
    // 进入步骤2
    initStep2_CalculateTotal();
}

// ========== 步骤2：计算总价 ==========
function initStep2_CalculateTotal() {
    shoppingGameState.step = 2;
    updateShoppingHeader();
    
    const container = document.getElementById('shopping-step-container');
    
    container.innerHTML = `
        <div class="shopping-step-title">
            <div class="role-badge cashier">💰 我是售货员</div>
            <h2>第二步：计算商品总价</h2>
            <p class="step-hint">请仔细计算顾客购买的商品一共需要多少钱</p>
        </div>
        
        <div class="calculation-area">
            <h3>🧮 请计算总价</h3>
            <div class="calculation-hint">
                <p>提示：把所有商品的价格加起来</p>
            </div>
            <div class="price-input-group">
                <label>总共需要支付：</label>
                <div class="input-with-unit">
                    <input type="number" id="total-price-input" class="price-input" placeholder="请输入金额" min="0" />
                    <span class="unit">元</span>
                </div>
            </div>
        </div>
        
        <div class="purchased-items-list">
            <h3>📋 顾客购买的商品清单</h3>
            <div class="items-detail">
                ${shoppingGameState.selectedItems.map((item, index) => `
                    <div class="purchase-item">
                        <span class="item-number">${index + 1}.</span>
                        <span class="item-emoji">${item.emoji}</span>
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">¥${item.price}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="step-actions">
            <button class="shopping-btn secondary-btn" onclick="initStep1_SelectItems()">🔙 重新选购</button>
            <button class="shopping-btn primary-btn" onclick="checkTotalPrice()">✅ 确认总价</button>
        </div>
    `;
}

// 检查总价计算
function checkTotalPrice() {
    const input = document.getElementById('total-price-input');
    const userPrice = parseInt(input.value);
    
    if (!userPrice || userPrice <= 0) {
        showShoppingMessage('请输入正确的金额！', 'warning');
        return;
    }
    
    shoppingGameState.userCalculatedPrice = userPrice;
    
    if (userPrice === shoppingGameState.totalPrice) {
        showShoppingMessage('✅ 计算正确！顾客需要支付 ¥' + shoppingGameState.totalPrice, 'success');
        shoppingGameState.score += 10;
        setTimeout(() => {
            initStep3_Payment();
        }, 1500);
    } else {
        shoppingGameState.lives--;
        updateShoppingHeader();
        
        if (shoppingGameState.lives <= 0) {
            endShoppingGame(false, '计算错误次数过多');
        } else {
            showShoppingMessage(`❌ 计算错误！正确答案是 ¥${shoppingGameState.totalPrice}，请重新计算（剩余${shoppingGameState.lives}次机会）`, 'error');
            input.value = '';
            input.focus();
        }
    }
}

// ========== 步骤3：付款 ==========
function initStep3_Payment() {
    shoppingGameState.step = 3;
    shoppingGameState.paidAmount = 0;
    updateShoppingHeader();
    
    const container = document.getElementById('shopping-step-container');
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    
    container.innerHTML = `
        <div class="shopping-step-title">
            <div class="role-badge customer">🛒 我是顾客</div>
            <h2>第三步：支付款项</h2>
            <p class="step-hint">应付金额：<span class="highlight-price">¥${shoppingGameState.totalPrice}</span></p>
        </div>
        
        <div class="payment-area">
            <div class="payment-info">
                <div class="info-row">
                    <span>应付金额：</span>
                    <span class="price-display">¥${shoppingGameState.totalPrice}</span>
                </div>
                <div class="info-row">
                    <span>已支付：</span>
                    <span class="price-display paid-amount" id="paid-amount-display">¥0</span>
                </div>
            </div>
            
            <h3>💰 请选择要支付的钱币</h3>
            <p class="payment-hint">提示：支付金额必须大于或等于应付金额</p>
            
            <div class="money-selection">
                ${config.moneyOptions.map(value => {
                    let colorClass = '';
                    if (value === 100) colorClass = 'money-100';
                    else if (value === 50) colorClass = 'money-50';
                    else if (value === 20) colorClass = 'money-20';
                    else if (value === 10) colorClass = 'money-10';
                    else if (value === 5) colorClass = 'money-5';
                    else if (value === 2) colorClass = 'money-2';
                    else if (value === 1) colorClass = 'money-1';
                    
                    return `
                        <button class="money-btn ${colorClass}" onclick="addMoney(${value})">
                            <div class="money-value">¥${value}</div>
                            <div class="money-count" id="money-count-${value}">×0</div>
                        </button>
                    `;
                }).join('')}
            </div>
            
            <div class="selected-money-list" id="selected-money-list">
                <h4>已选择的钱币：</h4>
                <div class="money-items" id="money-items">
                    <p class="empty-hint">还没有选择钱币</p>
                </div>
            </div>
        </div>
        
        <div class="step-actions">
            <button class="shopping-btn secondary-btn" onclick="resetPayment()">🔄 重新支付</button>
            <button class="shopping-btn primary-btn" onclick="confirmPayment()" id="confirm-payment-btn">✅ 确认支付</button>
        </div>
    `;
    
    updatePaymentDisplay();
}

// 添加钱币
function addMoney(value) {
    shoppingGameState.paidAmount += value;
    updatePaymentDisplay();
}

// 更新支付显示
function updatePaymentDisplay() {
    const paidDisplay = document.getElementById('paid-amount-display');
    const confirmBtn = document.getElementById('confirm-payment-btn');
    
    paidDisplay.textContent = `¥${shoppingGameState.paidAmount}`;
    
    // 不再动态更新按钮状态，始终允许点击
    confirmBtn.disabled = false;
    
    // 更新钱币计数
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    const moneyCounts = {};
    
    config.moneyOptions.forEach(value => {
        moneyCounts[value] = 0;
    });
    
    let remaining = shoppingGameState.paidAmount;
    const sortedOptions = [...config.moneyOptions].sort((a, b) => b - a);
    
    sortedOptions.forEach(value => {
        const count = Math.floor(remaining / value);
        if (count > 0) {
            moneyCounts[value] = count;
            remaining -= count * value;
        }
    });
    
    // 更新显示
    config.moneyOptions.forEach(value => {
        const countElem = document.getElementById(`money-count-${value}`);
        if (countElem) {
            countElem.textContent = `×${moneyCounts[value]}`;
        }
    });
    
    // 更新已选钱币列表
    const moneyItems = document.getElementById('money-items');
    if (shoppingGameState.paidAmount === 0) {
        moneyItems.innerHTML = '<p class="empty-hint">还没有选择钱币</p>';
    } else {
        const items = [];
        sortedOptions.forEach(value => {
            if (moneyCounts[value] > 0) {
                items.push(`<span class="money-tag">¥${value} × ${moneyCounts[value]}</span>`);
            }
        });
        moneyItems.innerHTML = items.join('');
    }
}

// 重置支付
function resetPayment() {
    shoppingGameState.paidAmount = 0;
    updatePaymentDisplay();
}

// 确认支付
function confirmPayment() {
    if (shoppingGameState.paidAmount < shoppingGameState.totalPrice) {
        showShoppingMessage('支付金额不足！', 'warning');
        return;
    }
    
    shoppingGameState.score += 10;
    shoppingGameState.correctChange = shoppingGameState.paidAmount - shoppingGameState.totalPrice;
    
    if (shoppingGameState.correctChange === 0) {
        showShoppingMessage('✅ 支付成功！刚好付清，不需要找零！', 'success');
        setTimeout(() => {
            endShoppingGame(true, '完美支付');
        }, 2000);
    } else {
        showShoppingMessage(`✅ 支付成功！应找零 ¥${shoppingGameState.correctChange}`, 'success');
        setTimeout(() => {
            initStep4_CalculateChange();
        }, 1500);
    }
}

// ========== 步骤4：计算找零 ==========
function initStep4_CalculateChange() {
    shoppingGameState.step = 4;
    updateShoppingHeader();
    
    const container = document.getElementById('shopping-step-container');
    
    container.innerHTML = `
        <div class="shopping-step-title">
            <div class="role-badge cashier">💰 我是售货员</div>
            <h2>第四步：计算找零</h2>
            <p class="step-hint">请计算应该找给顾客多少钱</p>
        </div>
        
        <div class="change-calculation-area">
            <div class="transaction-summary">
                <h3>💳 交易信息</h3>
                <div class="summary-row">
                    <span>应收金额：</span>
                    <span class="amount">¥${shoppingGameState.totalPrice}</span>
                </div>
                <div class="summary-row">
                    <span>顾客支付：</span>
                    <span class="amount">¥${shoppingGameState.paidAmount}</span>
                </div>
                <div class="summary-row highlight">
                    <span>应找零：</span>
                    <span class="amount">？？？</span>
                </div>
            </div>
            
            <div class="change-input-area">
                <h3>🧮 请计算找零金额</h3>
                <div class="calculation-hint">
                    <p>提示：找零 = 顾客支付的钱 - 商品总价</p>
                    <p>算式：${shoppingGameState.paidAmount} - ${shoppingGameState.totalPrice} = ?</p>
                </div>
                <div class="price-input-group">
                    <label>应找零：</label>
                    <div class="input-with-unit">
                        <input type="number" id="change-input" class="price-input" placeholder="请输入找零金额" min="0" />
                        <span class="unit">元</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="step-actions">
            <button class="shopping-btn secondary-btn" onclick="initStep1_SelectItems()">🔄 重新开始</button>
            <button class="shopping-btn primary-btn" onclick="checkChange()">✅ 确认找零</button>
        </div>
    `;
}

// 检查找零计算
function checkChange() {
    const input = document.getElementById('change-input');
    const userChange = parseInt(input.value);
    
    if (userChange === undefined || userChange === null || userChange < 0) {
        showShoppingMessage('请输入正确的找零金额！', 'warning');
        return;
    }
    
    shoppingGameState.userCalculatedChange = userChange;
    
    if (userChange === shoppingGameState.correctChange) {
        showShoppingMessage(`✅ 计算正确！应找零 ¥${shoppingGameState.correctChange}`, 'success');
        shoppingGameState.score += 20;
        setTimeout(() => {
            endShoppingGame(true, '全部正确');
        }, 1500);
    } else {
        shoppingGameState.lives--;
        updateShoppingHeader();
        
        if (shoppingGameState.lives <= 0) {
            endShoppingGame(false, '找零计算错误');
        } else {
            showShoppingMessage(`❌ 计算错误！正确答案是 ¥${shoppingGameState.correctChange}，请重新计算（剩余${shoppingGameState.lives}次机会）`, 'error');
            input.value = '';
            input.focus();
        }
    }
}

// 更新游戏头部信息
function updateShoppingHeader() {
    const config = SHOPPING_DIFFICULTY[shoppingGameState.difficulty];
    const difficultyName = document.getElementById('shopping-difficulty-name');
    const scoreDisplay = document.getElementById('shopping-score');
    const livesContainer = document.getElementById('shopping-lives');
    
    if (difficultyName) {
        difficultyName.textContent = config.name;
    }
    
    if (scoreDisplay) {
        scoreDisplay.textContent = shoppingGameState.score;
    }
    
    if (livesContainer) {
        livesContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('span');
            heart.className = 'life-heart';
            heart.textContent = '❤️';
            if (i < shoppingGameState.lives) {
                heart.classList.add('active');
            }
            livesContainer.appendChild(heart);
        }
    }
}

// 显示消息提示
function showShoppingMessage(message, type = 'info') {
    const existingMsg = document.querySelector('.shopping-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `shopping-message ${type}`;
    msgDiv.textContent = message;
    
    document.getElementById('shopping-step-container').prepend(msgDiv);
    
    setTimeout(() => {
        msgDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        msgDiv.classList.remove('show');
        setTimeout(() => msgDiv.remove(), 300);
    }, 3000);
}

// 游戏结束
function endShoppingGame(isSuccess, reason) {
    const container = document.getElementById('shopping-step-container');
    
    if (isSuccess) {
        container.innerHTML = `
            <div class="game-end-screen success">
                <div class="end-icon">🎉</div>
                <h2>恭喜你！购物成功！</h2>
                <p class="end-reason">${reason}</p>
                <div class="end-stats">
                    <div class="stat-item">
                        <div class="stat-label">最终得分</div>
                        <div class="stat-value">⭐ ${shoppingGameState.score} 分</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">购买商品</div>
                        <div class="stat-value">${shoppingGameState.selectedItems.length} 件</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">总花费</div>
                        <div class="stat-value">¥${shoppingGameState.totalPrice}</div>
                    </div>
                </div>
                <div class="end-actions">
                    <button class="shopping-btn primary-btn" onclick="selectShoppingDifficulty(${shoppingGameState.difficulty})">🔄 再玩一次</button>
                    <button class="shopping-btn secondary-btn" onclick="backToShoppingDifficulty()">🏠 返回首页</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="game-end-screen fail">
                <div class="end-icon">😢</div>
                <h2>游戏结束</h2>
                <p class="end-reason">${reason}</p>
                <div class="end-stats">
                    <div class="stat-item">
                        <div class="stat-label">获得分数</div>
                        <div class="stat-value">⭐ ${shoppingGameState.score} 分</div>
                    </div>
                </div>
                <div class="end-actions">
                    <button class="shopping-btn primary-btn" onclick="selectShoppingDifficulty(${shoppingGameState.difficulty})">🔄 重新挑战</button>
                    <button class="shopping-btn secondary-btn" onclick="backToShoppingDifficulty()">🏠 返回首页</button>
                </div>
            </div>
        `;
    }
}
