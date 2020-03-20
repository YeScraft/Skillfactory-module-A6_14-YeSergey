const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let totalMiss = 0;
let firstHitTime = 0;

function round() {

  $(".miss").removeClass("miss");
  $(".target").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);  


  if (hits === 1) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {

  $('.game-field').addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(miss);
  totalMiss = 10 - miss;
  $("#total").text(totalMiss);
  if (miss===1) {
    $('h2').text($('h2').text().replace("штрафных очков", "штрафное очко"));
  } 
  if (miss>1 && miss<5) {
    $('h2').text($('h2').text().replace("штрафных очков", "штрафных очка"));
  } 
  if (miss>=10) {
    $('h2').text('Вы проиграли!');
  }

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(".target").text('');
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    miss = miss + 1;
    if (miss>9) {
      endGame();
    }
  }

}

function load(){
  round();
  $('.game-field').removeClass("d-none");
  $('#button-reload').removeClass("d-none");
  $('#button-load').addClass("d-none");

}


function init() {

 
  $('.game-field').addClass("d-none");
  $('#button-reload').addClass("d-none");

  $(".game-field").click(handleClick);
  $("#button-load").click(load);
  $("#button-reload").click(function() {
    document.location.reload(true);
  });
}

$(document).ready(init);
