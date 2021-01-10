import React, {useState, useEffect} from 'react'
import { isAuth } from "../../components/helpers/auth";


function Profile({match:{params}}) {
  const [state, setState] = useState({
    user:"",
    redirectToSignin:""
  })

  useEffect(() => {

    console.log("user id from route params", params.userId)

  }, [])

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">
        Profile
      </h2>
  <p>Hello {isAuth().data.user.name}</p>

    </div>
  )
}

export default Profile
