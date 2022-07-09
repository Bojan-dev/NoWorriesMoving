'use strict';

/////////
//Sections line change on scroll:
/////////

const heroLayout = document.querySelector('.hero-layout-container');

const lineThroughtAreas = document.querySelector('.current-area-line');

const changeLine = ([entry]) => {
  if (!entry.isIntersecting) {
    lineThroughtAreas.classList.add('current-area-line-y');
  }

  if (entry.isIntersecting) {
    lineThroughtAreas.classList.remove('current-area-line-y');
  }
};

const lineObserveConfig = {
  root: null,
  threshold: 0.85,
};

const lineObserver = new IntersectionObserver(changeLine, lineObserveConfig);

lineObserver.observe(heroLayout);

///
//Line height:
///
lineThroughtAreas.style.height = lineThroughtAreas.clientHeight + 50 + 'px';

///
//Intersection Observer for sections
///

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

//ON SIDE BTN CLICK:

lineThroughtAreas.addEventListener('click', (e) => {
  //Remove and add classes:
  if (e.target.classList.contains('current-area')) {
    //clickedArea scroll into view:
    const clickedArea = sectionArrayFilter.find(
      (sec) => sec.getAttribute('sectionName') === e.target.textContent.trim()
    );
    window.scrollTo({
      top: clickedArea.getBoundingClientRect().top + window.pageYOffset - 75,
    });
  }
});

//CURRENT AREA CHANGING ON SCROLL:

const checkCurrentArea = sectionArrayFilter.slice(4, 7);
checkCurrentArea.pop();

checkCurrentArea.unshift(...document.querySelectorAll('.slider-indicator'));

const btnClasses = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  areaRightSliderBtns.forEach(function (btn) {
    btn.classList.remove('active-area');
    btn.firstElementChild.classList.remove('active-title');
  });
  const currentArea = areaRightSliderBtns.find(
    (btn) => btn.textContent.trim() === entry.target.getAttribute('sectionname')
  );
  currentArea.classList.add('active-area');
  currentArea.firstElementChild.classList.add('active-title');
};

const sideBarChange = new IntersectionObserver(btnClasses, {
  root: null,
  threshold: 0.9,
});

checkCurrentArea.forEach(function (section) {
  sideBarChange.observe(section);
});

//WHY US? Slider:

const rightArrows = Array.from(document.querySelectorAll('.slider-right'));
const leftArrows = Array.from(document.querySelectorAll('.slider-left'));
const whyUsArea = document.querySelector('.why-use-containers-slider');
let clickFollow = 0;

const whyUsSlider = function (arrow, val1, val2) {
  arrow.forEach((arr) => {
    arr.addEventListener('click', () => {
      if (clickFollow === val1) return;
      clickFollow += val2;
      whyUsArea.style.left = clickFollow + '%';
    });
  });
};

const moveMeasure = window.innerWidth < 1920 ? 111 : 125;

whyUsSlider(rightArrows, -(moveMeasure * 2), -moveMeasure);
whyUsSlider(leftArrows, 0, moveMeasure);

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
    if (window.innerWidth >= 1920) {
      cont.children[0].addEventListener('click', () => ellipseClick(0));
      cont.children[1].addEventListener('click', () => ellipseClick(-125));
      cont.children[2].addEventListener('click', () => ellipseClick(-250));
      return;
    }
    cont.children[0].addEventListener('click', () => ellipseClick(0));
    cont.children[1].addEventListener('click', () => ellipseClick(-111));
    cont.children[2].addEventListener('click', () => ellipseClick(-222));
  });
};
checkSize();

//992 -1336

//Smaller screens slider:

const smallerSliderBtns = Array.from(
  document.querySelector('.smaller-screens-slider').children[0].children
);

smallerSliderBtns[1].addEventListener('click', (e) => {
  if (clickFollow === -222) return;
  clickFollow += -111;
  whyUsArea.style.left = clickFollow + '%';
});

smallerSliderBtns[0].addEventListener('click', () => {
  if (clickFollow === 0) return;
  clickFollow += 111;
  whyUsArea.style.left = clickFollow + '%';
});

///
//Testemonials for small screens:
///

const testemonialPics = document.querySelector('.testemonials-pics');
const allTestemonials = Array.from(
  document.querySelectorAll('.testemonial-wrapper-pic')
);

if (window.innerWidth <= 992) {
  testemonialPics.addEventListener('click', function (e) {
    if (e.target.classList.contains('testemonial-customer-pic')) {
      allTestemonials.forEach((test) => (test.style.display = 'none'));
      Array.from(testemonialPics.children).forEach((pic) =>
        pic.classList.add('testemonial-customer-pic-unactive')
      );
      e.target.classList.remove('testemonial-customer-pic-unactive');
      document.querySelector(
        `.testemonial-wrapper-pic${e.target.dataset.pic}`
      ).style.display = 'initial';
    }
    return;
  });
}
