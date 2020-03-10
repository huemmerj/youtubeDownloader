const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs')
const app = express();
var ytpl = require('ytpl');
const path = require('path')
const bodyParser = require('body-parser')
const sanitize = require('sanitize-filename')
var util = require('util');
var log_file = fs.createWriteStream(path.join(__dirname,'debug.log'), {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
}
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use('/alt',express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'dist')));
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
	var folder = req.body.folder;
	var filter = req.body.filter;
	if(url) {
		if(playlist) {
			downloadPlaylist(format, url, folder, filter)
		} else if(fileName){
			console.log(`Downloading: ${fileName}`)
			saveFile(url, format, filter, fileName, folder)
		}
	}
})

function downloadPlaylist(format, url, folder, filter) {
	if (url) {
		ytpl(url, async function(err, playlist) {
		if(err) throw err;
			var i = 0;
			var countTotal = playlist.items.length
			for(i; i<countTotal; i++) {
				let file = playlist.items[i]
				let fileUrl = file.url
				let fileName = sanitize(file.title)
				
				console.log(`Downloading(${i+1}/${countTotal}): "${fileName}`)
				await saveFile(fileUrl, format, filter, fileName, folder)
			}
		});
	}
}

async function saveFile(fileUrl, format, filter, fileName, folder) {
	return new Promise(function(resolve, reject) {
		try {
			let outPath = ''
			let dateStart = new Date()
			if (format=== 'mp3') {
				outPath = path.join('..','..','music','Musik','DownloadedFiles',folder)
			} else {
				outPath = path.join('..','..','dcim', 'DownloadedFiles',folder)
			}
			// outPath = path.join(__dirname,'DownloadedFiles',folder)
			if (!fs.existsSync(outPath)){
				fs.mkdirSync(outPath);
			}
			let filePath = path.join(outPath,fileName+'.'+format)
			if (fs.existsSync(filePath)) {
				console.log(`${fileName} allready exists`)
				resolve()
			} else {
				let stream = fs.createWriteStream(filePath)
				ytdl(fileUrl, {
					format: format,
					filter: filter
				}).pipe(stream);
				stream.on('finish', () => {
					var time = new Date() - dateStart
					console.log('finished in '+time+'ms!!!')
					resolve('finished in '+time+'ms')
				})
			}
		} catch {
			resolve()
		}
	})
}