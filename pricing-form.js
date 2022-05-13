import {
  toggleModal,
  sendInfo,
  nameRegex,
  phoneRegex,
  emailRegex,
  numRegExp,
  showError,
  inputOnFocus,
} from './helper-functions.js';

let activeForm = 1;
let milesHrs;
let bedroomHrs;

const firstFormState = {};
const secondFormState = {};

const firstForm = document.querySelector('.first-calculator-form');
const secondForm = document.querySelector('.second-calculator-form');

//First form fields:
const milesFields = document.querySelector('.calculator-miles');
const homeFields = document.querySelector('.house-apartment');
const bedroomFields = document.querySelector('.bedrooms-number');
const allBedrooms = Array.from(bedroomFields.children).filter(
  (bedroom) => bedroom.nodeName === 'DIV'
);

const [zip1] = document.querySelectorAll('.zip-code');
const zipErrorField = document.querySelector('.pricing-error-zip');

//Error fields:
const milesErrorField = document.querySelector('.miles-error-message');
const houseErrorField = document.querySelector('.house-error-message');
const bedroomErrorField = document.querySelector('.bedroom-error-message');

//UI:
const lineThrough = document.querySelector('.line-through');
const secondStepUI = document.querySelector('.calc-steps-2');

//Second form - Calculator:
const hourRate = 159;
// const payAllField = document.getElementById('all-in-once');
// const payInstallmentsField = document.getElementById('via-installments');
// const priceFields = document.querySelector('.once-installments');
const finalPrice = document.getElementById('chosen-final-price');

//Second form fields:
const nameInput = document.getElementById('lockdown-input-name');
const emailInput = document.getElementById('lockdown-input-email');
const phoneInput = document.getElementById('lockdown-input-phone');

//Error fields:
const nameInputError = document.querySelector('.name-error-message');
const emailInputError = document.querySelector('.email-error-message');
const phoneInputError = document.querySelector('.phone-error-message');

//Successful form:
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-window');
const closeModal = document.querySelector('.close-modal');

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
      document.querySelector('.bedroom-number2').textContent = '2 bedrooms';
    } else {
      studio.classList.remove('hidden');
      threeBedrooms.classList.add('hidden');
      document.querySelector('.bedroom-number2').textContent = '2+ bedrooms';
    }

    allBedrooms.forEach((bedroom) => {
      bedroom.style.background = '#41ba03';
    });
  }
};

// const controlPriceFields = function (e) {
//   let btn = e.target;

//   //prettier-ignore
//   if(btn.id === '' && !btn.classList.contains('in-once-btn') && !btn.classList.contains('via-installments-btn')) return;

//   let sibling;

//   if (btn.id !== '') btn = btn.parentElement;

//   //prettier-ignore
//   if (btn.classList.contains('in-once-btn')) sibling = document.querySelector('.via-installments-btn')
//   //prettier-ignore
//   if (btn.classList.contains('via-installments-btn')) sibling = document.querySelector('.in-once-btn');

//   sibling.style.background = '#dddede';
//   btn.style.background = '#41ba03';

//   finalPrice.textContent = btn.querySelector('p').textContent;
// };

zip1.addEventListener('focus', inputOnFocus.bind(zip1, zipErrorField));

//First form fields:
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

//On first form submit:
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
    firstFormState.bedrooms === '2+ bedrooms' ? (bedroomHrs = 3) : '';
  }

  //CALCULATION:
  const allInOncePrice = (milesHrs + bedroomHrs) * hourRate;

  // payAllField.textContent = `$${allInOncePrice}`;
  // payInstallmentsField.textContent = `$${allInOncePrice / 6} X6`;

  finalPrice.textContent = `$${allInOncePrice}`;

  secondFormState.price = `${allInOncePrice}$`;

  //URL CHANGE:
  activeForm = 2;

  history.pushState({ id: activeForm }, '', `${location.href}#form2`);

  //UI CHANGE:
  changeStepUI('forward');
});

//Second form fields:
// priceFields.addEventListener('click', controlPriceFields);

//Inputs on focus:
nameInput.addEventListener(
  'focus',
  inputOnFocus.bind(nameInput, nameInputError)
);
emailInput.addEventListener(
  'focus',
  inputOnFocus.bind(emailInput, emailInputError)
);
phoneInput.addEventListener(
  'focus',
  inputOnFocus.bind(phoneInput, phoneInputError)
);

//Send values to database:

//On second form submit:
secondForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let controlErrors = 0;

  if (!phoneRegex.test(phoneInput.value)) {
    controlErrors++;
    showError(phoneInputError, phoneInput, phoneInput);
  }

  if (!emailRegex.test(emailInput.value)) {
    controlErrors++;
    showError(emailInputError, emailInput, emailInput);
  }

  if (
    !nameRegex.test(nameInput.value) ||
    nameInput.value.replace(/\s/g, '').length < 2
  ) {
    controlErrors++;
    showError(nameInputError, nameInput, nameInput);
  }

  if (controlErrors) return;

  secondFormState.name = nameInput.value.trim();
  secondFormState.phoneNumber = phoneInput.value;
  secondFormState.emailAddress = emailInput.value.toLowerCase();

  sendInfo(
    'https://move-calculations-default-rtdb.firebaseio.com/moves.json',
    { ...secondFormState, info: { ...firstFormState } },
    { modal, overlay },
    {
      text: 'We received your informations, you can expect us to contact you soon',
      header: 'Successfully completed offer lockdown!',
    }
  );
});

[overlay, closeModal].forEach((btn) => {
  btn.addEventListener('click', () => {
    activeForm = 1;
    toggleModal(modal, overlay);
    modal.classList.remove('failed');
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    location.href = location.origin;
  });
});

window.addEventListener('hashchange', function (e) {
  if (activeForm === 1) return;
  activeForm = 1;
  changeStepUI('backward');
  zip1.value = firstFormState.zipCode;
});

window.addEventListener('load', function () {
  zip1.value = '';
  activeForm = 1;
  history.pushState({ id: activeForm }, '', `${location.origin}/pricing.html`);
});
