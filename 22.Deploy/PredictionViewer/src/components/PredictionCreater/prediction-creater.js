import React, { Component } from 'react';
import './prediction-creater.css'
class PredictionCreater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrediction: 'Not selected'
        }
    }
    getRandomPrediction(){
        const {predictions} =this.props
        const randIndex=Math.floor(Math.random()*predictions.length)
        return predictions[randIndex]
    }
    onClick = () => {
        const {addToHistory} =this.props
        const currentPrediction=this.getRandomPrediction()
        this.setState({
            currentPrediction
        },
        ()=>console.log(this.state.currentPrediction)
        )
        
        addToHistory(currentPrediction)
    }
    render() {
        const { currentPrediction } = this.state
        return (
            <>
                <button onClick={this.onClick}>
                    Get a prediction
                </button>
                <br />
                Prediction: <span className='prediction'>{currentPrediction}</span>
            </>
        );
    }
}

export default PredictionCreater;