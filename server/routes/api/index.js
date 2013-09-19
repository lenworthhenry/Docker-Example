module.exports = function(app)
{
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
,mongodb = require('mongodb')
,mongoose = require('mongoose')
,bcrypt = require('bcrypt')
, SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost/user')

var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', function callback() {console.log('Connected to dB');
                                      });
  var userSchema = mongoose.Schema({
   username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  accessToken: { type: String } // Used for Remember Me
    });

 // Bcrypt middleware
userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

// Remember Me implementation helper method
userSchema.methods.generateRandomToken = function () {
  var user = this,
      chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};
// Seed a user
var User = mongoose.model('User', userSchema);

  var usr = new User({ username: 'lhenry', email: 'lhenry@lawnovo.com', password: 'secret' });
usr.save(function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('user: ' + usr.username + " saved.");
  }
});


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function(user, done) {
  var createAccessToken = function () {
    var token = user.generateRandomToken();
    User.findOne( { accessToken: token }, function (err, existingUser) {
      if (err) { return done( err ); }
      if (existingUser) {
        createAccessToken(); // Run the function again - the token has to be unique!
      } else {
        user.set('accessToken', token);
        user.save( function (err) {
          if (err) return done(err);
          return done(null, user.get('accessToken'));
        })
      }
    });
  };

  if ( user._id ) {
    createAccessToken();
  }
});

passport.deserializeUser(function(token, done) {
  User.findOne( {accessToken: token } , function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));


app.get('/api/users', function(req, res){
  User.find().limit(10).exec(function(error, results){
    if(error) {console.error('Problem geting users!'); return;};


    res.render('portal/users/index', {title: 'Users', users: results});
  }

           )}
);
  app.get('/api/users/new', function(req, res) {
    res.render('api/users/new', {title: "New User"});
  });

  app.get('/api/users/:name', function(req, res, next){
    var user = users[req.params.name];
    if (user) {
      res.render('api/users/profile', {title: 'User profile', user: user});
    } else {
      next();
    }

  });

  app.post('/api/users', function(req, res) {
    if (users[req.body.username]) {
      res.send('Conflict', 409);
    } else {
      users[req.body.username] = req.body;
      res.redirect('/users');
    }
  });

  app.del('/api/users/:name', function(req, res, next) {
    if (users[req.params.name]) {
      delete users[req.params.name];
      res.redirect('/api/users');
    } else {
      next();
    }
  });

  };
