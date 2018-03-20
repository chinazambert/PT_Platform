$(document).ready(function () {

    var globalData = [];
    var rowNum = 0;
    var login_name = getText("login_name");
    var mis = getText("mis");
    var path = location.pathname;

    if (path == "/to_test_page"){
        var list = function() {
            $.get("/to_test_list_table/", function(data){
                if (data) {
                    globalData = data;
                    var table = $('#toTestListTable').dataTable({
                        "data": globalData,
                        "lengthChange": true,//是否允许用户自定义显示数量
                        "searching": true, //搜索框
                        "bPaginate": true, //翻页功能
                        "bFilter": true, //列筛序功能
                        "bAutoWidth": true, //自动宽度
                        "aLengthMenu": [20, 40, 60, 100],
                        "columnDefs": [
                           {
                               orderable: false,
                               targets: 0 },
                        ],//第一列禁止排序
                        "columns": [
                            {
                                "title": "#",
                                "class": "center",
                                "width": "70px",
                                "render": function(data, type, row, meta) {
                                    return meta.row;
                                }
                            },
                            {
                                "title": "提测标题",
                                "class": "center",
                            },
                            {
                                "title": "发送人",
                                "class": "center",
                                "render": function(data, type, row, meta) {
                                    return row[25];
                                }
                            },
                            {
                                "title": "发送/保存时间",
                                "class": "center",
                            },
                            {
                                "title": "发送状态",
                                "class": "center",
                                "render": function(data, type, row, meta) {
                                    if (data === 1) {
                                        return "<i class='ace-icon fa fa-check light-green' aria-hidden='true'></i>"
                                    } else if (data==2) {
                                        return "<i class='ace-icon fa fa-floppy-o orange' aria-hidden='true'></i>"
                                    }
                                    return "<i class='ace-icon fa fa-exclamation-triangle red bigger-110'></i>"
                                }
                            },
                            {
                                "title": "操作栏",
                                "render": function(data, type, row, meta) {
                                    if (row[4] === 1) {
                                        var id = globalData[meta.row][0];
                                        return "<a href='to_test_detail?id=" + id + "'> " +
                                        "<button class='btn btn-white btn-success btn-sm';>" +
                                        "<font style='vertical-align: inherit;'>查看</font></button></a>&nbsp;" +
                                        "<button class='btn btn-white btn-success btn-sm' " +
                                        "onclick='swim(" + meta.row + ")' >" +
                                        "<font style='vertical-align: inherit;'>关联泳道编排</font></button>&nbsp;" +
                                        "<button class='btn btn-white btn-success btn-sm' " +
                                        "onclick='trigger(" + meta.row + ")' >" +
                                        "<font style='vertical-align: inherit;'>触发CI流程</font></button>"
                                    } else if (row[4] === 2) {
                                        return "<button class='btn btn-white btn-warning btn-sm' " +
                                        "onclick='edit(" + meta.row + ")' >" +
                                        "<font style='vertical-align: inherit;'>草稿</font></button>"
                                    }
                                    return "<button class='btn btn-white btn-danger btn-sm' " +
                                    "onclick='resend(" + meta.row + ")' >" +
                                    "<font style='vertical-align: inherit;'>重新发送</font></button>"
                                }
                            }
                        ],
                    });
                } else {
                    alert("没有记录");
                }
            }, "json");
        }

        var step_init = function() {
            $('#myWizard').wizard('selectedItem', {
                step: 1
            });
            $('.form-group').val("");
            $('.select').val("");
            $('.form-control-my').val("");
            $('.input1').val("");
            $('.input2').val("");
            $('.input3').val("");
            $('.text_box').html("");
            $('#to_test_people').html(login_name);

            $.get("/get_plus_name", function(data){
                if (data) { }
            }, "json");

            document.getElementById("div1").innerHTML =
            '<div><input class="input1" name="service" id="service" ' +
            'type="text" placeholder="必填，服务名" required>' +
            '<input class="input2" name="service_branch" id="service_branch" ' +
            'type="text" placeholder="必填，分支名" required></div>'
            service_autocomplete();

            document.getElementById("div2").innerHTML =
            '<div><input class="input3" name="package" id="package" ' +
            'type="text" value="" placeholder="必填，提测分支" required></div>'

            document.getElementById("mf_to_list").innerHTML = ''
            document.getElementById("mf_cc_list").innerHTML =
            '<li class="mf_item" role="option" aria-selected="false">' +
            'cep.erp@meituan.com<a href="#" class="mf_remove" title="Remove">X</a>' +
            '<input type="hidden" class="mf_value" name="cc_values[]" value="cep.erp@meituan.com"></li>' +
            '<li class="mf_item" role="option" aria-selected="false">' +
            'cep.sjst.qa@meituan.com<a href="#" class="mf_remove" title="Remove">X</a>' +
            '<input type="hidden" class="mf_value" name="cc_values[]" value="cep.sjst.qa@meituan.com"></li>'
        }

        $("#loading").show();
        list();
        $("#loading").hide();

        $("#write_tab").click(function (){
            step_init();
        });

        $('#to').manifest();
        $('#cc').manifest();

        $("#expected_time").datetimepicker({
            language:'zh-CN' ,
            minView: "month",
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: 'linked',
            keyboardNavigation: true,
            forceParse: true,

        });

        function validate(){

            var id = ['title_1', 'self_result', 'compatibility', 'pm_check', 'prd_des', 'suggest'];
            for(i=0; i<id.length; i++){
                var text_box = document.getElementById(id[i]).innerHTML;
                if (text_box  ==  null ||text_box.length == 0 ) {
                    return false;
                }
            }

            var lis = document.getElementById("mf_to_list").getElementsByTagName("li");
            if (lis.length == 0 ) {
                return false;
            }

            return true;
        };

        $("#validation-form1").validate();

        $('#myWizard').on('actionclicked.fu.wizard', function (evt, data) {
            if (data.direction=="next" && data.step=='1') {
                if (!$('#validation-form1').valid() || !validate()) {
                    evt.preventDefault();
                    alert("请补全必填项");
                }
                else {
                    send();
                    document.getElementById("save").style.display="None";
                }
            }
            else {
                window.location.reload();
                document.getElementById("save").style.display="None";
            }
        });

        function edit(index) {
            var dataDict = getDataDict(index);
            if (dataDict) {
                $("#write_tab").trigger('click');
                document.getElementById("emailId").value = dataDict['id'];

                var edit_param_list = ['to_test_people', 'title', 'self_result',
                'expected_time', 'branch', 'compatibility', 'pm_check', 'other_effects',
                'prd_des', 'api_des', 'db_des', 'suggest', 'rely_versions', 'remark',
                'env', 'to', 'cc'];

                for(i=0; i<edit_param_list.length; i++){
                    id = edit_param_list[i];
                    if(id == 'title'){
                        reg = dataDict['title'].match(/[\u4e00-\u9fa5]{6}$/);
                        document.getElementById("title_1").innerHTML = dataDict['title'].replace(reg, '');
                    }
                    else if(id == 'branch'){
                        document.getElementById("select").value = dataDict['type'];
                        document.getElementById("select").onchange();
                        var branch_list = eval("("+dataDict['branch']+")");
                        if (dataDict['type'] == 1) {
                            for (var x=0; x<branch_list.length; x++) {
                                if (x==0) {
                                    document.getElementById("service").value = branch_list[x].split("/")[0];
                                    document.getElementById("service_branch").value = branch_list[x].split("/")[1];
                                }
                                else {
                                    $("#AddMoreInput").trigger('click');
                                    document.getElementById("service" + x).value = branch_list[x].split("/")[0];
                                    document.getElementById("service_branch" + x).value = branch_list[x].split("/")[1];
                                }
                            }
                        }
                        else {
                            for (var x=0; x<branch_list.length; x++) {
                                if (x==0) {
                                    document.getElementById("package").value = branch_list[x];
                                }
                                else {
                                    $("#AddMoreInput").trigger('click');
                                    document.getElementById("package" + x).value = branch_list[x];
                                }
                            }
                        }
                    }
                    else if(id == 'to'){
                        var mf_to_list = dataDict['to'].replace(/\[|\]|\"/g, '').split(",");
                        document.getElementById("mf_to_list").innerHTML=''
                        for (var x=0; x<mf_to_list.length; x++) {
                            if (mf_to_list[x] != "") {
                                document.getElementById("mf_to_list").innerHTML +=
                                '<li class="mf_item" role="option" aria-selected="false">' +
                                mf_to_list[x] +
                                '<a href="#" class="mf_remove" title="Remove">X</a>' +
                                '<input type="hidden" class="mf_value" name="to_values[]" value="' +
                                mf_to_list[x] + '"></li>'
                            }
                        }
                    }
                    else if(id == 'cc'){
                        var mf_cc_list = dataDict['cc'].replace(/\[|\]|\"/g, '').split(",");
                        document.getElementById("mf_cc_list").innerHTML=''
                        for (var x=0; x<mf_cc_list.length; x++) {
                            if (mf_cc_list[x] != "") {
                                document.getElementById("mf_cc_list").innerHTML +=
                                '<li class="mf_item" role="option" aria-selected="false">' +
                                mf_cc_list[x] +
                                '<a href="#" class="mf_remove" title="Remove">X</a>' +
                                '<input type="hidden" class="mf_value" name="cc_values[]" value="' +
                                mf_cc_list[x] + '"></li>'
                            }
                        }
                    }
                    else if(id == 'expected_time'){
                        document.getElementById('expected_time').value = dataDict['expected_time'];
                    }
                    else{
                        document.getElementById(id).innerHTML = dataDict[id];
                    }
                };
            }
            else {
                alert("网络异常");
            }
        }
        window.edit = edit;

        function resend(index) {
            var dataDict = getDataDict(index);
            if (dataDict) {
                var email = {};
                var resend_param_list = ['id', 'subject', 'title', 'to_test_people', 'to_test_time',
                'self_result', 'expected_time', 'type', 'branch', 'compatibility', 'pm_check',
                'other_effects', 'prd_des', 'api_des', 'db_des', 'suggest', 'rely_versions',
                'remark', 'env', 'to', 'cc'];
                for(i=0; i<resend_param_list.length; i++){
                    param = resend_param_list[i];
                    if(param == 'to_test_time'){
                        email['to_test_time'] = showTime();
                    }
                    else if(param == 'branch'){
                        var branch_list = eval("("+dataDict['branch']+")");
                        var branch_html = getBranchHtml(branch_list);
                        email['branch'] = JSON.stringify(branch_list);
                        email['branch_html'] = branch_html;
                    }
                    else{
                        email[param] = dataDict[param]
                    }
                };

                var editId = email['id']
                var fr = mis + "@meituan.com";
                var mail_fr = {"name": login_name, "email": fr};
                email['fr'] = fr;
                email['fr_name'] = login_name;
                var message = {"sub": email['subject'], "html_content": emailTemplate(email, editId)};

                $.post("/resend_email/", {
                    "mail_to": email['to'],
                    "mail_cc": email['cc'],
                    "mail_fr": JSON.stringify(mail_fr),
                    "message": JSON.stringify(message)
                    },
                    function(data){
                        var status = data['status'];
                        update(editId, email, status);
                        if(status == 1) {
                            html = ('<p class="bigger-140 bolder center green"><i class="ace-icon fa fa-check"></i>发送成功</p>');
                        }
                        else {
                            html = ('<p class="bigger-140 bolder center red"><i class="ace-icon fa fa-times"></i>发送失败</p>');
                        }
                        $('#save_modal_content').html(html);
                        $("#save_modal").modal("show");
                }, "json");

            } else {
                alert("网络异常");
            }
        }
        window.resend = resend;

        var send = function() {
            var editId = $("input[name='emailId']").val();
            var email = getEmailData();
            console.log(editId);
            if (!editId) {
                var editId = save(email)['id']
            }
            console.log(editId);
            var mail_fr = {"name": email['fr_name'], "email": email['fr']};
            var message = {"sub":  email['subject'], "html_content": emailTemplate(email, editId)};

            $.post("/send_email/", {
                "mail_fr": JSON.stringify(mail_fr),
                "message": JSON.stringify(message),
                "mail_to": email['to'],
                "mail_cc": email['cc']},
                function(data){
                    var status = data['status'];
                    update(editId, email, status);
                    $.post("/create_swimlane_stack/",{'emailid':editId},function(data){
                        });
                    if (status == 1) {
                        document.getElementById("to_test_success").style.display="";
                    }
                    else {
                        document.getElementById("to_test_fail").style.display="";
                    }
                }, "json");
        }

        $("#save").click(function () {
            var editId = $("input[name='emailId']").val();
            var email = getEmailData();
            if (editId) {
                var code = update(editId, email, status=2)['code'];
            }
            else {
                var code = save(email)['code'];
            }
            if (code == 1) {
                html = ('<p class="bigger-140 bolder center green"><i class="ace-icon fa fa-check"></i>保存成功</p>');
            }
            else if (code == 0)  {
                html = ('<p class="bigger-140 bolder center red"><i class="ace-icon fa fa-times"></i>保存失败</p>');
            }
            $('#save_modal_content').html(html);
            $("#save_modal").modal("show");
        });

        var update = function(editId, email, status){
            var msg = null;
            $.ajaxSetup({
                async : false
            });
            $.post("/update_email/", {'id': editId, 'email': JSON.stringify(email), 'status': status}, function(data) {
                 msg = data;
            }, "json");
            return msg
        }

        var save = function(email){
            var msg = null;
            $.ajaxSetup({
                async : false
            });
            $.post("/save_email/", {'email': JSON.stringify(email)}, function(data) {
                 msg = data;
                 console.log(msg);
            }, "json");
            return msg
        }

        $('#save_modal').on('show.bs.modal', function (e) {
            setTimeout(function(){
                $("#save_modal").modal("hide");
                window.location.reload();
            },1000);
        })

        function service_select(){
            var type = document.getElementById("select");
            var div1 = document.getElementById("div1");
            var div2 = document.getElementById("div2");
            type.onchange = function(){
                div1.style.display = this.value==1? "block" : "none";
                div2.style.display = this.value==2? "block" : "none";
            }
        }
        service_select();

        function service_input(){
            var MaxInputs = 10;
            var x1 = 1;
            var x2 = 1;
            var AddButton = $("#AddMoreInput");
            $("#AddMoreInput").click(function (e) {
                var type = $("#select").val();
                if (type == 1) {
                    var InputsWrapper1 = $("#div1");
                    if(x1 <= MaxInputs) {
                        $(InputsWrapper1).append('<div><input class="input1" name="service' + x1 +
                        '" id="service' + x1 + '" type="text" ' +
                        'placeholder="必填，服务名" style="margin-right:3px;" required>' +
                        '<input class="input2" name="service_branch' + x1 + '" id="service_branch' + x1 +
                        '" type="text" placeholder="必填，分支名" required>' +
                        '<span class="icon fa fa-minus-circle purple removeclass" style="float:right" ' +
                        'id="ServiceRemove' + x1 + '"></span></div>')
                        var serviceId = "#service" + x1;
                        $(serviceId).autocomplete({
                            source: function(request,response){
                                var keyword = $(serviceId).val();
                                $.get("/search_plus_name", {'keyword': keyword}, function(data){
                                    if (data) {
                                        response($.map(data, function(item){
                                            return {
                                                label:item,
                                                value:item,
                                            }
                                        }));
                                    }
                                }, "json");
                            },
                            minLength: 5,
                            minChars : 8,   //最少的查询字符数
                            select: function(event, ui){
                                $(this).value = ui.item.label;
                            }
                        });
                    }
                    x1++;
                }
                else {
                    var InputsWrapper2 = $("#div2");
                    if(x2 <= MaxInputs) {
                        $(InputsWrapper2).append('<div><input class="input3" name="package' + x2 +
                        '" id="package' + x2 +'" type="text" value="" placeholder="必填，提测分支" required>' +
                        '<span class="icon fa fa-minus-circle purple removeclass" style="float:right" ' +
                        'id="PackageRemove' + x2 + '"></span></div>')
                    }
                    x2++;
                }
            });
            $("body").on("click",".removeclass", function(e){
                $(this).parent('div').remove();
                return false;
            });
        }
        service_input();

        function service_autocomplete() {
            $("#service").autocomplete({
                source: function(request,response){
                    var keyword = $("#service").val();
                    $.get("/search_plus_name", {'keyword': keyword}, function(data){
                        if (data) {
                            response($.map(data, function(item){
                                return {
                                    label:item,
                                    value:item,
                                }
                            }));
                        }
                    }, "json");

                },
                minLength: 5,
                select: function(event, ui){
                    this.value = ui.item.label;
                }
            });
        }

        $("#to").autocomplete({
            source: function(request,response){
                var keyword = $("#to").val();
                $.get("/search_email_name", {'keyword': keyword}, function(data){
                    if (data) {
                        response($.map(data, function(item){
                            return {
                                label:item,
                                value:item,
                            }
                        }));
                    }
                }, "json");

            },
            delay: 50,
            minLength: 5,
        });

        $("#cc").autocomplete({
            source: function(request,response){
                var keyword = $("#cc").val();
                $.get("/search_email_name", {'keyword': keyword}, function(data){
                    if (data) {
                        response($.map(data, function(item){
                            return {
                                label:item,
                                value:item,
                            }
                        }));
                    }
                }, "json");

            },
            delay: 50,
            minLength: 5,
        });



        function swim(index) {      　//点击关联泳道编排按钮
            $("#swimlane_name").val("");
            rowNum = globalData[index][0]; //保存当前行号
            if (globalData[index]) {
                $("#swim_modal").modal("show");
            }
        }
        window.swim = swim;

        function trigger(index) {      　//点击触发泳道CI流程
            rowNum = globalData[index][0]; //保存当前行号
            if (globalData[index]) {
                $("#CI_modal").modal("show");
            }
        }
        window.trigger = trigger;

        $("#save_swimlane").click(function () {  //点餐save按钮
            var swimlane_name = $.trim($("#swimlane_name").val()); //删除前后空格
            if(swimlane_name === ""){
                alert("请输入泳道名！");
            }
            else{
                $("#relevant_modal").modal("show");
            }

        });

        $("#Cancel").click( function (){
            $("#relevant_modal").modal("hide");
        });

        $("#Cancel_ci").click( function (){
            $("#CI_modal").modal("hide");
        });

        $("#relevant").click( function (){  //点击sure按钮，关联泳道和服务分支
            swimlane_name = $.trim($("#swimlane_name").val());
            $.get("/relevant_swimlane/", {'rowid': rowNum, 'swimlane_name':swimlane_name}, function(data){
                alert(data);
                window.location.reload();
            });
        });

        $("#trigger_ci").click( function (){  //点击sure按钮，触发CI流程
            $("#CI_modal").modal("hide");
            $.get("/trigger_ci/", {'rowid': rowNum}, function(data){
                alert(data);
                window.location.reload();
            });
        });

    }


    if (path == "/to_test_detail") {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();



        var detail = function() {

            if (url.indexOf("?") != -1) { var index = url.substr(1).split("=")[1] }
            $("#header").text("提测详情");
            $.get("/to_test_by_id/", {'id': index},  function(data){
                if (data) {
                    var view_param_list = ['subject', 'to_test_people', 'title', 'to_test_time',
                    'self_result', 'expected_time', 'branch', 'compatibility', 'pm_check',
                    'other_effects', 'prd_des', 'api_des', 'db_des', 'suggest', 'rely_versions',
                    'remark', 'env', 'to', 'cc', 'fr'];

                    for(i=0; i<view_param_list.length; i++){
                        param = view_param_list[i];
                        id = param + '_modal';

                        if(param == 'to' | param == 'cc' ){
                            document.getElementById(id).innerHTML = data[param].replace(/\[|\]|\"/g, '');
                        }
                        else if(param == 'branch'){
                            var branch_list = eval("("+data[param]+")");
                            var branch_html = getBranchHtml(branch_list);
                            document.getElementById(id).innerHTML = branch_html;
                        }
                        else{
                            document.getElementById(id).innerHTML = setUrlHref(data[param]);
                        }
                    };
                }
                else {
                    alert("没有记录");
                }
            }, "json");
        };

        detail();
    }

    function showTime() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            var now = year + '-' + month + '-' + day
            return now
        };

    function getEmailData(){
        var email = {};
        email['title'] = getText('title_1') +  getText('title_2');
        email['subject'] = "【提测】" + getText('title_1') +  getText('title_2');
        email['to_test_people'] = getText('to_test_people');
        email['to_test_time'] = getText('to_test_time');
        email['self_result'] = getText('self_result');
        email['expected_time'] = $("input[name='expected_time']").val();
        email['type'] =  document.getElementById('select').value;
        email['branch'] = getBranch();
        email['branch_html'] = getBranchHtml(JSON.parse(email['branch']));
        email['compatibility'] = getText('compatibility');
        email['pm_check'] = getText('pm_check');
        email['other_effects'] = getText('other_effects');
        email['prd_des'] = getText('prd_des');
        email['api_des'] = getText('api_des');
        email['db_des'] = getText('db_des');
        email['suggest'] = getText('suggest');
        email['rely_versions'] = getText('rely_versions');
        email['remark'] = getText('remark');
        email['env'] = getText('env');
        email['to'] = getToCc('mf_to_list');
        email['cc'] = getToCc('mf_cc_list');
        email['fr'] = mis + "@meituan.com";
        email['fr_name'] = login_name;
        return email
    }

    function emailTemplate(email, id) {

        var html_head = '<html lang="zh" class="user_font_size_normal" style="padding: 0px; margin: 0px;">' +
                        '<head><style>' +
                        '.tab {border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; ' +
                        'text-align: center; min-width: 8px;background-color: rgb(240, 240, 240);}' +
                        '.tab2 {border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; font-size: 13px;}' +
                        '.tab3 {border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; font-size: 13px; width: 150px;}' +
                        '</style></head>'

        var html_body = '<body style="margin: 0px; height: auto; padding-left:50px; padding-top:20px" class="MsgBody MsgBody-html">'

        var content = '<i class="fa fa-leaf"></i>' +
                    '<p><a href="http://qa.sjst.test.sankuai.com/to_test_detail?id=' + id + '">' +
                    '点击去餐饮生态平台辅助工具查看详情</a></p>' +
                    '<br/>' +
                    '<table width="800px" border="0" cellspacing="0" cellpadding="0">' +
                        '<colgroup >' +
                            '<col >' +
                            '<col >' +
                            '<col >' +
                            '<col >' +
                        '</colgroup>' +
                        '<thead>' +
                            '<tr>' +
                                '<th colspan="4" class="tab" id="title">' + email['title'] + '</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody >' +
                            '<tr>' +
                                '<td class="tab3" >提测人</td>' +
                                '<td class="tab2" >' + email['to_test_people'] + '</td>' +
                                '<td class="tab3" >提测时间</td>' +
                                '<td class="tab2" >' + email['to_test_time'] + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td class="tab3" >自测结果</td>' +
                                '<td class="tab2" >' + setUrlHref(email['self_result']) + '</td>' +
                                '<td class="tab3">期望上线时间</td>' +
                                '<td class="tab2" >' + email['expected_time'] + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td class="tab3" >提测分支或tag</td>' +
                                '<td class="tab2" >' + email['branch_html'] + '</td>' +
                                '<td class="tab3" >兼容性测试范围</td>' +
                                '<td class="tab2" >' + setUrlHref(email['compatibility']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td class="tab3" >PM验收情况</td>' +
                                '<td class="tab2" >' + email['pm_check'] + '</td>' +
                                '<td class="tab3" >对其他端的影响</td>' +
                                '<td class="tab2" >' + setUrlHref(email['other_effects']) + '</td>' +
                            '<tr >' +
                                '<td class="tab3" >测试需求描述</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['prd_des']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >接口改动说明</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['api_des']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >DB改动说明</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['db_des']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >建议测试范围</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['suggest']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >依赖版本</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['rely_versions']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >备注</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['remark']) + '</td>' +
                            '</tr>' +
                            '<tr >' +
                                '<td colspan="1" class="tab3" >测试环境和账号</td>' +
                                '<td colspan="3" class="tab2">' + setUrlHref(email['env']) + '</td>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table><br><br><br>'

        html_body += content
        html_body += '</body></html>'

        var html = html_head + html_body

        return html
    };

    function getBranch(){
        var type = document.getElementById('select').value;
        var inputs1 = document.getElementById('div1').getElementsByTagName("div")
        var inputs2 = document.getElementById('div2').getElementsByTagName("div")
        var branch1 = []
        var branch2 = []
        for(var i=0; i<inputs1.length; i++){
            var service = inputs1[i].getElementsByTagName('input')[0].value;
            var service_branch = inputs1[i].getElementsByTagName('input')[1].value
            if (service != "" | service_branch != ""){
                branch1.push(service + '/' + service_branch);
            }
        };
        for(var i=0; i<inputs2.length; i++){
            var package = inputs2[i].getElementsByTagName('input')[0].value;
            if (package != "") {
                branch2.push(package);
            }
        };
        var branch = type == '1'? branch1 : branch2;
        return JSON.stringify(branch)
    };

    function getBranchHtml(branch_list){
        var branch_html = ""
            for (var i=0; i<branch_list.length; i++) {
                if(i==branch_list.length){
                    branch_html += branch_list[i]
                }
                else {
                    branch_html += branch_list[i]
                    branch_html += "<br>"
                }
            }
        return branch_html
    };

    function getText(id){
        var text_html = document.getElementById(id).innerHTML;
        var text = text_html.replace(/<\/div>/g, "").replace(/<div>/g, "<br/>").replace(/(^\s*)|(\s*$)/g,"");
        return text
    };

    function getToCc(id){
        var list = []
        var ol = document.getElementById(id);
        var lis = ol.getElementsByTagName('li');
        for(var i=0; i<lis.length; i++){
            list.push(lis[i].getElementsByTagName('input')[0].value);
        };
        return JSON.stringify(list)
    }

    function getDataDict(index){
        var dataDict = {}
        dataDict_key = ['id', 'subject', 'to_test_people', 'send_time', 'status',
        'title', 'to_test_time', 'self_result', 'expected_time', 'type', 'branch',
        'compatibility', 'pm_check', 'other_effects', 'prd_des', 'api_des', 'db_des',
        'suggest', 'pr', 'rely_versions', 'remark', 'env', 'to', 'cc', 'fr', 'fr_name']
        for (i=0; i<dataDict_key.length; i++){
            key = dataDict_key[i];
            dataDict[key] = globalData[index][i];
        }
        return dataDict
    }

    function setUrlHref(urlString) {
        var reg=/^(http|ftp|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"\"])*$/;
        if(!reg.test(urlString)){
            return urlString;
        }
        return '<a href=' + urlString + '>' + urlString + '</a>';
    };

});

