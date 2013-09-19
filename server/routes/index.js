
/*
 * All the application routes and handlers
 */

module.exports = function(app)
{
  require('./api')(app)
  require('./portal')(app)
};
