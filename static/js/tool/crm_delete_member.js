$(document).ready(function(){
    $("#deleteMember").click(function(){
        var mobile = $("#inputMemberId").val();
        var tenantId = $("#inputTenantId").val();
        var env = $("#env").val();
        if (!mobile || !tenantId) {
            alert("请输入租户ID和会员卡号");
            return;
        }

        $.get("/crm_delete_member/", {'mobile': mobile, 'tenantId': tenantId, 'env': env}, function(data){
            if (data.data) {
                var str = data.data
                var info = str.replace(/。/g, "<br/>")
                $('#result').html(info).css("line-height","30px");
            } else {
                alert("输入参数有误.")
            }
        }, "json");
    });
});