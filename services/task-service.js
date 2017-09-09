var Task = require('../model/task').Task;

var TaskService = {};

TaskService.findTask = function(task_id, next){

    Task.findOne({_id : task_id}, function(err, task){
        return next(err, task);
    });
}

TaskService.addTask = function(data, next){
    this.findTask(data._id, function(err, task){
        if(err){
            console.log('Encountered error when searching if the task is in the db already');
            return next(err, null);
        }

        if(task){
            console.log('User with taskName ' + task.taskName + ' exists already.');
            return next(null, null);
        }
        else{
            /*Add user to db*/
            var newTask = new Task({
                taskName: data.taskName,
                taskDescription: data.taskDescription,
                taskPriority: data.taskPriority,
                taskStatus : data.taskStatus
            });

            newTask.save(function(err, task){
                return next(err, task);
            })
        }
    })
}

TaskService.allTasks = function(next){
    Task.find(function(err, tasks){
        return next(err, tasks);
    });
}

TaskService.updateTask = function(usertask, next){

    Task.update({"_id" : usertask._id}, {$set :
     {
        "taskName" : usertask.taskName,
        "taskPriority": usertask.taskPriority,
        "taskStatus": usertask.taskStatus,
        "taskDescription": usertask.taskDescription
    } 
       }, function(err, task){
        return next(err, task);
    })
}


// delete task with task._id
TaskService.deleteTask = function (id, next) {

    Task.remove({"_id" : id}, function (err) {
        return next(err);
    });
}

module.exports = TaskService;