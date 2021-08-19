const { body } = require('express-validator');
const validate = require('../middleware/validate')
const {Todo} = require('../model')


exports.createTodo = validate([
    body('todo.title').notEmpty().withMessage("Todo's title cannot be empty"),   
    body('todo.body').notEmpty().withMessage("Todo's body cannot be empty")   
])

exports.getTodo = validate([
    validate.isValidObjectId(['params'], 'id')
])

exports.deleteTodo = [validate([
    validate.isValidObjectId(['params'], 'id')]),
    //Make sure that the article's ID is real
    async (req, res, next) => {
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            res.status(404).end();
        }
        req.todo = todo;
        next();
    },
    //Find out the author
    async (req, res, next) => {
        if (req.user._id.toString() !== req.todo.author.toString()) {
            res.status(403).end()
        }
        next();
    }
]

