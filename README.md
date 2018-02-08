This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Start](#start)
- [Description](#description)
- [Folder Structure](#folder-structure)
- [Configuration](#project-configuration)
- [Version Control Integration](#version-control-integration)

## Start
To get started developing right away:



* Install and start the API server from [Udacity Starter](https://github.com/udacity/reactnd-project-readable-starter)
    * cd api-server
    * npm install
    * node server

* In another terminal window launch the web app
    * install all project dependencies with ```yarn install```
    * start the react web app with ```yarn start```


## Description

This is the project for the final assessment project for Udacity's Redux course. Users are be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also able to edit and delete posts and comments.

This repository includes the code for react web app.

## Folder Structure

Your project should look like this:

```
reactnd-project-readable/
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
