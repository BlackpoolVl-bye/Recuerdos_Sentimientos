//Sportylove
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');

//INICIO
window.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                document.getElementById('loader-bg').classList.add('hide');
                setTimeout(function () {
                    document.getElementById('loader-bg').style.display = 'none';
                }, 700);
            }, 1000);
        });