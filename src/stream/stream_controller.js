/**
 * Player data stream controller.
 * @class
 */
export default class StreamController {
  /**
   * @constructs StreamController
   */
  constructor(storageCtrl) {
    this.CHUNK_SIZE = 1000;
    this._index = 0;
    this._storageCtrl = storageCtrl;
  }

  /**
   * Read a small chunk of data from IDB storage.
   * @return { Promise } A promise resolve with a { Blob } blob.
   */
  getChunk() {
    return this._storageCtrl.getAttachment({
      start: this._index,
      end: this._index + this.CHUNK_SIZE,
    }).then(function(blob) {
      return blob;
    }, function(error) {
      return error;
    });
  }

  /**
   * Cancel StreamController.
   */
  cancel() {

  }
}
