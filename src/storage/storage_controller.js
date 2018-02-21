/* global jIO */

import createPromiseCapability from '../util/promise_capability';

/**
 * Player browser storage controller.
 * @class
 */
export class StorageController {
  /**
   * @constructs StorageController
   */
  constructor(fileData) {
    this._fileData = fileData;
    this._storageID = null;
    /**
     * global jIO
     *
     * Create jIO instance for IndexedDB storage.
     * UuidStorage is required on the top of IndexedDB
     * to provide POST functionality.
     */
    this._storageInstance = jIO.createJIO({
      type: 'uuid',
      sub_storage: {
        type: 'indexeddb',
        database: 'PlayerJSStorage',
      },
    });
  }

  post(title) {
    let postCapability = createPromiseCapability();
    this._storageInstance.post({ title }).push((id) => {
      this._storageID = id;
      postCapability.resolve();
    }).push(undefined, function(error) {
      postCapability.reject(error);
    });

    return postCapability.promise;
  }

  putAttachment() {
    let putCapability = createPromiseCapability();
    this._storageInstance.putAttachment(this._storageID, this._storageID,
      this._fileData).push(function() {
      putCapability.resolve();
    }).push(undefined, function(error) {
      putCapability.reject(error);
    });

    return putCapability.promise;
  }

  getAttachment({ start, end }) {
    let getCapability = createPromiseCapability();
    this._storageInstance.getAttachment(this._storageID, this._storageID,
      { start, end }).push(function(data) {
      getCapability.resolve(data);
    }).push(undefined, function(error) {
      getCapability.reject(error);
    });

    return getCapability.promise;
  }

  cancel() {

  }
}
