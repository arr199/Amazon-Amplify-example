import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { useState } from 'react';
Amplify.configure(awsconfig);

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};


function App() {

  const [  formData , setFormData] = useState({ email : "" , password : ""})
  
 async function signUp({ username, password, email, phoneNumber }: SignUpParameters) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  return (
    <>
      <main className="grid place-items-center w-full h-screen">
      <h1 className="text-3xl">Sign up</h1>
        <form className='flex flex-col gap-4'>
            <label htmlFor="">Email</label>
            <input  
            value={formData.email}  onChange={(e) => setFormData({...formData , email : e.target.value}) } type="text" />
            <label htmlFor="">Password</label>
            <input 
            value={formData.password}  onChange={(e) => setFormData({...formData , password : e.target.value}) } type="password" />

        </form>
 
      </main>
     
    </>
  )
}

export default App
