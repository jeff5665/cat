var GamePlugn=(function($,U,GD,RM,Timer,CatRequest,CatCount){
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
    CatRequest.init(GameMustData);

    var config={//
        UI:{
            btn:{//配置按钮
                autoBattle:{
                    btnName:'一键打野'
                },
                showCardMem:{
                    btnName:'显示卡片备注'
                },
                jTimer:{
                    btnName:'停止倒计时'
                },
                testBtn:{
                    btnName:'测试提交'
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
            },
            jTimer:{
                click:function(){
                    if($(this).text()==='停止倒计时'){
                        Timer.stop();
                        $(this).text('启动计时器');
                    }else{
                        Timer.run();
                        $(this).text('停止倒计时');
                    }
                }
            },
            testBtn:{
                click:function(){
                    RM.changeRoute('/card/manage_card.htm',function(){
                        CatCount.request(gameConfig.other.user_id,gameConfig.other.requestURL);
                    });
                    console.log( $('#dmenu').find('a.item[href="/card/manage_card.htm"]').length);
                    $('#dmenu').find('a.item[href="/card/manage_card.htm"]').find('img').click();
                }
            }
        }
    };

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
     * @param req
     */
    var noAttackTargetHandler=function(req){
        if(gameConfig.battle.country===true&&gameConfig.battle.field===true){//“国战”与“打野”同时勾上时才可能会触发
            req.postToCountryBattle(function(result){
                console.log('noAttackTargetHandler finish');
            });
        }
        moveCountry(req);//移动国家
    };

    /**
     * 检测当前所在国家，移动到用户配置的下一个国家
     * 必须在地图页触发才有意义
     * 因为只有在未发现战斗对象时才会调用，因此必定在地图页调用
     */
    var moveCountry=function(req){
        var countryList =gameConfig.battle.goCountryList,currentIndex,currentCountry,nextCountry,nextCountryId;
        if(gameConfig.battle.goCountryList.length>0){
            $('#notify_count_title').each(function(){//只有在地图页存在
                currentCountry= $(this).find('b').text();
                currentIndex=$.inArray(currentCountry,countryList);
                nextCountry= countryList[(currentIndex+1)%countryList.length];
                nextCountryId = GameData.country[nextCountry];
                console.log('准备移动到',nextCountry,nextCountryId);

                req.postToChangeCountry(nextCountryId,function(){
                    console.log('移动请求发送成功');
                })

            });




        };
    };


    var goPointBattle=function(){
        console.log('@goPointBattle');
        if(gameConfig.battle.point===true){
            if(!hasFood()){//食物不足
                return false;
            }
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
    var oneKeyAutoFindBattle=function(callback){
        var _findTarget=false;
        if(gameConfig.battle.field!==true){
            console.log('打野未勾选，因此不执行自动寻找目标打野');
            return;
        }

        if($('#notify_count_main').length>0){
            console.log('部队行动中，无法执行自动寻找目标打怪');
        }else{
            if(!hasFood()){//食物不足
                return false;
            }


            $('#mainmap').find('area').each(function(){
                var _alt=$(this).attr('alt');
                if($.inArray(_alt,gameConfig.battle.fieldEnemyType)>-1){//找到自动打野的目标
                    _findTarget=true;
                    console.log('找到自动打野的目标');
                    //var _id=$(this).parent().parent().attr('id').replace('dialog','detail');
                    var _id=$(this).parent().parent().attr('id').replace('dialog_r','');

                    //直接提交请求
                    CatRequest.postToBattle(_id,function(data){
                        callback&&callback();
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
     * 检测食物是否最大值
     * @returns {boolean}
     */
    var hasFood=function(){
        var food=parseInt($('#element_food').text());
        if(food>gameConfig.battle.minFood){
            return true;
        }else{
            console.log('食物低于设置的最小值');
            return false;
        }
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
        chrome.runtime.sendMessage({action:'getUserConfig'},function(data){
            gameConfig=data;
            console.log('@initGameConfig',gameConfig);
            callback();
        });
    };



    var init=function(){
        RM.init();
        initGameConfig(function(){
            Timer.setCountDownTotalTime(gameConfig.other.autoRunInterval);
            RM.register('/village.htm',function(){
                console.log('@village');
                CatCount.getBuilded();
                goCountryBattle();
                goPointBattle();
            }).register('/area_map.htm',function(){
                    console.log('@area_map');
                    CatCount.initGameName();
                    oneKeyAutoFindBattle(function(){//找到敌人派出部队后去管理卡组页面获取出城部队的功勋后再提交
                        RM.changeRoute('/card/manage_card.htm',function(){
                            CatCount.request(gameConfig.other.user_id,gameConfig.other.requestURL);
                        });
                        $('#dmenu').find('a.item[href="/card/manage_card.htm"]').find('img').click();
                    });
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

})(jQuery,JUtil,GameData,RouteManger,Timer,CatRequest,CatCount);

