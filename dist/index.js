"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    res.header("Content-Type", "application/x-www-form-urlencoded");
    next();
});
io.on('connection', function (socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('download', (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                let playlist = data.playlist;
                if (playlist) {
                    let playlist = new Playlist_1.Playlist(Object.assign({ socket }, data));
                    yield playlist.setFiles();
                    playlist.download();
                }
                else {
                    let file = new File_1.myFile(Object.assign({ socket }, data));
                    file.download();
                }
            }
            catch (_a) {
                socket.emit('error');
            }
        }));
    });
});
http.listen(4000);
//# sourceMappingURL=index.js.map