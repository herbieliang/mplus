/**
 * 列表
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 下午4:02
 */

layui.use(['element', 'jquery', 'datatable', 'layer', 'common'], function () {
    var element = layui.element(),
        $ = layui.jquery,
        layer = layui.layer,
        common = layui.common;

    $(function() {
        //.table-sort就是表格的class
        $('.table-sort').dataTable({
            "searching": true, //是否允许Datatables开启本地搜索
            "paging": true, //是否开启本地分页
            "lengthChange": true, //是否允许用户改变表格每页显示的记录数
            "info": true, //控制是否显示表格左下角的信息
            //跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
            "order": [1, 'desc'], //asc升序   desc降序
            "aoColumnDefs": [{
                "orderable": false,
                "aTargets": [0, 6] // 指定列不参与排序 这里表示第一列和第十列不参与排序
            }],
        });
        $('.table-sort tbody').on('click', 'tr', function() {
            if($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    });

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