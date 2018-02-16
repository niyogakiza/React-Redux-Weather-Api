import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/Google_map';


class WeatherList extends Component{

    renderWeather(cityData){
        const name = cityData.city.name;
        const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp -273);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        // const lon = cityData.city.coord.lon;
        // const lat = cityData.city.coord.lat;
        //es 6
        const {lon, lat }= cityData.city.coord;

        return(
            <tr key={name}>
                <td>{name}</td>
                <td>
                    <GoogleMap lon={lon} lat={lat}/>
                </td>
                <td>
                    <Chart data={temps} color="orange" units="°C"/>
                </td>
                <td>
                    <Chart data={pressures} color="blue" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="red" units="%"/>
                </td>
            </tr>
        )

    }

    render(){
        return(
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (°C)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather.bind(this))}
                </tbody>

            </table>
        )
    }
}


// function mapStateToProps(state) {
//     return { weather: state.weather };
// }
//es 6
function mapStateToProps({ weather }) {
    return { weather };
}

export default connect (mapStateToProps)(WeatherList);