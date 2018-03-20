//fail_case_sort
$(document).ready(function () {
    var refresh = function() {
        var path = []
        $.get("/fail_case_sort_table/", function(data){
            if (data) {
                path = data['fail_case_list']
                $('#failCaseSortTable').dataTable({
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
                            "title": "Project"
                        },
                        {
                            "title": "Job全称/统计时间",
                            "render": function(data, type, row, meta) {
                                return "<p>Job全称:<br/> <a data-toggle='tooltip' title='点击可查看历史记录及趋势' href='fail-case-detail?job=" +
                                data + " ' id='" + data + "' >" + data  + "</a><br/><br><br>统计时间:<br/>" + row[4];
                            }
                        },
                        {
                            "title": "7天内失败Case排行【Case目录.类名||方法名(失败次数/总运行次数)】",
                            "render": function(data, type, row, meta) {
                                var lis1 = data.split('&');
                                var lis2 = [];
                                for(i=0; i<lis1.length; i++) {
                                    line = lis1[i]
                                    item = line.split(',')
                                    lis2.push(item)
                                };
                                var html = '';
                                for(i=0; i<lis2.length; i++) {
//                                    console.log(lis2);
                                    dir = lis2[i][0]
                                    clas = lis2[i][1]
                                    rate = (lis2[i][2]/lis2[i][3]*100).toFixed(2)
                                    if (rate > 5) {
                                        html += "<li class='label label-danger label-mini'>" + dir + "  ||  " + clas + "(" + rate + "%)</li>"
                                    } else {
                                      html += "<li class='label label-success label-mini'>" + dir + "  ||  " + clas + "(" + rate + "%)</li>"
                                    }
                                }
                                return html;
                            }
                        },
                    ],
                });
            } else {
                alert("没有记录");
            }
        }, "json");
    }
    refresh();
});