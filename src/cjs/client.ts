const axios = require('axios');
const Toastify = require('toastify-js');

const toastifyCSS = `
.toastify {
    padding: 12px 20px;
    color: black;
    display: inline-block;
    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
    background: linear-gradient(135deg, #73a5ff, #5477f5);
    position: fixed;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    max-width: calc(50% - 20px);
    z-index: 2147483647;
}

.toastify.on {
    opacity: 1;
}

.toast-close {
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    padding: 0px 0px 0px 10px;
}

.toastify-right {
    right: 15px;
}

.toastify-left {
    left: 15px;
}

.toastify-top {
    top: -150px;
}

.toastify-bottom {
    bottom: -150px;
}

.toastify-rounded {
    border-radius: 25px;
}

.toastify-avatar {
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
}

.toastify-center {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: fit-content;
    max-width: -moz-fit-content;
}

@media only screen and (max-width: 360px) {
    .toastify-right, .toastify-left {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
}
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
`;

if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(toastifyCSS));
  document.head.appendChild(style);
}



function clientCheck(BackendUrl) {
  const axiosInstance = axios.create({
    baseURL: BackendUrl,
    timeout: 4000,
    headers: {
      'content-type': 'application/json',
    },
  });

  let intervalId;
  let timeoutId;
  let loadingToast;

  const startServer = async () => {
    try {
      await axiosInstance.post('/check');
    } catch {
      loadingToast = Toastify({
        text: 'Starting the Server',
        duration: -1,
        close: true,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#ADD8E6',
      }).showToast();

      // Interval to check if the server has started
      intervalId = setInterval(async () => {
        try {
          await axiosInstance.post('/check');
          Toastify({
            text: 'Server Started',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#4CAF50',
          }).showToast();

         // Clear both interval and timeout
         clearTimeout(timeoutId);// Prevent the failure message from showing
         clearInterval(intervalId);// Clear both the interval and timeout once the server has started

          loadingToast.hideToast();
        } catch (error) {
          console.log('Server not started yet, retrying...');
        }
      }, 4000);

      // Timeout to stop trying after 60 seconds
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        loadingToast.hideToast(); // Hide loading toast
        Toastify({
          text: 'Failed to Start Server [Retry]',
          duration: 10000,
          gravity: 'top',
          position: 'center',
          backgroundColor: '#f44336',
        }).showToast();
        // Optionally reload the page or retry
        // window.location.reload();
      }, 60000);
    }
  };

  startServer();
}


module.exports = clientCheck;
