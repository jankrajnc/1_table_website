#### Overview:
  A table website to showcase my Angular+Node.js+MySQL knowledge and experiences, as well as to update my current knowledge and include a few new technologies/practices. This application is a lite example of what I've made in a professional enviroment. With most knowledge already attained, some reusable code and a few new things, this project took ~50 hours to complete. With just the basic knowledge of the frameworks, this would be a ~250 hour project.

#### Description:
  This is a simple application which revolves around a table. It has a main object of focus, in this case a car object, with colums such as brand, make, price, etc. The table is very flexible and supports a lot of extra functionality, as well as the used object can be extended as needed. It contains the basic CRUD functionality that's quick to access from the table view itself. Create, update and delete are locked behind required authorization, which is set in the router module, which calls an authorization utility class. For the needs of authorization a user sign up and login functionality exists. The user password at sign up is hashed and at login the user receives a token that confirms his authentication. The user is authorized by being logged in, and his token being verified as valid. I have also included a few dynamic modal windows, which provide the user some options or information for certain actions. Finally there are also tests available for both the client and server side of the application.

#### Functionality:
  - **Routes**:
    - /home or /car-table => A table (ag-grid) of cars which can be added, edited, deleted, viewed and searched. The action buttons in the table rows are an injected component.
    - /add-car => A form where we can input and save car data. The data can either be empty or loaded from a selected car prior to clicking the add button. *The user has to be authorized before accessing this route*.
    - /edit-car => A form where we can modify existing car data. *The user has to be authorized before accessing this route*.
    - /view-car => A read-only form where we can view car data. Mostly useful in cases where we have so many columns that it's difficult to see all the data from the table itself.
    - /signup => A simple form where a user can register his username and password to access certain functionalities.
    - /login => A form where the user authenticates himself based on a previous registration.
  - **Other**:
    - Delete car => We have an action button, which deletes a table entry, and it also *requires authorization*.
    - Modal windows => The application includes two different types of modal windows. Their content is dynamically loaded.
    - Multi layout support => It supports multiple layouts, but only one is used in this example. Could easily be extended.
    - Auth utility => A utility class which helps with user authorization.
    - General utility => The idea is to include useful functions which are commonly used at several points of the application. In this case we only have the modal window calls included in it.

 
#### Technology and practices:
  - **Frontend**:
    - Angular => Showcase my current knowledge and experience
    - Ag-grid => N/A
    - Karma + Jasmin (testing) => Expand my usage of tests for the client-side of the application
  - **Backend**:
    - Node.js + Express.js => Update my current knowledge and practices, improve testing and the use of some libraries
    - Mocha + Chai (testing) + nyc (coverage) => Expand my usage of tests for the server-side of the application
  - **Database**:
    - MySQL => N/A
  - **Other**:
    - bcrypt (authentication) => Implement authentication with this library, simple, but I haven't used it before
    - JWT (authorization) => Revisit JWT and implement the entire authorization flow

#### TODOs:
  - Client side tests,
  - Fix a minor login bug (client),
  - Improve form sending (client),
  - Change the "electric" field of the car (database).
  
#### License
Proprietary software, please view LICENSE.md.
