import {Role} from "@src/state/stores/user/models";

export enum OpportunityCategory{
     Hostel="hostel",
     Hotel="hotel",
     GuestHouse="guestHouse",
     Farm="farm",
     EcoVillage="ecoVillage",
     SkiCenter="skiCenter",
     Camping="camping",
     Ngo="ngo",
     LocalCommunity="localCommunity",
     AnimalShelter="animalShelter",
     SurfClub="surfClub",
     Winery="winery",
     Boat="boat",
     HomeStay="homeStay",
     Individual="individual",
     PrivateProject="privateProject"
}

export type OpportunityCategoryType = keyof typeof OpportunityCategory;

export enum TypeOfHelpNeeded{
     Reception="reception",
     Cleaning="cleaning",
     HouseKeeping="houseKeeping",
     AdministrativeTasks="administrativeTasks",
     TourGuide="tourGuide",
     Babysitter="babysitter",
     Vet="vet",
     AnimalCare="animalCare",
     Languages="languages",
     SportsTeacher="sportsTeacher",
     Surfing="surfing",
     PersonalTrainer="personalTrainer",
     Farming="farming",
     Painting="painting",
     Handyman="handyman",
     SocialMedia="socialMedia",
     Photography="photography",
     Videography="videography",
     WebDevelopment="webDevelopment",
     Cooking="cooking",
     Bartending="bartending",
     Service="service"
}

export type TypeOfHelpNeededType = keyof typeof TypeOfHelpNeeded;

export enum Accommodation{
     PrivateRoom="privateRoom",
     SharedRoom="sharedRoom",
     Dorm="dorm",
     Tent="tent"
}

export type AccommodationType = keyof typeof Accommodation;

export enum Meal{
     Breakfast="breakfast",
     Lunch="lunch",
     Dinner="dinner",
     UseSharedKitchen="useSharedKitchen"
}

export type MealType = keyof typeof Meal;

export enum Languages{
     Greek="greek",
     English="english",
     Spanish="spanish",
     Italian="italian",
     German="german"
}

export type LanguagesType = keyof typeof Languages;

export enum LearningOpportunities{
     Hospitality="hospitality",
     Languages="languages",
     AnimalWelfare="animalWelfare",
     Volunteering="volunteering",
     CultureExchange="cultureExchange",
     CharityWork="charityWork",
     Farming="farming",
     Photography="photography",
     Videography="videography",
     Technology="technology",
     NonProfit="nonProfit",
     Art="art",
     WaterSports="waterSports",
     Nature="nature",
     Writing="writing",
     Yoga="yoga",
     Fitness="fitness",
     Dancing="dancing",
     Gardening="gardening",
     Cycling="cycling",
     Books="books",
     Babysitting="babysitting",
     Cooking="cooking",
     Computers="computers",
     Programming="programming",
     SelfDevelopment="selfDevelopment",
     Sustainability="sustainability",
     Hitchhiking="hitchhiking",
     Sailing="sailing",
     Music="music",
     Movies="movies",
     Fashion="fashion",
     History="history",
     Architecture="architecture"
}

export type LearningOpportunitiesType = keyof typeof LearningOpportunities;

export interface PlacemarkAttributes{
     name:string,
     country:string,
     area:string,
     locality:string,
     postalCode:string
}

export interface OpportunityLocation{
     placemark:PlacemarkAttributes,
     longitude:string,
     latitude:string
}

export interface OpportunityDates{
     startDate:string,
     endDate?:string
}

export interface Opportunity{
     opportunityId:string,
     memberId:string,
     role:Role,
     opportunityCategory:OpportunityCategory,
     images:any[],
     imageUrls:string[],
     jobTitle:string,
     jobDescription:string,
     typeOfHelpNeeded:TypeOfHelpNeeded[],
     opportunityLocation:OpportunityLocation,
     opportunityDates:OpportunityDates[],
     minimumDays:number;
     maximumDays:number,
     totalWorkingHours:number,
     daysOff:number|0,
     languagesRequired:Languages[],
     languagesSpoken:Languages[],
     accommodationProvided:Accommodation,
     meals:Meal[],
     additionalOfferings:string[],
     learningOpportunities:LearningOpportunities[],
     adventuresOffered:string,
     wifi:boolean,
     smokingAllowed:boolean,
     petsAllowed:boolean
}

export interface CustomLocation{
     streetNumber:string,
     route:string,
     locality:string,
     administrativeArea:string,
     country:string,
     postalCode:string
}

export enum LocationFields{
     street_number="street_number",
     route = "route",
     locality="locality",
     administrative_area="administrative_area",
     country="country",
     postal_code="postal_code"
}
