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
    e.preventDefault();
    const clickedArea = sectionArrayFilter.find(
      (section) =>
        section.getAttribute('sectionName') === btn.textContent.trim()
    );

    //clickedArea.scrollIntoView();
    const yScroll =
      clickedArea.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yScroll });
  });
});

//FIXED NAVBAR:

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

  //CURRENT AREA CHANGING ON SCROLL:
  const currentArea = sectionArrayFilter.find(
    (section) =>
      section.offsetTop < window.pageYOffset + 150 &&
      section.offsetTop + section.clientHeight > window.pageYOffset + 150
  );
  const currentBtn = areaRightSliderBtns.find(
    (btn) => btn.textContent.trim() === currentArea.getAttribute('sectionName')
  );
  areaRightSliderBtns.forEach((btn) => {
    if (btn != currentBtn) {
      btn.classList.remove('active-area');
      btn.firstElementChild.classList.remove('active-title');
    }
  });
  currentBtn.classList.add('active-area');
  currentBtn.firstElementChild.classList.add('active-title');
});
