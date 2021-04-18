import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private context = new AudioContext;
  private buffers = new Map;

  private basic_yin = [["a", "あ", "ア"],
  ["i", "い", "イ"],
  ["u", "う", "ウ"],
  ["e", "え", "エ"],
  ["o", "お", "オ"],
  ["ka", "か", "カ"],
  ["ki", "き", "キ"],
  ["ku", "く", "ク"],
  ["ke", "け", "ケ"],
  ["ko", "こ", "コ"],
  ["sa", "さ", "サ"],
  ["si", "し", "シ"],
  ["su", "す", "ス"],
  ["se", "せ", "セ"],
  ["so", "そ", "ソ"],
  ["ta", "た", "タ"],
  ["ci", "ち", "チ"],
  ["cu", "つ", "ツ"],
  ["te", "て", "テ"],
  ["to", "と", "ト"],
  ["na", "な", "ナ"],
  ["ni", "に", "ニ"],
  ["nu", "ぬ", "ヌ"],
  ["ne", "ね", "ネ"],
  ["no", "の", "ノ"],
  ["ha", "は", "ハ"],
  ["hi", "ひ", "ヒ"],
  ["hu", "ふ", "フ"],
  ["he", "へ", "ヘ"],
  ["ho", "ほ", "ホ"],
  ["ma", "ま", "マ"],
  ["mi", "み", "ミ"],
  ["mu", "む", "ム"],
  ["me", "め", "メ"],
  ["mo", "も", "モ"],
  ["ya", "や", "ヤ"],
  ["i", "い", "イ"],
  ["yu", "ゆ", "ユ"],
  ["e", "ぇ", "エ"],
  ["yo", "よ", "ヨ"],
  ["ra", "ら", "ラ"],
  ["ri", "り", "リ"],
  ["ru", "る", "ル"],
  ["re", "れ", "レ"],
  ["ro", "ろ", "ロ"],
  ["wa", "わ", "ワ"],
  ["i", "い", "イ"],
  ["u", "う", "ウ"],
  ["e", "え", "エ"],
  ["o", "を", "ヲ"],
  ["n", "ん", "ン"]];

private zhuo_yin = [
  ['ga', 'が', 'ガ'],
  ['gi', 'ぎ', 'ギ'],
  ['gu', 'ぐ', 'グ'],
  ['ge', 'げ', 'ゲ'],
  ['go', 'ご', 'ゴ'],
  ['za', 'ざ', 'ザ'],
  ['zi', 'じ', 'ジ'],
  ['zu', 'ず', 'ズ'],
  ['ze', 'ぜ', 'ゼ'],
  ['zo', 'ぞ', 'ゾ'],
  ['da', 'だ', 'ダ'],
  ['di', 'ぢ', 'ヂ'],
  ['zu', 'づ', 'ヅ'],
  ['de', 'で', 'デ'],
  ['do', 'ど', 'ド'],
  ['ba', 'ば', 'バ'],
  ['bi', 'び', 'ビ'],
  ['bu', 'ぶ', 'ブ'],
  ['be', 'べ', 'ベ'],
  ['bo', 'ぼ', 'ボ'],
  ['pa', 'ぱ', 'パ'],
  ['pi', 'ぴ', 'ピ'],
  ['pu', 'ぷ', 'プ'],
  ['pe', 'ぺ', 'ペ'],
  ['po', 'ぽ', 'ポ'],
];

private ao_yin = [
  ['kya', 'きゃ', 'キャ'],
  ['kyu', 'きゅ', 'キュ'],
  ['kyo', 'きょ', 'キョ'],
  ['sya', 'しゃ', 'シャ'],
  ['syu', 'しゅ', 'シュ'],
  ['syo', 'しょ', 'ショ'],
  ['cya', 'ちゃ', 'チャ'],
  ['cyu', 'ちゅ', 'チュ'],
  ['cyo', 'ちょ', 'チョ'],
  ['nya', 'にゃ', 'ニャ'],
  ['nyu', 'にゅ', 'ニュ'],
  ['nyo', 'にょ', 'ニョ'],
  ['hya', 'ひゃ', 'ヒャ'],
  ['hyu', 'ひゅ', 'ヒュ'],
  ['hyo', 'ひょ', 'ヒョ'],
  ['mya', 'みゃ', 'ミャ'],
  ['myu', 'みゅ', 'ミュ'],
  ['myo', 'みょ', 'ミョ'],
  ['rya', 'りゃ', 'リャ'],
  ['ryu', 'りゅ', 'リュ'],
  ['ryo', 'りょ', 'リョ'],
  ['gya', 'ぎゃ', 'ギャ'],
  ['gyu', 'ぎゅ', 'ギュ'],
  ['gyo', 'ぎょ', 'ギョ'],
  ['zya', 'じゃ', 'ジャ'],
  ['zyu', 'じゅ', 'ジュ'],
  ['zyo', 'じょ', 'ジョ'],
  ['bya', 'びゃ', 'ビャ'],
  ['byu', 'びゅ', 'ビュ'],
  ['byo', 'びょ', 'ビョ'],
  ['pya', 'ぴゃ', 'ピャ'],
  ['pyu', 'ぴゅ', 'ピュ'],
  ['pyo', 'ぴょ', 'ピョ'],

];

  constructor() {
    this.context = new AudioContext();
    this.loadSounds();
  }

  loadSounds() {
    this.basic_yin.forEach((e) => {
      let soundPath = `assets/${e[0]}.mp3`;
      this.loadToBuffer(soundPath)
    });
    this.zhuo_yin.forEach((e) => {
      let soundPath = `assets/${e[0]}.mp3`;
      this.loadToBuffer(soundPath)
    });
    this.ao_yin.forEach((e) => {
      let soundPath = `assets/${e[0]}.mp3`;
      this.loadToBuffer(soundPath)
    });
    this.loadToBuffer("assets/lesson01.mp3");
    this.loadToBuffer("assets/voc1.mp3");
  }

  loadToBuffer(path: string) {
    var request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "arraybuffer";

    let context = this.context;
    let buffers = this.buffers;
    request.onload = () => {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            alert('error decoding file data: ' + path);
            return;
          }
          buffers.set(path.split('/')[1].split('.')[0], buffer)
        },
        function (error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
    request.send();
  }

  play(name: string, when?:number, duration?:number) {
    let source = this.context.createBufferSource();
    source.buffer = this.buffers.get(name);
    source.connect(this.context.destination);
    
    if (when && duration) {
      source.start(0, when, duration)
    } else {
      source.start(0)
    }
  }

  getBasicSounds() {
    return this.basic_yin;
  }

  getZhuoSounds() {
    return this.zhuo_yin;
  }

  getAoSounds() {
    return this.ao_yin;
  }
}
