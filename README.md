# DotNetCore_Angular_SystemTest

Points discussed :

Created Tricor.API Core(6.0) and used JWT (JSON Web Token) for securely transmitting information

Enabled CORS in Asp.Net Core.

Angular : 
  Created a Angular web application which contains the following features.
  Login Page – with valid user credentials.
  Module selection in landing page – Admin and User module.
 
 1. Admin Module : Create a CRUD page called risks.
 2. User Module : User can be able to create new risk and also can be able to select from admin. Once click “select from admin” button, user can choose the risk which added in admin.


How to Run the Code 

Run DB Script which contains Create DB,Table,insert statement.
Change  Web API DB connection string in appsettings.json and run the Tricor.API. 

$ npm install : Run npm i or npm install in terminal to download and install all the necessary dependencies specified in package.json file. It will create a node_modules directory in project's root directory and store all the installed dependencies there.

//run the app

$ ng serve -o

Once you run the application then you will get the login page screen. Please enter the folowing credentials  i.e. username and password, then you will be logged in to the respective landing page.

 1.  Admin user  :   User Name: rubol30@gmail.com and Password : admin123 

  2 . Normal User :   User Name: mdrubol@yahoo.com and Password : admin123  

 

 
