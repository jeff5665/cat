(function($,defaultConfig){
    $(function () {
        var userConfig = {};
        if (localStorage['UserConfig'] === undefined) {
            userConfig = defaultConfig;
            localStorage['UserConfig'] = JSON.stringify(defaultConfig);
        } else {
            userConfig = JSON.parse(localStorage['UserConfig']);
        }


        var requestHandler = {
            saveGameConfig: function (req) {

            },
            saveBattleConfig: function (req, sender, sendResponse) {//保存战斗配置
                userConfig.battle = req.battle;
                localStorage['GameConfig'] = JSON.stringify(userConfig);
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


            }

        };





        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            requestHandler[request.action](request,sender,sendResponse);//根据request.action执行相应处理，request为参数
        });


    });



})(jQuery,DefaultConfig);



