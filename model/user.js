var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
        taskName : String,
        taskDescription : String,
        taskPriority : String,
        taskStatus : String
    },
    {
        timestamps : {createdAt : 'created', updatedAt : 'updated'}
    });

var Task = mongoose.model('Task', UserSchema);

module.exports = {
    'Task' : Task
}