/*
 *  Modules
 */
 const fs = require('fs');

/*
 * Config
 */
  let defaults = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
  let framework = require(__dirname + '/routes/main.js');
/*
 * Server.
 */
   let app = new framework.ServerInstance(defaults.network.port, defaults.network.hostname);
   let apiRoute = '/api/'; // the root directory for the api to bind on

 app.event.on('end_connection', res => res.end());
 app.event.on('connection',(req, res) => 
 {
    req.contentCode = 200;
    console.log('request on route', req.url);
 });

 app.use(apiRoute + 'get/^*',(req, res) => {
    console.log(app.routes, req.url, (__dirname + req.url).split('get')[1]);
    app.sendFile((__dirname + req.url).split(apiRoute)[1], req, res);
    res.end();
 });

 app.use(apiRoute, (req, res) => {
    app.sendFile(__dirname + '/public/index.html', req, res);
 }) 



app.listen(() => console.log(`${defaults.ver} Running on ${defaults.network.hostname}:${defaults.network.port}`));
