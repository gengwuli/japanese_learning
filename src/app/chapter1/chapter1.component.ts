import { Component, OnInit } from '@angular/core';
import { SoundService } from '../sound.service';

export interface Word {
  content: string,
  start: number,
  duration: number
}


export interface Line {
  word: string,
  tags: Array<Array<string>>,
  start: number,
  duration: number
}

const WORD_DATA: Word[] = [
  { content: 'ちゅうごくじん（中国人）[名] 中国人', start: 0.1, duration: 2 },
  { content: 'にほんじん（日本人）[名] 日本人', start: 2, duration: 2 },
  { content: 'かんこくじん（韓国人）[名] 韩国人', start: 4, duration: 2 },
  { content: 'アメリカじん [名] 美国人', start: 6, duration: 2 },
  { content: 'フランスじん [名] 法国人', start: 8, duration: 2 },
  { content: 'がくせい（学生）[名] （大）学生', start: 10, duration: 2 },
  { content: 'せんせい（先生）[名] 老师', start: 12, duration: 2 },
  { content: 'りゅうがくせい（留学生）[名] 留学生', start: 14, duration: 2 },
  { content: 'きょうじゅ（教授）[名] 教授', start: 16, duration: 1.8 },
  { content: 'しゃいん（社員）[名] 职员', start: 18, duration: 1 },
  { content: 'かいしゃいん（会社員）[名] 公司职员', start: 19, duration: 2 },
  { content: 'てんいん（店員）[名] 店员', start: 21, duration: 2 },
  { content: 'けんしゅうせん（研修生）[名] 进修生', start: 23, duration: 2 },
  { content: 'きぎょう（企業）[名] 企业', start: 25, duration: 1 },
  { content: 'だいがく（大学）[名] 大学', start: 26, duration: 2 },
  { content: 'ちち（父）[名] （wo）父亲', start: 28, duration: 1 },
  { content: 'かちょう（課長）[名] 科长', start: 30, duration: 2 },
  { content: 'しゃちょう（社長）[名] 总经理，社长', start: 32, duration: 1 },
  { content: 'でむかえ（出迎え）[名] 迎接', start: 33, duration: 2 },
  { content: 'あのひと（あの人）[名] 那个人', start: 35, duration: 2 },
  { content: 'わたし [代] 我', start: 37, duration: 2 },
  { content: 'あなた [代] 你', start: 39, duration: 2 },
  { content: 'どうも [副] 非常，很', start: 41, duration: 2 },
  { content: 'はい [叹] 哎，是（答应）；是的', start: 43, duration: 1 },
  { content: 'いいえ [叹] 不，不是', start: 44, duration: 2 },
  { content: 'あつ [叹] 哎，哎呀', start: 46, duration: 1 },
  { content: 'り（李）[专] 李', start: 48, duration: 2 },
  { content: 'おう（王）[专] 王', start: 50, duration: 1 },
  { content: 'ちょう（張）[专] 张', start: 51, duration: 1 },
  { content: 'もり（森）[专] 森', start: 52, duration: 2 },
  { content: 'はやし（林）[专] 林', start: 54, duration: 2 },
  { content: 'おの（小野）[专] 小野', start: 56, duration: 1 },
  { content: 'よしだ（吉田）[专] 吉田', start: 57, duration: 2 },
  { content: 'たなか（田中）[专] 田中', start: 59, duration: 2 },
  { content: 'なかむら（中村）[专] 中村', start: 61, duration: 2 },
  { content: 'たろう（太郎）[专] 太郎', start: 63, duration: 1 },
  { content: 'キム（金）[专] 金', start: 64, duration: 1 },
  { content: 'デコポン [专] 迪蓬', start: 66, duration: 1 },
  { content: 'スミス [专] 史密斯', start: 67, duration: 2 },
  { content: 'ジョンソン [专] 约翰逊', start: 69, duration: 2 },
  { content: 'ちゅうごく（中国）[专] 中国', start: 71, duration: 2 },
  { content: 'とうきょうだいがく（東京大学）[专] 东京大学', start: 73, duration: 2 },
  { content: 'ペキンだいがく（北京大学）[专] 北京大学', start: 75, duration: 2 },
  { content: 'ジエーシーきかく（JC企画）[专] JC策划公司', start: 77, duration: 3 },
  { content: 'ペキンりょこうしゃ（北京旅行社）[专] 北京旅行社', start: 79.5, duration: 3 },
  { content: 'につちょうしょうじ（日中商事）[专] 日中商社', start: 82, duration: 3 },
  { content: 'こんにちは 你好', start: 85, duration: 2 },
  { content: 'すみません 对不起，请问', start: 87, duration: 1.5 },
  { content: 'どうぞ 请', start: 88.5, duration: 1.5 },
  { content: 'よろしくおねがいします（よろしくお願いします）请多关照', start: 90, duration: 2 },
  { content: 'はじめまして 初次见面', start: 92, duration: 2 },
  { content: 'こちらこそ 我才要（请您~）', start: 94, duration: 2 },
  { content: 'そうです 是（这样）', start: 96, duration: 1.5 },
  { content: 'ちがいます 不是', start: 97.5, duration: 2 },
  { content: 'わかりません（分かりません）不知道', start: 99.5, duration: 2 },
  { content: 'どうもすみません 实在对不起', start: 101.5, duration: 2 },
  { content: '〜ちん　〜ちゃん　〜君（くん）', start: 104.5, duration: 4 },
];

const headers: Line[] =  [
  {word: "李さんは中国人です", tags: [["中国人", "ちゅうごくじん"], ["李", "り"]], start: 44, duration: 3}
  ,{word: "森さんは学生では　ありません", tags: [["森", "もり"], ["学生", "がくせい"]], start: 49, duration: 4}
,{word: "林さんは日本人ですか", tags: [["林", "はやし"], ["日本人", "にほんじん"]], start: 55, duration: 4}
,{word: "李さんは JC企画 の　社員です", tags: [["李", "り"], ["JC企画", "ジエーツーきかく"], ["社員", "しやいん"]], start: 61, duration: 5}
//   ["森さんは学生では　ありません", [["森", "もり"], ["学生", "がくせい"]], 49, 4],
// ["林さんは日本人ですか", [["林", "はやし"], ["日本人", "にほんじん"]], 55, 4],
// ["李さんは JC企画 の　社員です", [["李", "り"], ["JC企画", "ジエーツーきかく"], ["社員", "しやいん"]], 61, 5]

];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.component.html',
  styleUrls: ['./chapter1.component.css']
})
export class Chapter1Component implements OnInit {

  words = WORD_DATA
  headers = headers
  constructor(public soundService: SoundService) { }


  ngOnInit(): void {
  }

  play(when: number, duration: number) {
    this.soundService.play('lesson01', when, duration)
  }

  playWord(when: number, duration: number) {
    this.soundService.play('voc1', when, duration)
  }
}
