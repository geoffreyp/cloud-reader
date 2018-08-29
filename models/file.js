var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var File = new Schema({
    name: Schema.Types.String,
    url: Schema.Types.String,
    is_public: Schema.Types.Boolean,
    user: [
        { type: Schema.Types.ObjectId, ref: 'Account' }
    ]

});


module.exports = mongoose.model('File', File);
