
var songs = ["./songs/got.mp3", "./songs/things.mp3", "./songs/pacific.mp3", "./songs/darkknight.mp3", "./songs/doctorstrange.mp3", "./songs/avengers.mp3"];
var posters = ["./coverart/got.jpeg", "./coverart/stranger.jpeg", "./coverart/pacific.jpg", "./coverart/darkknight.jpg", "./coverart/doctorstrange.jpg", "./coverart/avengers.jpg"];
var names = ["Game of Thrones", "Stranger Things", "Pacific Rim", "The Dark Knight", "Doctor Strange", "Avengers : Endgame"];
var songname = document.getElementById("artname");
var fill = document.getElementById("fill");
var song = new Audio();
var currentsong = 0;
var len = names.length - 1;
var currentsongtime = document.getElementById("currenttime");
var durationtime = document.getElementById("duration");
window.onload = playsong;
var lWidth = document.getElementById("seeker").offsetWidth;
var lengthleft = document.getElementById("seeker").offsetLeft;
function playsong() {
    song.src = songs[currentsong];
    songname.textContent = names[currentsong];
    $(".coverart").attr("src", posters[currentsong]);
    $("#miniart").attr("src", posters[currentsong]);
    song.play();


}
window.onresize = function () {
    lWidth = document.getElementById("seeker").offsetWidth;
    lengthleft = document.getElementById("seeker").offsetLeft;
}
function durationtimecheck(value) {

    let min = Math.floor(value / 60);
    let sec = value % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    durationtime.textContent = min + ":" + sec;

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
    if (song.currentTime >= song.duration) {
        currentsong++;
        if (currentsong > len) {
            currentsong = 0;
        }
        playsong();
    }
})
$('#seeker').click(function (event) {

    var positionval = (event.pageX - lengthleft) / lWidth * 100;
    fill.style.width = (positionval) + "%";
    console.log(positionval);
    song.currentTime = (positionval / 100) * song.duration;

})
song.addEventListener('timeupdate', function () {
    var position = song.currentTime / song.duration;
    fill.style.width = position * 100 + '%';
    console.log(song.duration)
    converttime(Math.round(song.currentTime));
    durationtimecheck(Math.round(song.duration));

});

function converttime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentsongtime.textContent = min + ":" + sec;
}

function next() {
    currentsong++;
    if (currentsong > len) {
        currentsong = 0;
    }

    playsong();
    $("#play img").attr("src", "./buttons/pause.png");
}

function previous() {
    currentsong--;
    if (currentsong < 0) {
        currentsong = 1;
    }
    playsong();
    $("#play img").attr("src", "./buttons/pause.png");
}

function seekright() {
    song.currentTime = song.currentTime + 5;
    if (song.currentTime >= song.duration) {
        song.currentTime = 0;
    }
}

function seekleft() {
    song.currentTime = song.currentTime - 5;
    if (song.currentTime <= 0) {
        song.currentTime = 0;
    }
}