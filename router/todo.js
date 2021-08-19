const express = require('express');
const router = express.Router();
const TodoController = require('../controller/todo');
const { createTodo,deleteTodo,getTodo } = require('../validator/todo');
const header = require('../middleware/header');


/**
 * create Todo
 */
 router.post('/create',createTodo,header,TodoController.createTodo);

 /**
 * get All Todos
 */
  router.get('/',header,TodoController.getAllTodo);

  /**
 * get Todo
 */
 router.get('/:id',header,getTodo,TodoController.getTodo);

   /**
 * get Todo
 */
 router.delete('/:id',header,deleteTodo,TodoController.deleteTodo);


module.exports = router;