const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');

class ServerInstance {
	// existing routers
	routes = {};
	//all special symbols linked with the status code.
	symbols = 
	{
		unknown: '^?', // used for unknown variables
		merge: '^!', // merge everything after  last string 
		everything: '^*' // everything after last string <-- TODO
	};
	prefixes = {}


	constructor(port, hostname) {
		this.event = new EventEmitter();
		this.server = http.createServer((req, res) => 
		{
			this.event.emit('connection', req, res);
			//call the existing route
		
			if (this.routes[req.url]) { 
				this.routes[req.url](req, res);

			}else if (this.routes[this.symbols.unknown]) {
				this.routes[this.symbols.unknown](req, res);
			}else if (this.routes[this.symbols.everything] {

            }else
			{
				res.contentCode = 404;
				res.setHeader('Content-Type', 'text/plain')
   				res.write(`Can't GET: ${req.url} - Is an appropriate route missing or is the server too slow?`);
   				res.end();
			}
		});

		this.hostname = hostname;
		this.port = port;
	}

	sendFile(src, req, res) {
        console.log('Attempting to send ' + src + '.');
		res.setHeader('Content-Type', `text/${src.split('.')[1] || 'plain'}`);
			fs.readFile(src,(err, byte) => 
				{
					if(err) {
					  	res.write(err.stack);
					  	console.log(err, '!!!! SKIPPING error');
					  	this.event.emit('end_connection', res);
					}else 
					{
					  	res.write(byte);
					  	this.event.emit('end_connection', res);
					}

			});
	}

	listen(middleware) {
		this.server.listen(this.port, this.hostname, middleware);
	}

	use(url, router) {
		let associates;
		let prefix; 
		if (url.includes(this.symbols.merge)) {
			let pos = url.indexOf(this.symbols.merge);

			//
			// ALL AFTER "KEYWORD" FUNCTIONALITY.
			//

			// every route after this.symbols.merge
			let part = url.slice(pos + this.symbols.merge.length).split('/'); 

			// the route before.
			prefix = url.split(this.symbols.merge)[0];

			// every route after this.symbols.merge in a string	
			let associates = prefix + part[0];

			//we add "word by word" the route endpoints.
			for (let i = 1; i <= part.length; i++) { //we start by 1 because we've already added the first part above.

							// we remove the last '/' (because browser)
				this.routes[associates.substring(0, associates.length - 1)] = router; // and associate the middleware with each new route.
				this.routes[associates] = router; // and associate the middleware with each new route.
				associates += part[i] + '/'; 
			}

		}else if (url.includes(this.symbols.unknown)) 
		{
			this.routes[this.symbols.unknown] = router;
		}else if (url.includes(this.symbols.everything)) {
			// TODO
            prefix = url.split('^*')[1];
            this.routes[prefix] = router;
		}
		this.event.on(url, router);
	}
}


module.exports.ServerInstance = ServerInstance;
