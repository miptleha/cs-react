## Creating project

In Visual Studio 2022 create a new project from 'ASP.NET Core with React.js' (no authentication, uncheck https).  
Application started, react worked, data fetched.  


## Release publication

In ClientApp folder add .env.production file with PUBLIC_URL variable.  
Publish project to folder.  
Install dotnet-hosting bundle, create pool (no managed code) and add application (Alias set to PUBLIC_URL, select folder).  
The site opens and works.  

## Server application

Add nuget package for file logging (for example, NLog.Web.AspNetCore).  
Create logger config and add initialization code in Program.cs.  

## Comming soon...

Create own react application and controller for it.

