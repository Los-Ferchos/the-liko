import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RoundedIcon from '../icons/RoundedIcon';
import { FaStore, FaMoneyBillWave, FaShoppingBag, FaMoneyCheck} from "react-icons/fa";

const AdvantagesSection = () => {
  const advantages = [
    { icon: <RoundedIcon icon={FaStore} />, number: "10.5", title: "Sellers active on our site" },
    { icon: <RoundedIcon icon={FaMoneyBillWave} />, number: "5", title: "Different payment methods" },
    { icon: <RoundedIcon icon={FaShoppingBag} />, number: "3", title: "Customers active on our site" },
    { icon: <RoundedIcon icon={FaMoneyCheck} />, number: "4", title: "Annual gross sale on our site" },
  ];

  return (
    <Box mt={24}>
      <Typography mb={24} variant="h4" textAlign="center" color="primary" style={{ fontWeight: 'bold' }}>
        Advantages of The Liko
      </Typography>
      <Grid container spacing={6}>
        {advantages.map((advantage, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="advantage-box">
              <CardContent>
                <Box p={8} textAlign="center">
                  <div style={{ marginTop: 4, height: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {advantage.icon}
                  </div>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold', marginTop: 12 }}>
                    {advantage.number}
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 'normal' }}>
                    {advantage.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdvantagesSection;
