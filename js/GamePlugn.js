var GamePlugn=(function($,U){
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

        }
    }
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
    };

    var oneKeyAutoFindBattle=function(){ //一键自动寻找目标打野
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
                  console.log('未发现可攻击目标');
            }
        }

    };

    /**
     * 每隔一定时间自动执行
     * @param num
     */
    var runAuto=function(num){
        var _num=num||0;
        setTimeout(function(){
           // U.unsafeWindow.nobunyaga_ajax({type:"get",url:'/area_map.htm'});
            console.log($('#dmenu').find('li.topitem'));
            $('#dmenu').find('li.topitem').eq(_num%2).find('a').find('img').click();
            // $('#dmenu').find('li').eq(_num%2).click().find('a').click().find('img').click();
            setTimeout(function(){
                oneKeyAutoFindBattle();
            },3000);
            _num++;
            runAuto(_num);
        },30000);
    };

    var init=function(){
        initUI(config.UI);
        initBindEvent(config.JEvent);
        runAuto();
    };

    return {
        init:init
    }

})(jQuery,JUtil);

