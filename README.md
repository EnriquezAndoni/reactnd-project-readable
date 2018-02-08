This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Folder Structure](#folder-structure)
- [Configuration](#project-configuration)
- [Version Control Integration](#version-control-integration)
- [Something Missing?](#something-missing?)

## START
To get started developing right away:

* install all project dependencies with ```yarn install```
* start the development server with ```yarn start```


## Folder Structure

Your project should look like this:

```
my-app/
  node_modules/
  public/
    index.html
    favicon.ico
    mainfest.json
  src/
    Components/
    locale/
    Redux/
    Sagas/
    Services/
    index.css
    index.js
    registerServiceWorker.js
  .babelrc
  .env
  .eslintrc
  .gitignore
  package.json
  README.md
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.


## Project configuration

The complete info is located in the [wiki](https://github.com/EnriquezAndoni/react-boilerplate/wiki)

The project works with a different configuration: 
    
  ### Redux, Reduxsauce & Immutable
   
  The project uses a combination of redux, seamless-immutable and reduxsauce.
   
  For more info visit [Combination wiki](https://github.com/EnriquezAndoni/react-boilerplate/wiki/Combination)
   
  ### Middleware 
   
  The middleware's used are: saga and react router redux 
   
  For more info visit [Saga wiki]() or [React router wiki]()
   
  ### jsLingui
   
  Type-checked and intuitive way to internationalize applications in Javascript and React.
  
  
## Version Control Integration

  ### Git Flow
  
  The project uses Git Flow to manage branches, features and releases.
  
  For more info visit [Git flow wiki](https://github.com/EnriquezAndoni/react-boilerplate/wiki/Gitflow)
  
  ### Git Commit Message Style

  This style guide acts as the official guide to follow in the project.

  For more info visit [Git commit wiki](https://github.com/EnriquezAndoni/react-boilerplate/wiki/Git)

## Something Missing?

We are always open to [your feedback](https://github.com/EnriquezAndoni/react-boilerplate/issues)
