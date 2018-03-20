$(document).ready(function () {
    $("#loading").hide();
    var refresh = function() {
        var covList = []
        $("#loading").show();
        $.get("/covList/", function(data){
            if (data) {
                $("#loading").hide();
                covList = data['cov_list']
                $('#covListTable').dataTable( {
                    "data": covList,
                    "lengthChange": false,//是否允许用户自定义显示数量
                    "bPaginate": false, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": true, //自动宽度
                    "columns": [
                        {
                            "title": "#" ,
                            "render": function(data, type, row, meta) {
                                return meta.row;
                             }
                        },
                        {
                            "title": "Project" ,
                            "render": function(data, type, row, meta) {
                                return "<a data-toggle='tooltip' title='点击可查看详细记录' href='interfaceCovDetail?job=" + row[0] + " ' id='" + row[0] + "' >" + row[0]  + "</a>"
                            }
                        },
                        {
                            "title": "Total" ,
                            "render": function(data, type, row, meta) {
                                return row[1];
                             }
                        },
                        {
                            "title": "Interface coverage" ,
                            "render": function(data, type, row, meta) {
                                return row[2];
                             }
                        }
                    ],
                });
            } else {
                $("#loading").hide();
                 alert("没有记录");
            }
        }, "json");
    }
    refresh();
});