# Farm Automation Dashboard

A modern web application for automating farming tasks, inspired by Sunflower Land.

## Features

- User authentication with username, password, and PIN
- Discord webhook integration for registration notifications
- Modern, responsive UI with Tailwind CSS
- Protected routes with JWT authentication
- Dashboard with toggleable automation modules
- Level-based feature unlocking

## Prerequisites

- Node.js 18+ and npm
- SQLite (included with Prisma)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd farm-automation
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Create a `.env` file in the root directory with the following variables:
```env
JWT_SECRET=your-secret-key-here
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/src/app` - Next.js app directory
  - `/api` - API routes
  - `/dashboard` - Dashboard page
  - `/login` - Login page
  - `/register` - Registration page
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- JWT for authentication
- bcryptjs for password hashing
- react-hot-toast for notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
