export interface Session{
    token:string,
    profile:Profile
}

export interface Profile{
    userType:Role
}

export type RoleType = keyof typeof Role;

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

export interface LoginResponse{
    memberId:string,
    role:string
}

export interface LoginForm{
    email:string,
    password:string
}

export interface CompanyHostProfile{
    memberId:string,
    role:string,
    companyName:string,
    companyId:string
    email:string,
    headquartersCounty:string,
    mobileNum:string,
    profileImage:string,
    description:string
}

export interface IndividualHostProfile{
    memberId:string,
    role:string,
    name:string,
    surname:string,
    email:string,
    country:string,
    mobileNum:string,
    nationality:string,
    profileImage:string,
    description:string
}

export interface TravelerProfile{
    memberId:string,
    role:string,
    name:string,
    birthday:string,
    surname:string,
    email:string,
    sex:string,
    postalAddress:string,
    mobileNum:string,
    typeOfTraveler:TypeOfTraveler,
    countryCodeMobileNum:string,
    nationality:string,
    profileImage:string,
    description:string
}

export enum TypeOfTraveler{
    SOLO_TRAVELER="Solo Traveler",
    COUPLE="Couple",
    FRIENDS="Friends",
    CAREER_BREAK="Career Break",
    GAP_YEAR="Gap Year",
    STUDENT="Student",
    FAMILY="Family",
    DIGITAL_NOMAD="Digital Nomad"
}

export type TypeOfTravelerType = keyof typeof TypeOfTraveler;

export enum Role{
    TRAVELER="TRAVELER",
    INDIVIDUAL_HOST="INDIVIDUAL_HOST",
    COMPANY_HOST="COMPANY_HOST"
}

