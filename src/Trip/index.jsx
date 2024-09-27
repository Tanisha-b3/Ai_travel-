import { AI_PROMPT, Budget } from '@/constants/options'
import { SelectTravelList } from '@/constants/options'
import './index.css'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { chatSession } from '@/components/Service/AIModel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { setDoc } from 'firebase/firestore'
import { doc}from "firebase/firestore";
import { db } from '@/components/Service/Firebase'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import {fcGoogle} from 'react-icons/fc'
function Create_trip() {
  const [open, setOpen] = useState();
  const [loading , setLoading]= useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    people: ""
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
        
  

  useEffect(() => {
    console.log(formData);
  }, [formData]);
 
 
  const Login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log(tokenInfo);
      GetUserProfile(tokenInfo); // Call GetUserProfile after login success
    },
    onError: (error) => console.log(error)
  });
  

const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
{  headers:{
   Authorization: `Bearer ${tokenInfo?.access_token}`,
   Accept:'Application/json'
                 
  }
}
).then((resp)=>{
  console.log(resp);
  localStorage.setItem('user',JSON.stringify(resp.data));
  setOpen(false);
    OnGenerateTrip();
}
)

}
  const OnGenerateTrip = async() => {

    const user=localStorage.getItem('user');
    if(!user){
      setOpen(true);
      return;
    }

    // Check if all required fields are filled
    if (!formData?.destination || !formData?.days || !formData?.budget || !formData.people) {
      toast("Please fill All the Details");
      return;
    }
    setLoading(true);

    // Generate the final prompt with user's input
    const Final_Prompt = AI_PROMPT
      .replace('{location}', formData.destination)
      .replace('{totalDays}', formData?.days)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget);

    console.log(Final_Prompt);

    const result = await chatSession.sendMessage(Final_Prompt);

    console.log("--",result?.response.text());
    setLoading(false);
    SaveTrip(result?.response.text())
  };
     

  const SaveTrip=async(TripData)=>{
     
setLoading(true);
    // Add a new document in collection "cities"
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
     userChoice:formData,
     tripData:JSON.parse(TripData),
userEmail: user?.email
, id:docId
    });
    setLoading(false)
  }
  return (
    <>
      <div className='travel items-center sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>
        <h2 className="font-bold text-3xl"> Tell us your Travel preferences 🌴🏕️</h2>

        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will generate a customized itinerary based 
          on your preferences
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">What is your Destination</h2>
            <input 
              className="w-300 border input1 bg-white" 
              placeholder="Enter Destination"
              onChange={(e) => handleInputChange('destination', e.target.value)}
              

            />
          </div>

          <div>
            <h2 className='text-xl my-1 font-medium'>How many days are you staying</h2>
            <input 
              placeholder="Ex.3" 
              type="number" 
              onChange={(e) => handleInputChange('days', e.target.value)}
              className="border input1  bg-white" 
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-5 font-medium">What is your Budget</h2>
          <div className='grid grid-cols-3 gap-3 mt-4'>
            {Budget.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-3 border rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    className="w-14 h-12 object-contain mb-2"
                  />
                )}
                <h2 className='font-bold'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-10 font-medium">Who are you travelling with?</h2>
          <div className='grid grid-cols-3 gap-3 mt-4'>
            {SelectTravelList.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleInputChange('people', item.people)}
                className={`p-3 border rounded-lg hover:shadow-lg ${formData.people === item.people ? 'shadow-lg border-black' : ''}`}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    className="w-14 h-12 object-contain mb-2"
                  />
                )}
                <h2 className='font-bold'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex button1'>
        <Button disabled = {loading} 
        onClick={OnGenerateTrip}>
        {
          loading? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Plan'
        }</Button>
      </div>

      <Dialog open={open}>
  <DialogContent>
    <DialogHeader>
      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      <DialogDescription>
        <img src='/ex.png' className='h-20 w-50'/>
        <br/> 
        <h2 className='font-bold text-lg'>Sign in with Google</h2>
        <p> Sign in with Google authentication securely</p>
        
        <Button disabled= {loading} 
        onClick={Login}
        className='w-full mt-5 gp-4 items-center'>
             
        <FcGoogle className='w-7 h-7 mr-1'/> Sign in with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </>
  )
}

export default Create_trip;
