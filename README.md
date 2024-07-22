## Cloned from https://github.com/renchester/top-todo-list

## The Odin Project

# Project: To-do list

[**Live version** of the site can be found here](https://renchester.github.io/top-todo-list/)

This to-do list webapp allows you to take notes, list tasks, and organize these tasks through projects.

Features:

1. _*Home Page*_
   This main panel displays all the tasks listed regardless of their project. Within the task bar are options to display the task details, edit the details, and delete the task entirely.

2. _*Sidebar*_
   The sidebar allows you to filter the tasks either by project, by urgency, or by their due dates. The details of the project are also editable.

3. _*Notes*_
   The notes tab displays all the notes taken. The notes themselves are also editable within each note box.

4. _Authentication and Cloud Storage_
   The app uses Firebase services (authentication and Firestore) to store user data in the cloud.
**Note**: If you want to run this web app on your laptop, you need to create a Firebase app and get the SDK API Keys. See https://firebase.google.com/docs/web/setup for more information. After creating your own Firebase app, you should export the keys as environment variables. For example, I added these statements in my ~/.zshrc
```
    export FBASE_API_KEY="<PUT_YOUR_FBASE_KEY_HERE>"
    export FBASE_AUTH_DOMAIN="<PUT_YOUR_AUTH_DOMAIN_HERE>.firebaseapp.com"
    export FBASE_PROJECT_ID="<PUT_YOUR_FBASE_PROJECT_ID_HERE>"
    export FBASE_STORAGE_BUCKET="<PUT_YOUR_FBASE_STORAGE_BUCKET_NAME_HERE>.appspot.com"
    export FBASE_MESSAGING_SENDER_ID="<PUT_YOUR_MESSAGING_SENDER_ID_HERE>"
    export FBASE_APP_ID="<PUT_YOUR_FBASE_APP_ID_HERE>"
```
You also need to enable your own sign-in method in Firebase console for authentication. I enabled Google sign-in so that I can sign in with my Google account. See https://firebase.google.com/docs/auth/web/google-signin for more information.
One more thing, you need to create a Cloud Storage bucket so that your to-do list items can be persisted. See https://firebase.google.com/docs/storage/web/start for more information.

   The

Add tasks by clicking on the "Add" button (located at the bottom of the main panel). Enter in a description, due date, urgency, and project name. Tasks listed without specific projects will only show up in the default _Home_ panel.

### Technologies Used

- Typescript
- Firebase (Authentication and FirestoreDB)
- HTML5
- CSS

### Getting Started

In order to setup and work on this project on your own, you will need to:

1. Clone this project:  
   `git clone https://github.com/renchester/top-todo-list.git`

2. Once you have cloned this project, you can install the required dependencies by using:  
   `yarn install`

3. A live demo of the project can be started by using:  
   `yarn start`

4. Web application can be accessed at http://localhost:8080
   
5. Distribution files can be produced using:  
   `yarn run build`

6. To run dockerized app (See https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e for reference)
   `docker compose -f docker-compose.dev.yml up -d`
   Web app can be accessed at http://localhost:9001

7. To stop dockerized app
   `docker compose -f docker-compose.dev.yml stop`

### Deployed on GitHub Pages

Deployed on [GitHub Pages](https://pages.github.com/)

### Display

![view of the page](img/todo-list-view.png)

---

Developed by **Renchester Ramos**
