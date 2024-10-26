const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/tasks');
const date = new Date();


const app = express();

app.use(cors());
app.use(express.json());




function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


mongoose.connect('mongodb://127.0.0.1:27017/LinkdedInAssign1')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        console.log('Fetched tasks ', tasks);
        res.json(tasks);
    } catch (error) {
        console.error('Error ', error);  
        res.status(500).json({ message: "Error retrieving tasks" });
    }
});


app.post('/tasks', async (req, res) => {
    const { title, desc, status } = req.body; 
    try {
        const newTask = new Task({ title, desc, status });
        await newTask.save(); 
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error', error); 
        res.status(500).json({ message: "Error creating task" });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params; 
    console.log('Received ', id); 
    try {
        const deletedTask = await Task.findByIdAndDelete(id); 
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" }); 
        }
        res.status(200).json({ message: "Task deleted successfully" }); 
    } catch (error) {
        console.error('Error ', error); 
        res.status(500).json({ message: "Error deleting task" });
    }
});


app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params; 
    const { title, desc, status } = req.body; 
    console.log('Received ', id);  
    console.log('Received updated data:', req.body);  

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                title,
                desc,
                status,
                updatedAt: `${formatAMPM(new Date)} at ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}` 
            },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });  
        }
        res.status(200).json(updatedTask);  
    } catch (error) {
        console.error('Error  ', error);  
        res.status(500).json({ message: "Error updating task" });
    }
});


app.use((error, req, res, next) => {
    console.error('Error occurred:', error); 
    res.status(500).json({ message: "Internal Server Error" });
});

 
app.listen(4000, () => {
    console.log("Server Running on PORT 4000");
});