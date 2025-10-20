// 数学消消乐游戏
const matchGameState = {
    difficulty: 1,
    score: 0,
    lives: 3, // 难度一到三为3颗心
    blocks: [], // 所有方块
    selectedBlocks: [], // 已选中的方块
    gameOver: false,
    matchedPairs: 0, // 已配对的数量
    gridSize: { rows: 2, cols: 4 }, // 网格大小 - 难度一改为4×2
    isEndlessMode: false, // 是否无尽模式
    isMemoryMode: false, // 是否记忆模式（难度四）
    memoryShowTime: 5000, // 记忆模式展示时间（毫秒）
    memoryFlipTimeout: null, // 记忆模式翻牌计时器
    startTime: null, // 游戏开始时间
    endTime: null, // 游戏结束时间
    elapsedTime: 0 // 用时（秒）
};

// 打开游戏模态框
function openMatchGame() {
    const modal = document.getElementById('match-game-modal');
    modal.style.display = 'block';
    showMatchGameDifficulty();
}

// 关闭游戏模态框
function closeMatchGame() {
    const modal = document.getElementById('match-game-modal');
    modal.style.display = 'none';
}

// 显示难度选择界面
function showMatchGameDifficulty() {
    document.getElementById('match-difficulty-screen').style.display = 'block';
    document.getElementById('match-game-screen').style.display = 'none';
}

// 返回难度选择
function backToMatchDifficulty() {
    showMatchGameDifficulty();
}

// 选择难度并开始游戏
function selectMatchDifficulty(difficulty) {
    matchGameState.difficulty = difficulty;
    
    // 根据难度设置网格大小和模式
    if (difficulty === 0) {
        matchGameState.gridSize = { rows: 4, cols: 4 }; // 4×4 = 16个方块（20以内加法）
        matchGameState.isEndlessMode = false;
        matchGameState.isMemoryMode = false;
    } else if (difficulty === 1) {
        matchGameState.gridSize = { rows: 2, cols: 4 }; // 4×2 = 8个方块
        matchGameState.isEndlessMode = false;
        matchGameState.isMemoryMode = false;
    } else if (difficulty === 2) {
        matchGameState.gridSize = { rows: 4, cols: 4 }; // 4×4 = 16个方块
        matchGameState.isEndlessMode = false;
        matchGameState.isMemoryMode = false;
    } else if (difficulty === 3) {
        matchGameState.gridSize = { rows: 4, cols: 4 }; // 4×4 = 16个方块（含乘法）
        matchGameState.isEndlessMode = false;
        matchGameState.isMemoryMode = false;
    } else if (difficulty === 4) {
        matchGameState.gridSize = { rows: 3, cols: 4 }; // 4×3 = 12个方块（记忆模式）
        matchGameState.isEndlessMode = false;
        matchGameState.isMemoryMode = true;
    } else {
        matchGameState.gridSize = { rows: 3, cols: 4 }; // 4×3 无尽模式（降低难度）
        matchGameState.isEndlessMode = true;
        matchGameState.isMemoryMode = false;
    }
    
    startMatchGame();
}

