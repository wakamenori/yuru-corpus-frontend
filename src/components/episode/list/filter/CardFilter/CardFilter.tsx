import { useState } from 'react'
import styled from 'styled-components'

import { FilterConf } from '../../../../../hooks/use-card-filter'
import { ChannelNameChip } from '../../../../../feature/episode/components/detail/edit/ChannelNameChip/ChannelNameChip'
import { FilterButton } from '../FilterButton/FilterButton'

export type Props = {
  filterConf: FilterConf
}

const Container = styled.div`
  padding: 0.5rem;

  .chips {
    border-radius: 4px;
    border: 1px solid #d1d5db;
    padding: 0.5rem;
  }
`

export const CardFilter = ({ filterConf }: Props) => {
  const [openFilter, setOpenFilter] = useState(false)
  const toggleFilter = () => {
    setOpenFilter((prev) => !prev)
  }

  return (
    <Container>
      <FilterButton onClick={toggleFilter} />
      {openFilter && (
        <div className={'chips'}>
          <ChannelNameChip
            name='ゆる言語学ラジオ'
            isActive={filterConf.showGengo}
            onClick={filterConf.toggleGengo}
            size='small'
          />
          <ChannelNameChip
            name='ゆるコンピュータ科学ラジオ'
            isActive={filterConf.showCom}
            onClick={filterConf.toggleCom}
            size='small'
          />
          <ChannelNameChip
            name='ゆる天文学ラジオ'
            isActive={filterConf.showTenmon}
            onClick={filterConf.toggleTenmon}
            size='small'
          />
          <ChannelNameChip
            name='ゆる書道学ラジオ'
            isActive={filterConf.showShodo}
            onClick={filterConf.toggleShodo}
            size='small'
          />
          <ChannelNameChip
            name='ゆる生態学ラジオ'
            isActive={filterConf.showSeitai}
            onClick={filterConf.toggleSeitai}
            size='small'
          />
          <ChannelNameChip
            name='ゆる哲学ラジオ'
            isActive={filterConf.showTetsugaku}
            onClick={filterConf.toggleTetsugaku}
            size='small'
          />
          <ChannelNameChip
            name='ゆる音楽学ラジオ'
            isActive={filterConf.showOngaku}
            onClick={filterConf.toggleOngaku}
            size='small'
          />
          <ChannelNameChip
            name='ゆる民俗学ラジオ'
            isActive={filterConf.showMinzoku}
            onClick={filterConf.toggleMinzoku}
            size='small'
          />
        </div>
      )}
    </Container>
  )
}
