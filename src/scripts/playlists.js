window.addEventListener('load', (event) => {
    document.getElementById("button_playlist").style.border = "5px solid #f57c00"
    cargar_playlists_de_usuario()
});


function cargar_playlists_de_usuario(){
    user = localStorage.getItem("currentUser")
    playlists_user = JSON.parse(localStorage.getItem(user+"_sus_playlists"))
    if (playlists_user !== null && playlists_user !== undefined) {
        var pagina_crear_playlist = document.getElementById("playlists_list");
        counter = 0
        while (playlists_user.length > counter) {

            var playlist_name_html = `
            <h4 id="playlist_name" >${playlists_user[counter]}</h4>
            `
            pagina_crear_playlist.innerHTML = pagina_crear_playlist.innerHTML + playlist_name_html
            counter++
        }
    }
}