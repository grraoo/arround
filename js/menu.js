const menu = function () {
  const menubar = document.querySelector('.header__top').cloneNode(true);

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
  ]

  window.addEventListener(`scroll`, function (e) {
    if (window.pageYOffset > 100) {
      menubar.classList.add('header__top--fixed');
      document.body.appendChild(menubar);
    } else {
      menubar.remove();
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
}

export default menu
