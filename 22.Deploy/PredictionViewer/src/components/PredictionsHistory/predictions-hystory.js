import React from 'react';
const PredictionsHistory = ({ predictionsList }) => {
    return (
        <>
            History
        <hr />
            <ul>
                {predictionsList.map(
                    (prediction,i) => <li key={i}>{prediction}</li>
                )}
            </ul>
        </>
    );
}

export default PredictionsHistory;
