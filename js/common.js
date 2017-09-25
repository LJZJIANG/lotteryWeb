/**
 * Created by 14579 on 2017/8/28.
 */
/**
 * 机选号码
 *
 * randomChooseNum()
 * @num: 生成随机数的个数
 * @ballcount 彩球总个数
 * */
var $normalBets = $('.wrapper-box1>.lottery-box em');// 正常投注彩球

var randomChoose = {
    randomChooseNum:function (num,ballcount) {
        var array = generateRandomNum(num,ballcount);
        // 循环遍历随机数数组
        for(var i = 0 ; i < array.length; i++){
            $normalBets.each(function (index,item) {
                if(array[i]==parseInt(item.innerHTML))
                    $(item).addClass('red-ball');
            })
        }
    }
    //机选一注
    ,chooseOneMachine:function (num,ballcount) {
        return generateRandomNum(num,ballcount);
    }
}
    /**
     * permutationCombination() 计算排列组合数量 C(n,m)
     *
     * 参数1：count  彩球选中的个数
     * 参数2：value 任选几
     *
     * */
    function permutationCombination(count,value) {
    function func(count,value){
        if(value==0)
            return 1;
        else
            return count*func(count-1,value-1);
    }
    // c 83 = 8*7*6/ 3*2*1
    var bottomNumber = count;
    var topNumber = value;
    return func(bottomNumber,topNumber)/func(topNumber,topNumber);
}
    /**
     * 获取当前期数
     * @param lotteryId  彩种ID
     * @param token token值
     */
    function getIssue(lotteryId,token) {
        var URL = 'http://192.168.0.177:8083/data/findIssueSell?'+'lotteryId='+lotteryId+'&token='+token;
        $.get(URL,function (data) {
            if(data){
                var issue = data.data.issue;
                $('.periods').html(issue+'期');
                $.zui.store.set('issue',issue);
            }
        });
}

/**
 *
 * @param num 生成随机数的个数
 * @ballcount num 彩球个数 （11选5 总数11个，双色球总数33个）
 * @returns {Array}
 */
function generateRandomNum(num,ballcount) {
    // 定义存放生成随机数的数组
    var array=new Array();
    // 循环N次生成随机数
    for(var i = 0 ; ; i++){
        // 只生成10个随机数
        if(array.length<num){
            generateRandom(ballcount);
        }else{
            break;
        }
    }
    // 生成随机数的方法
    function generateRandom(count){
        var rand = parseInt(Math.random()*count+1);
        for(var i = 0 ; i < array.length; i++){
            if(array[i] == rand){
                return false;
            }
        }
        array.push(rand);
    }
    return array;
}

