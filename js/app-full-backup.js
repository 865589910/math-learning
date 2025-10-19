// 全局变量
let currentWord = null;
let isDrawing = false;
let showGuide = true;
let availableVoices = []; // 可用的语音列表

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupModalEvents();
    loadVoices(); // 加载语音列表
});

// 初始化页面，加载所有数据
function initializePage() {
    // 第一部分：核心概念字
    renderWords('numbers', learningData.section1.numbers);
    renderWords('operations', learningData.section1.operations);
    renderWords('positions', learningData.section1.positions);
    renderWords('comparisons', learningData.section1.comparisons);
    renderWords('units', learningData.section1.units);
    renderWords('quantifiers', learningData.section1.quantifiers);

    // 第二部分：核心概念词
    renderWords('question-types', learningData.section2.questionTypes);
    renderWords('basic-concepts', learningData.section2.basicConcepts);
    renderWords('items', learningData.section2.items);
    renderWords('animals', learningData.section2.animals);
    renderWords('foods', learningData.section2.foods);
    renderWords('plane-shapes', learningData.section2.planeShapes);
    renderWords('solid-shapes', learningData.section2.solidShapes);

    // 第三部分：基础知识点
    renderWords('fill-methods', learningData.section3.fillMethods);
    renderWords('comparison-rules', learningData.section3.comparisonRules);
    renderWords('hundred-table', learningData.section3.hundredTable);

    // 第四部分：常见应用题型
    renderWords('addition-problems', learningData.section4.additionProblems);
    renderWords('subtraction-problems', learningData.section4.subtractionProblems);
    renderWords('multiplication-problems', learningData.section4.multiplicationProblems);
    renderWords('division-problems', learningData.section4.divisionProblems);
}

// 渲染字词到页面
function renderWords(containerId, words) {
    const container = document.getElementById(containerId);
    if (!container || !words) return;

    words.forEach(item => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word-item';
        
        // 根据类型添加不同的class
        if (item.type === 'phrase') {
            wordElement.classList.add('phrase');
        } else if (item.type === 'sentence') {
            wordElement.classList.add('sentence');
        }
        
        wordElement.textContent = item.word;
        wordElement.onclick = () => showWordModal(item);
        container.appendChild(wordElement);
    });
}

// 显示字词弹窗
function showWordModal(wordData) {
    currentWord = wordData;
    const modal = document.getElementById('modal');
    
    // 设置拼音
    document.getElementById('modal-pinyin').textContent = wordData.pinyin;
    
    // 设置解释（优化显示，支持例题单独朗读）
    renderExplanation(wordData.explanation);
    
    // 绘制字词在米字格中
    drawWordInGrid(wordData.word);
    
    // 清空练习画布
    clearPracticeCanvas();
    
    // 根据字数调整练习区域的显示
    const practiceArea = document.querySelector('.practice-area');
    const practiceTitle = practiceArea.querySelector('h4');
    if (wordData.word.length > 4) {
        // 句子：隐藏练习区域
        practiceArea.style.display = 'none';
    } else {
        // 字词：显示练习区域
        practiceArea.style.display = 'block';
        if (wordData.word.length === 1) {
            practiceTitle.textContent = '✏️ 练习书写：';
        } else {
            practiceTitle.textContent = `✏️ 练习书写：（${wordData.word.length}个字，每个字一格）`;
        }
    }
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 防止body滚动
    document.body.style.overflow = 'hidden';
}

