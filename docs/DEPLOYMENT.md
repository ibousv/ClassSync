# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Vercel account
- Pusher account

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/your-org/classsync.git
cd classsync
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

Start PostgreSQL with Docker:

```bash
docker-compose up -d
```

Or use an existing PostgreSQL instance.

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URI=postgresql://classsync:classsync_dev@localhost:5432/classsync
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster
NEXT_PUBLIC_PUSHER_KEY=your-pusher-key
NEXT_PUBLIC_PUSHER_CLUSTER=your-pusher-cluster
```

### 5. Generate Secret

```bash
openssl rand -base64 32
```

Use output for `PAYLOAD_SECRET`.

### 6. Run Development Server

```bash
pnpm dev
```

Access:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

### 7. Create Admin User

Navigate to http://localhost:3000/admin and create your first admin user.

## Production Deployment

### Vercel Deployment

#### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings

#### 3. Configure Environment Variables

In Vercel dashboard, add all environment variables from `.env.example`:

**Database**
```
DATABASE_URI=postgresql://user:pass@host:5432/db
```

**Payload**
```
PAYLOAD_SECRET=your-production-secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
```

**Pusher**
```
PUSHER_APP_ID=...
PUSHER_KEY=...
PUSHER_SECRET=...
PUSHER_CLUSTER=...
NEXT_PUBLIC_PUSHER_KEY=...
NEXT_PUBLIC_PUSHER_CLUSTER=...
```

**Vercel Blob**
```
BLOB_READ_WRITE_TOKEN=...
```

#### 4. Deploy

Click "Deploy" and wait for build to complete.

### Database Setup

#### Option 1: Vercel Postgres

1. In Vercel dashboard, go to Storage
2. Create new Postgres database
3. Copy connection string to `DATABASE_URI`

#### Option 2: External PostgreSQL

Use any PostgreSQL provider:
- Supabase
- Railway
- Neon
- AWS RDS

### Pusher Setup

1. Go to https://pusher.com
2. Create new app
3. Copy credentials to environment variables
4. Enable client events if needed

### Vercel Blob Setup

1. In Vercel dashboard, go to Storage
2. Create new Blob store
3. Copy token to `BLOB_READ_WRITE_TOKEN`

## Post-Deployment

### 1. Create Admin User

Visit `https://your-domain.vercel.app/admin` and create admin account.

### 2. Configure Modules

Add your course modules (Java, PHP, C#, etc.) through admin panel.

### 3. Create Channels

Set up chat channels for different subjects.

### 4. Invite Users

Share class code or invite link with students.

## Environment-Specific Configuration

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Staging

```env
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://staging.your-domain.com
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

## CI/CD Pipeline

GitHub Actions automatically runs on push:

1. **Lint** - Code style checks
2. **Type Check** - TypeScript validation
3. **Test** - Unit and integration tests
4. **Build** - Production build verification

Deployment to Vercel happens automatically on push to `main`.

## Monitoring

### Vercel Analytics

Enabled by default. View in Vercel dashboard:
- Page views
- Performance metrics
- Error tracking

### Database Monitoring

Monitor PostgreSQL performance:
- Query execution time
- Connection pool usage
- Database size

### Pusher Monitoring

Track real-time usage in Pusher dashboard:
- Active connections
- Message volume
- Channel subscriptions

## Backup Strategy

### Database Backups

**Automated** (Recommended)
- Vercel Postgres: Automatic daily backups
- External providers: Configure backup schedule

**Manual**
```bash
pg_dump $DATABASE_URI > backup.sql
```

### Media Backups

Vercel Blob handles redundancy automatically.

## Scaling

### Horizontal Scaling

Vercel automatically scales serverless functions based on traffic.

### Database Scaling

- Increase connection pool size
- Add read replicas for heavy read workloads
- Upgrade database tier as needed

### Pusher Scaling

Upgrade Pusher plan for:
- More concurrent connections
- Higher message throughput
- Additional channels

## Troubleshooting

### Build Failures

Check Vercel build logs for errors:
```bash
vercel logs
```

### Database Connection Issues

Verify connection string format:
```
postgresql://user:password@host:port/database?sslmode=require
```

### Pusher Connection Issues

Verify credentials and cluster match between server and client.

### Type Generation

Regenerate Payload types:
```bash
pnpm payload generate:types
```

## Security Checklist

- [ ] Strong `PAYLOAD_SECRET` set
- [ ] Database uses SSL connection
- [ ] Environment variables not committed
- [ ] Admin panel protected
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Regular dependency updates

## Performance Optimization

### Enable Caching

Configure Next.js caching in `next.config.js`:

```javascript
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

### Optimize Images

Use Next.js Image component for automatic optimization.

### Database Indexing

Add indexes for frequently queried fields:
- `module` in Resources
- `dueDate` in Homework
- `channel` in Messages

## Maintenance

### Regular Updates

```bash
pnpm update
```

### Security Patches

Monitor and apply security updates promptly.

### Database Maintenance

Run periodic VACUUM and ANALYZE on PostgreSQL.

## Rollback Procedure

### Vercel Rollback

1. Go to Vercel dashboard
2. Select deployment
3. Click "Promote to Production"

### Database Rollback

```bash
psql $DATABASE_URI < backup.sql
```

## Support

For deployment issues:
- Check documentation
- Review Vercel logs
- Contact support channels
