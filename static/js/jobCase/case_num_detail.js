//case_num_detail
$(document).ready(function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var param = url.substr(1);
        jobname = param.split("=")[1]
    }

    $("#header").text("Case 数量及成功率历史记录--" + jobname);

    var refresh = function() {
        var path = []
        $.get("/case_num_detail_table/", {'jobname': jobname}, function(data){
            if (data) {
                path = data['case_num_detail']
                $('#caseNumDetailTable').dataTable({
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
