/**
 * Player audio element events.
 * @class
 */
export class AudioEventHandler {
  constructor(audio, streamCtrl, mediaSource, sourceBuffer) {
    this._audioElement = audio;
    this._streamCtrl = streamCtrl;
    this._mediaSource = mediaSource;
    this._sourceBuffer = sourceBuffer;
    this._audioElement.ontimeupdate = this._onTimeUpdate.bind(this);
  }

  _onTimeUpdate() {
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
