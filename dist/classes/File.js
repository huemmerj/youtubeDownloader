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
const Format_1 = require("./Format");
const Filter_1 = require("./Filter");
const uuid_1 = require("uuid");
const Path = require('path');
const fs = require('fs');
const ytdl = require('ytdl');
class myFile {
    constructor({ socket, url, title, format, folder, playlistId }) {
        this.outPath = Path.join(__dirname, 'DownloadedFiles');
        this.id = uuid_1.v4();
        this.socket = socket;
        this.title = title;
        this.url = url;
        this.format = format;
        this.folder = folder;
    }
    get filter() {
        if (this.format === Format_1.Format.MP3) {
            return Filter_1.Filter.MP3;
        }
    }
    get fullPath() {
        return Path.join(this.outPath, this.folder, this.title);
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.socket.emit('downloadFile', this);
                    let stream = fs.createWriteStream(this.fullPath);
                    yield ytdl(this.url, {
                        format: this.format,
                        filter: this.filter
                    }).pipe(stream);
                    stream.on('finish', () => {
                        // @ts-ignore
                        var time = new Date() - dateStart;
                        this.socket.emit('FileDownloaded', this);
                        console.log('finished in ' + time + 'ms!!!');
                        resolve();
                    });
                }
                catch (e) {
                    this.socket.emit('error', this);
                    reject();
                }
            }));
        });
    }
}
exports.myFile = myFile;
//# sourceMappingURL=File.js.map