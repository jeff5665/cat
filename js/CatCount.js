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
            army:getArmy(),
            lasttime:new Date().toLocaleString(),
            user_id:user_id
        };
        console.log(reqData);
        $.post(url,reqData,function(result){
            console.log(result.msg);
        });
    }

    var gamename;

    return {
        request:request,
        initGameName:initGameName
    }
})(jQuery,SwapMyCookieMessage);