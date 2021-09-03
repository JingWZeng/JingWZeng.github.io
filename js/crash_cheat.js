//崩溃欺骗 + OriginTitle 
 var OriginTitle = document.title;
 var titleTime;

btf.isJqueryLoad(
    function(){
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            $('[rel="icon"]').attr('href', "/LightCycle.ico");
            document.title = '╭(°A°`)╮ 客官不要走嘛~';
            clearTimeout(titleTime);
        }
        else {
            $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202108232012733.png");
            document.title = '(ฅ>ω<*ฅ) 客官欢迎回来~';
            titleTime = setTimeout(function () {
                document.title = OriginTitle;
            }, 2000);
        }
    });
}
)