window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('loader-bg').classList.add('hide');
        setTimeout(function() {
            document.getElementById('loader-bg').style.display = 'none';
        }, 700);
    }, 2000);
});