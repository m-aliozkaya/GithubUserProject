class Storage{

    static getUsersFromStorage(){
        let users ;

        if(localStorage.getItem("searched") === null){
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }  

    static addSearchedUserToStorage(userName){
        let users = this.getUsersFromStorage();

        if(users.indexOf(userName) === -1){
            users.push(userName);
        }

        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearSearchedUserFromStorage(){
        localStorage.clear("searched");
    }

}