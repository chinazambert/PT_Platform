$(document).ready(function () {
    var lastPlatform = "";

    var refresh = function() {
        var path = []
        $.get("/swim_list_table/", function(data){
            if (data) {
                var table = $('#swimLineListTable').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "searching": true, //搜索框
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "columnDefs": [
                       {
                           orderable: false,
                           targets: 0 },
                    ],//第一列禁止排序
                    "columns": [
                        {
                            "title": "#",
                            "render": function(data, type, row, meta) {
                                return '<input type="checkbox" id="' + row[0] + '">';
                            }
                        },
                        {
                            "title": "Platform",
                            "class": "center",
                            "width": "100px",
                        },
                        {
                            "title": "Feature",
                            "class": "center",
                            "width": "180px",
                        },
                        {
                            "title": "appKey: 泳道域名",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                var html = '';
                                for (i = 0; i < data.length; i++)
                                {
                                    html += data[i] + "<br />"
                                }
                                return html;
                            }
                        },
                        {
                            "title": "author",
                            "class": "center",
                        },
                        {
                            "title": "create_time",
                            "class": "center",
                        },
                    ],
                    "dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-4'><'col-xs-6'f>r>" +
                            "t" +
                            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
                    initComplete: function () {
                         $("#mytool").append('<button type="button" id="addRow" class="btn btn-white btn-info btn-bold" onclick="add()">' +
                         '<i class="ace-icon fa fa-plus-circle bigger-100"></i>添加</button>'+
                         '&nbsp;&nbsp;' +
                         '<button type="button" id="editRow" class="btn btn-white btn-warning btn-bold" onclick="edit()" >' +
                         '<i class="ace-icon fa fa-pencil bigger-100 orange"></i>更新</button>'+
                         '&nbsp;&nbsp;' +
                         '<button type="button" id="updateRow" class="btn btn-white btn-success btn-bold" onclick="update()" >' +
                         '<i class="ace-icon fa fa-pencil bigger-100 green"></i>手动编辑</button>'+
                         '&nbsp;&nbsp;' +
                         '<button type="button" id="deleteRow" class="btn btn-white btn-danger btn-bold" onclick="del()" >' +
                         '<i class="ace-icon fa fa-trash-o bigger-100 red"></i>删除</button>' );

                    }
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }

    function add() {
        $("#myModal").modal("show");
        $("#myModalLabel").text("新增泳道");
        $("#editplat").hide();
        $("#feature_div").hide();
        $("#" + lastPlatform).hide();
        $("#addplat").show();
        $("#chooseplat").show();
        $("#swimlane_name").val("");   //清空已填写泳道名
        $("input[name='Platfrom']").each(function () {
            $(this).attr("checked",false);  //清空已选中平台
          });
    }
    window.add = add;

    function update() {
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
            if (list.length > 1){
                alert("选中了多行");
            }
            else if (list.length ==1) {
                var listId = list[0];
                $.get("/swim_list_get/", {'list': listId}, function(data){
                    $("#myModal").modal("show");
                    $("#myModalLabel").text("手动编辑泳道");
                    $("#chooseplat").hide();
                    $("#addplat").hide();
                    $("#editplat").show();
                    $("#feature_div").show();
                    $("#" + lastPlatform).hide();
                    if(data['platform']== "POS")
                    {
                      $("#Platform").get(0).selectedIndex = 0;
                      $("#Feature").val(data['feature']);
                      $("#pos").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "CLOUD_API"){
                            $("#pos_CLOUD_API").val(domainlist[key]);
                        }
                        else if(key == "BUFFET_API"){
                            $("#pos_BUFFET_API").val(domainlist[key]);
                        }
                        else if(key == "CRM_API"){
                            $("#pos_CRM_API").val(domainlist[key]);
                        }
                        else if(key == "PLATFORM_API"){
                            $("#pos_PLATFORM_API").val(domainlist[key]);
                        }
                        else
                            $("#pos_WAIMAI_H5").val(domainlist[key]);
                      }
                      lastPlatform = "pos";
                    }
                    else if(data['platform']== "服务员APP")
                    {
                      $("#Platform").get(0).selectedIndex = 1;
                      $("#Feature").val(data['feature']);
                      $("#waiter").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "CLOUD_API"){
                            $("#waiter_CLOUD_API").val(domainlist[key]);
                        }
                        else if(key == "CRM_API"){
                            $("#waiter_CRM_API").val(domainlist[key]);
                        }
                        else if(key == "PLATFORM_API"){
                            $("#waiter_PLATFORM_API").val(domainlist[key]);
                        }
                        else
                            $("#waiter_WAIMAI_H5").val(domainlist[key]);
                      }
                      lastPlatform = "waiter";
                    }
                    else if(data['platform']== "管家APP")
                    {
                      $("#Platform").get(0).selectedIndex = 2;
                      $("#Feature").val(data['feature']);
                      $("#boss").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "adminAPI"){
                            $("#boss_adminAPI").val(domainlist[key]);
                        }
                        else if(key == "bossAPI"){
                            $("#boss_bossAPI").val(domainlist[key]);
                        }
                        else if(key == "platformAPI"){
                            $("#boss_platformAPI").val(domainlist[key]);
                        }
                        else
                            $("#boss_settleAPI").val(domainlist[key]);
                      }
                      lastPlatform = "boss";
                    }
                    else if(data['platform']== "轻收银")
                    {
                      $("#Platform").get(0).selectedIndex = 3;
                      $("#Feature").val(data['feature']);
                      $("#mcashier").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "API_DOMAIN"){
                            $("#API_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "POS_API_DOMAIN"){
                            $("#POS_API_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "WEB_B_DOMAIN"){
                            $("#WEB_B_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "WEB_C_DOMAIN"){
                            $("#WEB_C_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "WEB_B_SUPPORT_DOMAIN"){
                            $("#WEB_B_SUPPORT_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "WM_API_DOMAIN"){
                            $("#WM_API_DOMAIN").val(domainlist[key]);
                        }
                        else if(key == "QR_CODE_DOMAIN"){
                            $("#QR_CODE_DOMAIN").val(domainlist[key]);
                        }
                      }
                      lastPlatform = "mcashier";
                    }
                    else if(data['platform']== "零售管家")
                    {
                      $("#Platform").get(0).selectedIndex = 4;
                      $("#Feature").val(data['feature']);
                      $("#retail_admin").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "API_DOMAIN_TEST"){
                            $("#API_DOMAIN_TEST").val(domainlist[key]);
                        }
                        else if(key == "API_DOMAIN_PAY_TEST"){
                            $("#API_DOMAIN_PAY_TEST").val(domainlist[key]);
                        }
                        else if(key == "WEB_B_DOMAIN_TEST"){
                            $("#WEB_B_DOMAIN_TEST").val(domainlist[key]);
                        }
                      }
                      lastPlatform = "retail_admin";
                    }
                    else if(data['platform']== "零售POS")
                    {
                      $("#Platform").get(0).selectedIndex = 5;
                      $("#Feature").val(data['feature']);
                      $("#retail_pos").show();
                      var domainlist = data['domainlist'];
                      for(var key in domainlist){
                        if(key == "API_DOMAIN_TEST_POS"){
                            $("#API_DOMAIN_TEST_POS").val(domainlist[key]);
                        }
                        else if(key == "API_DOMAIN_PAY_TEST_POS"){
                            $("#API_DOMAIN_PAY_TEST_POS").val(domainlist[key]);
                        }
                        else if(key == "API_ADMIN_DOMAIN_TEST"){
                            $("#API_ADMIN_DOMAIN_TEST").val(domainlist[key]);
                        }
                      }
                      lastPlatform = "retail_pos";
                    }
                }, "json");

            }
            else
                alert("请选中一行");
    }
    window.update = update;


    function del() {
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
            if (list.join(',')){
                $("#del_modal").modal("show");
            } else {
                alert("请选中一行");
            }
    }
    window.del = del;

    $("#loading").show();

    refresh();

    function edit() {
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
        if(list.length <= 0){
            alert("请勾选需要更新的泳道域名！")
        }
        else{
            $.get("/swim_list_edit/", {'list': JSON.stringify(list)}, function(data){
                alert(data);
                window.location.reload();
            }, "json");
        }

    }
    window.edit = edit;


    $("#save").click( function (){
        var title = $("#myModalLabel").text();
        if (title == "新增泳道"){
            var swimlane_name = $.trim($("#swimlane_name").val()); //删除前后空格
            var list = [];
            document.querySelectorAll("input[name='Platfrom']:checked").forEach(e => list.push(e.value));
            if(swimlane_name === "" && list.length === 0){
                alert("请输入泳道名及勾选平台！")
            }
            else if(swimlane_name === ""){
                alert("请输入泳道名！")
            }
            else if(list.length === 0){
                alert("请选择平台！")
            }
            else{
                $.post("/swim_list_add/", {'swimlanename':swimlane_name, 'platformlist':JSON.stringify(list)}, function(data){
                alert(data);
                window.location.reload();
            }, "json");
            }
        }
        else{
            var Platform = $("#Platform").val();
            var Feature = $("#Feature").val();
            var list = [];
            document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
            if(list.length ==1){
                listid = list[0];
            }
            if (Platform === "pos") {
                var params = {};
                ['pos_CLOUD_API', 'pos_PLATFORM_API', 'pos_WAIMAI_H5', 'pos_CRM_API', 'pos_BUFFET_API'].forEach(id => {
                    params[id] = $("#" + id).val();
             });
             } else if (Platform === "waiter"){
                var params = {};
                ['waiter_CLOUD_API', 'waiter_PLATFORM_API', 'waiter_WAIMAI_H5', 'waiter_CRM_API'].forEach(id => {
                    params[id] = $("#" + id).val();
            });
            } else if (Platform === "boss") {
                var params = {};
                ['boss_platformAPI', 'boss_bossAPI', 'boss_adminAPI', 'boss_settleAPI'].forEach(id => {
                    params[id] = $("#" + id).val();
            });
            } else if (Platform === "mcashier") {
                var params = {};
                ['API_DOMAIN', 'POS_API_DOMAIN', 'WEB_B_DOMAIN', 'WEB_C_DOMAIN', 'WEB_B_SUPPORT_DOMAIN', 'WM_API_DOMAIN', 'QR_CODE_DOMAIN'].forEach(id => {
                    params[id] = $("#" + id).val();
            });
            }else if (Platform === "retail_admin") {
                var params = {};
                ['API_DOMAIN_TEST', 'API_DOMAIN_PAY_TEST', 'WEB_B_DOMAIN_TEST'].forEach(id => {
                    params[id] = $("#" + id).val();
            });
            }else if (Platform === "retail_pos") {
                var params = {};
                ['API_DOMAIN_TEST_POS', 'API_DOMAIN_PAY_TEST_POS', 'API_ADMIN_DOMAIN_TEST'].forEach(id => {
                    params[id] = $("#" + id).val();
            });
            }
            var swim_domain = params;
            $.post("/swim_list_update/", {'listid':listid, 'platform':Platform, 'feature':Feature, 'swim_domain':JSON.stringify(swim_domain)}, function(data){
                alert(data);
                window.location.reload();
            }, "json");
            }
    });

    $("#Delete").click( function (){
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
        $.get("/swim_list_del/", {'list': list.join(',')}, function(data){
            alert(data);
            window.location.reload();
        }, "json");
    });

    $("#Cancel").click( function (){
        $("#del_modal").modal("hide");
    });

    $("#api_content").click( function () {
         $("#api-modal").modal("show");
    });

    var textResJson= {
        "code":200,
        "data":[
            {
                "hosts":{
                    "PLATFORM_API":"http://xxx",
                    "BUFFET_API":"http://xxx",
                    "CLOUD_API":"http://xxx",
                    "CRM_API":"http://xxx",
                    "WAIMAI_H5":"http://xxx"
                },
                "feature":"分支名称",
                "author":"liuyue14"
            }
        ]
    }
    $("#textResJson").text(JSON.stringify(textResJson,null,2));

    $("#loading").hide();


});
