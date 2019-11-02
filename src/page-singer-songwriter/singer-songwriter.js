import './singer-songwriter.scss'

window.onload = function() {
    document.getElementById('copyright-year').innerHTML = new Date().getFullYear();
    document.getElementById('soundcloud-widget').innerHTML = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/181077470&color=%23dfe3ba&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true"></iframe>';
}
