/*使用 mongoose 操作 mongodb 的测试文件
 1. 连接数据库
 1.1. 引入 mongoose
  1.2. 连接指定数据库(URL 只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
  2. 得到对应特定集合的 Model
  2.1. 字义 Schema(描述文档结构)
   2.2. 定义 Model(与集合对应, 可以操作集合)
  3. 通过 Model 或其实例对集合数据进行 CRUD 操作
  3.1. 通过 Model 实例的 save()添加数据
  3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
  3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
  3.4. 通过 Model 的 remove()删除匹配的数据 */
//1
// const mongoose= require('mongoose')
// const md5=require('blueimp-md5')
// mongoose.connect('mongodb://localhost:27017/gzhipin_test')
// const conn=mongoose.connection
// conn.on('connected',function (){
//     console.log('数据库连接成功!!!')
// })
// //2
// const  userSchma=mongoose.Schema({
//     username:{type:String,required:true}, //用户名
//     password:{type:String,required: true}, //密码
//     type:{type:String,required:true},//用户类型 laoban dashen
//     header:{type:String} //头像
// })
// const UserModel=mongoose.model('user',userSchma) //集合名
// //3 CRUD
// //save
// function testSave(){
//     const user = { username: 'xfzhang', password: md5('1234'), type: 'dashen', }
//     const userModel=new UserModel(user)
//     userModel.save(function (err,user){
//         console.log('save',err,user)
//     })
// }
// testSave()
// //find
// function  testFind(){
//     //条件查询 找一个
//     UserModel.findOne({username:'xfzhang'},function (err,user){
//         console.log('findOne()',err,user)
//     })
// }
// testFind()
// //update
// function  testUpdate(){
//     UserModel.findByIdAndUpdate({_id:'60338569bfce2f3a1cfe3eb0'},{username:'kent'},function (err,user){
//         console.log('update()',err,user)
//     })
// }
// //remove
// function  testRemove(){
//     UserModel.remove({_id:'60338569bfce2f3a1cfe3eb0'},function (err,result){
//         console.log('remove()',err,result)
//     })
// }
// testRemove()