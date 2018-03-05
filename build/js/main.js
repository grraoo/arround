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

team();

const slidersInit = new sliders();

}());

//# sourceMappingURL=main.js.map
