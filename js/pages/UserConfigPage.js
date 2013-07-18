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
<<<<<<< HEAD
         * 粮仓,水田,宝库
=======
         * 自动升级,粮仓,水田,宝库
>>>>>>> 46a3db3e7f7fbb6c4b5914b3f8019f1f246e4c82
         */
        $('#buildUpdate,#Granary,#Paddy,#Treasury').change(function(){
            userConfig.build[$(this).attr('id')]=$(this).prop('checked');
            saveConfig();
        });

        /**
         * 自动建造(新手)
         */
        $('#newBuild').change(function(){
            userConfig.build[$(this).attr('id')]=$(this).prop('checked');
            saveConfig();
        });
        $('#map01,#map05,#map02,#map10,#map07,#map11,#map13,#map18,#map17,#map16').each(function(){
              if(userConfig.build['map'][$(this).attr('id')]['isbuild']){
                  $(this).attr('checked','checked');
              }
        }).change(function(){
            userConfig.build['map'][$(this).attr('id')]['isbuild']=$(this).prop('checked');
            saveConfig();
        });

        /**
         * 国战，打野，合战，道场
         */
        $('#country,#field,#battle,#point').change(function(){
            userConfig.battle[$(this).attr('id')]=$(this).prop('checked');
            saveConfig();
        });

        /**
         * 卡片升级
         */
        $('#cardUpdate').change(function(){
            userConfig.card[$(this).attr('id')]=$(this).prop('checked');
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
                    userConfig.battle.minFood=$(this).val();
                    saveConfig();
            });
        });

        /**
         * 设定卡片升级资源最小值
         */
        $('#card_minResources').each(function(){
            $(this).val(userConfig.card.minResources)
                    .on('change',function(){
                    userConfig.card.minResources=$(this).val();
                    saveConfig();
                });
        });

        /**
         * 设定要升级的卡片名字
         */
        $('#card_cardName').each(function(){
            $(this).val(userConfig.card.cardName)
                .on('change',function(){
                    userConfig.card.cardName=$(this).val();
                    saveConfig();
                });
        });

        /**
         * 设定要升级的卡片属性
         */

        $('input[name="card_cardAttr"]').each(function(){
            var cardAttr=$(this).attr('value');
            if(cardAttr===userConfig.card.cardAttr){
                $(this).attr('checked','checked');
            }
            $(this).on('click',function(){
                    userConfig.card.cardAttr=$(this).val();
                    saveConfig();
                console.log(cardAttr);
                    if(cardAttr===userConfig.card.cardAttr){
                        $(this).on('click','click')
                    }
                })
        });




        /**
         * 设定要升级的卡片对应修炼场地址
         */
        $('#card_updateAddress').each(function(){
            $(this).val(userConfig.card.updateAddress)
                .on('change',function(){
                    userConfig.card.updateAddress=$(this).val();
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


