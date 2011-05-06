/**
 * Module dependencies.
 */
var express = require('express'),
    app = module.exports = express.createServer();

app = require('./config').config(app,express);

require('./routes')(app);

if (!module.parent) {
    app.listen(83);

    var everyone = require("now").initialize(app);

    everyone.now.getDatabases = function(){
        app.server.dbNames(everyone.now.returnDatabases);
    }

    everyone.now.getCollections = function(db){
        app.db = db;
        app.server.db(app.db).collectionNames(everyone.now.returnCollections);
    }

    everyone.now.getDocuments = function(collection){
        app.server.db(app.db).collection(collection).find().sort({name:1}).limit(5).skip(1).toArray(everyone.now.returnDocuments)
    }

    console.log("Express server listening on port %d", app.address().port);
}
