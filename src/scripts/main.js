
window.addEventListener('load', (event) => {
    if (localStorage.currentUser == "" | localStorage.currentUser == undefined){
        //Poner aquí todos los elementos que desaparezcan cuando no haya usuario registrado
        $("#button_amigos").hide();
        $("#button_cuenta").hide();
    }
    else {
        //Poner aquí todos los elementos que desaparezcan cuando haya un usuario registrado
        $("#button_register").hide();

    }
    document.getElementById("button_home").style.border = "5px solid #e65100"

});