// 生成算式
function generateExpression(difficulty, targetResult = null) {
    let num1, num2, operator, result;
    
    // 难度零：20以内加法
    if (difficulty === 0) {
        operator = '+';
        
        if (targetResult !== null) {
            result = targetResult;
            // 确保结果在20以内
            if (result > 20) result = 20;
            num1 = Math.floor(Math.random() * Math.min(result, 20)) + 1;
            num2 = result - num1;
        } else {
            num1 = Math.floor(Math.random() * 10) + 1; // 1-10
            num2 = Math.floor(Math.random() * (20 - num1)) + 1; // 确保和不超过20
            result = num1 + num2;
        }
    }
    // 难度三包含乘法，难度四（无尽模式）只有加减法
    else if (difficulty === 3) {
        // 如果指定了目标结果，随机选择运算符类型
        if (targetResult !== null) {
            result = targetResult;
            // 33%乘法，33%加法，34%减法
            const operatorType = Math.random();
            
            if (operatorType < 0.33) {
                // 尝试生成乘法（找因数）
                operator = '×';
                const factors = [];
                for (let i = 1; i <= 9; i++) {
                    if (targetResult % i === 0 && targetResult / i <= 9) {
                        factors.push(i);
                    }
                }
                
                if (factors.length > 0) {
                    // 找到因数，生成乘法
                    num1 = factors[Math.floor(Math.random() * factors.length)];
                    num2 = targetResult / num1;
                } else {
                    // 找不到因数，改用加法
                    operator = '+';
                    num1 = Math.floor(Math.random() * Math.min(result, 99)) + 1;
                    num2 = result - num1;
                }
            } else if (operatorType < 0.66) {
                // 加法
                operator = '+';
                num1 = Math.floor(Math.random() * Math.min(result, 99)) + 1;
                num2 = result - num1;
            } else {
                // 减法
                operator = '-';
                num1 = result + Math.floor(Math.random() * (100 - result));
                num2 = num1 - result;
            }
        } else {
            // 没有指定目标结果，50%乘法，50%加减法
            if (Math.random() > 0.5) {
                // 乘法：9×9以内
                operator = '×';
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                result = num1 * num2;
            } else {
                // 加减法
                operator = Math.random() > 0.5 ? '+' : '-';
                if (operator === '+') {
                    num1 = Math.floor(Math.random() * 50) + 1;
                    num2 = Math.floor(Math.random() * (100 - num1));
                    result = num1 + num2;
                } else {
                    num1 = Math.floor(Math.random() * 100) + 1;
                    num2 = Math.floor(Math.random() * num1);
                    result = num1 - num2;
                }
            }
        }
    } else {
        // 只有加减法（难度一、二、四）
        operator = Math.random() > 0.5 ? '+' : '-';
        
        if (targetResult !== null) {
            result = targetResult;
            if (operator === '+') {
                num1 = Math.floor(Math.random() * Math.min(result, 99)) + 1;
                num2 = result - num1;
            } else {
                num1 = result + Math.floor(Math.random() * (100 - result));
                num2 = num1 - result;
            }
        } else {
            if (operator === '+') {
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * (100 - num1));
                result = num1 + num2;
            } else {
                num1 = Math.floor(Math.random() * 100) + 1;
                num2 = Math.floor(Math.random() * num1);
                result = num1 - num2;
            }
        }
    }
    
    return {
        expression: `${num1} ${operator} ${num2}`,
        result: result,
        num1: num1,
        num2: num2,
        operator: operator
    };
}

// 生成方块（确保有配对）
function generateBlocks() {
    matchGameState.blocks = [];
    const totalBlocks = matchGameState.gridSize.rows * matchGameState.gridSize.cols;
    const usedExpressions = new Set(); // 记录已经使用的算式
    
    // 检查算式是否已存在
    function isExpressionUsed(expression) {
        return usedExpressions.has(expression);
    }
    
    // 生成不重复的算式
    function generateUniqueExpression(difficulty, targetResult = null, maxAttempts = 100) {
        let attempts = 0;
        let expr;
        
        do {
            expr = generateExpression(difficulty, targetResult);
            attempts++;
            if (attempts > maxAttempts) {
                // 如果尝试太多次都重复，放宽条件，重新生成
                console.warn('生成算式尝试次数过多，重新开始');
                usedExpressions.clear();
                attempts = 0;
            }
        } while (isExpressionUsed(expr.expression) && attempts <= maxAttempts);
        
        usedExpressions.add(expr.expression);
        return expr;
    }
    
    if (matchGameState.isEndlessMode) {
        // 无尽模式：至少三组可配对
        const minPairs = 3;
        
        // 生成至少三组配对
        for (let i = 0; i < minPairs; i++) {
            const expr1 = generateUniqueExpression(matchGameState.difficulty);
            const expr2 = generateUniqueExpression(matchGameState.difficulty, expr1.result);
            
            matchGameState.blocks.push({
                id: matchGameState.blocks.length,
                ...expr1,
                matched: false,
                selected: false,
                flipped: false
            });
            
            matchGameState.blocks.push({
                id: matchGameState.blocks.length,
                ...expr2,
                matched: false,
                selected: false,
                flipped: false
            });
        }
        
        // 填充剩余方块（可能不配对）
        while (matchGameState.blocks.length < totalBlocks) {
            const expr = generateUniqueExpression(matchGameState.difficulty);
            matchGameState.blocks.push({
                id: matchGameState.blocks.length,
                ...expr,
                matched: false,
                selected: false,
                flipped: false
            });
        }
    } else {
        // 普通模式：所有方块都配对
        const pairs = Math.floor(totalBlocks / 2);
        
        for (let i = 0; i < pairs; i++) {
            const expr1 = generateUniqueExpression(matchGameState.difficulty);
            const expr2 = generateUniqueExpression(matchGameState.difficulty, expr1.result);
            
            matchGameState.blocks.push({
                id: matchGameState.blocks.length,
                ...expr1,
                matched: false,
                selected: false,
                flipped: false
            });
            
            matchGameState.blocks.push({
                id: matchGameState.blocks.length,
                ...expr2,
                matched: false,
                selected: false,
                flipped: false
            });
        }
    }
    
    // 打乱顺序
    shuffleArray(matchGameState.blocks);
}

// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 渲染游戏界面
function renderMatchGame() {
    const container = document.getElementById('match-blocks-container');
    container.innerHTML = '';
    
    container.style.gridTemplateColumns = `repeat(${matchGameState.gridSize.cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${matchGameState.gridSize.rows}, 1fr)`;
    
    matchGameState.blocks.forEach(block => {
        if (!block.matched) {
            const blockElement = document.createElement('div');
            blockElement.className = 'match-block';
            blockElement.id = `block-${block.id}`;
            
            // 记忆模式：显示背面或正面
            if (matchGameState.isMemoryMode) {
                if (block.flipped) {
                    blockElement.classList.add('flipped');
                    blockElement.innerHTML = `<div class="block-expression">${block.expression}</div>`;
                } else {
                    blockElement.classList.add('face-down');
                    blockElement.innerHTML = `<div class="block-back">?</div>`;
                }
            } else {
                // 普通模式：直接显示算式
                if (block.selected) {
                    blockElement.classList.add('selected');
                }
                blockElement.innerHTML = `<div class="block-expression">${block.expression}</div>`;
            }
            
            blockElement.addEventListener('click', () => handleBlockClick(block));
            
            container.appendChild(blockElement);
        } else {
            // 已配对的方块显示为空
            const emptyBlock = document.createElement('div');
            emptyBlock.className = 'match-block matched';
            container.appendChild(emptyBlock);
        }
    });
}

// 处理方块点击
function handleBlockClick(block) {
    if (matchGameState.gameOver || block.matched) return;
    
    // 记忆模式的特殊逻辑
    if (matchGameState.isMemoryMode) {
        handleMemoryModeClick(block);
        return;
    }
    
    // 普通模式：点击已选中的方块取消选中
    if (block.selected) {
        block.selected = false;
        const index = matchGameState.selectedBlocks.indexOf(block);
        if (index > -1) {
            matchGameState.selectedBlocks.splice(index, 1);
        }
        renderMatchGame();
        return;
    }
    
    // 如果已经选了两个，先清空
    if (matchGameState.selectedBlocks.length >= 2) {
        matchGameState.selectedBlocks.forEach(b => b.selected = false);
        matchGameState.selectedBlocks = [];
    }
    
    // 选中当前方块
    block.selected = true;
    matchGameState.selectedBlocks.push(block);
    
    // 重新渲染
    renderMatchGame();
    
    // 如果选了两个，检查是否配对
    if (matchGameState.selectedBlocks.length === 2) {
        setTimeout(() => checkMatch(), 500);
    }
}

