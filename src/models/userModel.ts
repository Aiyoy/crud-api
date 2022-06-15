import users from '../data/data.json';

function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

function findUserById(id: string) {
  return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id)
      resolve(user)
  })
}

export {
  findAllUsers,
  findUserById
}
