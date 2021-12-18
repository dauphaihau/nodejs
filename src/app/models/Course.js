const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String, maxlength: 500},
    image: {type: String, maxlength: 255},
    videoId: {type: String, required: true},
    level: {type: String},
    slug: {type: String, slug: 'name', unique: true}

    // createAt: {type: Date, default: Date.now},
    // updateAt: {type: Date, default: Date.now}
}, {
    timestamps: true
});

// Add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Course)