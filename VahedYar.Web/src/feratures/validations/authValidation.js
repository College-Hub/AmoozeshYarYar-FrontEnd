import { sha256 } from 'crypto-hash';

// all validators for user authentication 
export const validateEmail = (inputVal, isRequired, inputSideVal) => {
    const result = { status: true, Message: '' };
    
    if (!inputVal && isRequired) result.Message = 'ایمیل رو باید وارد کنی';
    else if (!inputVal?.includes("@") && inputVal) result.Message = 'ایمیل معتبر نیست';
    else if (inputVal?.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) !== -1 && inputVal)
       result.Message = 'ایمیل شما نمی تواند شامل حروف فارسی باشد';
    if (result.Message) result.status = false;

    return result;
};

export const validateUsername = (inputVal, isRequired, inputSideVal) => {
    const result = { status: true, Message: '' };

    if (!inputVal && isRequired) result.Message = ' نام‌کاربری رو باید وارد کنی';
    else if (inputVal?.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) !== -1)
        result.Message = 'برای نام‌کاربری نمی‌تونی از حروف فارسی استفاده کنی ';
    else if (inputVal?.length > 12 && inputVal) result.Message = 'نام‌کاربری کوتاه تری انتخاب کن';
    if (result.Message) result.status = false;

    return result;
};

export const validatePassWord = (inputVal, isRequired, inputSideVal) => {
    const result = { status: true, Message: '' };
    if (!inputVal) result.Message = ' رمز رو باید وارد کنی';
    else if (inputVal.length < 8) result.Message = 'رمز شما باید حداقل 8 کرکتر داشته باشد';
    else if (inputVal.search(/[a-z]/i) < 0) result.Message = 'رمز شما باید از چند حرف انگلیسی تشکیل شده باشد';
    else if (inputVal.search(/[0-9]/) < 0) result.Message = 'رمز شما باید شامل چند عدد باشد';
    else if (inputVal.search(/[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]/) > 0)
        result.Message = 'رمز شما نمی تواند شامل حروف فارسی باشد';
    if (result.Message) result.status = false;

    return result;
};

export const validateRePassword =  (inputVal, isRequired, inputSideVal) => {


    const result = { status: true, Message: '' };
    if (!inputVal && isRequired) result.Message = ' تکرار رمز رو باید وارد کنی';
    else if (inputVal !== inputSideVal) result.Message = 'تکرار رمز با خود رمز برابر نیست';
    if (result.Message) result.status = false;

    return result;
};

export const validatePhoneNumber = (inputVal, isRequired, inputSideVal) => {
    const result = { status: true, Message: '' };
    var validateresult = inputVal?.match(/^0?9[0-9]{9}$/);
    if (!inputVal && isRequired) result.Message = 'شماره همراه رو باید وارد کنی';
    else if (!validateresult && inputVal) result.Message = 'شماره همراه معتبر نیست';
    if (result.Message) result.status = false;

    return result;
};

 