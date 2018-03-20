$(document).ready(function () {

    var refresh = function() {
        var path = []
        $.get("/branch_list_table/", function(data){
            if (data) {
                var table = $('#branchListTable').dataTable({
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
                            "width": "20px",
                            "render": function(data, type, row, meta) {
                                return '<input type="checkbox" id="' + row[0] + '">';
                            }
                        },
                        {
                            "title": "编排名称",
                            "class": "center",
                            "width": "120px",
                        },
                        {
                            "title": "编排id",
                            "class": "center",
                            "width": "250px",
                        },
                        {
                            "title": "泳道名",
                            "class": "center",
                            "width": "100px",
                        },
                        {
                            "title": "服务和分支对应关系",
                            "width": "150px",
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
                            "width": "80px",
                        },
                        {
                            "title": "create_time",
                            "class": "center",
                            "width": "120px",
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
        $("#myModalLabel").text("填写服务与分支对应关系");
        $("#branchList").hide();
        $("#swimlane_name").val("");

    }
    window.add = add;

    function getserviceinfo() {
        var name = $("#swimlane_name").val();
        if(name == ""){
            alert("请输入泳道名")
        }
        else{
        $.get("/get_service_list/", {'swimlanename': name}, function(data){
           if (data) {
                $("#branchList").show();
                var table = $('#branchList').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "bRetrieve": true,
                    'bDestroy':true,
                    "columns": [
                         {
                            "title": "Plus发布项名称",
                            "width": "70px",
                            "class": "center",
                        },
                    ],
                    "columnDefs": [{
                        "targets": 1,
                        "title": "提测分支",
                        "class": "center",
                         "render": function(data, type, row, meta) {
                             return '<input type="text" class="form-control1" value="qa"/>'
                          }
                    }],
                }).fnDestroy();
            }

        }, "json");
        }
    }
    window.getserviceinfo = getserviceinfo;


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
                $("#myModal").modal("show");
                $("#myModalLabel").text("编辑服务与分支对应关系");
                var listId = list[0];
                $.get("/branch_list_get/", {'list': listId}, function(data){
                    if (data) {
                    swimlanename = data[0];
                    $("#swimlane_name").val(swimlanename);
                    var dataarray =new Array();
                    for(var i=1;i<data.length;i++){
                        dataarray[i-1] = data[i];
                    }
                    $("#branchList").show();
                    var table = $('#branchList').dataTable({
                        "data": dataarray,
                        "lengthChange": true,//是否允许用户自定义显示数量
                        "bFilter": true, //列筛序功能
                        "bAutoWidth": true, //自动宽度
                        "bRetrieve": true,
                        'bDestroy':true,
                        "columns": [
                        {
                            "title": "Plus发布项名称",
                            "width": "70px",
                            "class": "center",
                        },
                        {
                            "title": "提测分支",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                             return '<input type="text" class="form-control1" value='+data+'>'
                          },

                        },
                        ]
                        }).fnDestroy();
                     }

                }, "json");

            }
            else
                alert("请选中一行");

    }
    window.edit = edit;


    $("#save").click( function (){
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
        if(list.length ==1){
            listid = list[0];
        }
        else
            listid = "";
       var title = $("#myModalLabel").text();
       var swimname = $("#swimlane_name").val();  //获取到泳道名称
       var tr_list = $("#branchList").find("tr"); //获取到服务信息
       var service_list = [];
       for(var i =1;i<tr_list.length;i++){
	     service_list.push(($(tr_list[i]).find("td"))[0].textContent);
       }
       var branch_list = [];     //获取到分支信息
       $("#branchList input[type='text']").each(function(){
         branch_list.push($(this).val());
      });
      $.post("/branch_list_add/", {'swimname':swimname, 'listid':listid, 'title':title, 'servicelist':JSON.stringify(service_list), 'branchlist':JSON.stringify(branch_list)}, function(data){
            alert(data);
            window.location.reload();
        }, "json");

    });


    $("#Delete").click( function (){
        var list = [];
        document.querySelectorAll('input:checked').forEach(e => list.push(e.id));
        $.get("/branch_list_del/", {'list': list.join(',')}, function(data){
            alert(data);
            window.location.reload();
        }, "json");
    });


    $("#Cancel").click( function (){
        $("#del_modal").modal("hide");
    });


    $("#loading").hide();


});
