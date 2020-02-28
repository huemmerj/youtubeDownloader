const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs')
const app = express();
var ytpl = require('ytpl');
const path = require('path')
const bodyParser = require('body-parser')
const sanitize = require('sanitize-filename')
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname,'public')));
app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

app.get('/savemp3/:url', (req, res) => {
	var url = req.params.url;
	ytdl(url, {
		format: 'mp3',
		filter: 'audioonly'
	}).pipe(fs.createWriteStream('audio.mp3'));
})

app.post('/save', (req, res) => {
	var url = req.body.url;
	var format = req.body.format;
	var playlist = req.body.playlist;
	var fileName = req.body.fileName;
	if(url) {
		if(playlist) {
			downloadPlaylist(format, url)
		} else if(fileName){
			saveFile(url, 'mp3', 'audioonly', fileName)
		}
	}
})

function downloadPlaylist(format, url) {
	if (url) {
		ytpl(url, async function(err, playlist) {
		if(err) throw err;
			var i = 0;
			var countTotal = playlist.items.length
			for(i; i<countTotal; i++) {
				let file = playlist.items[i]
				let fileUrl = file.url
				let fileName = sanitize(file.title)
				
				console.log(`Downloading(${i}/${countTotal}): "+ fileName`)
				await saveFile(fileUrl, 'mp3', 'audioonly', fileName)
			}
		});
	}
}

async function saveFile(fileUrl, format, filter, fileName) {
	return new Promise(function(resolve, reject) {
		let dateStart = new Date()
		let stream = fs.createWriteStream(path.join(__dirname,'DownloadedFiles',fileName+'.mp3'))
		ytdl(fileUrl, {
			format: format,
			filter: filter
		}).pipe(stream);
		stream.on('finish', () => {
			var time = new Date() - dateStart
			console.log('finished in '+time+'ms!!!')
			resolve('finished in '+time+'ms')
		})
	})
}