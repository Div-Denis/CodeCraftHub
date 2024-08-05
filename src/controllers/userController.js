const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// 用户注册
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 检查用户名是否已经存在
        const existingUser = await User.findOne({ username })
        if(existingUser) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        // 对密码进行哈希处理
        const hashedPassword = await bcrypt.hash(password, 10)

        // 创建一个新用户
        const newUser = new User({ username, password:hashedPassword })
        await newUser.save()

        return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// 用户登录
exports.loginUser = async (req, res) => {
    
    try {
        const { username, password } = req.body

        // 检查用户是否已经存在
        const existingUser = await User.findOne({ username })
        if(!existingUser) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        // 检查密码是否正确
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect){
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        // 生成JSON Web token(JWT)
        const token = jwt.sign({ username: existingUser.username }, 'd4d2be3d807c292fd047a6de96dfb2b5f7a2bcea4e14dc9ca8f822f6d1c87dea', { expiresIn: '1h' })

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// 用户配置文件管理
exports.updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params
        const { newUsername } = req.body

        // 更新用户的用户名
        await User.updateOne({ username }, {username: newUsername})

        return res.status(200).json({ message: 'User profile updated successfully' })
    }catch (error){
        return res.status(500).json({ message: 'Internal server error' })
    }
}