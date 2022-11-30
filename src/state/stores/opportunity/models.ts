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
     RECEPTION="Reception",
     CLEANING="Cleaning",
     HOUSE_KEEPING="House Keeping",
     ADMINISTRATIVE_TASKS="Administrative Tasks",
     TOUR_GUIDE="Tour Guide",
     BABYSITTER="Babysitter",
     VET="Vet",
     ANIMAL_CARE="Animal Care",
     LANGUAGES="Languages",
     SPORTS_TEACHER="Sports Teacher",
     SURFING="Surfing",
     PERSONAL_TRAINER="Personal Trainer",
     FARMING="Farming",
     PAINTING="Painting",
     HANDYMAN="Handyman",
     SOCIAL_MEDIA="Social Media",
     PHOTOGRAPHY="Photography",
     VIDEOGRAPHY="Videography",
     WEB_DEVELOPMENT="Web Development",
     COOKING="Cooking",
     BARTENDING="Bartending",
     SERVICE="Service"
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
     GREEK="Greek",
     ENGLISH="English",
     SPANISH="Spanish",
     ITALIAN="Italian",
     GERMAN="German",
     DUTCH="Dutch",
     SWEDISH="Swedish",
     NORWEGIAN="Norwegian",
     POLISH="Polish",
     PORTUGUESE="Portuguese",
     SERBIAN="Serbian",
     CROATIAN="Croatian",
     BULGARIAN="Bulgarian"
}

export type LanguagesType = keyof typeof Languages;

export enum LanguageProficiency{
     BEGINNER="Beginner",
     INTERMEDIATE="Intermediate",
     FLUENT="Fluent"
}

export type LanguageProficiencyType = keyof typeof LanguageProficiency;

export enum LearningOpportunities{
     HOSPITALITY="Hospitality",
     LANGUAGES="Languages",
     ANIMAL_WELFARE="Animal Welfare",
     VOLUNTEERING="Volunteering",
     CULTURE_EXCHANGE="Culture Exchange",
     CHARITY_WORK="Charity Work",
     FARMING="Farming",
     PHOTOGRAPHY="Photography",
     VIDEOGRAPHY="Videography",
     TECHNOLOGY="Technology",
     NON_PROFIT="Non Profit",
     ART="Art",
     WATER_SPORTS="Water Sports",
     NATURE="Nature",
     WRITING="Writing",
     YOGA="Yoga",
     FITNESS="Fitness",
     DANCING="Dancing",
     GARDENING="Gardening",
     CYCLING="Cycling",
     BOOKS="Books",
     BABYSITTING="Babysitting",
     COOKING="Cooking",
     COMPUTERS="Computers",
     PROGRAMMING="Programming",
     SELF_DEVELOPMENT="Self Development",
     SUSTAINABILITY="Sustainability",
     HITCHHIKING="Hitchhiking",
     SAILING="Sailing",
     MUSIC="Music",
     MOVIES="Movies",
     FASHION="Fashion",
     HISTORY="History",
     ARCHITECTURE="Architecture"
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
