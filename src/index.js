import { object, string } from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import './scss/custom.scss';

import ru from './locales/ru.js';
import render from './render.js';

const rssShema = object({
  url: string().url().required().nullable(),
});

const isRepeatUrl = (url, urls) => urls.indexOf(url) === -1 ? false : true;

const checkUrl = async (checkState) => {
  const checkResult = await rssShema.isValidSync({ url: checkState.currentUrl });
  const repeatUrl = isRepeatUrl(checkState.form.currentUrl, checkState.form.addedUrls);
  if (repeatUrl) {
    checkState.form.valid = false;
    checkState.form.error = 'form.message.error.duplication';
  }
  if (!checkResult) {
    checkState.form.valid = checkResult;        
    checkState.form.error = 'form.message.error.invalid'; 
  }
  if (!repeatUrl && checkResult) {
    checkState.form.valid = true;
    checkState.form.error = '';
    checkState.form.processState = 'fetch';
  }
};

const app = (i18nextInstance) => {
  const form = window.document.querySelector('form.rss-form');
  const formContainer = form.closest('DIV');
  const input = form.querySelector('input#url-input');
  const inputLabel = input.closest('DIV').querySelector('label');
  const btn = form.querySelector('button[type="submit"]');  
  const feedback = formContainer.querySelector('p.feedback');
  const header = formContainer.querySelector('h1');
  const subHeader = formContainer.querySelector('p.lead'); 
  const exemple = formContainer.querySelector('p.text-muted')
  const elements = { input, btn, form, feedback, header, subHeader, inputLabel, exemple };

  const state = onChange({
      form: {
          currentUrl:'',
          processState: 'filling',
          error: '',
          addedUrls: [],
          valid: true,
      },      
      lng: '',
  }, render (elements, i18nextInstance));
  state.lng = 'ru';
  
  input.addEventListener('input', async (e) => {
      const url = e.target.value;       
      state.currentUrl = url;      
  });

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      checkUrl(state);
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