const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Get a single user by _id
  // Get a single user by _id
getUserById(req, res) {
  User.findOne({ _id: req.params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
},

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

// Update a user by _id
updateUser: async (req, res) => {
  try {
    const userId = req.params.userId; // Updated this line
    console.log('User ID from URL:', userId);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},



 // deleteUser
 deleteUser: async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.id });
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    res.status(200).json({ message: 'User has been deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},

  // Add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
