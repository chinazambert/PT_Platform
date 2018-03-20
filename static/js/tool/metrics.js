$(document).ready(function(){
    $("#loading").hide();
    $("#queryCodeLines").click(function(){
        $("#loading").show();
        var type = $("#type").val();
        var item = $("#item").val();
        var url = $("#gitUrl").val();
        var cycle = $("#cycle").val();
        var time = $("#id-date-range-picker-1").val();
        var startTime = time.split(" - ")[0];
        var endTime = time.split(" - ")[1];

        $.get("/codeLines/", {'gitUrl': url, 'item':item, 'startTime': startTime, 'endTime': endTime}, function(data){
            if (data) {
                $("#loading").hide();
                addLines = '代码增加行数：' + data['addLines'] + '\n';
                delLines = '代码减少行数：' + data['delLines'] + '\n';
                totalLines = '代码总改动行数：' + data['totalLines']+ '\n';

                $('#addLines').html(addLines).css("line-height","30px");
                $('#delLines').html(delLines).css("line-height","30px");
                $('#totalLines').html(totalLines).css("line-height","30px");
            } else {
                $("#loading").hide();
                alert("查询异常！")
            }
        }, "json");
    });
});