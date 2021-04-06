//NAVIGATION HAMBAR:

const navigationBar = document.querySelector('.header-container').classList;

const header = document.querySelector('header');
const goUpBtn = document.querySelector('.go-up-btn');

goUpBtn.style.display = 'none';

document.addEventListener('scroll', () => {
  //Navigation bar changed on certain Y height:

  if (window.pageYOffset > 15) {
    navigationBar.add('header-container-fixed');
  } else {
    navigationBar.remove('header-container-fixed');
  }

  if (window.pageYOffset > header.clientHeight && window.innerWidth < 1367) {
    goUpBtn.style.display = 'flex';
  } else {
    goUpBtn.style.display = 'none';
  }
});

goUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  scrollTo({ top: 0 });
});

const hamBar = document.querySelector('.nav-bar-ham');
const fullPageMenu = document.querySelector('.on-hambar-click');
const setProperties = function (opacity, width, height, pointEvents) {
  fullPageMenu.style.opacity = opacity;
  fullPageMenu.style.width = width + 'vw';
  fullPageMenu.style.height = height + 'vh';
  fullPageMenu.style.pointerEvents = pointEvents;
};

let hamBarCounter = 0;
hamBar.addEventListener('click', () => {
  if (hamBarCounter % 2 === 0) {
    setProperties(1, 100, 100, 'all');
    document.documentElement.style.overflowY = 'hidden';
    hamBar.classList.add('nav-bar-clicked');
  }
  if (hamBarCounter % 2 != 0) {
    setProperties(0, 0, 0, 'none');
    document.documentElement.style.overflowY = 'initial';
    hamBar.classList.remove('nav-bar-clicked');
  }
  hamBarCounter++;
});

window.addEventListener('resize', () => {
  if (window.outerWidth > 1583) {
    setProperties(0, 0, 0, 'all');
    hamBar.classList.remove('nav-bar-clicked');
    document.documentElement.style.overflow = 'initial';
  }
});
