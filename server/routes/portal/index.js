
module.exports = function(app)
{

  var passport=require('../auth/passport');

    app.get('/portal/account', passport.ensureAuthenticated, function(req, res){

 res.render('portal/account', {user : req.user});
  })

};
