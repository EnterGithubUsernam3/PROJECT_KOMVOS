# KomvosApp

Komvos, a social media platform aiming to promote solidarity between its members serves as the final group project for PeopleCert's Javascript Coding Bootcamp (October 2021 - April 2022). 

Designed by Gioulis Dimitris, Kogias Fotis, Markoulinos Antonis, Mourloukos Vassilis, Papageorgiou Eva.

Komvos was created using the following technologies: 
+ [Sails v1](https://sailsjs.com) MVC framework
+ MySQL
+ HTML5 / CSS3
+ Bootstrap 5
+ jQuery

### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Mar 10 2022 21:56:14 GMT+0200 (Χειμερινή ώρα Ανατολικής Ευρώπης) using Sails v1.5.2.

<!-- Internally, Sails used [`sails-generate@2.0.6`](https://github.com/balderdashy/sails-generate/tree/v2.0.6/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

In order to run this app you need to follow the next steps.

## Set up Database
### Create Database 

First, we need to create a Database in MySQL Workbench.
* Navigate to config > datastores.js file.
* Find url property of default object.
* Update its values with your database's url.

## Installation

* Go to the root folder of the cloned repository on your computer and execute:
```console
npm install
```

* Go to node_modules directory and delete bootstrap module. Otherwise, when you run the app it will automatically run some files that will create conflicts and the app will not run properly.
## Create tables in database 

* Navigate to config > models.js file and change migrate property's value to 'alter'.

! Note !
After you run the app this will automatically create the tables in your database. So, after the first run go back to config and change the migrate property from 'alter' to 'safe' to prevent issues with the database.

### Run the app


* Go to the root folder and execute:
```console
sails lift
```
* Launch the app on [localhost:1337](localhost:1337)
* You can optionally navigate to localhost:1337/create in order to populate the database with synthetic data.
