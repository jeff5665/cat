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
    build: {},
    deck: {},
    trade: {},
    card: {},
    other:{
        autoChangePage:false,
        autoRunInterval:30,
        requestURL:"http://cat.macxia.com/save",
        user_id:3
    }


};  //todo 改变结构 根据这里的结构 自动生成UserConfig页面中的对应选项，一般情况不再需要额外去写JS