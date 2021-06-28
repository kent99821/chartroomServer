var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel,ChatModel} = require('../db/models')
const filter = {password: 0, __v: 0} // 指定过滤的属性

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册
router.post('/register',function (req,res){
  const {username,password,type}=req.body
  UserModel.findOne({username},function (err,user){
    if(user){
      res.send({code:1,msg:'此用户已存在'})//code是数据是否正常数据的标识
    }else {
      new UserModel({username,type,password:md5(password)}).save(function (err,user){
        //生成cookie(userid:user_id） 交给浏览器保存
        res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
        const data={_id:user._id,username,type}
        res.send({code:0,data}) //不返回密码
      })
    }
  })
})
//登录
router.post('/login',function (req,res){
  const{username,password}=req.body
  UserModel.findOne({username,password:md5(password)},filter,function (err,user){
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或密码错误'})
    }
  })
})
//更新用户信息路由
router.post('/update',function (req,res){
  // 从请求的cookies
  const userid=req.cookies.userid
  if(!userid){
   return res.send({code:1,msg:'请先登陆'})
  }
  //  得到用户提交的数据
  const user=req.body //没有下划线id
  UserModel.findByIdAndUpdate({_id:userid},user,function (error,oldUser){
      if(!oldUser){
      //  删除userid cookies
        res.clearCookie('userid')
        res.send({code:1,msg:'请先登陆'})
      }else{
        const {_id,username,type}=oldUser
        const  data=Object.assign({_id,username,type},user)
        res.send({code:0,data})
      }
  })
})
//获取用户信息路由
router.get('/user',function (req,res){
  // 从请求的cookies
  const userid=req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登陆'})
  }
//  查询对应的user
  UserModel.findOne({_id:userid},filter,function (error,user){
    res.send({code:0,data:user})
  })
})
//获取用户列表（根据类型）

router.get('/userlist',function (req,res){
  const {type}=req.query
  UserModel.find({type},filter,function (err,users){
    res.send({code:0,data:users})
  })
})

//获取当前用户的相关聊天信息列表
router.get('/msglist',function (req,res){
  const userid=req.cookies.userid


  UserModel.find(function (err, userDocs) {

    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    } , {})
    /*
    查询userid相关的所有聊天信息
     参数1: 查询条件
     参数2: 过滤条件
     参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
//修改指定消息为已读
router.post('/readmsg',function (req,res){
  const from=req.body.from
  const to=req.cookies.userid
//更新数据库的chat数据
//  参数：查询条件 更新为指定的数据对象 是否为1次更新多条 默认只更新1条 更新完成的回调函数
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function (err,doc){
    console.log('/readmsg',doc)
    res.send({code:0,data:doc.nModified})//更新的数量
  })
})
module.exports = router;
