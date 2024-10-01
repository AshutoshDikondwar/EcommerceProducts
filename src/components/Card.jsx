import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';


export default function ActionAreaCard({ image, title, price, description }) {
    return (
        <Card sx={{ maxWidth: 345, margin: 2, maxHeight: 400 }}>
            <CardActionArea>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 150,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                        sx={{ width: 150, height: 150 }}
                    />
                </Box>
                <CardContent>

                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description.length > 50 ? `${description.substring(0, 50)}...` : description}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        ${price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}