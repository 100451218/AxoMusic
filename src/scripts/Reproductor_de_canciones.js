function play_song(e){
    let info_audio;
    let source_url;
    if (e.type == "click"){
        info_audio = e.target.parentElement.id;
        source_url = "music/"+info_audio
    }
    else {
        info_audio = e;
        source_url = "music/"+e
    }

    let object_to_change = document.getElementById("music_control").getAttribute("src");
    if (object_to_change == source_url){
        document.getElementById("music_control").setAttribute("src", "")
        $("#music_control").hide()
        $("#me_gusta_button").hide()
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando", "")
        $("#button_prev_song").hide()
        $("#button_next_song").hide()
        $("#song_identifier").hide()
        return
    }
    document.getElementById("music_control").setAttribute("src", source_url)

    $("#music_control").show()


    document.getElementById("song_identifier").innerHTML = MUSIC_DATA[info_audio][0] +"<br />" + MUSIC_DATA[info_audio][1];
    $("#song_identifier").show()


    if (localStorage.currentUser != "" && localStorage.currentUser != undefined) {
        $("#me_gusta_button").show() // para que enseñe el botón de me gusta solo a users
        $("#button_prev_song").show()
        $("#button_next_song").show()

        var canciones = JSON.parse(localStorage.getItem(localStorage.currentUser + '_playlist_me_gusta'));
        localStorage.setItem(localStorage.getItem("currentUser")+"_escuchando", source_url.slice(6))
        if (localStorage.getItem(localStorage.getItem("currentUser")+"_counter_"+source_url.slice(6)) === null ) {
            localStorage.setItem(localStorage.getItem("currentUser")+"_counter_"+source_url.slice(6),"1")
        }
        else{
            counter=parseInt(localStorage.getItem(localStorage.getItem("currentUser")+"_counter_"+source_url.slice(6)))+1
            localStorage.setItem(localStorage.getItem("currentUser")+"_counter_"+source_url.slice(6),`${counter}`)
        }

        if (localStorage.getItem(localStorage.currentUser + '_playlist_me_gusta') !== null) {
            if (canciones.indexOf(source_url.slice(6)) == -1) {
                document.getElementById("me_gusta_button").setAttribute("src", "images/corazon_vacio.png")

            } else {
                document.getElementById("me_gusta_button").setAttribute("src", "images/corazon.png")
            }
        }
        else{
            document.getElementById("me_gusta_button").setAttribute("src", "images/corazon_vacio.png")
        }

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
        localStorage.setItem(localStorage.getItem("currentUser")+"_listening_index", parseInt(index))
    }

    play_song(all_songs[index]);

}

window.addEventListener('load', () => {
    document.getElementById("button_prev_song").addEventListener("click", function () {
        anterior_cancion(localStorage.getItem(localStorage.getItem("currentUser") + "_escuchando_playlist"),
            localStorage.getItem(localStorage.getItem("currentUser") + "_listening_index"))
    })
    document.getElementById("button_next_song").addEventListener("click", function () {

        siguiente_cancion(localStorage.getItem(localStorage.getItem("currentUser") + "_escuchando_playlist"),
            localStorage.getItem(localStorage.getItem("currentUser") + "_listening_index"))
    })
})


function siguiente_cancion(cola, index){

    if (index == (cola.length -1)){
        index = 0;
    }
    else {
        index ++;
    }

    reproducir_cola(cola, index);


}

function anterior_cancion(cola, index){
    if (index == 0){
        index = (cola.length - 1);
    }
    else {
        index --;
    }
    reproducir_cola(cola, index);
}