import express from 'express';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
// const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path');
const app = express()

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) { //io 为全局 socket 连接，callback中的socket为
        console.log(data);                 //当前连接的socket对象。
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            console.log(doc);
            io.emit('recvmsg', Object.assign({}, doc));
        });
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
//中间件，判断是否要相对路径转化
app.use(function (req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    console.log("path.resolve", path.resolve('build/index.html'));
    //path.resolve /Users/xiaoyaoxmhl/WebstormProjects/webpacklearn/imooc-reat-redux-demo2/build/index.html

    //把reactdom渲染后 返回
    const htmlRes = renderToString(<App></App>);
    res.send(htmlRes);

    return res.sendFile(path.resolve('build/index.html'))
});
//拦截所有的地址，并转化为静态资源访问
app.use('/', express.static(path.resolve('build')))
/*
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
*/

server.listen(9093, function () {
    console.log('Node app start at port 9093')
})

function App() {
    return <h2>server render</h2>
}

console.log(App());

console.log("renderToString",renderToString(<App></App>));
//<h2 data-reactroot="">server render</h2>