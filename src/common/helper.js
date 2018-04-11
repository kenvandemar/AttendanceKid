export default class Helper {
    
    // static dateMasks = {
    //     default: "ddd mmm dd yyyy HH:MM:ss",
    //     shortDate: "m/d/yy",
    //     mediumDate: "mmm d, yyyy",
    //     longDate: "mmmm d, yyyy",
    //     fullDate: "dddd, mmmm d, yyyy",
    //     shortTime: "h:MM TT",
    //     mediumTime: "h:MM:ss TT",
    //     longTime: "h:MM:ss TT Z",
    //     isoDate: "yyyy-mm-dd",
    //     isoTime: "HH:MM:ss",
    //     isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    //     isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    // };
    // static arabicDigits = { "0": "٠", "1": "١", "2": "٢", "3": "٣", "4": "٤", "5": "٥", "6": "٦", "7": "٧", "8": "٨", "9": "٩" };
    // static ISOFormatDate = "yyyy-mm-dd";
    // static paramDateFormat = "yyyymmdd";

    //Format number
    static formatVietNamText(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        return str;
    }
}