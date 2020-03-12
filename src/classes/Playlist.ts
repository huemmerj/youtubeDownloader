import { Format } from "./Format"
import { Filter } from "./Filter";
import { myFile } from "./File"
import { IDownloadable } from "./IDownloadable";
import { v4 as uuidv4 } from 'uuid';
const ytpl = require('ytpl');
const sanitize = require('sanitize-filename')
export class Playlist implements IDownloadable{
  id: string
  socket: SocketIO.Socket
  url: String
  folder: String
  format: Format
  files: myFile[]

  constructor({socket, url, format, folder}: {socket: SocketIO.Socket, url: String, format: Format, folder: String }){
    this.id = uuidv4()
    this.socket = socket
    this.url = url
    this.format = format
    this.folder = folder
    this.files = []
    this.setFiles()
  }
  public getData():Object {
    return {
      id: this.id,
      url: this.url,
      folder: this.folder,
      format: this.format,
      files: this.files,
    }
  }
  public async setFiles() {
    if (this.url) {
      await ytpl(this.url, async (err, playlist)=>{
        if(err) throw err
        for(let file of playlist) {
          this.files.push(new myFile({
            socket: this.socket,
            url: file.url,
            title: sanitize(file.title),
            format: this.format,
            folder: this.folder,
            playlistId: this.id,
          }))
        }
      })
    }
  }
  public async download() {
    try {
      this.socket.emit('downloadPlaylist', this)
      for(let file of this.files) {
        await file.download()
      }
    } catch (e) {
      this.socket.emit('error', this)
    }
  }
}
