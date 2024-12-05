"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const toastify_js_1 = require("toastify-js");
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

function clientCheck(BackendUrl: string) {
    const axiosInstance = axios_1.default.create({
        baseURL: BackendUrl,
        timeout: 4000,
        headers: {
            'content-type': 'application/json',
        },
    });

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    let loadingToast: any;

    const startServer = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt to check if the server is already running
            yield axiosInstance.post('/check');
        } catch (_a) {
            // Show "Starting the Server" toast if server is not running
            loadingToast = (0, toastify_js_1.default)({
                text: 'Starting the Server',
                duration: -1, // Infinite duration until manually hidden
                close: true,
                gravity: 'top',
                position: 'center',
                backgroundColor: '#ADD8E6',
            }).showToast();

            try {
                // Start polling the server every 4 seconds
                intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield axiosInstance.post('/check');
                        // Server started successfully, show success toast
                        (0, toastify_js_1.default)({
                            text: 'Server Started',
                            duration: 3000,
                            gravity: 'top',
                            position: 'center',
                            backgroundColor: '#4CAF50',
                        }).showToast();

                        // Clear both interval and timeout
                        clearTimeout(timeoutId); // Prevent the failure message from showing
                        clearInterval(intervalId); // Clear both the interval and timeout once the server has started

                        // Hide loading toast
                        loadingToast.hideToast();
                    } catch (error) {
                        console.log('Server not started yet, retrying...');
                    }
                }), 4000);

                // After 60 seconds, stop polling and show failure toast if the server isn't started
                timeoutId = setTimeout(() => {
                    clearInterval(intervalId); // Stop the polling
                    loadingToast.hideToast(); // Hide loading toast

                    // Show failure toast only if the server didn't start in time
                    (0, toastify_js_1.default)({
                        text: 'Failed to Start Server [Retry]',
                        duration: 10000,
                        gravity: 'top',
                        position: 'center',
                        backgroundColor: '#f44336',
                    }).showToast();

                    // Optionally reload the page if needed
                    // window.location.reload();
                }, 60000);
            } catch (error) {
                console.error("Error during server polling:", error);
            } finally {
                // Cleanup: Ensure that interval and timeout are cleared, even if there's an error
                clearInterval(intervalId); // Clear interval if polling stops
                clearTimeout(timeoutId); // Clear timeout if polling stops
                loadingToast.hideToast(); // Hide loading toast
            }
        }
    });

    startServer();
}

exports.default = clientCheck;
