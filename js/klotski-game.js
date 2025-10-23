// 数字华容道游戏

const klotskiState = {
    difficulty: 3, // 3x3, 4x4, 5x5, 6x6
    grid: [],
    emptyPos: { row: 0, col: 0 },
    moves: 0,
    timeElapsed: 0,
    gameOver: false,
    timer: null,
    startTime: null,
    bestRecords: {
        3: { moves: Infinity, time: Infinity, efficiency: Infinity },
        4: { moves: Infinity, time: Infinity, efficiency: Infinity },
        5: { moves: Infinity, time: Infinity, efficiency: Infinity },
        6: { moves: Infinity, time: Infinity, efficiency: Infinity }
    }
};

// 打开游戏模态框
function openKlotskiGame() {
    const modal = document.getElementById('klotski-modal');
    modal.style.display = 'block';
    showKlotskiDifficulty();
    loadBestRecords();
}

// 关闭游戏模态框
function closeKlotskiGame() {
    const modal = document.getElementById('klotski-modal');
    modal.style.display = 'none';
    
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
}

// 显示难度选择界面
function showKlotskiDifficulty() {
    document.getElementById('klotski-difficulty-screen').style.display = 'block';
    document.getElementById('klotski-game-screen').style.display = 'none';
}

// 返回难度选择
function backToKlotskiDifficulty() {
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
    
    document.getElementById('klotski-result').style.display = 'none';
    showKlotskiDifficulty();
}

// 选择难度并开始游戏
function selectKlotskiDifficulty(difficulty) {
    klotskiState.difficulty = difficulty;
    startKlotskiGame();
}

// 开始游戏
function startKlotskiGame() {
    klotskiState.moves = 0;
    klotskiState.timeElapsed = 0;
    klotskiState.gameOver = false;
    klotskiState.startTime = Date.now();
    
    document.getElementById('klotski-result').style.display = 'none';
    
    initializeGrid();
    
    document.getElementById('klotski-difficulty-screen').style.display = 'none';
    document.getElementById('klotski-game-screen').style.display = 'block';
    
    updateKlotskiUI();
    renderGrid();
    startTimer();
}

// 初始化网格
function initializeGrid() {
    const size = klotskiState.difficulty;
    const numbers = [];
    
    // 创建数字数组 1 到 N*N-1，加上一个0（空位）
    for (let i = 1; i < size * size; i++) {
        numbers.push(i);
    }
    numbers.push(0);
    
    // 打乱数组，直到可解
    do {
        shuffleArray(numbers);
    } while (!isSolvable(numbers, size));
    
    // 将一维数组转换为二维网格
    klotskiState.grid = [];
    for (let i = 0; i < size; i++) {
        klotskiState.grid[i] = [];
        for (let j = 0; j < size; j++) {
            const value = numbers[i * size + j];
            klotskiState.grid[i][j] = value;
            if (value === 0) {
                klotskiState.emptyPos = { row: i, col: j };
            }
        }
    }
}

// 检查拼图是否可解
function isSolvable(puzzle, size) {
    let inversions = 0;
    const flatPuzzle = puzzle.filter(n => n !== 0);
    
    // 计算逆序数
    for (let i = 0; i < flatPuzzle.length; i++) {
        for (let j = i + 1; j < flatPuzzle.length; j++) {
            if (flatPuzzle[i] > flatPuzzle[j]) {
                inversions++;
            }
        }
    }
    
    // 奇数尺寸：逆序数必须是偶数
    if (size % 2 === 1) {
        return inversions % 2 === 0;
    } else {
        // 偶数尺寸：逆序数 + 空位从底部算起的行数 必须是奇数
        const emptyRowFromBottom = size - Math.floor(puzzle.indexOf(0) / size);
        return (inversions + emptyRowFromBottom) % 2 === 1;
    }
}

// 打乱数组（Fisher-Yates洗牌算法）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 渲染网格
function renderGrid() {
    const container = document.getElementById('klotski-grid');
    container.innerHTML = '';
    
    const size = klotskiState.difficulty;
    container.className = `klotski-grid klotski-grid-${size}x${size}`;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const value = klotskiState.grid[i][j];
            const tile = document.createElement('div');
            
            if (value === 0) {
                tile.className = 'klotski-tile klotski-empty';
            } else {
                tile.className = 'klotski-tile klotski-number';
                tile.textContent = value;
                
                // 点击事件
                tile.onclick = () => moveTile(i, j);
                
                // 触摸事件优化
                tile.ontouchend = (e) => {
                    e.preventDefault();
                    moveTile(i, j);
                };
                tile.ontouchstart = (e) => {
                    e.preventDefault();
                    tile.style.transform = 'scale(0.95)';
                };
                tile.ontouchcancel = () => {
                    tile.style.transform = '';
                };
            }
            
            container.appendChild(tile);
        }
    }
}

