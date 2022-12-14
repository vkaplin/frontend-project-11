const createDivCard = (title) => {
  const divCard = document.createElement('DIV');
  divCard.classList.add('card', 'border-0');

  const divCardBody = document.createElement('DIV');
  divCardBody.classList.add('card-body');

  const h2Title = document.createElement('H2');
  h2Title.classList.add('card-title', 'h4');
  h2Title.textContent = title;
  divCardBody.append(h2Title);
  divCard.append(divCardBody);
  return divCard;
};

export default createDivCard;
