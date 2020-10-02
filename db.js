const indexedDB = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

    let db;
    const request = indexedDB.open("budget", 1);

    request.onupgradeneeded = function(event){
        const db = event.target.result;
        db.createObjectStore("pending", {autoIncrement: true});
    };

    request.onsuccess = function(event){
        db = event.target.result;
        if (navigator.online) {
            checkDatabase();
        }
    };

    request.onerror = function(event) {
        console.log("Error: " + event.target.errorCode);
    };

    function save