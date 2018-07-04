
class LocalStorage {

    constructor() {
        this.prefix = 'JSFrame.';
    }

    get(name) {
        let data = window.localStorage.getItem(this.prefix + name);
        return data ? JSON.parse(data) : undefined;
    }

    set(name, data) {
        window.localStorage.setItem(this.prefix + name, JSON.stringify(data));
    }

    remove(name) {
        window.localStorage.removeItem(this.prefix + name);
    };
}

//
// (function () {
//     var self = {};
//
//     self.checkStorageAccess = function () {
//         try {
//             if (!window.localStorage || !window.sessionStorage) throw "exception";
//             localStorage.setItem('storage_test', 1);
//             localStorage.removeItem('storage_test');
//         } catch(e) {
//             self.createCookieStorage();
//         }
//     };
//
//     self.createCookieStorage = function () {
//         var Storage = function (type) {
//             function createCookie(name, value, days) {
//                 var date, expires;
//
//                 if (days) {
//                     date = new Date();
//                     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//                     expires = "; expires=" + date.toGMTString();
//                 } else {
//                     expires = "";
//                 }
//                 document.cookie = name + "=" + value + expires + "; path=/";
//             }
//
//             function readCookie(name) {
//                 var nameEQ = name + "=",
//                     ca = document.cookie.split(';'),
//                     i, c;
//
//                 for (i = 0; i < ca.length; i++) {
//                     c = ca[i];
//                     while (c.charAt(0) == ' ') {
//                         c = c.substring(1, c.length); //2480
//                     }
//
//                     if (c.indexOf(nameEQ) == 0) {
//                         return c.substring(nameEQ.length, c.length);
//                     }
//                 }
//                 return null;
//             }
//
//             function setData(data) {
//                 // Convert data into JSON and encode to accommodate for special characters.
//                 data = encodeURIComponent(JSON.stringify(data));
//                 // Create cookie.
//                 if (type == 'session') {
//                     createCookie(getSessionName(), data, 365);
//                 } else {
//                     createCookie('localStorage', data, 365);
//                 }
//             }
//
//             function clearData() {
//                 if (type == 'session') {
//                     createCookie(getSessionName(), '', 365);
//                 } else {
//                     createCookie('localStorage', '', 365);
//                 }
//             }
//
//             function getData() {
//                 // Get cookie data.
//                 var data = type == 'session' ? readCookie(getSessionName()) : readCookie('localStorage');
//                 // If we have some data decode, parse and return it.
//                 return data ? JSON.parse(decodeURIComponent(data)) : {};
//             }
//
//             function getSessionName() {
//                 // If there is no name for this window, set one.
//                 // To ensure it's unquie use the current timestamp.
//                 if (!window.name) {
//                     window.name = new Date().getTime();
//                 }
//                 return 'sessionStorage' + window.name;
//             }
//
//             // Initialise if there's already data.
//             var data = getData();
//
//             return {
//                 length: 0,
//                 clear: function () {
//                     data = {};
//                     this.length = 0;
//                     clearData();
//                 },
//                 getItem: function (key) {
//                     return data[key] === undefined ? null : data[key];
//                 },
//                 key: function (i) {
//                     // not perfect, but works
//                     var ctr = 0;
//                     for (var k in data) {
//                         if (ctr == i) return k;
//                         else ctr++;
//                     }
//                     return null;
//                 },
//                 removeItem: function (key) {
//                     delete data[key];
//                     this.length--;
//                     setData(data);
//                 },
//                 setItem: function (key, value) {
//                     data[key] = value + ''; // forces the value to a string
//                     this.length++;
//                     setData(data);
//                 }
//             };
//         };
//
//         // Replace window.localStorage and window.sessionStorage with out custom
//         // implementation.
//         var localStorage = new Storage('local');
//         var sessionStorage = new Storage('session');
//         window.localStorage = localStorage;
//         window.sessionStorage = sessionStorage;
//         // For Safari private browsing need to also set the proto value.
//         if (window.localStorage && typeof window.localStorage.prototype !== 'undefined') {
//             window.localStorage.prototype = localStorage;
//             window.sessionStorage.prototype = sessionStorage;
//         } else if (window.localStorage && typeof window.localStorage.__proto__ !== 'undefined') {
//             window.localStorage.__proto__ = localStorage;
//             window.sessionStorage.__proto__ = sessionStorage;
//         }
//     };
//
//     self.checkStorageAccess();
//
// })();

export default new LocalStorage();