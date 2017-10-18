/* 检测是否ios app */
if (("standalone" in window.navigator) && window.navigator.standalone) {
    $('head').append('<style>body:before{display: block;content: " ";height:20px;top: 0;background:rgb(90,99,102);position:-webkit-sticky;position:sticky;}.version{top: .5rem!important;}</style>');
}



// 登录提交

// 登录提交
$(function() {
    $('#login-sub').click(function() {
        $('.form-control').removeClass('form-error');
        var usr = $('#login-name').val(),
            pwd = $('#login-pwd').val();

        if (usr == '' || pwd == '') {
            alert('请输入帐号密码');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'index.php?',
            dataType: 'json',
            data: { usr: usr, pwd: pwd, _alogin: 'yes' },
            error: function() {
                alert('服务器错误');
            },
            success: function(data) {
                if (data.code == 0) {
                    location.reload();
                } else {
                    alert(data.msg);
                }
            }
        })

    });
});

// 选择专辑
$(function() {
    $('.selalbum').click(function() {
        console.info($(this).attr('id'));
        $.fn.cookie('live_album', $(this).attr('id'), { expires: 10 });
        location.href = 'index.php';
    });
});


$(document).ready(function() {
    if (("standalone" in window.navigator) && window.navigator.standalone) {
        $('a').on('click', function(e) {
            e.preventDefault();
            var new_location = $(this).attr('href');
            if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined) {
                window.location = new_location;
            }
        });
    }
});