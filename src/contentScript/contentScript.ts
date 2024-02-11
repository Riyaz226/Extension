chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

})

window.onload = (event) => {
    console.log('page is fully loaded');
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openTab') {
      chrome.tabs.create({ url: request.url });
    }
  });
  