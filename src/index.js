import { object, string } from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import { Toast } from 'bootstrap';
import './scss/custom.scss';

import ru from './locales/ru.js';
import view from './view.js';

const idGeneretor = () => {
  let count = 0;
  return () => count += 1;
}
const feedId = idGeneretor();
const postId = idGeneretor();

const rssShema = object({
  url: string().url().required().nullable(),
});

const isRepeatUrl = (url, urls) => urls.indexOf(url) === -1 ? false : true;

const checkErrorUrl = async (checkState) => {
  const checkResult = await rssShema.isValidSync({ url: checkState.currentUrl });
  const repeatUrl = isRepeatUrl(checkState.currentUrl, checkState.form.addedUrls);
  if (repeatUrl) {
    return 'form.message.error.duplication';
  }

  if (!checkResult) {
    return 'form.message.error.invalid';
  }

  return null;  
};

const parseHTML = (html) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(html, 'text/xml');
  const channal = parsedData.querySelector('channel');
  const channalTitle = channal.querySelector('title');
  const channalDescription = channal.querySelector('description');
  const channalItems = channal.querySelectorAll('item');
  const jsonData = {
    title: channalTitle.textContent,
    description: channalDescription.textContent,
    items: Array.from(channalItems).map(item => {
      const itemTitle = item.querySelector('title');
      const itemDescription = item.querySelector('description');
      const itemLink = item.querySelector('link');
      const itemPubDate = item.querySelector('pubDate');
      return {
        title: itemTitle.textContent,
        description: itemDescription.textContent,
        link: itemLink.textContent,
        pubDate: itemPubDate.textContent ? new Date(itemPubDate.textContent) : null,
        read: false,      
      };
    })
  };

  return jsonData;
};

const fetchRssData = async (url) => {
  const uri = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  return  axios.get(uri)
        .then(response => response.data)
        .then(result => parseHTML(result.contents))
        .catch(err => {
          throw new Error(err)
        }); 
};

const updatePosts = (state) => {
  const date = new Date();
  setTimeout(() => {
    const { feeds } = state;
    feeds.map(async (feed) => {
      const chanalData = await fetchRssData(feed.url);
      const { items } = chanalData; 
      if (items) {
        const newItems = items
          .filter((item) => item.pubData > date)
          .map((item) => {
            item['id'] = postId();
            return item;
          });
        state.posts = [...newItems, ...state.posts ];
      }
    })
    updatePosts(state);
  }, 5000); 
};

const addNewRssChanal = async (state) => {
 try {
    const chanalData = await fetchRssData(state.currentUrl);
    
    state.form.processState = 'idle';
    if (chanalData) {
      const { title, description, items } = chanalData;

      state.feeds.unshift({
        title,
        description,
        url: state.currentUrl,
      });
      const newItems = items.map((item) => {
        item['id'] = postId();
        return item;
      });
      state.posts = [ ...newItems, ...state.posts ];
      state.form.addedUrls.push(state.currentUrl);
      state.form.feedback = { type: 'success', text: 'form.message.success' };      
    }
  
    if (!chanalData) {
      state.form.feedback = { type: 'error', text: 'form.message.error.linkInvalid' };
      return null;
    }

  } catch {
    state.form.processState = 'idle';
    state.form.feedback = { type: 'error', text: 'form.message.error.networkError' };
    return null;
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
  const { input, form, modal, modalBtnRead } = elements;
  const state = onChange({
      form: {
          currentUrl:'',
          processState: 'idle',
          feedback: '',
          feedbackType: '',
          addedUrls: [],
          valid: true,
      },
      timerStarted: false,
      posts: [],
      feeds: [],  
      lng: '',
  }, view (elements, i18nextInstance));
  state.lng = 'ru';

  input.addEventListener('input', async (e) => {
      const url = e.target.value;       
      state.currentUrl = url;      
  });

  form.addEventListener('submit', async (e) => {
     console.log('submit')
      e.preventDefault();
      const errorUrl = await checkErrorUrl(state);
      if (errorUrl) {
        state.form.valid = false;
        state.form.feedback = { type: 'error', text: errorUrl };
        return;
      }
      state.form.processState = 'fetch';
      state.form.feedback = { type: 'empty', text: '' };     
      state.form.valid = true;
          
      addNewRssChanal(state);
      
      if ( !state.timerStarted) {        
        updatePosts(state);
        state.timerStarted = true;
      }
  });

  modal.addEventListener('show.bs.modal', (e) =>{
    const btn = e.relatedTarget;
    const postId = btn.getAttribute('data-id');
    const post = state.posts.filter((post) => post.id.toString() === postId)[0];

    if (post) {
      const modalTitle = modal.querySelector('.modal-title');
      const modalBody = modal.querySelector('.modal-body');
      modalBtnRead.setAttribute('href', post.link)
      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      post.read = true;
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
      }
  });

  app(i18nextInstance);
};

runApp();
