import React from 'react'

function EditPost({match:{params}}) {
  return (
    <div>
      <h2>Edit Post</h2>
      {params.postId}
    </div>
  )
}

export default EditPost
