$(document).ready(function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var param = url.substr(1);
        jobname = param.split("=")[1]
    }

    $("#header").text("接口自动化覆盖率统计结果 --" + jobname);

    var refresh = function() {
        var path = []
        $("#loading").show();
        $.get("/covTable/", {'jobname': jobname}, function(data){
            if (data) {
                $("#loading").hide();
                path = data['path_all']
                count = data['count_path']
                countIntersection = data['count_intersection']
                countDifference = data['count_difference']
                covRate = ((countIntersection/count*100).toFixed(2)) + "%"

                $("#cov_n").text(countDifference);
                $("#cov_y").text(countIntersection);
                $("#cov_rate").text(covRate);
                $("#count").text(count);

                $('#covDetailTable').dataTable({
                    "data": path,
                    "lengthChange": false,//是否允许用户自定义显示数量
                    "bPaginate": false, //翻页功能
                    "bFilter": true, //列筛序功能
                    "bAutoWidth": false, //自动宽度
                    "columns": [
                        {
                            "title": "#",
//                            "render": function(data, type, row, meta) {
//                                return meta.row;
//                            }
                        },
                        { "title": "Interface" },
                        { "title": "AppKey" },
                        {
                            "title": "Status",
                            "class": "center",
                            "render": function(data) {
                                if (data === 'N') {
                                    return "<span class='label label-danger label-mini'>" + data +  "</span>"
                                }
                                return "<span class='label label-success label-mini'>" + data +  "</span>"
                            }
                        }
                    ],

                    initComplete: function () {//列筛选
                        var api = this.api();
                        api.columns().indexes().flatten().each(function (i) {
                            if (i != 0 && i != 1) {//删除第一列与第二列的筛选框
                                var column = api.column(i);
                                var $span = $('<span class="addselect">▾</span>').appendTo($(column.header()))
                                var select = $('<select><option value="">All&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option></select>')
                                .appendTo($(column.header()))
                                .on('click', function (evt) {
                                    evt.stopPropagation();
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
                                    column
                                        .search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                    });
                                    column.data().unique().sort().each(function (d, j) {
                                        function delHtmlTag(str) {
                                            return str.replace(/<[^>]+>/g, "");//去掉html标签
                                        }
                                        d = delHtmlTag(d)
                                        select.append('<option value="' + d + '">' + d + '</option>')
                                        $span.append(select)
                                    });
                            }
                        });
                    }
                });
            } else {
                $("#loading").hide();
                alert("没有记录");
            }
        }, "json");
    }
    $("#loading").hide();
    refresh();
    $("#refresh").click(function () {
        refresh()
    });
});

//$(document).ready(function () {
//    $("#add").on(ace.click_event, function() {
//       bootbox.dialog({
//        title: "添加新项目",
//        message: `
//            <form class="bootbox-form">
//                <input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />
//            </form>
//            <div class="space-8"></div>
//            <form class="bootbox-form">
//                <input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />
//            </form>
//        `,
//        buttons:{
//            cancel: {
//                label: "关闭",
//            },
//            ok: {
//                label: "确定"
//            }
//        }
//
//       })
//    });
//});

