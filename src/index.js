import onChange from 'on-change';
import i18next from 'i18next';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ru from './locales/ru.js';
import view from './view/view.js';
import parseHTML from './parser.js';
import validate from './utils/validate.js';
import renderForm from './view/renderForm.js';

const getProxyUrl = (rssUrl) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get';
  const url = new URL(proxyUrl);
  url.searchParams.set('disableCache', true);
  url.searchParams.set('url', rssUrl);
  return url.toString();
};

const fetchRssData = async (url) => {
  const { default: axios } = await import('axios');
  const proxyUrl = getProxyUrl(url);
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
    const promises = feeds.map((feed) => fetchRssData(feed.url));
    Promise.all(promises)
      .then((results) => {
        results.forEach((rawChannelData) => {
          const channelData = parseHTML(rawChannelData);
          const { items } = channelData;
          if (items) {
            const newItems = items
              .map((item) => {
                item.pubData = item.itemPubDate ? new Date(item.itemPubDate) : null;
                return item;
              })
              .filter((item) => item.pubData > date)
              .map((item) => {
                item.read = false;
                item.id = uuidv4();
                return item;
              });
            state.posts = [...newItems, ...state.posts];
          }
        });
      })
      .finally(() => updatePosts(state));
  }, 5000);
};

const addNewRssChannel = async (state) => {
  try {
    const rawChannelData = await fetchRssData(state.form.currentUrl);
    const channelData = parseHTML(rawChannelData);
    state.form.processState = 'idle';
    const { title, description, items } = channelData;
    state.feeds.unshift({
      title,
      description,
      url: state.form.currentUrl,
    });
    const newItems = items.map((item) => {
      item.id = uuidv4();
      item.read = false;
      item.pubData = item.itemPubDate ? new Date(item.itemPubDate) : null;
      return item;
    });
    state.posts = [...newItems, ...state.posts];
    state.form.addedUrls.push(state.currentUrl);
    state.form.feedback = { type: 'success', text: 'form.message.success' };
  } catch (e) {
    console.error('error add new channel');
    state.form.processState = 'idle';
    state.form.feedback = { type: 'error', text: e.message };
  }
};

const getDomElements = () => {
  const form = document.querySelector('form.rss-form');
  const formContainer = form.closest('DIV');
  const input = form.querySelector('input#url-input');
  const inputLabel = input.closest('DIV').querySelector('label');
  const modal = document.querySelector('.modal');
  return {
    form,
    input,
    inputLabel,
    btn: form.querySelector('button[type="submit"]'),
    feedback: formContainer.querySelector('p.feedback'),
    header: formContainer.querySelector('h1'),
    subHeader: formContainer.querySelector('p.lead'),
    exemple: formContainer.querySelector('p.text-muted'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
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

  renderForm(elements, i18nextInstance);

  const state = onChange({
    form: {
      currentUrl: '',
      processState: 'idle',
      feedback: '',
      feedbackType: '',
      addedUrls: [],
      valid: true,
    },
    posts: [],
    feeds: [],
    modal: null,
  }, view(elements, i18nextInstance));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = input.value;
    state.form.currentUrl = inputValue;
    try {
      await validate(state);
      addNewRssChannel(state);

      state.form.processState = 'fetch';
      state.form.feedback = { type: 'empty', text: '' };
      state.form.valid = true;
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

  updatePosts(state);
};

const runApp = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  app(i18nextInstance);
};

runApp();
