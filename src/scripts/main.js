

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

let lista_sorpresa= crear_cola_aleatoria();

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



function agregar_a_me_gusta(){
    //var db = JSON.parse(db_string);
    var audio_source = document.getElementById('music_control').getAttribute('src'); //coger la direccion de la canción
    var user = localStorage.getItem("current_user");
    var isitempty = localStorage.getItem(user + "_me_gusta");

  /*var longitud = audio_source.length - 4;
    var audio_source = audio_source.substring(7, longitud);*/


    if (isitempty=="0" | isitempty==undefined) {
        localStorage.setItem(user + "_me_gusta","1");
        name = "me gusta";

    }
    //console.log(audio_source);

    image_path =  audio_source + ".jpg";
    playsong_path = "images/" + audio_source + ".mp3";
    mp3 = audio_source;

    for (const [key, value] of Object.entries(db)){
        var songs = db[key];
        for(var i = 0; i < songs.length; i++){
            if(songs[i].path == image_path){
                var name = songs[i].name;
                continuar();
                break;
            }
    
        }
    }
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


