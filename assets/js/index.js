/**
 * 主框架
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 上午10:16
 */

layui.use(['element', 'layer', 'jquery', 'common'], function () {
    var element = layui.element(),
        layer = layui.layer,
        $ = layui.jquery,
        common = layui.common;

    var opened_tabs = new Array();

    var active = {
        closeTab: function(){
            var tab_name = $(this).data('name');
            var index = $.inArray(tab_name, opened_tabs);
            element.tabDelete('page-tab', index);
            update_opened_tab();
        },
        signOut: function () {
            common.signOut('确认退出系统？', '为保存的操作将丢失！', function () {
                window.location.href = 'login.html';
            });
        }
    };

    $('.layui-nav').on('click', '.tab-open', function () {
        update_opened_tab();

        var has_tab = $.inArray($(this).data('name'), opened_tabs);
        if (has_tab != -1){
            element.tabChange('page-tab', has_tab);
        } else {
            element.tabAdd('page-tab', {
                title: $(this).data('name').trim() + " <i class='layui-icon ayui-unselect layui-tab-close close-tab' data-name='"+ $(this).data('name').trim() +"' data-type='closeTab'>&#x1006;</i>",
                content: "<iframe class='tab-main' src='"+$(this).data('href')+"'></iframe>"
            });
            element.tabChange('page-tab', opened_tabs.length);
            layer.msg('页面加载中，请稍后。。。', {icon:16, time:false});
            changeIframeHeight();
        };
    });
    
    function update_opened_tab() {
        opened_tabs = new Array();
        var temp = $('.page-tab>.layui-tab-title li');
        $(temp).each(function (key, value) {
            opened_tabs[key] = $(value).text().substr(0, $(value).text().trim().length-2);
        });
    };
    
    $('#go-dashboard').on('click', function (e) {
        element.tabChange('page-tab', 0);
    });

    $('.page-tab').on('click', '.close-tab', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('body').on('click', '.sign-out, .do-action', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $(document).ready(function(){
        changeNav();
        function changeNav() {
            if ($(document).width() <= 900){
                $('.layui-nav').eq(0).removeClass('layui-nav-tree');
                $('.layui-nav').eq(0).removeClass('layui-nav-side');
                var nav_items = $('.layui-nav-item');
                $(nav_items).each(function (index, elem) {
                    if (index > 0){
                        $(elem).removeClass('layui-nav-itemed');
                    }
                });
            } else {
                $('.layui-nav').eq(0).addClass('layui-nav-tree');
                $('.layui-nav').eq(0).addClass('layui-nav-side');
                var nav_items = $('.layui-nav-item');
                $(nav_items).each(function (index, elem) {
                    if (index > 0){
                        $(elem).addClass('layui-nav-itemed');
                    }
                });
            }
        }
        $(window).resize(function(){
            changeNav();
        });
    });
});

changeContentHeight();
changeIframeHeight();

window.onresize = function(){
    changeContentHeight();
    changeIframeHeight();
};

function changeContentHeight() {
    var div = document.getElementById("page-content");
    if (div){
        div.height = document.documentElement.clientHeight;
    }
};

function changeIframeHeight(){
    var iframe = document.getElementsByClassName('tab-main');
    if (iframe.length >= 1){
        for(var i = 0; i<=iframe.length; i++){
            iframe[i].height = document.documentElement.clientHeight - 120;
        }
    }
}