// 在米字格中绘制字词
function drawWordInGrid(word) {
    const canvas = document.getElementById('word-canvas');
    const ctx = canvas.getContext('2d');
    
    // 判断是否为句子（长度大于4个字认为是句子）
    if (word.length > 4) {
        // 句子：不显示米字格，只显示文字，但让它更长更舒展
        const maxWidth = 700;  // 最大宽度
        const fontSize = 28;   // 字体大小
        const charSpacing = 5; // 字间距
        
        // 计算需要的宽度
        const estimatedWidth = word.length * (fontSize + charSpacing);
        canvas.width = Math.min(estimatedWidth, maxWidth);
        canvas.height = 80;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = `bold ${fontSize}px "KaiTi", "楷体", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 如果文字太长，自动换行
        if (estimatedWidth > maxWidth) {
            const lines = [];
            const charsPerLine = Math.floor(maxWidth / (fontSize + charSpacing));
            for (let i = 0; i < word.length; i += charsPerLine) {
                lines.push(word.substring(i, i + charsPerLine));
            }
            canvas.height = lines.length * (fontSize + 20);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `bold ${fontSize}px "KaiTi", "楷体", serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            lines.forEach((line, index) => {
                ctx.fillText(line, canvas.width / 2, (index + 0.5) * (fontSize + 20));
            });
        } else {
            ctx.fillText(word, canvas.width / 2, canvas.height / 2);
        }
        return;
    }
    
    // 单字或词组：显示米字格
    const gridSize = 150;
    const gap = 10;
    const charCount = word.length;
    canvas.width = charCount * gridSize + (charCount - 1) * gap;
    canvas.height = gridSize;
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 为每个字绘制一个米字格
    for (let i = 0; i < charCount; i++) {
        const offsetX = i * (gridSize + gap);
        
        // 外框
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, 0, gridSize, gridSize);
        
        // 米字格辅助线
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 横中线
        ctx.beginPath();
        ctx.moveTo(offsetX, gridSize / 2);
        ctx.lineTo(offsetX + gridSize, gridSize / 2);
        ctx.stroke();
        
        // 竖中线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize / 2, 0);
        ctx.lineTo(offsetX + gridSize / 2, gridSize);
        ctx.stroke();
        
        // 左上到右下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX + gridSize, gridSize);
        ctx.stroke();
        
        // 右上到左下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize, 0);
        ctx.lineTo(offsetX, gridSize);
        ctx.stroke();
        
        // 在米字格中绘制单个字
        ctx.fillStyle = '#333';
        ctx.font = 'bold 80px "KaiTi", "楷体", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(word[i], offsetX + gridSize / 2, gridSize / 2);
    }
}

// 设置模态框事件
function setupModalEvents() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const speakWordBtn = document.getElementById('speak-word-btn');
    const speakExplanationBtn = document.getElementById('speak-explanation-btn');
    const clearBtn = document.getElementById('clear-btn');
    const showGuideBtn = document.getElementById('show-guide-btn');
    const practiceCanvas = document.getElementById('practice-canvas');
    
    // 关闭按钮
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // 点击模态框外部关闭
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // 朗读字词
    speakWordBtn.onclick = () => {
        if (currentWord) {
            speakText(currentWord.word);
        }
    };
    
    // 朗读解释
    speakExplanationBtn.onclick = () => {
        if (currentWord) {
            speakText(currentWord.explanation);
        }
    };
    
    // 清除按钮
    clearBtn.onclick = clearPracticeCanvas;
    
    // 显示/隐藏辅助线按钮
    showGuideBtn.onclick = () => {
        showGuide = !showGuide;
        showGuideBtn.textContent = showGuide ? '隐藏辅助线' : '显示辅助线';
        drawPracticeGrid();
    };
    
    // 设置练习画布的绘图事件
    setupDrawingCanvas(practiceCanvas);
    
    // 初始化练习画布
    drawPracticeGrid();
}

