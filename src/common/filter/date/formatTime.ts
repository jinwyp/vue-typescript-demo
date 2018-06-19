export default {
    name: 'formatTime',
    fn: function fn(time: any, type: any) {
        let datetime: any = '';
        if (time === undefined || time === null) {
            return '--';
        } else {
            datetime = new Date( parseInt(time, 10) );
        }
        const year = datetime.getFullYear();
        const month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        const day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        const hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
        const min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
        const sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
        if (type === 0 || type === undefined) {
            return year + '-' + month + '-' + day;
        }
        if (type === 1) {
            return year + '/' + month + '/' + day;
        }
        if (type === 2) {
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '';
        }
        if (type === 3) {
            return hour + ':' + min;
        }
        if (type === 4) {
            return month + '月' + day + '日';
        }
        if (type === 5) {
            return month + '-' + day + '  ' + hour + ':' + min;
        }
    }
};
