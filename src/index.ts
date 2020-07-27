import { Playlist } from "./classes/Playlist";
import { myFile } from "./classes/File";

const path = require('path')
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const bodyParser = require('body-parser')
var io = require('socket.io')(http)
var playlists = []
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//res.header("Content-Type", "application/x-www-form-urlencoded")
	next();
});
app.use(express.static( path.join(__dirname, 'dist')))
io.on('connection', async function(socket){
	for (const playlist of playlists) {
		socket.emit('downloadPlaylist', playlist.getData())
	}
	socket.on('download', async (data) => {
		try {
			console.log(data)
			let playlist = data.playlist
			if(playlist) {
				let playlist = new Playlist({socket, ...data})
				playlists.push(playlist)
				await playlist.setFiles()
				playlist.download()
			} else {
				let file = new myFile({socket, ...data})
				file.download()
			}
		} catch {
			socket.emit('error')
		}
	})
});

http.listen(4000, ()=> {
	console.log("server runs on Port 4000")
})