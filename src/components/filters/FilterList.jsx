import React, { useState } from 'react';
import { Divider, List, ListItemText, ListSubheader, Typography } from '@mui/material';
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
                <Typography sx={{fontWeight:'800', fontSize:'1.4rem', display:'flex', justifyContent:'center', color:'var(--main-color)'}} component="div" id="nested-list-subheader">
                Sort By
                </Typography>
            <Divider sx={{marginBottom:'.5rem'}}/>
                <FilterItem children='Popularity ' sortWay={5} icon={SellIcon}  subtext1='Most Popular' subtext2='Less Popular'/>
                <FilterItem children='Name ' sortWay={1} icon={SortByAlphaIcon} subtext1='Z-A' subtext2='A-Z'/>
                <FilterItem children='Price ' sortWay={2} icon={AttachMoneyIcon} subtext1='High - Low' subtext2='Low - High' />
                <FilterItem children='Rating ' sortWay={3} icon={StarIcon} subtext1='High Rating' subtext2='Less Rating' />
                <FilterItem children='Reviews ' sortWay={4} icon={ReviewsIcon} subtext1='High - Low' subtext2='Low - High' />

                <ListSubheader sx={{fontWeight:'800', fontSize:'1.4rem', display:'flex', justifyContent:'center', marginTop:'.5rem', color:'var(--main-color)' }} component="div" id="nested-list-subheader">
                Filter By
                </ListSubheader>
                <Divider sx={{marginBottom:'.5rem'}}/>

                <FilterItem children='Price Range ' sortWay={1} range={true} icon={PaidOutlinedIcon}  subtext1='Most Popular' subtext2='Less Popular'/>
                <FilterItem children='Rating ' sortWay={2} range={true} icon={StarsIcon} subtext1='A-Z'  subtext2='Z-A' max={5}/>
                <FilterItem children='ABV ' sortWay={3} range={true} icon={LocalBarIcon} subtext1='High - Low' subtext2='Low - High' />
        </>
    );
};

export default FilterList;