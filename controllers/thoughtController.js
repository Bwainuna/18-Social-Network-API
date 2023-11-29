const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought by _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Update a thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

// Delete a thought by _id
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      res.json({ message: 'Thought has been deleted', deletedThought: dbThoughtData });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
},

 // Create a reaction for a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: { ...req.body } } }, // Ensure req.body.reactions is an array
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },


  // Delete a reaction by reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
