<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/static/hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/static/hplus/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="/static/hplus/css/plugins/jqgrid/ui.jqgrid.css?0820" rel="stylesheet">
    <link href="/static/hplus/css/animate.css" rel="stylesheet">
    <link href="/static/hplus/css/style.css?v=4.1.0" rel="stylesheet">
    <style>
        #alertmod_table_list_2 {
            top: 900px !important;
        }
		td._label {
			width:300px;
		    text-align:right;
			padding:10px;
		}
    </style>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                    <div class="ibox-content">
                        <div class="jqGrid_wrapper">
                        <br/>
                        <br/>
                        <br/>
                            <input type="hidden" id="admin_id" value="<?php echo $admin['id'];?>">
                        	<table width="100%">
                        		<tr>
                            	    <td class="_label">用户名</td>
                            		<td><input type="text" value="<?php echo $admin['username'];?>" disabled></td>
                            	</tr>
                            	<tr>
                            	    <td class="_label">当前密码</td>
                            		<td><input type="password" id="cur_pass"></td>
                            	</tr>
                            	<tr>
                            	    <td class="_label">新密码</td>
                            		<td><input type="password" id="new_pass"></td>
                            	</tr>
                            	<tr>
                            	    <td class="_label">确认密码</td>
                            		<td><input type="password" id="con_pass"></td>
                            	</tr>
                            	<tr>
                            	    <td></td>
                            		<td><button class="btn btn-sm btn-primary"><strong> 提交修改  </strong></button></td>
                            	</tr>
                            	
                            </table>
                            <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="/static/hplus/js/plugins/layer/layer.js"></script>
    
<script type="text/javascript">
$(function(){
	$('button.btn-primary').click(function() {
		var admin_id     = $("#admin_id").val();
		var cur_pass    = $("#cur_pass").val();
		var new_pass    = $("#new_pass").val();
		var con_pass    = $("#con_pass").val();
		
		if (cur_pass=="") {
			layer.tips("请出入当前密码", "#cur_pass");
		} else if (new_pass=="") {
			layer.tips("请出入新密码", "#new_pass");
		} else if (new_pass!=con_pass) {
			layer.tips("确认密码与新密码不一致", "#con_pass");
		} else {
    		$.post("/admin/system/password",{act:'do', admin_id:admin_id, cur_pass:cur_pass, new_pass:new_pass, con_pass:con_pass},function(data) {
    			var obj = $.parseJSON(data);
    			if (obj.err_no>0) {
        			layer.alert(obj.err_msg);
    			} else {
        			layer.msg('密码修改成功！');
    			}
    		});
		}
	});   
});
</script>
</body>

</html>