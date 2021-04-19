const { Thought, User } = require('../models');

const thoughtController = {
  // CREATE
  // @ /api/thoughts
  createThought({ body }, res) {
    // expects body -> { "thoughtText": "string", "username": "mg", "userId": "5edff358a0fcb779aa7b118b" }
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        )
          .then(data => !data
            ? res.status(404).json({ message: 'User not found' })
            : res.json(data))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },

  // READ
  // @ /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  },

  // @ /api/thoughts/:id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .then(data => !data
        ? res.status(404).json({ message: 'Thought not found' })
        : res.json(data))
      .catch(err => res.status(500).json(err));
  },

  // UPDATE
  // @ /api/thoughts/:id
  updateThought({ body, params }, res) {
    // expects body -> { "thoughtText": "string" }
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(data => !data
        ? res.status(404).json({ message: 'Thought not found' })
        : res.json(data))
      .catch(err => res.status(400).json(err));
  },

  // DELETE
  // @ /api/thoughts/:id
  deleteThought({ params }, res) {
    // expects body -> { "thoughtText": "string", "username": "mg", "userId": "5edff358a0fcb779aa7b118b" }
    Thought.findOneAndDelete({ _id: params.id })
      .then(thoughtData => {
        console.log(thoughtData);
        return User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: thoughtData._id } },
          { new: true }
        )
          .then(data => !data
            ? res.status(404).json({ message: 'User not found' })
            : res.json(data))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = thoughtController