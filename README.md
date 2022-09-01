# FarApps

Highlighting the best apps and builders on the Farcaster community.

![Screenshot](https://i.imgur.com/QjMW6wi.png)

## Getting Started

This project uses Next.js.
Install dependencies and run the development server:

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Apps

Adding and updating apps can be done by editing the `apps.json` file. Follow the same structure as the previous apps, open a PR and once merged it will be automatically added and deployed.

## Project updates

In order to display product udpates 2 pieces of information are needed at `apps.json`:

- `founders_username`
- `tag`

The tag will be used to get all casts that contain that tag from the founders feed.
