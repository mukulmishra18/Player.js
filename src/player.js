/* global AudioContext, MediaSource, URL */

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
   */
  constructor() {
    // At the initial version we only support mp3.
    this.mimeType = 'audio/mpeg';
    this._audioElement = null;
    this._file = null;
    this._audioContext = new AudioContext();
    this._mediaSource = new MediaSource();
  }

  /**
   * Attach HTML Audio element to the player;
   * @params {HTML Audio} audio
   */
  attachAudioElement(audio) {
    this._audioElement = audio;
    this._attchAudioElementToMediaSource();
    this._attachAudioContextToDestination();
  }

  /**
   * Attach audio data file to player.
   * @params {File} files
   */
  attachDataFile(files) {
    this._file = files[0];
    this._fileData = this._file.slice();
    this._fileLastModificationDate = this._file.lastModificationDate;
    this._fileName = this._file.name;
    this._fileType = this._file.type;
    this._fileSize = this._file.size;
    this._storageCtrl = new StorageController(this._fileData);
    this._streamCtrl = new StreamController(this._storageCtrl);
  }

  _attchAudioElementToMediaSource() {
    this._audioElement.src = URL.createObjectURL(this._mediaSource);
    this._mediaSource.onsourceopen = this._onSourceOpen.bind(this);
  }

  _attachAudioContextToDestination() {
    this._source =
      this._audioContext.createMediaElementSource(this._audioElement);
    this._destination = this._audioContext.destination;
    this._gainNode = this._audioContext.createGain();

    // Pipe source to destination through gain node to
    // control sound of the audio element.
    this._source.connect(this._gainNode);
    this._gainNode.connect(this._destination);
  }

  _onSourceOpen() {
    this._sourceBuffer = this._mediaSource.addSourceBuffer(this.mimeType);
    this._audioEventHandler = new AudioEventHandler(this._audioElement,
      this._streamCtrl, this._mediaSource, this._sourceBuffer);
  }

  /**
   * Destroy the player and clean up memory.
   */
  destroy() {

  }
}
