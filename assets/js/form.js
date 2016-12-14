/**
 * 表单
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 下午3:10
 */

layui.use(['form', 'element', 'jquery', 'common'], function () {
    var form = layui.form(),
        element = layui.element(),
        $ = layui.jquery,
        common = layui.common;

    // 使用多选下拉框需要使用次方式保存下值，layui默认只能获取一个值
    var city3 = '';
    form.verify({
        city3: function (value) {
            city3 = value;
        }
    });

    form.on('submit(formDemo)', function(data){
        // 将多选框字段替换为我们保存的值
        data.field['city3'] = city3;
        layer.msg(JSON.stringify(data.field));
        return false;
    });

    var active = {
        doGoBack: function () {
            var url = $(this).data('href');
            common.goUrl(url);
        }
    };

    $('.do-action').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});