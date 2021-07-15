const firstFormSubmit = document.querySelector('.first-calculator-form');
const secondFormSubmit = document.querySelectorAll('.lockdown-offer')[1];
const [zip1, zip2] = document.querySelectorAll('.zip-code');
const zipErrors = document.querySelectorAll('.pricing-error-zip');
const numRegExp = /^\d+$/;

const showError = function (errNum, field) {
  zipErrors[errNum].style.display = 'block';
  field.style.borderColor = '#ba1c17';
};

const checkZip = function (zipCode) {
  if (numRegExp.test(zipCode) && String(zipCode).length === 5) {
    return true;
  }
  return false;
};

firstFormSubmit.addEventListener('submit', function (e) {
  if (!checkZip(zip1.value)) {
    e.preventDefault();
    showError(0, zip1);
  }

  if (!checkZip(zip2.value)) {
    e.preventDefault();
    showError(1, zip2);
  }
});

firstFormSubmit.addEventListener('focusin', function (e) {
  if (e.target.classList.contains('zip-code')) {
    e.target.style.borderColor = '#a4da89';
    zipErrors[e.target.dataset.error].style.display = 'none';
  }
});

firstFormSubmit.addEventListener('focusout', function (e) {
  if (e.target.classList.contains('zip-code')) {
    e.target.style.borderColor = '#a4da89';
  }
});
