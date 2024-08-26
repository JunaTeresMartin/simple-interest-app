import "./App.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

function App() {
  const [principle, setPrinciple] = useState(0);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(0);
  const [interest, setInterest] = useState(0);

  const [isPrincipleInvalid, setIsPrincipleInvalid] = useState(false);
  const [isRateInvalid, setIsRateInvalid] = useState(false);
  const [isYearInvalid, setIsYearInvalid] = useState(false);

  //input validation function
  const validateInput = (inputTag) => {
    // object destructuring
    const { name, value } = inputTag;
    console.log(name, value);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/));
    console.log(!!value.match(/^\d*.?\d+$/));
    if (name == "principle") {
      setPrinciple(value);
      if (!!value.match(/^\d*.?\d+$/)) {
        setIsPrincipleInvalid(false);
      } else {
        setIsPrincipleInvalid(true);
      }
    } else if (name == "rate") {
      setRate(value);
      !!value.match(/^\d*.?\d+$/)
        ? setIsRateInvalid(false)
        : setIsRateInvalid(true);
    } else if (name == "year") {
      setYear(value);
      !!value.match(/^\d*.?\d+$/)
        ? setIsYearInvalid(false)
        : setIsYearInvalid(true);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    console.log("Inside handle fn");
    if (principle && rate && year) {
      //calculate
      setInterest((principle * rate * year) / 100);
    } else {
      alert("Please fill the form completely");
    }
  };

  const handleReset = (e) => {
    setPrinciple(0);
    setRate(0);
    setYear(0);
    setInterest(0);
    setIsPrincipleInvalid(false);
    setIsRateInvalid(false);
    setIsYearInvalid(false);
  };
  return (
    <div
      style={{ minHeight: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div style={{ width: "600px" }} className="bg-light rounded p-5">
        <h3>Simple Interest Calculator</h3>
        <p>Calculate your simple interest easily</p>

        <div className="d-flex flex-column text-light justify-content-center align-items-center bg-warning shadow p-3 rounded">
          <h1>₹ {interest}</h1>
          <p className="fw-bolder">Total Simple Interest</p>
        </div>

        <form className="mt-5">
          <div className="mb-3">
            <TextField
              value={principle || ""}
              onChange={(e) => validateInput(e.target)}
              name="principle"
              id="outlined-basic1"
              className="w-100"
              label="Principle Amount"
              variant="outlined"
            />
          </div>
          {isPrincipleInvalid && (
            <div className="mb-3 text-danger fw-bolder">
              Invalid Principal Amount
            </div>
          )}
          <div className="mb-3">
            <TextField
              value={rate || ""}
              onChange={(e) => validateInput(e.target)}
              name="rate"
              id="outlined-basic2"
              className="w-100"
              label="Rate of Interest(p.a) %"
              variant="outlined"
            />
          </div>
          {isRateInvalid && (
            <div className="mb-3 text-danger fw-bolder">Invalid Rate Value</div>
          )}
          <div className="mb-3">
            <TextField
              value={year || ""}
              onChange={(e) => validateInput(e.target)}
              id="outlined-basic3"
              name="year"
              className="w-100"
              label="Time of Period (Y)"
              variant="outlined"
            />
          </div>
          {isYearInvalid && (
            <div className="mb-3 text-danger fw-bolder">Invalid Year</div>
          )}

          <Stack direction="row" spacing={2}>
            <Button
              disabled={isPrincipleInvalid || isRateInvalid || isYearInvalid}
              type="submit"
              onClick={handleCalculate}
              style={{ width: "50%", height: "70px" }}
              className="bg-dark"
              variant="contained"
            >
              Calculate
            </Button>
            <Button
              onClick={handleReset}
              style={{ width: "50%", height: "70px" }}
              variant="outlined"
            >
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
