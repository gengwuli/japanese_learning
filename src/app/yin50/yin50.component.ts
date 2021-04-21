import { Component, OnInit } from '@angular/core';
import { SoundService } from '../sound.service';



@Component({
  selector: 'app-yin50',
  templateUrl: './yin50.component.html',
  styleUrls: ['./yin50.component.css']
})
export class Yin50Component implements OnInit {
   private basic_yin = [["a", "あ", "ア",41, 0.8],
   ["i", "い", "イ", 41.8, 0.5],
   ["u", "う", "ウ", 42.3, 0.5],
   ["e", "え", "エ",42.8, 0.7],
   ["o", "お", "オ", 43.5, 0.7],
   ["ka", "か", "カ", 45, 0.7],
   ["ki", "き", "キ", 45.7, 0.7],
   ["ku", "く", "ク",46.4, 0.7],
   ["ke", "け", "ケ",47.1, 0.7],
   ["ko", "こ", "コ",47.8, 0.7],
   ["sa", "さ", "サ", 49.0, 0.7],
   ["si", "し", "シ", 49.9, 0.7],
   ["su", "す", "ス", 50.4, 0.7],
   ["se", "せ", "セ", 51.1, 0.7],
   ["so", "そ", "ソ", 51.8, 0.7],
   ["ta", "た", "タ", 53.0,0.7],
   ["ci", "ち", "チ", 53.9,0.7],
   ["cu", "つ", "ツ", 54.4,0.7],
   ["te", "て", "テ", 55.3,0.7],
   ["to", "と", "ト", 56,0.7],
   ["na", "な", "ナ", 57.5,0.7],
   ["ni", "に", "ニ", 58.2,0.7],
   ["nu", "ぬ", "ヌ",58.9,0.7],
   ["ne", "ね", "ネ",59.6,0.6],
   ["no", "の", "ノ",60.3,0.7],
   ["ha", "は", "ハ", 61.5,0.7],
   ["hi", "ひ", "ヒ", 62.2,0.7],
   ["hu", "ふ", "フ", 62.9,0.7],
   ["he", "へ", "ヘ", 63.6,0.7],
   ["ho", "ほ", "ホ", 64.3,0.7],
   ["ma", "ま", "マ", 65.8,0.7],
   ["mi", "み", "ミ", 66.5,0.7],
   ["mu", "む", "ム", 67.2,0.7],
   ["me", "め", "メ", 67.9,0.7],
   ["mo", "も", "モ", 68.6,0.7],
   ["ya", "や", "ヤ", 69.8,0.7],
   ["i", "い", "イ", 70.5,0.7],
   ["yu", "ゆ", "ユ", 71.2,0.7],
   ["e", "ぇ", "エ", 71.9,0.7],
   ["yo", "よ", "ヨ", 72.6,0.7],
   ["ra", "ら", "ラ", 73.8,0.7],
   ["ri", "り", "リ", 74.5,0.7],
   ["ru", "る", "ル", 75.2,0.7],
   ["re", "れ", "レ", 75.9,0.7],
   ["ro", "ろ", "ロ", 76.6,0.7],
   ["wa", "わ", "ワ", 77.8,0.7],
   ["i", "い", "イ", 78.5,0.7],
   ["u", "う", "ウ", 79.2,0.7],
   ["e", "え", "エ", 79.9,0.7],
   ["o", "を", "ヲ", 80.6,0.7],
   ["n", "ん", "ン",81.6,0.7]];

