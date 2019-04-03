function toWords(num) {

    var hundreds = '';
    var thousands = 'хиляди';
    var million = 'милион';
    var billion = 'милиард';
    var fractions = 'стотинки';
    var resultStr = '';
    var start = 0;

    var numStr = (num).toFixed(2);
    if (numStr.length > 15) {
        return 'Сумата е по-голяма от 999 милиарда!';
    }
    if (numStr.length > 12) {
        var tmp = getNumber(numStr, start);
        resultStr += addToWords(tmp, billion);
        start += tmp.length;
    }
    if (numStr.length > 9) {
        var tmp = getNumber(numStr, start);
        resultStr += addToWords(tmp, million);
        start += tmp.length;
    }
    if (numStr.length > 6) {
        var tmp = getNumber(numStr, start);
        resultStr += addToWords(tmp, thousands);
        start += tmp.length;
    }
    if (numStr.length > 3) {
        var tmp = getNumber(numStr, start);
        resultStr += addToWords(tmp, hundreds);
        start += tmp.length;
    }
    if (numStr.length > 0) {
        var tmp = getNumber(numStr, start);
        resultStr += addToWords(tmp, fractions);
        start += tmp.length;
    }
    return resultStr;
}

function addToWords(nums, count) {
    resultStr = '';
    var isThousand = (count === 'хиляди');
    var isHundred = (count === '');
    var fractions = (count === 'стотинки');
    var isZero = checkForZeros(nums);

    if (fractions) {
        resultStr += ' и ';
        if (nums[1] !== '0') {
            resultStr += nums[1];
        }
        resultStr += nums[2];
        resultStr += ' ' + count;
        return resultStr;
    }
    if (isThousand && nums.length === 1) {
        if (nums[0] === '1') {
            resultStr += 'хиляда ';
        } else {
            resultStr += extractWords(nums, isThousand) + ' ' + count + ' ';
        }
    } else if (!isZero) {
        resultStr += extractWords(nums, isThousand) + ' ' + count;
        if (!(nums.length === 1 && nums[0] === '1') && !isThousand && !isHundred) {
            resultStr += 'a ';
        } else {
            resultStr += ' ';
        }
    }
    if (isHundred) {
        if (nums.length === 1 && nums[0] === '0') {
            resultStr += 'нула';
        }
        resultStr = resultStr.trim();
        if (nums.length === 1 && nums[0] === '1') {
            return resultStr += ' лев';
        }
        resultStr += ' лева';
    }
    return resultStr;
}

function checkForZeros(nums) {
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] !== '0') {
            return false;
        }
    }
    return true;
}

function getNumber(str, start) {
    var lastDigits = 3;
    if (start === 0) {
        lastDigits = str.length % 3;
        if (lastDigits === 0) {
            lastDigits = 3;
        }
    }
    var tmp = str.substring(start, (start + lastDigits));
    return tmp.split('');
}

function extractWords(nums, isThousand) {
    switch (nums.length) {
        case 1:
            return numToWord(nums[0], isThousand);
        case 2:
            return tensToWords(nums, isThousand);
        case 3:
            return hundredsToWords(nums, isThousand);
        default:
            return '';
    }
}

function hundredsToWords(nums, isThousand) {
    var hundred = ['', 'сто', 'двеста', ' триста'];
    var hundreds = 'стотин';
    var resultHundredsStr = '';

    switch (nums[0]) {
        case '0':
            return tensToWords(nums[1] + nums[2], isThousand);
        case '1':
            resultHundredsStr += hundred[1];
            break;
        case '2':
            resultHundredsStr += hundred[2];
            break;
        case '3':
            resultHundredsStr += hundred[3];
            break;
        default:
            resultHundredsStr += numToWord(nums[0], isThousand) + hundreds;
            break;
    }
    if (!(nums[1] === '0' && nums[2] === '0')) {
        if (nums[1] === '1' || nums[2] === '0') {
            resultHundredsStr += ' и ';
        } else if (nums[1] !== '0') {
            resultHundredsStr += ' ';
        }
        resultHundredsStr += tensToWords(nums[1] + nums[2], isThousand);
    }
    return resultHundredsStr;
}

function tensToWords(nums, isThousand) {
    var ten = 'десет';
    var andStr = ' и ';
    var resultTensStr = '';

    if (nums[0] === '0') {
        resultTensStr += andStr + numToWord(nums[1], isThousand);
    } else if (nums[0] === '1') {
        if (nums[1] === '0') {
            return ten;
        }
        resultTensStr = numToWord(nums[1], false);
        if (nums[1] === '1') {
            resultTensStr += 'a';
        } else {
            resultTensStr += 'на';
        }
        resultTensStr += ten;
    } else {
        resultTensStr = numToWord(nums[0], isThousand) + ten;
        if (nums[1] !== '0') {
            resultTensStr += andStr + numToWord(nums[1], isThousand);
        }
    }
    return resultTensStr;
}

function numToWord(num, isThousand) {
    var numbers = ['', 'един', 'два', 'три', 'четири', 'пет', 'шест', 'седем', 'осем', 'девет'];
    var resultNumStr = '';

    switch (num) {
        case '1':
            if (isThousand) {
                resultNumStr = 'една';
            } else {
                resultNumStr = numbers[1];
            }
            break;
        case '2':
            if (isThousand) {
                resultNumStr = 'две';
            } else {
                resultNumStr = numbers[2];
            }
            break;
        case '3':
            resultNumStr = numbers[3];
            break;
        case '4':
            resultNumStr = numbers[4];
            break;
        case '5':
            resultNumStr = numbers[5];
            break;
        case '6':
            resultNumStr = numbers[6];
            break;
        case '7':
            resultNumStr = numbers[7];
            break;
        case '8':
            resultNumStr = numbers[8];
            break;
        case '9':
            resultNumStr = numbers[9];
            break;
        default:
            break;
    }
    return resultNumStr;
}