export const nameRegex = /^[a-zA-Z\s]*$/;
export const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
// prettier-ignore
export const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const numRegExp = /^\d+$/;

export const showError = function (erorrField, scrollToField, field = false) {
  erorrField.classList.remove('hidden');
  field ? (field.style.borderColor = '#ba1c17') : '';
  scrollToField.scrollIntoView({ behavior: 'smooth' });
};

export const inputOnFocus = function (errorField) {
  errorField.classList.add('hidden');
  this.style.borderColor = '#a4da89';
};

export const controlModal = function (modalEl, overlayEl, type, message) {
  if (type === 'successful') {
    modalEl.classList.remove('failed');
    modalEl.querySelector('p').textContent = message.paragraph;
    modalEl.querySelector('h4').textContent = message.header;
  } else {
    modalEl.classList.add('failed');
    modalEl.querySelector('p').textContent = message.paragraph;
    modalEl.querySelector('h4').textContent = message.error;
  }
  overlayEl.classList.toggle('hidden');
  modalEl.classList.toggle('hidden');
};

export const toggleModal = function (modalEl, overlayEl) {
  modalEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
};

export const sendInfo = async function (URL, customerData, modalEls, message) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(customerData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Something went wrong! Try again later.');
    }

    controlModal(modalEls.modal, modalEls.overlay, 'successful', {
      paragraph: message.text,
      header: message.header,
    });
  } catch (error) {
    controlModal(modalEls.modal, modalEls.overlay, 'failed', error.message);
  }
};
