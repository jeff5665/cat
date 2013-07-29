var Account=(function(){

    function init(){

    }



    return {
        create:function(){//创建一个新的Account实例
        },
        getAccount:function(callback){//异步请求background后执行callback,返回参数为account
            chrome.runtime.sendMessage({action:'getAccount'},function(account){
                callback(account);
            });

        }
    }

})($);