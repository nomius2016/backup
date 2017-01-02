<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="/favicon.ico"> <link href="/static/hplus/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/static/hplus/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="/static/hplus/css/animate.css" rel="stylesheet">
    <link href="/static/hplus/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/static/hplus/css/plugins/webuploader/webuploader.css">
    <link rel="stylesheet" type="text/css" href="/static/hplus/css/plugins/webuploader/webuploader-demo.css">
    <link href="/static/hplus/css/plugins/summernote/summernote.css" rel="stylesheet">
    <link href="/static/hplus/css/plugins/summernote/summernote-bs3.css" rel="stylesheet">
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                    <div class="ibox-content">
                        <form method="get" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">活动标题</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">副标题</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">活动类型</label>
                                <div class="col-sm-1">
                                    <select class="form-control m-b" name="account">
                                        <option>存提款</option>
                                        <option>体育</option>
                                        <option>娱乐场</option>
                                        <option>电子游戏</option>
                                        <option>彩票</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">活动金额</label>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">金额描述</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">活动时间：</label>
                                <div class="col-sm-10">
                                    <input placeholder="开始时间" class="form-control layer-date" id="start">
                                    <input placeholder="结束时间" class="form-control layer-date" id="end">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">活动图片：</label>
                                <div class="col-sm-3">
                                <!-- <div class="ibox-content">
                                    <div class="page-container"> -->
                                        <div id="uploader" class="wu-example">
                                            <div class="queueList">
                                                <div id="dndArea" class="placeholder">
                                                    <div id="filePicker"></div>
                                                    <p>或将照片拖到这里，单次最多可选1张</p>
                                                </div>
                                            </div>
                                            <div class="statusBar" style="display:none;">
                                                <div class="progress">
                                                    <span class="text">0%</span>
                                                    <span class="percentage"></span>
                                                </div>
                                                <div class="info"></div>
                                                <div class="btns">
                                                    <div id="filePicker2"></div>
                                                    <div class="uploadBtn">开始上传</div>
                                                </div>
                                            </div>
                                        </div>
                                  <!--   </div>
                                </div> -->
                                </div>
                            </div>
                            <div class="form-group">
                                    <label class="col-sm-2 control-label">活动内容：</label>
                                    <div class="col-sm-9">
                                        <div class="ibox float-e-margins">
                                            <div class="ibox-content no-padding">
                                                <div class="summernote">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button class="btn btn-primary" type="submit">保存内容</button>
                                    <button class="btn btn-white" type="submit">取消</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    <!-- 全局js -->
    <script src="/static/hplus/js/jquery.min.js?v=2.1.4"></script>
    <script src="/static/hplus/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="/static/hplus/js/content.js"></script>
    <script src="/static/hplus/js/plugins/layer/laydate/laydate.js"></script>
    <script src="/static/hplus/js/plugins/summernote/summernote.min.js"></script>
    <script src="/static/hplus/js/plugins/summernote/summernote-zh-CN.js"></script>
    <script src="/static/hplus/js/plugins/webuploader/webuploader.min.js"></script>
    <script src="/static/hplus/js/plugins/webuploader/webuploader-demo.js"></script>
    <script type="text/javascript">
        // 添加全局站点信息
        var BASE_URL = '/static/hplus/js/plugins/webuploader/';
        $(document).ready(function () {
            $('.summernote').summernote({
                lang: 'zh-CN'
            });
        });

        var start = {
            elem: '#start',
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16 23:59:59', //最大日期
            istime: true,
            istoday: false,
            choose: function (datas) {
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };
        var end = {
            elem: '#end',
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(),
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false,
            choose: function (datas) {
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };
        
        laydate(start);
        laydate(end);

    </script>

   
</body>

</html>
