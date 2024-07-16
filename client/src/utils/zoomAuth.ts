import axios from 'axios'

const getAccessToken = async (authorizationCode: string): Promise<string> => {
  const response = await axios.post('https://zoom.us/oauth/token', null, {
    params: {
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: 'YOUR_REDIRECT_URI'
    },
    headers: {
      Authorization: 'Basic ' + btoa('YOUR_CLIENT_ID:YOUR_CLIENT_SECRET')
    }
  })

  return response.data.access_token
}

export default getAccessToken