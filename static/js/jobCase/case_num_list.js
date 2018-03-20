//case_num_list
$(document).ready(function () {
    var refresh = function() {
        var path = []
        $.get("/case_num_list_table/", function(data){
            if (data) {
                path = data['case_num_list']
                $('#caseNumListTable').dataTable({
                    "data": path,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": false, //自动宽度
                    "columns": [
                        {
                            "title": "#",
                            "render": function(data, type, row, meta) {
                                return meta.row;
                            }
                        },
                        {
                            "title": "Project",
                            "class": "center"
                         },
                        {
                            "title": "Job Name",
                            "class": "center",
                            "render": function(data) {
                            return "<a data-toggle='tooltip' title='点击可查看历史记录及趋势' href='case-num-detail?job=" + data + " ' id='" + data + "' >" + data  + "</a>"
                            }
                         },
                        {
                            "title": "Case 总数",
                            "class": "center"
                        },
                        {
                            "title": "Case 通过数",
                            "class": "center"
                        },
                        {
                            "title": "Case 失败数",
                            "class": "center"
                        },
                        {
                            "title": "Case 错误数",
                            "class": "center"
                        },
                        {
                            "title": "Case 重试次数",
                            "class": "center"
                        },
                        {
                            "title": "Case 成功率(%)",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                rate = (row[4]/row[3]*100).toFixed(2);
                                if (rate > 95) {
                                    return "<span class='label label-success label-mini'>" + rate +  "%</span>"
                                }
                                return "<span class='label label-danger label-mini'>" + rate +  "%</span>"
                            }
                        },
                        {
                            "title": "Case 执行环境",
                            "class": "center"
                        },
                        {
                            "title": "统计时间",
                            "class": "center"
                        },

                    ],
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }
    $("#loading").show();
    refresh();
    $("#loading").hide();
//    $("#refresh").click(function () {
//        refresh()
//    });
});
