var userConfig = (function(){
    if (localStorage['UserConfig'] === undefined) {
        localStorage['UserConfig'] = JSON.stringify(defaultConfig);
        return defaultConfig;
    } else {
        return JSON.parse(localStorage['UserConfig']);
    }
})();



var accountList=(function(){
    if (localStorage['AccountList'] === undefined) {
        return {};
    } else {
        return JSON.parse(localStorage['AccountList']);
    }
})();

var currentAccountName=(function(){
    if (localStorage['currentName'] === undefined) {
        return {};
    } else {
        return JSON.parse(localStorage['currentName']);
    }
})();


var currentAccount=(function(currentAccountName,accountList){
    console.log('currentName!!!!!',currentAccountName);
    if(currentAccountName!==''){
        return accountList[currentAccountName]||{};
    }else{
        return {};
    }
})(currentAccountName,accountList);



(function($,defaultConfig){
    $(function () {
        chrome.extension.onConnectExternal.addListener(function(port) {//侦听来自其他扩展的信息  (来自cookieSwap的信息)
            port.onMessage.addListener(function(cookieSwapMsg) {
                console.log('cookieSwapMsg',cookieSwapMsg);
                var accountName=cookieSwapMsg['currentName'];
                console.log('accountName!!!',accountName);
                if(!accountList.hasOwnProperty(accountName)){//accoutList中不存在当前的accountName，往accountList中添加
                    accountList[accountName]={};
                    localStorage['AccountList'] = JSON.stringify(accountList);
                }
                localStorage['currentName'] = JSON.stringify(accountName);
                console.log(accountName,accountList);

                currentAccount=accountList[accountName];
                currentAccount['accountName']=accountName;
                console.log('current',currentAccount,accountList);
            });
        });










        var requestHandler = {
           /* saveGameConfig: function (req) {

            },
            saveBattleConfig: function (req, sender, sendResponse) {//保存战斗配置
                userConfig.battle = req.battle;
                localStorage['GameConfig'] = JSON.stringify(userConfig);
            },*/

            updateAccount:function(req, sender, sendResponse){//为测试
                currentAccount=req.account;
                $.extend(accountList,currentAccount);
                localStorage['AccountList'] = JSON.stringify(accountList);
                sendResponse({status:'success'});
            },
            getAccount:function(req, sender, sendResponse){//未测试
                console.log('getAccount');
                console.log(currentAccount);
                sendResponse(currentAccount);
            },

            getUserConfig: function (req, sender, sendResponse) {
                sendResponse(userConfig);
                console.log('@getUserConfig',userConfig);
            } ,
            reloadUserConfig:function(req,sender,sendResponse){
                console.log('reloadUserConfig');
                var hasError=false;
                try{
                    userConfig=JSON.parse(localStorage['UserConfig']) ;
                }
                catch (e){
                    hasError=true;
                    sendResponse('background:: reloadUserConfig 失败，可能localstorage满了');
                }
                if(!hasError){
                    sendResponse('background:: reloadUserConfig 成功');
                }


            },
            reloadAccountList:function(req,sender,sendResponse){
                console.log('reloadAccountList');
               accountList =JSON.parse(localStorage['AccountList']) ;
               sendResponse('background:: reloadAccountList 成功');
            }

        };





        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            requestHandler[request.action](request,sender,sendResponse);//根据request.action执行相应处理，request为参数
        });


    });



})(jQuery,DefaultConfig);



