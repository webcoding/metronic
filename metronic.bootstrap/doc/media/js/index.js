/**
 * Created by lixuelong on 13-10-24.
 */


var DOCApp = {};
DOCApp.init = function(){
    handleSidebarMenu();
    $.SyntaxHighlighter.init();
}


var handleSidebarMenu = function () {
    jQuery('.page-sidebar').on('click', 'li > a', function (e) {
        if ($(this).next().hasClass('sub-menu') == false) {
            if ($('.btn-navbar').hasClass('collapsed') == false) {
                $('.btn-navbar').click();
            }
            return;
        }
        var parent = $(this).parent().parent();
        parent.children('li.open').children('a').children('.arrow').removeClass('open');
        parent.children('li.open').children('.sub-menu').slideUp(200);
        parent.children('li.open').removeClass('open');
        //下一级目录
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200, function () {

            });
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200, function () {

            });
        }
        e.preventDefault();
    });

    // 处理ajax 加载页面
    jQuery('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
        e.preventDefault();
        App.scrollTop();

        var url = $(this).attr("href");
        var menuContainer = jQuery('.page-sidebar ul');
        var pageContent = $('.page-content');
        var pageContentBody = $('.page-content .page-content-body');

        menuContainer.children('li.active').removeClass('active');
        menuContainer.children('arrow.open').removeClass('open');

        $(this).parents('li').each(function () {
            $(this).addClass('active');
            $(this).children('a > span.arrow').addClass('open');
        });
        $(this).parents('li').addClass('active');
        //添加ajax 遮罩
        App.blockUI(pageContent, false);
        // 请求数据
        $.post(url, {}, function (res) {
            //去掉ajax 遮罩
            App.unblockUI(pageContent);
            pageContentBody.html(res);
           // App.fixContentHeight(); // fix content height
           // App.initUniform(); // 初始化 uniform elements
        });
    });
}
