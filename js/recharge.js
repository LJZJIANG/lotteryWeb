/**
 * Created by 14579 on 2017/7/17.
 */
/*充值*/
$(function () {
    var $choose = $('.choose-money span');
    $choose.on('click',function () {
        var $this = $(this);
        $choose.removeClass('active');
        $this.addClass('active');
        var value = $this[0].innerHTML;
        // 将选中的金额设置到输入框中
        $('.recharge-money input').val(value);
    })
});

