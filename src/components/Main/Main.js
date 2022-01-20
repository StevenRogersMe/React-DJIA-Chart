import {makeStyles, Theme} from '@material-ui/core';
import {Box} from '@material-ui/core';
import FastUp from '../../assets/img/fastup.gif';
import VeryFastUp from '../../assets/img/veryfastup.gif';
import FastDown from '../../assets/img/fastdown.gif';
import VeryFastDown from '../../assets/img/veryfastdown.gif';
import Flat from '../../assets/img/flat.gif';
import Background from '../../assets/img/background.svg';
import ArrowDown from '../../assets/img/ArrowDown.svg';
import ArrowUp from '../../assets/img/ArrowUp.svg';
import {getHistoryByMinutes, getHistoryByDay, getCurrentValue} from './StockChartData';
import Chart from './Chart';
import * as serviceWorker from './serviceWorker';
import { useMediaQuery } from 'react-responsive';

import { useEffect, useState } from 'react';
import $ from 'jquery';

const useStyles = makeStyles((theme)=>({
    root:{
        backgroundColor: '#24242E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 0',
        height: 1500,
        '& img':{
            [theme.breakpoints.down('sm')]: {
                width: '80%',
            },
        }
    },
    chart:{
        backgroundImage: `url(${Background})`,
        backgroundPositionX: -25,
        width:'100%',
    },
    card:{
        backgroundColor: '#15161B',
        borderRadius: 9,
        padding: 10,
        marginTop: 50,
        width: 500,
        color: 'white',
        display: 'flex',
        flexDirection:'column',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    },
    competive:{
        display: 'flex',
        alignItems: 'center',
        '& span':{
            fontWeight: 700,
            fontSize: 14,
        },
        '& img':{
            paddingLeft: 5,
            paddingRight:10,
        }
    },
    stockChart:{
        marginTop: 50, 
        marginBottom: 50,  
        width: "50%",
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    }
}));    

export default function Main(){
    const classes = useStyles();
    const [now, setNow] = useState([]);
    const [diff, setDiff] = useState([]);
    const [ratio, setRatio] = useState([]);
    const [statement, setStatement] = useState("Flat");
    
    const [priceData, setPriceData] = useState([]);
    const [newPriceData, setNewPriceData] = useState([]);

    const [update, setUpdate] = useState(0);
    
    const isTabletDevice = useMediaQuery({
        query: "(min-width:645px)",
    });

    const setChartData = async () => {
        try{
            const {data} = await getHistoryByMinutes();
            
            const history = data.reverse();
            console.log("history = ", history);
            const priceData = new Array();
            for(let item of history){
                let date = new Date(`${item.date}`).getTime();
                let price = item.close;
                priceData.push([date, price]);
            }
            setPriceData(priceData);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        setChartData();
        
        let interval;

        const setData = async () => {
            try{
                const {data} = await getCurrentValue();
                const now = data[0].price.toFixed(2);
                const diff = data[0].change.toFixed(2);
                const ratio = data[0].changesPercentage.toFixed(2);
               
                let date = data[0].timestamp * 1000;
                let price = data[0].price;
                setNewPriceData([date, price]);
                setNow(now);
                setDiff(diff);
                setRatio(ratio);
            }catch(e){
                console.log(e);
            }
        }
        setData();

        interval = setInterval(() => {
            setData()
        }, 5 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(()=>{
        if(diff >= 0){
            $("#diff").attr("src", `${ArrowUp}`);
            $("#ratio").attr("src", `${ArrowUp}`);
            if(ratio > 50){
                setStatement("VeryFastUp");
                $("#statement").attr("src", `${VeryFastUp}`);
            } else if(ratio > 25){
                setStatement("FastUp");
                $("#statement"). attr("src", `${FastUp}`);
            } else {
                setStatement("Flat");
                $("#statement"). attr("src", `${Flat}`);
            }
        }
        else{
            $("#diff").attr("src", `${ArrowDown}`);
            $("#ratio").attr("src", `${ArrowDown}`);
            if(ratio < -50){
                setStatement("FastDown");
                $("#statement").attr("src", `${FastDown}`);
            } else if(ratio < -25){
                setStatement("VeryFastDown");
                $("#statement").attr("src", `${VeryFastDown}`);
            } else {
                setStatement("Flat");
                $("#statement"). attr("src", `${Flat}`);
            }
        }
    }, [diff]);

    return (
        <Box className={classes.root} spacing={3}>
            <h2>Blueberry Rollercoaster</h2> 
            <img id="statement" src={VeryFastUp}/>
            <Box className={classes.card}>
                <Box display='flex' justifyContent='space-between'>
                    <Box display="flex" alignItems="center">
                        <h2>$<span className="average">{now}</span> USD</h2>
                    </Box>
                    <Box className={classes.competive}>
                        <span>{diff}</span><img id="diff" src={ArrowUp}/>
                        <span>{ratio}%</span><img id="ratio" src={ArrowUp}/>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <h2>{statement}</h2>
                </Box>
            </Box>
            <Box className={classes.stockChart}>
                <Chart priceData={priceData}></Chart>
            </Box>
        </Box>
    );
}