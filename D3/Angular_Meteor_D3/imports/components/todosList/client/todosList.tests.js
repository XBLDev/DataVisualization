/* eslint-env mocha */
 
import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import todosList from '../todosList';
// import { Tasks } from '../../../api/tasks.js';
import { Random } from 'meteor/random';

console.log('client test begins');

describe('todosList', function() {
  var element;
 
  beforeEach(function() {
    // console.log('beforeEach called');
    var $compile;
    var $rootScope;
 
    window.module(todosList.name);
 
    inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
 
    element = $compile('<todos-list></todos-list>')($rootScope.$new(true));
    // console.log(element);
    $rootScope.$digest();

    controller = element.controller('todosList');
    controller.tasks = [
      {_id: 0, text: 'test task', username: 'xbldev', createdAt: new Date(), checked: false, private: false},
      {_id: 1, text: 'test task2', username: 'xbldev', createdAt: new Date(), checked: true, private: false}
    ];


  });

  describe('component - incomplete tasks count', function() {
    it('should be showing incomplete tasks count: 0', function() {
      assert.include(element[0].querySelector('h1').innerHTML, '0');
    });
  });

  describe('component - hide completed', function() {
    it('should be showing hide completed: on', function() {
      // console.log(element[0].querySelector('#headerinput').value);
      // element[0].querySelector('#headerinput').value = 'off';
      // console.log(element[0].querySelector('#headerinput').value);
      // console.log(controller.tasks);
      // console.log(element[0].querySelector('ul'));           
      assert.include(element[0].querySelector('#headerinput').value, 'on');
    });
  });

  describe('component - list of tasks(ul)', function() {
    it('should be showing number of list items: 2', function() {
      // console.log(element[0].querySelector('#headerinput').value);
      // element[0].querySelector('#headerinput').value = 'off';
      // console.log(element[0].querySelector('#headerinput').value);
      // console.log(element[0]);
      // console.log(controller.tasks);
      // console.log(element[0].querySelector('ul').querySelector('li').querySelector('span'));    
      // console.log(element[0].querySelector('ul').getElementsByTagName('li').length);    
      // console.log(element[0].querySelector('#text ng-binding'));           
      assert.equal(element[0].querySelector('ul').getElementsByTagName('li').length, 2);      
    });
  });

  describe('controller', function() {
    describe('addTask', function() {
      var controller;
      var newTask = 'Be more fabolous';
      // console.log(Tasks.find().count());
      
      beforeEach(() => {
        sinon.stub(Meteor, 'call');
        controller = element.controller('todosList');
        controller.newTask = 'Be fabolous';
        controller.addTask(newTask);
        // controller.tasks = [{_id: 0, text: 'test task', username: 'xbldev', createdAt: new Date(), checked: false, private: false}];
      });
 
      afterEach(() => {
        Meteor.call.restore();
      });

      it('should call tasks.insert method', function() {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.insert', newTask);
 
        // console.log(element[0].querySelector('ul'));
        // assert.equal(Tasks.find().count(), 0);
      });

      it('should reset newTask', function() {
        assert.equal(controller.newTask, '');
      });



    });
    describe('deleteTask', function() {
      var controller;
      const usrId = Random.id();
      const mockID = Random.id();
      var TaskToDelete = {
        _id: mockID,
        checked: false,
        createdAt: new Date(),
        owner: usrId,        
        text: 'test task',
        username: 'xbldev',
      }

      beforeEach(() => {
        sinon.stub(Meteor, 'call');
        controller = element.controller('todosList');
        controller.removeTask(TaskToDelete);
      });
 
      afterEach(() => {
        Meteor.call.restore();
      });

      it('should call tasks.remove method', function() {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.remove', TaskToDelete._id);//task._id
      });
    });
    describe('setCheckedTask', function() {
      var controller;
      const usrId = Random.id();
      const mockID = Random.id();
      var TaskToSetCheck = {
        _id: mockID,
        checked: false,
        createdAt: new Date(),
        owner: usrId,        
        text: 'test task',
        username: 'xbldev',
      }

      beforeEach(() => {
        sinon.stub(Meteor, 'call');
        controller = element.controller('todosList');
        controller.setChecked(TaskToSetCheck);
      });
      
      afterEach(() => {
        Meteor.call.restore();
      });

      it('should call tasks.setChecked method', function() {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.setChecked', TaskToSetCheck._id, !TaskToSetCheck.checked);//task._id
      });
    });
    describe('setPrivateTask', function() {
      var controller;
      const usrId = Random.id();
      const mockID = Random.id();
      var TaskToSetPrivate = {
        _id: mockID,
        checked: false,
        createdAt: new Date(),
        owner: usrId,        
        text: 'test task',
        username: 'xbldev',
        prviate: false
      }

      beforeEach(() => {
        sinon.stub(Meteor, 'call');
        controller = element.controller('todosList');
        controller.setPrivate(TaskToSetPrivate);
      });
 
      afterEach(() => {
        Meteor.call.restore();
      });

      it('should call tasks.setPrivate method', function() {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.setPrivate', TaskToSetPrivate._id, !TaskToSetPrivate.private);//task._id
      });
    });



  });



})