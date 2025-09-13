//this component is not used now, and it is saved for later use

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function DataCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='className="h-screen flex items-center justify-center rtl " style={{direction:"rtl"}}'>
      <Box  >
        <Card
          sx={{
            borderRadius: 3,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 10, 
            },
          }}
        >
            <CardContent className=' bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors rtl'>
              <Typography gutterBottom sx={{ color: 'text.main', fontSize: 18, direction:"rtl" }}>
                {children}
              </Typography>
            </CardContent>
            <CardActions className=' bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors rtl'>
              <Button size="small">Learn More</Button>
            </CardActions>
         
        </Card>
      </Box>
    </div>
  );
}
