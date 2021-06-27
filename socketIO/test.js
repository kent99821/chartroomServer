module.exports = function (server) {
    // 得到 IO 对象
const io = require('socket.io')(server,{cors:true})
// 监视连接(当有一个客户连接上时回调)
io.on('connection', function (socket)
{
    console.log('soketio connected')
    //绑定监听 接收客户端发送的消息
    socket.on('sendMsg',function (data){
        console.log('服务器接收到客户端的消息',data)
        data.name=data.name.toUpperCase()
        socket.emit('receviceMsg',{name:data.name})
    })

})

}