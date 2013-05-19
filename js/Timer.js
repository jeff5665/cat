var Timer = (function () {
    var interval = 1000;//Timer内部执行间隔时间，默认1000毫秒
    var funcList = [];//内部执行函数列表
    var countDown={
        currentTime:0,
        countTotalTime:30,//倒计时时间，默认30秒
        funcList:[],  //倒计时执行列表
        times:-1, //执行次数   -1：无限执行 0：不执行 >0
        execTimes:0
    };

    var timerId;



    return {
        /**
         * 重复执行funcList中的函数
         * 倒计时启动
         */
        run: function () {
            countDown.currentTime=countDown.countTotalTime;

            timerId=setTimeout(function () {
                //先做倒计时
                if(countDown.times!==0){//需要执行倒计时
                    countDown.currentTime--;
                    if(countDown.currentTime<0){//倒计时时间到，执行倒计时函数列表
                        if(countDown.times>0){//非无限执行，需要执行次数--
                            countDown.times--;
                        }
                        countDown.execTimes++;
                        countDown.currentTime=countDown.countTotalTime-1;
                        countDown.funcList.forEach(function(func){//遍历执行
                            func(countDown.execTimes);
                        });
                    }
                }

                funcList.forEach(function(func){//遍历执行内部函数列表
                    func(countDown.currentTime);
                });
                timerId=setTimeout(arguments.callee, interval);
            }, interval);
        },
        /**
         * 停止计时
         */
        stop:function(n){
            clearTimeout(timerId);
        },
        /**
         * 增加函数执行列表
         * @param func
         */
        addFunc: function (func) {
             funcList.push(func);
        },
        /**
         * 增加倒计时执行函数
         * @param func
         */
        addCountFunc:function(func){
             countDown.funcList.push(func);
        },
        /**
         * 设置间隔执行的时间
         * @param n
         */
        setInterval:function(n){
            interval = n;
        },

        /**
         * 设置倒计时时间
         * #param time
         */
        setCountDownTotalTime:function(time){
            countDown.countTotalTime=time;
        },

        /**
         * 设置倒计时次数
         * @param n  >0执行次数 0:不执行 -1:无限
         */
        setCounter:function(n){
                 countDown.times=n;
        }

    }
})();