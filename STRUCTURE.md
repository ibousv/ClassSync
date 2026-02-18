classsync/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (app)/               # Frontend routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── feed/
│   │   │   ├── library/
│   │   │   ├── homework/
│   │   │   ├── calendar/
│   │   │   └── chat/
│   │   ├── (payload)/           # Payload admin
│   │   │   └── admin/
│   │   └── api/                 # API routes
│   │       ├── pusher/
│   │       └── trpc/
│   │
│   ├── payload/                  # Payload CMS config
│   │   ├── payload.config.ts
│   │   ├── collections/
│   │   │   ├── Users.ts
│   │   │   ├── Resources.ts
│   │   │   ├── Homework.ts
│   │   │   ├── Channels.ts
│   │   │   ├── Messages.ts
│   │   │   ├── Comments.ts
│   │   │   └── Reactions.ts
│   │   ├── access/              # Access control
│   │   ├── hooks/               # Payload hooks
│   │   └── fields/              # Custom fields
│   │
│   ├── components/               # Lit Web Components
│   │   ├── navigation/
│   │   │   └── cs-nav.ts
│   │   ├── feed/
│   │   │   └── cs-feed.ts
│   │   ├── chat/
│   │   │   └── cs-chat-window.ts
│   │   ├── files/
│   │   │   └── cs-file-card.ts
│   │   ├── homework/
│   │   │   └── cs-homework-item.ts
│   │   ├── calendar/
│   │   │   └── cs-calendar.ts
│   │   └── shared/              # Shared components
│   │
│   ├── lib/                      # Utilities
│   │   ├── pusher/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── db/
│   │   └── utils.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── payload-types.ts     # Auto-generated
│   │   └── index.ts
│   │
│   └── styles/                   # Global styles
│       └── globals.css
│
├── public/                       # Static assets
│   ├── icons/
│   └── images/
│
├── tests/                        # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                         # Documentation
│   ├── CONTRIBUTING.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
│
├── .github/                      # GitHub config
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
