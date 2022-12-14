const curr_user = localStorage.currentUser

window.addEventListener('load', (event) => {
    //Al cargar la página, ocultamos los elementos que permiten cambiar la información de la cuenta
    $(".profile_picture").src = localStorage.getItem(curr_user+"_picture");
    $(".button_cuenta").hide();
    $("#change_info_form").hide()

    //Esto es para que al seleccionar la opción de cambiar información, los elementos se inicialicen con los valores anteriores
    document.getElementById("label_usuario").innerHTML = "Usuario: " + curr_user;
    document.getElementById("label_nombre").innerHTML = "Nombre y apellidos: " + localStorage.getItem(curr_user+"_name_surname");
    document.getElementById("label_email").innerHTML = "Email: " + localStorage.getItem(curr_user+"_email");
    document.getElementById("label_birthdate").innerHTML = "Fecha de nacimiento: " + localStorage.getItem(curr_user+"_birthdate");
    document.getElementById("label_profile_picture").src = localStorage.getItem(curr_user+"_picture");

    //Conseguimos los valores anteriores del usuario
    document.getElementById("change_username").value = curr_user;
    document.getElementById("change_nombre").value = localStorage.getItem(curr_user+"_name_surname");
    document.getElementById("change_email").value = localStorage.getItem(curr_user+"_email");
    document.getElementById("change_birthdate").value = localStorage.getItem(curr_user+"_birthdate");
    document.getElementById("change_profile_picture").src = localStorage.getItem(curr_user+"_picture");
});
