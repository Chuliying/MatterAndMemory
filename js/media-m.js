$(document).ready(function () {
    const $videoContainer = $('.video-container');
    const $mainLi = $('.main li');
    const $descriptionLi = $('.right-description li')
    const $lightbox = $('.concert-lightbox');
    const $removeBtn = $('.remove-btn');
    const $iframe = $('.concert-lightbox iframe');
    const $listLi = $('.media-list ul li');
    var videoId = '';

    const _video = [
        { name: "金瓜石音樂會", url: "hsArqgKOycY" },
        { name: "在與不在的場所", url: "gfmoCqmbDzY" },
        { name: "過往與今日的交陪", url: "XvHM2l27-lg" },
        { name: "沈睡在礦石01", url: "3gub3NsczBs" },
        { name: "沈睡在礦石02", url: "97Jk53_TFkI" },
        { name: "沈睡在礦石03", url: "j-jISnASo9M" },
        { name: "九芎樹", url: "aG3UJ5QusQo" },
        { name: "鶯歌音樂會", url: "SELkIRkPDs8" },
        { name: "在與不在的場所", url: "kWd0vzyKC_A" },
        { name: "過往與今日的交陪", url: "bHJG4_RNn6k" },
        { name: "夜譚", url: "qeLUB2aDHtw" },
        { name: "八里音樂會", url: "2DX7fyh9uWo" },
        { name: "在與不在的場所", url: "xaBXS83a4tM" },
        { name: "過往與今日的交陪", url: "B9fGha1ezo4" },
        { name: "千年垃圾場_上", url: "jBP6i6zfwYU" },
        { name: "千年垃圾場_下", url: "A8FvDqvwZPk" },
        { name: "骨骸", url: "eMqq4ZWIvS8" },
        { name: "貝殼", url: "Geav_cPYqoU" },
        { name: "淡水音樂會", url: "s-wB9jl_YEg" },
        { name: "在與不在的場所", url: "XfdA2rfPA4I" },
        { name: "過往與今日的交陪", url: "l8XUhyaPRuo" },
        { name: "消失的凱達格蘭", url: "x6ptk9nWDNk" }
    ];

    var player;
    var music;
    var voice;
    var autoPlayTimeout;

    function closeMedia() {
        clearTimeout(autoPlayTimeout);
        if (player.stopVideo !== undefined) {
            player.stopVideo();
        }
        $descriptionLi.css("opacity", 0).text('');
        if (music) {
            music.pause();
            music = null;
        }
        if (voice) {
            voice.pause();
            voice = null;
        }
    }

    function playMedia(_key) {
        clearTimeout(autoPlayTimeout);
        $videoContainer.fadeIn(300);
        videoId = _video[_key].url;
        console.log(videoId);
        player.loadVideoById(_video[_key].url);

    }

    onYouTubeIframeAPIReady();
    const $main_btn = $('.main-page .btn');
    function bindEvent() {
        $main_btn.click(function () {
            const _key = $(this).attr('data-key');
            if (_key){
                playMedia(_key);
            }
        });
    }
    $removeBtn.click(function () {
        $videoContainer.fadeOut(300);
        closeMedia()
    });





    function onYouTubeIframeAPIReady() {
        window.YT.ready(function () {
            player = new YT.Player('YouTubeVideoPlayerAPI', {
                width: '100%',            // 播放器寬度 (px)
                height: '100%',           // 播放器高度 (px)
                playerVars: {
                    autoplay: 1,            // 自動播放影片
                    controls: 0,            // 顯示播放器
                    modestbranding: 0,      // 隱藏YouTube Logo
                    fs: 0,                  // 隱藏全螢幕按鈕
                    cc_load_policty: 0,     // 隱藏字幕
                    iv_load_policy: 3,      // 隱藏影片註解
                    autohide: 0,            // 影片播放時，隱藏影片控制列
                    playlist: '',
                    loop: 1
                },
                events: {
                    onReady: bindEvent,
                    onStateChange: onStateChange
                }
            });
        });
    };
    function onStateChange(state) {
        if (state.data === YT.PlayerState.ENDED) {
            player.loadVideoById({
                videoId: videoId
            });
        }
    }
});

