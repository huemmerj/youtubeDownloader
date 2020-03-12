"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Playlist_1 = require("./classes/Playlist");
const File_1 = require("./classes/File");
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const bodyParser = require('body-parser');
var io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
io.on('connection', function (socket) {
    socket.on('download', (data) => {
        try {
            console.log(data);
            let playlist = data.playlist;
            if (playlist) {
                let playlist = new Playlist_1.Playlist(Object.assign(Object.assign({}, socket), data));
                playlist.download();
            }
            else {
                let file = new File_1.myFile(Object.assign(Object.assign({}, socket), data));
                file.download();
            }
        }
        catch (_a) {
            socket.emit('error');
        }
    });
});
http.listen(4000);
//# sourceMappingURL=index.js.map