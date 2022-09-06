import { createDivCard } from "./renderUtils.js";

const renderPosts = (postsContainer, i18inI, items) => {
  postsContainer.innerHTML = '';
  const divCard = createDivCard(i18inI.t('posts.title'));
  const ul = window.document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  items.forEach((el) => {
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
export default renderPosts;