// 语音合成朗读文本（全面优化版，兼容PC和移动端，支持多种AI语音）
async function speakText(text) {
    // 优先级：Google TTS（最稳定）> ResponsiveVoice（移动端）> 百度AI > 系统语音
    
    // 0. 优先使用 Google TTS（最稳定可靠）
    const useGoogleTTS = localStorage.getItem('use_google_tts') === 'true';
    if (useGoogleTTS && window.googleTTS) {
        try {
            await window.googleTTS.speak(text);
            return;
        } catch (error) {
            console.error('Google TTS播放失败，回退到系统语音:', error);
        }
    }
    
    // 1. 检查是否启用ResponsiveVoice（移动端AI语音）
    const useResponsiveVoice = localStorage.getItem('use_responsive_voice') === 'true';
    if (useResponsiveVoice && window.responsiveVoiceService) {
        try {
            // 等待服务就绪
            if (!window.responsiveVoiceService.isReady) {
                console.log('ResponsiveVoice尚未就绪，等待中...');
                // 等待最多2秒
                await waitForResponsiveVoice(2000);
            }
            
            if (window.responsiveVoiceService.isReady) {
                await window.responsiveVoiceService.speak(text);
                return;
            } else {
                console.warn('ResponsiveVoice超时，切换到系统语音');
            }
        } catch (error) {
            console.error('ResponsiveVoice播放失败，回退到系统语音：', error);
        }
    }
    
    // 2. 检查是否启用百度AI语音
    const useBaiduTTS = localStorage.getItem('use_baidu_tts') === 'true';
    if (useBaiduTTS && window.baiduTTS && window.baiduTTS.isConfigured()) {
        try {
            await window.baiduTTS.speak(text);
            return;
        } catch (error) {
            console.error('百度AI语音播放失败，回退到系统语音：', error);
        }
    }
    
    // 3. 使用系统语音（原有逻辑）
    // 停止当前正在播放的语音
    window.speechSynthesis.cancel();

// 等待ResponsiveVoice就绪的辅助函数
function waitForResponsiveVoice(timeout = 2000) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const check = () => {
            if (window.responsiveVoiceService && window.responsiveVoiceService.isReady) {
                resolve(true);
            } else if (Date.now() - startTime > timeout) {
                resolve(false);
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}
    
    // 将数学符号转换为中文，确保能正确朗读
    let speakableText = text
        .replace(/\+/g, '加')
        .replace(/−/g, '减')  // 中文减号
        .replace(/-/g, '减')  // 英文减号/连字符
        .replace(/×/g, '乘')
        .replace(/÷/g, '除')
        .replace(/=/g, '等于')
        .replace(/>/g, '大于')
        .replace(/</g, '小于')
        .replace(/≥/g, '大于等于')
        .replace(/≤/g, '小于等于')
        .replace(/（/g, '左括号')
        .replace(/）/g, '右括号')
        .replace(/\(/g, '左括号')
        .replace(/\)/g, '右括号');
    
    // 多音字修正：确保读准确的音
    // "量" - 在量词中读liàng（第四声）
    speakableText = speakableText
        .replace(/个量词/g, '个 liàng 词')  // 量词的"量"读第四声
        .replace(/(支|只|杯|块|张|本|个|位|名|人|辆|瓶|颗|把|棵|盒|箱|盘|堆|粒|串|架|艘|步|倍)量词/g, '$1 liàng 词')
        // "行" - 在数学中读háng（第二声），不是xíng
        .replace(/行列/g, 'háng liè')  // 行列
        .replace(/第\s*\d+\s*行/g, (match) => match.replace('行', 'háng'))  // 第几行
        .replace(/横行/g, '横 háng')  // 横行
        // "数" - 作为名词读shù（第四声），作为动词读shǔ（第三声）
        .replace(/数数/g, 'shǔ shù')  // 数数（动词+名词）
        .replace(/顺着数/g, '顺着 shǔ')  // 顺着数
        .replace(/倒着数/g, '倒着 shǔ')  // 倒着数
        // "分" - 表示分割时读fēn（第一声），货币单位诽fēn
        .replace(/平均分/g, '平均 fēn')
        .replace(/分与合/g, 'fēn 与 hé')
        .replace(/分一分/g, 'fēn yī fēn')
        // "重" - 表示重量读zhòng（第四声），表示重复诽chóng（第二声）
        .replace(/重量/g, 'zhòng liàng')
        // "长" - 表示长度诽cháng（第二声），表示增长诽zhǎng（第三声）
        .replace(/长度/g, 'cháng dù')
        .replace(/长短/g, 'cháng duǎn');
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 特殊处理："葡萄"逐字朗读，确保读准第二声pú táo
    if (text === '葡萄') {
        const utterance1 = new SpeechSynthesisUtterance('葡');
        const utterance2 = new SpeechSynthesisUtterance('萄');
        
        // 移动端需要更快的语速和更清晰的音调
        utterance1.rate = isMobile ? 0.95 : 1.0;
        utterance1.pitch = isMobile ? 1.4 : 1.3;
        utterance1.volume = 1;
        
        utterance2.rate = isMobile ? 0.95 : 1.0;
        utterance2.pitch = isMobile ? 1.4 : 1.3;
        utterance2.volume = 1;
        
        // 选择最佳语音引擎
        const voice = getBestVoice(isMobile);
        if (voice) {
            utterance1.voice = voice;
            utterance2.voice = voice;
        }
        
        utterance1.onend = () => {
            window.speechSynthesis.speak(utterance2);
        };
        
        window.speechSynthesis.speak(utterance1);
        return;
    }
    
    // 创建语音实例（使用转换后的文本）
    const utterance = new SpeechSynthesisUtterance(speakableText);
    
    // 根据文本长度和设备类型设置语速
    if (speakableText.length === 1) {
        // 单字：读得更慢更清晰，让学生能听清每个字的发音
        utterance.rate = isMobile ? 0.5 : 0.5;  // 降低到0.5，更慢更清晰
    } else if (speakableText.length <= 4) {
        // 短词组：适中速度
        utterance.rate = isMobile ? 0.7 : 0.65;
    } else if (speakableText.length <= 15) {
        // 中等句子：正常速度
        utterance.rate = isMobile ? 0.85 : 0.8;
    } else {
        // 长句子：正常语速
        utterance.rate = isMobile ? 0.95 : 0.9;
    }
    
    // 设置音调：移动端需要稍高一些的音调才能听清
    if (text.includes('边')) {
        // 包含"边"字，降低音调帮助读准第一声
        utterance.pitch = isMobile ? 1.1 : 1.0;
    } else {
        // 普通文本，温柔甘美的声音
        utterance.pitch = isMobile ? 1.3 : 1.2;
    }
    
    utterance.volume = 1; // 最大音量
    
    // 选择最佳语音引擎
    const voice = getBestVoice(isMobile);
    if (voice) {
        utterance.voice = voice;
    }
    
    // 播放语音
    window.speechSynthesis.speak(utterance);
}

// 选择最佳语音引擎（移动端和PC端优化）
function getBestVoice(isMobile) {
    const voices = window.speechSynthesis.getVoices();
    
    // 优先使用用户保存的偏好
    const preferredVoiceName = localStorage.getItem('preferredVoiceName');
    if (preferredVoiceName) {
        const preferredVoice = voices.find(v => v.name === preferredVoiceName);
        if (preferredVoice) {
            return preferredVoice;
        }
    }
    
    if (isMobile) {
        // 移动端优先级：
        // 1. 原生Android/iOS中文女声
        // 2. 任何中文女声
        // 3. 任何中文语音
        return voices.find(voice => 
            voice.lang.includes('zh') && 
            (voice.name.includes('女') || voice.name.includes('Female') || voice.name.includes('Ting-Ting') || voice.name.includes('Sin-Ji'))
        ) || voices.find(voice => 
            voice.lang.includes('zh') && voice.name.includes('Female')
        ) || voices.find(voice => 
            voice.lang.includes('zh-CN') || voice.lang.includes('zh-TW') || voice.lang.includes('zh')
        );
    } else {
        // PC端优先级：
        // 1. Microsoft中文女声
        // 2. Google中文女声
        // 3. 任何中文女声
        return voices.find(voice => 
            voice.lang.includes('zh') && voice.name.includes('Female') && voice.name.includes('Microsoft')
        ) || voices.find(voice => 
            voice.lang.includes('zh') && voice.name.includes('Female') && voice.name.includes('Google')
        ) || voices.find(voice => 
            voice.lang.includes('zh') && voice.name.includes('Female')
        ) || voices.find(voice => 
            voice.lang.includes('zh')
        );
    }
}

// 确保语音列表加载完成
window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
};

