var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Progress = new Schema({
    user: [
        { type: Schema.Types.ObjectId, ref: 'Account' }
    ],
    file: [
        { type: Schema.Types.ObjectId, ref: 'File' }
    ],
    page: Schema.Types.Number

});


module.exports = mongoose.model('Progress', Progress);
