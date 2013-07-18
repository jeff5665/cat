var JUtil=(function(){
    var getUrlParams=function() {
        var sUrl = location.href;
        var str = sUrl.split("?");
        var pstr;
        var params = [];
        var i,ar;
        if (str.length == 1) pstr = '';
        else pstr = str[1];
        if (pstr != '') {
            ar = pstr.split(/[&=]/);
            for(i=0;i<ar.length;i+=2) {
                params[ar[i]] = ar[i+1];
            }
        }
        return params;
    };
    var getUnsafeWindow=function() {
        if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
            return this.unsafeWindow;
        } else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
            var node = document.createElement("div");
            node.setAttribute("onclick", "return window;");
            return node.onclick();
        } else {//Opera, IE7Pro, etc.
            return window;
        }
    };

    var unique=function(arr){
            var a = [],
                o = {},
                i,
                v,
                len = arr.length;
            if (len < 2) {
                return arr;
            }
            for (i = 0; i < len; i++) {
                v = arr[i];
                if (o[v] !== 1) {
                    a.push(v);
                    o[v] = 1;
                }
            }
            return a;

    };

    var  getTimeStr=function(format) {
        var _format=format||"yyyy-mm-dd hh:mm:ss";
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        var day = datetime.getDate();
        if(day<10){
            day='0'+day;
        }
        var hour = datetime.getHours();
        if(hour<10){
            hour='0'+hour;
        }
        var minute = datetime.getMinutes();
        if(minute<10){
            minute='0'+minute;
        }
        var second = datetime.getSeconds();
        if(second<10){
            second='0'+second;
        }

        var targetStr=_format.replace('yyyy',year).replace('mm',month).replace('dd',day).replace('hh',hour).replace('mm',minute).replace('ss',second);
        // var targetStr = year + '-' + month + '-' + day + ' '  + hour + ':' + minute + ':' + second;
        return targetStr;
    }

    return {
        getUrlParams:getUrlParams,
        unsafeWindow:getUnsafeWindow,
        getTimeStr:getTimeStr,
        unique:unique
    }
})();
