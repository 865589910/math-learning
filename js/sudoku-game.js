// 数独游戏逻辑
let sudokuState = {
    size: 3,
    grid: [],
    solution: [],
    fixedCells: [],
    selectedCell: null,
    startTime: null,
    timerInterval: null,
    isComplete: false
};

// 打开数独游戏模态框
function openSudokuGame() {
    document.getElementById('sudoku-game-modal').style.display = 'block';
    document.getElementById('sudoku-difficulty-selection').style.display = 'block';
    document.getElementById('sudoku-game-screen').style.display = 'none';
    document.body.style.overflow = 'hidden';
}

// 关闭数独游戏模态框
function closeSudokuGame() {
    document.getElementById('sudoku-game-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    if (sudokuState.timerInterval) {
        clearInterval(sudokuState.timerInterval);
    }
}

// 返回难度选择
function backToSudokuDifficulty() {
    if (sudokuState.timerInterval) {
        clearInterval(sudokuState.timerInterval);
    }
    document.getElementById('sudoku-difficulty-selection').style.display = 'block';
    document.getElementById('sudoku-game-screen').style.display = 'none';
}

// 开始数独游戏
function startSudoku(size) {
    sudokuState.size = size;
    sudokuState.isComplete = false;
    sudokuState.selectedCell = null;
    
    // 生成数独谜题
    generateSudoku(size);
    
    // 更新界面
    document.getElementById('sudoku-difficulty').textContent = `${size}×${size} 数独`;
    
    // 切换到游戏界面
    document.getElementById('sudoku-difficulty-selection').style.display = 'none';
    document.getElementById('sudoku-game-screen').style.display = 'block';
    document.getElementById('sudoku-result').style.display = 'none';
    
    // 渲染数独网格
    renderSudoku();
    
    // 渲染数字按钮
    renderNumberButtons();
    
    // 开始计时
    startTimer();
}

// 生成数独谜题
function generateSudoku(size) {
    // 初始化空网格
    sudokuState.grid = Array(size).fill(0).map(() => Array(size).fill(0));
    sudokuState.solution = Array(size).fill(0).map(() => Array(size).fill(0));
    sudokuState.fixedCells = [];
    
    // 生成完整的数独解
    fillSudoku(0, 0);
    
    // 复制解决方案
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sudokuState.solution[i][j] = sudokuState.grid[i][j];
        }
    }
    
    // 根据难度移除一些数字
    let cellsToKeep;
    if (size === 3) {
        cellsToKeep = 5; // 3×3保留5个数字
    } else if (size === 4) {
        cellsToKeep = 8; // 4×4保留8个数字
    } else if (size === 6) {
        cellsToKeep = 20; // 6×6保留20个数字（简单）
    } else if (size === 9) {
        cellsToKeep = 45; // 9×9保留45个数字（简单）
    }
    
    // 记录固定的单元格
    let cells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            cells.push([i, j]);
        }
    }
    
    // 随机打乱
    cells.sort(() => Math.random() - 0.5);
    
    // 保留前cellsToKeep个单元格
    for (let i = 0; i < cells.length; i++) {
        if (i < cellsToKeep) {
            sudokuState.fixedCells.push(cells[i][0] + ',' + cells[i][1]);
        } else {
            sudokuState.grid[cells[i][0]][cells[i][1]] = 0;
        }
    }
}

// 递归填充数独
function fillSudoku(row, col) {
    const size = sudokuState.size;
    
    if (row === size) {
        return true;
    }
    
    const nextRow = col === size - 1 ? row + 1 : row;
    const nextCol = col === size - 1 ? 0 : col + 1;
    
    // 生成随机数字顺序
    const numbers = Array.from({length: size}, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);
    
    for (let num of numbers) {
        if (isValidMove(row, col, num)) {
            sudokuState.grid[row][col] = num;
            if (fillSudoku(nextRow, nextCol)) {
                return true;
            }
            sudokuState.grid[row][col] = 0;
        }
    }
    
    return false;
}

// 检查移动是否有效
function isValidMove(row, col, num) {
    const size = sudokuState.size;
    const grid = sudokuState.grid;
    
    // 检查行
    for (let j = 0; j < size; j++) {
        if (grid[row][j] === num) return false;
    }
    
    // 检查列
    for (let i = 0; i < size; i++) {
        if (grid[i][col] === num) return false;
    }
    
    // 检查宫（子区域）
    let boxRowSize, boxColSize;
    if (size === 3) {
        // 3×3没有子区域约束
        boxRowSize = 3;
        boxColSize = 3;
    } else if (size === 4) {
        // 4×4：每个2×2的宫
        boxRowSize = 2;
        boxColSize = 2;
    } else if (size === 6) {
        // 6×6：每个2×3的宫
        boxRowSize = 2;
        boxColSize = 3;
    } else if (size === 9) {
        // 9×9：每个3×3的宫
        boxRowSize = 3;
        boxColSize = 3;
    }
    
    // 3×3没有宫的约束，直接返回
    if (size === 3) {
        return true;
    }
    
    // 计算当前单元格所在宫的起始位置
    const boxStartRow = Math.floor(row / boxRowSize) * boxRowSize;
    const boxStartCol = Math.floor(col / boxColSize) * boxColSize;
    
    // 检查宫内是否已存在该数字
    for (let i = 0; i < boxRowSize; i++) {
        for (let j = 0; j < boxColSize; j++) {
            if (grid[boxStartRow + i][boxStartCol + j] === num) {
                return false;
            }
        }
    }
    
    return true;
}

