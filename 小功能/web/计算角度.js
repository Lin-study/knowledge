function angle(start, end) {
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
}