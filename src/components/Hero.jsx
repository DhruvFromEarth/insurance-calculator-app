import React, { useRef, useState } from 'react';

function Hero() {
    const formRef = useRef(null);
    const [result, setResult] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const form = formRef.current;

        const data = {
            age: Number(form.age.value),
            bmi: Number(form.bmi.value),
            smoker: Number(form.smoker.value.toLowerCase() === 'yes' ? 1 : 0),
            sex: Number(form.sex.value.toLowerCase() === 'female' ? 0 : 1),
            children: Number(form.children.value),
            region: Number(form.region.value.toLowerCase() === 'northeast' ? 0 : form.region.value.toLowerCase() === 'southeast' ? 1 : form.region.value.toLowerCase() === 'southwest' ? 2 : 3)
        };

        try {
            const res = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log('Prediction:', result);
            setResult(result);
        } 
        catch (err) { console.error('Error:', err);}
    };

    return (<>
        <div className="hero-container">
            <form ref={formRef} className="hero-form" onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="float" id="age" placeholder="Enter Age" min="0" max="150" required />
                    {/* <input type="float" id="age" defaultValue={49} placeholder="Enter Age" min="0" max="150" required /> */}
                </div>

                <div className="form-group">
                    <label htmlFor="bmi">BMI:</label>
                    {/* <input type="float" id="bmi" defaultValue={25.84} placeholder="Enter BMI" min="0" max="80" required /> */}
                    <input type="float" id="bmi" placeholder="Enter BMI" min="0" max="80" required />
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
                    {/* <input type="number" id="children" defaultValue={0} placeholder="Number of children" min="0" required /> */}
                    <input type="number" id="children" placeholder="Number of children" min="0" required />
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
        </div>
    </>
    )
}

export default Hero