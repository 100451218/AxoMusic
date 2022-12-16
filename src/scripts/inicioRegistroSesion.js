
document.getElementById("button_register").style.border = "5px solid #f57c00"


//Código para iniciar sesión
document.getElementById("iniciar_sesion").addEventListener("submit", (e)=> {
    e.preventDefault()
    const usuario = document.getElementById("log_username").value;
    const contra = document.getElementById("log_password").value;

    if (usuario.length==0 || contra.length==0) {
        alert("Faltan campos por rellenar");
        return
    }

    //Comprobamos que existan tanto el usuario como la contraseña
    if (check_username_log(usuario)){
        if (check_password(usuario, contra)){
            localStorage.currentUser = usuario;
            window.location.replace("index.html");
        }
        else {
            //Si la contraseña es incorrecta
            alert("Información incorrecta");
        }
    }
    else {
        //Si el usuario no está registrado
        alert("Usuario no registrado");
    }


})


function check_username_log(username){
    //Comprobar que existe un usuario
    const get_names = localStorage.getItem("usernames");
    if (get_names == undefined){
        return false;
    }

    let all_names = get_names.split(",");
    for (let i = 0; i < all_names.length; i++){
        if (all_names[i] == username){
            return true;
        }
    }

    return false;
}

function check_password(username, input_pass){
    //Comprobar que la contraseña es la misma que la guardada para ese usuario
    const user_pass_id = username + "_password";
    const stored_pass = localStorage.getItem(user_pass_id);
    if (input_pass == stored_pass){
        return true;
    }
    else {
        return false;
    }
}


//Código para registrarse
document.getElementById("registrarse").addEventListener("submit", (e)=> {
    e.preventDefault()
    const usuario = document.getElementById("sign_username").value;
    const contraseña = document.getElementById("sign_password").value;
    const name_surname = document.getElementById("sign_name_surname").value;
    const correo = document.getElementById("sign_email").value;

    //Comprobamos que los inputs sean correctos
    if (check_mail(correo) == false){
        return;
    }
    if (check_username_sign(usuario, correo) == false){
        return;
    }
    if (check_password(contraseña) == false){
        return;
    }

    if (name_surname == ""){
        alert("Nombre y apellidos es obligatorio");
        return;
    }

    add_username(usuario);
    let password_name = usuario + "_password";
    localStorage.setItem(password_name, contraseña);
    let credentials_name = usuario + "_name_surname";
    localStorage.setItem(credentials_name, name_surname);
    localStorage.setItem(correo, usuario);
    let email_name = usuario + "_email";
    localStorage.setItem(email_name, correo);

    localStorage.currentUser = usuario;
    window.location.replace("index.html");
    return;

})

function check_mail(email) {
    //Comprueba que no exista otro email igual
    if (email == "") {
        alert("Email obligatorio");
    }

    get_email = localStorage.getItem(email);
    if (get_email !== null) {
        alert("Este correo ya está registrado")
        return false;
    }

    return true;
}

function check_username_sign(username){
    //Comprueba que no exista otro usuario igual
    if (username == ""){
        alert("Nombre de usuario obligatorio");
        return false;
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

function check_password(password){
    //Comprueba que la contraseña tenga el formato correcto
    if (password==""){
        alert("La contraseña es obligatoria");
        return false;
    }
    let pattern = /[^0-9a-zA-Z]/;
    if (pattern.test(password)){
        //Si hay un elemento que no debería aparecer, devuelve falso.
        alert("Formato de contraseña incorrecto")
        return false;
    }
    return true;

}

function add_username(username){
    //Añade el usuario a un diccionario con todos los usuarios
    let get_names = localStorage.getItem("usernames");

    if (get_names == undefined){
        //localStorage.getItem("usernames") = username;
        localStorage.setItem("usernames", username);
        return;
    }

    get_names = get_names + "," + username;
    localStorage.setItem("usernames", get_names);

}