import {
    LanguageProficiency,
    Languages,
    LearningOpportunities,
    TypeOfHelpNeeded
} from "@src/state/stores/opportunity/models";

export interface Session {
    token: string,
    profile: Profile
}

export interface Profile {
    userType: Role
}

export type RoleType = keyof typeof Role;

export interface RegistrationDto {
    role: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    birthday: string,
    countryCodeMobileNum: string,
    mobileNum: string,
    nationality: string,
    sex: string,
}

export interface Traveler extends RegistrationDto {
}

export interface Individual extends RegistrationDto {
}

export interface Company extends RegistrationDto {
    companyName: string,
    companyId: string
}

export interface LoginResponse {
    memberId: string,
    role: string
}

export interface LoginForm {
    email: string,
    password: string
}

export interface CompanyHostProfileDto {
    memberId?: string,
    role: string,
    companyName: string,
    companyId: string
    email: string,
    headquartersCounty: string,
    mobileNum: string,
    countryCodeMobileNum: string,
    fixedNumber: string,
    profileImage?: Image,
    description: string,
    address: string,
    postalAddress: string,
    vatNumber: string,
    link: string,
    city: string,
    country: string,
}

export interface IndividualHostProfile {
    memberId: string,
    role: string,
    name: string,
    surname: string,
    email: string,
    country: string,
    mobileNum: string,
    countryCodeMobileNum: string,
    postalAddress: string,
    nationality: string,
    profileImage: string,
    description: string,
    fixedNumber: string
    sex: string
}

export interface TravelerProfileDTO {
    memberId?: string,
    role: string,
    name: string,
    surname: string,
    email: string,
    birthday: string,
    countryCodeMobileNum: string,
    mobileNum: string,
    nationality: string,
    address: string,
    city: string,
    country: string
    sex: string,
    postalAddress: string,
    description: string,
    typeOfTraveler: string,
    profileImage?: Image,
    interests: string[],
    languages: ProfileLanguage[],
    skills: string[]
    experience: ProfileExperience[],
    specialDietary: string,
    driverLicense: boolean,
}

export interface Image {
    imageId: string,
    imageUrl: string
}

export interface ProfileExperience {
    experienceId: string,
    experience: Experience
}

export interface ProfileLanguage {
    languages: Languages,
    languageProficiency: LanguageProficiency
}

export enum SpecialDietary {
    NONE = "None",
    VEGAN = "Vegan",
    VEGETARIAN = "Vegeterian"
}

export type SpecialDietaryType = keyof typeof SpecialDietary;

export interface Experience {
    typeOfExperience: TypeOfExperience,
    position: string,
    nameOfOrganisation: string,
    startedOn: string,
    endedOn: string,
    description: string
}

export enum TypeOfExperience {
    COMPANY = "Company",
    UNIVERSITY = "University"
}

export type TypeOfExperienceType = keyof typeof TypeOfExperience;

export enum TypeOfTraveler {
    SOLO_TRAVELER = "Solo Traveler",
    COUPLE = "Couple",
    FRIENDS = "Friends",
    CAREER_BREAK = "Career Break",
    GAP_YEAR = "Gap Year",
    STUDENT = "Student",
    FAMILY = "Family",
    DIGITAL_NOMAD = "Digital Nomad"
}

export type TypeOfTravelerType = keyof typeof TypeOfTraveler;

export enum Role {
    TRAVELER = "TRAVELER",
    INDIVIDUAL_HOST = "INDIVIDUAL_HOST",
    COMPANY_HOST = "COMPANY_HOST"
}

