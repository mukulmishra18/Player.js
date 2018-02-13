import StorageController from './storageController';
import StreamController from './streamController';

/**
 * Main entry point of player.
 */
export default class Player {
  /** @constructor Player */
  constructor(files) {
    this.files = files;
    this.storageCtrl = new StorageController(files);
    this.streamCtrl = new StreamController();
  }

  /**
   * Read a small chunk of data.
   * @return {Promise}
   */
  read() {
    return this.streamCtrl.read();
  }

  /**
   * Cancel the player and clean up memory.
   */
  cancel() {

  }
}
