import React, { useState, createContext } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = props => {
  const [user, setUser] = useState(null)

  return (
    <ProfileContext.Provider value={[user, setUser]}>
      {props.children}
    </ProfileContext.Provider>
  )
}
