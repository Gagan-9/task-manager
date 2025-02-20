const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/tasks', authMiddleware, roleMiddleware('admin'), taskController.createTaskHandler);
router.get('/tasks', authMiddleware, taskController.getTasksHandler);
router.put('/tasks/:id', authMiddleware, roleMiddleware('admin'), taskController.updateTaskHandler);
router.delete('/tasks/:id', authMiddleware, roleMiddleware('admin'), taskController.deleteTaskHandler);

module.exports = router;