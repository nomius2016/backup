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
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2 {
            top: 900px !important;
        }
    </style>

</head>

<body class="gray-bg">
    
  <div class="ibox-content">
        <!-- <div role="form" class="form-inline">
            <div class="form-group">
                <input type="text" placeholder="请输入组名"  class="form-control" id="group_name">
            </div>
            <button class="btn btn-sm btn-primary" type="submit" onclick="gridReload()"><strong>查 询</strong></button>
        </div> -->
    </div>
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                    <div class="ibox-content">
                        <div class="jqGrid_wrapper">
                            <table id="table_list_2"></table>
                            <div id="pager_list_2"></div>
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


    <!-- Page-Level Scripts -->
    <script>
        $(document).ready(function () {

            $.jgrid.defaults.styleUI = 'Bootstrap';
            //案例详见 www.trirand.com
            $("#table_list_2").jqGrid({
                url:'/admin/system/menu?getdata=true',
                datatype: "json",
                height: 565,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 100,
                // rowList: [10, 20, 30],
                colNames: ['ID','菜单名称','等级','父级ID','排序','控制器','行为器'],
                colModel: [
                    {
                        name: 'id',
                        index: 'id',
                        width: 60
                    },
                    {
                        name: 'title',
                        index: 'title',
                        editable: true,
                        width: 60
                    },
                    {
                        name: 'level',
                        index: 'level',
                        editable: true,
                        width: 60
                    },
                    {
                        name: 'parent_id',
                        index: 'parent_id',
                        editable: true,
                        width: 60
                    },
                    {
                        name: 'display_sort',
                        index: 'display_sort',
                        editable: true,
                        width: 60
                    },
                    {
                        name: 'controller',
                        index: 'controller',
                        editable: true,
                        width: 60
                    },
                    {
                        name: 'action',
                        index: 'action',
                        editable: true,
                        width: 60
                    }
                ],
                pager: "#pager_list_2",
                viewrecords: true,
                // caption: "组列表",  列表名
                // multiselect:true,  //多选
                add: true,
                edit: true,
                addtext: '添加',
                edittext: '修改',
                hidegrid: false,
                editurl:'/admin/system/menu_op'
            });
           
            // $("#table_list_2").jqGrid('editGridRow');
            // Add selection
            // $("#table_list_2").setSelection(4, true);
            // Setup buttons
            $('#table_list_2').jqGrid('navGrid', '#pager_list_2', 
                {   //常规参数
                edit: true,
                add: true,
                del: true,
                search:true
            }, {  //修改(添加/删除)的时候的参数
                height: 150,
                reloadAfterSubmit: true,
                top:300,
                left:600,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];   //必须要返回
                },
                closeAfterEdit:true
            },{
                top:300,
                left:600,
                closeAfterAdd:true,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];
                }
            },{
                top:300,
                left:700,
                afterSubmit:function(resposedata){
                    var data = JSON.parse(resposedata.responseText);
                    if(!data.status){
                        alert(data.msg);
                    }
                    return [true,''];
                }
            }
            );

            // Add responsive to jqGrid
            $(window).bind('resize', function () {
                var width = $('.jqGrid_wrapper').width();
                $('#table_list_2').setGridWidth(width);
            });
        });



        function gridReload(){
            var group_name = $('#group_name').val();
            var url = '/admin/system/menu?getdata=true';
                url+= '&group_name='+group_name;
            jQuery('#table_list_2').jqGrid('setGridParam',{url:url,page:1}).trigger('reloadGrid');
        }

    </script>

</body>

</html>