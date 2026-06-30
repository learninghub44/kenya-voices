# Kenya Voices - System Architecture

This document provides a comprehensive overview of the Kenya Voices platform architecture, including system design, data flow, technology choices, and architectural decisions.

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Principles](#architecture-principles)
- [Technology Stack](#technology-stack)
- [System Components](#system-components)
- [Data Architecture](#data-architecture)
- [Application Architecture](#application-architecture)
- [Security Architecture](#security-architecture)
- [Performance Architecture](#performance-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Scalability Considerations](#scalability-considerations)

## System Overview

Kenya Voices is a modern web application built on a server-side rendered (SSR) React framework with a PostgreSQL backend. The platform follows a three-tier architecture:

1. **Presentation Layer**: TanStack Start with React 19, providing SSR and client-side hydration
2. **Application Layer**: Server-side logic with TanStack Router and TanStack Query
3. **Data Layer**: Supabase (PostgreSQL) with Row Level Security

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Browser    │  │  Mobile Web  │  │   Desktop    │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
└─────────┼──────────────────┼──────────────────┼───────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              TanStack Start (SSR + CSR)                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │   Routes    │  │ Components  │  │    Hooks    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                    Application Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              TanStack Router + Query                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │  Route      │  │  Data       │  │  Server     │   │  │
│  │  │  Loaders    │  │  Fetching   │  │  Functions  │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                      Data Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Supabase                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │ PostgreSQL  │  │    Storage   │  │   Auth      │   │  │
│  │  │   Database  │  │   (Photos)   │  │  Service    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Architecture Principles

### 1. Separation of Concerns
- **UI Components**: Pure presentation logic with minimal business logic
- **Custom Hooks**: Reusable stateful logic and side effects
- **Server Functions**: Backend operations and data transformations
- **Utilities**: Pure functions for common operations

### 2. Type Safety
- End-to-end TypeScript with strict mode
- Type-safe routing with TanStack Router
- Schema validation with Zod
- Database type inference from Supabase

### 3. Performance First
- Server-side rendering for fast initial loads
- Code splitting at route level
- Intelligent caching with TanStack Query
- Optimistic UI updates where appropriate

### 4. Security by Design
- Row Level Security (RLS) on all database tables
- IP hashing for user identification
- Input validation on all endpoints
- Minimal data exposure to client

### 5. Developer Experience
- File-based routing for intuitive navigation
- Hot module replacement for fast iteration
- Comprehensive error handling
- Clear separation of server/client code

## Technology Stack

### Frontend Framework
**TanStack Start** - Chosen for:
- Modern React 19 integration with concurrent features
- File-based routing with automatic code splitting
- Built-in server-side rendering and streaming
- Type-safe route parameters and loaders
- Excellent developer experience with tooling

### State Management
**TanStack Query** - Chosen for:
- Server-state management with caching
- Automatic refetching and background updates
- Optimistic updates support
- DevTools for debugging
- TypeScript-first design

### UI Framework
**Radix UI + shadcn/ui** - Chosen for:
- Unstyled, accessible components
- Full keyboard navigation support
- Customizable with Tailwind CSS
- WCAG AA compliance out of the box
- Modern design patterns

### Database
**Supabase (PostgreSQL)** - Chosen for:
- Managed PostgreSQL with automatic backups
- Built-in authentication system
- Real-time subscriptions capability
- Row Level Security for data protection
- Storage API for file uploads
- TypeScript type generation

### Build Tool
**Vite** - Chosen for:
- Extremely fast HMR during development
- Optimized production builds
- Native ESM support
- Plugin ecosystem
- TypeScript support out of the box

## System Components

### 1. Routing System

#### File-Based Routing
TanStack Start uses file-based routing in `src/routes/`:
- **Static Routes**: `about.tsx` → `/about`
- **Dynamic Routes**: `issue.$id.tsx` → `/issue/:id`
- **Layout Routes**: `_layout.tsx` for shared layouts
- **Root Layout**: `__root.tsx` for app shell

#### Route Loaders
Each route can define a `loader` function for server-side data fetching:
```typescript
export const loader = async ({ params }: LoaderFnArgs) => {
  const issue = await getIssue(params.id);
  return { issue };
};
```

#### Code Splitting
Automatic route-based code splitting:
- Only load route code when needed
- Preload linked routes for navigation
- Optimize bundle size automatically

### 2. Data Fetching Layer

#### TanStack Query Integration
- **Query Keys**: Stable, hierarchical keys for cache management
- **Query Functions**: Async functions that fetch data
- **Cache Strategy**: Stale-while-revalidate by default
- **Background Refetching**: Keep data fresh automatically

#### Server Functions
Server-side operations defined in `src/server.ts`:
- Error normalization for SSR failures
- Graceful degradation on errors
- Custom error page rendering

### 3. Component Architecture

#### Component Hierarchy
```
__root.tsx (App Shell)
├── Header (Navigation)
├── Main Content
│   ├── index.tsx (Home)
│   ├── issues.tsx (Issue List)
│   ├── issue.$id.tsx (Issue Detail)
│   ├── report.tsx (Report Form)
│   └── admin.*.tsx (Admin Routes)
└── Footer
```

#### Component Patterns
- **Compound Components**: For complex UI (e.g., Form fields)
- **Render Props**: For flexible composition
- **Custom Hooks**: For reusable logic
- **Higher-Order Components**: For cross-cutting concerns

### 4. Form Handling

#### React Hook Form + Zod
- **Performance**: Minimal re-renders with uncontrolled inputs
- **Validation**: Schema-based validation with Zod
- **Type Safety**: Auto-inferred types from schemas
- **Error Handling**: Built-in error state management

#### Form Schemas
```typescript
const issueSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50),
  categoryId: z.number(),
  countyId: z.number(),
  // ... other fields
});
```

## Data Architecture

### Database Schema

#### Core Tables

**counties**
```sql
- id: SERIAL PRIMARY KEY
- name: TEXT UNIQUE (County name)
- slug: TEXT UNIQUE (URL-friendly identifier)
- code: TEXT (County code)
```

**categories**
```sql
- id: SERIAL PRIMARY KEY
- name: TEXT UNIQUE (Category name)
- slug: TEXT UNIQUE (URL-friendly identifier)
- icon: TEXT (Icon identifier)
```

**issues**
```sql
- id: UUID PRIMARY KEY
- issue_number: TEXT UNIQUE (Human-readable ID)
- tracking_code: TEXT UNIQUE (Public tracking code)
- title: TEXT (Issue title)
- description: TEXT (Detailed description)
- category_id: INTEGER FK → categories
- county_id: INTEGER FK → counties
- sub_county: TEXT (Sub-county name)
- ward: TEXT (Ward name)
- latitude: DOUBLE PRECISION
- longitude: DOUBLE PRECISION
- images: TEXT[] (Array of image URLs)
- additional_notes: TEXT
- status: TEXT (pending, in_progress, resolved, rejected)
- support_count: INTEGER (Number of supporters)
- view_count: INTEGER (Number of views)
- reporter_ip_hash: TEXT (Hashed IP for deduplication)
- reporter_name: TEXT (Optional contact info)
- reporter_phone: TEXT (Optional contact info)
- reporter_email: TEXT (Optional contact info)
- reporter_public: BOOLEAN (Whether to show contact info)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

**comments**
```sql
- id: UUID PRIMARY KEY
- issue_id: UUID FK → issues (CASCADE DELETE)
- author_name: TEXT
- content: TEXT
- is_hidden: BOOLEAN
- created_at: TIMESTAMPTZ
```

**supports**
```sql
- id: UUID PRIMARY KEY
- issue_id: UUID FK → issues (CASCADE DELETE)
- ip_hash: TEXT
- created_at: TIMESTAMPTZ
- UNIQUE(issue_id, ip_hash) (One support per IP per issue)
```

**status_updates**
```sql
- id: UUID PRIMARY KEY
- issue_id: UUID FK → issues (CASCADE DELETE)
- old_status: TEXT
- new_status: TEXT
- note: TEXT
- updated_by: TEXT (Admin username)
- created_at: TIMESTAMPTZ
```

**admins**
```sql
- id: UUID PRIMARY KEY
- username: TEXT UNIQUE
- password_hash: TEXT (bcrypt)
- display_name: TEXT
- created_at: TIMESTAMPTZ
```

### Database Indexes

Strategic indexes for query optimization:
```sql
idx_issues_status ON issues(status)
idx_issues_county ON issues(county_id)
idx_issues_category ON issues(category_id)
idx_issues_created ON issues(created_at DESC)
```

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- **Public Read**: Issues, comments, categories, counties are publicly readable
- **Authenticated Write**: Only authenticated admins can modify data
- **Service Role**: Server-side operations use service role key
- **IP-Based Limits**: Support deduplication via IP hash

### Data Flow

#### Issue Reporting Flow
```
1. User fills report form (client-side validation)
2. Form submitted to server function
3. Server validates with Zod schema
4. Generate issue_number and tracking_code
5. Hash user IP for deduplication
6. Upload images to Supabase Storage
7. Insert issue record with all metadata
8. Return tracking code to user
```

#### Issue Viewing Flow
```
1. User navigates to /issue/:id
2. Route loader fetches issue data (SSR)
3. TanStack Query caches the data
4. Component renders with server data
5. Background refetch keeps data fresh
6. Increment view count (debounced)
```

#### Admin Status Update Flow
```
1. Admin authenticates (session-based)
2. Admin selects issue and new status
3. Server validates admin credentials
4. Create status_update record
5. Update issue status
6. Invalidate relevant caches
7. Notify subscribers (if implemented)
```

## Application Architecture

### Server-Side Rendering (SSR)

#### SSR Benefits
- **SEO**: Search engines can crawl content
- **Performance**: Fast initial page load
- **Progressive Enhancement**: Works without JavaScript
- **Social Sharing**: Rich previews on social platforms

#### SSR Implementation
- Route loaders fetch data on server
- HTML rendered with initial data
- Client hydrates with React
- TanStack Query hydrates cache from server data

### Client-Side Navigation

#### Client-Side Routing
- TanStack Router handles navigation
- No full page reloads
- Preload linked routes
- Scroll restoration
- Browser history integration

#### Code Splitting
- Each route is a separate chunk
- Loaded on-demand
- Preload for navigation
- Optimize bundle size

### Error Handling

#### Error Boundaries
- React error boundaries catch component errors
- Custom error page for user-friendly messages
- Error logging for debugging
- Graceful degradation

#### Server Error Normalization
- h3 error responses normalized
- Catastrophic SSR errors caught
- Custom error page rendered
- Error details logged

## Security Architecture

### Authentication

#### Admin Authentication
- Username/password authentication
- Password hashing with bcryptjs
- Session-based authentication
- Secure cookie storage

#### Public Access
- Anonymous issue reporting
- IP-based deduplication
- No user accounts required for citizens

### Authorization

#### Row Level Security
- Database-level access control
- Policies for read/write operations
- Service role for server operations
- Anon key for client operations

#### Input Validation
- Zod schema validation on all inputs
- Server-side validation (never trust client)
- SQL injection prevention (parameterized queries)
- XSS prevention (React escaping)

### Data Protection

#### Sensitive Data
- Passwords hashed with bcrypt
- IP addresses hashed (not stored raw)
- Optional contact info (admin-only by default)
- No PII stored without consent

#### Privacy
- Anonymous reporting option
- IP hashing for deduplication only
- No tracking cookies
- Minimal data collection

## Performance Architecture

### Caching Strategy

#### TanStack Query Caching
- **Stale Time**: Data considered fresh for 5 minutes
- **Cache Time**: Data kept in cache for 30 minutes
- **Refetch On Window Focus**: Keep data fresh
- **Refetch On Reconnect**: Handle network recovery

#### Server-Side Caching
- HTTP caching headers for static assets
- CDN for asset delivery
- Database query caching (Supabase)

### Performance Optimization

#### Bundle Optimization
- Route-based code splitting
- Tree shaking for unused code
- Dynamic imports for heavy components
- Minification in production

#### Image Optimization
- Client-side image compression before upload
- Responsive image loading
- Lazy loading for images
- WebP format support

#### Database Optimization
- Strategic indexes on frequently queried columns
- Query optimization with proper joins
- Connection pooling (Supabase managed)
- Read replicas for scaling (if needed)

## Deployment Architecture

### Hosting

#### Vercel Deployment
- **Edge Network**: Global CDN for fast delivery
- **Automatic HTTPS**: SSL certificates included
- **Zero-Downtime Deployments**: Rolling updates
- **Preview Deployments**: Test changes before production

#### Environment Configuration
- Environment variables for secrets
- Separate staging/production environments
- Database migrations via Supabase
- Asset storage via Supabase Storage

### Monitoring

#### Error Tracking
- Server error logging
- Client error reporting
- Performance monitoring
- Uptime monitoring

#### Analytics
- Page view tracking
- User behavior analysis
- Performance metrics
- Error rates

## Scalability Considerations

### Horizontal Scaling

#### Application Layer
- Stateless application design
- Serverless functions (Vercel)
- Auto-scaling based on traffic
- Geographic distribution

#### Database Layer
- Supabase managed PostgreSQL
- Read replicas for read-heavy workloads
- Connection pooling
- Query optimization

### Vertical Scaling

#### Database Optimization
- Index optimization
- Query optimization
- Archive old data
- Partition large tables

#### Application Optimization
- Bundle size reduction
- Code splitting
- Lazy loading
- Caching strategies

### Future Enhancements

#### Planned Features
- Real-time notifications (Supabase Realtime)
- Mobile app (React Native)
- API for third-party integrations
- Advanced analytics dashboard
- Machine learning for issue classification

#### Architecture Evolution
- Microservices for specific features
- Event-driven architecture
- GraphQL API layer
- Advanced caching strategies
- CDN for dynamic content

## Conclusion

This architecture provides a solid foundation for the Kenya Voices platform, balancing performance, security, and developer experience. The modular design allows for future enhancements while maintaining code quality and system reliability.

For specific implementation details, refer to the source code and inline documentation.
