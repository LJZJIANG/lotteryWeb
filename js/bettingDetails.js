/**
 * Created by 14579 on 2017/9/12.
 */
$(function () {
    /**
     * 获取缓存中的数据
     */
    var lotteryId = $.zui.store.get('lotteryId');
    var issue = $.zui.store.get('issue');
    var orderId = $.zui.store.get('orderId');

    var $title = $('.title'); // 彩种名称
    var $titleInfo = $('.title-info');
    // if(lotteryId==72){
    if(lotteryId==71){
    //  十一选五
        $('.wrap-box .logo').prop('src','./images/sdsyxw@3x.png'); // 替换彩种logo
        $title.html('山东11选5');
        $titleInfo.html('第'+issue+'期');
        $('.football-lottery').hide();
        showOrderInfo();

    }else if(lotteryId==81){
    //    ……
    }


//        定义标记 ，判断是否点击分享
    var flag = true;
    var $btn = $('.footer>.btn');
    var $share_list = $('.footer>.share-list');
    $('.share').on('click',function () {
        if(flag){
            $btn.hide();
            $share_list.show();
            flag =false;
        }else{
            $btn.show();
            $share_list.hide();
            flag =true;
        }
    })

    /**
     * 投注 按钮
     */
    var $btn = $('.footer>.btn');
    /*
     1.从上个页面获取投注详情属于什么（竞彩足球、11选5等。。。）
     2.将内容设置到底部 button中
     * */
    $btn.html('11选5投注');
    var text = $btn.text(); // 获取按钮的文字
    $btn.on('click',function () {
        if(text=='竞彩足球投注'){
            location.href = 'footballLottery.html'
        }else if(text=='11选5投注'){
            location.href = '11-5choose_1.html';
        }
    })
    $('.back').on('click',function () {
        if(text=='竞彩足球投注'){
            location.href = 'footballLottery.html'
        }else if(text=='11选5投注'){
            location.href = '11-5choose_1.html';
        }
    })

    /**
     * 显示订单信息
     */
    function showOrderInfo() {
        var URL = 'http://192.168.0.177:8083/orders/findOrderInfoByLottery?orderId='+orderId+'&issue='+issue+'&lotteryCategory='+lotteryId;
        $.ajax({
            type:'get',
            url:URL,
            headers:{'token':'1111', 'Content-Type': 'application/json;charset=UTF-8'},
            success:function (result) {
                console.log(result)
                if(result.code==0){
                    var resultData = result.data;
                    $('.drawing-status').html(resultData.status); // 设置出票状态
                    $('.expect-lottery-time').html('预计'+resultData.predictLotteryTime+'开');
                    $('.units').html(resultData.units); //注数
                    $('.multiple').html(resultData.multiple); // 倍数
                    $('.amount').html(resultData.amount); // 订单金额
                    $('.betting-time').html(resultData.created); // 投注时间
                    $('.order-number').html(resultData.orderNumber); //订单编号
                    $('.lottery-number>span').html(resultData.results);// 开奖号码
                    /**
                     *  投注信息 拼接
                     * @type {string}
                     */
                    var html = '';
                    for(var i=1;i<=resultData.content.length;i++){
                        html+='<li><span class="order">'+i+'</span>'
                        html+='<span><p>';
                        var m=i;
                        var chooseNum = resultData.content[--m].betContent;
                        if(chooseNum.indexOf('|')==-1&&chooseNum.indexOf('#')==-1){
                            chooseNum = chooseNum.split(',');
                            for(var a =0;a<chooseNum.length;a++){
                                html+='<em>'+chooseNum[a]+'</em>';
                            }
                        }else {
                            if(chooseNum.indexOf('|')>-1){
                                chooseNum = chooseNum.split('|');
                                html = betInfoSplit(html,chooseNum,'|');
                            }else if(chooseNum.indexOf('#')>-1){
                                chooseNum = chooseNum.split('#');
                                html = betInfoSplit(html,chooseNum,'#');
                            }
                        }
                        html+='</p>'
                        html+="<p>"+resultData.content[m].betType+resultData.content[m].betUnits+"注"+resultData.content[m].betAmount+"元"+"</p>";
                        html+='</span></li>';
                    }
                    $('.bet-list').html(html);

                }
            }
        })
    /**
     * 投注信息 拼接
     * @param html 拼接的html代码
     * @param arr 投注彩票数组
     * @param str 分隔符
     */
        function betInfoSplit(html,arr,str) {
            for(var a =0;a<arr.length;a++){
                var chooseNumSplit = arr[a].split(',');
                for(var j=0;j<chooseNumSplit.length;j++){
                    if(a!=arr.length-1){
                        if(j!=chooseNumSplit.length-1){
                            html+='<em>'+chooseNumSplit[j]+'</em>';
                        }else{
                            html+='<em>'+chooseNumSplit[j]+'</em>'+str;
                        }
                    }else{
                        html+='<em>'+chooseNumSplit[j]+'</em>';
                    }
                }
            }
            return html;
        }
    }
})
/**
 * 思路：
 * 页面加载的时候，发起请求，后端返回彩种类型，投注详情等，根据彩种类型判断，显示对应彩种的页面布局，
 * 控制对应元素的显示与隐藏
 */