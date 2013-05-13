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
    function getUnsafeWindow() {
        if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
            return this.unsafeWindow;
        } else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
            var node = document.createElement("div");
            node.setAttribute("onclick", "return window;");
            return node.onclick();
        } else {//Opera, IE7Pro, etc.
            return window;
        }
    }
    var myUnsafeWindow = getUnsafeWindow();

    return {
        getUrlParams:getUrlParams,
        unsafeWindow:myUnsafeWindow
    }
})();