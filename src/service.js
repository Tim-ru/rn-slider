import TrackPlayer, { TrackPlayerEvents, State } from 'react-native-track-player';
import { EventRegister } from 'react-native-event-listeners';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious())
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())
  TrackPlayer.addEventListener('remote-play', () => EventRegister.emit('onPause', false))
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())
  TrackPlayer.addEventListener('remote-pause', () => EventRegister.emit('onPause', true))
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())
  TrackPlayer.addEventListener('remote-stop', () => EventRegister.emit('onPause', true))
  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext())
}