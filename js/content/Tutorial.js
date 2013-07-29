var Tutorial = (function ($,catRequest,RM,Timer,Account) {
    var gameMustData=(function(){
        var st=(location.href.match(/st=([0-9a-zA-Z]+)#rpctoken/)||[])[1];
        if(st===undefined){
            alert('初始必要信息失败');
        }
        return {
            st:st
        }
    })();
    var reqUrl='http://nyashindig.86game.com/shindig/gadgets/makeRequest';
    var _config={};
    var routeManger={};
    var currentStep=0;
    var currentAccount={};
    var commandFunc = {
        '##创建角色##0':function(){
            $('a[href="/license.htm"]').each(function(){//自动进入游戏
                console.log('find license');
                clickOnce($(this).find('img').click());
            });
            $('a[href="/world_list.htm"]').each(function(){//条款同意后再次访问时
                console.log('find license');
                clickOnce($(this).find('img').click());
            });


            //只点一次
            $('#license').find('input').each(function(){ //点 同意条款
                clickOnce($(this));
            });
            $('#start-button').each(function(){ //同意条款页的 继续 按钮
                clickOnce($(this));
            });

            $('#form_name').each(function(){//游戏角色名
                if(currentAccount['gameName']&&currentAccount['gameName']!==''){
                    $(this).val(currentAccount['gameName']);
                    //$('#form-form').find('#form_name')
                }
            });


            $('#form_mapid').each(function(){   //选国家
                var n=0;
                n = parseInt(Math.random()*15);
                $(this).val(n);
            });

            $('#next-button').find('img').each(function(){  //选国家页 的“继续”按钮
                console.log('选国家 找到“继续”按钮');
                clickOnce($(this));
            });
        },
        '##新手开始游戏##1': function () {
            console.log('新手开始游戏');
            $('#start-button').each(function(){
                $(this).click();
                currentStep++;
                currentAccount['step']=currentStep;

            });
        },
        '##入门##2':function(){
            var $nextBtn=$('#next-button');
            $nextBtn.each(function(){
               /* setTimeout(function(){$nextBtn.click(); },5000);
                setTimeout(function(){$nextBtn.click(); },10000);
                setTimeout(function(){$nextBtn.click(); },15000);
                setTimeout(function(){$nextBtn.click(); },20000);
                setTimeout(function(){
                    console.log('确定按钮');
                    console.log($('#neko-alert-confirm-button'));
                    $('#neko-alert-confirm-button').click().mousedown().mouseup();
                    $('#neko-alert-confirm-button').find('.neko-button').click().mousedown().mouseup();

                },25000);*/
                currentStep++;
                currentAccount['step']=currentStep;
                Account.updateAccount(currentAccount);
                    var reqData={
                        url:'http://nobunyaga.86game.com/registration/story.htm',
                        httpMethod:'POST',
                        headers:'Content-Type=application%2Fx-www-form-urlencoded',
                        postData:'main-card=5&form_name=form',
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
                    $.post(reqUrl,reqData).done(function(){
                       location.reload();
                    });

            });
            //Timer.stop();

        },
        '##点地图##3': function () {
            $('a[href="/area_map.htm"]').find('img').click();
            currentStep++;

        },
        '##点攻击贼##4': function () {

        },
        '##点出征##5': function () {
        },
        '##点武藏##6': function () {
        },
        '##领取第一次报酬##7': function () {
        },
        '##点报告书##8': function () {
        },
        '##看报告书##9': function () {
        },
        '##点武藏##10': function () {
        },
        '##领报酬##11': function () {
        },
        '##点猫签##12': function () {
        },
        '##第一次任务抽卡##13': function () {
        },
        '##点武藏##14': function () {
        },
        '##领报酬##15': function () {
        },
        '##点里##16': function () {
        },
        '##升级宫殿##17': function () {
        },
        '##点确定##18': function () {
        },
        '##点武藏##19': function () {
        },
        '##领报酬##20': function () {
        },
        '##点武将一览##21': function () {
        },
        '##点保管武将##22': function () {
        },
        '##移到培养##23': function () {
        },
        '##点武藏##24': function () {
        },
        '##领报酬##25': function () {
        },
        '##点编制##26': function () {
        },
        '##切换队员##27': function () {
        },
        '##点更新##28': function () {
        },
        '##点武藏##29': function () {
        },
        '##领取报酬##30': function () {
        },
        '##点里##31': function () {
        },
        '##第一个位置建造兵粮##32': function () {
        },
        '##点击武藏##33': function () {
        },
        '##领取报酬##34': function () {
        },
        '##点击里##35': function () {
        },
        '##第2个位置建造水田##36': function () {
        },
        '##点击武藏##37': function () {
        },
        '##领取报酬##38': function () {
        },
        '##点击里##39': function () {
        },
        '##建造宝物库##40': function () {
        },
        '##点击武藏##41': function () {
        },
        '##领取报酬##42': function () {
        },
        '##点里##43': function () {
        },
        '##建造火道场##44': function () {
        },
        '##点武藏##45': function () {
        },
        '##领报酬##46': function () {
        },
        '##点里##47': function () {
        },
        '##点出征后选岛津修炼##48': function () {
        },
        '##确认修炼##49': function () {
        },
        '##点武藏##50': function () {
        },
        '##领报酬##51': function () {
        },
        '##点里##52': function () {
        },
        '##建造奥义开发##53': function () {
        },
        '##点武藏##54': function () {
        }

    };

    function clickOnce($tar){
        if($tar.prop('onceclicked')){
            $tar.attr('onceclicked');
            $tar.click();
        }

    }


    function nextStep(){
        currentStep++;
        currentAccount['step']=currentStep;
    }

    /**
     *
     */
    function alwaysGetGameName(account){
        var gameName='';
        if(account['gameName']===''){
            setTimeout(function(){
                $('#villagename').each(function(){
                    gameName=$(this).find('a').text();
                    if(gameName!=''){
                        account['gameName']=gameName;
                    }
                });
               setTimeout(function(){alwaysGetGameName(account);},2000);
            },2000);
        }
    }




    var commandList=[];

    for(var key in commandFunc){
        commandList.push(key);
    }
    return {
        init:function(config){
            $('body').prepend('<div style="position: absolute;z-index: 9999;"><input type="text" id="testCommandTxt" value="" /><button id="testCommandBtn">执行</button></div>');
            $('#testCommandBtn').on('click',function(){
                eval($('#testCommandTxt').val());
            });
            var dtd = $.Deferred();
            _config=config;
            Account.getAccount(function(account){
                currentAccount=account;
                console.log('currentAccount',currentAccount);
                currentStep=currentAccount['step'];
                if(currentStep>commandList.length){//已经完成新手任务
                    dtd.resolve();
                }

                console.log('currentStep',currentStep);

                Timer.setCountDownTotalTime(5);
                Timer.addCountFunc(function(){
                    commandFunc[commandList[currentStep]]();
                });
                Timer.run();
            });


            return dtd.promise();
        }
    }


})(jQuery,CatRequest,RouteManger,Timer,Account);