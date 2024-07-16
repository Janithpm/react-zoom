// src/components/ZoomMeeting.tsx
import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

interface ZoomMeetingProps {
  meetingNumber: string;
  userName: string;
  userEmail: string;
  passWord: string;
  signature: string;
  sdkKey: string;
  leaveUrl: string;
}

const ZoomMeeting: React.FC<ZoomMeetingProps> = ({ meetingNumber, userName, userEmail, passWord, signature, sdkKey, leaveUrl }) => {
  useEffect(() => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          userEmail: userEmail,
          passWord: passWord,
          sdkKey: sdkKey,
          success: (res: any) => {
            console.log('join meeting success');
          },
          error: (res: any) => {
            console.log(res);
          }
        });
      },
      error: (res: any) => {
        console.log(res);
      }
    });
  }, [meetingNumber, userName, userEmail, passWord, signature, sdkKey, leaveUrl]);

  return <div id="zoomMeetingSDKElement"></div>;
};

export default ZoomMeeting;