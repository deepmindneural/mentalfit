# MentalFit - Mental Health Platform

A modern web application for mental health services, built with Next.js and Supabase.

## 🚀 Features

- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 👥 **Multi-role Support** - Admin, Company Admin, Professional, and User roles
- 📊 **Analytics Dashboard** - Comprehensive mental health metrics and insights
- 💬 **Real-time Chat** - Chat support for users
- 📅 **Session Management** - Schedule and manage therapy sessions
- 👨‍⚕️ **Professional Directory** - Find and connect with mental health professionals
- 💳 **Billing** - Subscription and payment management
- 📈 **Mental Health Metrics** - Track stress, anxiety, depression, sleep quality, and satisfaction
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Deployment**: Docker, Vercel-ready

## 📁 Project Structure

```
mentalfit/
├── apps/
│   └── web/                # Next.js web application
│       ├── src/
│       │   ├── app/       # Next.js App Router pages
│       │   ├── components/ # React components
│       │   ├── lib/       # Supabase clients and utilities
│       │   ├── hooks/     # Custom React hooks
│       │   ├── styles/    # Global styles
│       │   └── types/     # TypeScript types
│       ├── public/        # Static assets
│       └── Dockerfile     # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8.15.1+
- A Supabase account (https://supabase.com)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd mentalfit
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up Supabase**

- Create a new project at https://supabase.com
- Get your project URL and anon key from Settings > API
- Copy the environment file:

```bash
cp apps/web/.env.example apps/web/.env.local
```

- Update `apps/web/.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Run the development server**

```bash
pnpm dev
```

The app will be available at http://localhost:3000

## 🐳 Docker

### Build and run with Docker Compose

```bash
docker-compose up -d
```

### Build for production

```bash
cd apps/web
docker build -t mentalfit-web .
```

## 📝 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
pnpm format       # Format code with Prettier
```

## 🗄️ Supabase Setup

### Required Tables

You'll need to create the following tables in your Supabase project:

1. **users** - User profiles and information
2. **companies** - Company/organization information
3. **professionals** - Mental health professionals
4. **sessions** - Therapy sessions
5. **assessments** - Mental health assessments
6. **chat_conversations** - Chat conversations
7. **chat_messages** - Chat messages
8. **notifications** - User notifications
9. **payments** - Payment and subscription data

### Authentication

Supabase Auth is configured for:
- Email/Password authentication
- Social logins (optional: Google, GitHub, etc.)
- Role-based access control (RBAC)

## 🎨 Customization

### Theming

The app uses Tailwind CSS with custom colors defined in `apps/web/tailwind.config.js`:

- **Primary**: Green (#22c55e) - Represents growth and wellness
- **Secondary**: Yellow (#eab308) - Highlights and accents
- **Accent**: Gray/Blue (#64748b) - Neutral elements

### Fonts

- **Sans**: Inter
- **Display**: Poppins

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the root directory to `apps/web`
4. Add environment variables
5. Deploy!

### Docker

Build and deploy the Docker image:

```bash
docker build -t mentalfit-web apps/web
docker run -p 3000:3000 --env-file apps/web/.env.local mentalfit-web
```

## 🔒 Security

- All sensitive data is encrypted at rest in Supabase
- Row Level Security (RLS) policies protect user data
- Environment variables are never committed to the repository
- HTTPS enforced in production

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the team for contribution guidelines.

## 📧 Support

For support, contact the development team.