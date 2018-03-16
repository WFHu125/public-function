/**
 * Created by k on 2017/11/10.
 */
virtual = {};

//服务器请求基本地址
virtual.serverBaseUrl = 'https://www.chanyecloud.com/chanyecloud-user'; //购买云主机

//封装一个基本请求
virtual.web_query = function(fun_url, params, onSuccess, onError, type, dataType, async) {
    async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    // dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
    // fun_url = virtual.serverBaseUrl + fun_url;
    onSuccess = arguments[2] ? arguments[2] : function() {};
    // onSuccess = function() {};
    onError = arguments[3] ? arguments[3] : function() {};
    $.ajax({
        url: fun_url,
        type: type,
        dataType: 'json',
        contentType: 'application/json',
        timeout: 20000,
        async: true,
        headers: {
            'X-Auth-Token': virtual.access_token
        },
        data: params,
        success: function(data) {
            onSuccess(data);
        },
        error: function(xhr) {
            onError(xhr);
        }
    })
};
// 封装一个的get请求
// url 请求地址
// params 参数数据
// onSuccess 成功回调
// onError 失败回调
//兼容ie
virtual.web_get = function(url, params, onSuccess, onError) {
    virtual.web_query(url, params, onSuccess, onError, "GET");
};
virtual.web_get1 = function(url, params, onSuccess, onError) {
    virtual.web_query(url + "?t=" + Math.random(), params, onSuccess, onError, "GET");
};
virtual.web_get2 = function(url, params, onSuccess, onError) {
    virtual.web_query(url + "&t=" + Math.random(), params, onSuccess, onError, "GET");
};

virtual.web_post = function(url, params, onSuccess, onError) {
    virtual.web_query(url, params, onSuccess, onError, "POST");
};
virtual.web_put = function(url, params, onSuccess, onError) {
    virtual.web_query(url, params, onSuccess, onError, "PUT");
};
virtual.web_delete = function(url, params, onSuccess, onError) {
    virtual.web_query(url, params, onSuccess, onError, "DELETE");
};

Array.prototype.distinct = function() {
    var arr = this,
        i,
        obj = {},
        result = [],
        len = arr.length;
    for (i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) { //如果能查找到，证明数组元素重复了
            obj[arr[i]] = 1;
            result.push(arr[i]);
        }
    }
    return result;
};

//判断一个对象是否为空
virtual.isEmptyObject = function(obj) {
    for (var key in obj) {
        return true;
    }
    return false;
};
//获取地址栏参数
virtual.GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

virtual.GetQueryParam = function(url) {
    var request = new UrlSearch(url);
    return request.marker;
}

function UrlSearch(url) {
    var name, value;
    var str = url; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}


Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
            // millisecond
    }

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
