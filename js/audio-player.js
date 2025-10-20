/**
 * 音频播放器 - 播放预生成的高质量AI语音MP3文件
 */

class AudioPlayer {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        
        // 音频文件路径映射
        this.audioBaseDir = 'audio/';
        
        // 分类映射
        this.categoryMap = {
            // Section 1
            'numbers': 'section1_numbers',
            'operations': 'section1_operations',
            'positions': 'section1_positions',
            'comparisons': 'section1_comparisons',
            'units': 'section1_units',
            'quantifiers': 'section1_quantifiers',
            // Section 2
            'questionTypes': 'section2_questionTypes',
            'basicConcepts': 'section2_basicConcepts',
            'items': 'section2_items',
            'animals': 'section2_animals',
            'foods': 'section2_foods',
            'planeShapes': 'section2_shapes',
            'solidShapes': 'section2_shapes',
            // Section 3
            'fillMethods': 'section3_fillMethods',
            'comparisonRules': 'section3_comparisonRules',
            'hundredTable': 'section3_hundredTable',
            // Section 4
            'additionProblems': 'section4_additionProblems',
            'subtractionProblems': 'section4_subtractionProblems',
            'multiplicationProblems': 'section4_multiplicationProblems',
            'divisionProblems': 'section4_divisionProblems'
        };
    }
    
    /**
     * 播放字词语音
     * @param {string} word - 要朗读的字词
     * @param {string} category - 字词所属分类
     */
    play(word, category = '') {
        if (!word) return;
        
        // 停止当前播放
        this.stop();
        
        // 构建音频文件路径
        const audioPath = this.getAudioPath(word, category);
        
        // 创建音频对象
        this.currentAudio = new Audio(audioPath);
        this.isPlaying = true;
        
        // 播放音频
        this.currentAudio.play().then(() => {
            console.log('🔊 播放:', word);
        }).catch(error => {
            console.error('播放失败:', error);
            console.log('尝试的路径:', audioPath);
            this.isPlaying = false;
        });
        
        // 播放结束事件
        this.currentAudio.onended = () => {
            this.isPlaying = false;
            console.log('✅ 播放完成');
        };
        
        // 错误处理
        this.currentAudio.onerror = () => {
            console.error('音频加载失败:', audioPath);
            this.isPlaying = false;
        };
    }
    
    /**
     * 停止播放
     */
    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
        }
    }
    
    /**
     * 获取音频文件路径
     */
    getAudioPath(word, category) {
        // 获取实际的文件夹名称
        const folderName = this.categoryMap[category] || 'section1_numbers';
        
        // 特殊字符处理：将数学符号转换为中文
        let filename = word;
        
        // 统一处理所有符号（按照音频文件的命名规则）
        const symbolMap = {
            // 用于句子的半角符号（如：加数+加数=和）
            '+': '加',
            '-': '减',
            '−': '减',      // 全角减号
            '×': '乘',
            '÷': '除',
            '=': '等于',
            // 用于单个字符显示的全角符号
            '＋': '加号',
            '－': '减号',
            '>': '大于号',
            '<': '小于号'
        };
        
        for (const [char, replacement] of Object.entries(symbolMap)) {
            filename = filename.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
        }
        
        // 构建完整路径
        return `${this.audioBaseDir}${folderName}/${filename}.mp3`;
    }
}

// 创建全局实例
const audioPlayer = new AudioPlayer();
