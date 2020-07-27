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
const File_1 = require("./File");
const uuid_1 = require("uuid");
const Status_1 = require("./Status");
const ytlist = require('youtube-playlist');
const sanitize = require('sanitize-filename');
class Playlist {
    constructor({ socket, url, format, folder }) {
        this.id = uuid_1.v4();
        this.socket = socket;
        this.url = url;
        this.format = format;
        this.folder = folder;
        this.files = [];
    }
    getData() {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            folder: this.folder,
            format: this.format,
            files: this.getFiles(),
        };
    }
    getFiles() {
        return this.files.map((file) => {
            return file.getData();
        });
    }
    setFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.url) {
                    ytlist(this.url, ['id', 'name', 'url']).then(res => {
                        this.title = res.data.name;
                        for (let file of res.data.playlist) {
                            this.files.push(new File_1.myFile({
                                socket: this.socket,
                                url: file.url,
                                title: sanitize(file.name),
                                format: this.format,
                                folder: this.folder,
                                playlistId: this.id,
                            }));
                        }
                        resolve();
                    });
                }
            }));
        });
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.socket.broadcast.emit('downloadPlaylist', this.getData());
                for (let file of this.files) {
                    yield file.download();
                }
            }
            catch (e) {
                this.status = Status_1.Status.ERROR;
                this.socket.broadcast.emit('downloadPlaylist', this.getData());
            }
        });
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=Playlist.js.map