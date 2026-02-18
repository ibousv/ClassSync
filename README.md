# ClassSync

Open-source collaborative platform for academic management and student mutual assistance.

> **Note:** This project is in early development (v0.0.1). Features and APIs may change. Not recommended for production use yet.

## Features

- **Media Library** - Document sharing organized by module
- **Homework Manager** - Deadline tracking with countdown and completion status
- **Dynamic Calendar** - Course scheduling and event management
- **Activity Feed** - Real-time class activity stream with filtering
- **Live Chat** - Instant messaging with module-specific channels
- **Mutual Help System** - Comments, reactions, and karma badges

## Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/classsync.git
cd classsync

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start database
docker-compose up -d

# Run development server
pnpm dev
```

Access at http://localhost:3000

## Tech Stack

- **Frontend** - Lit Web Components, TypeScript
- **Backend** - Payload CMS 3.0, Next.js 15
- **Database** - PostgreSQL
- **Real-time** - Pusher
- **Hosting** - Vercel

## Project Structure

```
classsync/
├── src/
│   ├── app/              # Next.js routes
│   ├── components/       # Lit Web Components
│   ├── payload/          # CMS collections and config
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript definitions
├── docs/                 # Documentation
├── tests/                # Test suites
└── public/               # Static assets
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and data model
- [API Reference](./docs/API.md) - REST and GraphQL endpoints
- [Deployment](./docs/DEPLOYMENT.md) - Production setup guide
- [Contributing](./docs/CONTRIBUTING.md) - Development guidelines
- [Developer Guide](./docs/DEVELOPER_GUIDE.md) - Extending with new features
- [Component Guide](./docs/COMPONENT_GUIDE.md) - Building Lit components
- [Extension Example](./docs/EXAMPLE_EXTENSION.md) - Complete feature implementation

## Core Concepts

### Collections

- **Users** - Authentication with role-based access (student, delegate, admin)
- **Modules** - Course definitions with total hours (Java, PHP, C#, etc.)
- **Resources** - Course materials linked to modules
- **Homework** - Assignments with due dates and completion tracking
- **Channels** - Chat rooms for real-time communication
- **Messages** - Chat messages with live updates
- **Comments** - Feedback on resources and homework
- **Reactions** - Like, helpful, question reactions

### Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management |
| **Delegate** | Homework/module/channel management, moderation |
| **Student** | Create resources, comments, reactions, messages |

### Real-time Features

- Live chat with Pusher WebSocket
- Activity feed updates
- Reaction notifications
- Homework completion tracking

## Extensibility

ClassSync is designed for easy extension. Developers can add:

### New Collections
```typescript
// src/payload/collections/YourCollection.ts
export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  fields: [/* your fields */],
}
```

### New Components
```typescript
// src/components/your-component.ts
@customElement('cs-your-component')
export class CsYourComponent extends LitElement {
  // your component logic
}
```

### New API Routes
```typescript
// src/app/api/your-route/route.ts
export async function GET(req: NextRequest) {
  // your API logic
}
```

See [Developer Guide](./docs/DEVELOPER_GUIDE.md) for detailed instructions.

## Testing

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm 8+

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm test         # Run tests
pnpm type-check   # TypeScript validation
```

### Environment Variables

See `.env.example` for required configuration.

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### Workflow

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance tasks
```

## License

MIT License - see [LICENSE](./LICENSE)

## Community

- Report bugs via [GitHub Issues](https://github.com/your-org/classsync/issues)
- Request features via [GitHub Discussions](https://github.com/your-org/classsync/discussions)
- Contribute via [Pull Requests](https://github.com/your-org/classsync/pulls)

## Acknowledgments

Built to facilitate student collaboration and academic success.
