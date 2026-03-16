import React from "react";
import PropTypes from "prop-types";
import Header from './Header.js'
import { Grid, Button } from '@material-ui/core';
import Background from '../assets/background_event_program.png'
import LogoOzempicHeader from '../assets/logo_white.png'
import up_white from '../assets/up_white.png'
import { colors } from '../utils'
import './Main.css'
import { PieChart } from 'react-minimal-pie-chart';


const defaultLabelStyle = {
    fontSize: '5px',
    fill: '#FFFFFF'
};

class Chart extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            lang: "ESPAÑOL",
            response: -1,
            responseServer: null,
            ttrue: 0,
            tfalse: 0,
            question: "",
        };
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalFive);
    }

    timer = () => {
        this.getResponse();
    };

    componentDidMount() {

        this.interval = setInterval(this.timer, 10000);
        this.setState({ intervalFive: this.interval })
        this.getResponse();
    }



    upRotate() {
        if (!this.state.idiomaButton) {
            return `rotate(180deg)`
        } else {
            return `rotate(0deg)`
        }
    }



    getResponse = (value) => {
        this.setState({ error: null });

        var response = fetch("https://4swa57ilx6.execute-api.sa-east-1.amazonaws.com/prod/chart", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    this.setState({ error: response })
                }
            })
            .then((response) => {
                if (!response.error) {
                    this.setState({
                        question: response.question,
                        ttrue: Math.round(response.ttrue * 100) / 100,
                        tfalse: response.tfalse,
                    })
                } else {
                    this.setState({ error: response.error })
                }
            })
            .catch(error => {
                this.setState({ error: error })
            });
    }

    render() {
        const min = window.innerWidth >= 1000
        var value = this.state.ttrue + this.state.tfalse;
        return (
            <Grid item xs={12} style={{ height: window.innerHeight, backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}>
                <Grid justifyContent='center' item xs={12} style={{ height: window.innerHeight - 100, position: 'absolute', top: 0, left: 0, width: '100%', flexDirection: 'column', paddingBottom: 50 }}>
                    <Grid container direction='column' style={{ alignContent: 'center', justifyContent: 'center' }} >
                        <Grid container direction='row' justifyContent='center' style={{ paddingRight: 15, paddingLeft: 15 }}>
                            <div style={{ height: '100%', flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ paddingTop: 10, textAlign: 'center', color: 'white', fontSize: 40, fontFamily: 'Montserrat-Regular', letterSpacing: 1 }}>{this.state.question}</p>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12} justifyContent='center' direction='column' style={{ width: '100%', textAlign: 'center', justifyItems: 'center' }} >
                        {value == 0 ?
                            <p style={{ paddingTop: 10, textAlign: 'center', color: 'white', fontSize: 40, fontFamily: 'Montserrat-Regular', letterSpacing: 1 }}>NO HAY DATOS</p>
                            :
                            <PieChart
                                style={{color: 'white', textAlign: 'center', width: '35%', marginTop: 70 }}
                                label={(dataEntry) => {
                                    return dataEntry.dataEntry.title + "(" + Math.round(dataEntry.dataEntry.percentage * 100) / 100 + "%)";
                                }}
                                labelStyle={{
                                    ...defaultLabelStyle,
                                }}
                                data={[
                                    { title: 'Verdadero', value: Math.round(this.state.ttrue * 100) / 100, color: '#099107' },
                                    { title: 'Falso', value: Math.round(this.state.tfalse * 100) / 100, color: '#076391' },
                                ]}
                            />
                        }


                    </Grid>


                </Grid>
            </Grid >
        );
    }
}

Chart.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Chart;