

// change day ids to day persian day title 
export const dayToPersian = i => {
    i = i.toString();
    if (i === '0') return "شنبه ";
    else if (i === '1') return "یک‌شنبه";
    else if (i === '2') return "دوشنبه";
    else if (i === '3') return "سه‌شنبه";
    else if (i === '4') return "چهارشنبه";
    else if (i === '5') return "پنج‌شنبه";
    else if (i === '6') return "جمعه";
};

// convert strings of numbers(like 700 --> 7:00 or 1200 --> 12:00) to time string 
export const generateTimeString = str => {
    str = str.toString();
    let charList = Array.from(str);
    charList.length === 4 ? charList.splice(2, 0, ' : ') : charList.splice(1, 0, ' : ')
    let newString = charList + "";
    return newString.replaceAll(',', '')
};

// convert english numbers to persian numbers 
export const toPersianNumber = (input) => {
    let inputString = input + '';
    const persianNumbers = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹'
    };

    return inputString.replace(/[0-9]/g, match => persianNumbers[match]);
};

// Randome color generator wit opacity of 30 
export const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color + '50';
};