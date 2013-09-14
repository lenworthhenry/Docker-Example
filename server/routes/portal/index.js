module.exports = function(app)
{
  app.get('/', function(req, res){
    res.render('portal/index', {title:'User Service'});
  })

};
