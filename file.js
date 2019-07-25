
var songs = ["./songs/things.mp3", "./songs/perumal.mp3"];
var posters = ["./coverart/stranger.jpeg", "./coverart/pariyerum.jpg"];
var names = ["Stranger things", "Pariyerum perumal"];
var songname = document.getElementById("artname");
var fill = document.getElementById("fill");
var song = new Audio();
var currentsong = 0;

window.onload = playsong;

function playsong() {
    song.src = songs[currentsong];
    songname.textContent = names[currentsong];
    $(".coverart").attr("src", posters[currentsong]);
    $("#miniart").attr("src", posters[currentsong]);
    song.play();
}

function playorpause() {
    if (song.paused) {
        song.play();
        $("#play img").attr("src", "./buttons/pause.png");
    }
    else {
        song.pause();
        $("#play img").attr("src", "./buttons/play.png");

    }
}

song.addEventListener('timeupdate', function () {
    var position = song.currentTime / song.duration;
    fill.style.width = position * 100 + '%';
});

function next() {
    currentsong++;
    if (currentsong > 1) {
        currentsong = 0;
    }
    playsong();
}

function previous() {
    currentsong--;
    if (currentsong < 0) {
        currentsong = 1;
    }
    playsong();
}