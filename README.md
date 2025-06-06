# GitHub User Explorer - React + TypeScript + Vite

A React + TypeScript + Vite application demonstrating component-based UI with context usage, asynchronous data fetching, and comprehensive testing using Vitest and React Testing Library.

## Description

This project implements a Github user listing and public repository explorer using [GitHub API](https://developer.github.com/v3/) interface with reusable components for UI feedback. It leverages React context for state management and handles error states gracefully. The app is fully covered with unit and integration tests to ensure robustness.

## Demo
1. Desktop View

[Watch the video](https://github.com/user-attachments/assets/3e42c0e8-4ce9-46f4-841b-26b5d19b6daf)

3. Mobile View

[Watch the video](https://github.com/user-attachments/assets/857dbdb2-58d5-4c67-81b0-0460093919f0)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```
2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Usage
Start the development server:
```bash
npm run dev
# or
yarn dev
```
Open your browser and navigate to http://localhost:5173/ (or your configured port).

## Testing
Run all tests (unit and integration):
```bash
npm run test
# or
yarn test
```
- Unit tests reside in the /tests/unit/ directory with .test.tsx.
- Integration tests reside in the /tests/integration/ directory with .integration.test.tsx suffix.
- Tests use Vitest as the test runner and React Testing Library for component testing.

## Build

To create a production build of the project, run:

```bash
npm run build
# or
yarn build
```

## Features
- User list display with async repository fetching
- Error notification through SnackBar component
- Usage of React context for global state management
- Comprehensive unit and integration testing

## Project Structure (Brief Overview)
```
src/
├── api/             # API Call Functions
│   └── github/      # Github API Call
├── assets/          # Icons and images
├── components/      # React components (ListUser, SnackBar, etc.)
├── context/         # React context providers and hooks
├── helpers/         # Utility functions
tests/
├── integration/     # Integration test files
├── unit/            # Unit tests
```

## Contributing
Contributions are welcome! Please open issues or pull requests. Follow consistent code style and write tests for new features.

## License
This project is licensed under the MIT License.

## Acknowledgments
Thanks to all collaborators and open source libraries that made this project possible!
