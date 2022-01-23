
$(document).ready(function () {
    if ($(window).width() < 776) {
        (function () {
            loadbar();
            function id(v) { return document.getElementById(v); }
            function loadbar() {
                var ovrl = id("overlay"),
                    prog = id("progress"),
                    stat = id("progstat"),
                    img = document.images,
                    c = 0;
                tot = img.length;

                function imgLoaded() {
                    c += 1;
                    var perc = ((100 / tot * c) << 0) + "%";
                    prog.style.width = perc;
                    stat.innerHTML = "LOADING " + perc;
                    if (c === tot) return doneLoading();
                }
                function doneLoading() {
                    ovrl.style.opacity = 0;
                    loaded();
                    setTimeout(function () {
                        ovrl.style.display = "none";
                    }, 800);
                }
                for (var i = 0; i < tot; i++) {
                    var tImg = new Image();
                    tImg.onload = imgLoaded;
                    tImg.onerror = imgLoaded;
                    tImg.src = img[i].src;
                }
            }
            document.addEventListener('DOMContentLoaded', loadbar, false);

        }());

        // Var
        const _scrollValue = 10000;
        const $bg_li = $('.bg li')
        const $bg_0 = $('.bg-0');
        const $bg_1 = $('.bg-1');
        const $bg_2 = $('.bg-2');
        const $bg_3 = $('.bg-3');
        const $bg_4 = $('.bg-4');
        const $cut_1 = $('#cut-1');
        const $cut_2 = $('#cut-2');
        const $cut_3 = $('#cut-3');
        const $cut_4 = $('#cut-4');
        const $cut = $('.cut');
        const $videoContainer = $('.video-container');
        const _vh = $(window).height();
        const _vw = $(window).width();
        const $mediaList = $('.media-list');
        const $mediaListUl = $('.media-list ul');
        const $listBtn = $('.list-btn');
        const $lightbox = $('.concert-lightbox');
        const $locationLi = $('.location li');
        const $mainBtn = $('.main .btn');



        // landing page
        const $wrapper = $('.wrapper');
        const $cutLanding = $('#cut-landing');
        const $mainLogo = $('.main-logo');
        const $layer = $('.bg-items .layer');
        const $bgItem = $('.bg-items');
        const $itemTitle = $bgItem.find('p');
        const $header = $('.header');
        const $body = $('body');
        const $landingBtn = $('.landing-btn');
        //$body.css('height', 4 * _scrollValue + _vh);
        // image loaded then
        function loaded() {
            $wrapper.fadeIn(500);
            $('.loading').fadeOut(500);
            const _visited = localStorage.getItem('visited');
            if (!_visited) {
                // LANDING CUT
                // show landing cut
                $mainLogo.fadeIn(1500);

                setTimeout(function () {
                    $cutLanding.addClass('show');
                }, 550);

                setTimeout(function () {
                    $mainLogo.fadeOut(1500);
                }, 2000);

                gsap.fromTo($bgItem, { autoAlpha: 0, y: 120 }, { autoAlpha: 1, y: 0, duration: 3 });
                gsap.to($header.add($itemTitle), 1, {
                    autoAlpha: 1,
                    delay: 5
                });

                $layer.each(function (i) {
                    gsap.to($(this), 3, {
                        z: 150,
                        rotation: random(-10, 10),
                        ease: 'none',
                        delay: 2.05 + 0.05 * i
                    });
                })

                gsap.to($('.layer-7'), 3, {
                    z: -25,
                    ease: 'none',
                    delay: 2.15
                });

                gsap.to($('.layer-8'), 3, {
                    z: -25,
                    ease: 'none',
                    delay: 2.165
                });
                localStorage.setItem('visited', true);
            }
            else {
                $wrapper.addClass('visited');
            }

            $landingBtn.click(function () {
                localStorage.setItem('visited', true);
            });

            const $block = $('.block');
            $block.each(function (i) {
                gsap.to($(this), {
                    scrollTrigger: {
                        trigger: this,
                        start: 'top 70%',
                        end: '1000%',
                        toggleClass: { targets: $(this), className: "active" }
                    }
                });
            });
            const $clipLi = $('.clip li')
            // 裝飾物件動態
            $clipLi.each(function (i) {
                gsap.to($(this), {
                    scrollTrigger: {
                        scrub: 1
                    },
                    yPercent: (i, target) => ScrollTrigger.maxScroll(window) * target.dataset.speed * 1,
                    ease: "slow"
                });
            })
            $mainBtn.click(function () {
                $videoContainer.fadeIn(500);
            });


            // random function
            function random(min, max) {
                return (Math.random() * (max - min)) + min;
            }

            //FLOATING ITEM
            const $floatingImg = $('.layer-7 img, .floating img');
            $floatingImg.each(function (i) {
                gsap.to($(this), 5, {
                    y: random(-15, 15),
                    rotation: random(-7, 7),
                    yoyo: true,
                    ease: 'none',
                    repeat: -1
                });
            });

            // menu
            const $hamburger = $('.hamburger-container');
            const $menu = $('.menu');
            $hamburger.click(function () {
                $(this).toggleClass('open');
                $menu.fadeToggle(500);
            })

            const $musicBtn = $('.music-btn');
            const $musicContainer = $('.music-container');
            $musicBtn.click(function () {
                $musicContainer.fadeIn(700);
            });

            const $videoContainer = $('.video-container');
            const $descriptionLi = $('.right-description li')
            const $removeBtn = $('.remove-btn');
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
                    if (_key) {
                        playMedia(_key);
                    }
                });
            }
            $removeBtn.click(function () {
                $musicContainer.fadeOut(300);
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
        }
    }
});