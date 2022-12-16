function agregar_a_me_gusta(){
    var audio_source = document.getElementById('music_control').getAttribute('src'); //coger la direccion de la canción

    var user = localStorage.getItem("currentUser");
    var isitempty = localStorage.getItem(user + "_playlist_me_gusta");
    nombre_nueva_playlist= "me_gusta"
    var longitud = audio_source.length - 4;
    var nombre_cancion = audio_source.substring(6, longitud)+".mp3";
    var canciones = JSON.parse(localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist));

if (canciones.indexOf(nombre_cancion)==-1) {
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
else{
    
}

    
}