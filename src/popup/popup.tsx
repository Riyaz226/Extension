import React, { useState, useEffect } from 'react';
import './popup.css'

const App = () => {
  const [keyInput, setKeyInput] = useState(localStorage.getItem('keyInput') || '');
  const [urlInput, setUrlInput] = useState('');
  const [keyValuePairs, setKeyValuePairs] = useState([]);

  useEffect(() => {
    localStorage.setItem('keyInput', keyInput);
  }, [keyInput]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('keyInput');
    };
  }, []);

  const addValue = () => {
    if (keyInput) {
      alert('Key already entered. Cannot edit.');
      return;
    }

    const value = urlInput;

    if (value) {
      try {
        const storedDataString = localStorage.getItem('keyValues');
        const storedData = storedDataString ? JSON.parse(storedDataString) : {};

        storedData[value] = true; // You can set any default value here
        localStorage.setItem('keyValues', JSON.stringify(storedData));

        alert('Value added successfully');
        console.log('Value added:', value);
      } catch (error) {
        handleDataError(error);
      }
    } else {
      alert('Please enter a valid value.');
    }
  };

  const submitData = () => {
    if (keyInput || urlInput) {
      try {
        const data = JSON.parse(sessionStorage.getItem('urlValues')) || [];
        data.push(urlInput);
        sessionStorage.setItem('urlValues', JSON.stringify(data));

        const encodedKey = encodeURIComponent(keyInput || true);
        const encodedUrl = encodeURIComponent(urlInput);
        let formattedUrl;

        if (keyInput) {
          formattedUrl = `https://www.google.com/search?q=${encodedKey.replace('%3F', '?').replace(
            '%2F',
            '/'
          )}%2F${encodedUrl.replace('%3F', '?').replace('%2F', '/')}`;
        } else {
          formattedUrl = `https://www.google.com/search?q=${encodedUrl.replace('%3F', '?').replace('%2F', '/')}`;
        }

        console.log(formattedUrl);

        chrome.runtime.sendMessage({ action: 'openTab', url: formattedUrl });

        console.log('URL submitted');
        setKeyValuePairs([...keyValuePairs, { key: keyInput, url: urlInput }]);
      } catch (error) {
        console.error('Error processing data:', error);
        handleDataError(error);
      }
    } else {
      alert('Please enter both a Key and a URL.');
    }
  };

  const handleDataError = (error) => {
    if (error instanceof SyntaxError) {
      console.error('Error parsing JSON:', error);
      alert('Error parsing JSON. Please check your input.');
    } else {
      console.error('Error processing data:', error);
      alert('An error occurred while processing data. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-bold mb-4">Search Extension:</h2>
      <input
        type="text"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        placeholder="Key"
        className="py-1 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
      />
      <button
        onClick={addValue}
        className="bg-green-500 text-white py-1 px-4 mb-2 w-32 hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Add Key-Value
      </button>
      <br />
      <input
        type="text"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        placeholder="URL"
        className="py-1 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
      />
      <button
        onClick={submitData}
        className="bg-blue-500 text-white py-1 px-4 mb-2 w-32 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default App;
