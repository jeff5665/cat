var SwapMyCookieMessage=(function(){
    function getMessage(){
        return message;
    }

    var laserExtensionId = "dffhipnliikkblkhpjapbecpmoilcama";
    var port = chrome.extension.connect(laserExtensionId);
    var message={};

    if(chrome.extension.lastError===undefined){
        port.postMessage({action:"getCurrentName"});
    }



    port.onMessage.addListener(function(msg) {
        message = msg;
    });


    return {
        getMessage:getMessage
    }
})();