

API_URL = "http://localhost:3000/bookmarks";

document.addEventListener("DOMContentLoaded", () => {
  fetchAllBookmarks();
});

//fetching the bookmarks from the backend

function fetchAllBookmarks() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => addBookmarkToDom(bookmark));
    })
    .catch((error) => console.log("Cannot Fetch the Bookmarks"));
}

function addBookmarkToDom(bookmark) {
  const bookmarklist = document.getElementById("book-list");
  const bookmarkitem = document.createElement("li");
  bookmarkitem.classList.add("bookmark-li");
  bookmarkitem.setAttribute("book-id", bookmark.id);

  const url = document.createElement("span");
  url.textContent = `${bookmark.url} (${bookmark.type})`;

  const ButtonEl = document.createElement("button");
  ButtonEl.innerHTML = "Delete Todo";
  ButtonEl.classList.add("delete-button");
  ButtonEl.addEventListener("click", () => deleteBookmark(bookmark.id));

  bookmarkitem.appendChild(url);
  bookmarkitem.appendChild(ButtonEl);

  bookmarklist.appendChild(bookmarkitem);
}

// add a new bookmark

document.getElementById("Add-button").addEventListener("click", () => {
  const urlInput = document.getElementById("link-input");
  const urlType = document.getElementById("link-type-input");

  if (!urlInput || !urlType || urlInput.value === "" || urlType.value === "") {
    console.error("Please give the input correctly");
    return;
  }

  const newBookmark = {
    url: urlInput.value,
    type: urlType.value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBookmark),
  })
    .then((response) => response.json())
    .then((bookmark) => {
      addBookmarkToDom(bookmark);
      urlInput.value == "";
      urlType.value == "";
    })
    .catch(error=>console.error("Error adding bookmark",error))
});

//deleting a bookmark from Dom

function deleteBookmark(id){
    fetch(`${API_URL}/${id}`,{
        method:'DELETE',
    })
    .then(()=>{

        const bookmarkitem = document.querySelector(`[book-id='${id}']`)
        bookmarkitem.remove();
    })
    .catch(error => console.error('Error while removing the bookmark',error));
}