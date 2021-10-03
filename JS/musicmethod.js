var song = document.getElementById("defaultsong");
var playlist = [];
var imgsong = [];
var audiosong = [];
let playbntstatus = true
let loopbtnstatus = true;
let randombtnstatus = true;

function playmusic(song) {
  if(playbntstatus) {
    song.play();
    playbntstatus = false;
    document.getElementById("songlogo").style.animation = "app-logo-spin infinite 20s linear";
    document.getElementById("btnplay").innerHTML = "❚❚";
  } else{
    song.pause();
    document.getElementById("btnplay").innerHTML = "▶  ";
    document.getElementById("songlogo").style.animation = "none";
    playbntstatus = true;
  }
}

function disPlayListSong(list) {
  let playlist = `<table class="tbplaylist"><h4>Play List <span id="quantitysong">aa</span></h4>`;
  for (let i = 0; i < list.length; i++) {
    playlist += ` 
            <tr id="${i}">
                <td class="namesongplaylist" id="${i}">${list[i]} </td>
                <td>                 
                <button onclick="playsong(${i})" class="btnplaylist">▶</button>
                </td>      
                <td>
                <button onclick="deletesong(${i})" class="delesongfrompl">X</button>
                </td>
            </tr>`;
  }
  playlist += `</table>`;
  document.getElementById("listplaysong").innerHTML = playlist;
  quantitysong();
}
disPlayListSong(playlist);

function addToPlayList(songname) {
  playlist.push(songname);
}

function addImgToPlayList(img) {
  imgsong.push(img);
}

function addAudioToPlayList(audio) {
  audiosong.push(audio);
}

function playsong(s) {
  stopsong();
  document.getElementById("songlogo").src = imgsong[s];
  document.getElementById("marquee").innerHTML = playlist[s];
  song = audiosong[s];
  song.ontimeupdate = function () {
    let percenttime = Math.floor(song.currentTime / song.duration * 100);
    document.getElementById("rangetimesong").value = percenttime;
    changeVolume(song)
    displaytime(percenttime)
    if (loopbtnstatus == true && randombtnstatus == true ) {
      autonextsong()
    } else {
      if(loopbtnstatus == false && randombtnstatus == true ){
      loopsong()
      } 
      if(randombtnstatus == false && loopbtnstatus == true){
        randomsong()
      }
    }
  }
  song.play();
  playbnt = false;
  document.getElementById("songlogo").style.animation = "app-logo-spin infinite 20s linear";
  document.getElementById("btnplay").innerHTML = "❚❚";
}

function deletesong(x) {
  playlist.splice(x, 1);
  imgsong.splice(x, 1);
  audiosong.splice(x, 1);
  disPlayListSong(playlist);
  quantitysong()
}

function stopsong() {
  song.pause();
  song.currentTime = 0;
}

function nextsong() {
  index = playlist.indexOf(document.getElementById("marquee").textContent);
  nextidx = index + 1;
  if (index == playlist.length - 1) {} else {
    playsong(nextidx);
  }
}

function previoussong() {
  index = playlist.indexOf(document.getElementById("marquee").textContent);
  previousidx = index - 1;
  if (index == 0) {} else {
    playsong(previousidx);
  }
}
function clickloop(){
  if(loopbtnstatus == true) {
    document.getElementById("loopbutton").classList.remove("available-icon");
    document.getElementById("randombutton").classList.add("available-icon");
    loopbtnstatus = false;
    randombtnstatus = true
  } else {
    document.getElementById("loopbutton").classList.add("available-icon");
    document.getElementById("randombutton").classList.remove("available-icon");
    loopbtnstatus = true;
    randombtnstatus = false;
  }
}

  function loopsong() {
       if(song.duration == song.currentTime){
        index = playlist.indexOf(document.getElementById("marquee").textContent);
        playsong(index);
       }
  }
  function clickrandom() {
    if(randombtnstatus == true) {
      document.getElementById("randombutton").classList.remove("available-icon");
      document.getElementById("loopbutton").classList.add("available-icon");
      randombtnstatus = false;
      loopbtnstatus = true;
    } else {
      document.getElementById("randombutton").classList.add("available-icon");
      document.getElementById("loopbutton").classList.remove("available-icon");
      randombtnstatus = true;
      loopbtnstatus = false;

    }
  }
