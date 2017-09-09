var app = angular.module('myApp',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'mainController'
        })


        .state('task', {
            url: '/task',
            templateUrl: 'templates/task.html',
            controller: 'taskCtrl'
        })

        .state('chat', {
            url: '/chat',
            templateUrl: 'templates/chat.html',
            controller: 'chatController'
        })


        .state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html',
            controller: 'contactController'
        })

    $urlRouterProvider.otherwise('task');
});

app.controller('mainController',function($scope){

    var data = {
        name: 'Sanni Michael Tomiwa',
        designation: 'Software Engineer',
        discipline: 'Computer Science'
    }

})

app.controller('aboutContoller',function($scope){

    $scope.message = 'Hello'

})

app.controller('contactController',function($scope){

    $scope.message = "Welcome"

})

app.controller('chatController',function($scope){

    $scope.message = "Welcome"

})


app.controller('taskCtrl',function($scope,$http){

    var refresh = function(){

        $http.get('/tasks').then(function(response){

            console.log(response);

            $scope.tasklist = response.data.tasks;

            $scope.task = {};

        });

    }

    refresh();


// Add a new contact by posting to the server
$scope.addTask = function(task){

    $http.post('/tasks',task).then(function(response){
        console.log(JSON.stringify(response));
        refresh();
    })
}

// Delete a contact from the database
$scope.deleteTask = function(id){
    console.log(id);
    $http.delete('/tasks/' +id).then(function(response){
        console.log(response);
        refresh();
    })
}

$scope.edit = function(id){
    console.log(id);
    $http.get('/tasks/'+ id).then(function(response){
        console.log(response.data);
        $scope.task = response.data.task;
    })
}

$scope.updateTask = function(task){
    console.log(task);
    $http.post('/tasks/update/',task).then(function(response){
        console.log(response);
        refresh();
    })
}

$scope.deselect = function(){
    $scope.task = {};
}

});