function draw_profile(){
    /*
    Necesita por local storage
        currentUser+"_escuchando"
        currentUser+"_cancion_favorita"
     */

    nombre_usuario = localStorage.getItem("currentUser")

    escuchando_ahora_mp3 = localStorage.getItem(nombre_usuario+"_escuchando")
    cancion_favorita_mp3 = localStorage.getItem(nombre_usuario+"_cancion_favorita")
    escuchando_ahora = MUSIC_DATA[escuchando_ahora_mp3]
    cancion_favorita = MUSIC_DATA[cancion_favorita_mp3]
    lista_amigos = JSON.parse(localStorage.getItem(nombre_usuario+"_amigos"))


    //columna izquierda
    pagina_perfil_left_html = document.getElementById("perfil_col_left")

    pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML+`<h2 id="perfil_nombre">#${nombre_usuario}</h2>`
    //Creamos cancion favorita
    console.log(cancion_favorita_mp3)
    if (cancion_favorita_mp3 !== null ) {
        cancion_favorita_image = cancion_favorita[4]
        pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML + `<p style="margin-left: 15px;">Cancion favorita:</p><div id=${cancion_favorita_mp3}><img class="perfil_col_left_song" src="images/${cancion_favorita_image}"></div>`
    }
    //Creamos escuchando ahora
    if (escuchando_ahora_mp3 !== null) {
        escuchando_ahora_image = escuchando_ahora[4]
        pagina_perfil_left_html.innerHTML = pagina_perfil_left_html.innerHTML + `<p style="margin-left: 15px;">Escuchando ahora:</p><div id=${escuchando_ahora_mp3}><img class="perfil_col_left_song" src="images/${escuchando_ahora_image}"></div>`
    }


    //columna derecha
    pagina_perfil_right_html = document.getElementById("perfil_col_right")

    counter = 0
    while (lista_amigos.length> counter){
        escuchando_ahora_mp3 = localStorage.getItem(lista_amigos[counter]+"_escuchando")
        escuchando_ahora_image = escuchando_ahora = MUSIC_DATA[escuchando_ahora_mp3][4]
        pagina_perfil_right_html.innerHTML =  pagina_perfil_right_html.innerHTML + `<div class="perfil_amigo" ><p>#${lista_amigos[counter]}</br>Escuchando ahora:</p><div id=${escuchando_ahora_mp3}><img class="perfil_col_left_song" src="images/${escuchando_ahora_image}"></div></div>`
        counter++
    }


}

function crear_amigos_predefinidos(){
    nombre_usuario = localStorage.getItem("currentUser")
    console.log(nombre_usuario)
    localStorage.setItem(nombre_usuario+"_amigos",'["MdeMarcos","Robert","PdePepe","LanKe"]')
    localStorage.setItem("MdeMarcos_escuchando", "039.mp3")
    localStorage.setItem("Robert_escuchando", "015.mp3")
    localStorage.setItem("PdePepe_escuchando", "001.mp3")
    localStorage.setItem("LanKe_escuchando", "018.mp3")
}

window.addEventListener('DOMContentLoaded', (event) => {
    crear_amigos_predefinidos()
    draw_profile()


})