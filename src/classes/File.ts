import { Format } from "./Format"
import { Filter } from "./Filter"
import { Status } from "./Status"
import { IDownloadable } from "./IDownloadable"
import { v4 as uuidv4 } from "uuid"
const Path = require('path')
const fs = require('fs')
const ytdl = require('ytdl')
export class myFile implements IDownloadable{
  id: String
  socket: SocketIO.Socket
  url: URL
  title: String
  folder: String
  playlistId: String
  format: String
  outPath: String = Path.join(__dirname, 'DownloadedFiles')
  status: Status
  get filter(): String {
    if (this.format === Format.MP3) {
      return Filter.MP3
    }
  }
  get fullPath(): String {
    return Path.join(this.outPath, this.folder, this.title)
  }

  constructor({socket, url, title, format, folder, playlistId}: {socket: SocketIO.Socket, url: URL, title: String, format: Format, folder?: String, playlistId?: String }){
    this.id = uuidv4()
    this.socket = socket
    this.title = title
    this.url = url
    this.format = format
    this.folder = folder
  }

  public async download(): Promise<any> {
    return new Promise(async (resolve, reject)=> {
      try {

        this.socket.emit('downloadFile', this)
        let stream = fs.createWriteStream(this.fullPath)
        await ytdl(this.url, {
          format: this.format,
          filter: this.filter
        }).pipe(stream);
        stream.on('finish', () => {
          // @ts-ignore
          var time = new Date() - dateStart
          this.socket.emit('FileDownloaded', this)
          console.log('finished in '+time+'ms!!!')
          resolve()
        })
      } catch (e) {
        this.socket.emit('error', this)
        reject()
      }
    })
  }
}