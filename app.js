/*
 *  Modules
 */
 const fs = require('fs');

/*
 * Config
 */
  let defaults = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
  let main_route = require(__dirname + '/routes/main.js')
/*
 * Server.
 */

 function handleRequest(method, req, res) {
    if (method == 'GET') {
        switch(req.url) {
            case '/':
                main_route(req, res);
            break;
            case '/login':
                res.write('hello login');
            break;
             case '/xd':
                res.write('hello xd');
            break;
        }
    }else if (method == 'POST') {
        req.on('data', (data) => console.log(`Acquired '${data.toString()}'`));
    }else if (method == 'PUSH') {

    }else {
        res.end('Unknown or not implemented - request');
    }
 }

  let server = require('http').createServer((req, res) => 
  {
        /*
         * Grabbing necessary variables.
         */
        const {headers, method, url} = req;
        console.log(headers['user-agent'], 'called for', req.url, 'with', method)
        /*
         * Managing Request
         */
        res.statusCode = 200;
  		res.setHeader('Content-Type',"text/html");

        handleRequest(method, req, res);
        res.end();
  });

server.listen(defaults.network.port, defaults.network.hostname, () => console.log(`${defaults.ver} Running on ${defaults.network.hostname}:${defaults.network.port}`));