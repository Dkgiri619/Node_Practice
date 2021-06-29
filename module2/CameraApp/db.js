let db;

let openRequestDB = indexedDB.open("Gallery", 1);

openRequestDB.onupgradeneeded = function(e){
    db = e.target.result;
    db.createObjectStore("Media", {keyPath: "mid"});
};

openRequestDB.onsuccess = function(e){
    db = e.target.result;
};

openRequestDB.onerror = function(e){
    console.log(e);
}