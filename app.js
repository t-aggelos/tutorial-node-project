/*
 *  Modules
 */
 const fs = require('fs');
 const ServerInstance = require(__dirname + '/public/server/main.js')

/*
 * Config
 */
  let defaults = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

  //
  // Server
  //
  let server = require('http').createServer((req, res) => {
  		res.writeHead(200, {'Content-Type':"text/html"});
  		res.write(`<h6> The time is: ${new Date()} </h6>`);
  		res.end();
  });

server.listen(defaults.port, () => console.log(defaults.ver, 'Server running at port', defaults.port));