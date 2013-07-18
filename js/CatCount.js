var CatCount=(function($,SwapMyCookieMessage){
    /**
     * 初始化游戏中的名字
     * @returns {*}
     */
    function initGameName(){
        gamename=$('#map_player').find('.nameTxt').text();
        return gamename;
    }

    /**
     *  统计已完成的基本建筑
     */
    function getBuilded(){
        builded=[];
        $('#mapbg').find('area').each(function(){
            var _alt=$(this).attr('alt');
            ['水田','兵粮库','宝物库','公馆'].forEach(function(value,index){
                if(_alt.indexOf(value)>-1){
                    builded.push(_alt);
                }
            })
        });
        return builded.sort();
    }

    /**
     *  获取账号当前资源值
     */
    function getResources(){
        var resources=[];
        resources.push(parseInt($("#element_fire").text()));
        resources.push(parseInt($("#element_earth").text()));
        resources.push(parseInt($("#element_wind").text()));
        resources.push(parseInt($("#element_water").text()));
        resources.push(parseInt($("#element_sky").text()));
        return resources;
    }

    /**
     * 获取所有出征猫功勋
     * @returns {Array}
     */
    function getArmy(){
        var army=[];
        $('#content').find('span.card-deed').each(function(){
            army.push($(this).text().replace('功勋值：',''));
        });
        return army.toString();
    }

    /**
     * 获取所有出征猫是否可交易
     */
    function getTrade(){
        var trade=[];
        $('#content').find('div.left[style="background:#FFFAE2;"]').each(function(){
            if($(this).find('img.card-trade').length>0)
            {trade.push('F')} //F表示不可交易
            else
            {trade.push('T');} //T表示可交易
        });

        return trade.toString();
    }

    /**
     *  获取武将生命值
     */
    function getBlood(){
        var hp=[];
        $('#content').find('span.card-hp').each(function(){
            var hp1=[];
            $(this).find('img[src]').each(function(){
                var _src=$(this).attr('src');
                _src=_src.toString().substr(_src.length-5,1);
                hp1.push(_src);
            })
            hp.push(hp1.join(""));
        })
        return hp.toString();
    }

    /**
     * 提交到服务器
     * @param gameName
     * @param user_id
     */
    function request(user_id,url){

        var reqData={
            name:SwapMyCookieMessage.getMessage(),
            gamename:gamename,
            money:$('#lottery_point').text(),
            food:$('#element_food').text(),
            maxfood:$('#max_food').text(),
            army:getArmy(),
            trade:getTrade(),
            builded:builded.toString(),
            resources:getResources().toString(),
            blood:getBlood(),
            lasttime:JUtil.getTimeStr(),
            user_id:user_id
        };
        console.log(reqData);
        $.post(url,reqData,function(result){
            console.log(result.msg);
        });
    }

    var gamename='';
    var builded=[];
    return {
        request:request,
        initGameName:initGameName,
        getBuilded:getBuilded,
        getResources:getResources
    }

})(jQuery,SwapMyCookieMessage);