// 记忆模式点击逻辑
function handleMemoryModeClick(block) {
    // 如果点击的是已经翻开的牌，且只选了一张牌，则翻回去
    if (block.flipped && matchGameState.selectedBlocks.length === 1 && matchGameState.selectedBlocks[0] === block) {
        // 清除计时器
        if (matchGameState.memoryFlipTimeout) {
            clearTimeout(matchGameState.memoryFlipTimeout);
            matchGameState.memoryFlipTimeout = null;
        }
        
        // 翻回牌
        block.flipped = false;
        matchGameState.selectedBlocks = [];
        renderMatchGame();
        return;
    }
    
    // 如果已经翻开，不能再点击
    if (block.flipped) return;
    
    // 清除之前的翻牌计时器
    if (matchGameState.memoryFlipTimeout) {
        clearTimeout(matchGameState.memoryFlipTimeout);
        matchGameState.memoryFlipTimeout = null;
    }
    
    // 翻开当前牌
    block.flipped = true;
    matchGameState.selectedBlocks.push(block);
    renderMatchGame();
    
    // 如果选了两张牌，检查配对
    if (matchGameState.selectedBlocks.length === 2) {
        setTimeout(() => checkMatch(), 500);
    } else {
        // 只选了一张牌，5秒后自动翻回
        matchGameState.memoryFlipTimeout = setTimeout(() => {
            if (matchGameState.selectedBlocks.length === 1) {
                matchGameState.selectedBlocks[0].flipped = false;
                matchGameState.selectedBlocks = [];
                renderMatchGame();
            }
        }, matchGameState.memoryShowTime);
    }
}

// 检查是否配对成功
function checkMatch() {
    const [block1, block2] = matchGameState.selectedBlocks;
    
    if (block1.result === block2.result) {
        // 配对成功 - 直接消失，不显示提示
        block1.matched = true;
        block2.matched = true;
        
        // 只有无尽模式才加分
        if (matchGameState.isEndlessMode) {
            matchGameState.score += 2;
            updateScore();
        }
        
        matchGameState.matchedPairs++;
        
        // 清空选中
        matchGameState.selectedBlocks.forEach(b => {
            b.selected = false;
        });
        matchGameState.selectedBlocks = [];
        
        // 配对成功立即渲染，显示消失效果
        renderMatchGame();
        
        // 无尽模式：添加新方块
        if (matchGameState.isEndlessMode) {
            setTimeout(() => {
                addNewBlocks();
            }, 300);
        } else {
            // 检查是否全部配对完成
            if (checkAllMatched()) {
                setTimeout(() => {
                    endMatchGame(true);
                }, 500);
            }
        }
    } else {
        // 配对失败 - 卡片变红+震动
        const block1Element = document.getElementById(`block-${block1.id}`);
        const block2Element = document.getElementById(`block-${block2.id}`);
        
        if (block1Element) {
            block1Element.classList.add('wrong-match');
        }
        if (block2Element) {
            block2Element.classList.add('wrong-match');
        }
        
        matchGameState.lives--;
        updateLives();
        
        // 500ms后移除红色和震动效果
        setTimeout(() => {
            if (block1Element) {
                block1Element.classList.remove('wrong-match');
            }
            if (block2Element) {
                block2Element.classList.remove('wrong-match');
            }
            
            // 记忆模式：翻回牌
            if (matchGameState.isMemoryMode) {
                block1.flipped = false;
                block2.flipped = false;
                renderMatchGame(); // 重新渲染显示翻回后的状态
            }
        }, 500);
        
        if (matchGameState.lives <= 0) {
            setTimeout(() => {
                endMatchGame(false);
            }, 800);
        }
        
        // 清空选中
        matchGameState.selectedBlocks.forEach(b => {
            b.selected = false;
        });
        matchGameState.selectedBlocks = [];
        
        // 普通模式立即渲染，记忆模式等待翻回后再渲染
        if (!matchGameState.isMemoryMode) {
            setTimeout(() => {
                renderMatchGame();
            }, 300);
        }
    }
}

