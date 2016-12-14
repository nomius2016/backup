### 接口规范
> 前端 : 
  - (1)直接受 post 的 文件流 的这种形式的数据
> 后端  
  - (1) 获取传递的参数的方法 $this->getApiParams()
  - (2) 返回前端需要的格式的方法 $this->teamapi($data);

## 接口规范

> (1)登录接口
	URL: /api/user/login
	参数: username[目前没限制格式-必填],password[32位长度-必填]  password必须加密之后   
	返回: 
	  - 成功  --> `{"Success":true,"Code":"1","Message":"\u767b\u5f55\u6210\u529f!","Result":"[]"}`
	  - 失败  --> `{"Success":false,"Code":"-1","Message":"\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!","Result":"[]"}`
> (2)注册接口
   URL:/api/user/register
   参数: username[目前没限制格式-必填],password[32位长度-必填],confirm_password[后端没校验,随意],phone[低于13位数字],agent_code[10位以下数字]  [密码和确认密码MD5 之后传输]
   返回: 
        成功  --> `{"Success":true,"Code":"1","Message":"\u767b\u5f55\u6210\u529f!","Result":"[]"}`
        失败  --> `{"Success":false,"Code":"-1","Message":"\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!","Result":"[]"}`
> (3)登出接口
   URL:/api/user/logout
   参数:无
   返回 --> `{"Success":true,"Code":1,"Message":"\u6210\u529f\u767b\u51fa","Result":[]}`
> (4) 用户基本信息
  URL:/api/user/basic_info
  参数:无
> (5) token验证接口
  URL:/api/token/valid_token
  参数:token
  返回:
      成功 --> `{"Success":true,"Code":1,"Message":"\u5728\u7ebf!","Result":[{"Token":"843af1eba76841c6037b0b70fe9bcb0f","AccountId":"Tom","Status":1}]}`
      失败 --> `{"Success":false,"Code":-1,"Message":"\u5f53\u524d\u672a\u767b\u5f55!","Result":[]}`