const { User } = require('../models');

const userController = {
  // CREATE

  // @ /api/users
  createUser({ body }, res) {
    // expects body -> {"username": "string", "email": "/.+\@.+\..+/"}
    User.create(body)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  },

  // READ

  // @ /api/users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  },

  // @ /api/users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .then(data => !data
        ? res.status(404).json({ message: 'User not found' })
        : res.json(data))
      .catch(err => res.status(500).json(err));
  },

  // UPDATE

  // @ /api/users/:id
  updateUser({ body, params }, res) {
    // expects body -> {"username": "string", "email": "/.+\@.+\..+/"}
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(data => !data
        ? res.status(404).json({ message: 'User not found' })
        : res.json(data))
      .catch(err => res.status(400).json(err));
  },

  // @ /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    // add user to friend's friends list
    return User.findOneAndUpdate(
      { _id: params.friendId },
      { $push: { friends: params.userId } },
      { new: true, runValidators: true }
    )
      // add friend to user
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'Friend not found' });
          return
        }
        
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
          )
          .then(data => !data
            ? res.status(404).json({ message: 'User not found' })
            : res.json(data))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  },

  // @ /api/users/:userId/friends/:friendId
  removeFriend({ params }, res) {
    // add user to friend's friends list
    return User.findOneAndUpdate(
      { _id: params.friendId },
      { $pull: { friends: params.userId } },
      { new: true }
    )
      // add friend to user
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'Friend not found' });
          return
        }
        
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
          )
          .then(data => !data
            ? res.status(404).json({ message: 'User not found' })
            : res.json(data))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  },

  // DELETE

  // @ /api/users/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(data => !data
        ? res.status(404).json({ message: 'User not found' })
        : res.json(data))
      .catch(err => res.status(500).json(err));
  },
}

module.exports = userController;