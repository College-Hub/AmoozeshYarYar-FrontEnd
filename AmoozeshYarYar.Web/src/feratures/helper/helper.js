

// change day ids to day persian day title 
export const dayToPersian = i => {
    
    if (i == '0') return "شنبه ";
    else if (i == '1') return "یک‌شنبه";
    else if (i == '2') return "دوشنبه";
    else if (i == '3') return "سه‌شنبه";
    else if (i == '4') return "چهارشنبه";
    else if (i == '5') return "پنج‌شنبه";

};

// convert strings of numbers(like 700 --> 7:00 or 1200 --> 12:00) to time string 
export const generateTimeString = str => {
    let charList = Array.from(str);
    charList.length === 4 ? charList.splice(2, 0, ' : ') : charList.splice(1, 0, ' : ')
    let newString = charList + "";
    return newString.replaceAll(',', '')
};
