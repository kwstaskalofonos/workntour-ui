export interface Session{
    token:string,
    profile:Profile
}

export interface Profile{
    userType:UserType
}

export interface Traveler{
    role:string,
    name:string,
    surname:string,
    email:string,
    password:string,
    birthday:string
    countryCodeMobileNum:string,
    mobileNum:string,
    nationality:string,
    sex:string,
}

export enum UserType{
    TRAVELER="TRAVELER",
    INIVIDUAL="INIVIDUAL",
    COMPANY="COMPANY",
    GUEST="GUEST"
}