// -------------------------------------------------------------------------------------
 function randomsong() {
  randomindex =  Math.floor(Math.random() * playlist.length)
  if(song.duration == song.currentTime) {
    playsong(randomindex)
  }

      
}
// -------------------------------------------------------------------------------------

function checkinplaylist(songname, img, audio) {
  if (playlist.indexOf(songname) == -1) {
    addImgToPlayList(img);
    addAudioToPlayList(audio);
    addToPlayList(songname);
    disPlayListSong(playlist);
  } else {
    alert(`${songname} already exists in playlist`);
  }
}

function changeVolume(song) {
  let volume = document.getElementById("volume").value;
  song.volume = volume / 100;
}

let volumeshow = true

function showrangevolume() {
  if (volumeshow) {
    document.getElementById("volume").classList.remove("d-none");
    volumeshow = false
  } else {
    document.getElementById("volume").classList.add("d-none");
    volumeshow = true
  }
}
song.ontimeupdate = function () {
  let percenttime = ((song.currentTime / song.duration * 100));
  document.getElementById("rangetimesong").value = percenttime;
  changeVolume(song)
  displaytime(percenttime)
  if (loopbtnstatus == true && randombtnstatus == true ) {
    autonextsong()
  } else {
    if(loopbtnstatus == false && randombtnstatus == true ){
    loopsong()
    } 
    if(randombtnstatus == false && loopbtnstatus == true){
      randomsong()
    }
  }
}

function rewindsong() {
  let percent = document.getElementById("rangetimesong").value;
  let secontimesong = song.duration / 100 * percent   
  song.currentTime = secontimesong;
}

function displaytime(secontimesong) {
  document.getElementById("innertime").innerText = secondsToMinutes(Math.round(secontimesong));
}

function secondsToMinutes(time) {
  return Math.floor(time / 60) + ': ' + Math.floor(time % 60);
}

function autonextsong() {
  if (song.duration == song.currentTime) {
    nextsong()
  }
}

function quantitysong() {
  let quantity = playlist.length;
  document.getElementById("quantitysong").innerText = `${quantity} song`;
}
quantitysong()
//---------------------------------- Theme Color use OOP-----------------------------------//
class Theme {
  constructor(color1, color2, color3, color4, color5) {
    this.color1 = color1
    this.color2 = color2
    this.color3 = color3
    this.color4 = color4
    this.color5 = color5
  }
  settheme() {
    document.getElementsByTagName("body")[0].style.backgroundColor = `${this.color1}`;
    document.getElementsByClassName("header")[0].style.backgroundColor = `${this.color2}`;
    document.getElementsByClassName("viewpage")[0].style.backgroundColor = `${this.color3}`;
    document.getElementsByClassName("viewpage")[0].style.color = `${this.color5}`
    let x = document.getElementsByTagName("button");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = `${this.color4}`
    };
    let z = document.getElementsByClassName("infosinger");
    for (let k = 0; k < z.length; k++) {
      z[k].style.color = `${this.color5}`;
    };
  };
}

let yellowtheme = new Theme("#000000", "#082032", "#334756", "#F0A500","#ffffff")
let violettheme = new Theme("#F56FAD", "#C32BAD", "#7027A0", "#F56FAD", "#ffffff")
let multiltheme = new Theme("#FFEDDA", "#FFB830", "#3DB2FF", "#FF2442", "#ffffff")
let tomatotheme = new Theme("#082032", "#2C394B", "#334756", "#FF4C29", "#ffffff")
let defaulttheme = new Theme("#0d6a9a", "#2bcbba", "#1db9c3", "#7027a0", "#000000")
