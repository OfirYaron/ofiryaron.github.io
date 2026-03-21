# Hosting React Site on GitHub Pages

## What is GitHub Pages?

GitHub Pages is a static site hosting service provided by GitHub, allowing users to showcase their projects directly from a GitHub repository. It supports both user or organization pages and project pages.

## Why React Client Rendering is a Good Match

React's client-side rendering (CSR) is well-suited for GitHub Pages due to its simplicity and ease of integration. With CSR, the browser takes on the responsibility of rendering the React components, making it a seamless fit for static site hosting.

## How to Get Started

To host a React site on GitHub Pages, follow these steps:

1. **Create a React App:** Develop your React application using tools like Create React App.

2. **Build the App:** Generate a build of your React app using the `npm run build` command.

3. **Create a GitHub Repository:** Create a GitHub repository to host your React app.

4. **Configure GitHub Pages:** In the repository settings, navigate to the "Pages" section, and set the source branch to the `gh-pages` branch.

5. **Push to GitHub:** Push the contents of the build folder (usually named `build`) to the `gh-pages` branch.

6. **Access Your Site:** Your React app is now live on GitHub Pages at `https://username.github.io/repository-name`.

## Routing

### Understanding Routing

React applications often use client-side routing to navigate between different views without a full page reload. This improves the user experience by creating a single-page application (SPA).

### Using HashRouter Rather Than BrowserRouter

When deploying a React app on GitHub Pages, it's recommended to use `HashRouter` instead of `BrowserRouter` to handle client-side routing. This is because GitHub Pages doesn't support server-side routing, and the hash in the URL helps maintain client-side routing.

```jsx
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}
```

## Handling Deployment from Another Repo

### Using GitHub Pages for Deployment

To automate deployment using GitHub Pages, you can use GitHub Actions. Below is an example GitHub Actions workflow for deploying your React app:

```yaml
name: Deploy

on:
  pull_request:
    types:
      - closed
  push:
    tags:
      - '**'
  workflow_dispatch:

jobs:
  deployment:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Branch
        uses: actions/checkout@v3

      - name: Build
        run: |
          npm install
          npm run build
          echo 'Build successful'

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build
          branch: gh-pages
          repository-name: username/repository-name
          token: ${{ secrets.GH_ACTION_TOKEN }}
```

Make sure to replace `username/repository-name` with your actual GitHub username and repository name.

### Using GitHub Environment Secret for Deployment Actions Environment and Secrets

For enhanced security, store sensitive information, such as access tokens, as GitHub secrets. In the example above, `${{ secrets.GH_ACTION_TOKEN }}` references a secret named `GH_ACTION_TOKEN`. Ensure you create this secret in your repository settings.

Now, your React app is set up, and changes will be automatically deployed to GitHub Pages when a pull request is closed, a tag is pushed, or manually triggered.