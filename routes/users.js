var express = require('express');
var TaskService = require('../services/user-service');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    TaskService.allTasks(function (err, tasks) {
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error fetching tasks'
            });
        }
        
        if(tasks){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully fetched tasks',
                'tasks' : tasks
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'No tasks in db'
        });
    });
});

//Find One
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    TaskService.findUser(id, function (err, user) {
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error fetching user'
            });
        }        if(user){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully fetched users',
                'user' : user
            });
        }        return res.json({
            'responseCode': '02',
            'responseMessage' : 'No users in db'
        });
    });
});

/* POST adds an new user. */
router.post('/', function(req, res, next){
    var task = req.body;
    console.log(task.name);
    TaskService.addTask(task, function(err, tasks){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error adding task'
            });
        }

        if(tasks){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully added a task'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'Task exists already'
        });
    });
})


/* POST updates a user's record. */
router.post('/update', function(req, res, next){
    var user = req.body;
    console.log(user.merchantId);
    TaskService.updateUser(user, function(err, users){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error adding user'
            });
        }

        if(users){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully added user'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'User exists already'
        });
    });
})


/* POST deletes a user's record. */
router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    console.log(id);
    TaskService.deleteTask(id, function(err){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error deleting task'
            });
        }

        return res.json({
            'responseCode': '00',
            'responseMessage' : 'Successfully deleted task'
        });
    });
})

module.exports = router;
