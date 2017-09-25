/**
 * Created by 14579 on 2017/8/5.
 * 投注确认
 */

$(function () {

    // 从本地缓存中获取上个页面的传值
    // var  key = $.zui.store.key(0); // 获取本地存储的第一条数据的key
    // var mydata = $.zui.store.get(key); // 获取每条数据对应的索引
    //获取彩票期数
    var lotteryId = $.zui.store.get('lotteryId');
    getIssue(lotteryId,111);
    var data = $.zui.store.getAll();
    var issue;
    // var issue = $('.periods').html(); //获取期号
    // 页面加载时，拼接HTML将投注列表显示在界面上
    showBetList(data);

    var $multiple = $('.multiple'); // 底部期数
    var $stage = $('.stage');
    var $betinfBbetcount = $('.betinfo-betcount');
    var $betinfoMoney = $('.betinfo-money');
    var $info2Paymoney = $('.info2-paymoney');
    var reg = /^\w+$/; // 数字验证
    var zhbs = 1; // 默认追号倍数


    /**
     * 修改单注彩票
     *
     * */
    $('.my-choose-number').on('click','.check-details',function () {
        var itemKey = $(this).closest('.choose-list').attr('data-value');
        $.zui.store.set('itemKey',itemKey);
        location.href = '11-5choose_1.html'
    })

    /**
     * 提交投注信息
     * */
    $('.footer .submit').on('click',function () {
        // 当有投注信息时
        if($('.choose-list').length){
            var issueStr = $('.periods').html(); //获取期号
            issue = issueStr.substring(0,issueStr.length-1);
            console.log('追号期数=',$('.info2-stage').html())
            submitBaseFun($('.info2-stage').html(),issue,'',$betinfoMoney.html());
        }
    })


    /**
     * 继续选号
     * */
    $('.to-bet').on('click',function () {
        $.zui.store.set('tobet','tobet');
        $.zui.store.remove('itemKey');
        window.location.href = '11-5choose_1.html';
    })
    /**
     * 机选一注
     * */
    $('.random-choose').on('click',function () {
        if(!$('.choose-list').length) return;
        var key = $('.choose-list')[0].getAttribute('data-value');
        var currentItemData = $.zui.store.get(key);
        var i = $.zui.store.get("i");
        var title,bonus,profit;
        var value = currentItemData.value;
        switch (value){
            case 0:
                //任二
                var array = randomBaseFun(2,11,6);
                break;
            case 1:
                var array = randomBaseFun(3,11,19);
                break;
            case 2:
                var array = randomBaseFun(4,11,78);
                break;
            case 3:
                var array = randomBaseFun(5,11,540);
                break;
            case 4:
                var array = randomBaseFun(6,11,90);
                break;
            case 5:
                var array = randomBaseFun(7,11,26);
                break;
            case 6:
                var array = randomBaseFun(8,11,9);
                break;
            case 7:
                var array = randomBaseFun(1,11,13);
                break;
            case 8:
                var array = randomBaseFun(2,11,65);
                break;
            case 9:
                var array = randomBaseFun(3,11,195);
                break;
        }
        if(value<7){
            title='普通';
        }else{
            title='组选';
        }
        console.log('title=',title,'array=',array,'text=',currentItemData.text,'bonus=',bonus,'profit=',profit,'value=',value);
        $.zui.store.set('data' + i, {
            "betCount": 1,
            "payMoney": 2,
            "SingleAndRetest": '单式',
            "title": title,
            "betArrs": array,
            "text": currentItemData.text,
            "bonus": bonus+'元',//奖金
            "profit": profit+'元',//盈利
            "value": value,
            "highestProfit":profit //最高盈利
        });
        $.zui.store.set("i",++i);
        data = $.zui.store.getAll();
        showBetList(data);
        calculationBetCount(data);
        $betinfoMoney.html($stage.val()*$betinfBbetcount.html()*2); // 投注金额
        $info2Paymoney.html($stage.val()*$betinfBbetcount.html()*2*$multiple.val()); // 投注金额
        /**
         *
         *  生成随机号码公共方法
         * @param num 随机数个数
         * @param ballcount 彩球总个数
         * @param bonus 奖金
         * @param profit 盈利
         * @returns {*}
         */
        function randomBaseFun(num,ballcount,bonus1) {
            var array = randomChoose.chooseOneMachine(num,ballcount);
            array.sort(function(a,b){return a-b}); //将随机生成的数组生序排序
            for(var j = 0;j<array.length;j++){
                if(array[j]<10){
                    array[j] = '0'+array[j];
                }else{
                }
            }
            bonus = bonus1;
            profit = bonus-2;
            return array;
        }
    })

    /**
     * 弹出面板确定按钮 点击事件
     */
    $('a.confirm').on('click',function () {
        location.href = '11-5choose_1.html';
    })
    calculationBetCount(data);
    $('.betinfo-times').html($stage.val()); // 倍数
    $betinfoMoney.html($stage.val()*$betinfBbetcount.html()*2); // 投注金额

    /********************************************************************************************
     * 智能追号
     */
    var data = $.zui.store.getAll();
    var betCount = $betinfBbetcount.html(); // 获取投注总注数
    var highestProfit = 0;
    for(var i in data){
        if(/data/.test(i)){
            highestProfit+=parseInt(data[i].highestProfit);
        }
    }
    var stageNum,stageNum1;
    var $prop_box1 = $('.prop-box1');
    var $topStage = $('.choose-agin-stage'); //顶部期数
    var $bottomStage = $('.betinfo-stage'); // 底部期数
    var $multiple = $(".choose-agin-multiple"); // 起始倍数
    var $payMoney = $('.betinfo-paymoney'); //支付金额
    var cumulativeInput; //累计投入

    /**
     * 智能追号
     */
    $('.zhuihao').on('click',function () {
        // // 将投注注数存入缓存
        // $.zui.store.set('betCount',$betinfBbetcount.html());
        $('.wrapper').hide();
        $('.footer').hide();
        $('.wrapper-title').hide();
        $('header>p').html('智能追号');
        $('.znzh-wrapper-title').show();
        $('.znzh-wrapper').show();
        $('.znzh-footer').show();
        $('.title-stage').html($('.periods').html());
        issue = $('.title-stage').html(); //获取期号
        stageNum = issue.substring(issue.length-1,issue.length-3); // 截取期号的子串
        stageNum1 = stageNum;
        cumulativeInput = $betinfoMoney.html(); //累计投入
        betCount = $betinfBbetcount.html(); // 获取投注总注数
        // 显示智能追号底部信息
        $bottomStage.html($topStage.val());
        $payMoney.html(betCount*$topStage.val()*2);
        ChaseNumberStage($topStage.val());
    })

    /**
     * 追期输入框值 发生改变时
     * */
    $topStage.on('input propertychange',function () {
        var stage = $(this).val();
        cumulativeInput = betCount* $multiple.val()*2; //累计投入
        zhbs = $('.radio-multiple').val();
        /*
        ps：
            当追号期数发生改变时
            还要修改盈利率，现在不知道盈利率计算，
            以后再修改 ！！！
        * */
        if(reg.test(stage)){
            $bottomStage.html(stage)
            $payMoney.html(betCount*$topStage.val()*2);
            ChaseNumberStage(stage);
            $('.ratio input').val($multiple.val())
            $payMoney.html(calculationPayMoney());
        }else {
            alert('请输入数字')
        }
    });

    /**
     * 起始倍数 值发生改变时
     * */
    $multiple.on('input propertychange',function () {
        var stage = $(this).val();
        if(reg.test(stage)){
            $('.ratio input').val(stage)
            // $payMoney.html(betCount*$topStage.val()*stage*2);
            $('.cumulative-input').html(betCount*stage*2);
            $payMoney.html(calculationPayMoney());
            $('.winning-profit').html(highestProfit*stage);

        }else {
            alert('请输入数字')
        }
    });
    /**
     点击 减少倍数
     * */
    $('.table>tbody').on('click','.minus',function () {
        var  $this = $(this);
        var $input = $this.siblings('input'); // 获取当前行输入框
        var value = parseInt($input.val());// 获取当前行输入框中的数据
        if (value>1){
            value--;
            $input.val(value); // 将数据渲染在输入框中
            znzhMultiple($this,value)
        }
    })

    /**
     * 定义一个变量，记录被点击的输入框的索引， 给接下来的方法中使用
     */
    var inputIndex;
    $('.table>tbody').on('click','.radio-multiple',function () {
        inputIndex = $(this).closest('tr').index();
    })

    $('.table>tbody').on('.radio-multiple input propertychange',function () {
        var $input = $('.radio-multiple').eq(inputIndex).closest('td');
        var stage = $(this).find('.radio-multiple').eq(inputIndex).val();
        if(reg.test(stage)){
            znzhMultiple($input,stage)
        }else {
            alert('请输入数字')
        }

    })
    /**
     点击 增加倍数
     * */
    $('.table>tbody').on('click','.add',function () {
        var  $this = $(this);
        var $input = $this.siblings('input'); // 获取当前行输入框
        var value = parseInt($input.val());// 获取当前行输入框中的数据
        value++;
        $input.val(value);
        znzhMultiple($this,value)
    })
    /**
     * 点击“我的选号”
     * */
    $('.xuanhao').on('click',function () {
        $prop_box1.show(); // 显示弹出框
        $('.prompt-info').hide();
        // 页面加载时，拼接HTML将投注列表显示在界面上
        showBetList(data);
        var btn = $('<p><button class="btn">确定</button></p>');
        $('.my-choose-number.panel>.choose-list:last-of-type').after(btn);
    })

    /**
     *  提交订单成功 点击确定，跳转选号首页
     */
    $('.prompt-info .confirm').on('click',function () {
        location.href = '11-5choose_1.html';
    })
    /**
     * 点击 提交按钮
     * */
    $('.znzh-footer .submit').on('click',function () {
        // 当有投注信息时
        if($('tbody>tr').length){
            issue = issue.substring(0,issue.length-1);
            var intelligentMultiple = ''; //每期追号倍数
            var $zhbs = $('table input');// 表格中的追号倍数
            $zhbs.each(function (index,item) {
                if(index==$zhbs.length-1){
                    intelligentMultiple+=item.value;
                }else{
                    intelligentMultiple+=item.value+',';
                }
            })
            submitBaseFun($('.betinfo-stage').html(),issue,intelligentMultiple,$payMoney.html());

        }
    })


    /**
     * 提交时订单时  公共部分
     * @param chaseNum  追号期数
     * @param issue  当前期号
     * @param intelligentMultiple  追加倍数
     * @param payMoney  amount
     */
    function submitBaseFun(chaseNum,issue,intelligentMultiple,amount) {
        var units =$betinfBbetcount.html(); // 注数
        var multiple = $('.betinfo-times').html();// 倍数
        var chaseStopStatus = $('.znzh-footer>p>input').is(':checked')?2:1;//追号中奖停止状态
        console.log('注数:',units,'倍数：',multiple,'订单金额：',amount,'是否停止：',chaseStopStatus,'追号期数:',chaseNum,'期号：',issue)
        var URL = 'http://192.168.0.177:8083/orders/submit11to5Order?units='+units+'&multiple='+multiple+'&amount='+amount+'&chaseStopStatus='
            +chaseStopStatus+'&chaseNum='+chaseNum+'&intelligentMultiple='+intelligentMultiple+'&issue='+issue+'&lotteryCategory='+71;
        // var URL = 'http://192.168.0.177:8083/orders/submit11to5Order?units='+units+'&multiple='+multiple+'&amount='+amount+'&chaseStopStatus='+chaseStopStatus+'&chaseNum='+chaseNum+'&intelligentMultiple='+intelligentMultiple+'&issue='+issue+'&lotteryCategory='+lotteryId;
        var data = data = $.zui.store.getAll();
        var content = [];
        for(var i in data){
            if(/data/.test(i)){
                var betCounts={};
                var betContent='';
                var value = data[i].value;
                switch (value){
                    case 0:
                        //任二
                        betCounts.betType=2;
                        break;
                    case 1:
                        betCounts.betType=5;
                        break;
                    case 2:
                        //任四
                        betCounts.betType=8;
                        break;
                    case 3:
                        betCounts.betType=9;
                        break;
                    case 4:
                        //任六
                        betCounts.betType=10;
                        break;
                    case 5:
                        betCounts.betType=11;
                        break;
                    case 6:
                        //任八
                        betCounts.betType=12;
                        break;
                    case 7:
                        //前一
                        betCounts.betType=1;
                        break;
                    case 8:
                        if(data[i].title=='直选'){
                            betCounts.betType=4;

                        }else{
                            betCounts.betType=3;
                        }
                        break;
                    case 9:
                        //前三
                        if(data[i].title=='直选'){
                            betCounts.betType=7;

                        }else{
                            betCounts.betType=6;
                        }
                        break;

                }
                if(data[i].value<7){
                    if(data[i].hasOwnProperty('dmBetArrs')){
                        betCounts.dantuoType = 1;
                        for(var j = 0;j<data[i].dmBetArrs.length;j++){
                            if(j==data[i].dmBetArrs.length-1){
                                betContent+=parseInt(data[i].dmBetArrs[j])+';';
                            }else{
                                betContent+=parseInt(data[i].dmBetArrs[j])+',';
                            }
                        }
                        connectParamFun(data[i].tmBetArrs);
                    }else {
                        betCounts.dantuoType = 0;
                        connectParamFun(data[i].betArrs);
                    }

                }else if(data[i].value>6){
                    betCounts.dantuoType = 0;
                    /**
                     * ============================前二 前三 前一   ==============================================
                     */
                    if(data[i].hasOwnProperty('dmBetArrs')){
                        connectParamFun1(data[i].dmBetArrs);
                        if(data[i].hasOwnProperty('secondBetArrs')&& data[i].secondBetArrs.length){
                            connectParamFun1(data[i].tmBetArrs);
                            connectParamFun(data[i].secondBetArrs);
                        }else{
                            connectParamFun(data[i].tmBetArrs);
                        }
                    }else{
                        connectParamFun(data[i].betArrs);
                    }

                }
                betCounts.betContent = betContent;
                content.push(betCounts);
                /**
                 * 拼接 参数
                 * @param arr 数组
                 */
                function connectParamFun(arr) {
                    for(var j = 0;j<arr.length;j++){
                        if(j==arr.length-1){
                            betContent+=parseInt(arr[j]);
                        }else{
                            betContent+=parseInt(arr[j])+',';
                        }
                    }
                }
                function connectParamFun1(arr) {
                    for(var j = 0;j<arr.length;j++){
                        if(j==arr.length-1){
                            betContent+=parseInt(arr[j])+'|';
                        }else{
                            betContent+=parseInt(arr[j])+',';
                        }
                    }
                }
            }
        }
        console.log(content)
        $.ajax({
            type:'POST',
            url:URL,
            headers:{'token':'1111', 'Content-Type': 'application/json;charset=UTF-8'},
            /* data:{
             /!*  'units':units,
             'multiple':multiple,
             'amount':amount,
             'chaseStopStatus':chaseStopStatus,
             'chaseNum':chaseNum,
             'intelligentMultiple':'1,2',//智能追号的倍数组合，用英文状态下的‘,’分隔
             'issue':issue,
             'lotteryCategory':72, //彩种类型
             'content':[{"betType":2,"dantuoType":0,"betContent":"3,4,5"},{"betType":7,"dantuoType":0,"betContent":"3|4,9,5|7,8"},{"betType":8,"dantuoType":1,"betContent":"2,10;3,5,9"}].toString()*!/
             },*/
            data:JSON.stringify(content),
            success:function (result) {
                if(result.code==0){
                    // 将订单id 存入缓存中
                    $.zui.store.set('orderId',result.data.orderId)
                    $prop_box1.show();
                    $('.prop-box1>div').hide();
                    $('.prop-box1>div:first-of-type').show();
                    // 提交彩票成功时 清除本地存储
                    for(var m in data){
                        if(!/lotteryId/.test(m)&&!/orderId/.test(m)&&!/issue/.test(m)){
                            $.zui.store.remove(m);
                        }
                    }
                }
            }
        })
    }
    /**
     * 追号期数生成
     * */
    function ChaseNumberStage(stage) {
        var html = '';
        for (var i=1;i<=stage;i++){
            html+='<tr>';
            html+='<td>'+i+'</td>';
            html+='<td>'+stageNum+'</td>';
            stageNum++;
            html+='<td class="ratio"><span><em class="minus">-</em><input type="text" value="1" class="radio-multiple"><em class="add">+</em>';
            html+='</span></td>';
            html+='<td class="cumulative-input">'+cumulativeInput+'</td>';
            html+='<td class="winning-profit">'+highestProfit*zhbs +'</td>';
            html+='<td class="profit-rate">'+(highestProfit/cumulativeInput*100).toFixed(2)+'%</td>';
        }
        $('.table>tbody').html(html);
        stageNum=stageNum1;
    }


    /**
     *  智能追号  追号倍数发生变化时
     */
    function znzhMultiple($this,value) {
        $this.closest('td').next().html(betCount* value*2);
        $payMoney.html(calculationPayMoney()); // 累计投入
        $this.closest('td').nextAll('.winning-profit').html(highestProfit*value); //中奖盈利
        $this.closest('td').nextAll('.profit-rate').html((highestProfit/cumulativeInput*100).toFixed(2)+'%'); //盈利率
    }


    ChaseNumberStage($topStage.val());
});


