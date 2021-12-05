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

 app.server.on('connection', (req, res) => {
    req.contentCode = 200;
 });    

 app.use('/', (req, res) => {
    res.sendFile('/../public/index.html');
 });

 app.use('^?', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.write(`Can't GET: ${req.url} - Is an appropriate route missing or is the server too slow?`);
 });

app.listen(() => console.log(`${defaults.ver} Running on ${defaults.network.hostname}:${defaults.network.port}`));