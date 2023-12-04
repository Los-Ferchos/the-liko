import { Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getHyphenedString } from '../../utils/methods';
import { useState, useEffect } from 'react';
import { setSearch, setSearchText } from '../../store/searchSlice';
import { useDispatch } from 'react-redux';

/**
 * CustomLink is a component that renders a styled link with optional click and mouse enter events.
 *
 * @param {Object} props - The properties of the component.
 * @param {function} [props.onClick=() => {}] - The function to be called when the link is clicked.
 * @param {function} [props.onMouseEnter=() => {}] - The function to be called when the mouse enters the link.
 * @param {string} [props.href=""] - The destination URL for the link.
 * @param {string} [props.title=""] - The text content of the link.
 * @param {string} [props.variant="subtitle1"] - The typography variant for the link.
 * @param {string} [props.comparePath=""] - The path used for comparison to determine if the link is active.
 * @returns {JSX.Element} - Rendered CustomLink component.
 */
const CustomLink = ({
  onClick = () => {},
  onMouseEnter = () => {},
  href = "",
  title = "",
  variant = "subtitle1",
  comparePath = getHyphenedString(title),
}) => {
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const lastPart = pathnameParts[pathnameParts.length - 1];
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    dispatch(setSearchText(e.target.value))
  };

  useEffect(() => {
    if (hasSearched) {
      handleChangeSearch({ target: { value: '' } });
    } else {
      setHasSearched(true);
    }
  }, [hasSearched]);

  return (
    <Typography
      variant={variant}
      color={lastPart === comparePath && lastPart !== "" ? "primary" : "black"}
      className='active-link'
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <Link to={href}>{title}</Link>
    </Typography>
  );
};

export default CustomLink;
