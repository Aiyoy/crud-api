import users from '../data/data.json';

function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

export {
  findAllUsers
}
