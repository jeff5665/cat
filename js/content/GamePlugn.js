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
     * 自动升级建筑
     */
    var goBuildHouse=function(){
        console.log('@goHouse');
        if(gameConfig.build.buildUpdate===true){
            $('#villagemap').each(function(){//在村庄时
                resourcesHouse(function(mapid){         //callback回调获取要自动建造的地图位置id
                    if($('#doing').find('div:contains("扩建")').length<=0){   //检测列表是否存在建造中
                        console.log('可以提交自动建造');
                        CatRequest.postToBuildHouse(mapid,function(result){
                            console.log('开始建造 finish');
                        });
                    }
                    else {
                        console.log('已有建筑在造');
                    }
                });
            })
        }else{
            console.log('自动升级建筑未勾选')
        }
    }

    /**
     * 自动建造建筑(新手)
     */
    var goNewHouse=function(){
        console.log('@goNewHouse');
        if(gameConfig.build.newBuild===true){
            $('#villagemap').each(function(){//在村庄时
                newHouse(function(mapid,buildType){         //callback回调获取要自动建造的地图位置id
                    if($('#doing').find('div:contains("建造")').length<=0){   //检测列表是否存在建造中
                        console.log('可以提交自动建造(新手)');
                        console.log('1111',mapid,buildType);
                        CatRequest.postToNewBuild(mapid,buildType,function(result){
                            console.log('开始自动建造(新手) finish');
                        });
                    }
                    else {
                        console.log('已有建筑在造(新手)');
                    }
                });
            })
        }else{
            console.log('自动建筑(新手)未勾选')
        }
    }

    /**
     * 自动升级卡片
     */
    var goUpdateCard=function(){
        console.log('@goCard');
        if(gameConfig.card.cardUpdate===true&&gameConfig.card.cardName!=''&&gameConfig.card.updateAddress!=''&&gameConfig.card.minResources!=''){
            $('#villagemap').each(function(){//在村庄时
                if(!hasCardResources()){     //升级卡片资源不足
                    return false;
                }
                var card_id='';    //3642296
                var _card='';
                var _card_name='';
                var cardName=$.trim(gameConfig.card.cardName);
                var _map_id=$.trim(gameConfig.card.updateAddress);          //x=2&y=1
                var map_id=GameData.mapid[_map_id];
                var card_Attr=gameConfig.card.cardAttr;
                console.log('2222',card_Attr);
                if(map_id===undefined){
                    console.log('配置的修炼场id错误不存在');
                    return false;
                }
                $('.reserve-group').find('.reserve-group2').each(function(){
                    _card=$(this).find('img.reserve-face').attr('class').substr(12,7)
                    _card_name=$(this).find('img.reserve-face').attr('alt');
                    if(_card_name==cardName){               //岛津家喵        梅姬喵
                        card_id=_card;
                    }
                })
                if(card_id===''){
                    console.log('配置的武将不存在');
                    return false;
                }
                if($('#doing').find('div:contains("修炼")').length<=0){   //检测列表是否存在建造中
                    console.log('可以提交自动升级卡片');
                        CatRequest.postToCardUpdate(map_id,card_id,card_Attr,function(result){
                            console.log('开始升级卡片 finish');
                        });
                }
                else {
                    console.log('已有卡片在升级');
                }

            })
        }else{
            console.log('自动升级卡片未勾选或关键配置参数为空')
        }

    }

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
     * 检测升级卡片资源是否充足
     * @returns {boolean}
     */
    var hasCardResources=function(){
        var resources=CatCount.getResources();
        var _resources=gameConfig.card.minResources.split(",");
        //console.log(gameConfig.card.minResources);
        var flag=true;      //用于标示升级当前卡片资源是否足够
        resources.forEach(function(value,index){
            if(value<_resources[index]){ //当所有资源满足最小设定值时,执行       .split(",")
                flag=false;
            }
        });
        if(flag){//资源足够升级卡片
            console.log('升级卡片资源充足');
            return true;
        }else{
            console.log('升级卡片资源不足');
            return false;
        }
    }


    /**
     * 检测建造建筑资源是否足够
     */

    var resourcesHouse=function(callback){
        var resources=CatCount.getResources();
        var map_id=0;             //获取地图位置
        var _map_id=0;            //地图位置对应提交信息
        var minLV=999;            //最低建筑等级
        var targetMapId=0;        //要自动升级的建筑地图ID
        var isFind=false;        //是否找到可自动升级的内容
        var count=0;              //测试代码
        var buildTypes='';        //要自动升级的建筑类型
        if(gameConfig.build.Granary===true){           //检测配置文件
            buildTypes+='.type16,'
        }
        if(gameConfig.build.Paddy===true){
            buildTypes+='.type17,'
        }
        if(gameConfig.build.Treasury===true){
            buildTypes+='.type02,'
        }
        buildTypes=buildTypes.substr(0,buildTypes.length-1);

        $('#mapbg').find(buildTypes).each(function(){//寻找地图上粮仓,水田,宝库
        var _alt=$(this).attr('alt');
        map_id=$(this).attr('class').substr(0,5);
        _map_id=GameData.mapid[map_id];                           //转换地图位置为提交代码
            //当前建筑升级资源是否充足
            GameData.typeBuild.forEach(function(facilityObj){
                    var searchIndex=_alt.indexOf(facilityObj['typeName']);
                    var currentLV=0;           //当前建筑等级
                    if(searchIndex>=0){//找到
                        currentLV= parseInt(_alt.match(/(\d+)/)[1]);         //获取当前检测到的建筑等级

                        if(minLV>currentLV){//寻找最低等级建筑
                            minLV=currentLV;
                            targetMapId=_map_id
                        }

                        if(currentLV===9){
                            console.log("建筑都已达到LV9最高等级")
                            return false;
                        }

                        var flag=true;//用于标示建造当前建筑资源是否足够
                        resources.forEach(function(value,index){
                            if(value<GameData[facilityObj['dataKey']]['level'+(currentLV+1)][index]){
                                console.log('建造',facilityObj['typeName'],'资源不足');
                                flag=false;
                            }
                        });
                        if(flag){//资源足够建造
                            isFind=true;
                        }
                    }
            });
        });

        if(isFind){                      //找到可升级建筑,callback可建造地图位置(提交信息)
            callback(targetMapId);
            count++;                              //测试代码
            console.log(count);
            return false;
        }


    }

    /**
     * 检测建造建筑资源是否足够
     */

    var newHouse=function(callback){
        var map_id='';             //获取地图位置
        var targetMapId='';        //要自动升级的建筑地图ID
        var count=0;              //测试代码
        var buildType='';        //要自动建造的建筑类型
         var mapKey='';          //获取配置文件中的配置
        var mapValue='';
         for(mapKey in gameConfig.build.map){
            mapValue=gameConfig.build.map[mapKey];
            if(mapValue['isbuild']===true){           //检测配置文件
                map_id=($('.'+mapKey).attr('class').match(/(type\d+)/)||[])[1];      //获取地图上目前的建筑类型
                if(map_id==='type00'){          //地图上建筑为空,执行建造
                    buildType=mapValue['buildT'];               //建筑类型设置
                    targetMapId=GameData.mapid[mapKey];         //地图位置转换后的提交代码
                }
            }

        }
        if(targetMapId===''){
            console.log('自动建造都已完成');
            return false;
        }
        callback(targetMapId,buildType);
        count++;                              //测试代码
        console.log(count);
        return false;
    }


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
        RM.register('/init',function(){                         //增加自动跳过游戏开始按钮
            console.log('In init');
            $('a[href="/world_list.htm"]').each(function(){
                console.log('find world_list');
                $(this).find('img').click();
            });
        });

        RM.init();
        initGameConfig(function(){
            Timer.setCountDownTotalTime(gameConfig.other.autoRunInterval);
            RM.register('/village.htm',function(){
                console.log('@village');
                CatCount.getBuilded();
                goBuildHouse();//自动升级建筑
                goNewHouse();//自动建造(新手)
                goCountryBattle();//里战
                goPointBattle(); //道场
                goUpdateCard();//自动升级卡片
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

