import React, { useRef } from 'react'

// MUI stuff
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const SelectStatus = ({ status, handleInputChange }) => {
  const inputLabel = useRef(null)

  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Status
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={status}
        onChange={handleInputChange('status')}
        fullWidth
      >
        <MenuItem value="Applied">Applied</MenuItem>
        <MenuItem value="Phone Screen">Phone Screen</MenuItem>
        <MenuItem value="Code Challenge">Code Challenge</MenuItem>
        <MenuItem value="Interview">Interview</MenuItem>
        <MenuItem value="Declined">Declined</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectStatus
