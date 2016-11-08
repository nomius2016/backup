<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="favicon.ico"> <link href="/static/hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/static/hplus/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="/static/hplus/css/animate.css" rel="stylesheet">
    <link href="/static/hplus/css/font-awesome.css?v=4.4.0" rel="stylesheet">
</head>

<body class="gray-bg top-navigation">

    <div class="col-lg-12">
        <form  action="/admin/system/admin_auth_formop" method="POST">
            <div  class="form-inline">
                <div style="line-height: 15px;">&nbsp;</div>
                <select id="group"  class="form-control input-sm" name="group">
                    <?php foreach ($groups as  $group) { ?>
                        <option value="<?php echo $group['id'];?>" <?php if($group['id'] == $cur_group_id) echo "selected='selected'"?>><?php echo $group['group_name'];?></option>
                    <?php }?>
                </select>
                <div style="line-height: 5px;">&nbsp;</div>
            </div>
        
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
            <div class="col-sm-4 col-sm-offset-6">
                <button class="btn btn-primary" type="submit">保存</button>
            </div>
        </form>
    </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="/static/hplus/js/content.js"></script>
    <script type="text/javascript">
    
        $('#group').change(function(){
            window.location.href = '/admin/system/admin_auth?group_id='+$('#group').val();
        });
    </script>
</body>

</html>
