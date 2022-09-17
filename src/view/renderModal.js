const renderModal = (modal, modalBtnRead, post) => {
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  modalBtnRead.setAttribute('href', post.link);
  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
};

export default renderModal;
