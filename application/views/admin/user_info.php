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
                            		<td><label>用户ID：</label><?php echo $user['id'];?></td>
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
                            		<td><label>状态：</label>
                            		<?php
										// 1 未激活 2激活 3 冻结
									    if ($user['status']==1) {
											echo '未激活';
										} else if ($user['status']==1) {
											echo '正常';
										} else if ($user['status']==1) {
											echo '冻结';
										}
									?>
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
                            		<td><label>冻结余额：</label>￥<?php echo $user['frozon_balance'];?></td>
                            		<td><label>绑定银行卡：</label><?php echo $user['binded_card'];?></td>
                            		<td> </td>
                            		
					        </tr>
					        <tr>
                            		<td colspan="4" ><label>子平台余额：</label>AG：￥<?php echo $user['ag_balance'];?>,  
                            				SB：￥<?php echo $user['sb_balance'];?>, 
                            				PT：￥<?php echo $user['pt_balance'];?>
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
                           		<td rowspan="2" colspan="1" class="pre"><i class="fa fa-bar-chart" style="font-size:48px;color:#ccc;"></i></td>
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
                           		<td><label>单次最小提款：</label>￥<?php echo $user['withdrawal_min'];?></td>
                           		<td><label>单次最大提款：</label>￥<?php echo $user['withdrawal_max'];?></td>
                           		<td><label>单日最大提款：</label>￥<?php echo $user['withdrawal_day_max'];?></td>
                           		<td><label>转账限制：</label>
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
    

</body>

</html>