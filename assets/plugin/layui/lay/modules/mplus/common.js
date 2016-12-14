/**
 * layui扩展公共模块
 * User: Zachary Liang
 * Date: 16-11-20
 * Time: 上午10:02
 */

layui.define(['layer', 'jquery', 'sweetalert'], function(exports){ //提示：组件也可以依赖其它组件，如：layui.define('layer', callback);
    var layer = layui.layer,
        $ = layui.jquery;

    var obj = {
        ajax: function (url, type, dataType, data, callback) {
            $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                success: callback
            });
        },
        goUrl: function (url) {
            parent.layer.msg('页面加载中，请稍后。。。', {icon:16, time:false});
            window.location.href = url;
        },
        alertDel: function (title, text, fn){
            swal({
                title: title,
                text: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: '是的，我要删除',
                cancelButtonText: '我再想想',
                closeOnConfirm: false,
                disableButtonsOnConfirm: true,
                showLoaderOnConfirm: true
            }, fn);
        },
        alertSuccess: function (title, text){
            swal({
                title: title,
                text: text,
                type: "success",
                timer:2000,
                showCancelButton: false,
                showConfirmButton:false
            });
        },
        alertError: function (title, text){
            swal({
                title: title,
                text: text,
                type: "error",
                timer:2000,
                showCancelButton: false,
                showConfirmButton:false
            });
        },
        alertInfo: function (title, text) {
            swal({
                title: title,
                text: text,
                type: "info",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            });
        },
        alertPrompt: function (title, text, inputType, inputPlaceholder, fn) {
            swal({
                title: title,
                text: text,
                type: "input",
                inputType:inputType,
                showCancelButton: true,
                confirmButtonText: '确认提交',
                cancelButtonText: '关闭窗口',
                closeOnConfirm: false,
                animation: true,
                inputPlaceholder: inputPlaceholder
            }, fn);
        },
        alertConfirm: function (title, text, type, confirmButtonText, cancelButtonText, fn) {
            swal({
                title: title,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                closeOnConfirm: false,
                disableButtonsOnConfirm: true,
                showLoaderOnConfirm: true
            }, fn);
        },
        signOut: function (title, text, fn) {
            swal({
                title: title,
                text: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: '确认退出',
                cancelButtonText: '我在想想',
                closeOnConfirm: false,
                closeOnCancel: true
            }, fn);
        }
    };

    //输出接口
    exports('common', obj);
});