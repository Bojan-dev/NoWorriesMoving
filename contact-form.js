'use strict';

const form = document.querySelector('.get-in-touch-form');
const errorMess = document.querySelectorAll('.contact-error-message');

const onlyLettersRegExp = /^[a-zA-Z\s]+$/;

const checkName = function (name) {
  const slicedName = name.split(' ').length;
  const trimmedName = name.replace(/\s+/g, '');

  if (
    name.length > 1 &&
    name.length <= 40 &&
    onlyLettersRegExp.test(name) &&
    slicedName > 1 &&
    trimmedName.length >= 4
  ) {
    return true;
  }
  return false;
};

const mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkMail = function (mail) {
  if (mailRegExp.test(mail)) {
    return true;
  }
  return false;
};

const showError = function (errNum, field) {
  errorMess[errNum].style.display = 'block';
  field.style.borderColor = '#ba1c17';
};

form.addEventListener('submit', function (e) {
  const nameField = this.querySelector('input');
  const emailField = this.querySelectorAll('input')[1];
  const textAreaField = this.querySelector('textarea');

  errorMess.forEach((err) => (err.style.display = 'none'));

  if (!checkName(nameField.value)) {
    e.preventDefault();
    showError(0, nameField);
  }

  if (!checkMail(emailField.value)) {
    e.preventDefault();
    showError(1, emailField);
  }

  if (textAreaField.value.length < 10) {
    e.preventDefault();
    showError(2, textAreaField);
  }
});

form.addEventListener('focusin', function (e) {
  document.querySelector(
    `.contact-error-${e.target.dataset.error}`
  ).style.display = 'none';

  e.target.style.borderColor = '#41ba03';
});

form.addEventListener('focusout', function (e) {
  e.target.style.borderColor = '#e9e9e9';
});
