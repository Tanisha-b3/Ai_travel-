import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-6">
      <h1 className="font-bold text-4xl mb-4 text-gray-800">
        <span className="text-red-400"> Discover: Your Next Adventure with AI: </span> <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-gray-600 mb-8 font-medium max-w-xl">
        Your Personal Trip Planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to="/Create-trip">
        <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300">
          Get Started, It's Free
        </button>
      </Link>
    </div>
  );
}

export default Hero;
