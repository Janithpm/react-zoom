import express from 'express'
import crypto from 'crypto'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(bodyParser.json())

const sdkKey = 'YOUR_SDK_KEY'
const sdkSecret = 'YOUR_SDK_SECRET'

app.post('/api/generateSignature', (req, res) => {
  const { meetingNumber, role } = req.body
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(sdkKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', sdkSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  res.send(signature)
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))