import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const Program = ({ handleInputChange, program }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Program</FormLabel>
      <RadioGroup
        defaultValue={program}
        aria-label="program"
        name="customized-radios"
        value={program}
        onChange={handleInputChange('program')}
      >
        <FormControlLabel
          value="full stack"
          control={<Radio />}
          label="Full Stack"
        />
        <FormControlLabel value="ux/ui" control={<Radio />} label="UX/UI" />
      </RadioGroup>
    </FormControl>
  )
}

export default Program
