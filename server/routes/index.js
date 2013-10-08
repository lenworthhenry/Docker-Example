
/*
 * All the application routes and handlers
 */

module.exports = function(app)
{
  require('./api')(app)
  require('./auth')(app)
  require('./portal')(app)

};
