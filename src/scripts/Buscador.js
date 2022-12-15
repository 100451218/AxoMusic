
function load_all_local_songs(){
    //Cuando se habra la página del buscador vamos a cargar todas las canciones que puede buscar (pero no las enseñamos)
    var ul=document.createElement("ul");
    ul.setAttribute('id', 'search_suggestion_list');
    document.getElementById("Music_suggestions_container").appendChild(ul);
    //Ahora queremos añadir todas las posibles entradas como li

    for (var key in MUSIC_DATA){
        var li = document.createElement('li');
        //Creamos los childs
        li.setAttribute('id', key)
        var img = document.createElement('img');
        img.setAttribute('src', "images/"+MUSIC_DATA[key][4]);
        var song_title = document.createElement('h3');
        song_title.innerHTML=MUSIC_DATA[key][0];
        var song_autor = document.createElement('h4');
        song_autor.innerHTML=MUSIC_DATA[key][1];
        var song_album = document.createElement('h4');
        song_album.innerHTML=MUSIC_DATA[key][2];
        var song_genero = document.createElement('h4');
        song_genero.innerHTML=MUSIC_DATA[key][3][0];
        li.appendChild(img);
        li.appendChild(song_title);
        li.appendChild(song_autor);
        li.appendChild(song_album);
        li.appendChild(song_genero);
        ul.appendChild(li);
    }

}
function mostrar_sugerencias(){
    /*Ejemplo de uso
    console.log(MUSIC_DATA);
    console.log(MUSIC_DATA["034.mp3"]);
    Sólo teneis que acordaros de importar scripts/music.js en el html
    */

    //Queremos filtrar por cada elemento
    var lis =document.getElementsByTagName('li');
    //Cargamos en li la lista de todos los elementos que se pueden sugerir
    var user_input = document.getElementById('user_input').value.toUpperCase();
    //En user input tenemos el input que el ha puesto
    for (var key in MUSIC_DATA){
        //Por cada elemento que estamos sugeriendo, queremos saber si mostrarlo o no
        //Es tan simple como ir por cada canción posible y comprobar la entrada
        song = MUSIC_DATA[key];
        if (song[0].toUpperCase().indexOf(user_input)>-1 || song[1].toUpperCase().indexOf(user_input)>-1 || song[2].toUpperCase().indexOf(user_input) >-1|| song[3][0].toUpperCase().indexOf(user_input) >-1){
            document.getElementById(key).style.display="";
        } else{
            document.getElementById(key).style.display="none";
        }
    }


}