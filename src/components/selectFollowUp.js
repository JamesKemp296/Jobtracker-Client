import React, { useRef } from 'react'

// MUI stuff
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const SelectStatus = ({ type, handleFollowChange }) => {
  const inputLabel = useRef(null)

  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Type
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={type}
        onChange={handleFollowChange('type')}
        fullWidth
      >
        <MenuItem value="Phone">Phone</MenuItem>
        <MenuItem value="E-Mail">E-Mail</MenuItem>
        <MenuItem value="In Person">In Person</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectStatus
