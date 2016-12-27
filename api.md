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
    

> * 2 注册接口

    URL:/api/user/register

`username` [目前没限制格式-必填]

`password` [32位长度-必填]

`confirm_password` [后端没校验,随意]

`phone` [低于13位数字]

`agent_code` [10位以下数字]  [密码和确认密码MD5 之后传输]
    

> * 3 登出接口

    URL:/api/user/logout

> * 4 用户基本信息
    
    URL:/api/user/basic_info

```json
"Result": [{
  "username": "dick",  //用户名
  "last_login_time": "2016-12-27 01:19:22",//上次登录时间
  "last_login_ip": "127.0.0.1",//上次与登录IP
  "total_balance": "100.00",//总资金
  "can_withdrawal": "100.00",//可以提款金额
  "email_checked": false, //邮箱是否验证
  "id_checked": false,  //身份是否验证
  "phone_checked": false, //手机是否验证
  "profile_percent": 60 //资料完善度
}]  
```

> * 5 token验证接口

    URL:/api/token/valid_token
    参数:token
```json
"Result": [{
  "Token": "843af1eba76841c6037b0b70fe9bcb0f",
  "AccountId": "Tom",
  "Status": 1
}]
```

> * 6 获取用户余额

    URL:/api/user/balance
```json
"Result": [{
  "balance": "0", //余额
  "balance_locked": "0" //锁定金额
}]
```

> * 7 用户存款记录

    URL:/api/deposit/history

`page`第几页

```json
"Result": {
  "rows":[], //每一行记录
  "total":1, //总记录数
  "page":1   // 一共有几页
}
```

> * 8 用户存款

    URL:/api/deposit/apply

`amount` 存款金额

`pay_method_id`存款方式

```json
"Result": [{
  "balance": "0", //余额
  "balance_locked": "0" //锁定金额
}]
```

> * 9 用户提现记录

    URL:/api/withdraw/history

`page` 第几页

```json
"Result": {
  "rows":[],
  "total":10,
  "page":1
}
```

> * 10 用户申请提现

    URL:/api/withdraw/apply

`amount`提现金额

`user_card_id`提现银行卡号

`fund_password`资金密码

```json
"Result": [{
  "balance": "0", //余额
  "balance_locked": "0" //锁定金额
}]
```

> * 11 获取用户账变记录

    URL:/api/fund/log

`page`第几页

```json
"Result": {
  "rows":[],
  "total":10,
  "page":1
}
```


> * 12 检查用户名是否存在

    URL:api/user/check_username

`username` 用户名


> * 13 检查已登录用户资金密码

    URL:api/user/check_fundpassword

`fund_password`用户资金密码需要MD5之后传输


> * 14 获取充值用的银行卡

    URL:/api/deposit/get_online_bank

```json
"Result": [
  {
    "payment_method_id": "6",
    "bank_name": "工商银行",
    "bank_address": "中国工商一行福建支行",
    "account_no": "6222084402005312444",
    "name": "张三"
  }
  ...
]
```

> * 15 获取用户提款银行卡

    URL: api/withdraw/getUserWithdrawalCards

```json
"Result": [{
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
}]
```

> * 16 获取消息或公告接口

    URL: api/message/get
`type`消息类型 `0`公告，`type=1`私人的消息


```json
"Result":{
  "rows":[
    {
      "id":"34091",
      "user_id":"1",
      "title":"标题",
      "content":"\u5b58\u6b3e\u6d41\u6c34\u53f7:[000052ed53db93a81601]",
      "type":"1",
      "is_read":"1",
      "is_important":"0",
      "send_time":"2014-08-01 21:20:18",
      "admin_name":"lemor",
      "update_admin_id":"63",
      "update_time":"2014-08-01 21:21:42",
      "create_admin_id":"63",
      "create_time":"2014-08-01 21:20:18"
    }
    ...
  ],
  "total":2,
  "page":1
}
```

> * 17 获取消息或公告接口

    URL: api/message/detail

`id`公告或消息的ID

```json
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
```

> * 18 转账接口

    URL: api/transfer/index

`amount` 转账金额

`io` [1 代表平台转入到中心钱包 0 代表中心钱包到pingtai ]

`gaming_id`代表游戏平台ID


> * 19 获取平台信息

    URL: api/publicapi/getmaingames

```json
"Result": [
  {
    "gaming_id": "100",//game ID
    "code": "AG",      //游戏平台别称
    "name": "AG平台",  //名称
    "status": "1"      // 状态 1 正常,2中心到平台,3平台到中心,4不能转账,5不能访问且不能转账 ',
  }
  ...
]
```