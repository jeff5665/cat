/**
 * 封装信猫请求
 */
var CatRequest=(function(){
        var gameMustData={};
        return {
            init:function(data){
              gameMustData=data;
            },
            postToBattle:function(enemy_id,callBack){//打野的请求
                var reqData={
                    url:'http://nobunyaga.86game.com/battle/setup.htm',
                    httpMethod:'POST',
                    headers:'Content-Type=application%2Fx-www-form-urlencoded',
                    postData:'enemy_id='+enemy_id+'&mc=0',
                    authz:'signed',
                    st:gameMustData.st,
                    contentType:'TEXT',
                    numEntries: 3,
                    getSummaries:false,
                    signOwner:true,
                    signViewer:true,
                    gadget:'http://nobunyaga.86game.com/gadget.xml',
                    container:'default',
                    bypassSpecCache:'',
                    getFullHeaders:false,
                    oauthState:''
                };

                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){

                    if(typeof callBack ==='function'){
                        callBack(result);
                    }
                });

            },
            //里战请求
            postToCountryBattle:function(callBack){
                var reqData={
                    url:'http://nobunyaga.86game.com/battle/mock_setup.htm',
                    httpMethod:'POST',
                    headers:'Content-Type=application%2Fx-www-form-urlencoded',
                    postData:'action=btl',
                    authz:'signed',
                    st:gameMustData.st,
                    contentType:'TEXT',
                    numEntries:3,
                    getSummaries:false,
                    signOwner:true,
                    signViewer:true,
                    gadget:'http://nobunyaga.86game.com/gadget.xml',
                    container:'default',
                    bypassSpecCache:'',
                    getFullHeaders:'false',
                    oauthState:''
                };
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){
                    if(typeof callBack ==='function'){
                        callBack(result);
                    }
                });
            },

            /**
             * 自动升级建造请求
             * @param callBack
             * &x=0&y=0
             */
             postToBuildHouse:function(map_id,callBack){
                 var reqData={
                     url:'http://nobunyaga.86game.com/command.htm',
                     httpMethod:'POST',
                     headers:'Content-Type=application%2Fx-www-form-urlencoded',
                     postData:'tabid=&'+map_id+'&command=extend',
                     authz:'signed',
                     st:gameMustData.st,
                     contentType:'TEXT',
                     numEntries:3,
                     getSummaries:false,
                     signOwner:true,
                     signViewer:true,
                     gadget:'http://nobunyaga.86game.com/gadget.xml',
                     container:'default',
                     bypassSpecCache:'',
                     getFullHeaders:'false',
                     oauthState:''
                     };
                 $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){
                     if(typeof callBack ==='function'){
                        callBack(result);
                     }
                 });
             },


            /**
             * 自动建造(新手)请求
             * @param callBack
             * &x=0&y=0
             */
            postToNewBuild:function(map_id,buildType,callBack){
                var reqData={
                    url:'http://nobunyaga.86game.com/build.htm',
                    httpMethod:'POST',
                    headers:'Content-Type=application%2Fx-www-form-urlencoded',
                    postData:map_id+'&facility='+buildType,
                    authz:'signed',
                    st:gameMustData.st,
                    contentType:'TEXT',
                    numEntries:3,
                    getSummaries:false,
                    signOwner:true,
                    signViewer:true,
                    gadget:'http://nobunyaga.86game.com/gadget.xml',
                    container:'default',
                    bypassSpecCache:'',
                    getFullHeaders:'false',
                    oauthState:''
                };
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){
                    if(typeof callBack ==='function'){
                        callBack(result);
                    }
                });
            },

            /**
             * 自动升级卡片请求
             * @param callBack
             * 3642296        x=2&y=1
             */

            postToCardUpdate:function(map_id,card_id,card_Attr,callBack){
                var reqData={
                    url:'http://nobunyaga.86game.com/command.htm',
                    httpMethod:'POST',
                    headers:'Content-Type=application%2Fx-www-form-urlencoded',
                    postData:'tabid=2&'+map_id+'&cardid='+card_id+'&command=train_'+card_Attr,
                    authz:'signed',
                    st:gameMustData.st,
                    contentType:'TEXT',
                    numEntries:3,
                    getSummaries:false,
                    signOwner:true,
                    signViewer:true,
                    gadget:'http://nobunyaga.86game.com/gadget.xml',
                    container:'default',
                    bypassSpecCache:'',
                    getFullHeaders:'false',
                    oauthState:''
                };
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){
                    if(typeof callBack ==='function'){
                        callBack(result);
                    }
                });
            },


            /**
             * 道场专用请求
             * @param callBack
             */
            postToPointBattle: function (callBack) {
                var reqData = 'url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_entry.htm&httpMethod=GET&headers=&postData=&authz=signed&st='+gameMustData.st+'&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(){
                    var _reqData='url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_setup.htm&httpMethod=GET&headers=&postData=&authz=signed&st='+gameMustData.st+'&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
                    $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',_reqData,function(){
                        var __reqData='url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_setup.htm&httpMethod=POST&headers=Content-Type%3Dapplication%252Fx-www-form-urlencoded&postData=action%3Dbtl&authz=signed&st='+gameMustData.st+'&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
                        $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',__reqData,function(result){
                            if(typeof callBack ==='function'){
                                callBack(result);
                            }
                        });

                    });
                });

            },




             /**
             * 改变国家
             * @param countryId
             * @param callBack
             */
            postToChangeCountry:function(countryId,callBack){
                var reqData={
                    url:'http://nobunyaga.86game.com/area_map.htm',
                    httpMethod:'POST',
                    headers:'Content-Type=application%2Fx-www-form-urlencoded',
                    postData:'action=move&target='+countryId,
                    authz:'signed',
                    st:gameMustData.st,
                    contentType:'TEXT',
                    numEntries:3,
                    getSummaries:false,
                    signOwner:true,
                    signViewer:true,
                    gadget:'http://nobunyaga.86game.com/gadget.xml',
                    container:'default',
                    bypassSpecCache:'',
                    getFullHeaders:'false',
                    oauthState:''
                };
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(result){
                    if(typeof callBack ==='function'){
                        callBack(result);
                    }
                });
            }
        }
    }


)();