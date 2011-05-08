var current = 1;
var next = 51;
var prev = 1;

function getCollections(e){
    var name = $(e.target).html();
    addHistory(name,'db');
    now.getCollections(name);
}

function getDocuments(e){
    var name = $(e.target).html();
    addHistory(name,'col');
    now.getDocuments(name,current);
}

function nextDocuments(){

}

function prevDocuments(){
    
}

function getDocument(e){
    var name = $(e.target).html();
    addHistory(name,'doc');
    now.getDocument(name);
}

function addHistory(name,type){
    var history = $('#history');
    if(history.children('span:last-child').html() != name){
        while($('#history').children().size() >= 5){
            $('#history').children('span:first-child').remove();
        }
        $('#history').append('<span class="historyText clicky" type="' + type + '">' + name + '</span>');
    }
}

function traverseHistory(e){
    var type = $(e.target).attr('type');
    switch(type){
        case 'db':
            getCollections(e);
            break;
        case 'col':
            getDocuments(e);
            break;
        case 'doc':
            getDocument(e);
            break
        default:
            console.log('Fail!');
    }
}

function displayDocument(doc,id){
    var output = "";
    for(var prop in doc){
        if(doc[prop] != null){
            if(typeof doc[prop] == 'object'){
                output += "<strong>" + prop + ":</strong>";
                output += "<ul id='" + id + "' style='border:1px solid black;'>";
                output += displayDocument(doc[prop],'#'+prop);
                output += "</ul>";
            }else{
                output += '<li><span class="prop">' + prop + ':</span><span class="val"> ' + doc[prop] + '</span></li>';
            }
        }
    }
    return output;
}

$(document).ready(function(){
    $('#history').delegate('.historyText','click',traverseHistory);

    $('#list').delegate('.db','click',getCollections);

    $('#list').delegate('.collection','click',getDocuments);

    $('#list').delegate('.document','click',getDocument);

    now.returnDatabases = function(err,databases){
        $('#list').empty();

        for(var i = 0; i < databases.length; i++){
            $('#list').append('<li class="db clicky">' + databases[i] + '</li>');
        }
    }

    now.returnCollections = function(err,collections){
        $('#list').empty();

        for(var i = 0; i < collections.length; i++){
            $('#list').append('<li class="collection clicky">' + collections[i] + '</li>');
        }
    }

    now.returnDocuments = function(err,documents){
        $('#list').empty();
        
        for(var i = 0; i < documents.length; i++){
            $('#list').append('<li class="document clicky" id="' + i + '">' + documents[i]._id + '</li>');
        }
    }

    now.returnDocument = function(err,document){
        $('#list').empty().append(displayDocument(document,'#list'));
    }
});
