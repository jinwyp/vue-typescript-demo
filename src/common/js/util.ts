const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s: any, len: any) {
    len = len - (s + '').length;
    for (let i = 0; i < len; i++) { s = '0' + s; }
    return s;
}

export default {
    getQueryStringByName: function(name: any) {
        let reg: any = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        let context = '';
        if (r != null) {
            context = r[2];
        }
        reg = null;
        r = null;
        return context == null || context === '' || context === 'undefined' ? '' : context;
    },
    formatDate: {
        format: function(date: any, pattern: any) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0: any) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString: any, pattern: any) {
            const matchs1 = pattern.match(SIGN_REGEXP);
            const matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length === matchs2.length) {
                const NewDate: any = new Date(1970, 0, 1);
                for (let i = 0; i < matchs1.length; i++) {
                    const Int = parseInt(matchs2[i], 10);
                    const sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': NewDate.setFullYear(Int); break;
                        case 'M': NewDate.setMonth(Int - 1); break;
                        case 'd': NewDate.setDate(Int); break;
                        case 'h': NewDate.setHours(Int); break;
                        case 'm': NewDate.setMinutes(Int); break;
                        case 's': NewDate.setSeconds(Int); break;
                    }
                }
                return NewDate;
            }
            return null;
        }

    },

};
