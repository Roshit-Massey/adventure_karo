function query(e, t, n, r, success, error, showError = true, tokenEnable = true, noLoader = true) {
    var params = {}
    if (t == 'GET' && n != undefined) {
        params = $.extend({}, params, n);
        n = undefined;
    }
    var Token = '';
    if(tokenEnable)
        Token =  localStorage.getItem("authorization"); 
    if(noLoader)
        $('#loader-wrap').show();
    return $.ajax({
        url: "/api" + e + "?" + jQuery.param(params),
        async: r,
        method: t,
        data: n != undefined ? JSON.stringify(n) : '',
        dataType: "json",
        contentType: "application/json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            "Authorization": Token
        },
        success: function (msg) {
            success(msg);
            $('#loader-wrap').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (showError)
                showAPIError(jqXHR.status, (jqXHR.responseJSON ? jqXHR.responseJSON : (jqXHR.responseText === "Unauthorized" ? { errors: ['Invalid Credentials'] } : jqXHR.responseText)));
            if (error != undefined) error(jqXHR);
            $('#loader-wrap').hide();
        }
    })
}

function mediaQuery(e, t, n, r, success, error, tokenEnable = true, noLoader = true, showData = true) {
    if (typeof mprogress != 'undefined') {
        mprogress.start();
    }
    var Token = '';
    if(tokenEnable)
        Token =  localStorage.getItem("authorization");
    if(noLoader)
        $('#loader-wrap').show();
    return $.ajax({
        url: "/api" + e,
        async: r,
        method: t,
        data: n != undefined ? n : '',
        processData: false,
        contentType: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            "Authorization": Token
        },
        success: function (msg) {
            if (typeof mprogress != 'undefined') {
                mprogress.end(true);
            }
            success(msg);
            if(showData)
                $('#loader-wrap').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (typeof mprogress != 'undefined') {
                mprogress.end(true);
            }
            showAPIError(jqXHR.status, (jqXHR.responseJSON ? jqXHR.responseJSON : (jqXHR.responseText === "Unauthorized" ? { errors: ['Invalid Credentials'] } : jqXHR.responseText)));
            if (error != undefined) error(jqXHR.responseJSON);
            $('#loader-wrap').hide();
        }
    })
}

var api = {
    auth: {
        login: function (data, success, error) {
            return query('/login/', "POST", data, 1, success, error)
        },
        logout: function (data, success, error) {
            return query('/logout/', "GET", data, 1, success, error)
        },
    },
    dashboard: {
        count: function (data, success, error) {
            return query('/count/', "GET", data, 1, success, error)
        },
    },
    activity: {
        post: function (data, success, error) {
            return query('/add-activity/', "POST", data, 1, success, error)
        },
        show: function (data, success, error) {
            return query('/show-activity/', "GET", data, 1, success, error)
        },
        patch: function (data, success, error) {
            return query('/update-activity/', "PATCH", data, 1, success, error)
        },
        delete: function (data, success, error) {
            return query('/delete-activity/', "DELETE", data, 1, success, error)
        },
    },
}