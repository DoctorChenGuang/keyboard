const IME = {
  loaded: false,
  // singleKey: [],
  // ZCSH: [],
  // firstLetterWords: new Map(),
  // word: new Map(),
  // words: new Map(),
  // vowels: [],
  // initial: []
};

(function () {
  function loadAsync(url) {
    let newScript = document.createElement('script');
    newScript.src = url;

    return new Promise((resolve, reject) => {
      newScript.onload = () => {
        resolve();
      };
      newScript.onerror = err => {
        reject(err);
      };
      document.head.appendChild(newScript);
    });
  }

  function resolveBasePath(scriptName) {
    let basePath;
    for (let i = 0; i < document.scripts.length; i++) {
      let script = document.scripts[i];
      if (script.src.includes(scriptName)) {
        basePath = script.src.replace(scriptName, '');
        break;
      }
    }
    return basePath;
  }

  async function init() {
    let imeLoaderScriptName = 'ime-loader.js';

    // ime-loader.js所在目录
    let basePath = resolveBasePath(imeLoaderScriptName);
    if (!basePath) {
      throw new Error('[IME] base path of files can\'t found');
    }

    const fileList = [
      'lib/words-new.js',
      'lib/word-new.js',
      'lib/first-letter-word.js',
      'lib/ch.js',
      'lib/automated-words.js',
      'lib/weight.js'
    ];

    let loadFileTasks = [];
    fileList.forEach(file => {
      loadFileTasks.push(loadAsync(basePath + file));
    });

    IME.convert = convert;
    IME.automate = automate;
    await Promise.all(loadFileTasks);
    IME.loaded = true;

    Object.freeze(IME);
    console.info('[IME]', 'all files loaded');
  }

  function convert(input) {
    if (!IME.loaded) {
      console.warn('[IME]', '词库文件未加载');
      return;
    }

    if (!input || typeof input !== 'string') {
      console.warn('[IME]', '待转换的字符串为空');
      return;
    }

    let invalidConvertResult = { syllables: input, words: input };
    let analyzedResult = analyse(input);
    if (!analyzedResult.result) {
      return invalidConvertResult;
    }

    let result = [];
    let [findWord, fullSyllableWords] = translate(analyzedResult.syllables);
    result = result.concat(fullSyllableWords);

    if (!findWord) {
      result = result.concat(queryWord(analyzedResult.syllables[0]));
    }

    if (result.length < 1) {
      return invalidConvertResult;
    }

    return result;
  }

  function toKeyValue(data) {
    let result = {};
    data.forEach(item => {
      if (result[item.syllables]) {
        result[item.syllables] = result[item.syllables].concat(item.words);
      } else {
        result[item.syllables] = item.words;
      }
    });
    return result;
  }

  function queryWord(syllable) {
    if (IME.vowels.includes(syllable))
      return { syllables: syllable, words: syllable };

    let result;
    if (syllable.length === 1) {
      let singleKeyIndex = syllable.charCodeAt(0) - 97;
      result = IME.singleKey[singleKeyIndex].split('');
    } else {
      let zcshIndex = ['zh', 'ch', 'sh'].indexOf(syllable);
      result = IME.ZCSH[zcshIndex].split('');
    }

    for (let i = 0; i < IME.vowels.length; i++) {
      let vowel = IME.vowels[i];
      let fullSyllable = syllable + vowel;

      if (IME.word.has(fullSyllable)) {
        let words = IME.word.get(fullSyllable).split('');
        words.forEach(word => {
          if (!result.includes(word)) {
            result.push(word);
          }
        });
      }
    }

    return { syllables: syllable, words: result };
  }

  function analyse(input) {
    let analyzedResult = { result: false, syllables: [] };
    let syllable = '';
    let i = 0;

    while (i < input.length) {
      let code = input.charCodeAt(i);

      // 只转换小写字母
      if (code < 97 || code > 122) {
        return analyzedResult;
      }

      let letter = input[i];
      let tempSyllable = syllable + letter;
      if (IME.word.has(tempSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      // // 词库中拼音用g代替ng      
      // replacedSyllable = tempSyllable.replace('ng', 'g');
      // if (IME.word.has(replacedSyllable)) {
      //   syllable += letter;
      //   ++i;
      //   continue;
      // }

      // // 词库中拼音用ug代替uang      
      // replacedSyllable = tempSyllable.replace('uang', 'ug');
      // if (IME.word.has(replacedSyllable)) {
      //   syllable += letter;
      //   ++i;
      //   continue;
      // }

      // 声母继续往下匹配
      if (IME.initial.includes(tempSyllable)) {
        syllable += letter;
        ++i;
        continue;
      }

      if (syllable) {
        analyzedResult.syllables.push(syllable);
      } else {
        analyzedResult.syllables.push(tempSyllable);
        ++i;
      }

      syllable = '';
    }

    if (syllable) {
      analyzedResult.syllables.push(syllable);
    }

    analyzedResult.result = true;
    return analyzedResult;
  }

  function queryWordsAndWord(input) {
    let wordList;
    let wordsFound = false;
    let wordFound = false;

    // 查询首字母词库
    let wordsList = queryFirstLetterWords(input);

    // 查询词库
    let wordsStr = IME.words.get(input);
    if (wordsStr) {
      wordsList.words = wordsList.words.concat(wordsStr.split(' '));
    }

    if (wordsList.words.length > 0) {
      wordsFound = true;
    }

    // 查字
    let wordStr = IME.word.get(input);
    if (wordStr) {
      wordList = { syllables: input, words: wordStr.split('') };
      wordFound = true;
    }

    return [wordFound, wordsFound, wordList, wordsList];
  }

  function queryAllWords(input) {
    let [wordFound1, wordsFound1, wordList1, wordsList1] = queryWordsAndWord(input);

    // let replacedInput = input.replace('uang', 'ug');
    // let [wordFound2, wordsFound2, wordList2, wordsList2] = queryWordsAndWord(replacedInput);

    // replacedInput = input.replace('ng', 'g');
    // let [wordFound3, wordsFound3, wordList3, wordsList3] = queryWordsAndWord(replacedInput);

    return [wordFound1, wordsFound1, wordList1, wordsList1];
  }

  function translate(syllables) {
    let result = [];
    let findWord = false;

    for (let i = 0; i < syllables.length; i++) {
      let combinedSyllable = syllables.slice(0, syllables.length - i).join('');
      let [wordFound, wordsFound, wordList, wordsList] = queryAllWords(combinedSyllable);

      if (wordsFound) {
        result.push(wordsList);
      }

      if (wordFound) {
        result.push(wordList);
        findWord = true;
        break;
      }
    }

    return [findWord, result];
  }

  function queryFirstLetterWords(input) {
    let wordsStr = IME.firstLetterWords.get(input);
    let result = { syllables: input, words: [] };
    if (wordsStr) {
      result.words = wordsStr.split(' ');
    }
    return result;
  }

  //联想词功能,词库中的最长词为12。
  function automate(value) {
    let strLen = value.length;

    if (strLen > 12) {
      value = value.substring(strLen - 12);
    }

    let result = getWords(value);

    let keywords = result[Object.keys(result)[0]];

    if (!keywords || !keywords.length) {
      value = value.substring(1);
      if (value.length) {
        return automate(value);
      }
    }
    return sort(result);
  }

  function getWords(value) {
    let result = {};
    let data = value;
    let dataLen = data.length;
    let keywords = data.substring(0, 1);
    let kwArr = IME.automatedWords.get(keywords);

    if (!kwArr || !kwArr.length) return {};

    if (dataLen == 1) {
      result[data] = [];
      let l = kwArr[0].length;
      for (let i = 0; i < l; i++) {
        result[data].push(kwArr[0][i].substring(dataLen));
      }
    } else {
      result[data] = [];
      for (let j = 0; j < kwArr.length; j++) {
        if (j >= dataLen - 2 && kwArr[j]) {
          let l = kwArr[j].length;
          for (let i = 0; i < l; i++) {
            if (kwArr[j][i].substring(0, dataLen) === data && kwArr[j][i].substring(dataLen)) {
              result[data].push(kwArr[j][i].substring(dataLen));
            }
          }
        }
      }
    }
    return result;
  }

  //按照权值排序
  function sort(result) {
    let keywords = Object.keys(result)[0];
    let arr = result[Object.keys(result)[0]];
    let sortData = {};
    if (!keywords) {
      return {};
    }
    arr.sort((value1, value2) => {
      return IME.weight.get(keywords + value2) - IME.weight.get(keywords + value1);
    });

    sortData[keywords] = arr;
    return sortData;
  }
  init();
})();
