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
		td.pre {
			padding-left:10px;
			width:70px;
		}
		a:hover {color:red}
		table.test {
			border: 1px solid #e7eaec;
		}
		table.test td {
		border-top: 1px solid #e7eaec;
	    line-height: 1.42857;
	    padding: 8px;
	    vertical-align: middle;
		border: 1px solid #e7eaec;
		padding:4px;
		text-align:center;
	}
    </style>
</head>

<body class="gray-bg">
    
  <div class="ibox-content">
        	事务交易测试
    </div>
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                    <div class="ibox-content">
                        <div class="jqGrid_wrapper">
                        	<table class="test">
                            	<tr>
                            	    <td>用户ID</td>
                            		<td><input type="text" value="3" id="user_id"></td>
                            	</tr>
                            	<tr>
                            	    <td>交易类型</td>
                            		<td>
                            		<select id="transfer_type_id">
                            				<option value="1">充值</option>
                            				<option value="2">提现</option>
                            				<option value="3">投注</option>
                            				<option value="4">追号</option>
                            				<option value="5">派奖</option>
                            				<option value="6">返点</option>
                            				<option value="7">分红</option>
                            				<option value="8">佣金</option>
                            				<option value="9">活动奖金/励</option>
                            				<option value="10">冻结金额</option>	
                            				<option value="100">AG转账</option>
                            				<option value="101">沙巴体育转账</option>
                            				<option value="102">PT转账</option>
                            			</select>
									</td>
                            	</tr><tr>
                            	    <td>金额</td>
                            		<td><input type="text" id="amount" value="100"></td>
                            	</tr><tr>
                            	    <td>用户ID</td>
                            		<td><textarea id="remark">测试。。</textarea></td>
                            	</tr>
                            	<tr>
                            	    <td><button onclick="transation_test()">提交</button></td>
                            	</tr>
                            </table>
                            <div id="grid_page"></div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
    <!-- jqGrid -->
    <script src="/static/hplus/js/plugins/jqgrid/i18n/grid.locale-cn.js?0820"></script>
    <script src="/static/hplus/js/plugins/jqgrid/jquery.jqGrid.min.js?0820"></script>
    <script src="/static/hplus/js/plugins/layer/layer.js"></script>
    <script src="/static/hplus/js/plugins/layer/laydate/laydate.js"></script>
    <script src="/static/hplus/js/content.js"></script>
    <?php  echo $script;?>
    
<script type="text/javascript">


function transation_test() {
	var user_id = $("#user_id").val();
	var transfer_type_id = $("#transfer_type_id").val();
	var amount = $("#amount").val();
	var remark = $("#remark").val();
	var act = 'do';

	$.post("/admin/log/transation_test",{user_id:user_id, transfer_type_id:transfer_type_id, amount:amount, remark:remark, act:act},function(data) {
		var obj = $.parseJSON(data);
		if (obj.err_no==0) {
			layer.msg('更新成功', {icon: 1});
		} else {
			layer.alert(obj.err_msg);
		}
	})
}
</script>
</body>

</html>