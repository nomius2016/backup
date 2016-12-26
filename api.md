## 接口规范
* 前端 : 
  * 直接受 post 的 文件流 的这种形式的数据
* 后端  
  * 获取传递的参数的方法 `$this->getApiParams()` 
  * 返回前端需要的格式的方法 `$this->teamapi($data)`

## API接口

> * 1 登录接口

    URL:/api/user/login
`username` [目前没限制格式-必填]
`password` [32位长度-必填]  password必须加密之后 
    
```json
{
  "Success": true,
  "Code": "1",
  "Message": "\u767b\u5f55\u6210\u529f!",
  "Result": "[]"
}// 成功
```
```json
{
  "Success": false,
  "Code": "-1",
  "Message": "\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!",
  "Result": "[]"
}// 失败
```
> * 2 注册接口

    URL:/api/user/register
`username` [目前没限制格式-必填]
`password` [32位长度-必填]
`confirm_password` [后端没校验,随意]
`phone` [低于13位数字]
`agent_code` [10位以下数字]  [密码和确认密码MD5 之后传输]
    
```json
{
  "Success": true,
  "Code": "1",
  "Message": "\u767b\u5f55\u6210\u529f!",
  "Result": "[]"
}
```
```json
{
  "Success": false,
  "Code": "-1",
  "Message": "\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e!",
  "Result": "[]"
}
```
> * 3 登出接口

    URL:/api/user/logout
```json
{
  "Success": true,
  "Code": 1,
  "Message": "\u6210\u529f\u767b\u51fa",
  "Result": []
}
```
> * 4 用户基本信息
    
    URL:/api/user/basic_info

> * 5 token验证接口

    URL:/api/token/valid_token
    参数:token
```json
{
  "Success": true,
  "Code": 1,
  "Message": "\u5728\u7ebf!",
  "Result": [{
    "Token": "843af1eba76841c6037b0b70fe9bcb0f",
    "AccountId": "Tom",
    "Status": 1
  }]
}
```
```json
{
  "Success": false,
  "Code": -1,
  "Message": "\u5f53\u524d\u672a\u767b\u5f55!",
  "Result": []
}
```
> * 6 获取用户资金信息

    URL:/api/user/balance
```json
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": [{
    "balance": "0", //余额
    "balance_locked": "0" //锁定金额
  }]
}
```
```json
{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```



> * 7 用户存款记录

    URL:/api/deposit/history
```json
{
  page:?
} // page 第几页
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": {
  	  "rows":[], //每一行记录
	  "total":1, //总记录数
	  "page":1   // 一共有几页
   }
}

{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```

> * 8 用户存款

    URL:/api/deposit/apply
```json
{
  amount:?,
  pay_method_id:?
}
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": [{
    "balance": "0", //余额
    "balance_locked": "0" //锁定金额
  }]
}

{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```


> * 9 用户提现记录

    URL:/api/withdraw/history
```json
{
  page:?
} // page 第几页
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": {
  	  "rows":[],
	  "total":10,
	  "page":1
   }
}

{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```

> * 10 用户申请提现

    URL:/api/withdraw/apply
```json
{
	amount:?, 
	user_card_id:?
	fund_password:? // 金额和绑定的银行卡id
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": [{
    "balance": "0", //余额
    "balance_locked": "0" //锁定金额
  }]
}

{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```



> * 11 获取用户账变记录

    URL:/api/fund/log
```json
{page:?} // page 第几页
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": {
  	  "rows":[],
	  "total":10,
	  "page":1
   }
}

{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```

> * 12 个平台间转转账

    URL:/api/user/balance
```json
{ from:'blance',to:'AG', amount:?} //from 从哪里留出，to 转账到哪里，amount 金额
{
  "Success": true,
  "Code": 1,
  "Message": "\u83b7\u53d6\u6210\u529f",
  "Result": [{
    "balance": "0", //余额
    "relation_balance": "0" // 相关操作的平台余额
  }]
}
{
  "Success": false,
  "Code": -1,
  "Message": "\u767b\u5f55\u72b6\u6001\u4e22\u5931!",
  "Result": []
}
```


> * 获取用户积分和等级
    URL:api/user/vippoint
