var docs = '';

$('#list').delegate('.db','click',function(){
    now.getCollections($(this).html());
});

$('#list').delegate('.collection','click',function(){
    now.getDocuments($(this).html());
});

$('#list').delegate('.document','click',function(e){
    $('#list tr').empty();

    var document = docs[$(e.target).attr('id')];
});

$('#getDatabases').click(function(){
    now.getDatabases();
});

now.returnDatabases = function(val,databases){
    $('#list').empty();

    for(var i = 0; i < databases.length; i++){
        $('#list').append('<tr><td class="db">' + databases[i] + '</td></tr>');
    }
}

now.returnCollections = function(val,collections){
    $('#list tr').empty();
    
    for(var i = 0; i < collections.length; i++){
        $('#list').append('<tr><td class="collection">' + collections[i] + '</td></tr>');
    }
}

now.returnDocuments = function(val,documents){
    $('#list tr').empty();

    docs = documents;
    
    for(var i = 0; i < documents.length; i++){
        $('#list').append('<tr><td class="document" id="' + i + '">' + documents[i]._id + '</td></tr>');
    }
}