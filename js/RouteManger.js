var RouteManger=(function(){




    var currentRoute="";
    var actionList={};
    var beforeChangePageActionList={};
    /**
     * 初始化
     * 导航栏上的按钮使用事件委托
     * 每次点击后当前route为点击对象上的href属性
     * 然后执行Action
     *
     * todo 目前执行Action的时机不对，点击后页面还没有刷新
     * 准备增加 beforeLoad,afterLoad两种状态
     */
    var init=function(){

        changeRoute('/init');
        $('#main').find('a[href="/world_list.htm"]').find('img').click();



        $('body').on('mouseup','#dmenu a',function(){
            console.log('@RouteManger',$(this).attr('href'));
            changeRoute($(this).attr('href'));
        }).on('mouseup','#work-head',function(e){
             var arr=['培养武将','出征武将','保管武将','名将谱'];
             var str=(e.target.innerText.match(/\>([^\<]+)</)||[])[1];//
                if($.inArray(str,arr)>-1){
                    changeRoute(str);
                }
        });





    };

    /**
     * 在对应route注册func
     * @param route
     * @param func
     *
     * 考虑到route中可能有空格或者,暂时不支持使用,或者空格分割，对两个route注册同一个func
     */
    var register=function(route,func,type){
        var type=this.type||'after';
        if(type==='after'){
            actionList[route]=func;
        }else{
            beforeChangePageActionList[route]=func;
        }
        return this;
    };

    /**
     * private
     * 执行Action
     *
     */
    var __execAction__=function(){
        if(typeof actionList[currentRoute]==="function"){
            actionList[currentRoute]();
        }else{
            console.log('route:',currentRoute,'   no action registered')
        }

        if(typeof  beforeChangePageActionList[currentRoute]==="function"){
            beforeChangePageActionList[currentRoute]();
        }
    };

    /**
     * 改变RouteManger的currentRoue,并在改变后执行相应的Action
     * @param route
     */
    var changeRoute=function(route,callback){
        currentRoute=route;
        console.log(currentRoute);
        $('#app_main').append('<span id="routeChecker"></span>');
        var _checkPageLoaded=function(){
            setTimeout(function(){
                if($('#routeChecker').length<1){//页面加载完
                    __execAction__();//执行相应的Action
                    callback&&callback();
                }else{//页面未加载
                    _checkPageLoaded();
                }
            },100);
        };
        _checkPageLoaded();
    };

    return {
        init:init,
        currentRoute:currentRoute,
        register:register,
        actionList:actionList,
        changeRoute:changeRoute
    }

})(jQuery);