const fs = require('fs');

module.exports = (req, res) => {
		try {
			let f = fs.readFileSync(__dirname + '/../public/index.html');
			res.write(f);
		}catch (e) {
			res.contentCode = 404;

			res.write(`
				<body style='background-color:black;color:white;'>
					<p style='position:absolute;top:39%;left:15%;'> 
							404 no context found for route ${__dirname} 
					</p>
				</body>`);

			console.log(e);
		}
}