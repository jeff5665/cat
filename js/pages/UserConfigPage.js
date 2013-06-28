(function($,defaultConfig,JUtil){
    $(function(){
        var VERSION="0.1.5";
        var userConfig={};

        if(localStorage['UserConfig']){
            userConfig = JSON.parse(localStorage['UserConfig']);
            if(userConfig.version!==VERSION){
                userConfig = defaultConfig;
                localStorage['UserConfig'] = JSON.stringify(defaultConfig);
            }
        }else{
            userConfig = defaultConfig;
            localStorage['UserConfig'] = JSON.stringify(defaultConfig);
        }

        var saveConfig=function(){
            localStorage['UserConfig'] = JSON.stringify(userConfig);
            chrome.runtime.sendMessage({action:'reloadUserConfig'},function(msg){
                 console.log(msg);
            });
        };



        //todo 优化此处 使用递归以及检测对象类型
        for(var key_gameConfig in userConfig){//根据配置设置对应按钮状态
            var item_0=userConfig[key_gameConfig]
            if(typeof userConfig[key_gameConfig]!=='object'){
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
            userConfig.battle[$(this).attr('id')]=$(this).prop('checked');
            saveConfig();
        });

        /**
         *打野类型
         */
         $('#battle_field_type').each(function(){

             $(this).find('input').each(function(){
                 if($.inArray($(this).val(),userConfig.battle.fieldEnemyType )>-1){
                     console.log(userConfig.battle.fieldEnemyType);
                     $(this).attr('checked','checked');
                 }
                 $(this).on('change',function(){
                         var pos;
                         if($(this).prop('checked')){//checkbox 改变为选中状态
                             userConfig.battle.fieldEnemyType.push($(this).val());
                             $.unique(userConfig.battle.fieldEnemyType);//先增加当前选中元素 再删除重复项

                         }else{
                             pos=$.inArray($(this).val(),userConfig.battle.fieldEnemyType);
                             if(pos>-1){//checkbox的val值已经在数组中，从数组中删除对应元素
                                 userConfig.battle.fieldEnemyType.splice(pos,1);
                             }
                         }
                     saveConfig();

                 });
             });
         });

        /**
         * 自动移动国家顺序
         */
        $('#battle_countryList').each(function(){
            var $userlist=$('#user_countryList');
            var listText="";
            userConfig.battle.goCountryList.forEach(function(value){
                listText+=value+" ";
            });
            $userlist.text(listText);
            //bind event
            $(this).find('.clear').on('click',function(){
                $userlist.text('');
                userConfig.battle.goCountryList=[];
                saveConfig();
            });
            $(this).find('.btnList').find('button').on('click',function(){
                userConfig.battle.goCountryList.push($(this).text());

                userConfig.battle.goCountryList=JUtil.unique(userConfig.battle.goCountryList);
                listText="";
                userConfig.battle.goCountryList.forEach(function(value){
                    listText+=value+" ";
                });
                $userlist.text(listText);
                saveConfig();
            });
        });

        /**
         * 设置粮食最小值
         */
        $('#battle_minFood').each(function(){
            $(this).val(userConfig.battle.minFood)
                    .on('change',function(){
                    userConfig.battle.minFood=$(this).text();
                    saveConfig();
            });
        });


        /**
         * 自动切换页面
         */
        $('#autoChangePage').change(function(){
            userConfig.other.autoChangePage=$(this).prop('checked');
            saveConfig();
        });

        /**
         *自动切页面 间隔时间
         */
        $('#autoRunInterval').each(function(){
            $(this).val(userConfig.other.autoRunInterval)
                .change(function(){
                    userConfig.other[$(this).attr('id')]=$(this).val();
                    saveConfig();
                });
        });

        /**
         * 统计帐号信息的请求地址
         */
        $('#requestURL').each(function(){
            $(this).val(userConfig.other.requestURL)
                .change(function(){
                    userConfig.other[$(this).attr('id')]=$(this).val();
                    saveConfig();
                });
        });

        $('#user_id').each(function(){
            $(this).val(userConfig.other.user_id)
                .change(function(){
                    userConfig.other[$(this).attr('id')]=$(this).val();
                    saveConfig();
                });
        });



        /**
         * 重置
         */
        $('.resetConfig').on('click',function(){
            var key=$(this).data('key');
            userConfig[key]=defaultConfig[key];
            saveConfig();
            window.location.reload(true);
            //todo 页面刷新后还是选中当前的TAB标签
        });

    });




})(jQuery,DefaultConfig,JUtil);


