var Account=(function(){
    var currentAccountName;
    function init(){
        //异步获取当前帐号名
        chrome.runtime.sendMessage({action:'getCurrentAccountName'},function(result){
            currentAccountName=result;
        });
    }

    init();
    return {
        create:function(){//创建一个新的Account实例
        },
        getAccount:function(callback){//异步请求background后执行callback, callback参数为 帐号信息
            chrome.runtime.sendMessage({action:'getAccount'},function(result){
                currentAccountName=result.accountName;
                callback(result.data);
            });
        },
        saveAccount:function(account,callback){//保存账户
            var _callback=callback||function(){};
            if(currentAccountName!==undefined){//帐号已经初始化
                var _account={};
                _account[currentAccountName]=account;
                chrome.runtime.sendMessage({action:'updateAccount',account:_account},function(data){
                    if(data.status==='success'){
                        _callback(account['step']);
                        console.log('step ',account.step,' update success');
                    }
                });
            }
        }
    }

})($);