/**
 * 全局js
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 上午9:31
 */

layui.config({
    base: '/assets/plugin/layui/lay/modules/mplus/' //自定义layui组件的目录
}).extend({ //设定组件别名
    common:             'common.min',
    datatable:          'datatable/jquery.dataTables.min',
    sweetalert:         'sweetalert/sweetalert.min',
    echarts:            'echarts/echarts.min',
    echarts_common:     'echarts/echarts.common.min',
    echarts_simple:     'echarts/echarts.simple.min',
    icheck:             'iCheck/icheck.min',
    cropper:            'cropper/cropper.min',
    chosen:             'chosen/chosen.min',
});

layui.use(['layer', 'jquery', 'datatable', 'icheck', 'chosen'], function () {
    var layer = layui.layer,
        $ = layui.jquery;

    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_square-green',
    });

    $('.mplus-select').chosen({
        width: '100%'
    });
    $('.mplus-select ~ .layui-form-select').remove();

    $(function() {
        /**
         * 控制列表全选
         */
        var checkAll = $('table th input:checkbox');
        var checkboxes = $('input[name="uuid"]');
        checkAll.on('ifChecked ifUnchecked', function(event) {
            if (event.type == 'ifChecked') {
                checkboxes.iCheck('check');
            } else {
                checkboxes.iCheck('uncheck');
            }
        });
        checkboxes.on('ifChanged', function(event){
            if(checkboxes.filter(':checked').length == checkboxes.length) {
                checkAll.prop('checked', 'checked');
            } else {
                checkAll.removeProp('checked');
            }
            checkAll.iCheck('update');
        });
        // $('table th input:checkbox').on('click' , function(){
        //     var that = this;
        //     $(this).closest('table').find('tr > td:first-child input:checkbox').each(function(){
        //             this.checked = that.checked;
        //             $(this).closest('tr').toggleClass('selected');
        //         });
        // });

        /**
         * 控制批量删除按钮显示隐藏，列表中选择2项以上才显示
         */
        checkboxes.on('ifChanged', function (event) {
            if (checkboxes.filter(':checked').length > 1){
                $('#batch_delete_btn').show();
            } else {
                $('#batch_delete_btn').hide();
            }
        });
        // $("input[type='checkbox']").on('change', function () {
        //     if ($("input[name='uuid']:checked").length > 1){
        //         $('#batch_delete_btn').show();
        //     } else {
        //         $('#batch_delete_btn').hide();
        //     }
        // });

        /**
         * 全局初始化数据表
         */
        $('.dataTable').dataTable({
            "searching": true, //是否允许Datatables开启本地搜索
            "paging": true, //是否开启本地分页
            "lengthChange": true, //是否允许用户改变表格每页显示的记录数
            "info": true, //控制是否显示表格左下角的信息
            //跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
            "ordering": true,  //是否开启排序
            "order": [1, 'desc'], //asc升序   desc降序
            "orderMulti": true,
            "columnDefs": [{
                "targets": 0,
                "searchable": false,
            },
                { "orderable": false, "targets": 0 },
                { "orderable": false, "targets": 6 },
            ],
            "processing": true,  //是否显示数据处理状态
            "autoWidth": false,
            "deferRender": true,
            "lengthMenu": [ 5, 10, 25, 50, 100 ],
            "pageLength": 10,
            "orderClasses": false,
            "pagingType": "full_numbers",
            "language": {
                "emptyTable": "暂无数据！",
                "info": "显示第 _START_ 条到第 _END_ 条，共 _TOTAL_ 条",
                "infoEmpty": "共 _TOTAL_ 条",
                "infoFiltered": "(从 _MAX_ 条数据中过滤)",
                "lengthMenu": "每页显示 _MENU_ 条",
                "loadingRecords": "加载中，请稍等。。。",
                "paginate": {
                    "first": "首页",
                    "last": "尾页",
                    "next": "下一页",
                    "previous": "上一页"
                },
                "processing": "数据处理中。。。",
                "search": "搜索：",
                "zeroRecords": "暂无匹配的记录",
            },
            "stateSave": true,
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

    // 关闭加载提示
    if (self.frameElement.tagName == "IFRAME"){
        parent.layer.closeAll();
    };
});

changeMainHeight();

window.onresize = function(){
    changeMainHeight();
};

function changeMainHeight() {
    var div = document.getElementById("main-wrap");
    if (div){
        div.style.minHeight = window.parent.document.documentElement.clientHeight - 185 + 'px';
    }
}