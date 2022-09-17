import { object, string, setLocale } from 'yup';
import i18next from 'i18next';

const validate = (state) => {
  setLocale({
    mixed: {
      notOneOf: 'form.message.error.duplication',
    },
    string: {
      url: 'form.message.error.invalid',
    },
  });

  const { currentUrl } = state.form;
  const { feeds } = state;
  const rssShema = object({
    url: string()
      .url()
      .required()
      .notOneOf(feeds.map(({ url }) => url)),
  });
  return rssShema.validate({ url: currentUrl }); 
};

export default validate;
