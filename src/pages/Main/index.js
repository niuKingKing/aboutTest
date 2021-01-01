import { Component, Fragment } from 'react';
import leftArrow from '../../asset/icons/leftArrow.png';
import rightArrow from '../../asset/icons/rightArrow.png';
import cloudy from '../../asset/icons/cloudy.png';
import rain from '../../asset/icons/rain.png';
import snow from '../../asset/icons/snow.png';
import sunny from '../../asset/icons/sunny.png';
import thunderStorm from '../../asset/icons/thunderStorm.png';
import refresh from '../../asset/icons/refresh.png';
import $ from 'jquery'
import '../index.css';


function Weather(props) {
    let { targetData } = props;
    return (
        <Fragment>
            <div>
                {targetData.weather == 0 && <img className="main_body_pic" src={cloudy} height={150} width={200} />}
                {targetData.weather == 1 && <img className="main_body_pic" src={rain} height={200} width={200} />}
                {targetData.weather == 2 && <img className="main_body_pic" src={snow} height={200} width={200} />}
            </div>
        </Fragment>

    )
}




class Entrance extends Component {
    constructor() {
        super();
        this.state = {
            id: 1,
            targetData: {},
            getDataState: false
        }
    }
    componentDidMount() {
        // we will fetch/get data in this method.
        let data = [
            { id: 1, name: "Sydney", weather: 0, currentTemperature: 10, maxTemperature: 16, minTemperature: 5 },
            { id: 2, name: "Melbourne", weather: 1, currentTemperature: 10, maxTemperature: 16, minTemperature: 5 },
            { id: 3, name: "Brisbane", weather: 2, currentTemperature: 10, maxTemperature: 16, minTemperature: 5 },
        ];
        // it seems to be not effective.....
        // $.ajax({
        //     type: "GET",
        //     url: "http://localhost:8000/api/weather",
        //     // data: "name=John&location=Boston",
        //     success: function(msg){
        //       alert( "Data Saved: " + msg );
        //     }
        //  });
        this.setState({
            data,
            targetData: data[0]
        });

    }
    componentDidUpdate(prevProps, prevState) {
        let { data, id } = this.state;
        if (id !== prevState.id) {
            let [targetData] = data.filter(item => item.id === id);
            this.setState({
                targetData
            })
        }
    }

    handleWeather = () => {
        let { id } = this.state;
        this.setState({
            id,
            getDataState: true
        })
    }

    handleWeatherPic = (data) => {
        console.log(data)

    }

    handleReduce = () => {
        let { id } = this.state;
        if (id === 1) {
            this.setState((state) => ({
                id: state.data.length
            }))
        } else {
            this.setState({
                id: this.state.id - 1,
                getDataState:false
            })
        }
    }

    handleAdd = () => {
        let { id, data } = this.state;
        if (id === data.length) {
            this.setState({
                id: data[0].id,
                getDataState:false    //should be loading ... 
                                      //fetching data
            })
        } else {
            this.setState({
                id: this.state.id + 1,
                getDataState:false
            })
        }
    }

    handleJudgeWeather = (data) => {
        let weather;
        switch (data) {
            case 0:
                weather = "cloudy";
                break;
            case 1:
                weather = "rain";
                break;
            case 2:
                weather = "snow";
                break;
        }
        return weather;
    }

    render() {
        let { id, targetData } = this.state;
        console.log(id)
        return (
            <Fragment>
                <div className="container">
                    <div className="main_container">
                        <div className="main_left">
                            <img src={leftArrow} height={50} width={50} onClick={this.handleReduce} />
                        </div>
                        <div className="main_middle">
                            <p className="main_title">{targetData.name}</p>
                            <div className="main_body">
                                {
                                    this.state.getDataState ?
                                        <Weather targetData={targetData} handleWeatherPic={this.handleWeatherPic} />
                                        :
                                        <img className="main_body_pic" src={refresh} height={200} width={200} onClick={this.handleWeather} />
                                }
                            </div>
                            {
                                this.state.getDataState ?
                                    <div className="main_temperature">
                                        <p>{targetData.currentTemperature}</p>
                                        <p>
                                            <span>{targetData.minTemperature}</span>
                                            <span>{targetData.maxTemperature}</span>
                                        </p>
                                        <div className="temperature_num">
                                            <p>{this.handleJudgeWeather(targetData.weather)}</p>
                                        </div>
                                    </div>

                                    :
                                    null
                            }

                        </div>
                        <div className="main_right">
                            <img src={rightArrow} height={50} width={50} onClick={this.handleAdd} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Entrance