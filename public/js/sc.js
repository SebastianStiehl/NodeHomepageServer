(function () {
  var clientId = "68f4112540da4dcf4b5511aee2ce01e1",
    maxEntriesToShow = 10,
    playingStream,
    $player,
    $musicList,
    streamData,
    templateHtml;

  function stopPlayback() {
    $player.get(0).pause();
    $player.get(0).currentTime = 0;
    playingStream.isPlaying = false;
    playingStream = null;
  }

  function playNextSong() {
    var nextSongIndex = (playingStream.index + 1);

    if (streamData.length > nextSongIndex) {
      playSong(nextSongIndex);
    } else {
      stopPlayback();
    }

    renderStreamData();
  }

  function playSong(streamIndex) {
    if (playingStream) {
      stopPlayback();
    }

    playingStream = streamData[streamIndex];
    playingStream.isPlaying = true;
    $player.attr("src", playingStream.stream_url + "?client_id=" + clientId);
    $player.get(0).play();
    $player.show();

    renderStreamData();
  }

  function renderStreamData() {
    var rendered = Mustache.render(templateHtml, {
      favorites: streamData
    });

    $musicList.html(rendered);
  }

  function loaded(data) {
    data.splice(maxEntriesToShow, data.length);

    $.map(data, function (el, index) {
      el.index = index;
      el.durationMinutes = (el.duration / 1000 / 60).toFixed(0);
      return el;
    });

    streamData = data;
    renderStreamData();
  }

  function attachEventListener() {
    $player.on("ended", playNextSong);

    $("body").on("click", ".play", function () {
      var nextStreamIndex = $(this).data("stream-index");

      if (playingStream && playingStream.index === nextStreamIndex) {
        stopPlayback();
      } else {
        playSong(nextStreamIndex);
      }
      renderStreamData();
    });
  }

  $(function () {
    $.get("/js/sc.html", function (data) {
      templateHtml = data;

      $.getJSON("https://api.soundcloud.com/users/5oc/favorites.json?client_id=" + clientId, loaded);
    });

    $player = $("#player");
    $musicList = $('#musicList');
    attachEventListener();
  });

}());
