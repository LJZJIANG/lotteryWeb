/**
 * Created by 14579 on 2017/7/31.
 * 开奖信息 子页面显示与隐藏动画
 */
$(function () {
    var $dd = $('.detail-list>dd'); // 获取每行
    var flag = false; // 默认奖池信息盒子不显示
    $dd.on('click',function () {
        var $this = $(this);
        var $icon = $this.find('.icon'); // 获取列表中右指向箭头
        var $awardDetail = $this.children('.awardDetail'); // 获取当前盒子中的奖池盒子
        if(!flag){
            $icon.removeClass('icon-angle-right').addClass('icon-angle-down'); // 更改箭头的指向
            $awardDetail.slideDown(); // 滑动显示奖池盒子
            flag = true;
        }else {
            $icon.removeClass('icon-angle-down').addClass('icon-angle-right'); // 更改箭头的指向
            $awardDetail.slideUp();
            flag = false;
        }
    })
})