import airplane from '../assets/airplane (1).png';
import champagne from '../assets/champagne-glass.png';
import family1 from '../assets/family.png';
import wallet from '../assets/wallet.png';
import salary from '../assets/salary.png';
import money from '../assets/money.png';
import friends from '../assets/friendship.png'
export const SelectTravelList = [
    {
        id: 1,
        title: 'justMe',
        desc: 'A sole travels in exploration',
        icon: airplane, // Directly assign the imported image
        people: '1',
    },
    {
        id: 2,
        title: 'A couple',
        desc: 'Two travels in tandem',
        icon: champagne, // Directly assign the imported image
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventure',
        icon: family1, // Directly assign the imported image
        people: '3',
    },
    {

    id: 4,
    title: 'Friends',
    desc: 'A group of trill-seekers',
    icon: friends, // Directly assign the imported image
    people: '5',
    }
];

export const Budget = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: wallet, // Directly assign the imported image
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: salary, // Directly assign the imported image
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about the cost',
        icon: money, // Directly assign the imported image
    },
];
export const AI_PROMPT = 'Generate Travel Plan for Location:{location} for {totalDays} Days for {people} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in json format';
