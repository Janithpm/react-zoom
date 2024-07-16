// src/App.tsx
import React, { useState, useEffect } from 'react'
import getAccessToken from './utils/zoomAuth'
import createMeeting from './utils/zoomMeeting'
import ZoomMeeting from './components/ZoomMeeting'

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [meetingData, setMeetingData] = useState<{ id: string; password: string } | null>(null)
  const [signature, setSignature] = useState<string>('')

  useEffect(() => {
    const fetchAccessToken = async () => {
      const authorizationCode = 'YOUR_AUTHORIZATION_CODE'
      const token = await getAccessToken(authorizationCode)
      setAccessToken(token)
    }

    fetchAccessToken()
  }, [])

  useEffect(() => {
    if (accessToken) {
      const createZoomMeeting = async () => {
        const meeting = await createMeeting(accessToken)
        setMeetingData(meeting)
        // Generate signature using your backend
        const generatedSignature = await fetch('/api/generateSignature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            meetingNumber: meeting.id,
            role: 1 // Host role
          })
        }).then(res => res.text())
        setSignature(generatedSignature)
      }

      createZoomMeeting()
    }
  }, [accessToken])

  if (!meetingData || !signature) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Zoom Meeting Integration</h1>
      <ZoomMeeting
        meetingNumber={meetingData.id}
        userName="Your Name"
        userEmail="your-email@example.com"
        passWord={meetingData.password}
        signature={signature}
        sdkKey="YOUR_SDK_KEY"
        leaveUrl="YOUR_LEAVE_URL"
      />
    </div>
  )
}

export default App