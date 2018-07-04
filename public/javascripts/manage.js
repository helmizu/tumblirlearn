var socket = io();
$(function () {
    $('#form').submit(function(){
        $.ajax({
            type: "POST",
            url: "http://localhost:7000/api/users/",
            data: {
                name: $("#name").val(),
                age: $("#age").val()
            },
            success: function(result) {
                var id = result._id;
                socket.emit('add data', {uid: id, name: $('#name').val(), age: $('#age').val() });
                $('#name').val('');
                $('#age').val('');
            },
            error : function(result){
                $("#kolom").html( "<strong>" + JSON.stringify(result) + "</strong>" );
            }
        });
        return false;
    });
});
$(function(){
    socket.on('add data', function(msg){
        $('#tabledata').append('<tr id="'+msg.uid+'"><td>'+ msg.uid +'</td><td>'+ msg.name +'</td><td>'+ msg.age+'</td><td>'+
        '<button class="btn btn-default" onclick="editReq(\''+msg.uid+'\')">EDIT DATA</button>'
        +' <button class="btn btn-danger" onclick="deleteReq(\''+msg.uid+'\')">DELETE</button></td></tr>');
    });
    socket.on('delete data', function(msg){
        $('#'+msg+'').remove();
    });
});
$(function() {
    $(document).on('submit', '#editUser', function() {
        putReq($("#userid").val());
        return false;
    });
});
function putReq(id){
    $.ajax({
        type: "PUT",
        url: "http://localhost:7000/api/users/"+id,
        data: {
            name: $("#ename").val(),
            age: $("#eage").val()
        },
        success: function( result ) {
            $("#kolom").html( "<strong>" + JSON.stringify(result) + "</strong>" );
            location.reload();
        },
        error : function(result){
            $("#kolom").html( "<strong>" + JSON.stringify(result) + "</strong>" );
        }
    });
}
function deleteReq(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:7000/api/users/"+id,
        success: function( result ) {
            socket.emit('delete data', result._id);
        }
    });
}
function editReq(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:7000/api/users/"+id,
        success: function( result ) {
            $("#kolom").html( "<strong>" + JSON.stringify(result) + "</strong>" );
            $("#formEdit").show();
            $("#userid").val(result._id);
            $("#ename").val(result.name);
            $("#eage").val(result.age);
        }
    });
}