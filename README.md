# Kenya Voices

![License](https://img.shields.io/badge/license-Proprietary-red)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Database](https://img.shields.io/badge/database-PostgreSQL_(Supabase)-blue)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black)

A civic engagement platform designed to empower Kenyan citizens to report, track, and advocate for resolution of community issues across all 47 counties. Built and maintained with modern web technologies to provide a transparent, accessible interface for civic participation.

A TanStack Start (React 19 + TypeScript) frontend backed by Supabase (PostgreSQL), enabling citizens to report infrastructure and governance issues with geolocation and photo evidence. Each issue is tracked with unique codes, with role-based dashboards for citizens and administrators to manage status updates and community engagement.

## Landing page

![Landing Page](docs/screenshots/landing.png)

Screenshots above are placeholders — drop your own PNGs into `docs/screenshots/` using the filenames referenced in this README (landing.png, report-issue.png, issue-detail.png, admin-dashboard.png, issues-list.png) and they'll render here automatically on GitHub.

## Features

- **Issue Reporting**: Citizens can report infrastructure, service delivery, and governance issues with geolocation and photo evidence
- **Issue Tracking**: Real-time status updates on reported issues with tracking codes
- **Public Awareness**: Browse and search issues by county, category, or status
- **Government Accountability**: Transparent dashboard for administrators to manage and respond to issues
- **Community Engagement**: Support system for citizens to endorse and comment on issues affecting their communities

## Tech Stack

- **TanStack Start**: Modern React framework with file-based routing, server-side rendering, and optimized data fetching
- **React 19**: Latest React with concurrent features and improved performance
- **TypeScript**: Type-safe development with strict configuration
- **Tailwind CSS v4**: Utility-first CSS framework with modern build pipeline
- **Radix UI**: Unstyled, accessible component primitives for complex UI patterns
- **Supabase**: PostgreSQL database with real-time subscriptions, authentication, and storage
- **TanStack Query**: Server-state management with caching, synchronization, and background updates
- **TanStack Router**: Type-safe routing with route-level data loading and code splitting

---

## Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime
- Supabase project with PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kenya-voices
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up the database**
   - Run the SQL setup script in your Supabase SQL Editor:
     ```bash
   cat supabase_setup.sql
     ```
   - Create a public storage bucket named `issue-photos` in Supabase Dashboard
   - Visit `/admin/setup` to create your initial admin account

5. **Start development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Build for production**
   ```bash
   bun run build
   # or
   npm run build
   ```

---

## Architecture

### Project Structure
```
kenya-voices/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party service integrations
│   ├── lib/             # Utility functions and configurations
│   ├── routes/          # File-based routing (TanStack Start)
│   ├── server.ts        # Server entry point with error handling
│   ├── router.tsx       # Router configuration
│   └── start.ts         # Application bootstrap
├── public/              # Static assets
└── supabase_setup.sql   # Database schema and seed data
```

### Routing Convention
TanStack Start uses file-based routing in `src/routes/`:
- `index.tsx` → `/`
- `about.tsx` → `/about`
- `issue.$id.tsx` → `/issue/:id` (dynamic routes)
- `admin.dashboard.tsx` → `/admin/dashboard`
- `__root.tsx` → Root layout wrapping all routes

### Database Schema
The application uses a PostgreSQL database with the following core entities:
- **counties**: All 47 Kenyan counties with geospatial data
- **categories**: Issue categories (Roads, Water, Health, Education, etc.)
- **issues**: Reported issues with metadata, location, and status
- **comments**: Community discussions on issues
- **supports**: Citizen endorsements with deduplication by IP hash
- **status_updates**: Issue status change history
- **admins**: Administrative user accounts with authentication

---

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables Required
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous public key

### Database Considerations
- Ensure Row Level Security (RLS) is properly configured
- Use service role keys for server-side operations
- Regular backups of PostgreSQL database
- Monitor storage usage for issue photos

---

## Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed system architecture and design decisions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines and development workflow
- **[LICENSE](LICENSE)** - Proprietary license agreement

---

## License

This project is proprietary software. All rights are reserved. See LICENSE file for details.

---

## Support

For technical issues or questions about the platform, contact the development team through internal channels.

---

## Acknowledgments

Built for the advancement of civic engagement and transparent governance in Kenya.
