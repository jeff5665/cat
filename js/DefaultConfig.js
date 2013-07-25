/**
 * User: jeff.zhang
 * Date: 13-5-14
 * Time: 上午8:45
 */
var DefaultConfig = {
    version:"0.1.5",
    battle: {
        country: false,
        field: false,
        battle: false,
        point:false,
        fieldEnemyType:[],
        goCountryList:[],
        minFood:300
    },
    build: {
        buildUpdate:false,
        Granary:false,
        Paddy:false,
        Treasury:false,
        newBuild:false,
        map:{
            map10:{
                buildT:'paddy',
                isbuild:false
            },
            map01:{
                buildT:'food',
                isbuild:false
            },
            map05:{
                buildT:'food',
                isbuild:false
            },
            map07:{
                buildT:'storage',
                isbuild:false
            },
            map16:{
                buildT:'sky',
                isbuild:false
            },
            map17:{
                buildT:'wind',
                isbuild:false
            },
            map18:{
                buildT:'water',
                isbuild:false
            },
            map11:{
                buildT:'storage',
                isbuild:false
            },
            map13:{
                buildT:'earth',
                isbuild:false
            },
            map02:{
                buildT:'paddy',
                isbuild:false
            }
        }

    },
    deck: {},
    trade: {},
    card: {
        cardUpdate:false,
        minResources:"600,600,600,600,600",
        cardName:"",
        cardAttr:"fire",
        updateAddress:""
    },
    other:{
        autoChangePage:false,
        autoRunInterval:30,
        requestURL:"http://cat.macxia.com/save",
        user_id:3
    }


};  //todo 改变结构 根据这里的结构 自动生成UserConfig页面中的对应选项，一般情况不再需要额外去写JS