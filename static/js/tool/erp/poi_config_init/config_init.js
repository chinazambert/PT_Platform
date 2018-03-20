$(document).ready(function(){

$("#init-btn-beta-menu").click(function(){   
  	var tenant_id_ori = $("#tenant-id-ori").val();
	var poi_id_ori = $("#poi-id－ori").val();
	var tenant_id_tar =$("#tenant-id-tar").val();
	var poi_id_tar = $("#poi-id－tar").val();
    $.get("/initPoiMenuConfig", {
    	'tenantIdOri': tenant_id_ori, 
    	'poiIdOri':poi_id_ori, 
    	'tenantIdTar':tenant_id_tar, 
    	'poiIdTar': poi_id_tar//,
    	//'oriIsBeta': 'True'
    }, function(data){
    		alert(data)
    })
});

$("#init-btn-beta-table").click(function(){   	
  	var tenant_id_ori = $("#tenant-id-ori").val();
	var poi_id_ori = $("#poi-id－ori").val();
	var tenant_id_tar =$("#tenant-id-tar").val();
	var poi_id_tar = $("#poi-id－tar").val();
    $.get("/initPoiTableConfig", {
    	'tenantIdOri': tenant_id_ori, 
    	'poiIdOri':poi_id_ori, 
    	'tenantIdTar':tenant_id_tar, 
    	'poiIdTar': poi_id_tar//,
    	//'oriIsBeta': 'True'
    }, function(data){
    		alert(data)
    })
});

});