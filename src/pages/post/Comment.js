import React, {useState} from "react";
import CommentForm from "../../components/forms/CommentForm";

function Comment({postId, comments, updateComments}) {
  const [state, setState] = useState({text:""})
  const {text} = state;

  return (
    <div>
      <h1> Leave a comment</h1>
      <CommentForm state={state} setState={setState} postId={postId} comments={comments} updateComments={updateComments}/>
    </div>
  );
}

export default Comment;
