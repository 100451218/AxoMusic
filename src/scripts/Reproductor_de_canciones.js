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
        return
    }
    document.getElementById("music_control").setAttribute("src", source_url)
    $("#music_control").show()
    if (localStorage.currentUser != "" && localStorage.currentUser != undefined){
        $(".me_gusta_button").show() // para que enseñe el botón de me gusta solo a users
    }

}