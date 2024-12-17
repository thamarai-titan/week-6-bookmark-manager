const { response } = require("express");

API_URL = 'http://localhost:3000/bookmarks'

document.addEventListener('DOMContentLoaded',()=>{
    fetchAllBookmarks();
})

//fetching the bookmarks from the backend

function fetchAllBookmarks(){
    fetch(API_URL)
        .then(response=>response.json())
        .then(bookmarks =>{
            bookmarks.forEach(bookmark => addBookmarkToDom(bookmark))
        })
        .catch(error=>console.log("Cannot Fetch the Bookmarks"))

}

function addBookmarkToDom(bookmark){
    const bookmarklist = document.getElementById('book-list') 
}