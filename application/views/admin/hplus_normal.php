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
    </style>
</head>

<body class="gray-bg">
    
  <div class="ibox-content">
        <?php echo $se ?>
    </div>
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                    <div class="ibox-content">
                        <div class="jqGrid_wrapper">
                            <table id="grid_table"></table>
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
    <?php  echo $script;?>


    

</body>

</html>