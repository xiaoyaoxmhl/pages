const mongoose = require('mongoose')

const {mongoConfig} = require('../config');
mongoose.connect(mongoConfig.url)

const models = {
    projects: {
        'title': {type: String, 'require': true},
        'branchs': {type: Object, 'require': true},
        'index':{type: String, 'require': true},
    },
    branchs:{
        'feature':{type: String, 'require': true},
        'localName':{type: String, 'require': true},
        'localUrl':{type: String, 'require': true},
        'developName':{type: String, 'require': true},
        'developUrl':{type: String, 'require': true},
        'masterName':{type: String, 'require': true},
        'masterUrl':{type: String, 'require': true},
        'manager':{type: String, 'require': true},
        'parent_id':{type: String, 'require': true},
        'index':{type: String, 'require': true},
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}


