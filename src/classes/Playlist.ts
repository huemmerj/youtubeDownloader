import { Format } from "./Format"
import { Filter } from "./Filter";
import { myFile } from "./File"
import { IDownloadable } from "./IDownloadable";
import { v4 as uuidv4 } from 'uuid';
import { Status } from "./Status";
const ytpl = require('ytpl');
const sanitize = require('sanitize-filename')
export class Playlist implements IDownloadable{
  id: string
  socket: SocketIO.Socket
  url: String
  folder: String
  format: Format
  files: myFile[]
  status: Status

  constructor({socket, url, format, folder}: {socket: SocketIO.Socket, url: String, format: Format, folder: String }){
    this.id = uuidv4()
    this.socket = socket
    this.url = url
    this.format = format
    this.folder = folder
    this.files = []
  }
  public getData():Object {
    return {
      id: this.id,
      url: this.url,
      folder: this.folder,
      format: this.format,
      files: this.getFiles(),
    }
  }
  public getFiles() {
    return this.files.map((file)=> {
      return file.getData()
    })
  }
  public async setFiles() {
    return new Promise(async (resolve, reject) => {
      if (this.url) {
        await ytpl(this.url, async (err, playlist)=>{
          if(err) throw err
          for(let file of playlist.items) {
            this.files.push(new myFile({
              socket: this.socket,
              url: file.url,
              title: sanitize(file.title),
              format: this.format,
              folder: this.folder,
              playlistId: this.id,
            }))
          }
          resolve()
        })
      }
    })
  }
  public async download() {
    try {
      this.socket.emit('downloadPlaylist', this.getData())
      for(let file of this.files) {
        await file.download()
      }
    } catch (e) {
      this.status = Status.ERROR
      this.socket.emit('downloadPlaylist', this.getData())
    }
  }
}
