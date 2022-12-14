import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Pinocchio"
        height="140"
        image="https://www.wildrice.com.sg/wr/wp-content/uploads/2022/10/P-2000x2000v2.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Pinocchio
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
       
Wild Rice @ Funan
In this cheekily on-the-nose musical adaptation of the classic fairy tale, Wild Rice brings one of the world’s most beloved characters to the Singapore stage. Meet Pinocchio, a wooden puppet crafted with loving care by Geppetto – a kind, humble carpenter who has always dreamt of becoming a father.

With a wish and a touch of fairy magic, Pinocchio springs to life… but there are some strings attached! To become a real boy, Pinocchio must first prove himself to be brave, kind and true. It’s a challenge the little puppet is determined to overcome – until he is led astray by a pair of wily con artists, and swept up in a madcap misadventure that takes him from the tempting promise of the circus to the deepest depths of the fathomless sea.

Directed by Pam Oei, Pinocchio is a brand-new, original musical written by Thomas Lim, with lyrics by Joel Tan and music by Julian Wong. Our fabulous cast includes Mae Elliessa as Pinocchio, Ebi Shankara as Geppetto and Siti Khalijah Zainal as G-Hopper, as well as the adorable First Stage Kids – making a welcome return to the stage after three long years!

A hilarious and heartwarming celebration of family, friendship and the importance of being true to yourself, Pinocchio is the perfect holiday treat for you and your loved ones. Wood we lie to you? 🤥
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
