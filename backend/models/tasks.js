const mongoose = require('mongoose');
const date = new Date();
// console.log(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`);
 
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
  
  console.log(formatAMPM(new Date));
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        requried:true
    },
    desc:String,
    status: {
        type:String,
        default:"pending"
    },
    createdAt: {
        type:String,
        default:`${formatAMPM(new Date)} at ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    },
    updatedAt: {
        type:String,
        default:`${formatAMPM(new Date)} at ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }
})


const Task = mongoose.model('Task',taskSchema);
 

module.exports= Task;