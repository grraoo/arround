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
      const currentItem = e.target.parentNode.parentNode;
      currentItem.classList.add(`team__item--active`);
      currentItem.querySelector(`.team__close`).addEventListener(`click`, closeTeam);
    }
  };
  document.addEventListener('click', openTeam);
  document.addEventListener('keydown', closeTeamByEsc);
};

team();

}());

//# sourceMappingURL=main.js.map
