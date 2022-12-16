
window.addEventListener('load', (event) => {

    if (localStorage.currentUser == "" | localStorage.currentUser == undefined){
        //Poner aquí todos los elementos que desaparezcan cuando no haya usuario registrado
        $("#a_cuenta").hide();
    }
    else {
        //Poner aquí todos los elementos que desaparezcan cuando haya un usuario registrado
        $("#a_register").hide();

    }
    if (window.location.href.split("/").slice(-1)[0] == "main.html"){
        document.getElementById("button_home").style.border = "5px solid #f57c00"
        add_song()
        add_song_not_listened()
        document.getElementsByClassName("music")[0].addEventListener("click", function(e){play_song(e)})
        document.getElementsByClassName("sorprendeme")[0].addEventListener("click", function(e){play_song(e)})
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
    var key = "035.mp3"
    var music = document.getElementsByClassName("music")[0];

    //Para añadir la barra de reproducción
    /*var music_controls = document.createElement("audio");
    music_controls.setAttribute("controls", "");
    music_controls.setAttribute("class", "music_control");
    music_controls.setAttribute("id", "music_"+key)*/
    //Hasta aquí

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
    var key = "038.mp3"
    var music = document.getElementsByClassName("sorprendeme")[0];

    //Para añadir la barra de reproducción
    /*var music_controls = document.createElement("audio");
    music_controls.setAttribute("controls", "");
    music_controls.setAttribute("class", "music_control");
    music_controls.setAttribute("id", "music_"+key)*/
    //Hasta aquí

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



function agregar_a_me_gusta(){
    var audio_source = document.getElementById('music_control').getAttribute('src'); //coger la direccion de la canción

    var user = localStorage.getItem("currentUser");
    var isitempty = localStorage.getItem(user + "_playlist_me_gusta");
    nombre_nueva_playlist= "me_gusta"
    var longitud = audio_source.length - 4;
    var nombre_cancion = audio_source.substring(6, longitud)+".mp3";
    var canciones = JSON.parse(localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist));

    if (localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist)==null) {
        //Si no existe la playlist
        localStorage.setItem(user+'_playlist_'+nombre_nueva_playlist, `["${nombre_cancion}"]`);
        
    } else{
        //Si ya existe esta playlist, sacamos primero las canciones
        if (canciones.indexOf(nombre_cancion)==-1) {
            canciones = JSON.parse(localStorage.getItem(user+"_playlist_"+nombre_nueva_playlist));
            //console.log(canciones)
            canciones.push(nombre_cancion)
            //console.log(canciones)
            localStorage.setItem(user+"_playlist_"+nombre_nueva_playlist, JSON.stringify(canciones));
        }
    }
}

        

crear_cola_aleatoria()
function crear_cola_aleatoria(){
    let array_canciones = [];
    for (let key in MUSIC_DATA){
        array_canciones.push(key);
    }
    console.log(array_canciones);
}
//reproducir_cola("038.mp3|037.mp3|036.mp3|034.mp3|035.mp3|039.mp3|040.mp3|031.mp3|026.mp3|025.mp3|013.mp3|011.mp3|016.mp3|003.mp3|007.mp3|009.mp3|003.mp3|005.mp3|007.mp3|009.mp3",0)

function reproducir_cola(cola, index){
    const all_songs = cola.split("|");
    play_song(all_songs[index])
}


/*function play_song_from_url(song){
    let source_url = "music/"+song;
    let object_to_change = document.getElementById("music_control").getAttribute("src");
    if (object_to_change == source_url){
        document.getElementById("music_control").setAttribute("src", "")
        $("#music_control").hide()
        $(".me_gusta_button").hide()
        return
    }
    document.getElementById("music_control").setAttribute("src", source_url)
    $("#music_control").show()
    if (localStorage.currentUser != "" && localStorage.currentUser != undefined){
        $(".me_gusta_button").show() // para que enseñe el botón de me gusta solo a users
    }
}*/
    
