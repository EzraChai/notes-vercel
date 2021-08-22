const express = require('express');
const {port} = require('./config/default.config')
const router = require('./router')
const morgan = require('morgan');
const cors = require('cors');
const ErrorHandler = require('./middleware/error-handler')
const compression = require('compression');

require('./model')

const app = express();
app.use(compression())


app.use(morgan('dev'));
app.use(express.json());

//Access-Control-Allow-Origin: *
app.use(cors());


app.use('/api/v1',router)


//挂载统一处理服务端错误中间件
app.use(ErrorHandler())



app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})