# SkyChat

SkyChat is a React-based chat frontend with AWS Amplify authentication and a WebSocket-powered public chat room.

## Features

- Email/password sign up and sign in with AWS Cognito (Amplify Auth)
- Email verification flow with resend code support
- Real-time public chat UI over a WebSocket API
- Connection status and authenticated user session handling

## Tech Stack

- React (Create React App)
- AWS Amplify Auth (`@aws-amplify/auth`)
- WebSocket API (AWS API Gateway endpoint)
- GitHub Actions for CI/CD

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm ci
```

### Run the app

```bash
npm start
```

Open `http://localhost:3000`.

### Run tests

```bash
npm test -- --watchAll=false
```

### Build

```bash
npm run build
```

## Configuration

Amplify auth settings are defined in:

- `/home/runner/work/skychat/skychat/src/aws-exports.js`

Update Cognito values there for your AWS environment.

## CI/CD

This repository includes two GitHub Actions workflows:

- **CI** (`.github/workflows/ci.yml`)
  - Triggers on push and pull request to `main`
  - Runs dependency installation, tests, and production build

- **CD** (`.github/workflows/cd.yml`)
  - Triggers on push to `main` and manual dispatch
  - Builds and deploys the app to GitHub Pages

To use CD, enable **GitHub Pages** in repository settings with **GitHub Actions** as the source.
