
let lista_sorpresa= crear_cola_aleatoria();

window.addEventListener('load', (event) => {
    let currentPage = window.location.href.split("/").slice(-1)[0]
    if (localStorage.currentUser == "" | localStorage.currentUser == undefined){
        //Poner aquí todos los elementos que desaparezcan cuando no haya usuario registrado
        $("#a_cuenta").hide();
        if (currentPage == "index.html"){
            document.getElementById("seguir_escuchando").innerHTML = "Escuchar"
        }
    }
    else {
        //Poner aquí todos los elementos que desaparezcan cuando haya un usuario registrado
        $("#a_register").hide();
        if (currentPage == "index.html"){
            document.getElementById("seguir_escuchando").innerHTML = "Seguir escuchando"
        }


    }
    if (currentPage == "index.html"){
        document.getElementById("button_home").style.border = "5px solid #f57c00"
        add_song()
        add_song_not_listened()
        document.getElementsByClassName("music")[0].addEventListener("click", function(e){play_song(e)})
        document.getElementsByClassName("sorprendeme")[0].addEventListener("click", function(e){
            reproducir_cola(lista_sorpresa, 0);
        })
    }

});

document.getElementById("button_playlist").addEventListener("click", function(e){not_log_in(e)});
document.getElementById("button_amigos").addEventListener("click", function(e){not_log_in(e)});

function not_log_in(e){
    if (localStorage.currentUser == "" | localStorage.currentUser == undefined){
        e.preventDefault()
        alert("Inicia sesión para acceder")
    }
    return
}



function add_song(){
    nombre_usuario = localStorage.getItem("currentUser")
    if (nombre_usuario !== null && nombre_usuario !== "") {
        escuchando_ahora_mp3 = localStorage.getItem(nombre_usuario + "_escuchando")
        var key
        if (escuchando_ahora_mp3 == ""|| escuchando_ahora_mp3 == undefined){
            key = "035.mp3";
        }
        else{
            key = escuchando_ahora_mp3;
        }
    }
    else {
        key = "035.mp3";
    }


    var music = document.getElementsByClassName("music")[0];

    var img = document.createElement('img');
    img.setAttribute('src', "images/"+MUSIC_DATA[key][4]);
    img.setAttribute("class", "music_image")
    var song_title = document.createElement('h4');
    song_title.innerHTML=MUSIC_DATA[key][0];
    var song_autor = document.createElement('p');
    song_autor.innerHTML=MUSIC_DATA[key][1];
    music.appendChild(img);
    music.appendChild(song_title);
    music.appendChild(song_autor);
    music.setAttribute('id',key);
}



function add_song_not_listened(){
    var key = lista_sorpresa[0];
    var music = document.getElementsByClassName("sorprendeme")[0];

    var img = document.createElement('img');
    img.setAttribute('src', "images/"+MUSIC_DATA[key][4]);
    img.setAttribute("class", "music_image")
    var song_title = document.createElement('h4');
    song_title.innerHTML=MUSIC_DATA[key][0];
    var song_autor = document.createElement('p');
    song_autor.innerHTML=MUSIC_DATA[key][1];
    music.appendChild(img);
    music.appendChild(song_title);
    music.appendChild(song_autor);
    music.setAttribute('id',key);
}



function crear_cola_aleatoria(){
    let array_canciones = [];
    for (let key in MUSIC_DATA){
        array_canciones.push(key);
    }
    array_canciones= randomizar(array_canciones)
    return array_canciones
}
//reproducir_cola("038.mp3|037.mp3|036.mp3|034.mp3|035.mp3|039.mp3|040.mp3|031.mp3|026.mp3|025.mp3|013.mp3|011.mp3|016.mp3|003.mp3|007.mp3|009.mp3|003.mp3|005.mp3|007.mp3|009.mp3",0)

function randomizar(array) {
    var i = array.length,
        j = 0,
        temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // cambiar aleatoriamente un elemento con otro
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function agregar_a_me_gusta(){
    var audio_source = document.getElementById('music_control').getAttribute('src'); //coger la direccion de la canción

    var user = localStorage.getItem("currentUser");

    nombre_nueva_playlist= "me_gusta"
    var longitud = audio_source.length - 4;
    var nombre_cancion = audio_source.substring(6, longitud)+".mp3";
    var canciones = JSON.parse(localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist));


    if (localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist)===null) {
        //Si no existe la playlist
        playlists = JSON.parse(localStorage.getItem(user+'_sus_playlists'))
        if (playlists === null | playlists === undefined | playlists === ""){
            playlists = []
        }
        playlists.push(nombre_nueva_playlist)
        localStorage.setItem(user+'_sus_playlists', JSON.stringify(playlists) )
        localStorage.setItem(user+'_playlist_'+nombre_nueva_playlist, `["${nombre_cancion}"]`);

    } else{

        //Si ya existe esta playlist, sacamos primero las canciones
        if (canciones.indexOf(nombre_cancion) == -1) {
            canciones = JSON.parse(localStorage.getItem(user + "_playlist_" + nombre_nueva_playlist));
            //console.log(canciones)
            canciones.push(nombre_cancion)
            //console.log(canciones)
            localStorage.setItem(user + "_playlist_" + nombre_nueva_playlist, JSON.stringify(canciones));
        }
        else{
            canciones = JSON.parse(localStorage.getItem(user + "_playlist_" + nombre_nueva_playlist));
            //console.log(canciones)
            canciones.splice(canciones.indexOf(nombre_cancion), canciones.indexOf(nombre_cancion)+1) // delete element with index 4
            console.log(1)
            //console.log(canciones)
            if (canciones !== null){localStorage.setItem(user + "_playlist_" + nombre_nueva_playlist, JSON.stringify(canciones));}
            else{localStorage.setItem(user + "_playlist_" + nombre_nueva_playlist, `[]`)}
        }
    }
    var canciones = JSON.parse(localStorage.getItem(localStorage.currentUser + '_playlist_me_gusta'));
    if (localStorage.getItem(localStorage.currentUser + '_playlist_me_gusta') !== null) {
        if (canciones.indexOf(nombre_cancion) == -1) {
            document.getElementById("me_gusta_button").setAttribute("src", "images/corazon_vacio.png")

        } else {
            document.getElementById("me_gusta_button").setAttribute("src", "images/corazon.png")
        }
    }
    else{
        document.getElementById("me_gusta_button").setAttribute("src", "images/corazon_vacio.png")
    }





}
