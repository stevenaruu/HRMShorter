import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name?: string;
  resultCode: number;
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const endpoint = 'http://hrms.ict.binus.edu/attendancemachine/doattendance';

  const payload = {
    username: process.env.REACT_APP_NIM,
    location: 'online',
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    Connection: 'keep-alive',
  };

  try {
    const response = await axios.post(endpoint, payload, { headers });
    const { data } = response;
    if (data.result === '1') {
      res.status(200).json({ name: data.name, resultCode: 200, result: data.name + " Check In" });
    } else if (data.result === '2') {
      res.status(200).json({ name: "", resultCode: 200, result: data.name + " Check Out" });
    } else if (data.result === '-1') {
      res.status(200).json({ resultCode: 500, result: 'Member ID Not Found' });
    } else if (data.result === '-2') {
      res.status(200).json({ resultCode: 102, result: 'Please Wait Five Minutes Before Check Out' });
    } else if (data.result === '-3') {
      res.status(200).json({ resultCode: 500, result: 'You Are Not Authorized. Report Has Been Submitted' });
    } else if (data.result === '-4') {
      res.status(200).json({ resultCode: 102, result: 'You Already Check In Today' });
    } else {
      res.status(200).json({ resultCode: 500, result: 'Unhandled error' });
    }
  } catch (error) {
    res.status(500).json({ resultCode: 500, result: 'Internal Server Error' });
  }
}
