
const colorSwitch = document.querySelector('#switch input[type="checkbox"]');
function cambiaTema(ev){
    if(ev.target.checked){
        document.documentElement.setAttribute('tema', 'dark');
        localStorage.setItem("claro_oscuro", 1);
    } else {
        document.documentElement.setAttribute('tema', 'light');
        localStorage.setItem("claro_oscuro", 0);
    }
}
colorSwitch.addEventListener('change', cambiaTema);

color=localStorage.getItem("claro_oscuro")
if (color==1) {
    colorSwitch.checked=true
    document.documentElement.setAttribute('tema', 'dark');

}
else
    document.documentElement.setAttribute('tema', 'light');

