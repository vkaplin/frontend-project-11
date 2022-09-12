import createDivCard from './createDivCard.js';

const renderFeeds = (feedsContainer, title, items) => {
  feedsContainer.innerHTML = '';
  const divCard = createDivCard(title);
  const ul = window.document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  items.forEach((el) => {
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
export default renderFeeds;
