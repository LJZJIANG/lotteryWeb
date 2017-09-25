/**
 * Created by 14579 on 2017/8/3.
 * 十一选五
 */
$(function () {
    var lotteryId = $.zui.store.get('lotteryId');
    getIssue(lotteryId,111);
    var key = $.zui.store.get("itemKey");
    var isTobet = $.zui.store.get('tobet');
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',deviceMotionHandler,false);
    } else {
        alert('你的浏览器不支持摇一摇功能.');
    }
    var $chooseLottery = $('.choose-lottery');
    $chooseLottery.val(0); // 初始化下拉列表（前页回退时，默认显示任选二）
    var $chooseInfo = $('.wrapper-box2>p>em');
    var $lotteryType1 = $('.bet-type>.bet-type-1>span');
    var $lotteryType2 = $('.bet-type>.bet-type-2>span');
    var $wrapperBox = $('.wrapper');
    var $normalBets = $('.wrapper-box1>.lottery-box em');// 正常投注彩球
    var $DM_balls = $('.wrapper-box2>.lottery-box-1 em'); // 胆码
    var $TM_balls = $('.wrapper-box2>.lottery-box-2 em'); // 拖码
    var $secondBalls = $('.wrapper-box2>.lottery-box-3 em'); // 第三位数
    var $line1_em_box = $('.wrapper-box2>.lottery-box-1>div');
    var $line2_em_box = $('.wrapper-box2>.lottery-box-2>div');
    var $line3_em_box = $('.wrapper-box2>.lottery-box-3>div'); // 第三位数
    var $panlModal = $('div.panel');//获取模态框
    var $show_or_hide = $('.show-or-hide');
    // 获取奖金提示的jQuery 对象
    var $bonusPrompt = $('.main>.title>.pull-left');

    var $bonus = $('.bonus'); // 奖金
    var $profit = $('.profit'); // 盈利
    var $count = $('.footer .count'); // 注数
    var $pay_money = $('.pay-money'); // 支付金额

    /**
     * 普通投注点击时
     * */
    $normalBets.on('click', function () {
        var RX_value = parseInt($chooseLottery.val());
        $(this).toggleClass('red-ball');//加上或者去掉样式
        var choose_len = $('.wrapper-box1>.lottery-box').find('.red-ball').length;
        switch (RX_value) {
            case 0:
                //任选二
                _11choose5Base(choose_len, RX_value + 2, 6, 60, 2, 8);
                break;
            case 1:
                // 任选三
                _11choose5Base(choose_len, RX_value + 2, 19, 190, 3, 9);
                break;
            case 2:
                //  任四
                _11choose5Base(choose_len, RX_value + 2, 78, 390, 4, 11);
                break;
            case 3:
                // 任五
                _11choose5Base(choose_len, RX_value + 2, 540, 540, 5, 12);
                break;
            case 4:
                // 任六
                _11choose5Base(choose_len, RX_value + 2, 90, 540, 6, 13);
                break;
            case 5:
                // 任七
                _11choose5Base(choose_len, RX_value + 2, 26, 390, 7, 13);
                break;
            case 6:
                // 任八
                _11choose5Base(choose_len, RX_value + 2, 9, 180, 8, 13);
                break;
            case 7:
                // 前一
                _11choose5Base(choose_len, 1, 13, 13, 1, 12);
                break;
            case 8:
                // 前二
                _11choose5Base(choose_len, 2, 65, 65, 2, 12);
                break;
            case 9:
                // 前三
                _11choose5Base(choose_len, 3, 195, 195, 3, 12);
                break;
        }
    })

    /**
     * 胆码投注点击时
     *
     */
    $DM_balls.on('click', function () {
        var $this = $(this);
        var parentIndex = $this.closest('div').index();
        var $TuoMa = $line2_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        var $second = $line3_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        var value = parseInt($chooseLottery.val()) + 2; // 获取下拉列表当前值
        $this.toggleClass('red-ball');//加上或者去掉样式
        var commonBallLength = $TuoMa.length + $second.length; // 获取拖码和第三位数中对应的彩球是否选择
        if (commonBallLength) {
            $TuoMa.removeClass('red-ball');
            $second.removeClass('red-ball');
        }
        var tm_length = $('.wrapper-box2 .lottery-box-2 em.red-ball').length;
        var dm_length = $('.wrapper-box2 .lottery-box-1 em.red-ball').length;
        var second_length = $('.wrapper-box2 .lottery-box-3 em.red-ball').length;

        var redBallLen = $('.wrapper-box2>.lottery-box-1 .red-ball').length;
        // 判断胆拖选择数量，超出数量给予提示
        switch (value - 2) {
            case 0:
                //任二
                if (redBallLen > 1) {
                    judgeDTcount($this, '任二最多只能选1个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 6, 24, 7);
                break;
            case 1:
                //任三
                if (redBallLen > 2) {
                    judgeDTcount($this, '任三最多只能选2个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 19, 114, 14);
                break;
            case 2:
                //任四
                if (redBallLen > 3) {
                    judgeDTcount($this, '任四最多只能选3个胆码');
                    // baseFun(dm_length,value,tm_length,78,312,14);
                    return;
                }
                baseFun(dm_length, value, tm_length, 78, 312, 14);
                break;
            case 3:
                //任五
                if (redBallLen > 4) {
                    judgeDTcount($this, '任五最多只能选4个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 540, 540, 12);
                break;
            case 4:
                //任六
                if (redBallLen > 5) {
                    judgeDTcount($this, '任六最多只能选5个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 90, 540, 15);
                break;
            case 5:
                //任七
                if (redBallLen > 6) {
                    judgeDTcount($this, '任七最多只能选6个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 26, 390, 15);
                break;
            case 6:
                //任八
                if (redBallLen > 7) {
                    judgeDTcount($this, '任八最多只能选7个胆码');
                    return;
                }
                baseFun(dm_length, value, tm_length, 9, 180, 15);
                break;
            case 8:
                //前二
                _11choose5RXBase(value, 130, dm_length, tm_length, second_length)
                break;
            case 9:
                //前三
                _11choose5RXBase(value, 1170, dm_length, tm_length, second_length)
                break;
        }

    })
    /**
     * 拖码投注点击时
     * */
    $TM_balls.on('click', function () {
        var $this = $(this);
        $this.toggleClass('red-ball');//加上或者去掉样式
        var value = parseInt($chooseLottery.val()) + 2; // 获取下拉列表当前值
        var parentIndex = $this.closest('div').index();
        var $DanMa = $line1_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        var $second = $line3_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        $this.toggleClass('red-ball');//加上或者去掉样式
        var commonBallLength = $DanMa.length + $second.length; // 获取拖码和第三位数中对应的彩球是否选择
        if (commonBallLength) {
            $DanMa.removeClass('red-ball');
            $second.removeClass('red-ball');
            $this.addClass('red-ball');
        } else {
            $this.toggleClass('red-ball');
        }
        var dm_length = $('.wrapper-box2 .lottery-box-1 em.red-ball').length;
        var tm_length = $('.wrapper-box2 .lottery-box-2 em.red-ball').length;
        var second_length = $('.wrapper-box2 .lottery-box-3 em.red-ball').length;
        switch (value - 2) {
            case 0:
                //任二
                baseFun(dm_length, value, tm_length, 6, 24, 7);
                break;
            case 1:
                //任三
                baseFun(dm_length, value, tm_length, 19, 114, 14);
                break;
            case 2:
                //任四
                baseFun(dm_length, value, tm_length, 78, 312, 14);
                break;
            case 3:
                //任五
                baseFun(dm_length, value, tm_length, 540, 540, 12);
                break;
            case 4:
                //任六
                baseFun(dm_length, value, tm_length, 90, 540, 15);
                break;
            case 5:
                //任七
                baseFun(dm_length, value, tm_length, 26, 390, 15);
                break;
            case 6:
                //任八
                baseFun(dm_length, value, tm_length, 9, 180, 15);
                break;
            case 8:
                //前二
                _11choose5RXBase(value, 130, dm_length, tm_length, second_length)
                break;
            case 9:
                //前三
                _11choose5RXBase(value, 1170, dm_length, tm_length, second_length)
                break;
        }

    })
    /**
     * 前三 第三位投注点击时
     * */
    $secondBalls.on('click', function () {
        var $this = $(this);
        $this.toggleClass('red-ball');//加上或者去掉样式
        var value = parseInt($chooseLottery.val()) + 2; // 获取下拉列表当前值
        var parentIndex = $this.closest('div').index();
        var $DanMa = $line1_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        var $TuoMa = $line2_em_box.eq(parentIndex).find('.red-ball'); // 找到索引匹配的em
        $this.toggleClass('red-ball');//加上或者去掉样式
        var commonBallLength = $DanMa.length + $TuoMa.length; // 获取拖码和第三位数中对应的彩球是否选择
        if (commonBallLength) {
            $DanMa.removeClass('red-ball');
            $TuoMa.removeClass('red-ball');
            $this.addClass('red-ball');
        } else {
            $this.toggleClass('red-ball');
        }
        var dm_length = $('.wrapper-box2 .lottery-box-1 em.red-ball').length;
        var tm_length = $('.wrapper-box2 .lottery-box-2 em.red-ball').length;
        var second_length = $('.wrapper-box2 .lottery-box-3 em.red-ball').length;
        switch (value - 2) {
            case 8:
                //前二
                _11choose5RXBase(value, 130, dm_length, tm_length, second_length)
                break;
            case 9:
                //前三
                _11choose5RXBase(value, 1170, dm_length, tm_length, second_length)
                break;
        }
    })
    /**
     当下拉框的值发生改变时
     触发事件
     切换相应页面的内容
     */
    $chooseLottery.on('change', function () {
        // 当下拉框值发生改变时，设置默认选项为第一个
        $lotteryType1.removeClass('bg-red').eq(0).addClass('bg-red');
        $lotteryType2.removeClass('bg-red').eq(0).addClass('bg-red');
        $('.wrapper .lottery-box em').removeClass('red-ball'); // 切换任选界面时，清除选项
        $wrapperBox.hide().eq(0).show();
        $show_or_hide.hide(); //切换下拉框时  隐藏底部中奖金额信息
        // 获取被点击option的值
        var value = parseInt($(this).val());
        switch (value) {
            //  任选三
            case 1:
                lotteryInfo('猜中开奖的任意3个号码，奖金19元', '可选1-2个');
                emptyChoose();
                break;
            //    任选四
            case 2:
                lotteryInfo('猜中开奖的任意4个号码，奖金78元', '可选1-3个');
                emptyChoose();
                break;
            // 任选五
            case 3:
                lotteryInfo('猜中开奖的任意5个号码，奖金540元', '可选1-4个');
                emptyChoose();
                break;
            //    任选六
            case 4:
                lotteryInfo('至少选6个，猜中开奖的5个号，奖金90元', '可选1-5个');
                emptyChoose();
                break;
            //    任选七
            case 5:
                lotteryInfo('至少选7个，猜中开奖的5个号，奖金26元', '可选1-6个');
                emptyChoose();
                break;
            //    任选八
            case 6:
                lotteryInfo('至少选8个，猜中开奖的5个号，奖金9元', '可选1-7个');
                emptyChoose();
                break;
            //   前一
            case 7:
                $('.bet-type').css('display', 'none');
                $('.wrapper-box1').show()
                $('.wrapper-box2').hide();
                $bonusPrompt.text('猜中开奖的第1个号码，奖金13元');
                emptyChoose();
                break;
            //    前二
            case 8:
                changeBetTypeQ();
                $bonusPrompt.text('猜中开奖的前2个号码，奖金65元');
                emptyChoose();
                break;
            //    前三
            case 9:
                changeBetTypeQ();
                $('.wrapper-box2>span').show();
                $('.lottery-box-3').show();
                $bonusPrompt.text('猜中开奖的前3个号码，奖金195元');
                emptyChoose();
                break;
            //    默认任选二
            default:
                lotteryInfo('猜中开奖的任意2个号码，奖金6元', '可选1个');
                emptyChoose();
                break;
        }
    })

    // 点击投注类型 切换内容
    $lotteryType1.on('click', function () {
        emptyChoose();
        var $this = $(this);
        var index = $this.index();
        if(index){
            $('.shake').hide();
        }else {
            $('.shake').show();
        }
        $lotteryType1.removeClass('bg-red').eq(index).addClass('bg-red');
        $wrapperBox.hide().eq(index).show();
        $show_or_hide.hide(); //切换下拉框时  隐藏底部中奖金额信息
    })
    $lotteryType2.on('click', function () {
        emptyChoose();
        var $this = $(this);
        var index = $this.index();
        if(index){
            $('.shake').hide();
        }else {
            $('.shake').show();
        }
        $lotteryType2.removeClass('bg-red').eq(index).addClass('bg-red');
        $wrapperBox.hide().eq(index).show();
        $show_or_hide.hide(); //切换下拉框时  隐藏底部中奖金额信息
    })

    /**
     点击清空选项
     * */
    $('.clear-bar').on('click', function () {
        emptyChoose();
        $show_or_hide.hide();
    })


    /**
     * 点击 确定
     1.获取选择的彩球
     2.将选择的内容存到本地存储中，传到下一个页面
     * */

    $('.confirm').on('click', function () {
        var value = parseInt($chooseLottery.val()); // 获取当前下拉框的值
        var $dm = $('.wrapper-box2>.lottery-box-1 em.red-ball');
        var $tm = $('.wrapper-box2>.lottery-box-2 em.red-ball');
        var $second = $('.wrapper-box2>.lottery-box-3 em.red-ball');
        var $normal = $('.wrapper-box1>.lottery-box em.red-ball');// 正常投注彩球
        var normalBetsLen = $('.wrapper-box1>.lottery-box em.red-ball').length;
        var dm_len = $dm.length;// 获取胆码选中的个数
        var tm_len = $tm.length;// 获取拖码选中的个数
        var dt_allLen = dm_len + tm_len;
        //   获取选项卡非隐藏的元素的文字内容
        var title = $('.bet-type>div>span.bg-red').not('.bet-type>div>span.bg-red:hidden').text();
        title = title.substring(0, 2); // 截取字符串前两个字符
        var len = $('.lottery-box em.red-ball').length;
        // 只有当前是胆拖和组选时 ，执行以下代码
        if (title == '胆拖') {
            if (dm_len) {
                switch (value) {
                    case 0:
                        //任选二 胆码只能选一个，拖码中不能选胆码已选的数字
                        if (!tm_len) {
                            $panlModal.text('请至少选择一个拖码');
                            base();
                            return;
                        }
                        break;
                    case 1:
                        // 任选三
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 3) {
                            $panlModal.text('任选三胆码加拖码至少要选3个');
                            base();
                            return;
                        }
                        break;
                    case 2:
                        // 任选四
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 4) {
                            $panlModal.text('任选四胆码加拖码至少要选4个');
                            base();
                            return;
                        }
                        break;
                    case 3:
                        // 任选五
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 5) {
                            $panlModal.text('任选五胆码加拖码至少要选5个');
                            base();
                            return;
                        }
                        break;
                    case 4:
                        // 任选6
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 6) {
                            $panlModal.text('任选六胆码加拖码至少要选6个');
                            base();
                            return;
                        }
                        break;
                    case 5:
                        // 任选7
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 7) {
                            $panlModal.text('任选七胆码加拖码至少要选7个');
                            base();
                            return;
                        }
                        break;
                    case 6:
                        // 任选8
                        if (!tm_len) {
                            base1();
                            return;
                        } else if (dt_allLen < 8) {
                            $panlModal.text('任选八胆码加拖码至少要选8个');
                            base();
                            return;
                        }
                        break;
                }
            } else {
                $panlModal.text('请选择一个胆码');
                //    提示模态框
                $panlModal.show();
                hideModal();
                return; // 直接返回，不执行后续代码
            }

        } else if (title == '直选') {
            switch (value) {
                case 8:
                    if (!dm_len) {
                        //    提示模态框
                        $panlModal.show();
                        $panlModal.text('请选择第一位数');
                        hideModal();
                        return; // 直接返回，不执行后续代码
                    } else if (!tm_len) {
                        $panlModal.text('请选择第二位数');
                        base();
                        return;
                    }
                    break;
                case 9:
                    var $dsw = $('.wrapper-box2>.lottery-box-3 em.red-ball');
                    if (!dm_len) {
                        //    提示模态框
                        $panlModal.show();
                        $panlModal.text('请选择第一位数');
                        hideModal();
                        return; // 直接返回，不执行后续代码
                    } else if (!tm_len) {
                        $panlModal.text('请选择第二位数');
                        base();
                        return;
                    } else if (!$dsw.length) {
                        $panlModal.text('请选择第三位数');
                        base();
                        return;
                    }
                    break;
            }

        } else if (title == '普通') {
            switch (value) {
                case 0:
                    if (normalBetsLen < 2) {
                        $panlModal.text('请至少选2个号码');
                        base();
                        return;
                    }
                    break;
                case 1:
                    // 任选三
                    if (normalBetsLen < 3) {
                        $panlModal.text('请至少选3个号码');
                        base();
                        return;
                    }
                    break;
                case 2:
                    // 任选四
                    if (normalBetsLen < 4) {
                        $panlModal.text('请至少选4个号码');
                        base();
                        return;
                    }
                    break;
                case 3:
                    // 任选五
                    if (normalBetsLen < 5) {
                        $panlModal.text('请至少选5个号码');
                        base();
                        return;
                    }
                    break;
                case 4:
                    // 任选6
                    if (normalBetsLen < 6) {
                        $panlModal.text('请至少选6个号码');
                        base();
                        return;
                    }
                    break;
                case 5:
                    // 任选7
                    if (normalBetsLen < 7) {
                        $panlModal.text('请至少选7个号码');
                        base();
                        return;
                    }
                    break;
                case 6:
                    // 任选8
                    if (normalBetsLen < 8) {
                        $panlModal.text('请至少选8个号码');
                        base();
                        return;
                    }
                    break;
            }

        } else {
            switch (value) {
                case 7:
                    // 前一
                    if (normalBetsLen < 1) {
                        $panlModal.text('请至少选1个号码');
                        base();
                        return;
                    }
                    break;
                case 8:
                    // 前二
                    if (normalBetsLen < 2) {
                        $panlModal.text('请至少选2个号码');
                        base();
                        return;
                    }
                    break;
                case 9:
                    // 前三
                    if (normalBetsLen < 3) {
                        $panlModal.text('请至少选3个号码');
                        base();
                        return;
                    }
                    break;
            }
        }
        if (len) {
            var betArrs = []; // 定义一个空数组，存放选号
            var dmBetArrs = []; // 定义空数组存放胆码
            var tmBetArrs = [];
            var secondBetArrs = [];
            $normal.each(function (index, item) {
                // 获取每个彩球数字 ，并存入数组
                betArrs.push(item.innerHTML);
            })
            /*
             如果选择拖码和胆码的长度大于0，则将所选择的数组存入
             * */
            if ($dm.length && $dm.length) {
                $dm.each(function (index, item) {
                    dmBetArrs.push(item.innerHTML)
                })
                $tm.each(function (index, item) {
                    tmBetArrs.push(item.innerHTML)
                })
                $second.each(function (index, item) {
                    secondBetArrs.push(item.innerHTML)
                })
            }

            // 获取当前任选几文字
            var text = $('option[value=' + value + ']').text();
            // 获取 投注总注数 和 支付金额

            var bonus = $bonus.html();
            var profit = $profit.html();
            var betCount = $count.html();
            var payMoney = $pay_money.html();
            var SingleAndRetest;//单式或者复式
            var highestProfit = $profit.html(); //最高盈利
            if(highestProfit.indexOf('至')){
                highestProfit = highestProfit.substring(highestProfit.length-1,highestProfit.indexOf('至')+1);
            }else {
                highestProfit = highestProfit.substring(highestProfit.length-1,1);
            }
            if (parseInt(betCount) > 1) {
                SingleAndRetest = '复式';
            } else {
                SingleAndRetest = '单式';
            }
            /*
             判断缓存汇总对应数据的key是否存在，如果存在，就修改投注信息，如果不存在，就添加信息
             * */
            if (key != undefined) {
                if (betArrs.length) {
                    // 普通投注
                    $.zui.store.set(key, {
                        // "periods": periods,
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "SingleAndRetest": SingleAndRetest,
                        "title": title,
                        "betArrs": betArrs,
                        "text": text,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                }
                else {
                    //  胆拖投注
                    $.zui.store.set(key, {
                        // "periods": periods,
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "SingleAndRetest": SingleAndRetest,
                        "title": title,
                        "dmBetArrs": dmBetArrs,
                        "tmBetArrs": tmBetArrs,
                        "secondBetArrs": secondBetArrs,
                        "text": text,
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
                // console.log(betItemIdex)
                if (betItemIdex == undefined) {
                    betItemIdex = 0;
                }
                if (betArrs.length) {
                    // 普通投注
                    $.zui.store.set('data' + betItemIdex, {
                        // "periods": periods,
                        "betCount": betCount,
                        "payMoney": payMoney,
                        "SingleAndRetest": SingleAndRetest,
                        "title": title,
                        "betArrs": betArrs,
                        "text": text,
                        "bonus": bonus,
                        "profit": profit,
                        "value": value,
                        "highestProfit":highestProfit
                    });
                } else {
                    $.zui.store.set('data' + betItemIdex, {
                        // "periods": periods,
                        "betCount": betCount,
                        "payMoney": payMoney,

                        "SingleAndRetest": SingleAndRetest,
                        "title": title,
                        "dmBetArrs": dmBetArrs,
                        "tmBetArrs": tmBetArrs,
                        "secondBetArrs": secondBetArrs,
                        "text": text,
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
        } else {
            //方案一： 随机生成n 个数
            // 方案二 ： 提示用户未选择
            alert('您还未选择号码');
        }


    })

    /*摇一摇选号*/
    $('.shake').on('click',function () {
        var value = parseInt($chooseLottery.val())+2;
        emptyChoose();
        switch (value){
            case 2:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(6,4);
                break;
            case 3:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(19,17);
                break;
            case 4:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(78,76);
                break;
            case 5:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(540,538);
                break;
            case 6:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(90,88);
                break;
            case 7:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(26,24);
                break;
            case 8:
                randomChoose.randomChooseNum(value,11);
                showLotteryInfo(9,7);
                break;
            case 9:
                randomChoose.randomChooseNum(1,11);
                showLotteryInfo(13,11);
                break;
            case 10:
                randomChoose.randomChooseNum(2,11);
                showLotteryInfo(65,63);
                break;
            case 11:
                randomChoose.randomChooseNum(3,11);
                showLotteryInfo(195,193);
                break;
        }
    })

    /**方法抽取*/
    function base1() {
        $panlModal.text('请至少选择一个拖码');
        base();
    }

    /**
     *
     * 切换下拉选项更改 奖金提示方法抽取
     *
     *  参数：
     *  bonusInfo： 奖金提示信息  如：’猜中开奖的任意3个号码，奖金19元‘
     *  chooseInfo： 选择提示信息 如：'可选1-2个'
     *
     * */
    function lotteryInfo(bonusInfo, chooseInfo) {
        changeBetTypeRX();
        $bonusPrompt.text(bonusInfo);
        $chooseInfo.text(chooseInfo);
    }

    /**
     * 选号时， 奖金盈利公共方法抽取
     * dm_lenght  选择胆码的长度  如果长度小于0 金额信息不显示
     * baseFun(dm_length,value,tm_length,19,114,14);
     * */
    function baseFun(dm_lenght, RX_value, TM_lenght, oneBonus, maxBonus, nodeCount) {
        if (dm_lenght > 0 && dm_lenght + TM_lenght >= RX_value) {
            _11choose5Base_1(TM_lenght, RX_value - dm_lenght, oneBonus, maxBonus, nodeCount, dm_lenght);
        } else {
            $show_or_hide.hide();
        }
    }

    /**
     * 回填中奖信息的公共方法
     * @param value 任选几
     */
    function backFillLotteryInfo(value) {
        switch (value) {
            //  任选三
            case 1:
                lotteryInfo('猜中开奖的任意3个号码，奖金19元', '可选1-2个');
                break;
            //    任选四
            case 2:
                lotteryInfo('猜中开奖的任意4个号码，奖金78元', '可选1-3个');
                break;
            // 任选五
            case 3:
                lotteryInfo('猜中开奖的任意5个号码，奖金540元', '可选1-4个');
                break;
            //    任选六
            case 4:
                lotteryInfo('至少选6个，猜中开奖的5个号，奖金90元', '可选1-5个');
                break;
            //    任选七
            case 5:
                lotteryInfo('至少选7个，猜中开奖的5个号，奖金26元', '可选1-6个');
                break;
            //    任选八
            case 6:
                lotteryInfo('至少选8个，猜中开奖的5个号，奖金9元', '可选1-7个');
                break;
            //   前一
            case 7:
                $('.bet-type').css('display', 'none');
                $('.wrapper-box1').show()
                $('.wrapper-box2').hide();
                $bonusPrompt.text('猜中开奖的第1个号码，奖金13元');
                break;
            //    前二
            case 8:
                changeBetTypeQ();
                $bonusPrompt.text('猜中开奖的前2个号码，奖金65元');
                break;
            //    前三
            case 9:
                changeBetTypeQ();
                $('.wrapper-box2>span').show();
                $('.lottery-box-3').show();
                $bonusPrompt.text('猜中开奖的前3个号码，奖金195元');
                break;
            //    默认任选二
            default:
                lotteryInfo('猜中开奖的任意2个号码，奖金6元', '可选1个');
                break;
        }

    }
    /**
     * 机选时显示底部的投注相关信息
     *
     * @param bonus 奖金信息
     * @param profit 盈利信息
     */
    function showLotteryInfo(bonus,profit) {
        $show_or_hide.show();
        $bonus.html(bonus+'元');
        $profit.html(profit+'元');
        $count.html(1);
        $pay_money.html(2);
    }


    /**【用于计算普通投注】
     *
     * 11选5 投注时组合注数及金额等公共部分抽取方法
     * 参数：
     * choose_len：彩球选择个数
     * RX_value：此时页面处于任选几 任选2 value即为2
     * oneBonus: 单注奖金
     * maxBonus：最高奖金
     *
     * minChoose: 最小选择球个数
     * nodeCount:选择球的节点个数 ，当大于某个节点时，相应的计算公式才有效
     *  dm_length: 选择的胆码个数
     *
     *
     * 注：前一、前二、前三 调用此方法时，RX_value 参数传入的是固定数字，
     * 因为choose_len>=RX_value 满足这个条件时，底部奖金信息才显示，而当前传入的
     * RX_value 值分别为 9,10,11 ，满足这个条件前，都不显示，与前一前二前三规则出入
     * */
    function _11choose5Base(choose_len, RX_value, oneBonus, maxBonus, minChoose, nodeCount, dm_length) {
        var count = permutationCombination(choose_len, RX_value); // 获取投注组合的总数量
        if (count) {
            var bonus = oneBonus * count; //奖金
            bonus = bonus >= maxBonus ? maxBonus : bonus;
            var pay_money = count * 2; // 支付金额
            $count.html(count);
            $show_or_hide.show(); // 显示底部投注提示信息
            $pay_money.html(pay_money);

            if (choose_len == minChoose) {
                $bonus.html(oneBonus + '元');
                $profit.html((oneBonus - 2) + '元');
            } else if (choose_len == 11) {
                $bonus.html(maxBonus + '元');
                $profit.html(maxBonus - pay_money + '元');
            } else if (choose_len > nodeCount && nodeCount == 8) {
                var currentCount = permutationCombination(choose_len - 6, RX_value);// 获取最少中奖注数
                // 获取中奖最少奖金
                bonus = oneBonus * currentCount;
                $bonus.html(bonus + '至' + maxBonus + '元');
                // 计算最少盈亏
                $profit.html(bonus - pay_money + '至' + (maxBonus - pay_money) + '元');
            } else if (nodeCount == 12) { // 用于判断任选五
                $bonus.html(oneBonus + '元');
                $profit.html((bonus - pay_money) + '元');
            } else if (nodeCount == 13) {
                // 用于计算任选6-任选8的奖金
                var currentCount = permutationCombination(choose_len - 5, choose_len - RX_value);// 获取最少中奖注数
                // 获取中奖最少奖金
                bonus = oneBonus * currentCount;
                $bonus.html(bonus + '元');
                // 计算最少盈亏
                $profit.html(bonus - pay_money + '元');
            }
            else if (nodeCount == 14) {
                // 计算 任三 任四 最多中奖注数
                var currentCount = permutationCombination(5 - dm_length, RX_value);// 获取最多中奖注数
                bonus = oneBonus * currentCount;
                $bonus.html(oneBonus + '至' + bonus + '元');
                $profit.html((oneBonus - pay_money) + '至' + (bonus - pay_money) + '元');
            }
            else {
                $bonus.html(oneBonus + '至' + bonus + '元');
                $profit.html((oneBonus - pay_money) + '至' + (bonus - pay_money) + '元');
            }
        } else {
            $show_or_hide.hide();
        }
    }

    /**
     * 【 用于计算胆拖 】
     *
     * 11选5 投注时组合注数及金额等公共部分抽取方法
     * 参数：
     * choose_len：拖码选择的个数
     * RX_value：此时页面处于任选几 任选2 value即为2
     * oneBonus: 单注奖金
     * maxBonus：最高奖金
     *
     * nodeCount:选择球的节点个数 ，当大于某个节点时，相应的计算公式才有效
     *  dm_length: 选择的胆码个数
     *
     *
     * 注：前一、前二、前三 调用此方法时，RX_value 参数传入的是固定数字，
     * 因为choose_len>=RX_value 满足这个条件时，底部奖金信息才显示，而当前传入的
     * RX_value 值分别为 9,10,11 ，满足这个条件前，都不显示，与前一前二前三规则出入
     * */
    function _11choose5Base_1(choose_len, RX_value, oneBonus, maxBonus, nodeCount, dm_length) {
        var count =permutationCombination(choose_len, RX_value); // 获取投注组合的总数量
        if (count) {
            var bonus = oneBonus * count; //奖金
            bonus = bonus >= maxBonus ? maxBonus : bonus;
            var pay_money = count * 2; // 支付金额
            $count.html(count);
            $show_or_hide.show(); // 显示底部投注提示信息
            $pay_money.html(pay_money);

            if (choose_len + dm_length == RX_value + dm_length && dm_length > 0) {
                $bonus.html(oneBonus + '元');
                $profit.html((oneBonus - 2) + '元');
            } else if (choose_len == 2 && dm_length == 2 && RX_value + dm_length == 3) {
                // 设置任三 2+2   情况（不适用于最大中奖注数公式）
                $bonus.html('19至38元');
                $profit.html('15至34元');
            } else if (choose_len == 8 && dm_length == 2 && RX_value + dm_length == 3) {
                // 设置任三 2+8   情况（不适用于最大中奖注数公式）
                $bonus.html('38元至57元');
                $profit.html('22至41元');
            } else if (choose_len == 9 && dm_length == 1 && RX_value + dm_length == 3) {
                // 设置任三 1+9   情况（不适用于最大中奖注数公式）
                $bonus.html('57至114元');
                $profit.html('-15至42元');
            } else if (nodeCount == 12) { // 用于判断任选五
                $bonus.html(oneBonus + '元');
                $profit.html((bonus - pay_money) + '元');
            } else if (nodeCount == 15) {
                // 计算 任六 任七 任八 最多中奖注数
                var currentCount =permutationCombination(choose_len - 5 + dm_length, RX_value + dm_length - 5);// 获取最多中奖注数
                bonus = oneBonus * currentCount;
                if (RX_value + dm_length == 7 && dm_length == 1 && choose_len > 5) {
                    //    任七 存在最小中奖数量
                    oneBonus = permutationCombination(choose_len - 5, 1) * 26;
                    // 用于单独计算任八
                } else if (choose_len == 8 && dm_length == 1 && RX_value + dm_length == 8) {
                    oneBonus = 27;
                } else if (choose_len == 9 && dm_length == 1 && RX_value + dm_length == 8) {
                    oneBonus = 54;
                } else if (choose_len == 10 && dm_length == 1 && RX_value + dm_length == 8) {
                    oneBonus = 90;
                } else if (RX_value + dm_length == 8 && dm_length == 2 && choose_len > 5) {
                    oneBonus = permutationCombination(choose_len - 5, 1) * 9;
                }

                $bonus.html(oneBonus + '至' + bonus + '元');
                $profit.html((oneBonus - pay_money) + '至' + (bonus - pay_money) + '元');
            } else if (choose_len + dm_length == 11 && dm_length > 0) {
                var currentCount = permutationCombination(5 - dm_length, RX_value);// 获取最多中奖注数
                bonus = oneBonus * currentCount;
                $bonus.html(bonus + '元');
                // 计算最少盈亏
                $profit.html(bonus - pay_money + '元');
            }
            else if (choose_len > nodeCount && nodeCount == 7) {
                //任二胆拖 最小中奖注数
                var currentCount = permutationCombination(choose_len - 6, 1);
                // 获取中奖最少奖金
                bonus = oneBonus * currentCount;
                $bonus.html(bonus + '至' + maxBonus + '元');
                // 计算最少盈亏
                $profit.html(bonus - pay_money + '至' + (maxBonus - pay_money) + '元');
            } else if (nodeCount == 14) {
                // 计算 任三 任四 最多中奖注数
                var currentCount = permutationCombination(5 - dm_length, RX_value);// 获取最多中奖注数
                bonus = oneBonus * currentCount;
                $bonus.html(oneBonus + '至' + bonus + '元');
                $profit.html((oneBonus - pay_money) + '至' + (bonus - pay_money) + '元');
            }
            else {
                $bonus.html(oneBonus + '至' + bonus + '元');
                $profit.html((oneBonus - pay_money) + '至' + (bonus - pay_money) + '元');
            }
        } else {
            $show_or_hide.hide();
        }
    }

    /**
     * 【用于计算前二、前三 注数以及奖金】
     *  参数：
     *  value：任选几
     *  oneBonus:单注奖金
     *  firstNumLength：第一位数选择个数
     *  secondNumLength：第二位数选择个数
     *  thirdNumLength：第三位数选择个数
     * */
    function _11choose5RXBase(value, oneBonus, firstNumLength, secondNumLength, thirdNumLength) {

        if (value == 10) {
            //    前二
            if (firstNumLength > 0 && secondNumLength > 0) {
                var betCount = firstNumLength * secondNumLength; // 计算投注总注数
                $show_or_hide.show(); // 显示底部投注提示信息
                var payMoney = betCount * 2;
                $count.html(betCount);
                $pay_money.html(payMoney);
                $bonus.html(oneBonus + '元');
                $profit.html((oneBonus - payMoney) + '元');
            } else {
                $show_or_hide.hide(); // 显示底部投注提示信息
            }
        } else {
            //    前三
            if (firstNumLength > 0 && secondNumLength > 0 && thirdNumLength > 0) {
                var betCount = firstNumLength * secondNumLength * thirdNumLength; // 计算投注总注数
                $show_or_hide.show(); // 显示底部投注提示信息
                var payMoney = betCount * 2;
                $count.html(betCount);
                $pay_money.html(payMoney);
                $bonus.html(oneBonus + '元');
                $profit.html((oneBonus - payMoney) + '元');
            } else {
                $show_or_hide.hide(); // 显示底部投注提示信息
            }
        }
    }

    /**
     * 判断胆拖选择数量，超出数量给予提示
     *  参数：
     *  redBallLen ：当前选择胆码的个数
     *  RX_value: 任选几
     *  propInfo ： 弹出提示信息文本
     *  $this :当前点击的彩球 对象
     * */

    function judgeDTcount($this, propInfo) {
        // if(redBallLen>RX_value){
        $panlModal.html(propInfo);
        $this.removeClass('red-ball');
        base();
        // }
    }


    /**
     *  前二前三 组选 直选切换
     * */
    $lotteryType2.on('click', function () {
        var index = $(this).index();
        var value = parseInt($chooseLottery.val()); // 获取下拉列表当前值
        if (value == 8) {
            if (index) {
                $bonusPrompt.text('猜中开奖的前2个号码且顺序一致，奖金130元');
            } else {
                $bonusPrompt.text('猜中开奖的前2个号码，奖金65元');
            }
        } else if (value == 9) {
            if (index) {
                $bonusPrompt.text('猜中开奖的前3个号码且顺序一致，奖金1170元');
            } else {
                $bonusPrompt.text('猜中开奖的前3个号码，奖金195元');
            }
        }
    })

    /*
     *从上个页点击修改投注信息时，将选择的球回填到选号界面上
     * */

    if (key != undefined && isTobet == undefined) {
        var data = $.zui.store.get(key);
        var value = data.value;
        $show_or_hide.show();
        $bonus.html(data.bonus);
        $profit.html(data.profit);
        $count.html(data.betCount);
        $pay_money.html(data.payMoney);
        $chooseLottery.val(data.value);
        // 遍历缓存中的彩球数组，将对应的加上样式显示在界面上
        if (data.hasOwnProperty('betArrs')) {
            backFillLotteryInfo(value);
            loopBetBalls(data.betArrs, $normalBets);
        } else {
            $('.wrapper-box2').show();
            $('.wrapper-box1').hide();
            $('.bet-type>div>span:nth-child(1)').removeClass('bg-red');
            $('.bet-type>div>span:nth-child(2)').addClass('bg-red');
            backFillLotteryInfo(value);
            if (value == 8) {
                // 前二
                $bonusPrompt.text('猜中开奖的前2个号码且顺序一致，奖金130元');
            } else if (value == 9) {
                // 前三
                $bonusPrompt.text('猜中开奖的前3个号码且顺序一致，奖金1170元');
            }
            loopBetBalls(data.dmBetArrs, $DM_balls);
            loopBetBalls(data.tmBetArrs, $TM_balls);
        }
        if (data.hasOwnProperty('secondBetArrs')) {
            // 数组长度大于0 则有前三
            loopBetBalls(data.secondBetArrs, $secondBalls);
        }
    }

    /**
     * 循环回填选中彩球 公共代码抽取
     * arr：缓存中彩球的数组
     * $bets：投注界面上的彩球数组
     * */
    function loopBetBalls(arr, $bets) {
        for (var i = 0; i < arr.length; i++) {
            $bets.each(function (index, item) {
                if (item.innerHTML == arr[i]) {
                    item.setAttribute('class', 'red-ball');
                }
            })
        }
    }
});

/**点击 任选n 切换投注类型 */
function changeBetTypeRX() {
    $('.bet-type').show();
    $('.bet-type-1').show(); // 显示普通和胆拖
    $('.bet-type-2').hide(); // 隐藏组选和直选
    $('.wrapper-box2>span').hide();
    $('.lottery-box-3').hide();
    $('.wrapper-box2>p').show();
    $('.shake ').show();
    // emptyChoose();
}
/**点击前二、前三 ，切换投注类型 */
function changeBetTypeQ() {
    $('.bet-type').show();
    $('.bet-type-1').hide(); // 隐藏普通和胆拖
    $('.bet-type-2').show(); // 显示组选和直选
    $('.wrapper-box2>span').show().eq(2).hide();
    $('.wrapper-box2>p').hide();
    $('.lottery-box-3').hide();
    // emptyChoose();
}

/**清空选项*/
function emptyChoose() {
    $('.lottery-box em').removeClass('red-ball');
}
/**
 * 定时隐藏弹出框
* */
function hideModal() {
    setTimeout(function () {
        $('div.panel').fadeOut();
    },2000);
}
function base() {
    //    提示模态框
    $('div.panel').show();
    hideModal();
}
/**
胆码 拖码相同号码只能单选 思路：

1.给每个相同的数字加上一个自定义属性
2.获取当前点击的球，然后获取到当前球的属性，
3.根据属性查找同属性别的球是否为红色，既该属性红球length是否为1，=====>>    $('option[value='+value+']')
如果为1，移除该属性所有的红球，再给点击的加上红色样式
* */

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
    if(!$('.bet-type .dttz').hasClass('bg-red')&&!$('.bet-type .zhixtz').hasClass('bg-red')){
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
