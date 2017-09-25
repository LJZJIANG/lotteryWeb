/**
 * Created by 14579 on 2017/9/14.
 *
 * 足彩 js代码
 */
$(function () {
    var $chooseLottery = $('.choose-lottery');
    $chooseLottery.val(0); // 初始化下拉列表（前页回退时，默认显示第一个）
    // var $mixedBetBox = $('.mixed-betting-box');//混合投注容器盒子
    /**
     当下拉框的值发生改变时
     触发事件
     切换相应页面的内容
     */
    $chooseLottery.on('change', function () {
        $('.main>div').hide().eq($(this).val()).show();
        $('td').removeClass('red-ball');
    });

    /**
     * 点击按钮 加上颜色
     */

    $('.main').on('click',' .mixed-betting-right td:not(.more-method)',function () {
        $(this).toggleClass('red-ball');
    })

    /**
     * 点击更多玩法
     */
    $('.mixed-betting-box').on('click','.more-method',function () {
        var index = $(this).closest('.mixed-betting').index();
        console.log('index=',index)
        // 显示弹出框
        $('.container-box').show();
        $('.container-box>div').hide().eq(0).show();
    })

    /**
     * 点击弹出面板上的投注选项
     */
    $('.table-box').on('click','.table td:not(.left-menu)',function () {
        var $this = $(this);
        // $this.toggleClass('red-ball');
        $this.toggleClass('bg-yellow');
    })

    /**
     *关闭弹出框
     */
    $('.cancel').on('click',function () {
        $('.container-box').hide();
        $('.table-box td').removeClass('bg-yellow');
    })
    /**
     * 点击弹出框确定按钮
     */
    $('.confirm').on('click',function () {
        $('.container-box').hide();
        $('.table-box td').removeClass('bg-yellow');
    })

    /**********************************************************************************
     *                                          比分投注
     */
    $('.score-box').on('click','button',function () {
        var index = $(this).closest('.mixed-betting').index();
        console.log('index=',index)
        // 显示弹出框
        showBaseFun(1);
    })

    /**********************************************************************************
     *                                          半全场投注
     */
    $('.bqc-box').on('click','button',function () {
        var index = $(this).closest('.mixed-betting').index();
        console.log('index=',index)
        // 显示弹出框
        showBaseFun(2);
    })
    /**
     * 点击筛选
     */
    var $betOptions = $('.betting-option-box>span');
    $('.screen').on('click',function () {
        $betOptions.addClass('bg-yellow');
        showBaseFun(3);
    })
    /**
     * 全选
     */
    $('.all-choose').on('click',function () {
        $betOptions.addClass('bg-yellow');
    })

    /**
     * 反选
     */
    $('.reverse-choose').on('click',function () {
        $betOptions.each(function (index,item) {
            var $item = $(item);
            if($item.hasClass('bg-yellow')){
                $item.removeClass('bg-yellow');
            }else{
                $item.addClass('bg-yellow');
            }
        })
    })
    /**
     * 五大联赛
     */
    $('.five-league').on('click',function () {
        $betOptions.removeClass('bg-yellow');
        $('.span-five-league').addClass('bg-yellow');
    })
    /**
     * 点击每个投注选项
     */
    $betOptions.on('click',function () {
        $(this).toggleClass('bg-yellow');
    })
})

/**
 * 点击显示弹出框
 * @param index  索引
 */
function showBaseFun(index) {
    $('.container-box').show();
    $('.container-box>div').hide().eq(index).show();
}