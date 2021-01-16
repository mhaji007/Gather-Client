import React from 'react'

function ProfileTabs({ followings, followers }) {
  return (
    <div>
      <div>
        followings
        {JSON.stringify(followings)}
      </div>
      <div>
        followers
        {JSON.stringify(followers)}
      </div>
    </div>
  );
}

export default ProfileTabs
