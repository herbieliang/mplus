/**
 * 列表
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 下午4:02
 */

layui.use(['element', 'jquery', 'layer', 'common', 'icheck'], function () {
    var element = layui.element(),
        $ = layui.jquery,
        layer = layui.layer,
        common = layui.common;

    // $('input[type=checkbox]').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    // });

    var active = {
        doAdd: function () {
            var url = $(this).data('href');
            window.location.href = url;
        },
        doEdit: function(){
            layer.msg('你点击了编辑按钮，可是有啥用呢？');
        },
        doDelete: function(){
            common.alertDel('确认删除这条信息？', '此操作不可逆，请再次确认是否要操作。', function () {
                setTimeout(function () {
                    common.alertSuccess('删除成功！', '当然现在没有任何作用。');
                }, 3000);
            })
        },
        doBatchDelete: function () {
            common.alertDel('确认删除这些信息？', '此操作不可逆，请再次确认是否要操作。', function () {
                setTimeout(function () {
                    common.alertSuccess('批量删除成功！', '当然现在没有任何作用。');
                }, 3000);
            })
        }
    };

    $('.do-action').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});