// 移动方块
function moveTile(row, col) {
    if (klotskiState.gameOver) return;
    
    const emptyRow = klotskiState.emptyPos.row;
    const emptyCol = klotskiState.emptyPos.col;
    
    // 检查是否相邻
    const isAdjacent = 
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1);
    
    if (!isAdjacent) return;
    
    // 交换方块
    klotskiState.grid[emptyRow][emptyCol] = klotskiState.grid[row][col];
    klotskiState.grid[row][col] = 0;
    klotskiState.emptyPos = { row, col };
    
    klotskiState.moves++;
    
    renderGrid();
    updateKlotskiUI();
    
    // 恢复方块缩放
    setTimeout(() => {
        const tiles = document.querySelectorAll('.klotski-tile');
        tiles.forEach(tile => {
            tile.style.transform = '';
        });
    }, 100);
    
    // 检查是否完成
    if (checkWin()) {
        handleWin();
    }
}

// 检查是否完成
function checkWin() {
    const size = klotskiState.difficulty;
    let expected = 1;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === size - 1 && j === size - 1) {
                // 最后一个位置应该是0（空位）
                if (klotskiState.grid[i][j] !== 0) return false;
            } else {
                if (klotskiState.grid[i][j] !== expected) return false;
                expected++;
            }
        }
    }
    
    return true;
}

// 处理胜利
function handleWin() {
    klotskiState.gameOver = true;
    
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
    
    const timeTaken = Math.floor((Date.now() - klotskiState.startTime) / 1000);
    const moves = klotskiState.moves;
    const efficiency = ((timeTaken / 60) * moves).toFixed(2);
    
    // 更新最佳记录
    const difficulty = klotskiState.difficulty;
    let newRecords = [];
    
    if (moves < klotskiState.bestRecords[difficulty].moves) {
        klotskiState.bestRecords[difficulty].moves = moves;
        newRecords.push('🏆 最少步数');
    }
    
    if (timeTaken < klotskiState.bestRecords[difficulty].time) {
        klotskiState.bestRecords[difficulty].time = timeTaken;
        newRecords.push('⏱️ 最快时间');
    }
    
    if (parseFloat(efficiency) < klotskiState.bestRecords[difficulty].efficiency) {
        klotskiState.bestRecords[difficulty].efficiency = parseFloat(efficiency);
        newRecords.push('⚡ 最佳效率');
    }
    
    saveBestRecords();
    updateBestRecordsDisplay();
    
    // 显示结果
    const resultDiv = document.getElementById('klotski-result');
    let resultHTML = `
        <h2>🎉 恭喜完成！</h2>
        <div style="margin: 20px 0; font-size: 1.1em;">
            <p>⏱️ 用时：${formatTime(timeTaken)}</p>
            <p>👣 步数：${moves} 步</p>
            <p>⚡ 效率：${efficiency}</p>
        </div>
    `;
    
    if (newRecords.length > 0) {
        resultHTML += `
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-top: 15px;">
                <h3 style="margin-bottom: 10px;">🎊 打破记录！</h3>
                <p>${newRecords.join('、')}</p>
            </div>
        `;
    }
    
    resultHTML += `
        <button onclick="restartKlotskiGame()" style="margin-top: 20px; padding: 12px 30px; font-size: 1.1em; border: none; border-radius: 25px; background: white; color: #667eea; cursor: pointer; font-weight: bold;">
            🔄 再玩一次
        </button>
    `;
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

// 重新开始游戏
function restartKlotskiGame() {
    startKlotskiGame();
}

// 启动计时器
function startTimer() {
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
    }
    
    klotskiState.timer = setInterval(() => {
        if (!klotskiState.gameOver) {
            klotskiState.timeElapsed = Math.floor((Date.now() - klotskiState.startTime) / 1000);
            updateKlotskiUI();
        }
    }, 1000);
}

// 更新UI
function updateKlotskiUI() {
    const difficultyNames = {
        3: '简单 (3×3)',
        4: '普通 (4×4)',
        5: '困难 (5×5)',
        6: '极难 (6×6)'
    };
    
    document.getElementById('klotski-difficulty-name').textContent = difficultyNames[klotskiState.difficulty];
    document.getElementById('klotski-time').textContent = formatTime(klotskiState.timeElapsed);
    document.getElementById('klotski-moves').textContent = klotskiState.moves;
}

// 更新最佳记录显示
function updateBestRecordsDisplay() {
    const difficulty = klotskiState.difficulty;
    const records = klotskiState.bestRecords[difficulty];
    
    document.getElementById('klotski-best-moves').textContent = 
        records.moves === Infinity ? '--' : records.moves + ' 步';
    
    document.getElementById('klotski-best-time').textContent = 
        records.time === Infinity ? '--' : formatTime(records.time);
    
    document.getElementById('klotski-best-efficiency').textContent = 
        records.efficiency === Infinity ? '--' : records.efficiency;
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 加载最佳记录
function loadBestRecords() {
    try {
        const saved = localStorage.getItem('klotski-best-records');
        if (saved) {
            const records = JSON.parse(saved);
            Object.assign(klotskiState.bestRecords, records);
        }
    } catch (e) {
        console.error('加载记录失败:', e);
    }
    updateBestRecordsDisplay();
}

// 保存最佳记录
function saveBestRecords() {
    try {
        localStorage.setItem('klotski-best-records', JSON.stringify(klotskiState.bestRecords));
    } catch (e) {
        console.error('保存记录失败:', e);
    }
}

// 提示功能（暂未实现）
function showKlotskiHint() {
    alert('提示功能开发中...\n\n💡 小技巧：\n1. 从上往下逐行排列\n2. 利用角落进行循环移动\n3. 提前规划移动路径');
}
