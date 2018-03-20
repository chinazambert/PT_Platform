$(document).ready(function () {

    var refresh = function() {
        var path = []
        var platform = $('#Platfrom').children('option:selected').text();
        $.get("/config_list_table",{'platform':platform}, function(data){
            if (data) {
                var table = $('#staticconfigTable').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "searching": true, //搜索框
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "scrollX":true,  //横向滚动条
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
                            "title": "服务PLUS发布项名称",
                            "class": "center",
                        },
                        {
                            "title": "静态代码扫描job名称",
                        },
                        {
                            "title": "git仓库地址",
                        },
                        {
                            "title": "sonar配置",
                            "render": function(data, type, row, meta) {
                                return '<td><div>' + row[4] + '</div></td>';
                            }
                        },
                        {
                            "title": "下游job名称",
                            "class": "center",
                        },
                        {
                            "title": "大象通知人",
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
                         '<i class="ace-icon fa fa-pencil bigger-100 orange"></i>编辑</button>'+
                         '&nbsp;&nbsp;' +
                         '<button type="button" id="deleteRow" class="btn btn-white btn-danger btn-bold" onclick="del()" >' +
                         '<i class="ace-icon fa fa-trash-o bigger-100 red"></i>删除</button>'
                         );

                    }
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }


    function add() {
        $("#addModel_config").modal("show");
        $("#myModalLabel").text("新增静态代码扫描配置");
        $("#plus_name").text();
        $("#job_name").text();
        $("#git_url").text();
        $("#sonar_config").html();
        $("#next_job").text();
        $("#dx_notify_name").text();
        $("#Platform_add").get(0).selectedIndex = 0;
    }
    window.add = add;

    function selectPlatfrom(obj) {
        var platform = $(obj).children('option:selected').text();
        $.get("/config_list_table",{'platform':platform}, function(data){
            if (data) {
                var table = $("#staticconfigTable").dataTable();
                if (table) {
                    table.fnClearTable();    //清空数据
                    table.fnDestroy();       //销毁datatable
                }
                $('#staticconfigTable').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "searching": true, //搜索框
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "scrollX":true,  //横向滚动条
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
                            "title": "服务PLUS发布项名称",
                            "class": "center",
                        },
                        {
                            "title": "静态代码扫描job名称",
                        },
                        {
                            "title": "git仓库地址",
                        },
                        {
                            "title": "sonar配置",
                            "render": function(data, type, row, meta) {
                                return '<td><div>' + row[4] + '</div></td>';
                            }
                        },
                        {
                            "title": "下游job名称",
                            "class": "center",
                        },
                        {
                            "title": "大象通知人",
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
                         '<i class="ace-icon fa fa-pencil bigger-100 orange"></i>编辑</button>'+
                         '&nbsp;&nbsp;' +
                         '<button type="button" id="deleteRow" class="btn btn-white btn-danger btn-bold" onclick="del()" >' +
                         '<i class="ace-icon fa fa-trash-o bigger-100 red"></i>删除</button>'
                         );

                    }
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }
    window.selectPlatfrom = selectPlatfrom

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
            if (list.length > 1){
                alert("选中了多行");
            }
            else if (list.length ==1) {
                $("#addModel_config").modal("show");
                $("#myModalLabel").text("编辑静态代码扫描配置");
                var listId = list[0];
                $.get("/config_list_get/", {'listid': listId}, function(data){
                    if(data){
                        if(data[0]=="POS组"){
                            $("#Platform_add").get(0).selectedIndex = 0;
                        }
                        else if(data[0]=="管家组"){
                            $("#Platform_add").get(0).selectedIndex = 1;
                        }
                        else if(data[0]=="点餐组"){
                            $("#Platform_add").get(0).selectedIndex = 2;
                        }
                        else if(data[0]=="会员组"){
                            $("#Platform_add").get(0).selectedIndex = 3;
                        }
                        else if(data[0]=="M端"){
                            $("#Platform_add").get(0).selectedIndex = 4;
                        }
                        $("#plus_name").text(data[1]);
                        $("#job_name").text(data[2]);
                        $("#git_url").text(data[3]);
                        $("#sonar_config").html(data[4]);
                        $("#next_job").text(data[5]);
                        $("#dx_notify_name").text(data[6]);
                    }
                    else{
                        alert("获取数据失败！");
                    }


                }, "json");

            }
            else
                alert("请选中一行");
    }
    window.edit = edit;


    $("#save_config").click( function (){    //保存配置信息
       var title = $("#myModalLabel").text();
       var platform = $('#Platform_add').find("option:selected").text();
       var plus_name = $.trim($("#plus_name").text());
       var job_name = $.trim($("#job_name").text());
       var git_url = $.trim($("#git_url").text());
       var sonar_config = $("#sonar_config").html().replace(/<\/div>/g, "\n").replace(/<div>/g, "");;
       var next_job = $.trim($("#next_job").text());
       var dx_notify_name = $.trim($("#dx_notify_name").text());

      $.post("/new_config_add/", {'platform':platform, 'title':title, 'plus_name':plus_name, 'job_name':job_name, 'git_url':git_url, 'sonar_config':sonar_config, 'next_job':next_job, 'dx_notify_name':dx_notify_name}, function(data){
            alert(data);
            window.location.reload();
        }, "json");
    });


    $("#Delete").click( function (){
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
        $.get("/config_list_del/", {'list': list.join(',')}, function(data){
            alert(data);
            window.location.reload();
        }, "json");
    });


    $("#Cancel").click( function (){
        $("#del_modal").modal("hide");
    });

    $("#loading").hide();

});
