import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Displays navigation text with active and inactive links.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.inactivePath - An array of objects representing inactive links with titles and hrefs.
 * @param {string} props.activePath - The title of the active link.
 * 
 * @returns {JSX.Element} Rendered NavigationText component.
 */
const NavigationText = ({ inactivePath = [{ title: "", href: "" }], activePath = "" }) => {
  return (
    <Box display='flex'>
        {
            inactivePath.map(path => (
                <Typography color="gray" key={path.title} style={{ color: "#444" }}>
                    <Link to={path.href} className='inactive-link'>{path.title}</Link>
                    &nbsp;/&nbsp;
                </Typography>
            ))
        }
        <Typography color="black">{activePath}</Typography>
    </Box>
  )
}

export default NavigationText