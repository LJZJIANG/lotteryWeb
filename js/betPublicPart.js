/**
 * Created by 14579 on 2017/9/9.
 *
 * 投注确认 js公共部分
 */


    var data = $.zui.store.getAll();
    var $multiple = $('.multiple'); // 底部期数
    var $propbox = $('.prop-box1');
    var $stage = $('.stage');
    var $betinfBbetcount = $('.betinfo-betcount');
    var $betinfoMoney = $('.betinfo-money');
    var $info2Paymoney = $('.info2-paymoney');
    var reg = /^\w+$/; // 数字验证
    var allBetCount = 0;



    /**当 期数的输入框点击时*/
    $multiple.on('click',function () {
        var val = $(this).val();
        $('.stop-bet').slideDown();
        $('.remaining>span').show();
        $('.info1').hide();
        $('.info2').show();
        $('.info2-stage').html(val);
        $info2Paymoney.html($stage.val()*$betinfBbetcount.html()*2*val);
    })

    /**当期数的值发生改变时*/
    $multiple.on('input propertychange',function () {
        var stage = $(this).val();
        if(reg.test(stage)){
            // 金额 = 注数*倍数*期数*2
            $info2Paymoney.html(stage*$betinfBbetcount.html()*$stage.val()*2); // 支付金额
            $('.info2-stage').html(stage);
        }else {
            alert('请输入数字')
        }

    })

    /**
     * 删除投注选项
     * */
    $('.my-choose-number').on('click','.delete',function () {
        var $this = $(this);
        var $dl = $this.closest('.choose-list'); // 获取匹配的父元素
        // 从缓存中将对应的数据删除
        var key = $this.closest('.choose-list').attr('data-value');
        $.zui.store.remove(key);
        $dl.remove();// 删除dom元素
        data = $.zui.store.getAll();
        calculationBetCount(data);
        $betinfoMoney.html($stage.val()*$betinfBbetcount.html()*2); // 投注金额
        $info2Paymoney.html($stage.val()*$betinfBbetcount.html()*2*$multiple.val()); // 投注金额
    })

    /**
     * 返回按钮 事件处理
     * */

    $('.back').on('click',function () {
        if($('header>p').html()=='投注确认'){
            $propbox.show();
            $('.prop-box1>div').hide();
            $('.clearchoose').show();
        }else{
            location.href = 'betConfirm.html'
        }

    })

    /**
     *  返回时 点击确定清空投注信息
     * */
    $('.clearchoose .prompt-info-bottom>a').on('click',function () {
        for(var m in data){
            if(!/lotteryId/.test(m))
                $.zui.store.remove(m);
        }
    })

    /** 点击清空选项 弹出框 中取消按钮*/
    $('.prompt-info .cancel').on('click',function () {
        $propbox.hide();
    })

    /**
     * 监听 倍数值的改变 propertychange
     * */
    $stage.on('input propertychange',function () {
        var stage = $(this).val();
        if(reg.test(stage)){
            $('.betinfo-times').html(stage); // 倍数
            $betinfoMoney.html(stage*$betinfBbetcount.html()*2); // 支付金额
            $info2Paymoney.html(stage*$betinfBbetcount.html()*2);
        }else {
            alert('请输入数字')
        }

    })

    /********************************************************************************************
     * 智能追号
     */
    var data = $.zui.store.getAll();
    var $prop_box1 = $('.prop-box1');

    /**
     * 计算追号支付金额
     * */
    function calculationPayMoney() {
        var sum = 0;
        $('.cumulative-input').each(function (index,item) {
            sum+=parseInt(item.innerHTML);
        })
        return sum;
    }


    /**
     * 点击弹出框1  确定按钮
     * */

    $('.prop-box1').on('click','.my-choose-number .btn',function () {
        $prop_box1.hide();
    })



    /**
     * 计算投注总注数
     *  data : 缓存中的数据
     * */
    function calculationBetCount(data) {
        for(var i in data){
            if(/data/.test(i)) {
                allBetCount +=parseInt(data[i].betCount);
            }
        }
        $betinfBbetcount.html(allBetCount);
        allBetCount = 0;
    }


