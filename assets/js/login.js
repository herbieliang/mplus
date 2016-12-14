/**
 * 登陆模块
 * User: Zachary Liang
 * Date: 16-11-18
 * Time: 下午3:40
 */

layui.use(['layer', 'form', 'element', 'jquery'], function () {
    var layer = layui.layer,
        form = layui.form(),
        element = layui.element(),
        $ = layui.jquery;


    $('#forgot-password, #go-back-login').on('click', function () {
        $('#login-form').slideToggle();
        $('#forgot-password-form').slideToggle();
    });

    form.on('submit(login)', function(data){
        //此处写登陆逻辑
        return true;
    });

    form.on('submit(retrieve-password)', function(data){
        //此处写密码找回逻辑
        layer.msg('密码找回邮件已发送到邮箱，请按照邮件提示操作。');
        $(':input', '#forgot-password-form').val('');
        return false;
    });
    
});