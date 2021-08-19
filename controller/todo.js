const {
    Todo
} = require('../model')
/**
 * Create Todo
 */
exports.createTodo = async (req, res, next) => {
    try {
        const todo = new Todo(req.body.todo)
        todo.author = req.user._id
        todo.populate('author').execPopulate()
        await todo.save()
        res.status(201).json({
            todo
        });
    } catch (error) {
        next(error);
    }
}


/**
 * Get All Todo
 */
exports.getAllTodo = async (req, res, next) => {
    try {
        let { limit = 20, offset = 0 } = req.query;

        const todosCount = await Todo.countDocuments();
        const todos = await Todo.find({
                author: req.user._id
            })
            .skip(Number.parseInt(offset)) //跳过多少条
            .limit(Number.parseInt(limit)) //取多少条
            .sort({
                //-1：Descending 1：Ascending
                createdAt: -1
            })

        res.status(200).json({
            todos,
            todosCount
        });
    } catch (error) {
        next(error);
    }
}


/**
 * Get Todo
 */
exports.getTodo = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).end();
        }
        res.status(200).json({
            todo
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = req.todo;
        await todo.remove();

        res.status(204).end();
    } catch (error) {
        next(error)
    }
}