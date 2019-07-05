const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subStorySchema = new Schema({
    order: Number,
    title: String,
    description: String,
    url: String,
    tags: Array,
    authorId: String
});

module.exports = mongoose.model('subStory', subStorySchema);
