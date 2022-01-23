// 每次loading回頂部
window.onbeforeunload = function () {
  window.scrollTo(0, 3);
};

$(document).ready(function () {
  if ($(window).width() > 776) {
    (function () {
      loadbar();
      function id(v) {
        return document.getElementById(v);
      }
      function loadbar() {
        var ovrl = id("overlay"),
          prog = id("progress"),
          stat = id("progstat"),
          img = document.images,
          c = 0;
        tot = img.length;

        function imgLoaded() {
          c += 1;
          var perc = (((100 / tot) * c) << 0) + "%";
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
      document.addEventListener("DOMContentLoaded", loadbar, false);
    })();

    // Var
    const _scrollValue = 10000;
    const $bg_li = $(".bg li");
    const $bg_0 = $(".bg-0");
    const $bg_1 = $(".bg-1");
    const $bg_2 = $(".bg-2");
    const $bg_3 = $(".bg-3");
    const $bg_4 = $(".bg-4");
    const $cut_1 = $("#cut-1");
    const $cut_2 = $("#cut-2");
    const $cut_3 = $("#cut-3");
    const $cut_4 = $("#cut-4");
    const $cut = $(".cut");
    const $videoContainer = $(".video-container");
    const _vh = $(window).height();
    const _vw = $(window).width();
    const $mediaList = $(".media-list");
    const $mediaListUl = $(".media-list ul");
    const $listBtn = $(".list-btn");
    const $lightbox = $(".concert-lightbox");
    const $locationLi = $(".location li");
    const $mainCut = $('#main-cut');
    gsap.registerPlugin( ScrollToPlugin);

    $listBtn.click(function () {
      $(this).toggleClass("show");
      $mediaList.toggleClass("active");
    });

    // random function
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // 滾動function
  
    function bodyScrollTo(_p) {
      const _keyValue = parseInt(_p) + 0.75;
      const _value = _scrollValue * _keyValue;
      gsap.to(window, {duration: _keyValue+1, scrollTo: _value});

      setTimeout(function () {
        window.addEventListener("scroll", onScroll, false);
      }, 1500);
    }

    //FLOATING ITEM
    const $floatingImg = $(".layer-7 img, .floating img");
    $floatingImg.each(function (i) {
      gsap.to($(this), 5, {
        y: random(-15, 15),
        rotation: random(-7, 7),
        yoyo: true,
        ease: "none",
        repeat: -1,
      });
    });

    // cut active controll
    $cut.each(function (i) {
      gsap.to($(this), {
        scrollTrigger: {
          start: (i + 0.7) * _scrollValue,
          end: (0.95 + i) * _scrollValue,
          toggleClass: {
            targets: $(this)
              .add($mediaListUl[i])
              .add($listBtn)
              .add($locationLi[i]),
            className: "active",
          },
        },
      });
    });

    // 背景觸發
    $bg_li.each(function (i) {
      gsap.to($(this), {
        scrollTrigger: {
          start: (i + 0.99) * _scrollValue,
          end: (0.999 + i) * _scrollValue,
          scrub: true,
        },
        autoAlpha: 0,
      });
    });

    var ticking = false; // rAF

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(realFunc);
        ticking = true;
      }
    }

    function realFunc() {
      // do something...
      const scroll = $(window).scrollTop();
      // if (scroll < 3) {
      //   $mainCut.css("display", "none");
      //   $mainCut.delay(1100).fadeIn(500);
      //   gsap.to(window, {duration: 0, scrollTo:3.98 * _scrollValue});
      // }

      if (scroll > 3.99 * _scrollValue) {
        $mainCut.css("display", "none");
        $mainCut.delay(500).fadeIn(500);
        gsap.to(window, {duration:0.01, scrollTo: 10});
      }
      ticking = false;
    }

    // menu
    const $hamburger = $(".hamburger-container");
    const $menu = $(".menu");
    $hamburger.click(function () {
      $(this).toggleClass("open");
      $menu.fadeToggle(500);
    });

    // landing page
    const $wrapper = $(".wrapper");
    const $cutLanding = $("#cut-landing");
    const $mainLogo = $(".main-logo");
    const $layer = $(".bg-items .layer");
    const $bgItem = $(".bg-items");
    const $itemTitle = $bgItem.find("p");
    const $header = $(".header");
    const $body = $("body");
    const $landingBtn = $(".landing-btn");
    $body.css("height", 4 * _scrollValue + _vh);
    // image loaded then

    function loaded() {
      const _paddingTopValue =
        ($(window).height() - $(window).width() * 0.416) / 2;
      $lightbox.find("ul").css("padding-top", _paddingTopValue);
      $wrapper.fadeIn(500);
      $(".loading").fadeOut(500);
      const _visited = localStorage.getItem("visited");
      if (!_visited) {
        // LANDING CUT
        // show landing cut
        $mainLogo.fadeIn(1500);

        setTimeout(function () {
          $cutLanding.addClass("show");
        }, 550);

        setTimeout(function () {
          $mainLogo.fadeOut(1500);
        }, 2000);

        gsap.fromTo(
          $bgItem,
          { autoAlpha: 0, y: 120 },
          { autoAlpha: 1, y: 0, duration: 3 }
        );
        gsap.to($header.add($itemTitle), 1, {
          autoAlpha: 1,
          delay: 5,
        });

        $layer.each(function (i) {
          gsap.to($(this), 3, {
            z: 150,
            rotation: random(-10, 10),
            ease: "none",
            delay: 2.05 + 0.05 * i,
          });
        });

        gsap.to($(".layer-7"), 3, {
          z: -25,
          ease: "none",
          delay: 2.15,
        });

        gsap.to($(".layer-8"), 3, {
          z: -25,
          ease: "none",
          delay: 2.165,
        });
      } else {
        $wrapper.addClass("visited");
      }

      // 轉場
      $landingBtn.click(function () {
        const _key = $(this).attr("key");
        $body.css("overflow", "auto");
        bodyScrollTo(_key);
        localStorage.setItem("visited", true);

        gsap.to($cutLanding.add($bg_0), 1, {
          z: 150,
          autoAlpha: 0,
        });
      });

      // -----------------------------------------------
      // -----------------------------------------------

      // CUT 1 變數
      const $cut_1_Ul = $("#cut-1 .clip ul");
      const $cut_1_Li = $("#cut-1 .clip li");
      const $cut_1_Main = $("#cut-1 .main");

      // cut 出現
      gsap.to($cut_1, {
        scrollTrigger: {
          scrub: 1,
          start: "0",
          end: 0.075 * _scrollValue,
        },
        y: 0,
        z: 0,
        autoAlpha: 1,
      });

      // cut 消失
      gsap.to($cut_1, {
        scrollTrigger: {
          start: 0.95 * _scrollValue,
          end: 1 * _scrollValue,
          scrub: 1,
        },
        xPercent: -17.5,
        yPercent: 35,
        z: 151,
        immediateRender: false,
      });

      // cut fadeout
      gsap.to($cut_1, {
        scrollTrigger: {
          start: 0.9999999 * _scrollValue,
          end: 1 * _scrollValue,
          scrub: 0.5,
        },
        autoAlpha: 0,
        immediateRender: false,
      });

      // 裝飾物件動態
      $cut_1_Li.each(function (i) {
        gsap.to($(this), {
          scrollTrigger: {
            scrub: 1,
            start: 0.065 * _scrollValue,
            end: 0.7 * _scrollValue,
          },
          y: (i, target) =>
            -ScrollTrigger.maxScroll(window) *
            target.dataset.speed *
            (2500 / _scrollValue),
          rotation: i > 2 ? random(-45, 45) : 0,
          ease: "slow",
        });
      });

      // 裝飾物件 zoom out
      gsap.to($cut_1_Ul, {
        scrollTrigger: {
          scrub: 1,
          start: 0.7 * _scrollValue,
          end: 0.75 * _scrollValue,
        },
        z: 155,
      });

      // main 長出來
      gsap.to($cut_1_Main, {
        scrollTrigger: {
          start: 0.25 * _scrollValue,
          end: 0.68 * _scrollValue,
          scrub: 1,
        },
        y: 0,
      });
      // main zoom in
      gsap.to($cut_1_Main, {
        scrollTrigger: {
          start: 0.68 * _scrollValue,
          end: 0.75 * _scrollValue,
          scrub: 1,
        },
        z: -5,
        immediateRender: false,
      });

      // -----------------------------------------------
      // -----------------------------------------------

      // CUT 2 -------

      const $cut_2_Ul = $("#cut-2 .clip ul");
      const $cut_2_Li = $("#cut-2 .clip li");
      const $cut_2_Main = $("#cut-2 .main");

      // cut 出現
      gsap.to($cut_2, {
        scrollTrigger: {
          scrub: 1,
          start: 1 * _scrollValue,
          end: 1.075 * _scrollValue,
        },
        x: 0,
        z: 0,
        autoAlpha: 1,
      });
      // cut 消失
      gsap.to($cut_2, {
        scrollTrigger: {
          start: 1.95 * _scrollValue,
          end: 2 * _scrollValue,
          scrub: 1,
        },
        xPercent: -21.5,
        yPercent: 36,
        z: 151,
        immediateRender: false,
      });
      // cut fadeout
      gsap.to($cut_2, {
        scrollTrigger: {
          start: 1.9999999 * _scrollValue,
          end: 2 * _scrollValue,
          scrub: 0.5,
        },
        autoAlpha: 0,
        immediateRender: false,
      });

      // 裝飾物件動態
      $cut_2_Li.each(function (i) {
        gsap.to($(this), {
          scrollTrigger: {
            scrub: 1,
            start: 1.065 * _scrollValue,
            end: 1.7 * _scrollValue,
          },
          x: (i, target) =>
            ScrollTrigger.maxScroll(window) *
            target.dataset.speed *
            (2500 / _scrollValue),
          ease: "slow",
        });
      });

      // 裝飾物件 zoom out
      gsap.to($cut_2_Ul, {
        scrollTrigger: {
          scrub: 1,
          start: 1.7 * _scrollValue,
          end: 1.75 * _scrollValue,
        },
        z: 155,
      });

      // main 長出來
      gsap.to($cut_2_Main, {
        scrollTrigger: {
          start: 1.065 * _scrollValue,
          end: 1.68 * _scrollValue,
          scrub: 1,
        },
        x: 0,
      });
      // main zoom in
      gsap.to($cut_2_Main, {
        scrollTrigger: {
          start: 1.68 * _scrollValue,
          end: 1.75 * _scrollValue,
          scrub: 1,
        },
        z: -5,
        y: 0,
        immediateRender: false,
      });

      // CUT 3 -------

      const $cut_3_Ul = $("#cut-3 .clip ul");
      const $cut_3_Li = $("#cut-3 .clip li");
      const $cut_3_Main = $("#cut-3 .main");

      // cut 出現
      gsap.to($cut_3, {
        scrollTrigger: {
          scrub: 1,
          start: 3 * _scrollValue,
          end: 3.075 * _scrollValue,
        },
        y: 0,
        z: 0,
        autoAlpha: 1,
      });
      // cut 消失
      gsap.to($cut_3, {
        scrollTrigger: {
          start: 3.95 * _scrollValue,
          end: 4 * _scrollValue,
          scrub: 1,
        },
        xPercent: -22.75,
        yPercent: 21,
        z: 151,
        immediateRender: false,
      });
      // cut fadeout
      gsap.to($cut_3, {
        scrollTrigger: {
          start: 3.9999999 * _scrollValue,
          end: 4 * _scrollValue,
          scrub: 0.5,
        },
        autoAlpha: 0,
        immediateRender: false,
      });

      // 裝飾物件動態
      $cut_3_Li.each(function (i) {
        gsap.to($(this), {
          scrollTrigger: {
            scrub: 1,
            start: 3.065 * _scrollValue,
            end: 3.7 * _scrollValue,
          },
          x: (i, target) =>
            ScrollTrigger.maxScroll(window) *
            target.dataset.speed *
            (2500 / _scrollValue) *
            -1,
          ease: "slow",
        });
      });
      // 裝飾物件 zoom out
      gsap.to($cut_3_Ul, {
        scrollTrigger: {
          scrub: 1,
          start: 3.7 * _scrollValue,
          end: 3.75 * _scrollValue,
        },
        z: 155,
      });

      // main 長出來
      gsap.to($cut_3_Main, {
        scrollTrigger: {
          start: 3.065 * _scrollValue,
          end: 3.68 * _scrollValue,
          scrub: 1,
        },
        x: 0,
      });
      // main zoom in
      gsap.to($cut_3_Main, {
        scrollTrigger: {
          start: 3.68 * _scrollValue,
          end: 3.75 * _scrollValue,
          scrub: 1,
        },
        z: -5,
        y: 0,
        immediateRender: false,
      });

      // CUT 4 -------

      const $cut_4_Ul = $("#cut-4 .clip ul");
      const $cut_4_Li = $("#cut-4 .clip li");
      const $cut_4_Main = $("#cut-4 .main");
      // cut 出現
      gsap.to($cut_4, {
        scrollTrigger: {
          scrub: 1,
          start: 2 * _scrollValue,
          end: 2.075 * _scrollValue,
        },
        y: 0,
        z: 0,
        autoAlpha: 1,
      });
      // cut 消失
      gsap.to($cut_4, {
        scrollTrigger: {
          start: 2.95 * _scrollValue,
          end: 3 * _scrollValue,
          scrub: 1,
        },
        xPercent: -35,
        yPercent: -26,
        z: 151,
        immediateRender: false,
      });
      // cut fadeout
      gsap.to($cut_4, {
        scrollTrigger: {
          start: 2.9999999 * _scrollValue,
          end: 3 * _scrollValue,
          scrub: 0.5,
        },
        autoAlpha: 0,
        immediateRender: false,
      });

      // 裝飾物件動態
      $cut_4_Li.each(function (i) {
        gsap.to($(this), {
          scrollTrigger: {
            scrub: 1,
            start: 2.065 * _scrollValue - 500,
            end: 2.7 * _scrollValue - 500,
          },
          yPercent: (i, target) =>
            ScrollTrigger.maxScroll(window) *
            target.dataset.speed *
            (2500 / _scrollValue),
          ease: "slow",
        });
      });
      // 裝飾物件 zoom out
      gsap.to($cut_4_Ul, {
        scrollTrigger: {
          scrub: 1,
          start: 2.7 * _scrollValue,
          end: 2.75 * _scrollValue,
        },
        z: 155,
      });

      // main 長出來
      gsap.to($cut_4_Main, {
        scrollTrigger: {
          start: 2.065 * _scrollValue,
          end: 2.68 * _scrollValue,
          scrub: 1,
        },
        x: 0,
      });
      // main zoom in
      gsap.to($cut_4_Main, {
        scrollTrigger: {
          start: 2.68 * _scrollValue,
          end: 2.75 * _scrollValue,
          scrub: 1,
        },
        z: -5,
        y: 0,
        immediateRender: false,
      });
    }
  }
});
