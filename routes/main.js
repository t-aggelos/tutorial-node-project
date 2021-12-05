const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');

let sendFile = function(src, req, res) {
         try {
                let f = fs.readFileSync(__dirname + src);
                res.setHeader('Content-Type', 'text/html');
                res.write(f);
         }catch (error) 
         {
                res.contentCode = 404;
                res.write(`
                <body style='background-color:black;color:white;'>
                <p style='position:absolute;top:39%;left:15%;'> 
                    404 no context found for route ${__dirname} 
                </p>
                </body>`);

                console.log(error);
           }
};

class ServerInstance {
	// existing routers
	routes = {};
	//all special symbols linked with the status code.
	symbols = 
	{
		'^?': 404, //used for unknown 
	};


	constructor(port, hostname) {
		this.server = new EventEmitter();
		this.instance = http.createServer((req, res) => {
			// adding extra stuff
			res.sendFile = src => sendFile(src, req, res);

			if (this.routes[req.url] != undefined) { 
				this.routes[req.url](req, res);
			}else if (this.routes['^?'] != undefined) 
			{
				res.contentCode = this.symbols['^?']
				this.routes['^?'](req, res);
			}else {
				console.warn('please set an appropriate fallback route.');
			}
			
			this.server.emit('connection', req, res);
			res.end();
		});

		this.hostname = hostname;
		this.port = port;
	}

	listen(middleware) {
		this.instance.listen(this.port, this.hostname, middleware);
	}

	use(url, router) {
		this.routes[url] = router;
		this.server.on(url, router);
	}
}


module.exports.ServerInstance = ServerInstance;