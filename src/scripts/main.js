
window.addEventListener('load', (event) => {
    if (localStorage.currentUser == "" | localStorage.currentUser == undefined){
        //Poner aquí todos los elementos que desaparezcan cuando no haya usuario registrado
        $("#a_cuenta").hide();
    }
    else {
        //Poner aquí todos los elementos que desaparezcan cuando haya un usuario registrado
        $("#a_register").hide();

    }
    document.getElementById("button_home").style.border = "5px solid #f57c00"
    add_song()
    add_song_not_listened()
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

document.getElementsByClassName("music")[0].addEventListener("click", function(e){play_song(e)})
document.getElementsByClassName("sorprendeme")[0].addEventListener("click", function(e){play_song(e)})

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
    music.setAttribute('id',"music_"+key);
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
    music.setAttribute('id',"music_"+key);
}

function play_song(e){
    info_audio = e.target.parentElement.id;
    source_url = info_audio.split("_")[1];
    document.getElementById("music_control").setAttribute("src", "music/"+source_url)
    $("#music_control").show()
}

