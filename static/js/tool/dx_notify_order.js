    $("#getOrderbygroup").click( function (){
        var groupname = $('#group option:selected').val(); //保存选中的组
        $.get("/get_order_list/",  {'group': groupname}, function(data){
            if (data) {
                var table = $('#orderListTable').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "bRetrieve": true,
                    'bDestroy':true,
                    "columns": [
                        {
                            "title": "#",
                            "width": "20px",
                            "render": function(data, type, row, meta) {
                                return '<input type="checkbox" id="' + row[0] + '">';
                            }
                        },
                        {
                            "title": "员工姓名",
                            "class": "center",
                            "width": "120px",
                        },
                        {
                            "title": "线上问题跟踪顺序",
                            "class": "center",
                            "width": "100px",
                        },
                        {
                            "title": "主持周会顺序",
                            "class": "center",
                            "width": "100px",
                        },
                    ],
                }).fnDestroy();
            } else {
                alert("没有记录");
            }
        }, "json");

    });

        $("#editOrderbygroup").click( function (){
            if($("#editOrderbygroup").text()=="编辑")
            {
             $("#editOrderbygroup").text('保存');
             var groupname = $('#group option:selected').val(); //保存选中的组
             $.get("/get_order_list/",  {'group': groupname}, function(data){
                if (data) {
                var table = $('#orderListTable').dataTable({
                    "data": data,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "bRetrieve": true,
                    'bDestroy':true,
                    "columns": [
                        {
                            "title": "#",
                            "width": "20px",
                            "render": function(data, type, row, meta) {
                                return '<input type="checkbox" id="' + row[0] + '">';
                            }
                        },
                        {
                            "title": "员工姓名",
                            "class": "center",
                            "width": "120px",
                        },
                        {
                            "title": "线上问题跟踪顺序",
                            "class": "center",
                            "width": "100px",
                            "render": function(data, type, row, meta) {
                             return '<input type="text" class="form-control1" value='+data+'>'
                             }
                        },
                        {
                            "title": "主持周会顺序",
                            "class": "center",
                            "width": "100px",
                            "render": function(data, type, row, meta) {
                             return '<input type="text" class="form-control1" value='+data+'>'
                             }
                        },
                    ],
                }).fnDestroy();
            } else {
                alert("没有记录");
            }
        }, "json");
            }
            else{
                var groupname = $('#group option:selected').val();
                $("#editOrderbygroup").text('编辑');
                var tr_list = $("#orderListTable").find("tr"); //获取到表格各行
                var name_list = [];
                for(var i =1;i<tr_list.length;i++){
	                name_list.push(($(tr_list[i]).find("td"))[1].textContent); // 获取到姓名列保存
                }

                var trace_order = [];
                for(var i =1;i<tr_list.length;i++){
	                trace_order.push(($(tr_list[i]).find("input"))[1].value); // 获取到线上问题跟踪列保存
                }

                var host_order = [];
                for(var i =1;i<tr_list.length;i++){
	                host_order.push(($(tr_list[i]).find("input"))[2].value); // 获取到主持周会列保存
                }
                $.post("/order_list_update/", {'namelist':JSON.stringify(name_list), 'tracelist':JSON.stringify(trace_order), 'hostlist':JSON.stringify(host_order)}, function(data){
                    $.get("/get_order_list/",  {'group': groupname}, function(data){
                        if (data) {
                        var table = $('#orderListTable').dataTable({
                            "data": data,
                            "lengthChange": true,//是否允许用户自定义显示数量
                            "bFilter": true, //列筛序功能
                            "bAutoWidth": true, //自动宽度
                            "bRetrieve": true,
                            'bDestroy':true,
                            "columns": [
                                {
                                    "title": "#",
                                    "width": "20px",
                                    "render": function(data, type, row, meta) {
                                        return '<input type="checkbox" id="' + row[0] + '">';
                                     }
                                },
                                {
                                    "title": "员工姓名",
                                    "class": "center",
                                    "width": "120px",
                                },
                                {
                                    "title": "线上问题跟踪顺序",
                                    "class": "center",
                                    "width": "100px",
                                },
                                {
                                    "title": "主持周会顺序",
                                    "class": "center",
                                    "width": "100px",
                                },
                            ],
                        }).fnDestroy();
                    } else {
                        alert("没有记录");
                    }
                }, "json");
                }, "json");
            }
    });

       $("#addOrderbygroup").click( function (){
        $("#employee_name").val("");
        $("#employee_mis").val("");
        $("#trace_num").val("");
        $("#host_num").val("");
        $("#addModel").modal("show");
       });


       $("#save").click( function (){
            var name = $.trim($("#employee_name").val());
            var mis = $.trim($("#employee_mis").val());
            var tracenum = $.trim($("#trace_num").val());
            var hostnum = $.trim($("#host_num").val());
            var groupname = $('#group option:selected').val();
            $("#addModel").modal("hide");
            $.post("/order_list_add/", {'group':groupname, 'name':name, 'mis':mis, 'tracenum':tracenum, 'hostnum':hostnum}, function(data){
                    alert(data);
                    $.get("/get_order_list/",  {'group': groupname}, function(data){
                        if (data) {
                        var table = $('#orderListTable').dataTable({
                            "data": data,
                            "lengthChange": true,//是否允许用户自定义显示数量
                            "bFilter": true, //列筛序功能
                            "bAutoWidth": true, //自动宽度
                            "bRetrieve": true,
                            'bDestroy':true,
                            "columns": [
                                {
                                    "title": "#",
                                    "width": "20px",
                                    "render": function(data, type, row, meta) {
                                        return '<input type="checkbox" id="' + row[0] + '">';
                                     }
                                },
                                {
                                    "title": "员工姓名",
                                    "class": "center",
                                    "width": "120px",
                                },
                                {
                                    "title": "线上问题跟踪顺序",
                                    "class": "center",
                                    "width": "100px",
                                },
                                {
                                    "title": "主持周会顺序",
                                    "class": "center",
                                    "width": "100px",
                                },
                            ],
                        }).fnDestroy();
                    } else {
                        alert("没有记录");
                    }
                }, "json");
                }, "json");

        });