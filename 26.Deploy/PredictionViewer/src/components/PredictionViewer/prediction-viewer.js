import React, { Component } from 'react';
import PredictionCreater from '../PredictionCreater'
import PredictionsHistory from '../PredictionsHistory'

class PredictionViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictionsList: []
        }
    }
    addToHistory = (prediction) => {
        // this.setState({    //Коли настпне значення не залежить від попереднього
        //     predictionsList:[...predictionsList,prediction]
        // })
        this.setState((prevState) => { //Коли наступне значення залежить від попереднього
            const { predictionsList } = prevState
            return {   //Повертаємо новий state
                predictionsList: [...predictionsList, prediction]
            }
        })

    }
    render() {
        const { predictions } = this.props
        const { predictionsList } = this.state
        return (
            <>
                <PredictionCreater predictions={predictions}
                 addToHistory={this.addToHistory} />
                <hr/>
                <PredictionsHistory predictionsList={predictionsList} />
            </>
        );
    }
}

export default PredictionViewer;