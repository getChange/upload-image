$(function() {
    var formRoom = $('.form-room'),
        formRiadioLabeL = $('.form-radio label:nth-child(1)'),
        formRiadioLabeR = $('.form-radio label:nth-child(2)'),
        em = $('.form-room em');

    formRiadioLabeL.click(function() {
        formRiadioLabeR.removeClass('checked');
        $(this).addClass('checked');
        formRoom.find('em').css({ 'left': '20%' })
    });
    formRiadioLabeR.click(function() {
        formRiadioLabeL.removeClass('checked');
        $(this).addClass('checked');
        formRoom.find('em').css({ 'left': '80%' })
    });
});


document.querySelector('#fileInput').addEventListener('change', function() {
    lrz(this.files[0], { width: 600, quality: 0.3 })
        .then(function(rst) {
            // 成功执行
            // alert(rst.fileLen/1024)
            $('#canvas').attr('src', rst.base64);
            $('.form-photo').addClass('form-photo-active');
            console.info($('#canvas'));

        })
        .catch(function(err) {
            // 失败执行
            console.info('error');

            $('#canvas').attr('src', '');
        })
        .always(function() {
            // 不管是成功失败，都会执行
        });
});





// 提交数据 / 重置数据
$(function() {
    var issub = false;
    $('.submit').click(function() {
        if (issub) {
            return;
        }
        issub = true;
        $.ajax({
            type: 'POST',
            url: "?",
            dataType: 'json',
            data: { tn: 'post', types: $('input[name="types"]:checked').val(), text: $('#text').val(), photo: $('#canvas').attr('src') },
            success: function(data) {
                console.info(data.code);
                if (data.code == 0) {
                    // 成功
                    alert('发布完成');
                    rest();

                } else if (data.code == 99) {
                    //强刷页面
                    alert(data.msg);
                    location.href = 'index.php?';
                } else {
                    alert(data.msg);
                }
                console.info(data);
            },
            beforeSend: function() {
                $('.submit').html('正在发布...');
            },
            error: function() {
                alert('服务器连接错误');
            },
            complete: function() {
                issub = false;
                $('.submit').html('检查无误确认提交');
            }
        });

    });
    var rest = function() {
        $('#text').val('');
        $('.form-img').html('<img id="canvas" style="width:100%" />');
        $('.form-photo').removeClass('form-photo-active');
    }

    $('.reset').click(function() {
        rest();
    });
});


// localStorage 临时存储
$(function() {
    if (window.localStorage) {
        $("#text").blur(function() {
            localStorage.setItem('texts', $("#text").val());
        });

        if (localStorage.texts) {
            $("#text").val(localStorage.getItem('texts'));
        }

        $('.reset,.submit').bind('click', function() {
            localStorage.removeItem('texts');
        });

    }
});