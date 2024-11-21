# SuperheroApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# superhero-app

## Why We Use `setTimeout` Instead of an Interceptor

In this project, we simulate API calls to manage superhero data. While Angular provides powerful tools like HTTP interceptors for handling requests and responses globally, we opted for a simpler approach using `setTimeout` for the following reasons:

### 1. Simulating Delays

Using `setTimeout` allows us to mimic the behavior of real-world API calls, which often have inherent delays due to network latency. This helps us create a more realistic user experience during development and testing.

### 2. Simplicity

For a mock project, implementing an interceptor can add unnecessary complexity. By using `setTimeout`, we can easily control the timing of our responses without the overhead of setting up an interceptor, which would require additional configuration and management.

### 3. Focus on Core Functionality

Our primary goal is to demonstrate the functionality of the superhero management system. By keeping the implementation straightforward with `setTimeout`, we can focus on the core features of the application without getting bogged down in the intricacies of HTTP interceptors.

### 4. Flexibility

Using `setTimeout` gives us the flexibility to adjust the delay for different operations (e.g., adding, editing, or deleting superheroes) without affecting the entire request/response flow. This allows for tailored user feedback based on specific actions.

### Conclusion

While interceptors are a valuable feature in Angular for handling HTTP requests, in the context of this mock project, `setTimeout` provides a more straightforward and effective way to simulate API interactions. This approach allows us to maintain focus on the application's core functionality while still providing a realistic user experience.
