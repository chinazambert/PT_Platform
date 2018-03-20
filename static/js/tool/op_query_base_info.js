$(document).ready(function () {
    $("#getBindInfo").click(function () {
        var businessId = $("#businessId").val();
        var developerId = $("#developerId").val();
        var epoiId = $("#epoiId").val();
        var env = $("#env").val();
        if (!businessId || !developerId || !epoiId) {
            alert("参数不全");
            return;
        }
       $.get("/getBindInfo/", {'businessId': businessId, 'developerId': developerId, 'epoiId': epoiId, 'env': env}, function(data){
            if (data.data) {
                var info = data.data;
                var poiParam = '' + info.developerId + ',' + info.poiId + ',' + info.businessId;
                var newRow = '<tr>' +
                    '<th style="width: 60px;">' + info.appId + '</th>' +
                    '<th style="width: 180px;">' + info.bizAcctId + '</th>' +
                    '<th style="width: 160px;">' + info.businessId + '</th>' +
                    '<th style="width: 180px;">' + info.developerId + '</th>' +
                    '<th style="width: 180px;">' + info.ePoiId + '</th>' +
                    '<th style="width: 160px;"><a onclick="showPoiInfo(' + poiParam + ')" href="javascript:void(0);">' + info.poiId + '</a></th>' +
                    '<th style="width: 200px;">' + new Date(info.createdTime).toLocaleString() + '</th>' +
                    '<th style="width: 200px;">' + new Date(info.modifyTime).toLocaleString() + '</th>' +
                    '</tr>';
                $("#bindInfoTable").show();
                $("#bindInfoTable  tr:not(:first)").remove();
                $("#bindInfoTable tr:last").after(newRow);
            } else if (data.error) {
                alert(data.error.message)
            } else {
                alert("没有绑定信息")
            }
        }, "json");
    });
});

function showPoiInfo(developerId, poiId, businessId) {
    var businessId = $("#businessId").val();
    var developerId = $("#developerId").val();
    var env = $("#env").val();
    var poiId = poiId
    $.get("/getPoiInfo/", {'developerId': developerId, 'businessId': businessId, 'poiId': poiId, 'env': env}, function(data){
        if (data.data) {
            var poiInfo = data.data;
            var showInfo = '';
            showInfo += '    美团门店id(poiId)   : ' + poiInfo.poiId + '\n';
            showInfo += '  业务id(businessId)    : ' + poiInfo.businessId + '\n';
            showInfo += '开发者id(developerId)   : ' + poiInfo.developerId + '\n';
            showInfo += '       门店名称(name)   : ' + poiInfo.name + '\n';
            showInfo += '    门店地址(address)   : ' + poiInfo.address + '\n';
            showInfo += '      门店电话(phone)   : ' + poiInfo.phone;
            alert(showInfo);
        } else if (data.error) {
            alert(data.error.message)
        } else {
            alert("对应的poi信息不存在");
        }
    }, "json");
}

$(document).ready(function(){
    $("#getTokenByDevIdAndEpoiId").click(function(){
        var developerId = $("#developerId").val();
        var epoiId = $("#epoiId").val();
        var env = $("#env").val();
        if (!developerId || !epoiId) {
            alert("参数不全");
            return;
            }
    $.get("/getToken", {'developerId': developerId, 'epoiId': epoiId, 'env': env}, function(data){
         if (data.data) {
                var newRow = '<tr>' +
                '<th style="width: 60px;">' + data.data  + '</th>' +
                '</tr>';
                $("#token").show().css("line-height","30px");
                $("#token  tr:not(:first)").remove();
                $("#token tr:last").after(newRow).css("line-height","30px");
            } else if (data.error) {
                alert(data.error.message)
            } else {
                alert("没有token")
            }

//        	if (data.data) {
//        		alert(data.data);
//        	} else if (data.error) {
//        		alert(data.error.message)
//       		} else {
//        		alert("没有token")
//        	}
    }, "json");
    });
 });

$(document).ready(function(){
    $("#getDeveloperInfo").click(function(){
        var developerId = $("#developerId").val();
        var env = $("#env").val();
        if (!developerId) {
            alert("请输入developerId");
            return;
            }
        $.get("/getDeveloperInfo/", {'developerId': developerId, 'env': env}, function(data){
            if (data.data) {
                var info = data.data;
                var infoStr = '';
                infoStr += '开发者名称：' + info.name + '\n';
                infoStr += '开发者别名：' + info.alias + '\n';
                infoStr += '电话：' + info.phone + '\n';
                infoStr += '新建时间：' + new Date(info.createdTime).toLocaleString();
                alert(infoStr);
            } else if (data.error) {
                alert(data.error.message)
            } else {
                alert("开发者不存在")
            }
        }, "json");
    });
});