import { Template } from 'meteor/templating';
import { Notes } from '../lib/collection';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.events({
  'click #noteButn'(event, instance) {
    console.log("call add butn")
    $('#addModal').modal('open');
  },
});


Template.body.helpers({
  notes(){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.text.value;

    // Insert note into collection
    /*
    Notes.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    */
    Meteor.call('notes.insert', text);

    // Clear form
    target.text.value = '';

    // Close modal
    $('#addModal').modal('close');

    return false;
  }
});

Template.note.events({
  'click .delete-note':function(){
    //Notes.remove(this._id);
    Meteor.call('notes.remove', this);
    return false;
  }
});