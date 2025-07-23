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

    let sendData = null;
    if (method === 'GET' && data && Object.keys(data).length) {
        const params = new URLSearchParams(data).toString();
        url += (url.includes('?') ? '&' : '?') + params;
    } else if (method !== 'GET') {
        // Для не-GET методов используем FormData
        const formData = new FormData();
        if (data && typeof data === 'object') {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }
        sendData = formData;
    }

    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        callback(null, xhr.response);
    };
    xhr.onerror = function () {
        callback('Network error', null);
    };
    xhr.send(sendData);
};
