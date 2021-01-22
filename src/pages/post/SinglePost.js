import React , {useState, useEffect} from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
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

  const renderPost = (post) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";
   return (
     <Card>
       <CardImg
         className="img-thumbnail mb-3"
         top
         width="100%"
         // height="320vw"
         objectFit="cover"
         src={`${process.env.REACT_APP_API}/post/photo/${
           post._id
         }?${new Date().getTime()}`}
         alt={post.title}
         onError={(i) => (i.target.src = "/avatar.png")}
         style={{ height: "300px", objectFit:"cover" }}
       />
       <CardBody>
         {/* <CardTitle tag="h5">{post.title}</CardTitle> */}
         {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle> */}
         <CardText>
           {post.body}
         </CardText>
         <br />
         <Link
           to={`/`}
           className="btn btn-sm border border-dark rounded text-dark"
         >
           Back to Posts
         </Link>
         <p className="font-italic mt-3">
           Posted by <Link to={`${posterId}`}>{posterName} </Link>
           on {new Date(post.created).toDateString()}
         </p>
       </CardBody>
     </Card>
   );
  }

  return (
    <div className="container">
    <h2 className="display-4 mt-5 mb-5">
      {post.title}
    </h2>

    {renderPost(post)}

    </div>
  )

}

export default SinglePost;
