$(document).ready(function () {

    var globalData = [];
//    var login_name = getText("login_name");
//    var mis = getText("mis");

    var list = function() {
        $.get("/to_test_list_table/", function(data){
            if (data) {
                globalData = data;
                var table = $('#toTestListTable').dataTable({
                    "data": data,
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
                            "title": "项目",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                return "美团管家";
                            }
                        },
                        {
                            "title": "需求标题",
                            "class": "center",
                            "width": "300px",
                            "render": function(data, type, row, meta) {
//                                return "<div class='progress progress-striped pos-rel'>【测试进度】项目名称_版本_需求模块" +
//                                "<div class='progress-bar progress-bar-success' style='width: 25%;'></div> " +
//                                "</div>";
                                return "【测试进度】项目名称_版本_需求模块";
                            }
                        },
                        {
                            "title": "发送人",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                return "刘悦";
                            }
                        },
                        {
                            "title": "操作栏",
                            "render": function(data, type, row, meta) {
                               return "<span class='label label-success label-mini'>第一轮-0228</span> " +
                               "<span class='label label-success label-mini'>第二轮-0301</span> &nbsp" +
                               "<span class='icon fa fa-plus-circle purple'></span> "
                            }
                        }
                    ],
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    };

    list();


});