# Forum App

A modern forum application where users can create spaces, interact, and discuss different topics.

## About

This is a community forum platform that allows users to:

- Authenticate and manage their profiles
- Create and join discussion spaces
- Engage in conversations around different topics
- Connect with other users

## Why Designsystemet?

We're using Designsystemet to challenge ourselves with a professional design system used by Norwegian governmental websites and public services. Designsystemet is a suite of tools designed to create consistent and user-friendly digital experiences, making them more efficient and reliable. By implementing this system, we're learning how real-world design systems work while building our forum app.

## Team

**Frontend:**

- [@senbet22](https://github.com/senbet22)
- [@tomive01888](https://github.com/tomive01888)

**Backend:**

- [@Mustac](https://github.com/Mustac)

## Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Designsystemet](https://designsystemet.no/) - UI component library

**Backend:**

- REST API hosted via Swagger

## Features

- 🔐 User authentication
- 👤 User profiles
- 💬 Discussion spaces
- 🗨️ Topic-based conversations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Environment Variables

For some tasks, you need to set up your environment variables.

### Setup

1. Create a `.env.local` file in the root directory of the project

2. Add the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

**Note:** The `.env.local` file is gitignored and will not be committed to the repository. Each team member needs to create their own `.env.local` file.

### Getting API Credentials

Contact Mustac (backend developer) to get the API URL.
