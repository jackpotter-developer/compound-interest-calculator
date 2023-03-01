import React from "react";

export default function Body(){

    const [investmentData, setInvestmentData] = React.useState({
        initialDeposit: "",
        regularDeposit: "",
        depositFrequency: "",
        compoundFrequency: "",
        numberYears: "",
        interestRate: ""
    })

    const [count, setCount] = React.useState(1)

    const [value, setValue] = React.useState()

    function handleChange(event){
        const {name, value} = event.target
        setInvestmentData(prevInvestmentData => ({
            ...prevInvestmentData,
            [name]: value
        }))
    }

    function addCount(){
        setCount(prevCount => {
            return prevCount + 1
        })
    }

    React.useEffect(function(){

        var initialDeposit = parseInt(investmentData.initialDeposit)
        var regularDeposit = parseInt(investmentData.regularDeposit)
        var depositFrequency = parseInt(investmentData.depositFrequency)
        var compoundFrequency = parseInt(investmentData.compoundFrequency)
        var numberYears = parseInt(investmentData.numberYears)
        var interestRate = parseFloat(investmentData.interestRate)

        const EAR = (1 + ((interestRate / 100) / compoundFrequency)) ** (compoundFrequency) - 1
        const principleFV = initialDeposit * (1 + EAR)** numberYears
        const pmtFV = regularDeposit * depositFrequency * ((1 + EAR) ** numberYears - 1) / EAR

        var total = principleFV + pmtFV
        total = total * 100
        total = Math.round(total)
        total = total / 100

        setValue(total)

    }, [count])

    return(
        <div className="body">
            <div  className="body--description">
                <p>
                    This calculator allows you to work out how much an investment will be 
                    worth with compound interest and regular deposits.
                </p>
                <p>
                    Simply enter details of your investment in the fields below to
                    calculate its future value.
                </p>
            </div>
            <div className="body--form">
                <h3>Calculator</h3>
                <p></p>
                <p></p>
                
                    <div className="form--input dollar-sign">
                        <label for="initial-deposit">Initial deposit ($):</label>
                        <input 
                            type="text"
                            id="initial-deposit"
                            name="initialDeposit"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--input dollar-sign">
                        <label for="regular-deposit">Regular deposit ($):</label>
                        <input 
                            type="text"
                            id="regular-deposit"
                            name="regularDeposit"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--input">
                        <label for="deposit-deposit">Deposit frequency:</label>
                        <select 
                            id="deposit-frequency" 
                            name="depositFrequency"
                            onChange={handleChange}>
                            <option value="">--Choose an option--</option>
                            <option value="1">Annually</option>
                            <option value="12">Monthly</option>
                            <option value="52">Weekly</option>
                            <option value="365">Daily</option>
                        </select>
                    </div>
                
                    <div className="form--input">
                        <label for="compound-frequency">Compound frequency:</label>
                        <select 
                            id="compound-frequency"
                            name="compoundFrequency"
                            onChange={handleChange}
                            >
                            <option value="">--Choose an option--</option>
                            <option value="1">Annually</option>
                            <option value="12">Monthly</option>
                        </select>
                    </div>
                    <div className="form--input">
                        <label for="number-years">Number of years:</label>
                        <input 
                            type="text"
                            id="number-years"
                            name="numberYears"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--input">
                        <label for="interest-rate">Interest rate (annual %):</label>
                        <input 
                            type="text"
                            id="interest-rate"
                            name="interestRate"
                            onChange={handleChange}
                        />
                    </div>
                
                <p></p>
                <button
                    className="form--button"
                    onClick={addCount}
                >
                    Calculate investment amount
                </button>
            </div>
            <h3 className="future-value">Future value: {value > 0 ? `$${value.toLocaleString("en-US")}` : ""}</h3>
            <p className="body--footer">
                The longer your money is invested, the more compound interest will accumulate and amplify your returns.
            </p>
            <p className="body--footer">
                By changing the deposit and compound frequency of your investment, you can see how quickly the future value can grow due to compound interest.
            </p>
        </div>
    )
}