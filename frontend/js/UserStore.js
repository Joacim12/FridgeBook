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

export class user {
    constructor(username) {
        this.user = this.updateUser();
        this.username = "gustav";
    }

    updateUser = async () => {
        return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/' + this.username)).json();
    }

    getUser = async () => {
        let promiseUser = {};
        await this.user.then(user => promiseUser = user);
        return await promiseUser;
    }

}