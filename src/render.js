import { Toast, Popover } from 'bootstrap';

const renderFeeds = (feedsContainer, title, items) => {
  feedsContainer.innerHTML = "";
  const divCard = createDivCard(title);
  const ul = window.document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  items.map((el) => {
    const li = window.document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = window.document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = el.title;
    const p = window.document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = el.description;
    li.append(h3, p);
    ul.append(li);
  });

  divCard.append(ul);
  feedsContainer.append(divCard);
};

const createDivCard = (title) => {
  const divCard = window.document.createElement('DIV');
  divCard.classList.add('card', 'border-0');

  const divCardBody = window.document.createElement('DIV');
  divCardBody.classList.add('card-body');

  const h2Title = window.document.createElement('H2');
  h2Title.classList.add('card-title', 'h4');  
  h2Title.textContent = title;
  divCardBody.append(h2Title);
  divCard.append(divCardBody);
  return divCard;
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
const renderPosts = (postsContainer, i18inI, items) => {
  postsContainer.innerHTML = "";
  const divCard = createDivCard(i18inI.t('posts.title'));
  const ul = window.document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  items.map((el) => {
    const li = window.document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = window.document.createElement('a');
    a.setAttribute('href', el.link);
    a.classList.add(el.read === true ? 'fw-normal' : 'fw-bold');
    a.setAttribute('target', '_blank');
    a.textContent = el.title;

    const btn = window.document.createElement('button');
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btn.dataset.bsToggle = 'modal';
    btn.dataset.bsTarget = '#rssPostModal';
    btn.textContent = i18inI.t('posts.btnShow');
    btn.dataset.id = el.id;

    li.append(a, btn);
    ul.append(li);
  })
  
  divCard.append(ul);
  postsContainer.append(divCard);
};

const renderForm = (elements, i18nI, value) => {
  const { btn, header, subHeader, input, exemple, inputLabel, modalBtnClose, modalBtnRead } = elements;
  i18nI.changeLanguage(value, () =>{
    btn.textContent = i18nI.t('form.button');
    header.textContent = i18nI.t('form.header');
    subHeader.textContent = i18nI.t('form.subHeader');
    input.setAttribute('placeholder', i18nI.t('form.inputPlaceHolder'));
    inputLabel.textContent = i18nI.t('form.inputLabel');
    exemple.textContent = i18nI.t('form.exemple');
    modalBtnClose.textContent = i18nI.t('posts.modal.btnClose');
    modalBtnRead.textContent = i18nI.t('posts.modal.btnRead');
  });  
};

const render = (elements, i18nextInstance) => (path, value, prevValue) => {
  console.log(path, value, prevValue);
  const { feedback, input, btn, feeds, posts } = elements;  
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
    case 'posts':
      renderPosts(posts, i18nextInstance, value);
    default:
      break;
  }
};

export default render;
