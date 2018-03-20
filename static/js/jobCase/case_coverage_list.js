$(document).ready(function () {
    var refresh = function() {
        var path = []
        $.get("/case_coverage_list_table/", function(data){
            if (data) {
                path = data['case_coverage_list']
                $('#caseCovListTable').dataTable({
                    "data": path,
                    "lengthChange": true,//是否允许用户自定义显示数量
                    "bPaginate": true, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
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
                             return "<a data-toggle='tooltip' title='点击可查看历史记录及趋势' href='case-coverage-detail?job=" + data + " ' id='" + data + "' >" + data  + "</a>"
                            }
                        },
                        {
                            "title": "CLASS",
                            "class": "center"
                        },
                        {
                            "title": "METHOD",
                            "class": "center"
                        },
                        {
                            "title": "LINE",
                            "class": "center"
                        },
                        {
                            "title": "COMPLEXITY",
                            "class": "center"
                        },
                        {
                            "title": "BRANCH",
                            "class": "center"
                        },
                        {
                            "title": "INSTRUCTION",
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
});

$(document).ready(function () {
    $("[data-toggle='tooltip']").tooltip();
});
