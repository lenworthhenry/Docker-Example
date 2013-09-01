'use strict';

angular.module('workspaceApp')
  .service('Userservice', function Userservice($log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var UserService;
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/');

    var db=mongoose.connection;
    db.on('error', console.error.bind(console,'connection error mongo:'));
    db.once('open', function callback()
           {
             // yay!
             $log.info('We have successfully connected to mongo!');
           })
    var userSchema = new mongoose.Schema({
      firstName:String,
      lastName:String,
      id:Schema.Types.ObjectId,
      username:String,
      password:String
    })
  });
