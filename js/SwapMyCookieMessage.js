var SwapMyCookieMessage=(function(){

    /**
     * 返回message
     * @returns {{}}
     */
    function getMessage(){
        console.log('getMessage:',message);
        return message;
    }

    var laserExtensionId = "dffhipnliikkblkhpjapbecpmoilcama";
    var port = chrome.extension.connect(laserExtensionId);
    var message={};


    if(chrome.extension.lastError===undefined){//发送信息给swap my cookie
        port.postMessage({action:"getCurrentName"});
    }


    /**
     * 侦听来自swap my cookie的信息
     */
    port.onMessage.addListener(function(msg) {
        console.log('onMessage: ',msg);
        message = msg;
    });


    return {
        getMessage:getMessage
    }
})();