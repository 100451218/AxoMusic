function draw_profile(){
    nombre_usuario = localStorage.getItem("currentUser")
    localStorage.setItem(nombre_usuario+"_escuchando","001.mp3")
    localStorage.setItem(nombre_usuario+"_cancion_favorita","033.mp3")
    escuchando_ahora_mp3 = localStorage.getItem(nombre_usuario+"_escuchando")
    cancion_favorita_mp3 = localStorage.getItem(nombre_usuario+"_cancion_favorita")
    escuchando_ahora = MUSIC_DATA[escuchando_ahora_mp3]
    cancion_favorita = MUSIC_DATA[cancion_favorita_mp3]
    lista_amigos = JSON.parse(localStorage.getItem(nombre_usuario+"_amigos"))

    pagina_perfil_right_html = document.getElementById("perfil_col_right")
    pagina_perfil_left_html = document.getElementById("perfil_col_left")



    //columna izquierda
    pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML+`<h2 id="perfil_nombre">#${nombre_usuario}</h2>`
    //Creamos cancion favorita
    if (cancion_favorita_mp3 != NaN | cancion_favorita_mp3 != "") {
        cancion_favorita_image = cancion_favorita[4]
        pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML + `<p>Cancion favorita:</p><div id=${cancion_favorita_mp3}><img class="perfil_col_left_song" src="images/${cancion_favorita_image}"></div>`
    }
    //Creamos escuchando ahora
    if (escuchando_ahora_mp3 != NaN | escuchando_ahora_mp3 != "") {
        escuchando_ahora_image = escuchando_ahora[4]
        pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML + `<p>Escuchando ahora:</p><div id=${escuchando_ahora_mp3}><img class="perfil_col_left_song" src="images/${escuchando_ahora_image}"></div>`
    }


    //columna derecha
    counter = 0
    while (lista_amigos.length> counter){
        lista_amigos[counter]
        counter++
    }


}

function crear_amigos_predefinidos(){
    nombre_usuario = localStorage.getItem("currentUser")
    localStorage.setItem(nombre_usuario+"_amigos",'["MdeMarcos","Robert"]')
    localStorage.setItem("MdeMarcos_escuchando", "039.mp3")
    localStorage.setItem("Robert_escuchando", "015.mp3")
}

window.addEventListener('DOMContentLoaded', (event) => {
    crear_amigos_predefinidos()
    draw_profile()


})