// 数学钢琴块游戏

let pianoGameState = {
    difficulty: 1,
    score: 0,
    lives: 3,
    speed: 0.8, // 初始下落速度 0.8像素/帧
    customSpeed: 0.8, // 用户自定义速度
    tiles: [],
    gameActive: false,
    gameInterval: null,
    spawnInterval: null,
    lastSpawnTime: 0,
    spawnDelay: 2500, // 初始生成间隔（毫秒）
    minSpawnDelay: 1500, // 最小生成间隔
    correctClicks: 0, // 正确点击数
    targetClicks: 20, // 通关目标（难度1-4）
    isEndlessMode: false, // 是否为无尽模式
    simultaneousTiles: 1, // 同时下落的钢琴块数量（难度5专用）
    maxSimultaneousTiles: 5, // 最大同时下落数量
    endlessCorrectCount: 0 // 无尽模式累计正确点击数
};

// 更新速度显示
function updatePianoSpeedDisplay(value) {
    document.getElementById('piano-speed-value').textContent = parseFloat(value).toFixed(1);
}

const PIANO_CONFIG = {
    1: { range: 20, initialSpawn: 2500, minSpawn: 1500, speedIncrement: 0.05, name: '难度一', icon: '🐝', type: 'add-sub' },
    2: { range: 100, initialSpawn: 2300, minSpawn: 1100, speedIncrement: 0.06, name: '难度二', icon: '🐞', type: 'add-sub' },
    3: { range: 9, initialSpawn: 2500, minSpawn: 1200, speedIncrement: 0.05, name: '难度三 - 乘法口诀', icon: '🐢', type: 'multiply' },
    4: { range: 100, initialSpawn: 2000, minSpawn: 800, speedIncrement: 0.08, name: '难度四 - 无尽模式', icon: '♾️', endless: true, type: 'add-sub' }
};

