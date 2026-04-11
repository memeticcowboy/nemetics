(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var players = document.querySelectorAll('.audio-player');
    for (var i = 0; i < players.length; i++) {
      initAudioPlayer(players[i]);
    }
  });

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  function initAudioPlayer(container) {
    var tracks = container.querySelectorAll('.audio-track');

    for (var i = 0; i < tracks.length; i++) {
      initTrack(tracks[i]);
    }
  }

  function initTrack(track) {
    var src = track.getAttribute('data-src');
    var playBtn = track.querySelector('.audio-play-btn');
    var iconPlay = track.querySelector('.audio-icon-play');
    var iconPause = track.querySelector('.audio-icon-pause');
    var progressBar = track.querySelector('.audio-progress-bar');
    var progressFill = track.querySelector('.audio-progress-fill');
    var currentTime = track.querySelector('.audio-current');
    var durationEl = track.querySelector('.audio-duration');
    var volumeBtn = track.querySelector('.audio-volume-btn');
    var volumeSlider = track.querySelector('.audio-volume-slider');

    var audio = new Audio();
    audio.preload = 'metadata';
    audio.src = src;
    audio.volume = 0.8;

    var lastVolume = 0.8;

    audio.addEventListener('loadedmetadata', function () {
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', function () {
      currentTime.textContent = formatTime(audio.currentTime);
      if (audio.duration) {
        var pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
      }
    });

    audio.addEventListener('ended', function () {
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      progressFill.style.width = '0%';
      currentTime.textContent = '0:00';
    });

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        // Pause all other tracks on the page
        var allAudio = document.querySelectorAll('.audio-track');
        for (var i = 0; i < allAudio.length; i++) {
          if (allAudio[i] !== track && allAudio[i]._audio && !allAudio[i]._audio.paused) {
            allAudio[i]._audio.pause();
            allAudio[i].querySelector('.audio-icon-play').style.display = '';
            allAudio[i].querySelector('.audio-icon-pause').style.display = 'none';
          }
        }
        audio.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = '';
      } else {
        audio.pause();
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
      }
    });

    // Click on progress bar to seek
    progressBar.addEventListener('click', function (e) {
      if (!audio.duration) return;
      var rect = progressBar.getBoundingClientRect();
      var pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });

    // Volume controls
    volumeSlider.addEventListener('input', function () {
      var val = parseFloat(this.value);
      audio.volume = val;
      lastVolume = val > 0 ? val : lastVolume;
      updateVolumeIcon(val);
    });

    volumeBtn.addEventListener('click', function () {
      if (audio.volume > 0) {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
      } else {
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume;
        updateVolumeIcon(lastVolume);
      }
    });

    function updateVolumeIcon(vol) {
      if (vol === 0) {
        volumeBtn.innerHTML = '\u{1F507}';
      } else if (vol < 0.5) {
        volumeBtn.innerHTML = '\u{1F509}';
      } else {
        volumeBtn.innerHTML = '\u{1F508}';
      }
    }

    // Store audio reference on the element for cross-track pause
    track._audio = audio;
  }
})();
