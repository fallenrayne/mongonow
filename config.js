var Mongolian = require('mongolian'),
    mongolian = new Mongolian,
    db = mongolian.db('mtgrayne');

exports.config = function(app,express){
    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({
            secret: 'your secret here'
        }));
        app.use(express.compiler({
            src: __dirname + '/public',
            enable: ['sass']
        }));
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
        app.server = mongolian;
        app.db = db;
        app.cards = db.collection('cards');
    });

    app.configure('development', function(){
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production', function(){
        app.use(express.errorHandler());
    });

    return app;
}
