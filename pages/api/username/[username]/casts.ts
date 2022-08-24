import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query

  if (username) {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    }

    return fetch(`https://guardian.farcaster.xyz/admin/usernames/${username}`, options)
      .then(async response => response.json())
      .then(async response => {
        return fetch(response.directoryUrl, options)
          .then(async response => response.json())
          .then(async response => {
            return fetch(response.body.addressActivityUrl, options)
              .then(async response => response.json())
              .then(async response => {
                res.status(200).json(response)
              })
              .catch(err => {
                console.log(err)
                res.status(404).end()
              })
          })
          .catch(err => {
            console.log(err)
            res.status(404).end()
          })
      })
      .catch(err => {
        console.log(err)
        res.status(404).end()
      })
  } else {
    return res.end()
  }
}
