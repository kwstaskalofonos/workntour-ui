import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

import styles from "./DatePicker.module.scss";

interface PropsDatePickerField {
  setDataObjectCallback: any;
  value: any;
  accessor: any;
  label?: any;
  required?: any;
  minDate?: any;
  validateFieldCallback?: any;
  setErrorMessagesCallback?: any;
  errorMessagesObject?: any;
  errorMessage?: any;
  validation?: any;
  datesArray?: any;
  elementIndex?: any;
}
const DatePickerField: React.FunctionComponent<PropsDatePickerField> = ({
  setDataObjectCallback,
  datesArray,
  elementIndex,
  value,
  accessor,
  label,
  required,
  minDate = new Date(),
  validateFieldCallback,
  setErrorMessagesCallback,
  errorMessagesObject,
  errorMessage = "",
  validation,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        inputFormat="dd/MM/yyyy"
        minDate={minDate}
        onChange={(newValue) => {
          const tempArray = [...datesArray];
          tempArray[elementIndex][accessor] = newValue;
          setDataObjectCallback(tempArray);
          if (typeof setErrorMessagesCallback === "function")
            setErrorMessagesCallback({
              ...errorMessagesObject,
              [accessor]: "",
            });
        }}
        renderInput={(params) =>
          validation ? (
            <TextField
              {...params}
              style={{ maxWidth: 225 }}
              size="small"
              value={value}
              name={accessor}
              required={required}
              onBlur={validateFieldCallback}
              error={errorMessage !== ""}
              helperText={errorMessage !== "" ? errorMessage : ""}
            />
          ) : (
            <TextField
              {...params}
              style={{ maxWidth: 225 }}
              size="small"
              error={
                (!!datesArray[elementIndex].from &&
                  !datesArray[elementIndex].to) ||
                (!datesArray[elementIndex].from &&
                  !!datesArray[elementIndex].to)
              }
              required={required}
            />
          )
        }
      />
    </LocalizationProvider>
  );
};

interface PropsDatePickerArray {
  datesArray: any;
  setDatesArrayCallback: any;
}

const DatePickerArray: React.FunctionComponent<PropsDatePickerArray> = ({
  datesArray,
  setDatesArrayCallback,
}) => {
  // TO-DO: error validation
  
  
  const datePickers = datesArray.map((date: any, index: number) => {
    return (
      <div key={index} className={styles.datesPickersBox}>
        <DatePickerField
          datesArray={datesArray}
          setDataObjectCallback={setDatesArrayCallback}
          value={date?.from}
          accessor={"from"}
          label={"From"}
          elementIndex={index}
          required
        />
        <DatePickerField
          datesArray={datesArray}
          setDataObjectCallback={setDatesArrayCallback}
          value={date?.to}
          accessor={"to"}
          label={"To"}
          elementIndex={index}
          required
        />
        <button
          className={"button is-secondary"}
          type={"button"}
          onClick={() => {
            // const index = datesArray.indexOf(date);
            // console.log(index);

            const temp = [...datesArray];
            temp.splice(index, 1);
            setDatesArrayCallback(temp);
          }}
        >
          -
        </button>
      </div>
    );
  });

  return (
    <>
      <div className={styles.datesPickerContainer}>{datePickers}</div>
      <button
        className={"button is-secondary is-fullwidth"}
        type={"button"}
        onClick={() => {
          setDatesArrayCallback([...datesArray, { from: null, to: null }]);
        }}
      >
        +
      </button>
    </>
  );
};

export default DatePickerArray;
