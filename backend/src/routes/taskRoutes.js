const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

router.post('/tasks', authMiddleware, taskController.createTaskHandler);
router.get('/tasks', authMiddleware, taskController.getTasksHandler);
router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ filePath: req.file.path });
});

module.exports = router;