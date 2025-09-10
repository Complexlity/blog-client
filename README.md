# Complexlity Blog

This is the frontend client of My Blog.

![Blog Homepage](https://github.com/Complexlity/blog-client/assets/105590967/06425efd-3d64-4eeb-9412-e488887c746c)


## Tech Stack

- **Frontend Framework**: Next.js 13+
- **Styling**: Tailwind CSS with DaisyUI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text Editor**: Editor.js
- **Authentication**: Custom JWT-based auth
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI, Shadcn/ui
- **Deployment**: Vercel

## Prerequisites

- Node.js 18.0.0 or later
- Bun (recommended) or npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Complexlity/blog-client.git
cd blog-client
```

### 2. Install dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```bash
cp .env.sample .env
```

Add Upload thing env variables:

```env
UPLOADTHING_SECRET=<https://uploadthing.com/>
UPLOADTHING_APP_ID=https://uploadthing.com/>
```

### 4. Run the development server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
blog-client/
├── public/               # Static files
│   └── fonts/            # Custom fonts
├── src/
│   ├── app/              # App router pages
│   │   ├── api/          # API routes
│   │   ├── create/       # Blog post creation page
│   │   ├── login/        # Login page
│   │   ├── posts/        # Blog posts pages
│   │   └── signup/       # Signup page
│   ├── Components/       # Reusable UI components
│   │   ├── renderers/    # Editor.js renderers
│   │   └── ui/           # UI components
│   ├── Contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── store/            # State management
│   └── styles/           # Global styles
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
└── tailwind.config.js    # Tailwind CSS configuration
```

## Available Scripts

- `bun dev` or `npm run dev` - Start the development server
- `bun build` or `npm run build` - Create an optimized production build
- `bun start` or `npm start` - Start the production server
- `bun lint` or `npm run lint` - Run ESLint

## Backend API

This frontend works with the [Complexlity Blog API](https://github.com/Complexlity/blog-api). Make sure to set up and run the backend server for full functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
