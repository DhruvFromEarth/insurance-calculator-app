import React, { useRef, useState , useEffect} from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');


function Hero() {
    const formRef = useRef(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('prediction_response', data => {
            setResult(data);
            setError(null);
        });

        socket.on('prediction_error', err => {
            setError(err.error);
            setResult(null);
        });

        return () => {
            socket.off('prediction_response');
            socket.off('prediction_error');
        };
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const form = formRef.current;

        const data = {
            age: Number(form.age.value),
            bmi: Number(form.bmi.value),
            smoker: form.smoker.value.toLowerCase(),
            sex: form.sex.value.toLowerCase(),
            children: Number(form.children.value),
            region: form.region.value.toLowerCase()
        };

        socket.emit('predict', data);
    };

    return (<div className="hero-container">
        <form ref={formRef} className="hero-form" onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="float" id="age" defaultValue={49} placeholder="Enter Age" min="0" max="150" required />
            </div>

            <div className="form-group">
                <label htmlFor="bmi">BMI:</label>
                <input type="float" id="bmi" defaultValue={25.84} placeholder="Enter BMI" min="0" max="80" required />
            </div>

            <div className="form-group">
                <label>Smoker:</label>
                <div className="toggle-group">
                    <input type="radio" id="smoker-no" name="smoker" value="no" defaultChecked />
                    <label htmlFor="smoker-no" className="toggle-label">No</label>

                    <input type="radio" id="smoker-yes" name="smoker" value="yes" />
                    <label htmlFor="smoker-yes" className="toggle-label">Yes</label>
                </div>
            </div>


            <div className="form-group">
                <label>Sex:</label>
                <div className="toggle-group">
                    <input type="radio" id="sex-male" name="sex" value="male" defaultChecked />
                    <label htmlFor="sex-male" className="toggle-label">Male</label>

                    <input type="radio" id="sex-female" name="sex" value="female" />
                    <label htmlFor="sex-female" className="toggle-label">Female</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="children">Children:</label>
                <input type="number" id="children" defaultValue={0} placeholder="Number of children" min="0" required />
            </div>

            <div className="form-group">
                <label>Region:</label>
                <div className="region-grid">
                    <div className="toggle-group">
                        <input type="radio" id="region-nw" name="region" value="northwest" defaultChecked />
                        <label htmlFor="region-nw" className="toggle-label">Northwest</label>
                    </div>
                    <div className="toggle-group">
                        <input type="radio" id="region-ne" name="region" value="northeast" />
                        <label htmlFor="region-ne" className="toggle-label">Northeast</label>
                    </div>
                    <div className="toggle-group">
                        <input type="radio" id="region-sw" name="region" value="southwest" />
                        <label htmlFor="region-sw" className="toggle-label">Southwest</label>
                    </div>
                    <div className="toggle-group">
                        <input type="radio" id="region-se" name="region" value="southeast" />
                        <label htmlFor="region-se" className="toggle-label">Southeast</label>
                    </div>
                </div>
            </div>

            <button type="submit" className="submit-btn">Predict</button>
        </form>

        {result && (
            <div className="result">
                <h3>Predicted Charges:</h3>
                <p>${result.prediction}</p>
            </div>
        )}
        {error && (
            <div className="error">
                <h3>Error:</h3>
                <p>{error}</p>
            </div>
        )}
    </div>
    );
}

export default Hero;