/**
 * 显示投注信息列表
 * @param data 缓存中的数据
 */
function showBetList(data) {
    var html = '';
    for (var i in data) {
        if (/data/.test(i)) {
            // 将该条数据的对应的缓存的key 设置到自定义属性上
            html += '<dl class="choose-list" data-value=' + i + ">";
            html += '<dt>';
            // data[i].hasOwnProperty('betArrs') 判断对象是否包含该属性
            if (data[i].hasOwnProperty('betArrs')) {
                for (var j = 0; j < data[i].betArrs.length; j++) {
                    html += '<em>' + data[i].betArrs[j] + '</em>';

                }
            } else {
                html += '(';
                for (var j = 0; j < data[i].dmBetArrs.length; j++) {
                    html += '<em>' + data[i].dmBetArrs[j] + '</em>';
                }
                html += ')';
                for (var j = 0; j < data[i].tmBetArrs.length; j++) {
                    html += '<em>' + data[i].tmBetArrs[j] + '</em>';
                }
                for (var j = 0; j < data[i].secondBetArrs.length; j++) {
                    html += '<em>' + data[i].secondBetArrs[j] + '</em>';
                }
            }


            html += '</dt>';
            html += '<dd>' + data[i].text + '-' + data[i].title + '-' + data[i].SingleAndRetest + '-' + data[i].betCount + '注' + data[i].payMoney + '元' + '</dd>';
            html += ' <i class="icon icon-times delete"></i><i class="icon icon-angle-right check-details"></i></dl>';
            $('.my-choose-number').html(html);
        }
    }
}