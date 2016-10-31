<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="favicon.ico"> <link href="/static/hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/static/hplus/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="/static/hplus/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="/static/hplus/css/animate.css" rel="stylesheet">
</head>

<body class="gray-bg top-navigation">
    <div class="col-lg-12">
        <form  action="/admin/index/login" method="POST">
            <div class="ibox float-e-margins">
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>菜单</th>
                                    <th>隐藏</th>
                                    <th>查看</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php echo $menu_html;?>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </form>
    </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
 
</body>

</html>
