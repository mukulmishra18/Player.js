/* global jIO */

import createPromiseCapability from '../util/promise_capability';

/**
 * Player browser storage controller.
 * @class
 */
export default class StorageController {
  /**
   * @constructs StorageController
   */
  constructor({ name, size, type, data, lastModifiedDate }) {
    this._fileName = name;
    this._fileSize = size;
    this._fileType = type;
    this._fileData = data;
    this._fileLastModifiedDate = lastModifiedDate;
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

  /**
   * Create a new document with the given metadata.
   * @return { Promise }
   */
  post() {
    let postCapability = createPromiseCapability();
    this._storageInstance.post({ title: 'enclosure' }).push((id) => {
      this._storageID = id;
      postCapability.resolve();
    }).push(undefined, function(error) {
      postCapability.reject(error);
    });

    return postCapability.promise;
  }

  /**
   * Get metadata from metadata store.
   * @return { Promise }
   */
  getMetaData() {
    let getMetadataCapability = createPromiseCapability();
    this._storageInstance.get(this._storageID).push(function(metadata) {
      getMetadataCapability.resolve(metadata);
    }).push(undefined, function(error) {
      getMetadataCapability.reject(error);
    });

    return getMetadataCapability.promise;
  }

  /**
   * Put given data in `Metadata` store of IDB.
   * @return { Promise }
   */
  put() {
    let putCapability = createPromiseCapability();
    this._storageInstance.put(this._storageID, {
      name: this._fileName,
      size: this._fileSize,
      type: this._fileType,
      lastModifiedDate: this._fileLastModifiedDate,
    }).push(function() {
      putCapability.resolve();
    }).push(undefined, function(error) {
      putCapability.reject(error);
    });

    return putCapability.promise;
  }

  /**
   * Put attachment in `Attachment` store of IDB.
   * @return { Promise }
   */
  putAttachment() {
    let putAttachmentCapability = createPromiseCapability();
    this._storageInstance.putAttachment(this._storageID, 'enclosure',
      this._fileData).push(function() {
      putAttachmentCapability.resolve();
    }).push(undefined, function(error) {
      putAttachmentCapability.reject(error);
    });

    return putAttachmentCapability.promise;
  }

  /**
   * Get attachment from `Attachment` store of IDB.
   * @return { Promise }
   */
  getAttachment({ start, end }) {
    let getCapability = createPromiseCapability();
    this._storageInstance.getAttachment(this._storageID, 'enclosure',
      { start, end }).push(function(data) {
      getCapability.resolve(data);
    }).push(undefined, function(error) {
      getCapability.reject(error);
    });

    return getCapability.promise;
  }

  /**
   * Cancel StorageController.
   */
  cancel() {

  }
}
