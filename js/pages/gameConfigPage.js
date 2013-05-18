(function($,defaultConfig,JUtil){
    $(function(){
        var VERSION="0.1.5";
        var gameConfig={};

        if(localStorage['GameConfig']){
            gameConfig = JSON.parse(localStorage['GameConfig']);
            if(gameConfig.version!==VERSION){
                gameConfig = defaultConfig;
                localStorage['GameConfig'] = JSON.stringify(defaultConfig);
            }
        }else{
            gameConfig = defaultConfig;
            localStorage['GameConfig'] = JSON.stringify(defaultConfig);
        }

        //todo 优化此处 使用递归以及检测对象类型
        for(var key_gameConfig in gameConfig){//根据配置设置对应按钮状态
            var item_0=gameConfig[key_gameConfig]
            if(typeof gameConfig[key_gameConfig]!=='object'){
                $('#'+key_gameConfig).attr('checked',item_0);
            }else{//遇到object时再次遍历
                for(var key_item0 in item_0){

                    var item_1=item_0[key_item0];
                    if(typeof item_0[key_item0]!=='object'){
                        $('#'+key_item0).attr('checked',item_1);
                    }
                }
            }
            //$('#'+key).prop()
        }



        /**
         * 国战，打野，合战，道场
         */
        $('#country,#field,#battle,#point').change(function(){
            gameConfig.battle[$(this).attr('id')]=$(this).prop('checked');
            localStorage['GameConfig'] = JSON.stringify(gameConfig);
        });

        /**
         *打野类型
         */
         $('#battle_field_type').each(function(){

             $(this).find('input').each(function(){
                 if($.inArray($(this).val(),gameConfig.battle.fieldEnemyType )>-1){
                     console.log(gameConfig.battle.fieldEnemyType);
                     $(this).attr('checked','checked');
                 }
                 $(this).on('change',function(){
                         var pos;
                         if($(this).prop('checked')){//checkbox 改变为选中状态
                             gameConfig.battle.fieldEnemyType.push($(this).val());
                             $.unique(gameConfig.battle.fieldEnemyType);//先增加当前选中元素 再删除重复项

                         }else{
                             pos=$.inArray($(this).val(),gameConfig.battle.fieldEnemyType);
                             if(pos>-1){//checkbox的val值已经在数组中，从数组中删除对应元素
                                 gameConfig.battle.fieldEnemyType.splice(pos,1);
                             }
                         }
                         localStorage['GameConfig'] = JSON.stringify(gameConfig);

                 });
             });
         });

        /**
         * 自动移动国家顺序
         */
        $('#battle_countryList').each(function(){
            var $userlist=$('#user_countryList');
            var listText="";
            gameConfig.battle.goCountryList.forEach(function(value){
                listText+=value+" ";
            });
            $userlist.text(listText);
            //bind event
            $(this).find('.clear').on('click',function(){
                $userlist.text('');
                gameConfig.battle.goCountryList=[];
                localStorage['GameConfig'] = JSON.stringify(gameConfig);
            });
            $(this).find('.btnList').find('button').on('click',function(){
                gameConfig.battle.goCountryList.push($(this).text());

                gameConfig.battle.goCountryList=JUtil.unique(gameConfig.battle.goCountryList);
                listText="";
                gameConfig.battle.goCountryList.forEach(function(value){
                    listText+=value+" ";
                });
                $userlist.text(listText);
                localStorage['GameConfig'] = JSON.stringify(gameConfig);
            });
        });

        /**
         * 自动切换页面
         */
        $('#autoChangePage').change(function(){
            gameConfig.other.autoChangePage=$(this).prop('checked');
            localStorage['GameConfig'] = JSON.stringify(gameConfig);
        });
        /**
         *自动切页面 间隔时间
         */
        if(gameConfig.other&&gameConfig.other.autoRunInterval){
            $('#autoRunInterval')
                .val(gameConfig.other.autoRunInterval)
                .change(function(){
                    gameConfig.other[$(this).attr('id')]=$(this).val();
                    localStorage['GameConfig'] = JSON.stringify(gameConfig);
                });
        }


        /**
         * 重置
         */
        $('.resetConfig').on('click',function(){
            var key=$(this).data('key');
            gameConfig[key]=defaultConfig[key];
            localStorage['GameConfig'] = JSON.stringify(gameConfig);
            window.location.reload(true);
            //todo 页面刷新后还是选中当前的TAB标签
        });

    });
})(jQuery,DefaultConfig,JUtil);


