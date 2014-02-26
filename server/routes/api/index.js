module.exports = function(app)
{
  var mongodb = require('mongodb')
  ,mongoose = require('mongoose')
   ,passport=require('../auth/passport');


  mongoose.connect('mongodb://'+process.env.DB_PORT_27017_TCP_ADDR+':'+process.env.DB_PORT_27017_TCP_PORT+'/workspace')
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', function callback() {
    console.log('Connected to dB');
  });

  //Workplace Schema
  var workspaceSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    description: { type: String, required: false },
    create_date: { type: Date, required: true },
    update_date: { type: Date, required: true },
    owner_id: { type: Number, required: true }
  });

// Seed a workspace
 var Workspace = mongoose.model('Workspace', workspaceSchema);



 app.get('/api/workspaces', passport.ensureAuthenticated, function(req, res){
    req.workspace.find().limit(10).toArray(function(error, results){
      if(error) return next(error)
      res.send(results)
    })
  })

  app.post('/api/workspaces/:name', function(req, res) {
    req.workspace.insert(req.body, {}, function(error, results){
      if (error) return next(error)
      res.send(results)
    })
  })

  app.get('/api/workspaces/:id', function(req, res) {
    req.workspace.findOne({_id: req.workspace.id(req.params.id)},
function(error, result){
      if (error) return next(error)
      res.send(result)
    })
  })

  app.put('/api/workspaces/:id', function(req, res) {
    req.workspace.update({_id: req.workspace.id(req.params.id)},
{$set:req.body}, {safe:true, multi:false}, function(error, result){
      if (error) return next(error)
      res.send((result===1)?{msg:'success'}:{msg:'error'})
    })
  })


  app.del('/api/workspaces/:id', function(req, res) {
    req.workspace.remove({_id: req.workspace.id(req.params.id)},
function(error, result){
      if (error) return next(error)
      res.send((result===1)?{msg:'success'}:{msg:'error'})
    })
  })
};
