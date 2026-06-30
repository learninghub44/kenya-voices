# Contributing to Kenya Voices

Thank you for your interest in contributing to Kenya Voices. This document outlines the guidelines and processes for contributing to this project.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:
- Be respectful and considerate in all interactions
- Welcome diverse perspectives and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards
Examples of behavior that contributes to a positive environment:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites
- Familiarity with React, TypeScript, and modern web development
- Understanding of TanStack Start framework
- Experience with Supabase or PostgreSQL
- Git and GitHub workflow knowledge

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `bun install`
4. Configure environment variables (see README.md)
5. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions or updates
- `chore/` - Maintenance tasks

### Commit Message Format
We follow the Conventional Commits specification:
```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

Example:
```
feat(issue-reporting): add image upload functionality

Implement multi-image upload for issue reports with:
- Drag and drop support
- Image preview
- Size validation
- Compression optimization

Closes #123
```

### Pull Request Process
1. Update documentation if needed
2. Ensure all tests pass
3. Run linting: `bun run lint`
4. Format code: `bun run format`
5. Update CHANGELOG.md if applicable
6. Submit pull request with descriptive title and description
7. Reference related issues using `#issue-number`
8. Request review from maintainers

### Code Review Guidelines
- Be constructive and specific in feedback
- Focus on the code, not the person
- Explain the reasoning behind suggestions
- Acknowledge good work and improvements
- Respond to review comments promptly

## Coding Standards

### TypeScript
- Use strict mode configuration
- Avoid `any` types; use proper type definitions
- Prefer interfaces over types for object shapes
- Use type guards for runtime type checking
- Document complex types with JSDoc comments

### React Components
- Use functional components with hooks
- Follow single responsibility principle
- Keep components under 300 lines when possible
- Use TypeScript interfaces for props
- Document component purpose and usage

```typescript
interface ComponentProps {
  /** Description of the prop */
  propName: string;
}

/**
 * Brief description of what the component does
 */
export function Component({ propName }: ComponentProps) {
  // Implementation
}
```

### File Organization
- Group related files in directories
- Use index files for clean imports
- Keep utility functions in `lib/` directory
- Place reusable components in `components/` directory
- Separate hooks into `hooks/` directory

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic HTML elements
- Ensure proper color contrast for accessibility
- Test on multiple screen sizes

### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Implement error boundaries for React components
- Handle loading states gracefully

## Testing

### Test Coverage
- Aim for >80% code coverage
- Write unit tests for utility functions
- Write integration tests for components
- Test critical user flows end-to-end
- Test error scenarios and edge cases

### Running Tests
```bash
bun run test          # Run all tests
bun run test:watch    # Run tests in watch mode
bun run test:coverage # Generate coverage report
```

### Test Structure
- Place tests in `__tests__` directories
- Name test files with `.test.ts` or `.spec.ts` suffix
- Use descriptive test names
- Group related tests with `describe` blocks
- Use `beforeEach`/`afterEach` for setup/teardown

## Documentation

### Code Documentation
- Document complex functions with JSDoc
- Explain non-obvious logic in comments
- Keep comments up-to-date with code changes
- Use TODO comments for temporary solutions

### README Updates
- Update README.md for user-facing changes
- Update installation instructions if needed
- Add new environment variables to documentation
- Update feature descriptions and examples

### API Documentation
- Document API endpoints with OpenAPI/Swagger
- Include request/response examples
- Document error responses
- Note authentication requirements

## Performance Guidelines

### Optimization Best Practices
- Use React.memo for expensive components
- Implement virtualization for long lists
- Lazy load routes and components
- Optimize images and assets
- Use TanStack Query for efficient data fetching
- Implement proper caching strategies

### Bundle Size
- Monitor bundle size with each change
- Use code splitting for large features
- Avoid unnecessary dependencies
- Use tree-shaking for unused code
- Analyze bundle with `bun run build:analyze`

## Security Guidelines

### Data Validation
- Validate all user inputs with Zod schemas
- Sanitize data before database operations
- Use parameterized queries
- Implement rate limiting on public endpoints
- Validate file uploads (type, size, content)

### Authentication & Authorization
- Never expose sensitive data in client code
- Use environment variables for secrets
- Implement proper session management
- Use Supabase RLS policies for data access
- Log authentication events for audit trails

### Dependencies
- Regularly update dependencies
- Review security advisories
- Use `bun audit` to check for vulnerabilities
- Pin critical dependency versions
- Review third-party code before integration

## Issue Reporting

### Bug Reports
Include the following information:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or recordings if applicable
- Environment details (OS, browser, version)
- Relevant logs or error messages

### Feature Requests
- Describe the feature and use case
- Explain why it would be valuable
- Provide examples or mockups if possible
- Consider implementation complexity
- Discuss potential alternatives

## Release Process

### Versioning
We follow Semantic Versioning (SemVer):
- MAJOR: Incompatible API changes
- MINOR: Backwards-compatible functionality
- PATCH: Backwards-compatible bug fixes

### Release Checklist
- Update version in package.json
- Update CHANGELOG.md
- Tag release in Git
- Create GitHub release
- Deploy to production
- Monitor for issues

## Questions or Concerns

For questions about contributing or the project:
- Open an issue on GitHub
- Contact maintainers through official channels
- Review existing issues and discussions first

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- Project documentation for major features

Thank you for contributing to Kenya Voices and helping improve civic engagement in Kenya!
