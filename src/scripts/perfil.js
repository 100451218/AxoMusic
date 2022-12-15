function draw_profile(){
    nombre_usuario = localStorage.getItem("currentUser")
    localStorage.setItem(nombre_usuario+"_escuchando","001.mp3")
    localStorage.setItem(nombre_usuario+"_cancion_favorita","033.mp3")
    escuchando_ahora = MUSIC_DATA[localStorage.getItem(nombre_usuario+"_escuchando")]
    cancion_favorita = MUSIC_DATA[localStorage.getItem(nombre_usuario+"_cancion_favorita")]
    amigos = JSON.parse(localStorage.getItem(nombre_usuario+"_amigos"))

    pagina_perfil_right_html = document.getElementById("perfil_col_right")
    pagina_perfil_left_html = document.getElementById("perfil_col_left")



    //columna izquierda
    pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML+`<h2 id="perfil_nombre">#${nombre_usuario}</h2>`
    pagina_perfil_left_html.innerHTML =pagina_perfil_left_html.innerHTML + `<p>Escuchando ahora:</p><img id="perfil_escuchando_ahora" src="images/${cancion_favorita[4]}" alt="${cancion_favorita[0]}">`
    pagina_perfil_left_html.innerHTML =pagina_perfil_left_html.innerHTML + `<p>Canción favorita:</p><img id="perfil_cancion_favorita" src="images/${escuchando_ahora[4]}" alt="${escuchando_ahora[0]}">`


    //columna derecha

}


window.addEventListener('DOMContentLoaded', (event) => {
    draw_profile()


})