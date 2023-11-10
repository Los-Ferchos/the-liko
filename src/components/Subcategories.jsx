import { useAppSelector } from './hooks/store';
import { Grid, Typography, Link } from '@mui/material';

function Subcategories({id}) {
    const subcategories = useAppSelector((state) => state.subcategories.subcategories);

    const filteredSubcategories = subcategories.filter(subcategory => subcategory.category === id);

    if (filteredSubcategories.length === 0) {
        return (
          <div>
          </div>
        );
      }
    return(
        
        <Grid container>
            {filteredSubcategories.map((subcategory, index) => (
                <Grid item key={index} xs={12} md={3} lg={3}
                container alignItems={"center"} justifyContent={"center"} 
                marginTop={5} marginBottom={5}>
                    <Typography color="black" className='active-link'>
                        <Link to={`/${subcategory.name.toLowerCase()}`}>{subcategory.name}</Link>
                    </Typography>
                </Grid> 
            ))
            }
            <Grid item key={50} xs={12} md={3} lg={3}
            container alignItems={"center"} justifyContent={"center"}
            marginTop={5} marginBottom={5}>
                    <Typography color="black" className='active-link'>
                        <Link to={`/products`}>All</Link>
                    </Typography>
            </Grid> 
        </Grid>
    )
}
export default Subcategories