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

const hostSpeakers = ['水野', '堀元']
const guestSpeakers = ['嶋村', '福田', '今井', '黒島', '武藤', '他']

export { SpeakerColorGenerator, hostSpeakers, guestSpeakers }
