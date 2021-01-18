import React , {useState, useEffect} from "react";
import axios from "axios"

function SinglePost({ match: { params } }) {

  const [state, setstate] = useState({
    post:""
  })

  const {post} = state;

  useEffect(() => {
    getPost()
  }, [])

  const getPost = async ( ) =>{
       try {
         const response = await axios.get(`${process.env.REACT_APP_API}/post/${params.postId}`);
         console.log("Response from SinglePost =====>", response.data)
         setstate({...state, post:response.data});
       } catch (error) {
         console.log("error from users", error);
       }
  }

  return JSON.stringify(post)

}

export default SinglePost;
