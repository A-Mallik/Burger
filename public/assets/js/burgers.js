
$(function() {

    // Add a burger
    $(".create-form").on("submit", function(event) {
      if(!$("#add_new_burger_input").val().trim()){
        alert("Empty! Try Again!");
      }
      else{
        event.preventDefault();
    //grab burger name and set devoured status to 0 as burger has not been eaten
        var new_burger = {
            burger_name: $("#add_new_burger_input").val().trim(),
            devoured: 0
        };
       //Ajax calls like in example of Cat App activity
        $.ajax("/api/burgers", {
            type: "POST",
            data: new_burger
        }).then(function() {
            location.reload();
        });
      }
    });

    $(".eat_burger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        var devoured_status = {  //change devoured status once eat burger button is clicked
            devoured: 1
        };
        // Ajax put request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devoured_status
        }).then(function() {
            location.reload();
        });
    });

    $(".delete_burger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        // Send the DELETE request.
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });
})
