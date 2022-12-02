# Airport Management System(team-project-gamma)
## Team Members:
Tanya Gupta - 014748799\
Sai Subhash - 016003403

## Tools and Languages:
Frontend - React\
Backend - Nodejs, Expressjs\
Database - MongoDB\
Cloud - Amazon Web Services

## Project Management Tool:
Git Project Board(https://github.com/orgs/gopinathsjsu/projects/43)

## Scrum meetings schedule:
- Friday, Sunday

## Tasks:
Frontend: Karthik, Tanya\
Backend: Sriram, Subhash, Tanya

## Diagrams

### Architecture Diagram:
![image](https://user-images.githubusercontent.com/54052517/204246964-c37a8a57-85da-49bc-b209-cf185c54688d.png)

### Component Diagram:
![image](https://github.com/gopinathsjsu/team-project-gamma/blob/main/Component%20Diagram.png)

### Deployment Diagram:
![image](https://github.com/gopinathsjsu/team-project-gamma/blob/main/Deploymentdiagram.png)

### Use Case Diagram
![image](https://github.com/gopinathsjsu/team-project-gamma/blob/main/UseCaseDiagram.png)

### DB Diagram
![image](https://github.com/gopinathsjsu/team-project-gamma/blob/main/DB%20Diagram.png)

## Extreme programming (XP) Core Values Implemented:
- Simplicity
  We used a critical eye to determine the most important aspects of the project scope and only did what was required.
  As we introduced new APIs and matching UI components, actively striving to eliminate duplications helped us keep our code simple to maintain.
  We made sure that the names of all classes, methods, and variables were explicit and disclosed the goal.

- Feedback
  During the early development and testing phase, feedback was crucial. We made it a point to pay attention to everyone's suggestions without interrupting them.
  We had a built-in 20-minute feedback session at the conclusion of every meeting to check on what went according to plan and what needed to be fixed in the future.
  We tested features made by other team members and provided comments to each other during the testing process. It aided us in locating the bugs.
  We were able to identify barriers, improve, and perform better as a result of the feedback we received.
  
- Respect
  Within the team, the basic concept of respect creates a healthy and happy environment.
  We made it a top priority to treat everyone in the team with respect. With brainstorming meetings, each member was given encouragement for all of their ideas. It was critical to listen to the issues and assist each team member in any manner possible.
  We took into account all of the feedback or review remarks provided by each team member, and we had no doubts about their talents.
  
  ## Design Decisions:
  
  ### Architecture-level:
   1. MERN stack.
   2. Separate deployment environments for frontend and backend applications.
   
  ### Application Design-level:
  - Leveraging nodeJS and Express design patterns to design APIs. These design patterns helped us add new APIs relatively easily
  
  ### Business-level:
  Below listed are decisions/use cases considered for features provided by the application
  
  Passenger:
  1. Can view the Departure and Arrival Flight
  2. Can filter flights based on next 1hr, 2hr and 4hr
  
  Airport employee:
  1. Can perform gate maintenance by enabling or diabling the gates
  2. Can also assign Baggare carousel for the recent arrival flights
  
  Airline employee:
  1. Can add a new departure or arrival flight
  2. Can update an existing flight by changing the status(LATE/EARLY) and dateTime
  
  ## Sprint Journal:
  https://docs.google.com/spreadsheets/d/1SfdxGNY-hpq9JRzJfjc5X_GzWy2DqSnGsxJobipnNb0/edit?usp=sharing
  
  ## Sprint Sheet
  
  ## UI Screenshots
  ![sign-in-page](https://user-images.githubusercontent.com/54052517/204259031-120ad5f4-7b87-4a94-93be-2da576b3265c.PNG)
  ![airline-dashboard](https://user-images.githubusercontent.com/54052517/204259864-04bccac5-ae38-45bf-ba2c-098d048909c1.PNG)
  ![airline-form-add](https://user-images.githubusercontent.com/54052517/204259927-c562dd5e-0fc6-4227-b212-0a2531d00d0d.PNG)
  ![airline-form-update](https://user-images.githubusercontent.com/54052517/204259960-c4d72f97-dca5-40e0-9230-3dfdc8469b66.PNG)
  ![home-arrivals](https://user-images.githubusercontent.com/54052517/204260033-86d56eb4-0449-4b69-8021-e7f7cfba23b0.PNG)
  ![home-departures](https://user-images.githubusercontent.com/54052517/204260071-b8e88b64-e168-415e-b096-b3ec27e7ddc1.PNG)
  ![airport-gates](https://user-images.githubusercontent.com/54052517/204260109-266ae2ad-da16-4a31-82cb-e28ceb4cef1d.PNG)
  ![airport-baggage](https://user-images.githubusercontent.com/54052517/204260128-12855bb7-def2-452a-9d3e-89dc17730a81.PNG)
  
  
  ## How to run the app:
  1. Clone the repository
    ```
    git clone https://github.com/gopinathsjsu/team-project-gamma.git
    ```
  2. Go to 'be' repository
    ```
    cd be
    npm install
    npm start
    ```
  3. Go to 'frontend' repository
    ```  
    cd frontend
    npm install
    npm start
    ```
  The web application opens in the default browser