// 添加新方块（无尽模式）
function addNewBlocks() {
    // 收集当前所有未匹配方块的算式
    const existingExpressions = new Set();
    matchGameState.blocks.forEach(block => {
        if (!block.matched) {
            existingExpressions.add(block.expression);
        }
    });
    
    // 生成不重复的新算式
    function generateUniqueNewExpression(difficulty, targetResult = null, maxAttempts = 100) {
        let attempts = 0;
        let expr;
        
        do {
            expr = generateExpression(difficulty, targetResult);
            attempts++;
            if (attempts > maxAttempts) {
                console.warn('无法生成不重复的算式，使用当前结果');
                break;
            }
        } while (existingExpressions.has(expr.expression) && attempts <= maxAttempts);
        
        return expr;
    }
    
    const expr1 = generateUniqueNewExpression(matchGameState.difficulty);
    const expr2 = generateUniqueNewExpression(matchGameState.difficulty, expr1.result);
    
    // 找到两个已匹配的位置
    let addedCount = 0;
    for (let i = 0; i < matchGameState.blocks.length && addedCount < 2; i++) {
        if (matchGameState.blocks[i].matched) {
            if (addedCount === 0) {
                matchGameState.blocks[i] = {
                    id: i,
                    ...expr1,
                    matched: false,
                    selected: false,
                    flipped: false
                };
            } else {
                matchGameState.blocks[i] = {
                    id: i,
                    ...expr2,
                    matched: false,
                    selected: false,
                    flipped: false
                };
            }
            addedCount++;
        }
    }
    
    renderMatchGame();
}

// 检查是否全部配对
function checkAllMatched() {
    return matchGameState.blocks.every(block => block.matched);
}

// 更新分数
function updateScore() {
    const scoreElement = document.getElementById('match-score');
    if (matchGameState.isEndlessMode) {
        scoreElement.textContent = matchGameState.score;
        scoreElement.parentElement.style.display = 'block';
    } else {
        // 普通模式不显示分数
        scoreElement.parentElement.style.display = 'none';
    }
}

// 更新生命值
function updateLives() {
    const livesContainer = document.getElementById('match-lives');
    livesContainer.innerHTML = '';
    
    // 难度一到三为3颗心，记忆模式（难度四）为8颗心，无尽模式为5颗心
    const maxLives = matchGameState.isMemoryMode ? 8 : (matchGameState.isEndlessMode ? 5 : 3);
    
    for (let i = 0; i < maxLives; i++) {
        const heart = document.createElement('span');
        heart.className = 'life-heart';
        if (i < matchGameState.lives) {
            heart.textContent = '❤️';
            heart.classList.add('active');
        } else {
            heart.textContent = '🤍';
        }
        livesContainer.appendChild(heart);
    }
}

