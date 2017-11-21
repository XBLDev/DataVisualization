/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';
console.log('server test begins');

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      
      const usrId = Random.id();
      
      let taskId;
            
      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: usrId,
          username: 'user1',
        });

      });

      it('can insert task', () => {
        const insertTask = Meteor.server.method_handlers['tasks.insertForTest'];
        const invocation = {
          usrId
        };
        insertTask .apply(invocation, ['new task to insert', usrId, 'user1']);
        assert.equal(Tasks.find().count(), 2);
        assert.throw(function(){
          insertTask .apply(invocation, ['new task to insert', null, 'user1']);        
        },
        Error, 
        "not-authorized");
        insertTask .apply(invocation, ['new task to insert', usrId, 'user1']);
        assert.equal(Tasks.find().count(), 3);
      });        
      
      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = {
            usrId
        };
        // // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId]);

        // // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 0);
      });


      it('can set checked', () => {

        const setcheckTask = Meteor.server.method_handlers['tasks.setChecked'];
        const invocation = {
            usrId
        };

        setcheckTask.apply(invocation, [taskId, false]);
        assert.equal(Tasks.findOne().checked, false);        
        setcheckTask.apply(invocation, [taskId, true]);
        assert.equal(Tasks.findOne().checked, true);
        
      });

      it('can set private', () => {
        const setprivateTask = Meteor.server.method_handlers['tasks.setPrivateForTest'];
        const invocation = {
          usrId
        };
        setprivateTask.apply(invocation, [taskId, false, usrId]);
        assert.equal(Tasks.findOne().private, false);   
        // setprivateTask.apply(invocation, [taskId, false, 'wronguserid']);
        // assert.throw(function() { iThrowError(args) }, Error)
        assert.throw(function(){
          setprivateTask.apply(invocation, [taskId, false, 'wronguserid']) 
        },
        Error, 
        "not-authorized");
        setprivateTask.apply(invocation, [taskId, true, usrId]);  
        assert.equal(Tasks.findOne().private, true);      
        
      })        
        
    });
  });
}