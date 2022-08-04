import {Role} from "@src/state/stores/user/models";
import {Pagination} from "@src/utilities/fetch";

export enum OpportunityCategory{
     hostel="Hostel",
     hotel="Hotel",
     guestHouse="Guest House",
     farm="Farm",
     ecoVillage="Eco Village",
     skiCenter="Ski Center",
     camping="Camping",
     ngo="Ngo",
     localCommunity="Local Community",
     animalShelter="Animal Shelter",
     surfClub="Surf Club",
     winery="Winery",
     boat="Boat",
     homeStay="Home Stay",
     individual="Individual",
     privateProject="Private Project"
}

export type OpportunityCategoryType = keyof typeof OpportunityCategory;

export enum TypeOfHelpNeeded{
     reception="Reception",
     cleaning="Cleaning",
     houseKeeping="House Keeping",
     administrativeTasks="Administrative Tasks",
     tourGuide="Tour Guide",
     babysitter="Babysitter",
     vet="Vet",
     animalCare="Animal Care",
     languages="Languages",
     sportsTeacher="Sports Teacher",
     surfing="Surfing",
     personalTrainer="Personal Trainer",
     farming="Farming",
     painting="Painting",
     handyman="Handyman",
     socialMedia="Social Media",
     photography="Photography",
     videography="Videography",
     webDevelopment="Web Development",
     cooking="Cooking",
     bartending="Bartending",
     service="Service"
}

export type TypeOfHelpNeededType = keyof typeof TypeOfHelpNeeded;

export enum Accommodation{
     privateRoom="Private Room",
     sharedRoom="Shared Room",
     dorm="Dorm",
     tent="Tent"
}

export type AccommodationType = keyof typeof Accommodation;

export enum Meal{
     breakfast="Breakfast",
     lunch="Lunch",
     dinner="Dinner",
     useSharedKitchen="Use Shared Kitchen"
}

export type MealType = keyof typeof Meal;

export enum Languages{
     greek="Greek",
     english="English",
     spanish="Spanish",
     italian="Italian",
     german="German"
}

export type LanguagesType = keyof typeof Languages;

export enum LearningOpportunities{
     hospitality="Hospitality",
     languages="Languages",
     animalWelfare="Animal Welfare",
     volunteering="Volunteering",
     cultureExchange="Culture Exchange",
     charityWork="Charity Work",
     farming="Farming",
     photography="Photography",
     videography="Videography",
     technology="Technology",
     nonProfit="Non Profit",
     art="Art",
     waterSports="Water Sports",
     nature="Nature",
     writing="Writing",
     yoga="Yoga",
     fitness="Fitness",
     dancing="Dancing",
     gardening="Gardening",
     cycling="Cycling",
     books="Books",
     babysitting="Babysitting",
     cooking="Cooking",
     computers="Computers",
     programming="Programming",
     selfDevelopment="Self Development",
     sustainability="Sustainability",
     hitchhiking="Hitchhiking",
     sailing="Sailing",
     music="Music",
     movies="Movies",
     fashion="Fashion",
     history="History",
     architecture="Architecture"
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

export interface FiltersFields{
     opportunityCategory:OpportunityCategory|undefined|null,
     typeOfHelpNeeded:TypeOfHelpNeeded[]|[],
     minimumDays:number|undefined,
     maximumDays:number|undefined,
     languagesRequired:Languages[],
     accommodationProvided:Accommodation|undefined,
     meals:Meal[],
     longitude:number|undefined,
     latitude:number|undefined,
     endDate:string|undefined,
     startDate:string|undefined
}

export interface FilterCoordinates{
     longitude:number,
     latitude:number,
     opportunityId:string
}

export interface PagingObjects{
     data:any[],
     pagination:Pagination
}

export enum FilterTypes{
     CATEGORY,
     TYPE_OF_HELP,
     MINDAYS,
     MAXDAYS,
     LANGUAGE,
     ACCOMMODATION,
     MEAL,
     LONGTITUDE,
     LATITUDE,
     END_DATE,
     START_DATE
}

export interface RefData{
     value:string,
     label:string,
     selected:boolean
}
