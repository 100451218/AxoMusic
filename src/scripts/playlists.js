window.addEventListener('load', (event) => {
    document.getElementById("button_playlist").style.border = "5px solid #f57c00"
    cargar_playlists_de_usuario()

});


function add_event_listeners_playlists(){
    const songs_left = document.getElementsByClassName('lista_cancion')
    me_gusta_boton = document.getElementById('me_gusta_button')
    me_gusta_boton.addEventListener("click", function(e){
        cargar_playlists_de_usuario()
    })

    for (let i = 0; i < songs_left.length; i++){
        songs_left.item(i).addEventListener("click", function(e){
            modificar_cola(e);
            play_song(e)
            cargar_playlists_de_usuario()
        })
    }

}


function cargar_playlists_de_usuario(){
    user = localStorage.getItem("currentUser")
    playlists_user = JSON.parse(localStorage.getItem(user+"_sus_playlists"))

    if (playlists_user !== null && playlists_user !== undefined) {
        var pagina_crear_playlist = document.getElementById("playlists_list");
        pagina_crear_playlist.innerHTML = ``
        counter = 0
        while (playlists_user.length > counter) {

            var playlist_name_html = `
            <div class="playlist_object">
            <h2 class="playlist_name" >${playlists_user[counter]}</h2>
            `


            canciones_lista = JSON.parse(localStorage.getItem(user+"_playlist_"+playlists_user[counter]))

            counter2 = 0
            while ((canciones_lista).length > counter2) {

                cancion_html = `<div id=${canciones_lista[counter2]}><img class="lista_cancion" src="images/${MUSIC_DATA[canciones_lista[counter2]][4]}"><a>${MUSIC_DATA[canciones_lista[counter2]][0]}</a></div>`
                playlist_name_html = playlist_name_html + cancion_html
                counter2++

            }
            playlist_name_html = playlist_name_html+`</div>`
            pagina_crear_playlist.innerHTML = pagina_crear_playlist.innerHTML + playlist_name_html
            counter++

        }

    }
    add_event_listeners_playlists()

}


function modificar_cola(e){
    if (e.type == "click"){
        playlist_container = e.target.parentElement.parentElement;
        playlist_name= playlist_container.children[0].innerHTML;
        //Primero, buscamos obtener el valor del usuario actual
        var current_user = localStorage.getItem('currentUser');

        playlist=localStorage.getItem(current_user+'_playlist_'+playlist_name);
        //Tenemos que guardar la cola en el formato correcto
        playlist = JSON.parse(playlist);
        playlist_for_queue=""
        for (var i =0; i < playlist.length; i++){
            playlist_for_queue = playlist_for_queue +playlist[i]
            if (i!=playlist.length-1){
                playlist_for_queue= playlist_for_queue + "|"
            }
        }
        localStorage.setItem(current_user+'_escuchando_playlist', playlist_for_queue)
        //También tenemos que poner el index correcto, para ello miraremos qué canción hemos pulsado
        console.log(playlist_for_queue)
        var name_of_song = e.target.parentElement.id;
        console.log(name_of_song)

        var index= playlist.indexOf(name_of_song);
        console.log(index)
        localStorage.setItem(current_user+'_listening_index', index.toString());
    }
}