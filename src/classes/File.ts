import { Format } from "./Format"
import { Filter } from "./Filter"
import { Status } from "./Status"
import { IDownloadable } from "./IDownloadable"
import { v4 as uuidv4 } from "uuid"
const Path = require('path')
const fs = require('fs')
const ytdl = require('ytdl-core')
export class myFile implements IDownloadable{
  id: String
  socket: SocketIO.Socket
  url: String
  title: String
  folder: String
  playlistId: String
  format: String
  outPath: String = Path.join('/data/data/com.termux/files/home/storage/music/Musik/DownloadedFiles')
  //outPath: String = Path.join('/home/jens/projekte/youtubeDownloader/DownloadedFiles')
  status: Status
  time: number
  get filter(): String {
    if (this.format === Format.MP3) {
      return Filter.MP3
    }
  }
  get filePath(): String {
    return Path.join(this.fullPath, this.title+'.'+this.format)
  }
  get fullPath(): String {
    return Path.join(this.outPath, this.folder)
  }

  constructor({socket, url, title, format, folder, playlistId}: {socket: SocketIO.Socket, url: String, title: String, format: Format, folder?: String, playlistId?: String }){
    this.id = uuidv4()
    this.socket = socket
    this.playlistId = playlistId
    this.status = Status.WAITING
    if(!title || !format || !url) {
      this.status = Status.ERROR
      this.socket.broadcast.emit('downloadFile', this.getData())
      return
    }
    this.title = title
    this.url = url
    this.format = format
    this.folder = folder
  }

  public getData(): Object {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      format: this.format,
      folder: this.folder,
      status: this.status,
      playlistId: this.playlistId,
      time: this.time,
    }
  }
  public async download(): Promise<any> {
    return new Promise(async (resolve, reject)=> {
      try {
        let dateStart = new Date()
        this.status = Status.DOWNLOADING
        this.socket.broadcast.emit('downloadFile', this.getData())
        if(!fs.existsSync(this.fullPath)) {
          fs.mkdirSync(this.fullPath)
        }
        if(fs.existsSync(this.filePath)) {
          this.status = Status.SUCCESS
          this.socket.broadcast.emit('downloadFile', this.getData())
          resolve()
        } else {
          let stream = fs.createWriteStream(this.filePath)
          await ytdl(this.url, {
            format: this.format,
            filter: this.filter
          }).pipe(stream);
          stream.on('finish', () => {
            // @ts-ignore
            var time = new Date() - dateStart
            this.status = Status.SUCCESS
            this.time = time
            this.socket.broadcast.emit('downloadFile', this.getData())
            console.log('finished in '+time+'ms!!!')
            resolve()
          })
        }
      } catch (e) {
        this.socket.broadcast.emit('error', this.getData())
        reject()
      }
    })
  }
}