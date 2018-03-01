/* global RSVP, jIO */

import createPromiseCapability from '../util/promise_capability';

/**
 * Player data stream controller.
 * @class
 */
export default class StreamController {
  /**
   * @constructs StreamController
   */
  constructor(storageCtrl) {
    this.CHUNK_SIZE = 10000;
    this._index = 0;
    this._readyCapability = createPromiseCapability();
    this._storageCtrl = storageCtrl;
    this._storageCtrl.post().then(() => {
      return this._storageCtrl.put();
    }).then(() => {
      return this._storageCtrl.putAttachment();
    }).then(() => {
      return this._readyCapability.resolve();
    }).catch(function(error) {
      return error;
    });
  }

  /**
   * Read a small chunk of data from IDB storage.
   * @return { Promise } A promise resolve with a { Blob } blob.
   */
  getChunk() {
    var chunkCapability = createPromiseCapability();
    this._readyCapability.promise.then(() => {
      this._storageCtrl.getAttachment({
        start: this._index,
        end: this._index + this.CHUNK_SIZE,
      }).then((blob) => {
        this._index += this.CHUNK_SIZE;
        return RSVP.Queue().push(function() {
          return jIO.util.readBlobAsArrayBuffer(blob);
        }).push(function(evt) {
          return chunkCapability.resolve(evt.target.result);
        }).push(undefined, function(error) {
          return chunkCapability.reject(error);
        });
      }).catch(function(error) {
        return chunkCapability.reject(error);
      });
    });

    return chunkCapability.promise;
  }

  /**
   * Cancel StreamController.
   */
  cancel() {

  }
}
