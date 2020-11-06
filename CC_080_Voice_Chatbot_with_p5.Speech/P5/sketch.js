// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Voice Chatbot with p5.Speech
// Edited Video: https://youtu.be/iFTgphKCP9U

function setup() {
  noCanvas();
  mic = new p5.AudioIn();
     // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  getAudioContext().resume();
  let speech = new p5.Speech();
  speech.setLang('ru-RU');
  let speechRec = new p5.SpeechRec('ru-RU', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  let bot = new RiveScript({utf8: true});
  bot.loadFile('brain.rive').then(brainReady).catch(brainError);

  function brainReady() {
    console.log('Chatbot ready!');
    bot.sortReplies();
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  // let button = select('#submit');
  // let user_input = select('#user_input');
  // let output = select('#output');

  // button.mousePressed(chat);

  async function gotSpeech() {
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      console.log(speechRec.resultString)
      //user_input.value(input);
      let reply = await bot.reply('local-user', input);
      console.log(reply)

      speech.speak(reply);
      //output.html(reply);
    }
  }

  // function chat() {
  //   let input = user_input.value();
  // }
}
