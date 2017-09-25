/**
 * Created by 14579 on 2017/9/15.
 */
    var speed = 10; //定义摇一摇加速度的临界值 值越小摇动的力度越小
    var x = y = z = lastX = lastY = lastZ = 0; //初始化x,y,z上加速度的默认值
    var isHaveShaked = false;//用于记录是否在动画执行中
//判断系统是否支持html5摇一摇的相关属性
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('设备不支持摇一摇功能');
    }
    function deviceMotionHandler() {
        /*获取x,y,z方向的即时加速度*/
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed
            || Math.abs(z - lastZ) > speed) {
            //摇一摇实际场景就是加速度的瞬间暴增爆减
            if (!isHaveShaked) {
                //手机震动200毫秒
                if (navigator.vibrate) {
                    navigator.vibrate(200);//震动200毫秒
                } else if (navigator.webkitVibrate) {
                    navigator.webkitVibrate(200);
                }
                alert('摇一摇')
                //模拟网络请求做想干的事
                isHaveShaked = true;
                setTimeout(function () {
                    isHaveShaked = false;
                }, 1000);
            }
        }
        /*保存历史加速度*/
        lastX = x;
        lastY = y;
        lastZ = z;
    }



