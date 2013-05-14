var GamePlugn=(function($,U){
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
        }
    };
    var config={//
      UI:{
          btn:{//配置按钮
              autoBattle:{
                  btnName:'一键打野'
              }
          }
      },
      JEvent:{//配置事件，需要和按钮名相同
          autoBattle:{
              click:function(e){
                  oneKeyAutoFindBattle();
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
            noAttackTargetHandler(gameConfig,CatRequest);
        });
    };

    /**
     * 未发现战斗对象时的处理函数
     * “国战”与“打野”同时勾上时才可能会触发
     * @param config
     * @param req
     */
    var noAttackTargetHandler=function(config,req){
        if(config.battle.country===true&&config.battle.field===true){
            req.postToCountryBattle(function(result){
                console.log('noAttackTargetHandler finish');
            });
        }
    };

    /**
     * 只去打国战
     * 只有“国战”勾选 “打野”不勾才触发
     * @param config
     * @param req
     */
    var goCountryBattle=function(config,req){
        if(config.battle.country===true&&config.battle.field===false){
            $('#villagemap').each(function(){//在村庄时
                req.postToCountryBattle(function(result){
                    console.log('goCountryBattle finish');
                });
            });
        }
    }

    /**
     * 一键自动寻找目标打野
     */
    var oneKeyAutoFindBattle=function(config){
        if(config.battle.field!==true){
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
     * 20130513
     * 新增根据配置判断是否执行一键打野
     * ------------------------
     * 每隔一定时间自动执行
     * @param num
     */
    var runAuto=function(num){
        var _num=num||0;

        setTimeout(function(){
            if(gameConfig.autoChangePage){
                $('#dmenu').find('li.topitem').eq(_num%2).find('a').find('img').click();
            }
            setTimeout(function(){
                oneKeyAutoFindBattle(gameConfig);
                goCountryBattle(gameConfig,CatRequest);
                console.log('runAuto');
            },3000);
            _num++;
            runAuto(_num);
        },30000);
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
        initUI(config.UI);
        initBindEvent(config.JEvent);
        initGameConfig(runAuto);
    };

    return {
        init:init
    }

})(jQuery,JUtil);

