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
		table.table2 {
			border: 1px solid #e7eaec;
		}
		table.table2 th, table.table2 td {
		border-top: 1px solid #e7eaec;
	    line-height: 1.42857;
	    padding: 8px;
	    vertical-align: middle;
		border: 1px solid #e7eaec;
		
		text-align:center;
	}
    </style>
</head>

<body class="gray-bg">
    
  <div class="ibox-content">
        <span style="font-size:24px;"><?php echo $user['account_name'];?></span> 的信息资料（<?php echo $user['online'];?>）
    </div>
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                    <div class="ibox-content">
                        <div class="jqGrid_wrapper">
                        	<table width="100%">
                            	<tr>
                            	    <td rowspan="3" colspan="1" class="pre"><i class="fa fa-user" style="font-size:48px;color:#ccc;"></i></td>
                            		<td><label>用户ID：</label><?php echo $user['user_id'];?></td>
                            		<td><label>注册时间：</label><?php echo $user['register_time'];?></td>
                            		<td><label>注册IP：</label><?php echo $user['register_ip'];?></td>
                            		<td><label>最后登录：</label><?php echo $user['last_login_time'].'('.$user['last_login_ip'].')';?></td>
                            	</tr>
                            	<tr>
                            		<td><label>上级代理：</label><?php echo $user['parent_id'];?></td>
                            		<td><label>用户层级：</label><?php echo $user['parent_path'];?></td>
                            		<td><label>真实姓名：</label><?php echo $user['name'];?></td>
                            		<td><label>用户地区：</label><?php echo $user['account_name'];?></td>
                            	</tr>
                            	<tr>
                            		<td><label>状态：</label><status data="<?php echo $user['status'];?>">
                            		<?php
										// 1 未激活 2激活 3 冻结
									    if ($user['status']==0) {
											echo '未激活';
										} else if ($user['status']==1) {
											echo '正常';
										} else if ($user['status']==2) {
											echo '冻结';
										}
									?></status> <a href="Javascript:status()" class="fa fa-pencil">更改</a>
									</td>
                            		<td><label>路径：</label><?php echo $user['parent_path'];?></td>
                            		<td><label></td>
                            		<td><label></td>
                            	</tr>
                            	
                            </table>
                            <hr/>
                            <table width="100%">
                             <tr>
					            <td rowspan="3" colspan="1" class="pre"><i class="fa fa-cny" style="font-size:48px;color:#ccc;"></i></td>
					            <td><label>账户余额：</label>￥<?php echo $user['balance'];?></td>
                            		<td><label>冻结余额：</label>￥<?php echo $user['frozon_balance'];?> <a href="Javascript:op()" class="fa fa-pencil">更改</a></td>
                            		<td><label>绑定银行卡：</label><?php echo $user['binded_card'];?></td>
                            		<td> </td>
                            		
					        </tr>
					        <tr>
                            		<td colspan="4" ><label>子平台余额：</label>AG：￥<?php echo $user['balance-100'];?>,  
                            				SB：￥<?php echo $user['balance-101'];?>, 
                            				PT：￥<?php echo $user['balance-102'];?>
                            		</td>
					        </tr>
					        <tr>
					            <td><label>绑定银行卡：</label></td>
					            <td></td>
					            <td></td>
					            <td></td>
					        </tr>
					       </table>
					       <hr/>
					       <table width="100%">
                            <tr>
                           		<td rowspan="2" colspan="1" class="pre"><i class="fa fa-pie-chart" style="font-size:44px;color:#ccc;"></i></td>
                           		<td><label>总充值：</label>￥<?php echo $user['total_deposit'];?></td>
                           		<td><label>总提现：</label>￥<?php echo $user['total_withdraw'];?></td>
                           		<td><label>总投注：</label>￥<?php echo $user['total_bet'];?></td>
                           		<td><label>平台盈利：</label>
                           		￥<?php echo ($user['total_deposit']-$user['total_withdraw']);?>
                           		</td>
                           	</tr>
                           	<tr>
					            <td>活动费用：<?php echo $user['activity_cost'];?></td>
					            <td></td>
					            <td></td>
					            <td></td>
					        </tr>
					        </table>
					        <hr/>
					        <table width="100%">
                            <tr>
                           		<td rowspan="2" colspan="1" class="pre"><i class="fa fa-gear" style="font-size:48px;color:#ccc;"></i></td>
                           		<td><label>单次最小提款：</label>￥<?php echo $user['withdrawal_min'];?> <a href="Javascript:restrict('withdrawal_min')" class="fa fa-pencil">更改</a></td>
                           		<td><label>单次最大提款：</label>￥<?php echo $user['withdrawal_max'];?> <a href="Javascript:restrict('withdrawal_max')" class="fa fa-pencil">更改</a></td>
                           		<td><label>单日最大提款：</label>￥<?php echo $user['withdrawal_day_max'];?> <a href="Javascript:restrict('withdrawal_day_max')" class="fa fa-pencil">更改</a></td>
                           		<td><label>允许充值：</label>
                           		<recharge data="<?php echo $user['extra']['allow_recharge'];?>">
                           		<?php
									    if ($user['extra']['allow_recharge']==1) {
											echo '是';
										} else {
											echo '否';
										}
								?>
                           		</recharge>
                           		 <a href="Javascript:recharge()" class="fa fa-pencil">更改</a>
                           		</td>
                           	</tr>
                           	<tr>
					            <td colspan="4">
					            <table class="table2">
						        <tr>
						        	<th rowspan="1" colspan="1" style="word-break: break-all;">第三方游戏平台</th>
						            <th rowspan="1" colspan="2">AG</th>
						            <th rowspan="1" colspan="2">SB</th>
						            <th rowspan="1" colspan="2">PT</th>
						        </tr>
						        <tr>
						        	<td rowspan="2" colspan="1" style="word-break: break-all;">转账允许</td>
						            <td colspan="1" rowspan="1">转入</td>
						            <td colspan="1" rowspan="1">转出</td>
						            <td colspan="1" rowspan="1">转入</td>
						            <td colspan="1" rowspan="1">转出</td>
						            <td colspan="1" rowspan="1">转入</td>
						            <td colspan="1" rowspan="1">转出</td>
						        </tr>
						        <tr>
						            <td><input type="checkbox" group="transfer" gaming_id="100" op="in" <?php
									if ($user['extra']['transfer'][100]['in']) {
										echo 'checked';
									}
						            ?>></td>
						            <td><input type="checkbox" group="transfer" gaming_id="100" op="out" <?php
									if ($user['extra']['transfer'][100]['out']) {
										echo 'checked';
									}
						            ?>></td>
						            
						            <td><input type="checkbox" group="transfer" gaming_id="101" op="in" <?php
									if ($user['extra']['transfer'][101]['in']) {
										echo 'checked';
									}
						            ?>></td>
						            <td><input type="checkbox" group="transfer" gaming_id="101" op="out" <?php
									if ($user['extra']['transfer'][101]['out']) {
										echo 'checked';
									}
						            ?>></td>
						            
						            <td><input type="checkbox" group="transfer" gaming_id="102" op="in" <?php
									if ($user['extra']['transfer'][102]['in']) {
										echo 'checked';
									}
						            ?>></td>
						            <td><input type="checkbox" group="transfer" gaming_id="102" op="out" <?php
									if ($user['extra']['transfer'][102]['out']) {
										echo 'checked';
									}
						            ?>></td>

						        </tr>
							</table>
					            </td>
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
$(function(){
	$('input:checkbox').click(function() {
		var group     = $(this).attr("group");
		var op        = $(this).attr("op");
		var gaming_id = $(this).attr("gaming_id");
		var val       = $(this).prop('checked')==true ? 1 : 0;
		$.post("/admin/user/set_restrict",{user_id:<?php echo $user['user_id'];?>, field:'extra', group:group, gaming_id:gaming_id, op:op, val:val},function(data) {
			//alert(data)
		});
	});   
});
function restrict(field) {
	parent.layer.prompt({
	    title: '请输入新的限定值',
	    formType: 0 //prompt风格，支持0-2
	}, function(amount){
		$.post("/admin/user/set_restrict",{user_id:<?php echo $user['user_id'];?>, field:field, val:amount},function(data) {
			var i = parent.layer.load(1, {shade: [0.1,'#fff']});
			location.reload();
		});
	});
}
function status() {
	var word;
	var status;
	var new_status_word;
	var s = $('status').attr('data');
	if (s==1) {
		word = '您是要冻结这个账号吗?';
		new_status_word = '冻结';
		status = 2;
	} else {
		word = '您是要 打开这个账号吗?';
		new_status_word = '正常';
		status = 1;
	}
	layer.confirm(word, {
		  btn: ['确定','取消'] //按钮
		}, function(){
			$.post('/admin/user/lists_op',{oper:'edit',user_id:<?php echo $user['user_id'];?>,status:status},function(){
				layer.msg('更新成功', {icon: 1});
				$('status').text(new_status_word);
				$('status').attr('data',status);
			})
		}, function(){

		});
}

function recharge() {
	var word;
	var status;
	var new_status_word;
	var s = $('recharge').attr('data');
	if (s==1) {
		word = '您是要关闭这个账号充值权限吗?';
		new_status_word = '否';
		status = 0;
	} else {
		word = '您是要 打开这个账号充值权限吗?';
		new_status_word = '是';
		status =1;
	}
	layer.confirm(word, {
		  btn: ['确定','取消'] //按钮
		}, function(){
			$.post("/admin/user/set_restrict",{user_id:<?php echo $user['user_id'];?>, field:'extra',op:'allow_recharge',val:status},function(data) {
				layer.msg('更新成功', {icon: 1});
				$('recharge').text(new_status_word);
				$('recharge').attr('data',status);
			})
		}, function(){

		});
}
</script>
</body>

</html>