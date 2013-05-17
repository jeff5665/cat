var GamePlugn=(function($,U,GD,RM,Timer){
    //$ = Jquery
    //U = JUtil
    //GD = GameData
    //RM = RouteManger
    var gameConfig={};
    var GameMustData=(function(){
        var st=(location.href.match(/st=([0-9a-zA-Z]+)#rpctoken/)||[])[1];
        if(st===undefined){
           alert('初始必要信息失败');
        }
        return {
            st:st
        }
    })();
    var CatRequest={//封装请求，信猫专用
        postToBattle:function(enemy_id,callBack){//打野的请求
            var reqData={
                url:'http://nobunyaga.86game.com/battle/setup.htm',
                httpMethod:'POST',
                headers:'Content-Type=application%2Fx-www-form-urlencoded',
                postData:'enemy_id='+enemy_id+'&mc=0',
                authz:'signed',
                st:GameMustData.st,
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
        postToCountryBattle:function(callBack){
            var reqData={
                url:'http://nobunyaga.86game.com/battle/mock_setup.htm',
                httpMethod:'POST',
                headers:'Content-Type=application%2Fx-www-form-urlencoded',
                postData:'action=btl',
                authz:'signed',
                st:GameMustData.st,
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
            var reqData = 'url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_entry.htm&httpMethod=GET&headers=&postData=&authz=signed&st=7E372EFAE412413B8B91282FFC69F69560B6AE0512015E0E1F90788162A3C527621001EE2B131FEC20E39A943EBE5FFDEB992E489E75BB6F2FDA3CD3745100E3B68888592011F53D9235FED9E078CE72A5A6530918CA20E6FBCD6593BCBD9BB2198AFF3939FF452F18951FA25E7330DA6164CF373183BEC7E6D0A8EAF741701F983507063EEBDF445F9749F02C9EBB50A53B57715265AB16423675161D97EB35222EEB68383600EB0A343E0853C179AB&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
            $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',reqData,function(){
                 var _reqData='url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_setup.htm&httpMethod=GET&headers=&postData=&authz=signed&st=7E372EFAE412413B8B91282FFC69F69560B6AE0512015E0E1F90788162A3C527621001EE2B131FEC20E39A943EBE5FFDEB992E489E75BB6F2FDA3CD3745100E3B68888592011F53D9235FED9E078CE72A5A6530918CA20E6FBCD6593BCBD9BB2198AFF3939FF452F18951FA25E7330DA6164CF373183BEC7E6D0A8EAF741701F983507063EEBDF445F9749F02C9EBB50A53B57715265AB16423675161D97EB35222EEB68383600EB0A343E0853C179AB&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
                $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',_reqData,function(){
                     var __reqData='url=http%3A%2F%2Fnobunyaga.86game.com%2Fwrestle%2Fwrestle_setup.htm&httpMethod=POST&headers=Content-Type%3Dapplication%252Fx-www-form-urlencoded&postData=action%3Dbtl&authz=signed&st=7E372EFAE412413B8B91282FFC69F69560B6AE0512015E0E1F90788162A3C527621001EE2B131FEC20E39A943EBE5FFDEB992E489E75BB6F2FDA3CD3745100E3B68888592011F53D9235FED9E078CE72A5A6530918CA20E6FBCD6593BCBD9BB2198AFF3939FF452F18951FA25E7330DA6164CF373183BEC7E6D0A8EAF741701F983507063EEBDF445F9749F02C9EBB50A53B57715265AB16423675161D97EB35222EEB68383600EB0A343E0853C179AB&contentType=TEXT&numEntries=3&getSummaries=false&signOwner=true&signViewer=true&gadget=http%3A%2F%2Fnobunyaga.86game.com%2Fgadget.xml&container=default&bypassSpecCache=&getFullHeaders=false&oauthState=';
                    $.post('http://nyashindig.86game.com/shindig/gadgets/makeRequest',__reqData,function(result){
                        if(typeof callBack ==='function'){
                            callBack(result);
                        }
                    });

                });
            });

        }
    };
    var config={//
      UI:{
          btn:{//配置按钮
              autoBattle:{
                  btnName:'一键打野'
              },
              showCardMem:{
                  btnName:'显示卡片备注'
              }
          }
      },
      JEvent:{//配置事件，需要和按钮名相同
          autoBattle:{
              click:function(e){
                  oneKeyAutoFindBattle();
              }
          },
          showCardMem:{
              click:function(){
                showCardMem();
              }
          }
      }
    };
    var autoBattleType=['山贼','忍者','敌军','强盗','海贼'];

    var initUI=function(ui){//初始化UI
        var _id,_name,_uiHtml='';
        var _template_BTN='<button id="@id">@name</button>';
        for(_id in ui.btn){  //遍历按钮生成按钮HTML
            _name=ui.btn[_id].btnName;
            _uiHtml+=_template_BTN.replace('@id',_id).replace('@name',_name);
        }
        //其他ui
        _uiHtml+='<span id="JTimer"></span>';
        $('body').prepend(_uiHtml);



    };
    var initBindEvent=function(jEvent){//初始化绑事件
        var _id,_eventType;
        for(_id in jEvent){ //遍历所有需要绑事件的id
            for(_eventType in jEvent[_id]){ //给当前id对象绑定所有配置事件
                $('#'+_id).on(_eventType,jEvent[_id][_eventType]);
            }
        }
        $('body').on('noAttackTarget',function(e){
            noAttackTargetHandler(CatRequest);
        });
        Timer.addFunc(function(t){
           $('#JTimer').text(t);
        });
    };



    /**
     * 未发现战斗对象时的处理函数
     * “国战”与“打野”同时勾上时才可能会触发
     * @param config
     * @param req
     */
    var noAttackTargetHandler=function(req){
        if(gameConfig.battle.country===true&&gameConfig.battle.field===true){
            req.postToCountryBattle(function(result){
                console.log('noAttackTargetHandler finish');
            });
        }
    };



    var goPointBattle=function(){
        console.log('@goPointBattle');
        if(gameConfig.battle.point===true){
            $('#villagemap').each(function(){//在村庄时
                console.log('goPointBattle start');
                if($('#doing').find('b:contains("猫道场")').length<=0) {
                    CatRequest.postToPointBattle(function(result){
                        console.log('goPointBattle finish');
                    });
                }
            });
        }
    };

    /**
     * 只去打国战
     * 只有“国战”勾选 “打野”不勾才触发
     * @param config
     * @param req
     */
    var goCountryBattle=function(){
        console.log('@goCountry');
        if(gameConfig.battle.country===true&&gameConfig.battle.field===false){
            $('#villagemap').each(function(){//在村庄时
                console.log('goCountryBattle start');
                CatRequest.postToCountryBattle(function(result){
                    console.log('goCountryBattle finish');
                });
            });
        }
    }

    /**
     * 一键自动寻找目标打野
     */
    var oneKeyAutoFindBattle=function(){
        if(gameConfig.battle.field!==true){
            console.log('打野未勾选，因此不执行自动寻找目标打野');
            return;
        }
        var _findTarget=false;
        if($('#notify_count_main').length>0){
          console.log('部队行动中，无法执行自动寻找目标打怪');
        }else{
            $('#mainmap').find('area').each(function(){
                var _alt=$(this).attr('alt');
                if($.inArray(_alt,autoBattleType)>-1){//找到自动打野的目标
                    _findTarget=true;
                    console.log('找到自动打野的目标');
                    //var _id=$(this).parent().parent().attr('id').replace('dialog','detail');
                    var _id=$(this).parent().parent().attr('id').replace('dialog_r','');

                    //直接提交请求
                    CatRequest.postToBattle(_id,function(data){
                        //console.log(data);
                    });
                    /*
                     //模拟点击
                     $(this).parent().parent().click();
                     setTimeout(function(){
                     $('#'+_id).find('.quest-ok-button').find('img').click();
                     setTimeout(function(){
                     $('#dialog_g').click();
                     setTimeout(function(){
                     $('#btl-ok-button').click();
                     },50);
                     },1000);
                     },50);
                     */
                    return false;//退出each循环
                }
            });
            if(!_findTarget){
                  $('body').trigger('noAttackTarget');
                  console.log('未发现可攻击目标');
            }
        }

    };

    /**
     * 显示卡片备注，在“武将一览”页面
     * 依赖GameData
     */
    var showCardMem=function(){
        setTimeout(function(){ var _span,_cardNo,_card;
            var _template='<span style="position: absolute;top: @toppx;left: @leftpx;text-align: right;z-index: 9999;">@text</span>';
            $('#content').find('div.work-body').find('>div[style="background:#FFFAE2;"]').each(function(i){
                _span=$(this).find('span:contains("No.")');
                _cardNo= $.trim(_span.text()).replace('No.','');
                _card=GameData.cardInfo[_cardNo];
                $(this).after(_template.replace('@top',$(this).position().top+6).replace('@left',$(this).position().left+80).replace('@text',_card.mem+' $'+_card.marketPrice));
            });},100);

    };



    /**
     * 20130513
     * 新增根据配置判断是否执行一键打野
     * ------------------------
     * 每隔一定时间自动执行
     * @param num
     */
    var AutoRunFunc=function(num){

    };


    /**
     * 初始游戏配置，从发送消息给background
     * 接受到{JSON} data游戏配置对象后再执行callback
     * 异步执行callback
     * @param callBack
     */
    var initGameConfig=function(callback){
        chrome.runtime.sendMessage({action:'getGameConfig'},function(data){
            gameConfig=data;
            console.log('@initGameConfig',gameConfig);
            callback();
        });
    };



    var init=function(){
        RM.init();
        initGameConfig(function(){
            Timer.setCountTotalTime(gameConfig.other.autoRunInterval);
            RM.register('/village.htm',function(){
                console.log('@village');
                goCountryBattle();
                goPointBattle();
            }).register('/area_map.htm',function(){
                console.log('@area_map');
                oneKeyAutoFindBattle();
            }).register('/card/manage_card.htm',function(){
                showCardMem();
            }).register('培养武将',function(){
                showCardMem();
            }).register('出征武将',function(){
                    showCardMem();
                }).register('保管武将',function(){
                    showCardMem();
                }).register('名将谱',function(){
                    showCardMem();
                });
            Timer.addCountFunc(function(times){//自动切换页面
                if(gameConfig.other.autoChangePage){
                    $('#dmenu').find('li.topitem').eq(times%2).find('a').each(function(){//在村庄与地图页面来回切换
                        RM.changeRoute($(this).attr('href'));
                        $(this).find('img').click();
                    });
                }
            });
            initUI(config.UI);
            initBindEvent(config.JEvent);
            Timer.run();
        });

    };

    return {
        init:init
    }

})(jQuery,JUtil,GameData,RouteManger,Timer);

