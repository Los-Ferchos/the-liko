import { useAppSelector } from './hooks/store';
import { Grid } from '@mui/material';
import { getHyphenedString } from '../utils/methods';
import CustomLink from './links/CustomLink';

function Subcategories({ category = { _id: "", name: "" } }) {
    const subcategories = useAppSelector((state) => state.subcategories.subcategories);

    const filteredSubcategories = subcategories.filter(subcategory => subcategory.category === category._id);
    if(filteredSubcategories.length > 0){
        filteredSubcategories.push({ name: "All" })
    }

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
                    <CustomLink
                        href={`/${getHyphenedString(category.name)}/${getHyphenedString(subcategory.name)}`}
                        title={subcategory.name}
                    />
                </Grid> 
            ))
            }
        </Grid>
    )
}
export default Subcategories