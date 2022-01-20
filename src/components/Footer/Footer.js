import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Box, Link} from '@material-ui/core';

import Bitcoin_Logo2 from '../../assets/img/Bitcoin_Logo2.png';

const useStyles = makeStyles((theme)=>({
    root:{
        backgroundColor: '#1C1A22',
        padding: '40px 50px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function Footer(){

    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box style={{width:450}}>
                <h2>The Roller Coaster Guy</h2>
                <img alt="bitcoin-logo" src={Bitcoin_Logo2} width={150}></img>
                <Box>
                <iframe data-aa='411227' src='//ad.a-ads.com/411227?size=120x60' scrolling='no' style={{width:'120px', height:'60px', border:'0px', padding:'0',overflow:'hidden'}}
                            allowtransparency='true'></iframe>
                </Box>
            </Box>
            <Box style={{width:260}}>
                <h2>Exchange prices</h2>
                <span>The prices are based on daily (UTC time) performance</span>
                <h2>Acknowledgments</h2>
                <Link to="http://www.brainlesstales.com/bitcoin-roller-coaster.php">
                    Brainless Tales
                </Link>
            </Box>
            <Box style={{width:330}}>
                <h2>Development</h2>
                <span>More features moon.. oh wait.. soon</span>
                <h2>API used</h2>
                <span>Bitfinex</span>
                <span>Bitstamp</span>
                <span>Blockchain Explorer API</span>
                <span>Bitcoinfees.21</span>
            </Box>
            <Box style={{width:270}}>
                <h2>Donation</h2>
                <span>You can also help the hodler coaster
                    guy reach the moon:</span>
                <br/>
                <span>1mPjCjdTMwAGXuj7v2DsrSK3AerqwtF5f</span>
            </Box>
            <Box>
                <h2>Contact</h2>
                <span>You can find me on reddit</span><br/>
                <span>/u/roller-coaster-guy</span>
            </Box>
        </Box>
    );
}