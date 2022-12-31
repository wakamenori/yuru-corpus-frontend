export type Speaker = {
  [key: string]: { fullName: string }
}

const allSpeakers: { [key: string]: Speaker } = {
  ゆる言語学ラジオ: { 水野: { fullName: '水野 大貴' }, 堀元: { fullName: '堀元 見' } },
  監修者: {
    嶋村: { fullName: '嶋村 貢志' },
    福田: { fullName: '福田 純也' },
    黒島: { fullName: '黒島 規史' },
  },
  ゲスト: {
    武藤: { fullName: '武藤' },
    今井: { fullName: '今井 むつみ' },
    高野: { fullName: '高野 秀行' },
    その他: { fullName: 'その他' },
  },
  'ゆる天文学/書道学ラジオ': {
    越山: { fullName: '越山 嘉祈' },
    夏生: { fullName: '夏生 嵐彩' },
  },
  'ゆる音楽学/民俗学ラジオ': {
    よしのぶ: { fullName: 'よしのぶ' },
    平田: { fullName: '平田 トキヒロ' },
  },
  'ゆる哲学/生態学ラジオ': {
    黒川: { fullName: '黒川' },
    浦下: { fullName: '浦下' },
  },
}

type SpeakerColor = {
  [key: string]: { backgroundColor: string; color: string }
}

const hostSpeakerColors: SpeakerColor = {
  水野: { backgroundColor: '#E7DBD0', color: '#374151' },
  堀元: { backgroundColor: '#3F3D48', color: '#FFFFFF' },
}

const guestSpeakerColors: SpeakerColor = {
  0: { backgroundColor: '#6E7F62', color: '#FFFFFF' },
  1: { backgroundColor: '#4E6F77', color: '#FFFFFF' },
  2: { backgroundColor: '#2D5F8B', color: '#FFFFFF' },
  3: { backgroundColor: '#3F3D48', color: '#FFFFFF' },
  4: { backgroundColor: '#2D5F8B', color: '#FFFFFF' },
  5: { backgroundColor: '#3F3D48', color: '#FFFFFF' },
}

class SpeakerColorGenerator {
  private guestSpeakersNumber: number = 0

  getSpeakerColor(speakerName: string) {
    let color = { backgroundColor: '#D1D5DB', color: '#FFF' }
    if (Object.keys(hostSpeakerColors).includes(speakerName)) {
      color = hostSpeakerColors[speakerName]
    } else if (speakerName !== '') {
      color = guestSpeakerColors[this.guestSpeakersNumber]
      this.guestSpeakersNumber += 1
    }
    return color
  }
}

export { SpeakerColorGenerator, allSpeakers }
