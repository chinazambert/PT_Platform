//job_report_detail
$(document).ready(function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var param = url.substr(1);
        jobname = param.split("=")[1]
    }

    $("#header").text("Job 构建日志历史记录--" + jobname);

    var refresh = function() {
        var path = []
        $.get("/job_report_detail_table/", {'jobname': jobname}, function(data){
            if (data) {
                path = data['job_report_detail']
                $('#jobReportDetailTable').dataTable({
                    "data": path,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "columns": [
                        {
                            "title": "#",
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                return meta.row
                            }
                        },
                        {
                            "title": "Project" ,
                            "class": "center"
                        },
                        {
                            "title": "Job Name"
                        },
                        {
                            "title": "最后构建时间"
                        },
                        {
                            "title": "最后构建状态" ,
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                if (data === 'FAILURE') {
                                    return "<span class='label label-danger label-mini'>" + data +  "</span>"
                                } else if (data === 'SUCCESS') {
                                    return "<span class='label label-success label-mini'>" + data +  "</span>"
                                } else if (data === 'UNSTABLE') {
                                    return "<span class='label label-warning label-mini'>" + data +  "</span>"
                                }
                                return "<span class='label label-primary label-mini'>" + data +  "</span>"
                            }
                        },
                        {
                            "title": "最后构建成功时间"
                        },
                        {
                            "title": "最后构建失败时间"
                        },
                        {
                            "title": "最后构建人" ,
                            "class": "center"
                        },
                        {
                            "title": "最后构建URL",
                            "render": function(data) {
                                return "<a href='"+ data + "' >" + data  + "</a>"
                            }
                        },
                        {
                            "title": "配置的Case Git分支" ,
                            "class": "center"
                        },
                        {
                            "title": "7天内Job构建成功率(%)" ,
                            "class": "center",
                            "render": function(data, type, row, meta) {
                                job_succ_count_7 = row[12]
                                job_all_count_7 = row[13]
                                if (data > 95) {
                                    return "<span class='label label-success label-mini'>" + job_succ_count_7 +  "/" + job_all_count_7 + "(" + data + "%)</span>"
                                }
                                return "<span class='label label-danger label-mini'>"  + job_succ_count_7 +  "/" + job_all_count_7 + "(" + data + ")</span>"
                            }
                        },
                        {
                            "title": "统计时间"
                        },

                    ],
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }
    refresh();
//    $("#refresh").click(function () {
//        refresh()
//    });
});