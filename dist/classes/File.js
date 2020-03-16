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
const Status_1 = require("./Status");
const uuid_1 = require("uuid");
const Path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');
class myFile {
    constructor({ socket, url, title, format, folder, playlistId }) {
        this.outPath = Path.join('C:\\Users\\j.huemmer\\private\\programming\\ytDownloader2\\youtubeDownloader-master\\youtubeDownloader\\DownloadedFiles');
        this.id = uuid_1.v4();
        this.socket = socket;
        this.playlistId = playlistId;
        if (!title || !format || !url) {
            this.status = Status_1.Status.ERROR;
            this.socket.emit('downloadFile', this.getData());
            return;
        }
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
    get filePath() {
        return Path.join(this.fullPath, this.title + '.' + this.format);
    }
    get fullPath() {
        return Path.join(this.outPath, this.folder);
    }
    getData() {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            format: this.format,
            folder: this.folder,
            status: this.status,
        };
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let dateStart = new Date();
                    this.status = Status_1.Status.DOWNLOADING;
                    this.socket.emit('downloadFile', this.getData());
                    if (!fs.existsSync(this.fullPath)) {
                        fs.mkdirSync(this.fullPath);
                    }
                    if (fs.existsSync(this.filePath)) {
                        this.status = Status_1.Status.SUCCESS;
                        this.socket.emit('downloadFile', this.getData());
                        return;
                    }
                    let stream = fs.createWriteStream(this.filePath);
                    yield ytdl(this.url, {
                        format: this.format,
                        filter: this.filter
                    }).pipe(stream);
                    stream.on('finish', () => {
                        // @ts-ignore
                        var time = new Date() - dateStart;
                        this.status = Status_1.Status.SUCCESS;
                        this.socket.emit('downloadFile', this.getData());
                        console.log('finished in ' + time + 'ms!!!');
                        resolve();
                    });
                }
                catch (e) {
                    this.socket.emit('error', this.getData());
                    reject();
                }
            }));
        });
    }
}
exports.myFile = myFile;
//# sourceMappingURL=File.js.map