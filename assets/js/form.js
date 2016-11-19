/**
 * 表单
 * User: Zachary Liang
 * Date: 16-11-19
 * Time: 下午3:10
 */

layui.use(['form', 'element', 'jquery'], function () {
    var form = layui.form(),
        element = layui.element(),
        $ = layui.jquery;

    form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});