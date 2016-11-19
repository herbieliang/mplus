/**
 * 主框架
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 上午10:16
 */

layui.use(['element', 'jquery'], function () {
    var element = layui.element(),
        $ = layui.jquery;

    $navs = $('.tab-open');
    $($navs).each(function (index, elem) {
        $(elem).on('click', function (e) {
            e.preventDefault();
            var tab_titles = new Array();
            var temp = $('.page-tab>.layui-tab-title li');
            $(temp).each(function (key, value) {
                tab_titles[key] = $(value).text().substr(0, $(value).text().trim().length-2);
            });

            var has_tab = $.inArray($(this).text(), tab_titles);
            if (has_tab != -1){
                element.tabChange('page-tab', has_tab);
            } else {
                element.tabAdd('page-tab', {
                    title: $(this).text() + ' <i class="layui-icon close-tab">&#x1007;</i>',
                    content: "<iframe class='tab-main' src='"+$(this).attr('href')+"'></iframe>"
                });
                var tabs = $('.page-tab .layui-tab-item').length;
                element.tabChange('page-tab', tabs-1);
                $('.close-tab').each(function (key, value) {
                    $(value).on('click', function () {
                        element.tabDelete('page-tab', key+1);
                    });
                });
                changeIframeHeight();
            }
        });
    });
    
    $('#go-dashboard').on('click', function (e) {
        element.tabChange('page-tab', 0);
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
