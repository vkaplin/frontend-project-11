import onChange from 'on-change';
import i18next from 'i18next';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ru from './locales/ru.js';
import view from './view/view.js';
import parseHTML from './parser.js';
import validate from './utils/validate.js';

const getproxyUrl = (rssUrl) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get';
  const url = new URL(proxyUrl);
  url.searchParams.set('url', rssUrl);
  url.searchParams.set('disableCashe', true);
  return url.toString();
};

const fetchRssData = async (url) => {
  const { default: axios } = await import('axios');
  const proxyUrl = getproxyUrl(url);
  console.log(proxyUrl);
  return axios.get(proxyUrl)
    .then((response) => response.data)
    .then((data) => data.contents)
    .catch(() => {
      throw new Error('form.message.error.networkError');
    });
};

const updatePosts = (state) => {
  const date = new Date();
  setTimeout(() => {
    const { feeds } = state;
    feeds.map(async (feed) => {
      const rawChanalData = await fetchRssData(feed.url);
      const chanalData = parseHTML(rawChanalData);
      const { items } = chanalData;
      if (items) {
        const newItems = items
          .filter((item) => item.pubData > date)
          .map((item) => {
            item.id = uuidv4();
            return item;
          });
        state.posts = [...newItems, ...state.posts];
      }
    });
    updatePosts(state);
  }, 5000);
};

const addNewRssChanal = async (state) => {
  try {
    const rawChanalData = await fetchRssData(state.form.currentUrl);
    const chanalData = parseHTML(rawChanalData);
    state.form.processState = 'idle';
    if (chanalData) {
      const { title, description, items } = chanalData;

      state.feeds.unshift({
        title,
        description,
        url: state.form.currentUrl,
      });
      const newItems = items.map((item) => {
        item.id = uuidv4();
        return item;
      });
      state.posts = [...newItems, ...state.posts];
      state.form.addedUrls.push(state.currentUrl);
      state.form.feedback = { type: 'success', text: 'form.message.success' };
    }
  } catch (e) {
    console.error('error add new cahnall');
    state.form.processState = 'idle';
    state.form.feedback = { type: 'error', text: e.message };
  }
};

const getDomElements = () => {
  const form = window.document.querySelector('form.rss-form');
  const formContainer = form.closest('DIV');
  const input = form.querySelector('input#url-input');
  const inputLabel = input.closest('DIV').querySelector('label');
  const modal = window.document.querySelector('.modal');
  return {
    form,
    input,
    inputLabel,
    btn: form.querySelector('button[type="submit"]'),
    feedback: formContainer.querySelector('p.feedback'),
    header: formContainer.querySelector('h1'),
    subHeader: formContainer.querySelector('p.lead'),
    exemple: formContainer.querySelector('p.text-muted'),
    feeds: window.document.querySelector('.feeds'),
    posts: window.document.querySelector('.posts'),
    modal,
    modalTitle: modal.querySelector('.modal-title'),
    modalBtnClose: modal.querySelector('.btn-secondary'),
    modalBtnRead: modal.querySelector('.btn-primary'),
  };
};

const app = (i18nextInstance) => {
  const elements = getDomElements();
  const {
    input, form, modal,
  } = elements;
  const state = onChange({
    form: {
      currentUrl: '',
      processState: 'idle',
      feedback: '',
      feedbackType: '',
      addedUrls: [],
      valid: true,
    },
    timerStarted: false,
    posts: [],
    feeds: [],
    modal: null,
    lng: '',
  }, view(elements, i18nextInstance));
  state.lng = 'ru';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = input.value;
    state.form.currentUrl = inputValue;
    try {
      await validate(state);
      addNewRssChanal(state);

      state.form.processState = 'fetch';
      state.form.feedback = { type: 'empty', text: '' };
      state.form.valid = true;

      if (!state.timerStarted) {
        updatePosts(state);
        state.timerStarted = true;
      }
    } catch (err) {
      state.form.valid = false;
      state.form.feedback = { type: 'error', text: err.message };
    }
  });

  modal.addEventListener('show.bs.modal', (e) => {
    const btn = e.relatedTarget;
    const postId = btn.getAttribute('data-id');
    const currentPost = state.posts.filter((post) => post.id.toString() === postId)[0];

    if (currentPost) {
      state.modal = currentPost;
      currentPost.read = true;
      state.posts = [...state.posts];
    }
  });
};

const runApp = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    debug: true,
    resources: {
      ru,
    },
  });

  app(i18nextInstance);
};

runApp();
