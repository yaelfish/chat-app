const { getRandomColor } = require('./utils');

const users = [];

const addUser = ({ id, name }) => {
  const color = getRandomColor();
  name = name.trim();
  const existingUser = users.find(user => user.name === name);
  if(!name) return { error: 'Username is required.' };
  if(existingUser) return { error: 'Username is taken.' };
  users.push({ id, name, color });
}

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = id => users.find(user => user.id === id);

module.exports = { addUser, removeUser, getUser };