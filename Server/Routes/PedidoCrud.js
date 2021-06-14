const router = require('express').Router();
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const server = require('http').createServer(router);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('sales:update', async () => {
		socket.broadcast.emit('update', {msg: "Se habla a todos"});
	});
	socket.on('sales:init', async () => {
		socket.emit('update', {msg: "hola"});
	})
});

router.get('/TicketPDF', async (req, res) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on('request', interceptedRequest => {
		const data = {
			method: 'GET',
			postData: JSON.stringify({pedido: req.body.pedido}),
			headers: {
				...interceptedRequest.headers(),
				'Content-Type': 'application/json'
			}
		}
		interceptedRequest.continue(data);
	});
	const response = await page.goto('http://localhost:3000/Pedido/GenerarPaginaTicket',
	{
		waitUntil: 'networkidle0'
	});
	const pdf = await page.pdf({
		printBackground: true,
		format: 'letter'
	});
	await browser.close();
	res.send(pdf);
});

router.get('/GenerarPaginaTicket', async (req, res) => {
	const filePath = path.join(process.cwd(), "template", "report-template.ejs");
	ejs.renderFile(filePath, {pedido: req.body.pedido}, (err, html) => {
		if(err){
			return res.status(400).json({error: err});
		}
		else{
			res.send(html);
		}
	});
});

module.exports = router;