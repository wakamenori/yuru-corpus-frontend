import { Meta, Story } from '@storybook/react'

import { CardFilter, Props } from './CardFilter'

export default {
  title: 'components/CardFilter',
  component: CardFilter,
} as Meta<Props>

const Template: Story<Props> = (args) => <CardFilter {...args} />

export const Example = Template.bind({})
Example.args = {
  filterConf: {
    showGengo: true,
    showCom: true,
    showTenmon: true,
    showShodo: true,
    showSeitai: true,
    showTetsugaku: true,
    showOngaku: true,
    showMinzoku: true,
    showGakuto: true,
    showOthers: true,

    toggleGengo: () => {},
    toggleCom: () => {},
    toggleTenmon: () => {},
    toggleShodo: () => {},
    toggleSeitai: () => {},
    toggleTetsugaku: () => {},
    toggleOngaku: () => {},
    toggleMinzoku: () => {},
    toggleGakuto: () => {},
    toggleOthers: () => {},
  },
}
