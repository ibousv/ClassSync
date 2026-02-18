# Contributing to ClassSync

Thank you for considering contributing to ClassSync. This document outlines the process and guidelines for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your work
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or modifications
- `chore/description` - Maintenance tasks

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(chat): add message threading support

Implement nested replies in chat messages with proper indentation
and visual hierarchy.

Closes #123
```

```
fix(homework): correct deadline calculation

Fixed timezone issue causing incorrect countdown display
for homework deadlines.
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

### PR Title Format

Use the same format as commit messages:

```
feat(component): add new functionality
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type

### Lit Components

- Use decorators for properties and state
- Follow shadow DOM best practices
- Implement proper accessibility attributes
- Use CSS custom properties for theming

### File Organization

- One component per file
- Co-locate tests with source files
- Group related functionality in directories
- Use barrel exports (index.ts) for public APIs

### Naming Conventions

- Components: PascalCase (`UserProfile.ts`)
- Files: kebab-case (`user-profile.ts`)
- Variables/Functions: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- CSS Classes: kebab-case (`user-profile-card`)

## Testing Guidelines

### Unit Tests

- Test individual functions and components
- Mock external dependencies
- Aim for high coverage on business logic

### Integration Tests

- Test component interactions
- Test API endpoints
- Test database operations

### E2E Tests

- Test critical user flows
- Test across different browsers
- Keep tests maintainable and fast

## Documentation

- Document all public APIs
- Add JSDoc comments for functions
- Update README for significant changes
- Include examples in documentation

## Performance Considerations

- Optimize bundle size
- Lazy load components when possible
- Minimize re-renders
- Use proper caching strategies

## Security

- Never commit secrets or credentials
- Validate all user inputs
- Follow OWASP guidelines
- Report security issues privately

## Questions?

Open an issue for discussion or reach out to maintainers.
