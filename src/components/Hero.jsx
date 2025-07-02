import React, { useRef , useState} from 'react';

function Hero() {
    const formRef = useRef(null);
    const [result, setResult] = useState(null);

    const submitForm = (e) => {
        e.preventDefault();
        const form = formRef.current;

        const data = [
            Number(form.age.value),
            Number(form.bmi.value),
            Number(form.smoker.value.toLowerCase() === 'yes' ? 1 : 0),
            Number(form.sex.value.toLowerCase() === 'female' ? 0 : 1),
            Number(form.children.value),
            Number(form.region.value.toLowerCase() === 'northeast' ? 0 : form.region.value.toLowerCase() === 'southeast' ? 1 : form.region.value.toLowerCase() === 'southwest' ? 2 : 3)
        ];

        const datatosend = {
            "features": data
        };

        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datatosend)
        })
        .then(res => res.json())
        .then(data => {console.log('Prediction:', data); setResult(data);})
        .catch(err => console.error('Error:', err));
    };
    
    return (<>
        <h2>Hero</h2>
        <p>age,sex,bmi,chidren,smoker,region</p>
        <p>49,1,25.84,1,0,0</p>

        <form ref={formRef} className="hero-form" onSubmit={submitForm}>
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" placeholder="Enter your age" defaultValue={49} />
            <br />
            <label htmlFor="bmi">BMI:</label>
            <input type="text" id="bmi" placeholder="Enter your BMI" defaultValue={25.84} />
            <br />
            <label htmlFor="smoker">Smoker:</label>
            <input type="text" id="smoker" placeholder="Are you a smoker?" defaultValue={"no"} />
            <br />
            <label htmlFor="sex">Sex:</label>
            <input type="text" id="sex" placeholder="Enter your sex" defaultValue={"male"} />
            <br />
            <label htmlFor="children">Children:</label>
            <input type="text" id="children" placeholder="Enter number of children" defaultValue={1} />
            <br />
            <label htmlFor="region">Region:</label>
            <input type="text" id="region" placeholder="Enter your region" defaultValue={"northeast"} />
            <br />
            <button type="submit">Submit</button>
        </form>
        {result && (
            <div className="result">
                <h3>Prediction Result:</h3>
                <p>${result.prediction}</p>
            </div>
        )}
    </>)
}

export default Hero