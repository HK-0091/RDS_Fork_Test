let json_data;
let ajaxRequest = null;
//중복실행 방안 찾기, 같은 로봇이면 중복 방지 다른 로봇이면 가능. havegoods
function sendAjaxRequest_load(json_value, fork_value) {
    json_data.select_fork = fork_value; //객체 추가하기
    if (ajaxRequest !== null) {
        ajaxRequest.abort();
    }
    $.ajax({
        url: "/fork_load",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json_value),
        timeout: 5000,  //필수!!
        success: function (responseData) {
            console.log(responseData);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function sendAjaxRequest_unload(json_value, fork_value) {
    json_data.select_fork = fork_value; //객체 추가하기
    if (ajaxRequest !== null) {
        ajaxRequest.abort();
    }
    $.ajax({
        url: "/fork_unload",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json_value),
        timeout: 5000,  //필수!!
        success: function (responseData) {
            console.log(responseData);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

$(document).ready(function () {
    $('.load_unload_box').hide();
    $('.box').on('click', function () {
        $('.load_unload_box').show();
        let binTask_number = $(this).text().match(/\d+/)[0];
        let fork_mid_height = $(this).closest('.boxLine').attr("class").split(" ")[1];
        let fork_load = $(this).closest('.boxLine').attr("class").split(" ")[2];
        let fork_complete_location = $(this).closest('.boxLine').attr("class").split(" ")[3];
        json_data = {
            "binTask_number": binTask_number,
            "fork_complete_location": fork_complete_location,
            "fork_load": fork_load,
            "fork_mid_height": fork_mid_height
        }
    });
});


let load_lock = false;
$('.load_btn').click(() => {
    if (!load_lock != false) {
        console.log("load_lock: Off");
        let select_fork = $('#selectA').val();
        sendAjaxRequest_load(json_data, select_fork);
        load_lock = true;
        //연속 클릭 방지 3초 딜레이
        setTimeout(() => {
            load_lock = false;
            console.log("load_lock: On")
        }, 3000)
    }
});

let unload_lock = false;
$('.unload_btn').click(() => {
    if (!unload_lock != false) {
        console.log("unload_lock: Off");
        let select_fork = $('#selectA').val();
        sendAjaxRequest_unload(json_data, select_fork);
        unload_lock = true;
        setTimeout(() => {
            unload_lock = false;
            console.log("unload_lock: On")
        }, 3000);
    }
});

$('.closeBtnBox').click(function () {
    $('.load_unload_box').hide();
});

$('.fullScreenBtn').on("click", function () {
    function fullscreenToggle() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            $('.fullScreenBtn').text("full screen out");
        }else{
            document.exitFullscreen();
            $('.fullScreenBtn').text("full screen in");
        }
    }
    fullscreenToggle();
});