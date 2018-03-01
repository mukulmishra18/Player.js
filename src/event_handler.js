/**
 * Player audio element events.
 * @class
 */
export default class AudioEventHandler {
  constructor(audio, streamCtrl, mediaSource, sourceBuffer) {
    this._audioElement = audio;
    this._streamCtrl = streamCtrl;
    this._mediaSource = mediaSource;
    this._sourceBuffer = sourceBuffer;
    this._audioElement.ontimeupdate = this._onTimeUpdate.bind(this);
    this._sourceBuffer.onupdateend = this._onUpdateEnd.bind(this);
    this._streamCtrl.getChunk().then((buffer) => {
      if (buffer) {
        return this._sourceBuffer.appendBuffer(buffer);
      }
      return this._sourceBuffer.endOfStream();
    }).catch(function(error) {
      return error;
    });
  }

  /**
   * timeUpdate event of audio element.
   */
  _onTimeUpdate() {
    // Only append to sourceBuffer when buffered data is less than 10sec.
    if ((this._sourceBuffer.timestampOffset -
         this._audioElement.currentTime) > 10) {
      return;
    }

    return this._streamCtrl.getChunk().then((chunk) => {
      if (chunk) {
        return this._sourceBuffer.appendBuffer(chunk);
      }
      return this._mediaSource.endOfStream();
    }).catch((error) => {
      return error;
    });
  }

  /**
   * timeUpdate event of audio element.
   */
  _onUpdateEnd() {
    // Only append to sourceBuffer when buffered data is less than 10sec.
    if ((this._sourceBuffer.timestampOffset -
         this._audioElement.currentTime) > 10) {
      return;
    }

    return this._streamCtrl.getChunk().then((chunk) => {
      if (chunk && !this._sourceBuffer.updating) {
        return this._sourceBuffer.appendBuffer(chunk);
      }
      return this._mediaSource.endOfStream();
    }).catch((error) => {
      return error;
    });
  }
}