// 打开数学钢琴块游戏
function openPianoTilesGame() {
    const modal = document.getElementById('piano-tiles-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 显示难度选择界面
    document.getElementById('piano-difficulty-screen').style.display = 'block';
    document.getElementById('piano-game-screen').style.display = 'none';
}

// 关闭数学钢琴块游戏
function closePianoTilesGame() {
    const modal = document.getElementById('piano-tiles-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // 停止游戏
    stopPianoGame();
}

// 选择难度并开始游戏
function selectPianoDifficulty(difficulty) {
    pianoGameState.difficulty = difficulty;
    const config = PIANO_CONFIG[difficulty];
    
    // 获取用户选择的速度
    const speedSlider = document.getElementById('piano-speed-slider');
    pianoGameState.customSpeed = parseFloat(speedSlider.value);
    
    // 初始化游戏状态
    pianoGameState.score = 0;
    pianoGameState.lives = 3;
    // 无尽模式（难度4）固定速度0.6，其他难度使用用户自定义速度
    pianoGameState.speed = config.endless ? 0.6 : pianoGameState.customSpeed;
    pianoGameState.tiles = [];
    pianoGameState.gameActive = true;
    pianoGameState.spawnDelay = config.initialSpawn;
    pianoGameState.minSpawnDelay = config.minSpawn;
    pianoGameState.correctClicks = 0;
    pianoGameState.isEndlessMode = config.endless || false;
    pianoGameState.simultaneousTiles = 1;
    pianoGameState.endlessCorrectCount = 0;
    
    // 切换到游戏界面
    document.getElementById('piano-difficulty-screen').style.display = 'none';
    document.getElementById('piano-game-screen').style.display = 'block';
    
    // 更新UI
    updatePianoUI();
    
    // 开始游戏
    startPianoGame();
}

// 返回难度选择
function backToPianoDifficulty() {
    stopPianoGame();
    document.getElementById('piano-game-screen').style.display = 'none';
    document.getElementById('piano-difficulty-screen').style.display = 'block';
}

// 开始游戏
function startPianoGame() {
    const container = document.getElementById('piano-tiles-container');
    container.innerHTML = '';
    
    pianoGameState.tiles = [];
    pianoGameState.lastSpawnTime = Date.now();
    
    // 游戏主循环
    pianoGameState.gameInterval = setInterval(() => {
        updatePianoGame();
    }, 1000 / 60); // 60 FPS
    
    // 生成钢琴块
    pianoGameState.spawnInterval = setInterval(() => {
        spawnPianoTile();
    }, pianoGameState.spawnDelay);
}

// 停止游戏
function stopPianoGame() {
    pianoGameState.gameActive = false;
    if (pianoGameState.gameInterval) {
        clearInterval(pianoGameState.gameInterval);
        pianoGameState.gameInterval = null;
    }
    if (pianoGameState.spawnInterval) {
        clearInterval(pianoGameState.spawnInterval);
        pianoGameState.spawnInterval = null;
    }
}

// 生成钢琴块
function spawnPianoTile() {
    if (!pianoGameState.gameActive) return;
    
    // 检查当前同时下落的钢琴块数量
    const activeTiles = pianoGameState.tiles.filter(tile => tile.element.parentNode).length;
    
    // 难度4（无尽模式）：控制同时下落数量
    if (pianoGameState.isEndlessMode) {
        if (activeTiles >= pianoGameState.simultaneousTiles) {
            return; // 已达到同时下落上限
        }
    } else {
        // 其他难度：最多同时4个钢琴块
        if (activeTiles >= 4) {
            return;
        }
    }
    
    const container = document.getElementById('piano-tiles-container');
    const config = PIANO_CONFIG[pianoGameState.difficulty];
    
    // 随机选择列位置（5列布局），确保不与已存在的钢琴块重叠
    let column;
    let attempts = 0;
    const maxAttempts = 30; // 最多尝试30次
    const tileHeight = 350; // 钢琴块高度（350px）
    const minSafeDistance = 400; // 最小安全距离（钢琴块高度 + 50px间隔）
    
    do {
        column = Math.floor(Math.random() * 5);
        attempts++;
        
        // 检查该列是否有钢琴块
        const tilesInColumn = pianoGameState.tiles.filter(tile => tile.column === column);
        
        if (tilesInColumn.length === 0) {
            // 该列没有钢琴块，可以生成
            break;
        }
        
        // 检查该列所有钢琴块，确保新钢琴块不会与任何现有钢琴块重叠
        let canSpawn = true;
        for (const existingTile of tilesInColumn) {
            // 新钢琴块将从y=0开始，检查与现有钢琴块的距离
            if (existingTile.y < minSafeDistance) {
                // 该列顶部的钢琴块距离不够远
                canSpawn = false;
                break;
            }
        }
        
        if (canSpawn) {
            break;
        }
        
        // 如果尝试次数过多，放弃生成
        if (attempts >= maxAttempts) {
            return;
        }
    } while (true);
    
    // 生成算式
    const { equation, isCorrect } = generateMathEquation(config.range);
    
    // 创建钢琴块元素
    const tile = document.createElement('div');
    tile.className = 'piano-tile';
    tile.textContent = equation;
    
    // 统一颜色为蓝色（#00f2fe）
    tile.style.backgroundColor = '#00f2fe';
    tile.style.color = 'white';
    
    // 设置列位置（5列布局：每列20%宽度）
    tile.style.left = `${column * 20}%`;
    tile.style.top = '0px';
    
    // 点击事件
    tile.addEventListener('click', () => handlePianoTileClick(tile, isCorrect));
    
    container.appendChild(tile);
    
    // 保存到状态
    pianoGameState.tiles.push({
        element: tile,
        isCorrect: isCorrect,
        y: 0,
        column: column
    });
}

// 生成数学算式
function generateMathEquation(range) {
    const config = PIANO_CONFIG[pianoGameState.difficulty];
    
    // 乘法模式（9×9乘法口诀）
    if (config.type === 'multiply') {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const correctAnswer = num1 * num2;
        
        // 随机决定是否正确（50%概率）
        const isCorrect = Math.random() > 0.5;
        let displayAnswer;
        
        if (isCorrect) {
            displayAnswer = correctAnswer;
        } else {
            // 生成错误答案（相差1-10）
            const offset = Math.floor(Math.random() * 10) + 1;
            displayAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
            // 确保答案不为负数且在81以内
            if (displayAnswer < 1) displayAnswer = correctAnswer + offset;
            if (displayAnswer > 81) displayAnswer = correctAnswer - offset;
        }
        
        const equation = `${num1} × ${num2} = ${displayAnswer}`;
        return { equation, isCorrect };
    }
    
    // 加减法模式
    let num1, num2, operator, correctAnswer, displayAnswer;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        num1 = Math.floor(Math.random() * range) + 1;
        num2 = Math.floor(Math.random() * range) + 1;
        operator = Math.random() > 0.5 ? '+' : '-';
        attempts++;
        
        if (operator === '+') {
            correctAnswer = num1 + num2;
            // 确保加法得数不超过范围
            if (correctAnswer <= range) {
                break;
            }
        } else {
            // 确保减法不出现负数
            if (num1 >= num2) {
                correctAnswer = num1 - num2;
                break;
            } else if (num2 > num1) {
                correctAnswer = num2 - num1;
                // 交换num1和num2
                [num1, num2] = [num2, num1];
                break;
            }
        }
        
        if (attempts >= maxAttempts) {
            // 如果尝试次数过多，强制使用减法
            operator = '-';
            if (num1 < num2) [num1, num2] = [num2, num1];
            correctAnswer = num1 - num2;
            break;
        }
    } while (true);
    
    // 随机决定是否正确（50%概率）
    const isCorrect = Math.random() > 0.5;
    
    if (isCorrect) {
        displayAnswer = correctAnswer;
    } else {
        // 生成错误答案
        const maxOffset = Math.min(5, Math.floor(range / 10));
        const offset = Math.floor(Math.random() * maxOffset) + 1;
        displayAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
        
        // 确保答案不为负数且不超过范围
        if (displayAnswer < 0) displayAnswer = correctAnswer + offset;
        if (displayAnswer > range) displayAnswer = correctAnswer - offset;
        if (displayAnswer < 0) displayAnswer = 1;
    }
    
    // 构建等式
    const equation = `${num1} ${operator} ${num2} = ${displayAnswer}`;
    
    return { equation, isCorrect };
}

// 处理钢琴块点击
function handlePianoTileClick(tileElement, isCorrect) {
    if (!pianoGameState.gameActive) return;
    
    // 找到对应的tile对象
    const tileIndex = pianoGameState.tiles.findIndex(t => t.element === tileElement);
    if (tileIndex === -1) return;
    
    if (isCorrect) {
        // 点击正确
        pianoGameState.correctClicks++;
        
        // 无尽模式：每次正确+2分
        if (pianoGameState.isEndlessMode) {
            pianoGameState.score += 2;
            pianoGameState.endlessCorrectCount++;
            
            // 每10个正确点击增加同时下落数量和速度
            if (pianoGameState.endlessCorrectCount % 10 === 0 && pianoGameState.simultaneousTiles < pianoGameState.maxSimultaneousTiles) {
                pianoGameState.simultaneousTiles++;
                pianoGameState.speed += 0.1;
            }
        } else {
            // 通关模式：+1分
            pianoGameState.score++;
        }
        
        // 显示正确反馈
        tileElement.style.backgroundColor = '#4caf50';
        tileElement.innerHTML = '✓';
        
        // 只有无尽模式才增加速度
        if (pianoGameState.isEndlessMode && pianoGameState.score % 5 === 0 && pianoGameState.score > 0) {
            const config = PIANO_CONFIG[pianoGameState.difficulty];
            pianoGameState.speed += config.speedIncrement;
            
            // 减少生成间隔（加快生成速度）
            pianoGameState.spawnDelay = Math.max(
                pianoGameState.minSpawnDelay,
                pianoGameState.spawnDelay - 100
            );
            if (pianoGameState.spawnInterval) {
                clearInterval(pianoGameState.spawnInterval);
                pianoGameState.spawnInterval = setInterval(() => {
                    spawnPianoTile();
                }, pianoGameState.spawnDelay);
            }
        }
    } else {
        // 点击错误，扣除生命值
        pianoGameState.lives--;
        
        // 显示错误反馈
        tileElement.style.backgroundColor = '#f44336';
        tileElement.innerHTML = '✗';
        
        if (pianoGameState.lives <= 0) {
            endPianoGame(false);
            return;
        }
    }
    
    // 移除钢琴块
    setTimeout(() => {
        if (tileElement.parentNode) {
            tileElement.parentNode.removeChild(tileElement);
        }
    }, 200);
    
    // 从数组中移除
    pianoGameState.tiles.splice(tileIndex, 1);
    
    // 更新UI
    updatePianoUI();
    
    // 检查通关条件（非无尽模式）
    if (!pianoGameState.isEndlessMode && pianoGameState.correctClicks >= pianoGameState.targetClicks) {
        endPianoGame(true);
    }
}

// 更新游戏状态
function updatePianoGame() {
    if (!pianoGameState.gameActive) return;
    
    const container = document.getElementById('piano-tiles-container');
    const containerHeight = container.offsetHeight;
    
    // 更新所有钢琴块的位置
    for (let i = pianoGameState.tiles.length - 1; i >= 0; i--) {
        const tile = pianoGameState.tiles[i];
        
        // 更新位置
        tile.y += pianoGameState.speed;
        tile.element.style.top = `${tile.y}px`;
        
        // 检查是否掉落到底部（根据高度350px调整）
        if (tile.y > containerHeight - 350) {
            // 如果是正确的钢琴块掉落，扣除生命值
            if (tile.isCorrect) {
                pianoGameState.lives--;
                
                // 显示掉落反馈
                tile.element.style.backgroundColor = '#ff9800';
                tile.element.innerHTML = '↓';
                
                if (pianoGameState.lives <= 0) {
                    endPianoGame(false);
                    return;
                }
                
                updatePianoUI();
            } else {
                // 如果是错误的钢琴块掉落，算作正确处理（没点击错误的）
                pianoGameState.correctClicks++;
                
                // 无尽模式：每次正确+2分
                if (pianoGameState.isEndlessMode) {
                    pianoGameState.score += 2;
                    pianoGameState.endlessCorrectCount++;
                    
                    // 每10个正确点击增加同时下落数量和速度
                    if (pianoGameState.endlessCorrectCount % 10 === 0 && pianoGameState.simultaneousTiles < pianoGameState.maxSimultaneousTiles) {
                        pianoGameState.simultaneousTiles++;
                        pianoGameState.speed += 0.1;
                    }
                } else {
                    // 通关模式：+1分
                    pianoGameState.score++;
                }
                
                // 显示正确反馈
                tile.element.style.backgroundColor = '#4caf50';
                tile.element.innerHTML = '✓';
                
                // 只有无尽模式才增加速度
                if (pianoGameState.isEndlessMode && pianoGameState.score % 5 === 0 && pianoGameState.score > 0) {
                    const config = PIANO_CONFIG[pianoGameState.difficulty];
                    pianoGameState.speed += config.speedIncrement;
                    
                    // 减少生成间隔（加快生成速度）
                    pianoGameState.spawnDelay = Math.max(
                        pianoGameState.minSpawnDelay,
                        pianoGameState.spawnDelay - 100
                    );
                    if (pianoGameState.spawnInterval) {
                        clearInterval(pianoGameState.spawnInterval);
                        pianoGameState.spawnInterval = setInterval(() => {
                            spawnPianoTile();
                        }, pianoGameState.spawnDelay);
                    }
                }
                
                updatePianoUI();
                
                // 检查通关条件（非无尽模式）
                if (!pianoGameState.isEndlessMode && pianoGameState.correctClicks >= pianoGameState.targetClicks) {
                    endPianoGame(true);
                    return;
                }
            }
            
            // 移除钢琴块
            if (tile.element.parentNode) {
                tile.element.parentNode.removeChild(tile.element);
            }
            pianoGameState.tiles.splice(i, 1);
        }
    }
}

// 更新UI显示
function updatePianoUI() {
    const config = PIANO_CONFIG[pianoGameState.difficulty];
    
    // 更新难度名称
    document.getElementById('piano-difficulty-name').textContent = config.name;
    
    // 更新得分/进度
    if (pianoGameState.isEndlessMode) {
        document.getElementById('piano-score-label').textContent = '⭐ 得分';
        document.getElementById('piano-score').textContent = pianoGameState.score;
    } else {
        document.getElementById('piano-score-label').textContent = '🎯 进度';
        document.getElementById('piano-score').textContent = `${pianoGameState.correctClicks}/${pianoGameState.targetClicks}`;
    }
    
    // 更新生命值显示
    const livesContainer = document.getElementById('piano-lives');
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('span');
        heart.className = 'life-heart';
        heart.textContent = '❤️';
        if (i < pianoGameState.lives) {
            heart.classList.add('active');
        }
        livesContainer.appendChild(heart);
    }
    
    // 更新速度显示
    document.getElementById('piano-speed').textContent = `速度: ${pianoGameState.speed.toFixed(2)}`;
}

// 游戏结束
function endPianoGame(isWin) {
    stopPianoGame();
    
    const resultDiv = document.getElementById('piano-result');
    
    if (isWin) {
        resultDiv.innerHTML = `
            <div class="result-success">
                <h2>🎉 恭喜通关！</h2>
                <p>你成功完成了 ${PIANO_CONFIG[pianoGameState.difficulty].name}！</p>
                <p class="result-score">最终得分：${pianoGameState.score}</p>
                <p class="result-stats">正确点击：${pianoGameState.correctClicks} 次</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="result-fail">
                <h2>😢 游戏结束</h2>
                <p>生命值耗尽了，再接再厉！</p>
                <p class="result-score">最终得分：${pianoGameState.score}</p>
                <p class="result-stats">正确点击：${pianoGameState.correctClicks} 次</p>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
    document.getElementById('piano-restart-btn').style.display = 'inline-block';
}

// 重新开始游戏
function restartPianoGame() {
    document.getElementById('piano-result').style.display = 'none';
    document.getElementById('piano-restart-btn').style.display = 'none';
    selectPianoDifficulty(pianoGameState.difficulty);
}
