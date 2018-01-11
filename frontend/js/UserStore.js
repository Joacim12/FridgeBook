// let username = "";
// this.user = this.updateUser();
//
//
// export function setUsername(name) {
//     username = name;
// }
//
// export function updateUser() {
//
// }
//
// updateUser = async () => {
//     return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/' + this.username)).json();
// }
//
// getUser = async () => {
//     let promiseUser = {};
//     await this.user.then(user => promiseUser = user);
//     return await promiseUser;
// }

let userjs = {};

export function setUser(user) {
    userjs = user;
}

export function getUser() {
    return userjs;
}

export function updateUser() {
    return fetchUser();
}

fetchUser = async () => {
    return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/gustav')).json();
}
