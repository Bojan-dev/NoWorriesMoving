//NAVIGATION HAMBAR:

const navigationBar = document.querySelector('.header-container').classList;

document.addEventListener('scroll', () => {
  //Navigation bar changed on certain Y height:

  if (window.pageYOffset > 15) {
    navigationBar.add('header-container-fixed');
    lineThroughtAreas.classList.add('current-area-line-y');
  } else {
    navigationBar.remove('header-container-fixed');
    lineThroughtAreas.classList.remove('current-area-line-y');
  }
});

const hamBar = document.querySelector('.nav-bar-ham');
const fullPageMenu = document.querySelector('.on-hambar-click');
const setProperties = function (opacity, width, height) {
  fullPageMenu.style.opacity = opacity;
  fullPageMenu.style.width = width + 'vw';
  fullPageMenu.style.height = height + 'vh';
};

let hamBarCounter = 0;
hamBar.addEventListener('click', () => {
  if (hamBarCounter % 2 === 0) {
    setProperties(1, 100, 100);
    document.documentElement.style.overflowY = 'hidden';
    hamBar.classList.add('nav-bar-clicked');
  }
  if (hamBarCounter % 2 != 0) {
    setProperties(0, 0, 0);
    document.documentElement.style.overflowY = 'initial';
    hamBar.classList.remove('nav-bar-clicked');
  }
  hamBarCounter++;
});

window.addEventListener('resize', () => {
  if (window.outerWidth > 1583) {
    setProperties(0, 0, 0);
    hamBar.classList.remove('nav-bar-clicked');
    document.documentElement.style.overflow = 'initial';
  }
});
