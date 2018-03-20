//case-coverage-detail
$(document).ready(function () {

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var param = url.substr(1);
        jobname = param.split("=")[1]
//        strs = str.split("&");
//        for(var i = 0; i < strs.length; i ++) {
//            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
//        }
    }

    $("#header").text("JaCoCo 覆盖率历史记录--" + jobname);

    var refresh = function() {
        var path = []
        $.get("/case_coverage_detail_table/", {'jobname': jobname}, function(data){
            if (data) {
                path = data['case_coverage_detail']
                $('#caseCoverageDetailTable').dataTable({
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

