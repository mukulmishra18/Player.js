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
  }

  /**
   * timeUpdate event of audio element.
   */
  _onTimeUpdate() {
    // Only append to sourceBuffer when buffered data is less than 10sec.
    if ((this._mediaSource.timestampOffset -
         this._audioElement.currentTime) > 10) {
      return;
    }

    return this._streamCtrl.getChunk().then(function(chunk) {
      if (chunk) {
        return this._sourceBuffer.appendBuffer(chunk);
      }
      return this._mediaSource.endOfStream();
    }).catch(function(error) {
      return error;
    });
  }
}
