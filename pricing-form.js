let activeForm = 1;
let milesHrs;
let bedroomHrs;

const firstFormState = {};
const secondFormState = {};

const firstForm = document.querySelector('.first-calculator-form');
const secondForm = document.querySelector('.second-calculator-form');

const milesFields = document.querySelector('.calculator-miles');
const homeFields = document.querySelector('.house-apartment');
const bedroomFields = document.querySelector('.bedrooms-number');
const allBedrooms = Array.from(bedroomFields.children).filter(
  (bedroom) => bedroom.nodeName === 'DIV'
);

const [zip1] = document.querySelectorAll('.zip-code');
const zipErrorField = document.querySelector('.pricing-error-zip');
const numRegExp = /^\d+$/;

//Error fields:
const milesErrorField = document.querySelector('.miles-error-message');
const houseErrorField = document.querySelector('.house-error-message');
const bedroomErrorField = document.querySelector('.bedroom-error-message');

//UI:
const lineThrough = document.querySelector('.line-through');
const firstStepUI = document.querySelector('.calc-steps-1');
const secondStepUI = document.querySelector('.calc-steps-2');

//Calculator:
const hourRate = 159;
const payAllField = document.getElementById('all-in-once');
const payInstallmentsField = document.getElementById('via-installments');

const controlFormFields = function (type, e) {
  let btn = e.target;

  if (type === 'miles' && !btn.classList.contains('miles-field')) return;

  if (type === 'home' && !btn.classList.contains('living-object')) return;

  if (type === 'home' && btn.nodeName === 'I') btn = btn.parentElement;

  if (type === 'bedroom' && !btn.classList.contains('bedroom-number')) return;

  const allSiblings = Array.from(btn.parentElement.querySelectorAll('div'));
  let siblings;

  if (type === 'miles') {
    siblings = allSiblings.filter(
      (sibling) => sibling.classList !== btn.classList
    );
    firstFormState.miles = btn.textContent.trim();
    milesErrorField.classList.add('hidden');
  }

  if (type === 'home') {
    siblings = allSiblings.filter(
      (sibling) => sibling.classList !== btn.classList
    );
    firstFormState.livingObject = btn.textContent.trim();
    houseErrorField.classList.add('hidden');
  }

  if (type === 'bedroom') {
    siblings = allSiblings.filter((sibling) =>
      sibling.classList.contains('bedroom-number')
    );
    firstFormState.bedrooms = btn.textContent.trim();
    bedroomErrorField.classList.add('hidden');
  }
  siblings.forEach((sibling) => {
    sibling.style.background = '#dddede';
  });
  btn.style.background = '#41ba03';

  if (type === 'home') {
    bedroomFields.style.display = 'flex';

    const [studio] = allBedrooms.filter((bedroom) =>
      bedroom.classList.contains('studio-apartment')
    );
    const [threeBedrooms] = allBedrooms.filter((bedroom) =>
      bedroom.classList.contains('house-3bedrooms')
    );

    if (btn.classList.contains('house')) {
      threeBedrooms.classList.remove('hidden');
      studio.classList.add('hidden');
    } else {
      studio.classList.remove('hidden');
      threeBedrooms.classList.add('hidden');
    }

    allBedrooms.forEach((bedroom) => {
      bedroom.style.background = '#41ba03';
    });
  }
};

zip1.addEventListener('focus', function () {
  zipErrorField.classList.add('hidden');
  this.style.borderColor = '#a4da89';
});

milesFields.addEventListener('click', controlFormFields.bind(this, 'miles'));

homeFields.addEventListener('click', controlFormFields.bind(this, 'home'));

// prettier-ignore
bedroomFields.addEventListener('click',controlFormFields.bind(this, 'bedroom'));

const changeStepUI = function (direction) {
  if (direction === 'forward') {
    firstForm.style.display = 'none';
    secondForm.style.display = 'flex';
    lineThrough.style.background = '#41ba03';
    secondStepUI.style.background = '#41ba03';
    secondStepUI.querySelector('div').style.color = '#41ba03';
    firstForm.querySelector('input').value = '';
  } else {
    firstForm.style.display = 'flex';
    secondForm.style.display = 'none';
    lineThrough.style.background =
      'linear-gradient(to right, #41ba03 50%, #dddede 50%)';
    secondStepUI.style.background = '#dddede';
    secondStepUI.querySelector('div').style.color = '#dddede';
  }
};

const showError = function (erorrField, scrollToField, field = false) {
  erorrField.classList.remove('hidden');
  field ? (field.style.borderColor = '#ba1c17') : '';
  scrollToField.scrollIntoView({ behavior: 'smooth' });
};

firstForm.addEventListener('submit', function (e) {
  e.preventDefault();

  //HANDLING ERRORS:
  let controlErrors = 0;

  if (!firstFormState.bedrooms) {
    controlErrors++;
    firstFormState.livingObject && showError(bedroomErrorField, bedroomFields);
  }

  if (!firstFormState.livingObject) {
    controlErrors++;
    showError(houseErrorField, homeFields);
  }

  if (!firstFormState.miles) {
    controlErrors++;
    showError(milesErrorField, milesFields);
  }

  if (!numRegExp.test(zip1.value) || String(zip1.value).length !== 5) {
    controlErrors++;
    showError(zipErrorField, zip1, zip1);
  }

  firstFormState.zipCode = Number(zip1.value);

  if (controlErrors) return;

  //HOURS CALCULATION:
  firstFormState.miles.toLowerCase() === '<50 miles' ? (milesHrs = 1) : '';
  firstFormState.miles.toLowerCase() === '51-149 miles' ? (milesHrs = 2) : '';
  firstFormState.miles.toLowerCase() === '>150+ miles' ? (milesHrs = 3) : '';

  if (firstFormState.livingObject === 'house') {
    firstFormState.bedrooms === '1 bedroom' ? (bedroomHrs = 2) : '';
    firstFormState.bedrooms === '2 bedrooms' ? (bedroomHrs = 2.5) : '';
    firstFormState.bedrooms === '3+ bedrooms' ? (bedroomHrs = 3) : '';
  }

  if (firstFormState.livingObject === 'apartment') {
    firstFormState.bedrooms.toLowerCase() === 'studio' ? (bedroomHrs = 2) : '';
    firstFormState.bedrooms === '1 bedroom' ? (bedroomHrs = 2.5) : '';
    firstFormState.bedrooms === '2 bedrooms' ? (bedroomHrs = 3) : '';
  }

  //CALCULATION:
  const allInOncePrice = (milesHrs + bedroomHrs) * hourRate;

  payAllField.textContent = `$${allInOncePrice}`;
  payInstallmentsField.textContent = `$${allInOncePrice / 6} X6`;

  //URL CHANGE:
  activeForm++;

  history.pushState(
    { id: activeForm },
    '',
    `http://127.0.0.1:5501/scss/6-pages/pricing.html#form2`
  );

  //UI CHANGE:
  changeStepUI('forward');
});

window.addEventListener('hashchange', function () {
  activeForm--;
  changeStepUI('backward');
  zip1.value = firstFormState.zipCode;
});

window.addEventListener('load', function () {
  activeForm = 1;
  history.pushState(
    { id: activeForm },
    '',
    'http://127.0.0.1:5501/scss/6-pages/pricing.html'
  );
});
