import React from 'react'
import '../../assets/styles/bottleLoader.css'

/**
 * A React component that displays a bottle-shaped loader.
 *
 * @return {React.Component} A React component representing the bottle loader.
 */
function bottleLoader() {
  return (
        <div className="loader-container center" style={{ position: 'center' }}>
        <div className="loader" style={{ position: 'center' }}></div>
        </div>
  )
}

export default bottleLoader