import React, { useState } from 'react';
import { Divider, List, ListSubheader } from '@mui/material';
import '../../assets/styles/filter.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SellIcon from '@mui/icons-material/Sell';
import FilterItem from './FilterItem';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ClearIcon from '@mui/icons-material/Clear';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import LocalBarIcon from '@mui/icons-material/LocalBar';



const FilterList = () => {

    return (
        <>
        <ClearIcon sx={{marginLeft:'.7rem', marginTop:'.5rem', cursor:'pointer'}}/>
         <List
            sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader sx={{fontWeight:'800', fontSize:'1.4rem', display:'flex', justifyContent:'center', color:'var(--main-color)'}} component="div" id="nested-list-subheader">
                Sort By
                </ListSubheader>
            }
        >
            <Divider sx={{marginBottom:'.5rem'}}/>
                <FilterItem children='Popularity ' icon={SellIcon}  subtext1='Most Popular' subtext2='Less Popular'/>
                <FilterItem children='Name ' icon={SortByAlphaIcon} subtext1='A-Z' subtext2='Z-A'/>
                <FilterItem children='Price ' icon={AttachMoneyIcon} subtext1='High - Low' subtext2='Low - High' />
                <FilterItem children='Rating ' icon={StarIcon} subtext1='High Rating' subtext2='Less Rating' />
                <FilterItem children='Reviews ' icon={ReviewsIcon} subtext1='High - Low' subtext2='Low - High' />
                </List>


                <ListSubheader sx={{fontWeight:'800', fontSize:'1.4rem', display:'flex', justifyContent:'center', marginTop:'.5rem', color:'var(--main-color)' }} component="div" id="nested-list-subheader">
                Filter By
                </ListSubheader>
                <Divider sx={{marginBottom:'.5rem'}}/>

                <FilterItem children='Price Range ' range={true} icon={PaidOutlinedIcon}  subtext1='Most Popular' subtext2='Less Popular'/>
                <FilterItem children='Rating ' range={true} icon={StarsIcon} subtext1='A-Z' subtext2='Z-A' max={5}/>
                <FilterItem children='ABV ' range={true} icon={LocalBarIcon} subtext1='High - Low' subtext2='Low - High' />
        </>
    );
};

export default FilterList;