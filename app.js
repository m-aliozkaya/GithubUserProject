const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", (e)=>{
    let userName = nameInput.value.trim();
    getData(userName);
    e.preventDefault();
  });
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
  lastUsers.addEventListener("click", (e)=>{
    if(e.target && e.target.nodeName === "A"){
      getData(e.target.textContent);
    }
  });
}



function getData(userName) {

  if (userName === "") {
    alert("Lütfen geçerli bir kullanıcı adı giriniz");
  } else {
    github
      .getGithubData(userName)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("Kullanıcı bulunamadı");
        } else {
          ui.addSearchedUserToUI(userName);
          Storage.addSearchedUserToStorage(userName);
          ui.showUserInfo(response.user);
          ui.showRepos(response.repo);
        }
      })
      .catch((err) => console.log(err));
  }

  ui.clearInput();
  
}

function clearAllSearched() {
  Storage.clearSearchedUserFromStorage();
  ui.clearAllSearchedFromUI();
}

function getAllSearched() {
  let users = Storage.getUsersFromStorage();

  users.forEach((userName)=>{
    lastUsers.innerHTML += `
    
    <a href="#profile" class="list-group-item list-group-item-action">${userName}</a>


    `;
  });

}
