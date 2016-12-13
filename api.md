***********************************************************************接口规范********************************************
前端 : 
    (1)直接受 post 的 文件流 的这种形式的数据
后端  
    (1) 获取传递的参数的方法 $this->getApiParams()
    (2) 返回前端需要的格式的方法 $this->teamapi($data);

***********************************************************************/接口规范*******************************************

(1)登录接口
	URL: /api/user/login
	参数: username,password  password必须加密之后   
	返回: 
	     成功  --> {"Success":true,"Code":"1","Message":"\u767b\u5f55\u6210\u529f!","Result":"[]"}
	     失败  --> {"Success":false,"Code":"-1","Message":"\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!","Result":"[]"}
(2)注册接口
   URL:/api/user/register
   参数: username,password,confirm_password,phone,agent_code  [密码和确认密码MD5 之后传输]
   返回: 
        成功  --> {"Success":true,"Code":"1","Message":"\u767b\u5f55\u6210\u529f!","Result":"[]"}
        失败  --> {"Success":false,"Code":"-1","Message":"\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!","Result":"[]"}