```json
  {}  不需要参数
  {
  "Success": true,
  "Code": 1,
  "Message": "获取成功",
  "Result": [
    {
      "monthPoint": 0,            //月度积分
      "yearPoint": 0,             //年度积分
      "vipName": "VIP1",          //晋级的 VIP 名称
      "LevelUpBonus": "168.00"    //会员晋级即可领取 的金额
    }
  ]
}

json    

> *获取用户登录信息
  URL:api/user/login_info
```json
  {}  不需要参数
  {
  "Success": true,
  "Code": 1,
  "Message": "用户未登录",
  "Result": [
    {
      "MainAccountID": "dick",  //用户名
      "FirstName": "",   //姓名
      "BalanceAmount": "0",  //中心钱包 余额 
      "ContactNumber": "13211111111", //联系电话
      "EMail": "",  //电子邮箱
      "Birthday": "1990-11-11",
      "Gender": "",
      "CountryID": "",
      "AreaCode": "86",
      "ZipCode": null,
      "City": null,
      "Address": null,
      "CountryName": "中国",
      "IDVerifiedNumber": "",
      "CurrencyID": 2,
      "LanguageCode": "zh-cn",
      "MiddleName": "",
      "LastName": "",
      "HandicapID": 2,
      "Region": null,
      "NewsLetter": 1,
      "LevelTypeID": "2",
      "MainAccountSN": "d3c1ec19-2748-4a03-9f68-7e5379d46007",
      "SecurityQuestionID": null,
      "SecurityAnswer": null,
      "LastLoginTime": "2016-12-16T12:31:44.983",
      "CreateTime": "2016-06-17T10:16:02.883",
      "PromotionID": 134496,
      "MainAccountType": 1
    }
  ]
}

json 


> *检查用户帐号接口
  URL:api/user/check_username
```json
  {'username':'Tom'}  //用户名

  如果帐号存在返回 
    {
      "Success": true,
      "Code": 1,
      "Message": "帐号存在",
      "Result": []
    }

  帐号不存在返回
    {
      "Success": false,
      "Code": -1,
      "Message": "帐号不存在",
      "Result": []
    }

> *检查已登录用户资金密码
  URL:api/user/check_fundpassword
```json
  {'fund_password':'f97b6ec32544b5e6dfbd459cca60edef'}  //用户资金密码需要MD5之后传输

  资金密码正确存在返回 
    {
    "Success": true,
    "Code": 1,
    "Message": "资金密码正确!",
    "Result": []
  }

  资金密码错误返回
    {
      "Success": false,
      "Code": -1,
      "Message": "资金密码错误!",
      "Result": []
    }




> *获取充值用的银行卡
URL:/api/deposit/get_online_bank

参数 {} 无
成功的时候返回
    {
      "Success": true,
      "Code": 1,
      "Message": "获取成功",
      "Result": [
        {
          "payment_method_id": "6",
          "bank_name": "工商银行",
          "bank_address": "中国工商一行福建支行",
          "account_no": "6222084402005312444",
          "name": "张三"
        },
        {
          "payment_method_id": "10",
          "bank_name": "招商银行",
          "bank_address": "招商银行天津支行",
          "account_no": "6222084402005312449",
          "name": "康熙"
        },
        {
          "payment_method_id": "8",
          "bank_name": "中国银行",
          "bank_address": "中国银行湖北支行",
          "account_no": "62220844020053124446",
          "name": "王麻子"
        },
        {
          "payment_method_id": "7",
          "bank_name": "农业银行",
          "bank_address": "中国农业银行北京支行",
          "account_no": "6222084402005312445",
          "name": "李四"
        },
        {
          "payment_method_id": "9",
          "bank_name": "建设银行",
          "bank_address": "建设银行陕西支行",
          "account_no": "6222084402005312447",
          "name": "乾隆"
        }
      ]
    }

  失败返回
  {
    "Success": false,
    "Code": -1,
    "Message": "无可用银行卡",
    "Result": []
  }

>* 获取用户提款银行卡

URL: api/withdraw/getUserWithdrawalCards
参数:无
成功时返回
{
  "Success": true,
  "Code": 1,
  "Message": "获取成功",
  "Result": [
    {
      "id": "124", 
      "user_id": "22",   //用户ID
      "name": "昂山",     //卡主姓名
      "bank_code": "ICBC",  //银行编码
      "bank_name": "工商银行", //银行
      "account_no": "123341234134", //银行账号
      "display_name": "工行一",  //用户设置的银行卡昵称 比如 "常用卡"
      "branch_name": "福建支行",  //开户行 分行地址
      "create_time": "2016-12-23 00:45:43",
      "status": "1"
    }
  ]
}

