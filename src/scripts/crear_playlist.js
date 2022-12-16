

function mostrar_add(){
    //Ahora, cada vez que hoveremos este objeto (obtenible con this) podemos hacer que aparezca el icono de más

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
    }
}




