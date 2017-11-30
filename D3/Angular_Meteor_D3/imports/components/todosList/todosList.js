import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Tasks} from '../../api/tasks.js';
import template from './todosList.html';
 

class TodosListCtrl {
  constructor($scope) {

    $scope.viewModel(this);

    this.subscribe('tasks');
    this.hideCompleted = false;

    this.helpers({
        tasks() {
            const selector = {};

            if(this.getReactively('hideCompleted'))
            {
                selector.checked = {
                    $ne: true
                };
            }
        // Show newest tasks at the top
            return Tasks.find(selector, {
                sort: {
                createdAt: -1
                }
            });
        },

        incompleteCount() {
            return Tasks.find({
              checked: {
                $ne: true
              }
            }).count();
        },

        currentUser()
        {
            return Meteor.user();
        }

      })
    }
    
    addTask(newTask) {
        // console.log('addTask called, newTask: ', newTask);
        
        // Insert a task into the collection
        // Tasks.insert({
        //   text: newTask,
        //   createdAt: new Date,
        //   owner: Meteor.userId(),
        //   username: Meteor.user().username
        // });
        Meteor.call('tasks.insert', newTask);
        // Clear form
        this.newTask = '';
    }

    setChecked(task) {
        // Set the checked property to the opposite of its current value
        // Tasks.update(task._id, {
        //   $set: {
        //     checked: !task.checked
        //   },
        // });
        Meteor.call('tasks.setChecked', task._id, !task.checked);
    }

    removeTask(task) {
        // console.log('removeTask called, _id: ', task._id);
        // Tasks.remove(task._id);
        // console.log(task._id);
        Meteor.call('tasks.remove', task._id);
    }

    setPrivate(task){
        Meteor.call('tasks.setPrivate', task._id, !task.private);
    }

//     this.tasks = [{
//       text: 'This is task 1'
//     }, {
//       text: 'This is task 2'
//     }, {
//       text: 'This is task 3'
//     }];
//   }
}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });