const users = [];

export const getUsers = (req, res) => res.json(users);

export const getUserById = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.username === id);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).end();
  }
};

export const createUser = (req, res) => {
  const { body: newUser } = req;
  const foundUser = users.find((user) => user.username === newUser.username);
  if (foundUser) {
    res.status(400).json({ msg: 'username is already taken!' });
  } else {
    users.push(newUser);
    res.status(201).json({ msg: `User with username: ${newUser.username} was created!` });
  }
};

export const deleteUserById = (req, res) => {
  const userToDeleteIndex = users.findIndex((user) => user.username === req.params.id);
  if (userToDeleteIndex !== -1) {
    users.splice(userToDeleteIndex, 1);
    res.json({ msg: `User ${req.params.id} was deleted :(` });
  } else {
    res.status(400).json({ msg: `User ${req.params.id} does not exist` });
  }
};
