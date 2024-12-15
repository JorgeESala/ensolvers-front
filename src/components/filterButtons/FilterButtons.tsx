import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

interface FilterButtonsProps {
  onFilterAll: () => void;
  onFilterActive: () => void;
  onFilterArchived: () => void;
  activeFilter: string;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({
  onFilterAll,
  onFilterActive,
  onFilterArchived,
  activeFilter
}) => {
  return (
    <ButtonGroup className='d-block'>
        <Button className={activeFilter==='all'? 'active' : ''} id='allButton' onClick={onFilterAll} variant='primary'>All</Button>
        <Button className={activeFilter==='active'? 'active' : ''} id='activeButton' onClick={onFilterActive} variant='primary'>Active</Button>
        <Button className={activeFilter==='archived'? 'active' : ''} id='archivedButton' onClick={onFilterArchived} variant='primary'>Archived</Button>
    </ButtonGroup>
  )
}

export default FilterButtons;