const curr_user = localStorage.currentUser

window.addEventListener('load', (event) => {
    //Al cargar la página, ocultamos los elementos que permiten cambiar la información de la cuenta
    $("#change_info_form").hide()

    document.getElementById("button_cuenta").style.border = "5px solid #f57c00"

    //Esto es para que al seleccionar la opción de cambiar información, los elementos se inicialicen con los valores anteriores
    document.getElementById("label_usuario").innerHTML = "Usuario: " + curr_user;
    document.getElementById("label_nombre").innerHTML = "Nombre y apellidos: " + localStorage.getItem(curr_user+"_name_surname");
    document.getElementById("label_email").innerHTML = "Email: " + localStorage.getItem(curr_user+"_email");

    //Conseguimos los valores anteriores del usuario
    document.getElementById("change_nombre").value = localStorage.getItem(curr_user+"_name_surname");
    document.getElementById("change_email").value = localStorage.getItem(curr_user+"_email");
});

//Añadir los event listener a los botones
document.getElementById("button_change_info").addEventListener("click", function(){go_to_change_info()})
document.getElementById("confirm_button").addEventListener("click", function(){confirm_changes()})
document.getElementById("close_session").addEventListener("click", function (){close_session()})
document.getElementById("delete_account").addEventListener("click", function (e){delete_account(e)})

function  confirm_changes(){
    get_new_values()
    $("#datos").show();
    $("#change_info_form").hide();
    return;
}

function go_to_change_info(){
    $("#datos").hide();
    $("#change_info_form").show();
    return;
}

function close_session(){
    if(confirm("¿Quieres cerrar sesión?")){
        localStorage.currentUser = "";
        window.location.replace("index.html");
    }
    return;
}

function delete_account(e){
    if(confirm("¿Quieres borrar tu cuenta y eliminar todos los datos?")){
        e.preventDefault()
        user_mail = localStorage.getItem(curr_user+"_email")
        localStorage.removeItem(user_mail)
        localStorage.removeItem(curr_user+"_password");
        localStorage.removeItem(curr_user+"_name_surname");
        localStorage.removeItem(curr_user+"_email");

        const get_names = localStorage.getItem("usernames");
        let all_names = get_names.split(",");
        let new_string = "";
        for (let i = 0; i < all_names.length; i++) {
            if (all_names[i] != curr_user) {
                new_string += all_names[i]
            }
        }
        localStorage.setItem("usernames", new_string)
        localStorage.setItem("currentUser", "")
        window.location.replace("index.html")
    }
    return
}

function get_new_values() {
    //Conseguimos la información introducida por el usuario
    const username = curr_user;
    const name_surname = document.getElementById("change_nombre").value;
    const email = document.getElementById("change_email").value;

    //Comprobamos errores
    if (check_mail(email) == false){
        return;
    }
    if (check_username_sign(username, email) == false){
        return;
    }



    //Cambiar los campos de email si ha cambiado el usuario
    const prev_email = localStorage.getItem(curr_user+"_email");
    if (email !== prev_email){
        localStorage.removeItem(prev_email);
        localStorage.setItem(email, username);
    }
    else
    {
        localStorage.email = username;
    }


    //Cambiar los otros campos
    let credentials_name = username + "_name_surname";
    localStorage.setItem(credentials_name, name_surname);

    let email_name = username + "_email";
    localStorage.setItem(email_name, email);



    return;
}


function check_mail(email){
    //Comprobar que no haya errores en el email
    if (email == localStorage.getItem(curr_user+"_email")){
        return true;
    }
    get_email = localStorage.getItem(email);
    if (get_email !== null){
        alert ("Este correo ya está registrado")
        return false;
    }
    return true;
}


function check_username_sign(username){
    //Comprobar que no haya errores en el nuevo usuario
    if (username == curr_user){
        return true;
    }
    const get_names = localStorage.getItem("usernames");
    if (get_names == undefined){
        return true;
    }

    let all_names = get_names.split(",");
    for (let i = 0; i < all_names.length; i++){
        if (all_names[i] == username){
            alert("Este nombre de usuario ya está registrado")
            return false;
        }
    }

    return true;
}

