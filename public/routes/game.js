app.get('/game', (res, req) => {
	req.send('test');
});

app.use(express.static)