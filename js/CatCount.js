var CatCount=(function($,SwapMyCookieMessage){
    function getArmy(){
        var army=[];
        $('#content').find('span.card-deed').each(function(){
            army.push($(this).text());
        });
        return army;
    }

    function post(gameName,user_id){

        var req={
           name:SwapMyCookieMessage.getMessage(),
           gameName:gameName,
            money:$('#lottery_point').text(),
            food:$('#element_food').text(),
            army:getArmy(),
            account_lasttime:new Date().toLocaleString(),
            user_id:user_id
        };
        console.log(req);
    }
    return {
        post:post
    }
})(jQuery,SwapMyCookieMessage);