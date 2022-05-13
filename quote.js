import {
  nameRegex,
  emailRegex,
  numRegExp,
  phoneRegex,
  sendInfo,
  toggleModal,
} from './helper-functions.js';

//Elements from the left side of the form:
const dateInput = document.getElementById('move_date');
const sizeInput = document.getElementById('move_size');
const fromZipInput = document.getElementById('from_zip');
const toZipInput = document.getElementById('to_zip');

//Elements from the right side of the form:
const nameInput = document.getElementById('full_name');
const phoneInput = document.getElementById('phone_number');
const emailInput = document.getElementById('email_address');

const inputsArray = [
  dateInput,
  sizeInput,
  fromZipInput,
  toZipInput,
  nameInput,
  phoneInput,
  emailInput,
];

const errorHandlingContainer = document.querySelector('.error-handling');

const errorHandlingEl = errorHandlingContainer.querySelector('ul');

const form = document.querySelector('form');

const modal = document.querySelector('.modal-window');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const controlZipErrors = {
  fromZip: false,
  toZip: false,
};

const handleInputChange = (el) => {
  if (document.getElementById(`${el.id}_validity`)) {
    const errorEl = document.getElementById(`${el.id}_validity`);
    errorEl.remove();
    el.style.borderColor = '#dfdfdf';

    const errorsList = errorHandlingEl.querySelectorAll('li');

    if (errorsList.length === 0) {
      errorHandlingContainer.classList.add('error-hidden');
    }
  }
};

//CONTROL INPUTS ERRORS:
const controlErrorField = (message, id, inputField) => {
  inputField.style.borderColor = '#ba1c17';
  if (document.getElementById(id)) {
    return;
  }

  const listError = document.createElement('li');

  listError.setAttribute('id', id);
  listError.textContent = message;
  errorHandlingEl.append(listError);
};

/*
const datee = new Date();

datee.setFullYear(new Date().getFullYear() + 1);

console.log(datee);

*/

//DATE VALIDITY:
const checkDateInputValidity = (value) => {
  const selectedDate = new Date(value);

  const selectedDateTimestamp = selectedDate.getTime();

  const currentDateTimestamp = new Date().getTime();

  if (
    selectedDateTimestamp < currentDateTimestamp ||
    !isFinite(selectedDateTimestamp)
  ) {
    return true;
  }
  return false;
};

//ON INPUTS CHANGE LISTENERS:
dateInput.addEventListener('change', (e) => {
  if (!checkDateInputValidity(e.target.value)) {
    handleInputChange(e.target);
  }
});

sizeInput.addEventListener('change', (e) => {
  if (e.target.selectedIndex !== 0) {
    handleInputChange(e.target);
  }
});

[fromZipInput, toZipInput].forEach((btn) => {
  btn.addEventListener('input', (e) => {
    if (document.getElementById('zip_validity')) {
      if (
        numRegExp.test(e.target.value) &&
        String(e.target.value).length === 5
      ) {
        e.target.style.borderColor = '#dfdfdf';
        if (e.target.dataset.zip === 'from') controlZipErrors.fromZip = false;
        if (e.target.dataset.zip === 'to') controlZipErrors.toZip = false;

        !controlZipErrors.fromZip &&
          !controlZipErrors.toZip &&
          document.getElementById('zip_validity').remove();
      }
    }
  });
});

nameInput.addEventListener('input', (e) => {
  if (
    nameRegex.test(e.target.value) &&
    e.target.value.replace(/\s/g, '').length >= 2
  ) {
    handleInputChange(e.target);
  }
});

phoneInput.addEventListener('input', (e) => {
  if (phoneRegex.test(phoneInput.value)) {
    handleInputChange(e.target);
  }
});

emailInput.addEventListener('input', (e) => {
  if (emailRegex.test(e.target.value)) {
    handleInputChange(e.target);
  }
});

//ON FORM SUBMIT:
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const visitorsFrom = e.target.getAttribute('from');

  let controlErrors = 0;

  if (checkDateInputValidity(dateInput.value)) {
    controlErrors++;
    controlErrorField(
      '-Enter a valid date',
      `${dateInput.id}_validity`,
      dateInput
    );
  }

  if (sizeInput.selectedIndex === 0) {
    controlErrors++;
    controlErrorField(
      '-Select the move size',
      `${sizeInput.id}_validity`,
      sizeInput
    );
  }

  if (
    !numRegExp.test(fromZipInput.value) ||
    String(fromZipInput.value).length !== 5
  ) {
    controlErrors++;
    controlZipErrors.fromZip = true;
    controlErrorField(
      '-ZIP code should be exactly 5 digits long',
      `zip_validity`,
      fromZipInput
    );
  }

  if (
    !numRegExp.test(toZipInput.value) ||
    String(toZipInput.value).length !== 5
  ) {
    controlZipErrors.toZip = true;
    controlErrorField(
      '-ZIP code should be exactly 5 digits long',
      `zip_validity`,
      toZipInput
    );
  }

  if (
    !nameRegex.test(nameInput.value) ||
    nameInput.value.replace(/\s/g, '').length < 2
  ) {
    controlErrors++;
    controlErrorField(
      '-Name should be at least 2 characters long',
      `${nameInput.id}_validity`,
      nameInput
    );
  }

  if (!phoneRegex.test(phoneInput.value)) {
    controlErrors++;
    controlErrorField(
      '-Provide a proper phone number',
      `${phoneInput.id}_validity`,
      phoneInput
    );
  }

  if (!emailRegex.test(emailInput.value)) {
    controlErrors++;
    controlErrorField(
      '-Provide a proper email address',
      `${emailInput.id}_validity`,
      emailInput
    );
  }

  if (controlErrors) {
    errorHandlingContainer.classList.remove('error-hidden');
    return;
  }

  const quoteInfo = {
    date: dateInput.value,
    size: sizeInput.value,
    fromZip: fromZipInput.value,
    toZipInput: toZipInput.value,
    fullName: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    quoteSource: visitorsFrom,
  };

  sendInfo(
    'https://noworriesmoving-f406d-default-rtdb.firebaseio.com/quotes.json',
    quoteInfo,
    { modal, overlay },
    {
      text: 'We will get back to you. Have a great day!',
      header: 'Thank you!',
    }
  );
});

[overlay, closeModal].forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleModal(modal, overlay);
    modal.classList.remove('failed');
    location.href = `${location.origin}${`/about-us.html`}`;
  });
});
