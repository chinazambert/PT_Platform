    $("#queryTodayList").click( function (){
        var datetime = $("#datetime").val();
        if(datetime == "")
        {
            alert("请选择报告查询日期～");
        }
        else{
            $.get("/get_report_list/",  {'datetime': datetime}, function(data){
                if (data) {
                    data = JSON.parse(data);
                    var table = $('#monkeyReportTable').dataTable({
                        "data": data,
                        "lengthChange": true,//是否允许用户自定义显示数量
                        "bFilter": true, //列筛序功能
                        "bPaginate": true, //翻页功能
                        "bRetrieve": true,
                        "bDestroy":true,
                        "columns": [
                            {
                            "title": "报告列表",
                            "class": "center",
                            "width": "120px",
                            "render": function(data, type, row, meta) {
                                    return '<td><a onclick="getDetail(this)">' + row[0] + '</a></td>';
                                }
                            },
                        ],
                     }).fnDestroy();
                } else {
                    alert("没有记录");
                }
            });
            }
        });


    function getDetail(obj) {
        filename = $(obj).text();
        window.open('get_report_detail?filename=' + filename );
    }