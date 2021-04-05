'use strict';

/////////
//Creating current areas container - Home page:
/////////

const header = document.querySelector('header');
const lineThroughtAreas = document.querySelector('.current-area-line');

if (lineThroughtAreas)
  lineThroughtAreas.style.height =
    Number.parseFloat(getComputedStyle(lineThroughtAreas).height, 10) +
    50 +
    'px'; //setting right slider bar height

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
      clickedArea.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: yScroll });
  });
});

//CURRENT AREA CHANGING ON SCROLL:

document.addEventListener('scroll', () => {
  const currentArea = sectionArrayFilter.find(
    (section) =>
      section.offsetTop < window.pageYOffset + 250 &&
      section.offsetTop + section.clientHeight > window.pageYOffset + 250
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

//WHY US? Slider:

const rightArrows = Array.from(document.querySelectorAll('.slider-right'));
const leftArrows = Array.from(document.querySelectorAll('.slider-left'));
const whyUsArea = document.querySelector('.why-use-containers-slider');

const whyUsSlider = function (arrow, val1, val2) {
  arrow.forEach((arr) => {
    arr.addEventListener('click', () => {
      if (clickFollow === val1) return;
      clickFollow += val2;
      whyUsArea.style.left = clickFollow + '%';
    });
  });
};

let clickFollow = 0;

whyUsSlider(rightArrows, -200, -100);
whyUsSlider(leftArrows, 0, 100);

//Slide on ellipses clicks:

const allEllipsesContainers = [
  ...document.getElementsByClassName('three-ellipses-slider'),
];

const ellipseClick = function (followVal) {
  clickFollow = followVal;
  whyUsArea.style.left = clickFollow + '%';
};

const checkSize = function () {
  allEllipsesContainers.forEach((cont) => {
    if (window.outerWidth > 1108) {
      cont.children[0].addEventListener('click', () => ellipseClick(0));
      cont.children[1].addEventListener('click', () => ellipseClick(-100));
      cont.children[2].addEventListener('click', () => ellipseClick(-200));
    } else if (window.outerWidth < 1108) {
      cont.children[0].addEventListener('click', () => ellipseClick(0));
      cont.children[1].addEventListener('click', () => ellipseClick(-133.5));
      cont.children[2].addEventListener('click', () => ellipseClick(-267));
    }
  });
};
checkSize();

window.addEventListener('resize', () => {
  whyUsArea.style.left = 0;
  clickFollow = 0;
  checkSize();
});

//Smaller screens slider:

const smallerSliderBtns = Array.from(
  document.querySelector('.smaller-screens-slider').children[0].children
);

smallerSliderBtns[1].addEventListener('click', () => {
  if (clickFollow === -266) return;
  clickFollow += -133;
  whyUsArea.style.left = clickFollow + '%';
});

smallerSliderBtns[0].addEventListener('click', () => {
  if (clickFollow === 0) return;
  clickFollow += 133;
  whyUsArea.style.left = clickFollow + '%';
});
