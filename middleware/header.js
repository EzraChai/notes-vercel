const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/default.config')
const { User } = require('../model')

module.exports = async(req,res,next) => {
    //从请求头获取 token 数据
    let token = req.headers['authorization'];
    token = token.split('Bearer ')[1];

    if(!token){
        return res.status(401).end();
    }

    //验证 token 是否有效
    try {
        //有效 -> 把用户信息读取出来挂载到 req 请求对象上继续往后执行
        const decodedToken = await verify(token,jwtSecret);
        console.log("Decoded Token",decodedToken);
        req.user = await User.findById(decodedToken.userId);
    } catch (error) {
        //无效 -> 响应 401
        return res.status(401).end();
    }
    next();
}