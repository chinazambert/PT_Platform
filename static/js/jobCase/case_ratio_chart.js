//case_ratio_chart
$(document).ready(function () {

    var refresh = function() {
        var chart = []
        $.get("/case_ratio_chart_graphs/", function(data){
             if (data) {
                chart = data['project_data_list']
                var charts = document.getElementById('charts');
                var count = chart.length;
                var chartsStr = ''
                for(var i = 0; i < count; i++) {
                    chartsStr += '<div style="width: 100%;height: 400px" id="chart_' + i + '"></div><br><br><br>'
                }
                charts.innerHTML= chartsStr;

                for(var i = 0; i < count; i++) {
                    var myChart = echarts.init(document.getElementById('chart_' + i));
                    var option = {
                        title : {
                            text: chart[i]['business_name'] + "比例趋势图(" + chart[i]['project_full_name'] + ")",
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['line覆盖率','Branch覆盖率','Case成功率', '7天内Job构建成功率']
                        },
                        toolbox: {
                            show : true,
                            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
                            x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
                            color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                            backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
                            borderColor: '#ccc',       // 工具箱边框颜色
                            borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
                            padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
                            showTitle: true,
                            feature : {
                                mark : {
                                    show : true,
                                    title : {
                                        mark : '辅助线-开关',
                                        markUndo : '辅助线-删除',
                                        markClear : '辅助线-清空'
                                    },
                                    lineStyle : {
                                        width : 1,
                                        color : '#1e90ff',
                                        type : 'dashed'
                                    }
                                },
                                dataZoom : {
                                    show : true,
                                    title : {
                                        dataZoom : '区域缩放',
                                        dataZoomReset : '区域缩放-后退'
                                    }
                                },
                                dataView : {
                                    show : true,
                                    title : '数据视图',
                                    readOnly: true,
                                    lang : ['数据视图', '关闭', '刷新'],
                                    optionToContent: function(opt) {
                                        var axisData = opt.xAxis[0].data;
                                        var series = opt.series;
                                        var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                                     + '<td>时间</td>'
                                                     + '<td>' + series[0].name + '</td>'
                                                     + '<td>' + series[1].name + '</td>'
                                                     + '</tr>';
                                        for (var i = 0, l = axisData.length; i < l; i++) {
                                            table += '<tr>'
                                                     + '<td>' + axisData[i] + '</td>'
                                                     + '<td>' + series[0].data[i] + '</td>'
                                                     + '<td>' + series[1].data[i] + '</td>'
                                                     + '</tr>';
                                        }
                                        table += '</tbody></table>';
                                        return table;
                                    }
                                },
                                magicType: {
                                    show : true,
                                    title : {
                                        line : '动态类型切换-折线图',
                                        bar : '动态类型切换-柱形图',
                                        stack : '动态类型切换-堆积',
                                        tiled : '动态类型切换-平铺'
                                    },
                                    type : ['line', 'bar', 'stack', 'tiled']
                                },
                                restore : {
                                    show : true,
                                    title : '还原',
                                    color : 'black'
                                },
                                saveAsImage : {
                                    show : true,
                                    title : '保存为图片',
                                    type : 'jpeg',
                                    lang : ['点击本地保存']
                                },
                        //                myTool : {
                        //                    show : true,
                        //                    title : '自定义扩展方法',
                        //                    icon : 'image://../asset/ico/favicon.png',
                        //                    onclick : function (){
                        //                        alert('myToolHandler')
                        //                    }
                        //                }
                            }
                        },
                        calculable : true,
                        dataZoom : {        // 数据区域缩放,数据展现范围选择
                            show : true,
                            realtime : true,
                            start : 20,
                            end : 80
                        },
                        xAxis : [
                            {
                                type : 'category',
                                name : '统计时间',
                                boundaryGap : false,
                                data : chart[i]['ratio']['statistical_time_list'],
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name : '比例(%)',
                            }
                        ],
                        series : [
                            {
                                name:'line覆盖率',
                                type:'line',
                                data: chart[i]['ratio']['line_coverage_list'],
                            },
                            {
                                name:'Branch覆盖率',
                                type:'line',
                                data: chart[i]['ratio']['branch_coverage_list'],
                            },
                            {
                                name:'Case成功率',
                                type:'line',
                                data: chart[i]['ratio']['case_success_list'],
                            },
                            {
                                name:'7天内Job构建成功率',
                                type:'line',
                                data:chart[i]['ratio']['job_build_success_list_7'],
                            }
                        ]
                        };
                    myChart.setOption(option);
                }

            } else {
                alert("没有记录");
            }


        }, "json");
    }
    refresh();
});