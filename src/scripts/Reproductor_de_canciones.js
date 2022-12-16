function play_song(e){

    let source_url;
    if (e.type == "click"){
        let info_audio = e.target.parentElement.id;
        source_url = "music/"+info_audio
    }
    else {
        source_url = "music/"+e
    }

    let object_to_change = document.getElementById("music_control").getAttribute("src");
    if (object_to_change == source_url){
        document.getElementById("music_control").setAttribute("src", "")
        $("#music_control").hide()
        $(".me_gusta_button").hide()
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando", "")
        $("#button_prev_song").hide()
        $("#button_next_song").hide()
        return
    }
    document.getElementById("music_control").setAttribute("src", source_url)
    $("#music_control").show()
    $("#button_prev_song").show()
    $("#button_next_song").show()
    if (localStorage.currentUser != "" && localStorage.currentUser != undefined){
        $(".me_gusta_button").show() // para que enseñe el botón de me gusta solo a users
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando", source_url.slice(6))
    }

}

function reproducir_cola(cola, index){
    let all_songs = []
    if (typeof cola == "string"){
        all_songs = cola.split("|");


    }
    if (typeof cola == "object"){
        all_songs = cola;
    }

    let added_cola = "";

    for (let i in all_songs){
        if (i != (all_songs.length -1)){
            added_cola += all_songs[i] + "|"
        }
        else{
            added_cola += all_songs[i]
        }

    }

    if (localStorage.currentUser != "" && localStorage.currentUser != undefined){
        $(".me_gusta_button").show() // para que enseñe el botón de me gusta solo a users
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando", all_songs[index])
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando_playlist", added_cola)
        localStorage.setItem(localStorage.getItem("currentUser")+"_playlist_index", index)
    }

    play_song(all_songs[index]);

}

document.getElementById("button_prev_song").addEventListener("click", function (){
    anterior_cancion(localStorage.getItem(localStorage.getItem("currentUser")+"_escuchando_playlist"),
        localStorage.getItem("currentUser")+"_playlist_index")
})
document.getElementById("button_next_song").addEventListener("click", function(){

    siguiente_cancion(localStorage.getItem(localStorage.getItem("currentUser")+"_escuchando_playlist"),
        localStorage.getItem("currentUser")+"_playlist_index")
})


function siguiente_cancion(cola, index){
    if (index == (cola.length -1)){
        index == 0;
    }
    else {
        index += 1;
    }
    reproducir_cola(cola, index);
}

function anterior_cancion(cola, index){
    if (index == 0){
        index = (cola.length - 1);
    }
    else {
        index -= 1;
    }
    reproducir_cola(cola, index);
}