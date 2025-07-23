/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let method = options.method || 'GET';
    let data = options.data || {};
    let callback = options.callback;

    if (method === 'GET' && data && Object.keys(data).length) {
        const params = new URLSearchParams(data).toString();
        url += (url.includes('?') ? '&' : '?') + params;
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(null, xhr.response);
            } else {
                callback(`Error: ${xhr.status}`, null);
            }
        };
        xhr.onerror = function () {
            callback('Network error', null);
        };
        xhr.send();
    } else {
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(null, xhr.response);
            } else {
                callback(`Error: ${xhr.status}`, null);
            }
        };
        xhr.onerror = function () {
            callback('Network error', null);
        };
        const formData = new FormData();
        if (data && typeof data === 'object') {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }
        xhr.send(formData);
    }
};
