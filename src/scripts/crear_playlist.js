window.addEventListener('load', (event) => {
    document.getElementById("button_playlist").style.border = "5px solid #f57c00"
});

function add_song_to_playlist(){
    //En this tendremos el objeto que el usuario quiere añadir a la playlist
    //Por ahora, lo añade a localStorage y la oculta, nada más.
    var user=localStorage.getItem('currentUser');
    var nombre_nueva_playlist = document.getElementById('nombre_nueva_playlist').value;
    console.log(nombre_nueva_playlist)
    if (nombre_nueva_playlist.value==""){
        alert('No se puede añadir a playlist sin nombre')
    } else if (localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist)==null) {
        //Si el nombre es válido pero no existe la canción
        localStorage.setItem(user+'_playlist_'+nombre_nueva_playlist, `['${this.id}']`);
        this.style.display="none";
    } else{
        //Si han puesto un nombre válido y ya existe esta playlist, sacamos primero las canciones
        var canciones = JSON.parse(localStorage.getItem(user+'_playlist_'+nombre_nueva_playlist));
        console.log(canciones)
        canciones.push(this.id)
        console.log(canciones)
        localStorage.setItem(user+'_playlist_'+nombre_nueva_playlist, JSON.stringify(canciones));
        this.style.display="none";
    }





}


function load_add(){
    var all_elements=document.getElementsByTagName('li')
    for (var i=0; i<all_elements.length; i++){
        all_elements[i].style.position="relative";
        var image= document.createElement('img');
        image.setAttribute('src', 'images/add.png');
        image.style.position="absolute";
        image.style.width='100%';
        image.style.zIndex="-1";
        all_elements[i].appendChild(image);

        //También queremos que se añada la canción al ser pulsada (y se oculte para evitar canciones repetidas).
        all_elements[i].addEventListener('click', add_song_to_playlist);
    }
}




