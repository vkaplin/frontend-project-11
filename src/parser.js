const parseHTML = (html) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(html, 'text/xml');
  const parseErr = parsedData.querySelector('parsererror');
  if (parseErr) {
    throw new Error('form.message.error.linkInvalid');
  }
  const channal = parsedData.querySelector('channel');
  const channalTitle = channal.querySelector('title');
  const channalDescription = channal.querySelector('description');
  const channalItems = channal.querySelectorAll('item');
  const feedData = {
    title: channalTitle.textContent,
    description: channalDescription.textContent,
    items: Array.from(channalItems).map((item) => {
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
    }),
  };
  return feedData;
};
export default parseHTML;