失败返回
{"Success":false,"Code":-1,"Message":"\u7528\u6237\u672a\u767b\u9646","Result":[]}


>* 获取消息或公告接口

URL: api/message/get
参数:{type: ?} type=1 公告，type=1私人的消息
成功时返回
{
	"Success":true,
	"Code":1,
	"Message":"\u83b7\u53d6\u6210\u529f",
	"Result":{
		"rows":[
			{"id":"34091","user_id":"1","title":"\u60a8\u597d\uff0c\u60a8\u7684\u5b58\u6b3e\u672a\u901a\u8fc7\u5ba1\u6838\uff0c\u8be6\u60c5\u54a8\u8be2\u5728\u7ebf\u5ba2\u670d\u3002","content":"\u5b58\u6b3e\u6d41\u6c34\u53f7:[000052ed53db93a81601]","type":"1","is_read":"1","is_important":"0","send_time":"2014-08-01 21:20:18","admin_name":"lemor","update_admin_id":"63","update_time":"2014-08-01 21:21:42","create_admin_id":"63","create_time":"2014-08-01 21:20:18"},{"id":"34092","user_id":"2","title":"\u60a8\u597d\uff0c\u60a8\u7684\u53d6\u6b3e\u5df2\u7ecf\u901a\u8fc7\u5ba1\u6838\u3002","content":"\u53d6\u6b3e\u6d41\u6c34\u53f7:[0000752353db93159483]","type":"1","is_read":"0","is_important":"0","send_time":"2014-08-01 21:21:17","admin_name":"lemor","update_admin_id":"63","update_time":"2014-08-01 21:21:17","create_admin_id":"63","create_time":"2014-08-01 21:21:17"},
			{"id":"34093","user_id":"3","title":"\u60a8\u597d\uff0c\u60a8\u7684\u53d6\u6b3e\u5df2\u7ecf\u901a\u8fc7\u5ba1\u6838\u3002","content":"\u53d6\u6b3e\u6d41\u6c34\u53f7:[000061b853db94054273]","type":"1","is_read":"1","is_important":"0","send_time":"2014-08-01 21:25:28","admin_name":"lemor","update_admin_id":"63","update_time":"2014-08-01 21:43:30","create_admin_id":"63","create_time":"2014-08-01 21:25:28"},{"id":"34094","user_id":"1","title":"\u60a8\u597d\uff0c\u60a8\u7684\u5b58\u6b3e\u5df2\u7ecf\u901a\u8fc7\u5ba1\u6838\u3002","content":"\u5b58\u6b3e\u6d41\u6c34\u53f7:[000052ed53db95225565]","type":"1","is_read":"1","is_important":"0","send_time":"2014-08-01 21:26:40","admin_name":"lemor","update_admin_id":"63","update_time":"2014-08-01 21:45:31","create_admin_id":"63","create_time":"2014-08-01 21:26:40"},
			],
		"total":2,
		"page":1
	}
}

失败返回
{"Success":false,"Code":-1,"Message":"\u7528\u6237\u672a\u767b\u9646","Result":[]}


>* 获取消息或公告接口

URL: api/message/detail
参数:{id: ?} 公告或消息的ID
成功时返回
{
	"Success":true,
	"Code":1,
	"Message":"\u83b7\u53d6\u6210\u529f",
	"Result":{
		"id":"34104",
		"user_id":"2",
		"title":"\u60a8\u597d\uff0c\u60a8\u7684\u53d6\u6b3e\u5df2\u7ecf\u901a\u8fc7\u5ba1\u6838\u3002",
		"content":"\u53d6\u6b3e\u6d41\u6c34\u53f7:[0000330553dba0960972]",
		"type":"0",
		"is_read":"0",
		"is_important":"0",
		"send_time":"2014-08-01 22:17:19",
		"admin_name":"lemor",
		"update_admin_id":"63",
		"update_time":"2014-08-01 22:17:19",
		"create_admin_id":"63",
		"create_time":"2014-08-01 22:17:19"
	}
}

失败返回
{"Success":false,"Code":-1,"Message":"\u7528\u6237\u672a\u767b\u9646","Result":[]}