// 显示提示消息
function showMatchMessage(message, type) {
    const messageDiv = document.getElementById('match-message');
    messageDiv.textContent = message;
    messageDiv.className = `match-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 1500);
}

// 更新计时器显示
function updateTimer() {
    if (!matchGameState.startTime || matchGameState.gameOver) return;
    
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - matchGameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timerElement = document.getElementById('match-timer');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// 开始游戏
function startMatchGame() {
    // 隐藏难度选择，显示游戏界面
    document.getElementById('match-difficulty-screen').style.display = 'none';
    document.getElementById('match-game-screen').style.display = 'block';
    
    // 重置游戏状态
    matchGameState.score = 0;
    // 难度一到三为3颗心，记忆模式为8颗心，无尽模式为5颗心
    matchGameState.lives = matchGameState.isMemoryMode ? 8 : (matchGameState.isEndlessMode ? 5 : 3);
    matchGameState.selectedBlocks = [];
    matchGameState.gameOver = false;
    matchGameState.matchedPairs = 0;
    matchGameState.startTime = Date.now(); // 记录开始时间
    matchGameState.endTime = null;
    matchGameState.elapsedTime = 0;
    
    // 清除之前的计时器
    if (matchGameState.memoryFlipTimeout) {
        clearTimeout(matchGameState.memoryFlipTimeout);
        matchGameState.memoryFlipTimeout = null;
    }
    
    // 生成方块
    generateBlocks();
    
    // 记忆模式：初始全部翻开，5秒后翻回
    if (matchGameState.isMemoryMode) {
        matchGameState.blocks.forEach(block => {
            block.flipped = true;
        });
        
        setTimeout(() => {
            matchGameState.blocks.forEach(block => {
                block.flipped = false;
            });
            renderMatchGame();
        }, matchGameState.memoryShowTime);
    }
    
    // 更新显示
    updateScore();
    updateLives();
    renderMatchGame();
    document.getElementById('match-result').style.display = 'none';
    
    // 显示难度名称
    const difficultyNames = ['4×4 20以内加法', '4×2 加减法', '4×4 加减法', '4×4 混合运算', '4×3 记忆模式', '4×3 无尽模式'];
    document.getElementById('match-difficulty-name').textContent = difficultyNames[matchGameState.difficulty];
    
    // 开始计时器
    if (matchGameState.timerInterval) {
        clearInterval(matchGameState.timerInterval);
    }
    matchGameState.timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

// 结束游戏
function endMatchGame(isWin) {
    matchGameState.gameOver = true;
    matchGameState.endTime = Date.now();
    matchGameState.elapsedTime = Math.floor((matchGameState.endTime - matchGameState.startTime) / 1000);
    
    // 停止计时器
    if (matchGameState.timerInterval) {
        clearInterval(matchGameState.timerInterval);
    }
    
    const resultDiv = document.getElementById('match-result');
    let resultHTML = '';
    
    const minutes = Math.floor(matchGameState.elapsedTime / 60);
    const seconds = matchGameState.elapsedTime % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (isWin && !matchGameState.isEndlessMode) {
        // 普通模式通关
        resultHTML = `
            <div class="result-icon">🏆</div>
            <div class="result-title">全部配对成功！</div>
            <div class="result-time">⏱️ 用时：${timeString}</div>
            <div class="result-message">恭喜通关！你的计算和记忆能力都很出色！</div>
        `;
    } else if (matchGameState.isEndlessMode) {
        // 无尽模式结算
        if (matchGameState.score >= 50) {
            resultHTML = `
                <div class="result-icon">🏆</div>
                <div class="result-title">太棒了！</div>
                <div class="result-score">最终得分：${matchGameState.score} 分</div>
                <div class="result-time">⏱️ 用时：${timeString}</div>
                <div class="result-message">你的计算和记忆能力都很出色！</div>
            `;
        } else if (matchGameState.score >= 30) {
            resultHTML = `
                <div class="result-icon">⭐</div>
                <div class="result-title">很不错！</div>
                <div class="result-score">最终得分：${matchGameState.score} 分</div>
                <div class="result-time">⏱️ 用时：${timeString}</div>
                <div class="result-message">继续加油，你会更棒的！</div>
            `;
        } else if (matchGameState.score >= 10) {
            resultHTML = `
                <div class="result-icon">👍</div>
                <div class="result-title">加油！</div>
                <div class="result-score">最终得分：${matchGameState.score} 分</div>
                <div class="result-time">⏱️ 用时：${timeString}</div>
                <div class="result-message">多练习，你会进步很快的！</div>
            `;
        } else {
            resultHTML = `
                <div class="result-icon">💪</div>
                <div class="result-title">继续努力！</div>
                <div class="result-score">最终得分：${matchGameState.score} 分</div>
                <div class="result-time">⏱️ 用时：${timeString}</div>
                <div class="result-message">不要气馁，每次都是进步的机会！</div>
            `;
        }
    } else {
        // 普通模式未通关
        resultHTML = `
            <div class="result-icon">💪</div>
            <div class="result-title">加油！</div>
            <div class="result-time">⏱️ 用时：${timeString}</div>
            <div class="result-message">生命值用完了，再试一次吧！</div>
        `;
    }
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

// 重新开始游戏
function restartMatchGame() {
    startMatchGame();
}

// 点击模态框外部关闭
window.addEventListener('click', function(event) {
    const modal = document.getElementById('match-game-modal');
    if (event.target === modal) {
        closeMatchGame();
    }
});
