$(document).ready(function () {
  const _scrollValue = 10000;
  const $videoContainer = $(".video-container");
  const $mainLi = $(".main li");
  const $descriptionLi = $(".right-description li");
  const $lightbox = $(".concert-lightbox");
  const $removeBtn = $(".remove-btn");
  const $iframe = $(".concert-lightbox iframe");
  const $listLi = $(".media-list ul li");
  var videoId = "";

  const _video = [
    { name: "金瓜石音樂會", url: "zT3fWaDvhL4" },
    { name: "在與不在的場所", url: "ZAwqalcasys" },
    { name: "過往與今日的交陪", url: "0WXTyNdsNJ4" },
    { name: "沈睡在礦石01", url: "B3M-QTK8tXM" },
    { name: "沈睡在礦石02", url: "gIJSeqSwUs0" },
    { name: "沈睡在礦石03", url: "BPtFa4TsxSg" },
    { name: "九芎樹", url: "XoLe8Gwznhw" },
    { name: "鶯歌音樂會", url: "hu3asNBSyzE" },
    { name: "在與不在的場所", url: "lYPiK7pwLk4" },
    { name: "過往與今日的交陪", url: "bHJG4_RNn6k" },
    { name: "夜譚", url: "3XW6tQg6-kc" },
    { name: "八里音樂會", url: "RJ-FXAz1iGU" },
    { name: "在與不在的場所", url: "nW_edXI3hS4" },
    { name: "過往與今日的交陪", url: "5foF1eTGDlo" },
    { name: "千年垃圾場_上", url: "WnvuZXB60_Y" },
    { name: "千年垃圾場_下", url: "ruvCWAvuHak" },
    { name: "骨骸", url: "Kxt_LqQl-HY" },
    { name: "貝殼", url: "JSgkPz-yFtw" },
    { name: "淡水音樂會", url: "hu3asNBSyzE" },
    { name: "在與不在的場所", url: "Dxzu_ItyRA0" },
    { name: "過往與今日的交陪", url: "JoD5U-veTSM" },
    { name: "消失的凱達格蘭", url: "hVaXFQk9Gwc" },
  ];
  const _music = [
    { name: "untitled", url: "media/untitled.mp3" },
    { name: "山吼", url: "media/roar.mp3" },
    { name: "礦山流動意象", url: "media/flow.mp3" },
    { name: "黃金河", url: "media/goldenriver.mp3" },
    { name: "湖山製片廠往日殘懷", url: "media/hushan.mp3" },
    { name: "鳶山遙想河運時代", url: "media/transport.mp3" },
    { name: "甕之音", url: "media/urn.mp3" },
    { name: "鶯歌石黃昏風雨將至", url: "media/yingge.mp3" },
    { name: "八里聲音散步", url: "media/walk.mp3" },
    { name: "千年", url: "media/millennium.mp3" },
    { name: "無知的音樂家：大坌坑聯想", url: "media/musian.mp3" },
    { name: "夜宴", url: "media/banquet.mp3" },
    { name: "淡水", url: "media/tamsui.mp3" },
    { name: "電報", url: "media/telegraph.mp3" },
  ];
  const _voice = [
    { name: "九芎樹", url: "media/tree.mp3" },
    { name: "沈睡的礦石01", url: "media/sleep-1.mp3" },
    { name: "沈睡的礦石02", url: "media/sleep-2.mp3" },
    { name: "沈睡的礦石03", url: "media/sleep-3.mp3" },
    { name: "物的記憶：鐵軌", url: "media/rail.mp3" },
    { name: "夜譚", url: "media/night.mp3" },
    { name: "物的記憶：煙囪", url: "media/chimney.mp3" },
    { name: "八里暗時廣播電台", url: "media/radio.mp3" },
    { name: "千年垃圾場上", url: "media/landfill-1.mp3" },
    { name: "千年垃圾場下", url: "media/landfill-2.mp3" },
    { name: "物的記憶：貝殼", url: "media/kai.mp3" },
    { name: "計程車", url: "media/taxi.mp3" },
    { name: "骨骸", url: "media/skeleton.mp3" },
    { name: "日記", url: "media/diary.mp3" },
    { name: "物的記憶：印章", url: "media/stamp.mp3" },
    { name: "消失的凱達格蘭", url: "media/ketagalan.mp3" },
  ];

  var player;
  var music;
  var voice;
  var autoPlayTimeout;
  var playScene;

  const $cut = $(".cut");
  const _autoMedia = [
    {
      video: 2,
      music: 1,
      voice: 4,
    },
    {
      video: 10,
      music: 7,
      voice: 5,
    },
    {
      video: 16,
      music: 10,
      voice: 12,
    },
    {
      video: 19,
      music: 13,
      voice: 13,
    },
  ];

  _autoTrigger = true;

  function autoPlay(i) {
    if (!_autoTrigger) {
      return;
    }
    clearTimeout(autoPlayTimeout);
    playScene = i;
    autoPlayTimeout = setTimeout(function () {
      if (!_autoTrigger) {
        return;
      }
      autoPlayOn = false;
      playMedia("video", _autoMedia[i].video);
      playMedia("music", _autoMedia[i].music);
      playMedia("voice", _autoMedia[i].voice);
    }, 3000);
    autoPlayTimeout;
  }
  window.addEventListener("scroll", onScroll, false);
  var ticking = false; // rAF

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(realFunc);
      ticking = true;
    }
  }

  function realFunc() {
    // do something...
    scrollFunction()

    ticking = false;
  }
  const scrollFunction =  () => {
    const scroll = $(window).scrollTop();
    for (i = 0; i < $cut.length; i++) {
      const _zoneStart = i * _scrollValue;
      const _activeZoneStart = (i + 0.7) * _scrollValue;
      const _activeZoneEnd = (i + 0.9) * _scrollValue;
      if (scroll < _zoneStart) {
        return;
      }
      if (scroll > _activeZoneStart && scroll < _activeZoneEnd) {
        const _cutValue = i + 1;
        const _classValue = "video-" + _cutValue;
        $videoContainer.removeAttr("id");
        $videoContainer.attr("id", _classValue);
        autoPlay(i);
      }

      if (music || i != playScene) {
        closeMedia();
        $videoContainer.css("display", "none");
      }
    }
  };
  function closeMedia() {
    clearTimeout(autoPlayTimeout);
    if (player.stopVideo !== undefined) {
      player.stopVideo();
    }
    $descriptionLi.css("opacity", 0).text("");
    if (music) {
      music.pause();
      music = null;
    }
    if (voice) {
      voice.pause();
      voice = null;
    }
  }

  // function compareVisited(type, key) {
  //   $listLi.each(function () {
  //     const _type = $(this).attr('data-type');
  //     const _key = $(this).attr('data-key');

  //     if (_type === type && _key === key) {
  //       $(this).addClass('visited');
  //     }
  //   })
  // }

  function playMedia(_type, _key) {
    clearTimeout(autoPlayTimeout);
    _autoTrigger = false;

    switch (_type) {
      case "video":
        $videoContainer.fadeIn(300);
        videoId = _video[_key].url;
        player.loadVideoById(_video[_key].url);
        $descriptionLi
          .eq(0)
          .text("影像：" + _video[_key].name)
          .css("opacity", 1);
        break;
      case "concert":
        let key;
        if (_key == 0) {
          key = 0;
        }
        if (_key == 7) {
          key = 1;
        }

        if (_key == 11) {
          key = 2;
        }

        if (_key == 18) {
          key = 3;
        }
        closeMedia();
        $lightbox.fadeIn(300);
        $lightbox.find("li").fadeOut(100).eq(key).fadeIn(300);
        break;
      case "music":
        if (music) {
          music.pause();
        }
        music = new Audio(_music[_key].url);
        $descriptionLi
          .eq(1)
          .text("音樂：" + _music[_key].name)
          .css("opacity", 1);
        music.play();
        break;
      case "voice":
        if (voice) {
          voice.pause();
        }
        voice = new Audio(_voice[_key].url);
        $descriptionLi
          .eq(2)
          .text("旁白：" + _voice[_key].name)
          .css("opacity", 1);
        voice.play();
        break;
    }
  }

  onYouTubeIframeAPIReady();
  const $main_btn = $(".main li");
  function bindEvent() {
    $main_btn.add($listLi).click(function () {
      const _type = $(this).attr("data-type");
      const _key = $(this).attr("data-key");
      playMedia(_type, _key);
    });
  }
  $removeBtn.click(function () {
    $lightbox.fadeOut(300);
    for (var i = 0; i < $iframe.length; i++) {
      $iframe[i].src = $iframe[i].src;
    }
  });
  $main_btn.add($listLi).click(function () {
    const _type = $(this).attr("data-type");
    const _key = $(this).attr("data-key");
    playMedia(_type, _key);
  });

  $mainLi.add($listLi).each(function () {
    const _type = $(this).attr("data-type");
    const _key = $(this).attr("data-key");
    let _title = "";
    switch (_type) {
      case "music":
        _title = _music[_key].name;
        break;
      case "voice":
        _title = _voice[_key].name;
        break;
      case "video":
        _title = _video[_key].name;
        break;
      case "concert":
        _title = _video[_key].name;
        break;
    }
    if (_type) {
      $(this).append(
        "<div><div><span>" + _type + "</span><p>" + _title + "</p></div></div>"
      );
    }
  });

  function onYouTubeIframeAPIReady() {
    window.YT.ready(function () {
      player = new YT.Player("YouTubeVideoPlayerAPI", {
        width: "100%", // 播放器寬度 (px)
        height: "100%", // 播放器高度 (px)
        playerVars: {
          autoplay: 1, // 自動播放影片
          controls: 0, // 顯示播放器
          modestbranding: 0, // 隱藏YouTube Logo
          fs: 0, // 隱藏全螢幕按鈕
          cc_load_policty: 0, // 隱藏字幕
          iv_load_policy: 3, // 隱藏影片註解
          autohide: 0, // 影片播放時，隱藏影片控制列
          playlist: "",
          loop: 1,
        },
        events: {
          onReady: bindEvent,
          onStateChange: onStateChange,
        },
      });
    });
  }
  function onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED) {
      player.loadVideoById({
        videoId: videoId,
      });
    }
  }
});
