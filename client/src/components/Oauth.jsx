import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice'

const Oauth = () => {

  const dispatch = useDispatch();

    const handleGoogleAuth = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);

          const result = await signInWithPopup(auth, provider);

          // for storing the user details
          const response = await fetch("/api/auth/google", {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
              name : result.user.displayName,
              email : result.user.email,
              photo : result.user.photoURL,
            }),
          }); 

          const data = await response.json();
          console.log(data);
          dispatch(signinSuccess(data));
            
        } catch (error) {
            console.log('unable to login with google', error);
        }
    }

  return (
    <button type='button' onClick={handleGoogleAuth} className="bg-red-700 p-3 rounded-lg text-white uppercase font-medium hover:opacity-95">Continue with Google</button>
  )
}

export default Oauth