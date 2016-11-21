/**
 * 主框架
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 上午10:16
 */

layui.use(['element', 'jquery', 'common', 'util'], function () {
    var element = layui.element(),
        $ = layui.jquery,
        common = layui.common;

    var opened_tabs = new Array();

    var active = {
        closeTab: function(){
            var tab_name = $(this).data('name');
            var index = $.inArray(tab_name, opened_tabs);
            element.tabDelete('page-tab', index);
            opened_tabs[index] = null;
        },
        signOut: function () {
            common.signOut('确认退出系统？', '为保存的操作将丢失！', function () {
                window.location.href = 'login.html';
            });
        }
    };

    $('.layui-nav').on('click', '.tab-open', function () {
        var temp = $('.page-tab>.layui-tab-title li');
        $(temp).each(function (key, value) {
            opened_tabs[key] = $(value).text().substr(0, $(value).text().trim().length-2);
        });

        var has_tab = $.inArray($(this).text(), opened_tabs);
        if (has_tab != -1){
            element.tabChange('page-tab', has_tab);
        } else {
            element.tabAdd('page-tab', {
                title: $(this).text() + " <i class='layui-icon close-tab' data-name='"+ $(this).text() +"' data-type='closeTab'>&#x1006;</i>",
                content: "<iframe class='tab-main' src='"+$(this).data('href')+"'></iframe>"
            });
            var tabs = $('.page-tab .layui-tab-item').length;
            element.tabChange('page-tab', tabs-1);
            changeIframeHeight();
        };
    });
    
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
    div.height = document.documentElement.clientHeight;
};

function changeIframeHeight(){
    var iframe = document.getElementsByClassName('tab-main');
    for(var i = 0; i<=iframe.length; i++){
        iframe[i].height = document.documentElement.clientHeight - 120;
    }
}
