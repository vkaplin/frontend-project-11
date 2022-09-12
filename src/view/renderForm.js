const renderForm = (elements, i18nI, value) => {
  const {
    btn,
    header,
    subHeader,
    input,
    exemple,
    inputLabel,
    modalBtnClose,
    modalBtnRead,
  } = elements;
  i18nI.changeLanguage(value, () => {
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

export default renderForm;
