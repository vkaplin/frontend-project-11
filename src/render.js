import { lazy } from "yup";

const renderInputError = (input, valid) => {
  if (valid) {
    input.classList.remove('is-invalid');
  }
  if (!valid) {
    input.classList.add('is-invalid');
  }
};

const renderFeedback = (feedback, type, text) => {
  switch (type) {
    case 'error':
      feedback.classList.add('text-danger');
      break;
    case 'success':
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      break;
    default:
      break;
  }
  feedback.textContent = text;
};

const renderForm = (elements, i18nI, value) => {
  const { btn, header, subHeader, input, exemple, inputLabel} = elements;
  i18nI.changeLanguage(value, () =>{
    btn.textContent = i18nI.t('form.button');
    header.textContent = i18nI.t('form.header');
    subHeader.textContent = i18nI.t('form.subHeader');
    input.setAttribute('placeholder', i18nI.t('form.inputPlaceholder'));
    inputLabel.textContent = i18nI.t('form.inputLabel');
    exemple.textContent = i18nI.t('form.exemple')
  });  
};

const render = (elements, i18nextInstance) => (path, value, prevValue) => {
  console.log(path, value, prevValue);
  switch (path) {
    case 'lng':
      renderForm(elements, i18nextInstance, value);
      break;
    case 'form.valid':
      renderInputError(elements.input, value);
      break;
    case 'form.error':
      renderFeedback(elements.feedback, 'error', i18nextInstance.t(value));
      break;
    default:
      break;
  }
};

export default render;
