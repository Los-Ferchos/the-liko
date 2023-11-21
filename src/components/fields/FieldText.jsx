import { Grid, TextField } from '@mui/material'
import React from 'react'

const FieldText = (
    { label, name, type, value, onChange, required = true, fullWidth = true, multiline, rows = 1, select, children }
) => {
  return (
    <Grid item xs={12} sm={12}>
        <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        fullWidth={fullWidth}
        style={{ marginTop: 24 }}
        multiline={multiline}
        rows={rows}
        select={select}
        variant='outlined'
        SelectProps={{
          MenuProps: {
              style: {
                display: "block"
              },
          },
        }}
      >
        {children}
    </TextField>
    </Grid>
  )
}

export default FieldText