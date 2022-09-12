import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderForm from './renderForm.js';

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
    feedback, input, btn, feeds, posts,
  } = elements;
  switch (path) {
    case 'lng':
      renderForm(elements, i18nextInstance, value);
      break;
    case 'form.valid':
      value === true ? input.classList.remove('is-invalid') : input.classList.add('is-invalid');
      break;
    case 'form.feedback':
      renderFeedback(feedback, value.type, i18nextInstance.t(value.text));
      break;
    case 'form.processState':
      btn.disabled = value === 'fetch' ? true : false;
      value === 'idle' ? input.value = '' : null;
      break;
    case 'feeds':
      renderFeeds(feeds, i18nextInstance.t('feeds.title'), value);
      break;
    case 'posts':
      renderPosts(posts, i18nextInstance, value);
      break;
    default:
      break;
  }
};

export default render;
