import { getCookie, hasCookie } from "@src/utilities/cookies";
import {
  CompanyHostProfileDto,
  IndividualHostProfileDto,
  Profile,
  Role,
  TravelerProfileDTO,
} from "@src/state/stores/user/models";
import { formatISO } from "date-fns";
import { countries } from "@src/utilities/countries";
import React from "react";

export function constructDate(day: string, month: string, year: string) {
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day) + 1,
    0,
    0,
    0
  );
  let dateToSend = date.toISOString();
  let idx = dateToSend.indexOf("T");
  return dateToSend.substring(0, idx);
}

export const formatDateISO = (date: Date) => {
  return formatISO(date, { representation: "date" }) + "T00:00:00";
};

export function extractYearMonthDay(date: string) {
  let tmp: string[] = date.split("-");
  return [tmp[0], tmp[1], tmp[2]];
}

export function isEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validPassword(pwd: string) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(pwd);
}

export function isTraveler() {
  return hasCookie() && getCookie("role") === Role.TRAVELER.valueOf();
}

export function isHost() {
  return (
    hasCookie() &&
    (getCookie("role") === Role.COMPANY_HOST.valueOf() ||
      getCookie("role") === Role.INDIVIDUAL_HOST.valueOf())
  );
}

export function getUserDisplayName() {
  let name = "";
  if (hasCookie() && hasCookie("role")) {
    switch (getCookie("role")) {
      case Role.COMPANY_HOST.valueOf(): {
        let profile: CompanyHostProfileDto = JSON.parse(getCookie("profile"));
        name = profile.companyName;
        break;
      }
      case Role.INDIVIDUAL_HOST.valueOf(): {
        let profile: IndividualHostProfileDto = JSON.parse(
          getCookie("profile")
        );
        name = profile.name;
        break;
      }
      case Role.TRAVELER.valueOf(): {
        let profile: TravelerProfileDTO = JSON.parse(getCookie("profile"));
        name = profile.name;
        break;
      }
    }
  }
  return name;
}

//return Date like Aug 01, 2022
export function getDateFromString(date: string | undefined) {
  if (date) {
    let splitDate = new Date(date).toDateString().trim().split(/\s+/);
    let formattedDate = splitDate[1] + " " + splitDate[2] + ", " + splitDate[3];
    return formattedDate;
  }
  return null;
}

export function getNationalities() {
  let tmp: any[] = [];
  for (var country of countries) {
    if (country.label) {
      tmp.push({ value: country.label, label: country.label });
    }
  }
  return tmp;
}

export function renderNationalities() {
  let array: any[] = [];
  array.push(
    <option
      key={"nationality-option-empty-1"}
      value={""}
      label={"Select Country"}
    />
  );
  for (let item of getNationalities()) {
    array.push(
      <option
        key={"nationality-option-" + item.label}
        value={item.value}
        label={item.label}
      >
        {item.label}
      </option>
    );
  }
  return array;
}

export function lowerCaseAndCapitalizeFirstLetter(str: string | any) {
  if (!str) {
    return "";
  }
  return (
    str?.charAt(0)?.toUpperCase() +
    str?.toLocaleLowerCase()?.replace("_", " ")?.slice(1)
  );
}

function checkPasswordValidation(value: string | any) {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(value)) {
    return "Password must not contain Whitespaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(value)) {
    return "At least one Uppercase Character.";
  }

  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(value)) {
    return "At least one Lowercase Character.";
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(value)) {
    return "At least one Digit.";
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(value)) {
    return "At least one Special Symbol.";
  }

  const isValidLength = /^.{8,}$/;
  if (!isValidLength.test(value)) {
    return "At least 8 characters long";
  }
  return null;
}

export function isValidLength(value: string) {
  const regex = /^.{8,}$/;
  return regex.test(value);
}

export function isContainsUppercase(value: string) {
  const regex = /^(?=.*[A-Z])/;
  return regex.test(value);
}

export function isContainsLowercase(value: string) {
  const regex = /^(?=.*[a-z])/;
  return regex.test(value);
}
export function isContainsSymbolAndNumber(value: string) {
  const regexSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  const regexNumber = /^(?=.*[0-9])/;
  return regexSymbol.test(value) && regexNumber.test(value);
}

// let predicateUpperCaseChars = NSPredicate(format:"SELF MATCHES %@", ".[A-Z]+.")
//         // Contains at least one lower case
//         let predicateLowerCaseChars = NSPredicate(format:"SELF MATCHES %@", ".[a-z]+.")
//         // Contains at least one digit and a special character
//         let predicateNumAndSpecialChars = NSPredicate(format:"SELF MATCHES %@", "^(?=.?[0-9])(?=.?[#?!@$%^&<>*~:`-]).{2,}$")