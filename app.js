'use strict';

/////////
//Creating current areas container - Home page:
/////////

const header = document.querySelector('header');
const lineThroughtAreas = document.querySelector('.current-area-line');

lineThroughtAreas.style.height = lineThroughtAreas.clientHeight + 50 + 'px'; //setting right slider bar height

const sectionsArray = Array.from(document.querySelectorAll('section'));
sectionsArray.push(
  document.querySelector('footer'),
  header,
  document.querySelector('main')
);

const sectionArrayFilter = sectionsArray.filter((section) =>
  section.hasAttribute('sectionName')
);

const areaRightSliderBtns = Array.from(
  document.getElementsByClassName('current-area')
);

areaRightSliderBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clickedArea = sectionArrayFilter.find(
      (section) =>
        section.getAttribute('sectionName') === btn.textContent.trim()
    );
    const oldActiveBtn = areaRightSliderBtns.find((sec) =>
      sec.classList.contains('active-area')
    );
    oldActiveBtn.classList.remove('active-area');
    oldActiveBtn.firstElementChild.classList.remove('active-title');
    btn.classList.add('active-area');
    btn.firstElementChild.classList.add('active-title');
    clickedArea.scrollIntoView();
  });
});

//FIXED NAVBAR:

const navigationBar = document.querySelector('.header-container');

document.addEventListener('scroll', () => {
  if (window.pageYOffset > navigationBar.clientHeight) {
    navigationBar.classList.add('header-fixed');
  } else {
    navigationBar.classList.remove('header-fixed');
  }
});
