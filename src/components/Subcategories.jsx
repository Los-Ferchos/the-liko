import { Link } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { Grid, Typography } from '@mui/material';
import { getHyphenedString } from '../utils/methods';

function Subcategories({ category = { _id: "", name: "" } }) {
    const subcategories = useAppSelector((state) => state.subcategories.subcategories);

    const filteredSubcategories = subcategories.filter(subcategory => subcategory.category === category._id);

    if (filteredSubcategories.length === 0) {
        return (
          <div>
          </div>
        );
      }
    return(
        
        <Grid container>
            {filteredSubcategories.map((subcategory, index) => (
                <Grid 
                    item 
                    key={index} 
                    xs={12} md={3} lg={3}
                    container 
                    alignItems={"center"} 
                    justifyContent={"center"} 
                    marginTop={5} 
                    marginBottom={5}
                >
                        <Link 
                            to={`/${getHyphenedString(category.name)}/${getHyphenedString(subcategory.name)}`}
                        >
                            <Typography color="black" className='active-link'>
                                {subcategory.name}
                            </Typography>
                        </Link>
                </Grid> 
            ))
            }
            <Grid item key={50} xs={12} md={3} lg={3}
            container alignItems={"center"} justifyContent={"center"}
            marginTop={5} marginBottom={5}>
                    <Link to={`/${getHyphenedString(category.name)}/all`}>
                        <Typography color="black" className='active-link'>
                            All
                        </Typography>
                    </Link>
            </Grid> 
        </Grid>
    )
}
export default Subcategories