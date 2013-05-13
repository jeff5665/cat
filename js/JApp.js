var JApp=(function($){
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
 })(jQuery);