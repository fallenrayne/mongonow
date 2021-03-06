/**
 * Module dependencies.
 */
var express = require('express'),
    app = module.exports = express.createServer();

app = require('./config').config(app,express);

require('./routes')(app);

if (!module.parent) {
    app.listen(83);

    function getDbNames(){
        app.server.dbNames(this.now.returnDatabases);
    }

    var nowjs = require("now");
    var everyone = nowjs.initialize(app);

    everyone.connected(getDbNames);

    everyone.now.getDatabases = getDbNames;

    everyone.now.getCollections = function(db){
        app.db = db;
        app.server.db(app.db).collectionNames(this.now.returnCollections);
    }

    everyone.now.getDocuments = function(collection,skip){
        app.collection = collection || app.collection;
        app.server.db(app.db).collection(app.collection).find().sort({name:1}).limit(50).skip(skip).toArray(this.now.returnDocuments)
    }

    everyone.now.getDocument = function(document){
        app.server.db(app.db).collection(app.collection).findOne({name:document},this.now.returnDocument);
    }
}