// 加载可用的语音列表
function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
    console.log('已加载语音数量:', availableVoices.length);
}

// 打开语音选择器
function openVoiceSelector() {
    const modal = document.getElementById('voice-selector-modal');
    const voiceList = document.getElementById('voice-list');
    
    // 确保语音已加载
    if (availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
    }
    
    // 过滤出中文语音
    const chineseVoices = availableVoices.filter(voice => 
        voice.lang.includes('zh') || voice.lang.includes('CN') || voice.lang.includes('TW') || voice.lang.includes('HK')
    );
    
    // 获取当前选择的语音
    const currentVoiceName = localStorage.getItem('preferredVoiceName') || '';
    
    // 生成语音列表HTML
    if (chineseVoices.length === 0) {
        voiceList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #999;">
                <p style="font-size: 18px; margin-bottom: 10px;">😢 未找到中文语音</p>
                <p style="font-size: 14px;">您的设备可能不支持中文语音合成</p>
            </div>
        `;
    } else {
        voiceList.innerHTML = chineseVoices.map((voice, index) => {
            const isSelected = voice.name === currentVoiceName;
            const genderIcon = voice.name.includes('Female') || voice.name.includes('女') || voice.name.includes('Ting-Ting') || voice.name.includes('Sin-Ji') ? '👩' : 
                               voice.name.includes('Male') || voice.name.includes('男') ? '👨' : '🤖';
            
            return `
                <div class="voice-item" style="
                    padding: 15px;
                    margin-bottom: 10px;
                    border: 2px solid ${isSelected ? '#4caf50' : '#e0e0e0'};
                    border-radius: 8px;
                    background: ${isSelected ? '#f1f8f4' : '#fff'};
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                " onmouseover="this.style.borderColor='#2196F3'" onmouseout="this.style.borderColor='${isSelected ? '#4caf50' : '#e0e0e0'}'">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                            <span style="font-size: 24px;">${genderIcon}</span>
                            <strong style="font-size: 16px; color: #333;">${voice.name}</strong>
                            ${isSelected ? '<span style="background: #4caf50; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px;">✓ 当前使用</span>' : ''}
                        </div>
                        <div style="font-size: 13px; color: #666; margin-left: 34px;">
                            <span>语言: ${voice.lang}</span>
                            <span style="margin-left: 15px;">${voice.localService ? '本地' : '在线'}</span>
                            ${voice.default ? '<span style="margin-left: 15px; color: #2196F3;">⭐ 系统默认</span>' : ''}
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="testVoice('${voice.name.replace(/'/g, "\\'")}')
                                event.stopPropagation();" 
                                style="
                            padding: 8px 16px;
                            background: #2196F3;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                        " onmouseover="this.style.background='#1976D2'" 
                           onmouseout="this.style.background='#2196F3'">
                            🔊 试听
                        </button>
                        <button onclick="selectVoice('${voice.name.replace(/'/g, "\\'")}'); event.stopPropagation();" 
                                style="
                            padding: 8px 16px;
                            background: ${isSelected ? '#4caf50' : '#ff9800'};
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                        " onmouseover="this.style.background='${isSelected ? '#45a049' : '#f57c00'}'" 
                           onmouseout="this.style.background='${isSelected ? '#4caf50' : '#ff9800'}'">
                            ${isSelected ? '✓ 已选择' : '选择'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // 显示模态框
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭语音选择器
function closeVoiceSelector() {
    const modal = document.getElementById('voice-selector-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // 停止所有语音播放
    window.speechSynthesis.cancel();
}

// 测试语音
function testVoice(voiceName) {
    // 停止当前播放
    window.speechSynthesis.cancel();
    
    const voice = availableVoices.find(v => v.name === voiceName);
    if (!voice) return;
    
    // 测试文本
    const testText = '你好,我是AI语音助手。一加一等于二,小明有三个苹果。';
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
}

// 选择语音
function selectVoice(voiceName) {
    localStorage.setItem('preferredVoiceName', voiceName);
    
    // 显示成功提示
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
        // 简单的成功反馈
        alert(`✓ 已选择语音: ${voice.name}\n\n下次朗读时将使用此语音。`);
    }
    
    // 刷新语音列表显示
    openVoiceSelector();
}

// 绘制练习网格
function drawPracticeGrid() {
    const canvas = document.getElementById('practice-canvas');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!showGuide) return;
    
    // 如果是句子（长度>4），不显示米字格
    if (currentWord && currentWord.word.length > 4) {
        return;
    }
    
    // 根据字数决定显示几个米字格
    const charCount = currentWord ? Math.min(currentWord.word.length, 2) : 2;
    const gridSize = 200;
    const gap = 10;
    
    // 调整画布宽度
    canvas.width = charCount * gridSize + (charCount - 1) * gap;
    
    for (let i = 0; i < charCount; i++) {
        const offsetX = i * (gridSize + gap);
        
        // 外框
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, 0, gridSize, gridSize);
        
        // 米字格辅助线
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 横中线
        ctx.beginPath();
        ctx.moveTo(offsetX, gridSize / 2);
        ctx.lineTo(offsetX + gridSize, gridSize / 2);
        ctx.stroke();
        
        // 竖中线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize / 2, 0);
        ctx.lineTo(offsetX + gridSize / 2, gridSize);
        ctx.stroke();
        
        // 左上到右下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX + gridSize, gridSize);
        ctx.stroke();
        
        // 右上到左下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize, 0);
        ctx.lineTo(offsetX, gridSize);
        ctx.stroke();
    }
}

