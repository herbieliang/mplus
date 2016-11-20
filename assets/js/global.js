/**
 * 全局js
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 上午9:31
 */

layui.config({
    base: '/assets/plugin/layui/plugin/' //自定义layui组件的目录
}).extend({ //设定组件别名
    common: 'common.min',
    datatable: 'datatable/datatable',
    sweetalert: 'sweetalert/sweetalert.min'
});

layui.use(['layer', 'jquery'], function () {
    var layer = layui.layer,
        $ = layui.jquery;

    /**
     * 控制列表全选
     */
    $('table th input:checkbox').on('click' , function(){
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
            .each(function(){
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected');
            });

    });

    /**
     * 控制批量删除按钮显示隐藏，列表中选择
     */
    $("input[type='checkbox']").on('change', function () {
        if ($("input[name='uuid']:checked").length > 1){
            $('#batch_delete_btn').show();
        } else {
            $('#batch_delete_btn').hide();
        }
    });
});