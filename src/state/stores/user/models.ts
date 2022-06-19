export interface Session{
    token:string,
    profile:Profile
}

export interface Profile{
    userType:UserType
}

export interface RegistrationDto{
    role:string,
    name:string,
    surname:string,
    email:string,
    password:string,
    birthday:string,
    countryCodeMobileNum:string,
    mobileNum:string,
    nationality:string,
    sex:string,
}

export interface Traveler extends RegistrationDto{}

export interface Individual extends RegistrationDto{}

export interface Company extends RegistrationDto{
    companyName:string,
    companyId:string
}

export enum UserType{
    TRAVELER="TRAVELER",
    INDIVIDUAL="INDIVIDUAL",
    COMPANY="COMPANY",
    GUEST="GUEST"
}
