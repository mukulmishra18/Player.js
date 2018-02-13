import StorageController from './storage/storageController';
import StreamController from './stream/streamController';

/**
 * Main entry point of player.
 * @class
 */
export default class Player {
  /**
   * @constructs Player
   * @params { File } files
   */
  constructor(files) {
    let file = files[0];
    this._fileData = file.slice();
    this._fileLastModificationDate = file.lastModificationDate;
    this._fileName = file.name;
    this._fileType = file.type;
    this._fileSize = file.size;
    this._storageCtrl = new StorageController(this._fileData);
    this._streamCtrl = new StreamController();
  }

  /**
   * Read a small chunk of data.
   * @return { Promise }
   */
  read() {
    
  }

  /**
   * Cancel the player and clean up memory.
   */
  cancel() {

  }
}
