# Frontend - ReferralAI

Next.js React frontend for the ReferralAI hiring platform.

## Setup

```bash
npm install
npm run dev  # Starts development server on port 3000
```

## Features

- **Authentication**: Login & registration with role-based access
- **Candidate Dashboard**: AI skill dashboard with job recommendations
- **Recruiter Dashboard**: Post jobs, view matched candidates, create interviews
- **Referrer Dashboard**: Browse candidates, send screening chats, recommend
- **Live Interview**: Real-time video, code editor, violation detection
- **Real-time Communication**: Socket.io powered chat and notifications

## Pages

- `/` - Landing page
- `/auth/login` - Login
- `/auth/register` - Sign up
- `/dashboard/candidate` - Candidate dashboard
- `/dashboard/recruiter` - Recruiter dashboard
- `/dashboard/referrer` - Referrer dashboard
- `/interview` - Live interview room

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Testing

```bash
npm run test
```
