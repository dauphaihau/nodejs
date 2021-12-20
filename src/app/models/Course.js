const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        _id: Number,
        name: {type: String, required: true},
        description: {type: String, maxlength: 500},
        image: {type: String, maxlength: 255},
        videoId: {type: String, required: true},
        level: String,
        slug: {type: String, slug: 'name', unique: true}

        // createAt: {type: Date, default: Date.now},
        // updateAt: {type: Date, default: Date.now}
    },
    {
        _id: false,
        timestamps: true
    }
);

// Custom query helpers
courseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this;
}

// Add plugin
mongoose.plugin(slug)
courseSchema.plugin(AutoIncrement)
courseSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', courseSchema)