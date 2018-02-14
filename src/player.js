import StorageController from './storage/storage_controller';
import StreamController from './stream/stream_controller';
import AudioEventHandler from './event_handler';
/**
 * Main entry point of player.
 * @class
 */
export class Player {
  /**
   * @constructs Player
   * @params { File } files
   */
  constructor(files) {
    this._audioElement = null;
    this._file = null;
  }

  /**
   * Attach HTML Audio element to the player;
   * @params {HTML Audio} audio
   */
  attachAudioElement(audio) {
    this._audioElement = audio;
  }

  /**
   * Attach audio data file to player.
   * @params {File} files
   */
  attachDataFile(files) {
    this._file = files[0];
    this._fileData = file.slice();
    this._fileLastModificationDate = file.lastModificationDate;
    this._fileName = file.name;
    this._fileType = file.type;
    this._fileSize = file.size;
    this._storageCtrl = new StorageController(this._fileData);
    this._streamCtrl = new StreamController(this._storageCtrl);
    this._audioEventHandler = new AudioEventHandler(this._audioElement, this._streamCtrl);
  }

  /**
   * Read a small chunk of data.
   * @return { Promise }
   */
  read() {
    
  }

  /**
   * Destroy the player and clean up memory.
   */
  destroy() {

  }
}
