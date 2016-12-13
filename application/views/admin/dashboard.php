<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dashboard</title>
    
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->

    <link rel="shortcut icon" href="/static/hplus/favicon.ico"> <link href="/static/hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/static/hplus/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="/static/hplus/css/animate.css" rel="stylesheet">
    <link href="/static/hplus/css/style.css?v=4.1.0" rel="stylesheet">
    <style type="text/css">
      .fa {
      	font-size:medium;
      }
      am {
      	font-size:12px;
      }
      small {color:#999}
      small .fa{
      	font-size:12px;
      	font-weight:normal;
      }
    </style>
</head>

<body class="gray-bg top-navigation">

    <div id="wrapper">
        <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom white-bg">
                
            </div>
            <div class="wrapper wrapper-content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-success pull-right"><d id="deposit_users"></d>人</span>
                                    <h5 class="fa fa-cny">充值</h5>
                                </div>
                                <div class="ibox-content">
                                    <h2 class="no-margins"><i class="fa fa-cny"></i><d id="deposit"></d></h2>
                                    <div class="stat-percent"><d id="y_deposit_users"></d>人
                                    </div>
                                    <small>昨日 <d id="y_deposit" class="fa fa-cny"></d></small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-info pull-right"><d id="withdraw_users"></d>人</span>
                                    <h5 class="fa fa-euro">提现</h5>
                                </div>
                                <div class="ibox-content">
                                    <h2 class="no-margins"><i class="fa fa-cny"></i><d id="withdraw"></d></h2>
                                    <div class="stat-percent"><d id="y_withdraw_users"></d>人
                                    </div>
                                    <small>昨日 <d id="y_withdraw" class="fa fa-cny"></d></small>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-primary pull-right"><d id="bet_users"></d>人</span>
                                    <h5 class="fa fa-btc">投注交易<d id="profit"></d></h5>
                                </div>
                                <div class="ibox-content">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <h2 class="no-margins"><am>投注</am><i class="fa fa-cny"></i><d id="bet"></d></h2>
                                            <div><small>昨日 <d id="y_bet" class="fa fa-cny"></d></small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <h2 class="no-margins"><am>派奖</am><i class="fa fa-cny"></i><d id="bonus"></d></h2>
                                            <div><small>昨日 <d id="y_bonus" class="fa fa-cny"></d></small>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <h5>月收入</h5>
                                    <div class="ibox-tools">
                                        <span class="label label-primary">更新</span>
                                    </div>
                                </div>
                                <div class="ibox-content no-padding">
                                    <div class="flot-chart m-t-lg" style="height: 55px;">
                                        <div class="flot-chart-content" id="flot-chart1"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="ibox float-e-margins">
                                <div class="ibox-content">
                                    <div>
                                        <span class="pull-right text-right"><!-- 
                                        <small>在过去的一个月销售的平均值：<strong>山东</strong></small>
                                            <br/>
                                            所有销售： 162,862 -->
                                        </span>
                                        <h3 class="font-bold no-margins">近30天利润走势</h3>
                                        <small>除去返点、活动费用、返点以后的利润（还未除去分红）</small>
                                    </div>

                                    <div class="m-t-sm">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="echarts" id="echarts-line-chart"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="m-t-md">
                                        <small class="pull-right">
                                        <i class="fa fa-clock-o"> 2015.02.30更新</i>
                                        
                                    </small>
                                        <small>
                                        <strong>说明：</strong> 净利润没有去除第三方游戏平台的租用成本
                                    </small>
                                    </div>

                                </div>
                            </div>
                        </div>
<!--                         <div class="col-lg-4"> -->
<!--                             <div class="ibox float-e-margins"> -->
<!--                                 <div class="ibox-title"> -->
<!--                                     <h5>用户行为统计</h5> -->
<!--                                 </div> -->
<!--                                 <div class="ibox-content"> -->
<!--                                     <div class="row"> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">访问页面 / 浏览量</small> -->
<!--                                             <h4>236 321.80</h4> -->
<!--                                         </div> -->

<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">% 新访客</small> -->
<!--                                             <h4>46.11%</h4> -->
<!--                                         </div> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">最后一周</small> -->
<!--                                             <h4>432.021</h4> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="ibox-content"> -->
<!--                                     <div class="row"> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">访问页面 / 浏览量</small> -->
<!--                                             <h4>643 321.10</h4> -->
<!--                                         </div> -->

<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">% 新访客</small> -->
<!--                                             <h4>92.43%</h4> -->
<!--                                         </div> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">最后一周</small> -->
<!--                                             <h4>564.554</h4> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                                 <div class="ibox-content"> -->
<!--                                     <div class="row"> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">访问页面 / 浏览量</small> -->
<!--                                             <h4>436 547.20</h4> -->
<!--                                         </div> -->

<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">% 新访客</small> -->
<!--                                             <h4>150.23%</h4> -->
<!--                                         </div> -->
<!--                                         <div class="col-xs-4"> -->
<!--                                             <small class="stats-label">最后一周</small> -->
<!--                                             <h4>124.990</h4> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->

                    </div>
<!--
                    <div class="row">

                        <div class="col-lg-12">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <h5>自定义响应表格</h5>
                                    <div class="ibox-tools">
                                        <a class="collapse-link">
                                            <i class="fa fa-chevron-up"></i>
                                        </a>
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                            <i class="fa fa-wrench"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#">设置选项1</a>
                                            </li>
                                            <li><a href="#">设置选项2</a>
                                            </li>
                                        </ul>
                                        <a class="close-link">
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-sm-9 m-b-xs">
                                            <div data-toggle="buttons" class="btn-group">
                                                <label class="btn btn-sm btn-white">
                                                    <input type="radio" id="option1" name="options">天</label>
                                                <label class="btn btn-sm btn-white active">
                                                    <input type="radio" id="option2" name="options">周</label>
                                                <label class="btn btn-sm btn-white">
                                                    <input type="radio" id="option3" name="options">月</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="input-group">
                                                <input type="text" placeholder="搜索" class="input-sm form-control"> <span class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-primary">搜索</button> </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>项目</th>
                                                    <th>进度</th>
                                                    <th>任务</th>
                                                    <th>日期</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>米莫说｜MiMO Show</td>
                                                    <td><span class="pie">0.52/1.561</span>
                                                    </td>
                                                    <td>20%</td>
                                                    <td>2014.11.11</td>
                                                    <td><a href="table_basic.html#"><i class="fa fa-check text-navy"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>商家与购物用户的交互试衣应用</td>
                                                    <td><span class="pie">6,9</span>
                                                    </td>
                                                    <td>40%</td>
                                                    <td>2014.11.11</td>
                                                    <td><a href="table_basic.html#"><i class="fa fa-check text-navy"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>天狼---智能硬件项目</td>
                                                    <td><span class="pie">3,1</span>
                                                    </td>
                                                    <td>75%</td>
                                                    <td>2014.11.11</td>
                                                    <td><a href="table_basic.html#"><i class="fa fa-check text-navy"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>线下超市+线上商城+物流配送互联系统</td>
                                                    <td><span class="pie">4,9</span>
                                                    </td>
                                                    <td>18%</td>
                                                    <td>2014.11.11</td>
                                                    <td><a href="table_basic.html#"><i class="fa fa-check text-navy"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
-->
                </div>

            </div>
        </div>
    </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="/static/hplus/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="/static/hplus/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="/static/hplus/js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="/static/hplus/js/hplus.js?v=4.1.0"></script>
    <script type="text/javascript" src="/static/hplus/js/contabs.js"></script>
    <script src="/static/hplus/js/content.js"></script>
    <!-- 第三方插件 -->
    <script src="/static/hplus/js/plugins/pace/pace.min.js"></script>
<!--
    <script src="http://www.zi-han.net/theme/hplus/js/plugins/flot/jquery.flot.js"></script>
    <script src="http://www.zi-han.net/theme/hplus/js/plugins/chartJs/Chart.min.js"></script>
-->

<script src="/static/hplus/js/plugins/echarts/echarts-all.js"></script>

<script type="text/javascript">
  	function data_parse() {
  	  	$.getJSON('/admin/data/dashboard',{},function(o) {
  	  	  	//console.log(o.deposit.y['amount']);
  	  	  	$('#deposit').text(o.deposit.t['amount']);
  	  	  	$('#deposit_users').text(o.deposit.t['users']);
  	  	  	$('#withdraw').text(o.withdraw.t['amount']);
  	  	  	$('#withdraw_users').text(o.withdraw.t['users']);
  	  	  	
  	  	  	$('#y_deposit').text(o.deposit.y.amount);
	  	  	$('#y_deposit_users').text(o.deposit.y.users);
	  	  	$('#y_withdraw').text(o.withdraw.y.amount);
	  	  	$('#y_withdraw_users').text(o.withdraw.y.users);
	  	  	
  	  	  	$('#bet').text(o.bet.t['amount']);
  	  	  	$('#bet_users').text(o.bet.t['users']);
  	  	  	$('#y_bet').text(o.bet.y);
  	  	  	$('#bonus').text(o.bonus.t);
  	  	  	$('#y_bonus').text(o.bonus.y);

  	  	  	var lineChart = echarts.init(document.getElementById("echarts-line-chart"));
  	  	    var lineoption = option = {
  	  	    tooltip : {
  	  	        trigger: 'axis'
  	  	    },
  	  	  	color: ['#ccffff','#5ab1ef','#1c84c6'],
  	  	    calculable : true,
  	  	    legend: {
  	  	        data:['毛利润','净利润','现金利润']
  	  	    },
  	  	    xAxis : [
  	  	        {
  	  	            type : 'category',
  	  	            data : o.profit_line.labels,
  	  	  	        xisLabel: {
      	                show: true,
        	            interval: 1,
      	                textStyle: {
      	                    color: '#990000'
      	                }
      	            },
        	        axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            width: 1
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    }
  	  	        }
  	  	    ],
  	  	    yAxis : [
  	  	        {
  	  	  	        color:'f5994e',
  	  	            type : 'value',
  	  	            name : '利润',   
      	  	  	    axisLabel: {
      	  	  	  	    formatter: '{value}万',
      	                show: true,
      	            },
        	        axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: '#666',
                            width: 1
                        }
                    },
  	  	        },
  	  	        {
  	  	        	show:false
  	  	        }
  	  	    ],
  	  	    series : [
  	  	        {
  	  	            name:'毛利润',
  	  	            type:'bar',
  	  	            data:o.profit_line.profit_gross,
  	  	  	        markPoint : {
  	    	  	        data : [ 
  	    	    	  	    {type : 'max',name : '最高'}, 
  	    	  	            {type : 'min',name : '最低'}
  	    	  	        ]
  	    	  	    },
  	  	        },
  	  	        {
  	  	            name:'净利润',
  	  	            type:'bar',
  	  	            data:o.profit_line.profit_net,
  	  	  	        markPoint : {
  	    	  	        data : [ 
  	    	    	  	    {type : 'max',name : '最高'}, 
  	    	  	            {type : 'min',name : '最低'}
  	    	  	        ]
  	    	  	    },
  	  	        },
  	  	        {
  	  	            name:'现金利润',
  	  	            type:'line',
  	  	            //yAxisIndex: 1, //不在自己的纵坐标索引
  	  	            data:o.profit_line.profit_cash,
  	  	  	        markPoint : {
	    	  	        data : [ 
	    	    	  	    {type : 'max',name : '最高'}, 
	    	  	            {type : 'min',name : '最低'}
	    	  	        ]
	    	  	    },
  	  	        }
  	  	    ]};           
  	  	    lineChart.setOption(lineoption);
  	  	    $(window).resize(lineChart.resize);
  	  	    
/*
  	  	  	var d1=[[1262304000000,6],[1264982400000,3057],[1267401600000,20434],[1270080000000,31982],[1272672000000,26602],[1275350400000,27826],[1277942400000,24302],[1280620800000,24237],[1283299200000,21004],[1285891200000,12144],[1288569600000,10577],[1291161600000,10295]];
  	  	 	 var d2=[[1262304000000,5],[1264982400000,200],[1267401600000,1605],[1270080000000,6129],[1272672000000,11643],[1275350400000,19055],[1277942400000,30062],[1280620800000,39197],[1283299200000,37000],[1285891200000,27000],[1288569600000,21000],[1291161600000,17000]];
  	  	 	 var data1=[{label:"数据1",data:d1,color:"#17a084"},{label:"数据2",data:d2,color:"#127e68"}];$.plot($("#flot-chart1"),data1,{xaxis:{tickDecimals:0},series:{lines:{show:true,fill:true,fillColor:{colors:[{opacity:1},{opacity:1}]},},points:{width:0.1,show:false},},grid:{show:false,borderWidth:0},legend:{show:false,}});

  	  	 	 var lineData={
  	  	 		 	 labels:
  	  	 		 	 datasets:[
  	 		 	     {
                        label:"毛利润",
                        fillColor:"rgba(220,220,220,0.5)",
                        strokeColor:"rgba(220,220,220,1)",
                        pointColor:"rgba(220,220,220,1)",
                        pointStrokeColor:"#fff",
                        pointHighlightFill:"#fff",
                        pointHighlightStroke:"rgba(220,220,220,1)",
                        data:
  	  	 		 	 },
    	  	  	  	 {
  	  	 	 		 	 label:"净利润",
  	  	 	 		 	 fillColor:"rgba(102,204,255,0.3)",
  	  	 	 		 	 strokeColor:"rgba(102,204,255,0.6)",
  	  	 	 		 	 pointColor:"rgba(102,204,255,1)",
  	  	 	 		 	 pointStrokeColor:"#fff",
  	  	 	 		 	 pointHighlightFill:"#fff",
  	  	 	 		 	 pointHighlightStroke:"rgba(26,179,148,1)",
  	  	 	 		 	 data:
  	  	 		 	 },
  	  	  	 		 {
  	  	 	 		 	 label:"现金利润",
  	  	 	 		 	 fillColor:"rgba(28,132,198,0.7)",
  	  	 	 		 	 strokeColor:"rgba(28,132,198,0.8)",
  	  	 	 		 	 pointColor:"rgba(28,132,198,1)",
  	  	 	 		 	 pointStrokeColor:"#fff",
  	  	 	 		 	 pointHighlightFill:"#fff",
  	  	 	 		 	 pointHighlightStroke:"rgba(26,179,148,1)",
  	  	 	 		 	 data:
  	  	 		 	 }]
  	  	 	 };
  	  	 	 var lineOptions={
  	  	 		 	 scaleShowGridLines:true,
  	  	 		 	 scaleGridLineColor:"rgba(0,0,0,.05)",
  	  	 		 	 scaleGridLineWidth:1,
  	  	 		 	 bezierCurve:true,
  	  	 		 	 bezierCurveTension:0.4,
  	  	 		 	 pointDot:true,
  	  	 		 	 pointDotRadius:4,
  	  	 		 	 pointDotStrokeWidth:1,
  	  	 		 	 pointHitDetectionRadius:20,
  	  	 		 	 datasetStroke:true,
  	  	 		 	 datasetStrokeWidth:2,
  	  	 		 	 datasetFill:true,
  	  	 		 	 responsive:true,
  	    	  		
  	  	 	 };
  	  	 	 var ctx=document.getElementById("lineChart").getContext("2d");
  	  	 	 var myNewChart=new Chart(ctx).Line(lineData,lineOptions)
	  	 	 */
  	  	});
    	setTimeout('data_parse()',10000); 
  	}
  	data_parse();
</script>
</body>

</html>
