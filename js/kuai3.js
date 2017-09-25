/**
 * Created by 14579 on 2017/8/30.
 *
 * 快三 js代码
 */
$(function () {
    getIssue(72,111);
    console.log(navigator)
    //运动事件监听
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',deviceMotionHandler,false);
    } else {
        alert('你的浏览器不支持摇一摇功能.');
    }

    var key = $.zui.store.get("itemKey");
    var isTobet = $.zui.store.get('tobet');
    // $chooseLottery.val(0); // 初始化下拉列表（前页回退时，默认显示任选二）

    var $title = $('.head-title>span');
    var $containerBox = $('.container-box');
    var $bettingOption = $('.betting-option');
    var $bonus = $('.bonus');//奖金
    var $profit = $('.profit');//盈利
    var $count = $('.count');//注数
    var $paymoney = $('.pay-money');//支付金额
    var $showOrHide = $('.show-or-hide');
    var $2sameNumber =  $('.ethdx>.wrapper .choose-number');//二同号单选
    var $2differentNumber =  $('.ethdx>.choose-right .choose-number');//二不同号单选

    /*
     *从上个页点击修改投注信息时，将选择的球回填到选号界面上
     * */

    if (key != undefined && isTobet == undefined) {
        var data = $.zui.store.get(key);
        var value = data.value;
        $('.head-title>span').html(data.title);
        $showOrHide.show();
        $bonus.html(data.bonus);
        $profit.html(data.profit);
        $count.html(data.betCount);
        $paymoney.html(data.payMoney);
        $bettingOption.removeClass('current-border').eq(value).addClass('current-border');
        $('.main>div').hide().eq(value).show();
        // 遍历缓存中的彩球数组，将对应的加上样式显示在界面上
        if (data.hasOwnProperty('differenceNum')) {
            loopBetBalls(data.differenceNum, $('.ethdx>.choose-right .choose-number'));
        }
        loopBetBalls(data.betArrs,$('.main>div').eq(value).find('.wrapper .choose-number'));
    }

    $('.he-zhi-choose .choose-number').on('click',function () {
       $(this).toggleClass('red-ball');
        calculationBonusBaseFun();
    })
    $('.sthdx .choose-number').on('click',function () {
        calculationBaseFun($(this),240);
    })
    $('.sthtx .choose-number').on('click',function () {
        calculationBaseFun($(this),40);
    })
    $('.slhtx .choose-number').on('click',function () {
        calculationBaseFun($(this),10);
    })
    // 三不同号
    $('.sbth .choose-number').on('click',function () {
        $(this).toggleClass('red-ball');
        var length = $('.choose-number-box .red-ball').length; // 获取当前已选择的选项
        if(length>2){
            $showOrHide.show();
            //    计算投注注数
            var count = permutationCombination(length,3);
            calculationBonus1(40,count);
        }else{
            $showOrHide.hide();
        }

    })
    // 二不同号
    $('.ebth .choose-number').on('click',function () {
        $(this).toggleClass('red-ball');
        var length = $('.choose-number-box .red-ball').length; // 获取当前已选择的选项
        if(length>1){
            $showOrHide.show();
            //    计算投注注数
            var count =permutationCombination(length,2);
            calculationBonus1(8,count);
        }else{
            $showOrHide.hide();
        }
    })
    /*二同号单选*/
    // 同号
    $2sameNumber.on('click',function () {
        twoSameNumberChoose($(this),$2differentNumber);
    })
    // 不同号
    $2differentNumber.on('click',function () {
        twoSameNumberChoose($(this),$2sameNumber);
    })
    // 二同号复选
    $('.ethfx .choose-number').on('click',function () {
        calculationBaseFun($(this),15);
    })
    /*******************************************和值 页面js ***************************************************/
    /**
     * 快速选号
     */
    // 点击 快速选号==>大
    $('.da').on('click',function () {
        $(this).toggleClass('red-ball');
        var hasClass = $(this).hasClass('red-ball');
        //判断【小】是否处于选中状态
        if($('.xiao').hasClass('red-ball')){
            $('.xiao').removeClass('red-ball');
            $('.he-zhi-choose .choose-number:lt(8)').removeClass('red-ball');
        }
        //判断【单】是否选中
        if($('.dan').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:gt(7):even').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:even').addClass('red-ball');
            }
        //    判断【双】是否选中
        }else if($('.shuang').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:gt(7):odd').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:odd').addClass('red-ball');
            }
        }else{
            //判断是否含有red-ball 类名
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:gt(7)').addClass('red-ball');
            }else{
                $('.he-zhi-choose .choose-number:gt(7)').removeClass('red-ball');
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
            }
        }
        calculationBonusBaseFun();
    })
    // 点击 快速选号==>小
    $('.xiao').on('click',function () {
        $(this).toggleClass('red-ball');
        var hasClass = $(this).hasClass('red-ball');
        if($('.da').hasClass('red-ball')){
            $('.da').removeClass('red-ball');
            $('.he-zhi-choose .choose-number:gt(7)').removeClass('red-ball');
        }
        //判断【单】是否选中
        if($('.dan').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8):even').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:even').addClass('red-ball');
            }
            //    判断【双】是否选中
        }else if($('.shuang').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8):odd').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:odd').addClass('red-ball');
            }
        }else if($('.dan').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8):even').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:even').addClass('red-ball');
            }
        }else{
            //判断是否含有red-ball 类名
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8)').addClass('red-ball');
            }else{
                // $('.he-zhi-choose .choose-number:lt(8)').removeClass('red-ball');
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
            }
        }
        calculationBonusBaseFun();
    })
    // 点击 快速选号==>单
    $('.dan').on('click',function () {
        $(this).toggleClass('red-ball');
        var hasClass = $(this).hasClass('red-ball');
        if($('.shuang').hasClass('red-ball')){
            $('.shuang').removeClass('red-ball');
            $('.he-zhi-choose .choose-number:odd').removeClass('red-ball');
        }
        // 判断是否选中【大】
        if($('.da').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:gt(7):even').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:gt(7):odd').addClass('red-ball');
            }
        }else if($('.xiao').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8):even').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:even').addClass('red-ball');
            }
        }else {
            //判断是否含有red-ball 类名
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:even').addClass('red-ball');
            }else{
                // $('.he-zhi-choose .choose-number:even').removeClass('red-ball');
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
            }
        }
        calculationBonusBaseFun();
    })
    // 点击 快速选号==>双
    $('.shuang').on('click',function () {
        $(this).toggleClass('red-ball');
        var hasClass = $(this).hasClass('red-ball');
        if($('.dan').hasClass('red-ball')){
            $('.dan').removeClass('red-ball');
            $('.he-zhi-choose .choose-number:even').removeClass('red-ball');
        }
        // 判断是否选中【大】
        if($('.da').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:gt(7):odd').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:gt(7)').addClass('red-ball');
            }
        }else if($('.xiao').hasClass('red-ball')){
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:lt(8):odd').addClass('red-ball');
            }else {
                $('.he-zhi-choose .choose-number:lt(8)').addClass('red-ball');
            }
        }else {
            //判断是否含有red-ball 类名
            if(hasClass){
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
                $('.he-zhi-choose .choose-number:odd').addClass('red-ball');
            }else{
                // $('.he-zhi-choose .choose-number:odd').removeClass('red-ball');
                $('.he-zhi-choose .choose-number').removeClass('red-ball');
            }
        }
        calculationBonusBaseFun();
    })


    /**
     * 清空选项
     */
    $('.clear-bar').on('click',function () {
        emptyChoose();
        $showOrHide.hide();
    })
    $title.on('click',function () {
        $containerBox.show();
    })
    /**
     * 顶部快三投注类型切换
     */
    $bettingOption.on('click',function () {
        var $this = $(this);
        var title = $this.children('p').html();
        $title.html(title);
        emptyChoose();
        $showOrHide.hide();
        $bettingOption.removeClass('current-border').eq($this.index()).addClass('current-border');
        $containerBox.hide();// 隐藏弹出层
        $('.main>div').hide().eq($this.index()).show(); // 根据点击的投注类型显示与隐藏对应的界面
    })
    /**
     * 点击开奖结果
     */
    var flag = false;
    $('.lottery-results').on('click',function () {
        $('.lottery-record').slideToggle();
        //更改指向箭头
        if(!flag){
            $('.lottery-results>i').removeClass('icon-caret-down').addClass('icon-caret-up')
            flag = true;
        }else{
            $('.lottery-results>i').removeClass('icon-caret-up').addClass('icon-caret-down')
            flag = false;
        }
    })
    /**
     *  移动端自定义事件声明
     */
    var $main = $('.main');
    // 定义两个值 记录触摸滑动的起始位置
    var startX,endX;
    var minMove = 3; // 定义对小滑动距离
    // 触摸事件开始
    $main.on('touchstart',function(e){
        // 起始位置
        startX = e.originalEvent.changedTouches[0].pageX;
    });
    // 触摸结束
    $main.on('touchend',function(e){
        //获取结束的横坐标
        endX = e.originalEvent.changedTouches[0].pageX;
        if (endX-startX>=minMove) {
            // 绑定自定义事件
            $main.trigger('TouchTopToBottom');
        }else if(startX-endX>=minMove){
            $('.lottery-record').slideUp();
            $('.lottery-results>i').removeClass('icon-caret-up').addClass('icon-caret-down')

        }
    });
    /**
     * 摇一摇选号
     */
    $('.shake').on('click',function () {
        emptyChoose();
        var index = $('.betting-option.current-border').index();
        switch (index){
            case 0:
                // 和值
                var money = shakeChooseOne($('.he-zhi .choose-number'),1,16);
                $bonus.html(money+'元');
                $profit.html((money-2)+'元');
                break;
            case 1:
                // 三同号单选
                randomBaseFun($('.sthdx .choose-number'),1,6,240);
                break;
            case 4:
                // 三不同号
                randomBaseFun($('.sbth .choose-number'),3,6,40);
                break;
            case 5:
                // 二不同号
                randomBaseFun($('.ebth .choose-number'),2,6,8);
                break;
            case 6:
                // 二同号单选
                var array = randomChoose.chooseOneMachine(1,6);
                $('.ethdx .wrapper .choose-number').eq(array[0]-1).addClass('red-ball');
                isRepeat();
            /**
             * 判断2次机选的号码是否重复
             */
            function isRepeat() {
                    var array2 = randomChoose.chooseOneMachine(1,6);
                    if(array[0]==array2[0]){
                        isRepeat();
                    }else {
                        $('.ethdx>.choose-right .choose-number').eq(array2[0]-1).addClass('red-ball');
                    }
                }
                $bonus.html('80元');
                $profit.html('78元');
                break;
            case 7:
                // 二同号复选
                randomBaseFun($('.ethfx .choose-number'),1,6,15);
                break;
        }
        $showOrHide.show();
        $count.html(1);
        $paymoney.html(2);
    })

    $main.on('TouchTopToBottom',function(){
        // 在手指右滑时，直接触发按钮点击。
        $('.lottery-results').trigger('click');
    });

    /**
     * 点击 提交按钮
     */
    $('.confirm').on('click',function () {
        var value = $('.betting-option.current-border').index();
        var chooseCount = $('.choose-number.red-ball').length;
        var $differenceNum = $('.ethdx> .choose-right .red-ball'); //二不同号单选
        if(chooseCount){
            var bonus = $bonus.html();
            var profit = $profit.html();
            var betCount = $count.html();
            var payMoney = $paymoney.html();
            var highestProfit = $profit.html(); //最高盈利
            var title = $('.head-title>span').html();
            var betArrs=[]; // 定义一个空数组 存储选号
            var differenceNum = []; //存储不同号

            $('.wrapper .choose-number.red-ball').each(function (index, item) {
                // 获取每个彩球数字 ，并存入数组
                betArrs.push($(item).find('.number').html());
            })
            // 有二不同号单选
            if($differenceNum.length){
                $differenceNum.each(function (index, item) {
                    // 获取每个彩球数字 ，并存入数组
                    differenceNum.push($(item).find('.number').html());
                })
            }

            if(highestProfit.indexOf('至')){
                highestProfit = highestProfit.substring(highestProfit.length-1,highestProfit.indexOf('至')+1);
            }else {
                highestProfit = highestProfit.substring(highestProfit.length-1,1);
            }

            if (key != undefined) {
                if (differenceNum.length) {
                    // 二同号单选
                    $.zui.store.set(key, {
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "title": title,
                        "betArrs": betArrs,
                        "differenceNum":differenceNum,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                } else {
                    $.zui.store.set(key, {
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "title": title,
                        "betArrs": betArrs,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                }
            } else {
                /*
                 * 将页面数据存储到本地缓存中
                 * */
                var betItemIdex = $.zui.store.get('i');
                if (betItemIdex == undefined) {
                    betItemIdex = 0;
                }
                if (differenceNum.length) {
                    // 二同号单选
                    $.zui.store.set('data' + betItemIdex, {
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "title": title,
                        "betArrs": betArrs,
                        "differenceNum":differenceNum,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                } else {
                    $.zui.store.set('data' + betItemIdex, {
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "title": title,
                        "betArrs": betArrs,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                }

                $.zui.store.set("i", ++betItemIdex);
            }
            $.zui.store.remove('itemKey');
            $.zui.store.remove('tobet');
            location.href = 'betConfirm.html';

        }else {
           alert('您还未投注')
        }

    })
    /**
     *
     * @param dom 对应的dom元素
     * @param num 生成随机数个数
     * @param ballcount 可选的总个数
     * @param bonus 奖金
     */
    function randomBaseFun(dom,num,ballcount,bonus) {
        shakeChooseOne1(dom,num,ballcount);
        $bonus.html(bonus+'元');
        $profit.html((bonus-2)+'元');
    }

    /**
     * 奖金计算 公共部分提取 【和值】
     */
    function calculationBonusBaseFun() {
        var length = $('.choose-number-box .red-ball').length; // 获取当前已选择的选项
        var arr=[];//定义空数组，存储奖金
        $('.choose-number-box .red-ball').each(function (index,item) {
            var money = item.children[1].innerHTML; //获取点击选项对应的奖金
            arr.push(parseInt(money.substr(2)));
        })
        calculationBonus(length,arr);
    }
    /**【和值页面】
     * 计算投注注数、中奖奖金，盈利，支付
     * @param length 投注的注数
     * @param arr   存储奖金的数组
     */
    function calculationBonus(length,arr) {
        if(length){
            $showOrHide.show();
        }else {
            $showOrHide.hide();
        }
        var paymoney = length*2;//支付金额
        for(var i=0;i<arr.length;i++){
            var min =arr[0];
            var max =  arr[0];
            min = min>arr[i]?arr[i]:min; //获取奖金最小值
            max = max>arr[i]?max:arr[i]; // 获取奖金最大值
        }
        //当前所选中奖金额相同时 max==min
        if(length==1 ||max==min){
            $bonus.html(min+'元');
            $profit.html(max-paymoney+'元');
        }else{
            $bonus.html(min+'至'+max+'元');
            $profit.html((min-paymoney)+'至'+(max-paymoney)+'元');
        }
        $count.html(length);
        $paymoney.html(paymoney);
    }

    /**
     * 计算投注注数、中奖奖金，盈利，支付
     * @param bonus 中奖奖金
     * @param length 投注注数
     */
    function calculationBonus1(bonus,length) {
        if(length){
            $showOrHide.show();
            $bonus.html(bonus+'元');
            $profit.html((bonus-length*2)+'元');
            $count.html(length);
            $paymoney.html(length*2);
        }else {
            $showOrHide.hide();
        }
    }
    /**
     * 计算金额公共部分抽取
     * @param $this 当前点击对象
     * @param bonus 奖金
     */
    function calculationBaseFun($this,bonus) {
        $this.toggleClass('red-ball');
        var length = $('.choose-number-box .red-ball').length; // 获取当前已选择的选项
        calculationBonus1(bonus,length);
    }


    /**
     * 计算 同二单选奖金
     * @param $this 点击的选项
     * @param isSame 传入同号或者不同号
     */
    function twoSameNumberChoose($this,isSame) {
        var index = $this.closest('.choose-number-box').index();
        var hasClass = isSame.closest('.choose-number-box').eq(index).find('.red-ball');
        if(hasClass.length){
            base();
        }else {
            $this.toggleClass('red-ball');
        }
        var sameNumLen = $('.ethdx>.wrapper .red-ball').length; //获取同号选择个数
        var differentNumLen = $('.ethdx>.choose-right .red-ball').length; //获取不同号选择个数
        var count = sameNumLen*differentNumLen; // 投注的注数
        calculationBonus1(80,count);
    }
    
    /**
     * 定时隐藏弹出框
     * */
    function hideModal() {
        setTimeout(function () {
            $('div.panel').fadeOut();
        },1500);
    }
    function base() {
        //    提示模态框
        $('div.panel').show();
        hideModal();
    }

    /**
     * 摇一摇 选号---->>>>>> 和值
     * @param $chooseNum 可选的彩球的索引集合
     * @param num
     * @param ballcount
     */
    function shakeChooseOne($chooseNumBox,num,ballcount){
        var bonus;
        var array = randomChoose.chooseOneMachine(num,ballcount);
        for(var i = 0 ; i < array.length; i++){
            $chooseNumBox.each(function (index,item) {
                // var index = $(item).closest('.choose-number-box').index(); //获取选项的索引
                if(array[i]-1==index){
                    $(item).addClass('red-ball');
                    bonus = $(item).find('p').html();
                }
            })
        }
        return bonus.substring(2);
    }

    /**
     * 摇一摇 选号
     * @param $chooseNum 可选的彩球的索引集合
     * @param num
     * @param ballcount
     */
    function shakeChooseOne1($chooseNumBox,num,ballcount){
        var array = randomChoose.chooseOneMachine(num,ballcount);
        for(var i = 0 ; i < array.length; i++){
            $chooseNumBox.each(function (index,item) {
                if(array[i]-1==index){
                    $(item).addClass('red-ball');
                }
            })
        }
        return array;
    }
})

/**清空选项*/
function emptyChoose() {
    $('.choose-number').removeClass('red-ball');
    $('.quick-choose-box>div').removeClass('red-ball');
}

/**
 * 循环回填选中彩球 公共代码抽取
 * @param arr 缓存中彩球的数组
 * @param $bets 投注界面上的彩球数组
 */

function loopBetBalls(arr, $bets) {
    for (var i = 0; i < arr.length; i++) {
        $bets.each(function (index, item) {
            if ($(item).find('.number').html()== arr[i]) {
                $(item).addClass('red-ball');
            }
        })
    }
}
/**
 *  摇一摇 监听手机摇动
 * @type {number}
 */
//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var SHAKE_THRESHOLD = 4000;
var last_update = 0;
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
    var index = $('.betting-option.current-border').index();
    if(index!=2&&index!=3){
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime-last_update)> 20) {
            var diffTime = curTime -last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                //手机震动200毫秒
                if (navigator.vibrate) {
                    navigator.vibrate(200);//震动200毫秒
                } else if (navigator.webkitVibrate) {
                    navigator.webkitVibrate(200);
                }else if(navigator.mozVibrate){
                    navigator.mozVibrate(200);
                }else if(navigator.msVibrate){
                navigator.msVibrate(200);
                }else if(navigator.oVibrate){
                    navigator.oVibrate(200);
                }
                else{
                    alert('不支持震动')
                }
                $('.shake').trigger('click');
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
}
