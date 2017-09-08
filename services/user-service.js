var Task = require ('../model/user').Task;

var TaskService = {};

TaskService.findUser = function(merchantId, next){

    Task.findOne({merchantId : merchantId}, function(err, user){
        return next(err, user);
    });
}

TaskService.addTask = function(data, next){
    this.findUser(data.name, function(err, task){
        if(err){
            console.log('Encountered error when searching if the task is in the db already');
            return next(err, null);
        }

        if(task){
            console.log('User with taskName ' + task.name + ' exists already.');
            return next(null, null);
        }
        else{
            /*Add user to db*/
            var newTask = new Task({
                taskName: data.name,
                taskDescription: data.description,
                taskPriority: data.priority,
                taskStatus : data.status
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

TaskService.updateUser = function(userdata, next){

    User.update({"merchantId" : userdata.merchantId}, {$set : {"url" : userdata.url}}, function(err, user){
        return next(err, user);
    })
}


// delete task with task._id
TaskService.deleteTask = function (id, next) {

    Task.remove({"_id" : id}, function (err) {
        return next(err);
    });
}

module.exports = TaskService;