   private zhuo_yin = [
    ['ga', 'が', 'ガ', 177.3,0.9],
    ['gi', 'ぎ', 'ギ', 178.2,0.9],
    ['gu', 'ぐ', 'グ', 179.1,0.9],
    ['ge', 'げ', 'ゲ', 180.0,0.9],
    ['go', 'ご', 'ゴ', 180.9,0.9],
    ['za', 'ざ', 'ザ', 182.5,0.9],
    ['zi', 'じ', 'ジ', 183.4,0.9],
    ['zu', 'ず', 'ズ', 184.3,0.9],
    ['ze', 'ぜ', 'ゼ', 185.2,0.9],
    ['zo', 'ぞ', 'ゾ', 186.1,0.9],
    ['da', 'だ', 'ダ', 188.0,0.9],
    ['di', 'ぢ', 'ヂ', 188.9,0.9],
    ['zu', 'づ', 'ヅ', 189.8,0.9],
    ['de', 'で', 'デ', 190.7,0.9],
    ['do', 'ど', 'ド', 191.6,0.9],
    ['ba', 'ば', 'バ', 193.4,0.9],
    ['bi', 'び', 'ビ', 194.3,0.9],
    ['bu', 'ぶ', 'ブ', 195.2,0.9],
    ['be', 'べ', 'ベ', 196.1,0.9],
    ['bo', 'ぼ', 'ボ', 197.0,0.9],
    ['pa', 'ぱ', 'パ', 198.4,0.9],
    ['pi', 'ぴ', 'ピ', 199.3,0.9],
    ['pu', 'ぷ', 'プ', 200.2,0.9],
    ['pe', 'ぺ', 'ペ', 201.1,0.9],
    ['po', 'ぽ', 'ポ', 202.0,0.9],
  ];

  private ao_yin = [
    ['kya', 'きゃ', 'キャ', 123.0,1.0],
    ['kyu', 'きゅ', 'キュ', 124.0,1.0],
    ['kyo', 'きょ', 'キョ', 125.0,1.0],
    ['sya', 'しゃ', 'シャ', 126.5,1.0],
    ['syu', 'しゅ', 'シュ', 127.5,1.0],
    ['syo', 'しょ', 'ショ', 128.5,1.0],
    ['cya', 'ちゃ', 'チャ', 129.8,1.0],
    ['cyu', 'ちゅ', 'チュ', 130.8,0.9],
    ['cyo', 'ちょ', 'チョ', 131.7,1.0],
    ['nya', 'にゃ', 'ニャ', 133.5,1.0],
    ['nyu', 'にゅ', 'ニュ', 134.5,1.0],
    ['nyo', 'にょ', 'ニョ', 135.5,1.0],
    ['hya', 'ひゃ', 'ヒャ', 136.5,1.0],
    ['hyu', 'ひゅ', 'ヒュ', 137.5,1.0],
    ['hyo', 'ひょ', 'ヒョ', 138.5,1.0],
    ['mya', 'みゃ', 'ミャ', 140.0,1.0],
    ['myu', 'みゅ', 'ミュ', 141.0,1.0],
    ['myo', 'みょ', 'ミョ', 142.0,1.0],
    ['rya', 'りゃ', 'リャ', 143.8,1.0],
    ['ryu', 'りゅ', 'リュ', 144.8,0.9],
    ['ryo', 'りょ', 'リョ', 145.8,1.0],
    ['gya', 'ぎゃ', 'ギャ', 204.0,1.0],
    ['gyu', 'ぎゅ', 'ギュ', 205.0,1.0],
    ['gyo', 'ぎょ', 'ギョ', 206.0,1.0],
    ['zya', 'じゃ', 'ジャ', 208.0,1.0],
    ['zyu', 'じゅ', 'ジュ', 209.0,1.0],
    ['zyo', 'じょ', 'ジョ', 210.0,1.0],
    ['bya', 'びゃ', 'ビャ', 212.0,1.0],
    ['byu', 'びゅ', 'ビュ', 213.0,1.0],
    ['byo', 'びょ', 'ビョ', 214.0,1.0],
    ['pya', 'ぴゃ', 'ピャ', 215.6,1.0],
    ['pyu', 'ぴゅ', 'ピュ', 216.6,1.0],
    ['pyo', 'ぴょ', 'ピョ', 217.6,1.0],
  
  ];

  constructor( public soundService: SoundService) {}

  ngOnInit(): void {

  }

  playYin(yin: any) {
    this.soundService.play('pre', yin[3], yin[4]); 
  }

  getBasicYin() {
    return this.basic_yin;
  }


  getZhuoYin() {
    return this.zhuo_yin;
  }

  getAoYin() {
    return this.ao_yin;
  }

}