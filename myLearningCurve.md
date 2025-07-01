# My Learning Curve

1. Learned Electron - youtube

2. serched for how to train an ml model - youtube.
[Build Your First Machine Learning Project [Full Beginner Walkthrough]](https://www.youtube.com/watch?v=Hr06nSA-qww&t=40s)

- import pandas - data analysis tool
- foo = pandas.read_csv("./foo.csv") - read and assign to a variable
- foo.corr()["columnName"] - to check correlation of this column to other columns
- import seaborn - graph plotting
- seaborn.lmplot(x="col1", y="col2", data=foo, fit_reg=True `regression line`, ci=None `confidence interval`) - plot a 2D diagram with a line
- foo.plot.hist(y="col3") - histogram to chech balance in data(optional)

- data preprocessing - * if required

- train = foo[foo["col1"] < 50 `any condition` ].copy() - splitting the dataset for testing later with untouched data.
- test = foo[foo["col1"] > 50 `any condition` ].copy()
- foo.shape - shows matrix size

----
actually training the model
- from sklearn.linear_model import LinearRegression - scikitLearn python library
- reg = LinearRegression() - initialize linearRegression class
- predictors = ["col1","col2"]
- target = "col3"
- reg.fit(train[predictors],train[target]) - fit our linearRegression model - training

---
testing
- predictions = reg.predict(test[predictors]) - generate predictions (gives numpy array)
- test["col4"] = predictions - (optional) added a column for predictions value
- test.loc[test["col4"] < 0, "predictions"] = 0 - turned negetive values to zero(0).
- test["col4"] = test["col4"].round() - to round off float value to the nearest integer.
- from sklearn.metrics import mean_absolute_error - scikitLearn python library
- print('mean_absolute_error: ', mean_absolute_error(test['col3'], test['col4'])) - prints error in off value
- after this i sped up the video.

---
others
- .info() - give info about the data set - ALL COLUMNS MUST BE NUMBERS*
- foo.replace({'col1':{'yes':1,'no':0}}, inplace = True) - NOT WORKING FOR NEW VERSION OF PANDAS - changes string to number* - use before spliting the data
- foo['col1'] = foo['col1'].map({'yes': 1, 'no': 0}).astype(int) - WORKING
- .isnull().sum() - missing values by column
- .describe() - data stats
- sns.countplot(x="col1", data=foo) - histogram for non-numericals
- import pickle as pkl - library to download trained model
- pkl.dump( reg, open('model.pkl' `fileName`,'wb' `writeBinary`)) - download syntax
- data split
    ► from sklearn.model_selection import train_test_split
    ► train_data, test_data = train_test_split(data, test_size=0.2, random_state=2)
    ► X_train = train_data.drop("charges", axis=1) - axis 1 is row 0 is column
    ► Y_train = train_data["charges"]
    ► X_test = test_data.drop("charges", axis=1)
    ► Y_test = test_data["charges"]
- data split v2
    ► columns = df.columns.tolist()
    ► target = columns.pop()
    ► predictors = columns

'*' -> important

3. recomended project structure -gpt

your-app/
│
├── frontend/               # React app for the UI
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Flask app + ML model
│   ├── app.py              # Flask server entry point
│   ├── model/              # ML scripts + saved model
│   │   ├── train.py        # Script to train & save your model
│   │   ├── model.pkl       # Saved trained model
│   │   └── utils.py        # (optional) helper functions
│   ├── requirements.txt    # Python dependencies
│   └── data/               # Your .csv file
│
├── electron/               # Electron main process
│   ├── main.js             # Electron main script
│   ├── preload.js          # (optional) Secure bridge
│
├── package.json            # Root Electron + Node config
└── README.md

- alt codes for documentation.
alt 179 │
alt 195 ├
alt 192 └
alt 196 ─
alt 16 ►

4. flask