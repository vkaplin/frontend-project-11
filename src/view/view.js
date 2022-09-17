import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderForm from './renderForm.js';
import renderModal from './renderModal.js';

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

const render = (elements, i18nextInstance) => (path, value) => {
  const {
    feedback, input, btn, feeds, posts, modal, modalBtnRead,
  } = elements;
  switch (path) {
    case 'lng':
      renderForm(elements, i18nextInstance, value);
      break;
    case 'form.valid':
      if (value === true) {
        input.classList.remove('is-invalid');
      }
      if (value !== true) {
        input.classList.add('is-invalid');
      }
      break;
    case 'form.feedback':
      renderFeedback(feedback, value.type, i18nextInstance.t(value.text));
      break;
    case 'form.processState':
      btn.disabled = value === 'fetch';
      if (value === 'idle') {
        input.value = '';
      }
      break;
    case 'feeds':
      renderFeeds(feeds, i18nextInstance.t('feeds.title'), value);
      break;
    case 'posts':
      renderPosts(posts, i18nextInstance, value);
      break;
    case 'modal':
      renderModal(modal, modalBtnRead, value);
    default:
      break;
  }
};

export default render;
