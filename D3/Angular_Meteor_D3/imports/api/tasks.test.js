/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const usrId = Random.id();
      const usrId2 = Random.id();
      const usrId3 = Random.id();
      const radStuff = '';
    //   console.log('userID: ', usrId,', userId2: ', usrId2, ', userId3: ', userId3);
    //   console.log(Meteor.methodMap);
    //   Meteor.methodMap.userId = "123";
      this.userId = '123';
      
      let taskId;
      let taskId2;
      
    //   CON currentUserID = userId3;
    //   console.log('currentUserID: ', currentUserID);
      
      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: usrId2,
          username: 'user2',
        });

        // taskId2 = Tasks.insert({
        //     text: 'test task2',
        //     createdAt: new Date(),
        //     owner: usrId2,
        //     username: 'user2',
        // });


      });
 
      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        console.log('Task number: ',Tasks.find().count(),', usrId: ', usrId,', taskId', taskId,', userId: ',this.userId);
        
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        // console.log(deleteTask);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = {
        //   userId3
            usrId
        };
        // console.log(invocation);
        // // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId]);
        console.log('Task number: ',Tasks.find().count());
        console.log('Task left is: ',Tasks.findOne());

        // // Verify that the method does what we expected
        // assert.equal(Tasks.find().count(), 2);
      });

    //   it('can not delete task of someone else', () => {
    //     // Find the internal implementation of the task method so we can
    //     // test it in isolation
    //     console.log('Task number: ',Tasks.find().count(),', userId: ', userId,', taskId', taskId);
    //     // const anotherUserId = Random.id();

    //     const deleteTask = Meteor.server.method_handlers['tasks.remove'];
 
    //     // Set up a fake method invocation that looks like what the method expects
    //     const invocation = {
    //         taskId
    //     };
 
    //     // Run the method with `this` set to the fake invocation
    //     deleteTask.apply(invocation, [taskId2]);
 
    //     // Verify that the method does what we expected
    //     // assert.equal(Tasks.find().count(), 2);
    //   });


        
    });
  });
}