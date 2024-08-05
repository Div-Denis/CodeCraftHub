const express = require('express')
const connectDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')

const app = express()

// 连接数据库
connectDB()

// 中间件
app.use(express.json())

// 路由
app.use('/users', userRoutes)

// 开始服务器
const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})