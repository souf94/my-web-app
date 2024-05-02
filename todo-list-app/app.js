const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data for tasks
let tasks = [
    { id: 1, task: 'Buy groceries' },
    { id: 2, task: 'Complete assignment' },
    { id: 3, task: 'Go for a run' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    const taskId = tasks.length + 1;
    tasks.push({ id: taskId, task: task });
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = req.body.task;
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].task = updatedTask;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
