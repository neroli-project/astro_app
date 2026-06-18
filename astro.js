// ===============================
// グローバル変数
// ===============================
let messages = {};  
let currentResult = null; // ← 動画終了後に使うため保存

// ===============================
// DOM 取得
// ===============================
const rollButton = document.getElementById("rollButton");
const diceVideo = document.getElementById('diceVideo');
const planetImage = document.getElementById("planetImage");
const planetName = document.getElementById("planetName");
const signImage = document.getElementById("signImage");
const signName = document.getElementById("signName");
const houseImage = document.getElementById("houseImage");
const houseName = document.getElementById("houseName");
const messageBox = document.getElementById("messageBox");
const resultArea = document.getElementById("resultArea");

// ===============================
// データ
// ===============================
const planets = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
const signs = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
const houses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// 🎥 ランダム動画リスト
const videoFiles = [
  'videos/dice1.mp4',
  'videos/dice2.mp4',
  'videos/dice3.mp4',
  'videos/dice4.mp4',
  'videos/dice5.mp4',
  'videos/dice6.mp4',
  'videos/dice7.mp4',
  'videos/dice8.mp4',
  'videos/dice9.mp4',
  'videos/dice10.mp4',
  'videos/dice11.mp4',
  'videos/dice12.mp4',
  'videos/dice13.mp4',
  'videos/dice14.mp4',

];

// ===============================
// messages.json を読み込む
// ===============================
fetch("data/messages.json")
  .then(res => res.json())
  .then(data => {
    messages = data;
    console.log("✅ messages.json 読み込み成功:", messages);
  })
  .catch(err => {
    console.error("messages.json の読み込みエラー:", err);
  });

// ===============================
// ▶ ダイス再生ボタン
// ===============================
rollButton.addEventListener("click", () => {

  // 🔹 動画を再生している間は結果を隠す
  resultArea.style.display = "none";
  messageBox.style.display = "none";

  // 🔹 ランダム動画をセット
  const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
  diceVideo.src = randomVideo;
  diceVideo.play();

  // 🔹 ここでは結果を表示しない（動画が終わるまでおあずけ）
  currentResult = {
    planet: planets[Math.floor(Math.random() * planets.length)],
    sign: signs[Math.floor(Math.random() * signs.length)],
    house: houses[Math.floor(Math.random() * houses.length)]
  };
});

// ===============================
// ▶ 動画終了後に結果を表示
// ===============================
diceVideo.onended = () => {

  const result = currentResult;
  if (!result) return;

  // ▼ 画像エリア表示
  planetImage.src = `images/planets/${result.planet}.png`;
  planetName.textContent = result.planet.toUpperCase();

  signImage.src = `images/signs/${result.sign}.png`;
  signName.textContent = result.sign.toUpperCase();

  houseImage.src = `images/houses/${result.house}.png`;
  houseName.textContent = `${result.house}`;

  // ▼ メッセージ表示
  if (
    messages[result.planet] &&
    messages[result.planet][result.sign] &&
    messages[result.planet][result.sign][result.house]
  ) {
    messageBox.textContent =
      messages[result.planet][result.sign][result.house];
  } else {
    messageBox.textContent =
      'まだこの組み合わせのメッセージは登録されていません。';
  }

  // 🌟 結果表示！
  resultArea.style.display = "flex";
  messageBox.style.display = "block";
};