// 设置绘图画布
function setupDrawingCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let lastX = 0;
    let lastY = 0;
    
    // 获取画布坐标的辅助函数
    function getCanvasCoordinates(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let clientX, clientY;
        if (e.type.startsWith('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }
    
    // 鼠标/触摸事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // 触摸事件（移动端）
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        const coords = getCanvasCoordinates(e, canvas);
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const coords = getCanvasCoordinates(e, canvas);
        
        ctx.strokeStyle = '#f5576c';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        isDrawing = true;
        const coords = getCanvasCoordinates(e, canvas);
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;
        
        const coords = getCanvasCoordinates(e, canvas);
        
        ctx.strokeStyle = '#f5576c';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
}

// 清空练习画布
function clearPracticeCanvas() {
    const canvas = document.getElementById('practice-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPracticeGrid();
}

// 渲染解释内容（支持例题单独朗读）
function renderExplanation(explanation) {
    const container = document.getElementById('modal-explanation');
    
    // 检测是否包含例题
    if (explanation.includes('例题')) {
        // 分离主解释和例题
        const parts = explanation.split(/(例题\d+：)/g);
        let html = '';
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (!part) continue;
            
            if (part.match(/例题\d+：/)) {
                // 例题标题
                const exampleNum = part;
                const exampleContent = parts[i + 1] ? parts[i + 1].trim() : '';
                
                if (exampleContent) {
                    html += `
                        <div class="example-item">
                            <div class="example-header">
                                <span class="example-title">${exampleNum}</span>
                                <button class="example-speak-btn" onclick="speakExample('${exampleContent.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">🔊</button>
                            </div>
                            <div class="example-content">${exampleContent.replace(/\n/g, '<br>')}</div>
                        </div>
                    `;
                    i++; // 跳过已处理的内容
                }
            } else if (i === 0 || !parts[i-1].match(/例题\d+：/)) {
                // 主解释内容
                html += `<div style="margin-bottom: 10px;">${part.replace(/\n/g, '<br>')}</div>`;
            }
        }
        
        container.innerHTML = html;
    } else {
        // 普通解释，直接显示
        container.innerHTML = explanation.replace(/\n/g, '<br>');
    }
}

// 朗读例题
function speakExample(text) {
    speakText(text);
}