// 渲染数独网格
function renderSudoku() {
    const container = document.getElementById('sudoku-container');
    container.innerHTML = '';
    container.className = `sudoku-container size-${sudokuState.size}`;
    
    const size = sudokuState.size;
    
    // 根据大小设置宫的尺寸
    let boxRowSize, boxColSize;
    if (size === 3) {
        boxRowSize = 3;
        boxColSize = 3;
    } else if (size === 4) {
        boxRowSize = 2;
        boxColSize = 2;
    } else if (size === 6) {
        boxRowSize = 2;
        boxColSize = 3;
    } else if (size === 9) {
        boxRowSize = 3;
        boxColSize = 3;
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            
            // 添加加粗边框以区分宫（3×3没有宫的划分）
            if (size !== 3) {
                if (i % boxRowSize === 0 && i !== 0) {
                    cell.classList.add('border-top-bold');
                }
                if (j % boxColSize === 0 && j !== 0) {
                    cell.classList.add('border-left-bold');
                }
            }
            
            const isFixed = sudokuState.fixedCells.includes(i + ',' + j);
            
            if (isFixed) {
                cell.classList.add('fixed');
                cell.textContent = sudokuState.grid[i][j];
            } else if (sudokuState.grid[i][j] !== 0) {
                cell.textContent = sudokuState.grid[i][j];
            }
            
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            cell.onclick = () => selectCell(i, j);
            
            container.appendChild(cell);
        }
    }
}

// 选择单元格
function selectCell(row, col) {
    if (sudokuState.isComplete) return;
    
    const isFixed = sudokuState.fixedCells.includes(row + ',' + col);
    if (isFixed) return;
    
    // 取消之前的选择
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => cell.classList.remove('selected'));
    
    // 选择新单元格
    const cell = cells[row * sudokuState.size + col];
    cell.classList.add('selected');
    
    sudokuState.selectedCell = {row, col};
}

// 渲染数字按钮
function renderNumberButtons() {
    const container = document.getElementById('number-buttons');
    container.innerHTML = '';
    
    for (let i = 1; i <= sudokuState.size; i++) {
        const btn = document.createElement('button');
        btn.className = 'number-btn';
        btn.textContent = i;
        btn.onclick = () => placeNumber(i);
        container.appendChild(btn);
    }
}

// 放置数字
function placeNumber(num) {
    if (!sudokuState.selectedCell || sudokuState.isComplete) return;
    
    const {row, col} = sudokuState.selectedCell;
    const isFixed = sudokuState.fixedCells.includes(row + ',' + col);
    
    if (isFixed) return;
    
    sudokuState.grid[row][col] = num;
    
    const cells = document.querySelectorAll('.sudoku-cell');
    const cell = cells[row * sudokuState.size + col];
    cell.textContent = num;
    
    // 检查是否完成
    checkIfComplete();
}

// 清除单元格
function clearSudokuCell() {
    if (!sudokuState.selectedCell || sudokuState.isComplete) return;
    
    const {row, col} = sudokuState.selectedCell;
    const isFixed = sudokuState.fixedCells.includes(row + ',' + col);
    
    if (isFixed) return;
    
    sudokuState.grid[row][col] = 0;
    
    const cells = document.querySelectorAll('.sudoku-cell');
    const cell = cells[row * sudokuState.size + col];
    cell.textContent = '';
}

// 检查数独
function checkSudoku() {
    if (sudokuState.isComplete) return;
    
    const size = sudokuState.size;
    let allFilled = true;
    let hasError = false;
    
    // 检查是否都填满了
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (sudokuState.grid[i][j] === 0) {
                allFilled = false;
            }
        }
    }
    
    if (!allFilled) {
        showSudokuMessage('还有空格没有填哦！', 'warning');
        return;
    }
    
    // 检查答案
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (sudokuState.grid[i][j] !== sudokuState.solution[i][j]) {
                hasError = true;
                break;
            }
        }
        if (hasError) break;
    }
    
    if (hasError) {
        showSudokuMessage('有些数字不对哦，再检查一下吧！', 'error');
    } else {
        winSudoku();
    }
}

// 检查是否完成
function checkIfComplete() {
    const size = sudokuState.size;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (sudokuState.grid[i][j] === 0) {
                return;
            }
        }
    }
    
    // 自动检查
    checkSudoku();
}

// 显示消息
function showSudokuMessage(message, type) {
    const resultEl = document.getElementById('sudoku-result');
    resultEl.textContent = message;
    resultEl.style.display = 'block';
    
    if (type === 'warning') {
        resultEl.style.background = 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)';
    } else if (type === 'error') {
        resultEl.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    }
    
    setTimeout(() => {
        resultEl.style.display = 'none';
    }, 2000);
}

// 胜利
function winSudoku() {
    sudokuState.isComplete = true;
    
    if (sudokuState.timerInterval) {
        clearInterval(sudokuState.timerInterval);
    }
    
    const time = document.getElementById('sudoku-time').textContent;
    
    const resultEl = document.getElementById('sudoku-result');
    resultEl.innerHTML = `🎉 恭喜你完成了！用时 ${time}`;
    resultEl.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    resultEl.style.display = 'block';
    
    // 禁用所有单元格
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
        cell.onclick = null;
        cell.classList.add('completed');
    });
}

// 开始计时
function startTimer() {
    if (sudokuState.timerInterval) {
        clearInterval(sudokuState.timerInterval);
    }
    
    sudokuState.startTime = Date.now();
    
    sudokuState.timerInterval = setInterval(() => {
        const elapsed = Date.now() - sudokuState.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        document.getElementById('sudoku-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// 重新开始
function restartSudoku() {
    startSudoku(sudokuState.size);
}
