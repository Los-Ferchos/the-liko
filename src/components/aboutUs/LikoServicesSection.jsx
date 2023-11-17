/**
 * A React component displaying Liko's services with icons and titles.
 * @component
 */
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RoundedIcon from '../icons/RoundedIcon';
import { FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa";

/**
 * LikoServicesSection component displays a set of services with icons and titles.
 * @returns {JSX.Element} The React component for displaying Liko's services.
 */
const LikoServicesSection = () => {
  const services = [
    { icon: <RoundedIcon icon={FaShippingFast} />, title: "INFORMATION AND RECOMMENDATION", ReportBody: "" },
    { icon: <RoundedIcon icon={FaHeadset} />, title: "24/7 CUSTOMER SERVICE" },
    { icon: <RoundedIcon icon={FaShieldAlt} />, title: "PREPARATION OF EACH BEVERAGE" },
  ];

  return (
    <Box mt={24}>
      <Typography marginBottom={24} variant="h4" textAlign="center" color="black" style={{ fontWeight: 'bold' }}>
        The Liko Services
      </Typography>
      <Grid container spacing={6}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="advantage-box">
              <CardContent>
                <Box p={8} textAlign="center">
                  <div style={{ marginTop: 4, height: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {service.icon}
                  </div>
                  <Typography marginTop={12} variant="body1" style={{ fontWeight: 'normal' }}>
                    {service.title}
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

export default LikoServicesSection;
