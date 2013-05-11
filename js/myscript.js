/*var JApp=(function($){
    function init(){
        var currentRoute=getRoute();
        setTimeout(function(){
            run(currentRoute);
        },50);
    }

    function run(route){
        var configRoute={
            startPage:function(){
                console.log($('body').html());
                $('#main').find('a[href="/world_list.htm"]').click();
            },
            village:function(){

            },
            area_map:function(){

            }
        };

        try{
            configRoute[route]();
        }
        catch (e){
            console.log(e);
            alert('route错误');
        }


    }
    function getRoute(){
        var obj={
            village:$('#villagemap').length,
            area_map:$('#map').length,
            manage_deck:0,
            manage_card:0,
            refine_card:0,
            trade_buy:0,
            ranking:0,
            war_situation:0,
            wrestle_ranking:0,
            daimoyo_rank:0,
            report:0
        };
        var key;
        for(key in obj){
            if(obj[key]>0){
                return key;
            }
        }
        return 'startPage';
    }

    return {
        init:init,
        run:run,
        getRoute:getRoute
    };
})(jQuery);*/

var GamePlugn=(function($){
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
                  autoBattle();
              }
          }
      }
    };
    var autoBattleType=['山贼','忍者','敌军','强盗'];
    var init=function(){
        initUI(config.UI);
        initBindEvent(config.JEvent);
    };
    var initUI=function(ui){//初始化UI
        var _id,_name,_uiHtml='';
        var _template_BTN='<button id="@id">@name</button>';
        var _template;
        for(_id in ui.btn){  //遍历按钮生成按钮HTML
            _name=ui.btn[_id].btnName;
            _template=_template_BTN;
            _template=_template.replace('@id',_id);
            _template=_template.replace('@name',_name);
            _uiHtml+=_template;
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

    var autoBattle=function(){ //自动打野
        $('#mainmap').find('area').each(function(){
            var _alt=$(this).attr('alt');
            if($.inArray(_alt,autoBattleType)>-1){//找到自动打野的目标
                console.log('找到自动打野的目标');
                var _id=$(this).parent().parent().attr('id').replace('dialog','detail');
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

                return false;//退出each循环
            }
        });
    }

    return {
        init:init
    }

})(jQuery);
$(function(){
    // console.log(1);
    //JApp.init();
    GamePlugn.init();
});
