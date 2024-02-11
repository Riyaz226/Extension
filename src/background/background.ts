chrome.runtime.onInstalled.addListener(() => {
    console.log('I just installed my chrome extension');
})


chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openTab' && message.url) {
    chrome.tabs.create({ url: message.url });
  }
});
