export interface Session{
    token:string,
    profile:Profile
}

export interface Profile{
    userType:UserType
}

export enum UserType{
    TRAVELER="TRAVELER",
    INIVIDUAL="INIVIDUAL",
    COMPANY="COMPANY",
    GUEST="GUEST"
}