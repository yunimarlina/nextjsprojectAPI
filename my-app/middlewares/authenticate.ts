import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken';

export default async function authenticated(fn: NextApiHandler){
(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.headers.access_token!, "secret", async function(err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }

    res.status(401).json({ message: 'Sorry you are not authenticated' });
  });
}
};

module.exports = authenticated