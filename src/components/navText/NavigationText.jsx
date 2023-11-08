import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavigationText = ({ inactivePath = [{ title: "", href: "" }], activePath = "" }) => {
  return (
    <Box display='flex'>
        {
            inactivePath.map(path => (
                <Typography className='inactive-link'>
                    <Link to={path.href}>{path.title}</Link>
                    &nbsp;/&nbsp;
                </Typography>
            ))
        }
        <Typography color="black">{activePath}</Typography>
    </Box>
  )
}

export default NavigationText