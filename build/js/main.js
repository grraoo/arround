(function () {
'use strict';

const team = function() {

  const closeTeam = function(e) {
    const currentItem = document.querySelector(`.team__item--active`);
    currentItem.querySelector(`.team__close`).removeEventListener(`click`, closeTeam);
    currentItem.classList.remove(`team__item--active`);
  };
  const closeTeamByEsc = function(e) {
    if(e.keyCode === 27) {
      closeTeam();
    }
  };
  const openTeam = function(e) {
    if(e.target.classList.contains(`team__img`)) {
      const openedTeam = document.querySelector(`.team__item--active`);
      if(openedTeam) {
        openedTeam.classList.remove(`team__item--active`);
      }
      const currentItem = e.target.parentNode.parentNode.parentNode;
      currentItem.classList.add(`team__item--active`);
      currentItem.querySelector(`.team__close`).addEventListener(`click`, closeTeam);
    }
  };
  document.addEventListener('click', openTeam);
  document.addEventListener('keydown', closeTeamByEsc);
};

const sliders = (function(){
  "use strict";

  var module = function () {

    this.init();
  };

  module.prototype = {
    constructor: module,

    //Инициализация модуля
    init: function () {
      this.isDesktop = window.matchMedia('(min-width:1200px)').matches;

      this.$sliders = $(".slider");
      this.$sliderUsecases = $(".slider--usecases");

      this.sliderUsecases = new Swiper(this.$sliderUsecases.find('.slider__holder'), {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: this.$sliderUsecases.find('.slider__arrow--next'),
          prevEl: this.$sliderUsecases.find('.slider__arrow--prev'),
        },
        pagination: {
          el: this.$sliderUsecases.find('.slider__pagi'),
          bulletClass: 'slider__pagi-bullet',
          bulletActiveClass: 'slider__pagi-bullet--active'
        },
      });

      this.$sliderRoadshow = $(".slider--roadshow");
      this.sliderRoadshow = new Swiper(this.$sliderRoadshow.find('.slider__holder'), {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        navigation: {
          nextEl: this.$sliderRoadshow.find('.slider__arrow--next'),
          prevEl: this.$sliderRoadshow.find('.slider__arrow--prev'),
        },
        pagination: {
          el: this.$sliderRoadshow.find('.slider__pagi'),
          bulletClass: 'slider__pagi-bullet',
          bulletActiveClass: 'slider__pagi-bullet--active'
        },
        breakpoints: {
          579: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          1199: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      });

      this.$platrofmSlider = $(".platform__slider");

      if (!this.isDesktop) {
        this.platrofmSlider = new Swiper(this.$platrofmSlider, {
          slidesPerView: 1,
          loop: false,
          centeredSlides: true,
          pagination: {
            el: this.$platrofmSlider.find('.slider__pagi'),
            bulletClass: 'slider__pagi-bullet',
            bulletActiveClass: 'slider__pagi-bullet--active'
          },
        });
      }

      // var that = this;
      // this.$sliders.each(function (i, el) {
      //   that.sliderInit(el);
      // });
    },
    //
    // sliderInit: function (el, options) {
    //   var $el = $(el),
    //       $container = $el.find('.slider__holder');
    //
    //   var slider = new Swiper($container, {
    //     slidesPerView: 3,
    //     spaceBetween: 40,
    //     loop: true,
    //     navigation: {
    //       nextEl: $el.find('.slider__arrow--next'),
    //       prevEl: $el.find('.slider__arrow--prev'),
    //     },
    //     pagination: {
    //       el: $el.find('.slider__pagi'),
    //       bulletClass: 'slider__pagi-bullet',
    //       bulletActiveClass: 'slider__pagi-bullet--active'
    //     },
    //     breakpoints: {
    //       579: {
    //         slidesPerView: 1,
    //         spaceBetween: 10
    //       },
    //       1199: {
    //         slidesPerView: 2,
    //         spaceBetween: 10
    //       }
    //     }
    //   });
    //
    // },


  };


  return module;

})();

const menu = function () {
  const menubar = document.querySelector('.header__top');

  const isVisibleTop = function (elem) {
    return elem.getBoundingClientRect().top < 64;
  };
  const hrefs = [
    "#tokensale",
    "#about",
    "#usecase",
    "#partners",
    "#roadmap",
    "#tokensalechart",
    "#team",
    "#roadshow",
    "#faq",
  ];

  const blocks = [
    document.querySelector("#tokensale"),
    document.querySelector("#about"),
    document.querySelector("#usecase"),
    document.querySelector("#partners"),
    document.querySelector("#roadmap"),
    document.querySelector("#tokensalechart"),
    document.querySelector("#team"),
    document.querySelector("#roadshow"),
    document.querySelector("#faq"),
  ];

  window.addEventListener(`scroll`, function (e) {
    if (window.pageYOffset > 100) {
      menubar.classList.add('header__top--fixed');
    } else {
      menubar.classList.remove('header__top--fixed');
    }
    for (var i = 0; i < hrefs.length; i++) {
      let link = menubar.querySelector(`[href="${hrefs[i]}"]`);
      let block = blocks[i];
      if (link && block) {
        if (isVisibleTop(block)) {
          let curlink = menubar.querySelector(`.active`);
          if(curlink) {
            curlink.classList.remove('active');
          }
          link.classList.add('active');
        }
      }
    }
  });
};

team();
menu();
$('#countdown').countdown('2018/4/30', function(event) {
  $(this).html(event.strftime('%D d : %H h : %M m'));
});
const slidersInit = new sliders();

}());

//# sourceMappingURL=main.js.map
