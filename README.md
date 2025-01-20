# Catalog Dashboard

The **Catalog Dashboard** is an Angular 19-based application designed for managing and visualizing product catalogs. It leverages Angular Material for a modern UI, ECharts for data visualization, and JSON Server for simulating backend APIs during development.

---

## Features

- Modern UI built with Angular Material.
- Interactive charts powered by ECharts.
- Local backend simulation using JSON Server.
- Lightweight, fast, and scalable for catalog management.

---

## Prerequisites

Ensure the following are installed before running the project:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Angular CLI**: v19.1.2 or higher

To install Angular CLI globally:
```bash
npm install -g @angular/cli@19.1.2
```

---

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-repo/catalog-dashboard.git

# Navigate to the project directory
cd catalog-dashboard

# Install dependencies
npm install
```

---

## Running the Application

The project includes scripts for starting both the application and a simulated backend.

### Start the Backend
Start the JSON Server on port 3000:
```bash
npm run start:server
```

### Start the Frontend
Start the Angular development server:
```bash
npm run start:app
```

### Start Both Simultaneously
To run both servers concurrently:
```bash
npm start
```

Once started, the application will be available at [http://localhost:4200/](http://localhost:4200/), and the backend API will run on [http://localhost:3000/](http://localhost:3000/).

---

## Building the Application

To build the application for production:
```bash
npm run build
```

The build artifacts will be output to the `dist/` directory.

---

## Code Scaffolding

Generate new components, directives, or services using Angular CLI:
```bash
ng generate component component-name
ng generate directive directive-name
ng generate service service-name
```

For a list of all available schematics:
```bash
ng generate --help
```

---

## Running Tests

### Unit Tests
Execute unit tests using Karma:
```bash
npm run test
```

### End-to-End (e2e) Testing
Angular CLI does not include an e2e testing framework by default. You can integrate a framework such as [Cypress](https://www.cypress.io/) for end-to-end testing.

---

## Dependencies

### Production Dependencies
- **@angular/animations**: Angular animations support.
- **@angular/cdk**: Component Dev Kit for building Angular components.
- **@angular/material**: Angular Material for UI components.
- **ngx-echarts**: Angular wrapper for ECharts.
- **rxjs**: Reactive programming library.
- **zone.js**: Angular's execution context library.

### Development Dependencies
- **json-server**: Simulates a REST API backend.
- **concurrently**: Runs multiple scripts concurrently.
- **karma**: Unit test runner.
- **typescript**: TypeScript compiler.

---

## Project Structure

- **src/**: Contains the application source code.
- **db.json**: Mock data for the JSON Server.
- **dist/**: Production build artifacts.
- **angular.json**: Angular CLI configuration.
- **package.json**: Project dependencies and scripts.

---

## Additional Resources

- [Angular Material](https://material.angular.io/)
- [ECharts Documentation](https://echarts.apache.org/)

---

## Potential Improvements

The project has room for further enhancements to improve its robustness, scalability, and maintainability. Here are some suggestions:

- **Unit Testing:** Implement comprehensive unit tests for all components, services, and utility functions.
- **Mock-Based Testing:** Use mocks to isolate dependencies and ensure accurate testing of individual modules.
- **Performance Analysis:** Analyze and optimize the application's performance, focusing on data loading times and rendering efficiency.
- **Project Scalability:** Review the project's structure to ensure it can accommodate future features and a growing codebase.
- **Complex Features:** Implement advanced features like dynamic chart filtering, data export functionalities, and user role management.
- **Code Reviews:** Regularly conduct code reviews to maintain code quality and adherence to best practices.
- **Continuous Integration:** Set up CI/CD pipelines for automated testing and deployment.
- **Documentation:** Expand on project documentation to include detailed developer guides and API references.
