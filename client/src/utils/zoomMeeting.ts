import axios from 'axios'

interface MeetingResponse {
  id: string
  password: string
}

const createMeeting = async (accessToken: string): Promise<MeetingResponse> => {
  const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
    topic: 'New Meeting',
    type: 1, // Instant meeting
    settings: {
      host_video: true,
      participant_video: true
    }
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.data
}

export default createMeeting