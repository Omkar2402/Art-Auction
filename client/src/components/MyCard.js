
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MyCard = ({ ad, dashCard, cardStyle }) => {
  return (
    <Card sx={cardStyle}>
      {/* Existing card content */}
      <CardContent>
        <Typography variant="h6" component="div">
          {ad.productName}
        </Typography>
        {/* ... Other card details ... */}
      </CardContent>

      {/* New image tag */}
      {ad.image && (
        <CardMedia
          component="img"
          alt={ad.productName}
          height="140"
          image={ad.image} // Assuming ad.image contains the URL of the painting image
        />
      )}
    </Card>
  );
};

export default MyCard;
