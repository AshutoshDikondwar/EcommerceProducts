import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ProductModal({ open, handleClose, product }) {
    if (!product) return null;

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); 
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>{product.title}</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {[...Array(3)].map((_, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{
                                    width: '300px',
                                    height: '300px',
                                    marginBottom: 1,
                                    display: currentIndex === index ? 'block' : 'none', 
                                }}
                            />
                        ))}
                    </div>
                    <IconButton onClick={handleNext} disabled={currentIndex === 2}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Price: ${product.price}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </Typography>

                
                <div className="flex justify-around mt-4">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="w-[200px] mx-2"
                        onClick={() => alert('Added to cart!')} 
                    >
                        Add to Cart
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="w-[200px]mx-2"
                        onClick={() => alert('Proceed to checkout!')}
                    >
                        Buy Now
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"  sx={{width:200}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
