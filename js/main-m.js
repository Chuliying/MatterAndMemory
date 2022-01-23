

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
        function loaded () {
            $wrapper.fadeIn(500);
            $wrapper.css('overflow','hidden');
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
                
            }
            else {
                $wrapper.addClass('visited');
            }
        }

    }
});