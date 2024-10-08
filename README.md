# 🌼 _Marguerite_ project

A simple workbench for freight forwarding related ideas and projects.

## Project brief

The purpose of this project is to create a simple agnostic workbench to throw ideas and projects. All projects are related to freight forwarding, the industry I currently work in.

## Technical details

### Introduction

_Marguerite_ is a project based on web technologies.

#### Backend

The backend of _Marguerite_ is based on an Express server that would handle API requests as well as async operations (document handling, emails etc.).
The backend is stored in a separate **private repository** for now.

The Node.js / Express server backend is running on a VPS hosted in Germany. This choice has been made mainly to familiarize myself with Linux and deployment of web application on a server, without the technical abstraction of a PaaS provider.

The database is MongoDB. It is also hosted on a VPS.

#### Frontend

The frontend of _Marguerite_ is based on Vue.js and is made to be reactive and interactive as possible.
The syntax is based on Vue.js 3 with the composition API in order to write simple code and most importantly to allow me to improve on my Vue.js skills.

Initially, the frontend was not using any CSS or component framework in order to practice and improve my CSS skills. However, I noticed that I was spending more time tinkering with my own CSS (changing color themes, trying different UI etc.) rather than actually developping the tools I needed.
As a result, I decided to move forward and use the [Flowbite component library](https://flowbite.com/) which allows great flexibility as it relies on Tailwind CSS while providing an already built-in UI.
When necessary, unstyled components from PrimeVue would be used (e.g. date picker component).

### Genesis of the project

_Marguerite_ is in a way the grand-son of [the _Moonshot_ project](https://github.com/cl3mcg/moonshot).
I initially introduced [the _Moonshot_ project](https://github.com/cl3mcg/moonshot) as a simple prototype to Rhenus Logistics management team in order to solve a business-related issue we were facing in the Air & Ocean Tender Management department. Unfortunatly, the prototype built did not suceeded in convincing the management team to continue its development.

I therefore decided to build a broader platform that could be used to host various smaller tools, proof-of-concept and ideas that could be useful in my daily job.

## Documentation

For the time being, the documentation of this project would be listed below, but ultimatly it should be moved to a dedicated space.
**The project has been moved from GitLab to GitHub in Oct-2023.**

## Tools

### Sonar

![A gif showcasing a demonstration of the Sonar tool](/public/assets/demos/sonar_demo.gif)

The _Sonar_ tool is helping me to follow up with the trends of the ocean freight rates.

This tool can be used to retrieve the ocean freight rates and their surcharges on a given period of time for specific port pairs or multiple port pair points. It then displays the results on a graph, allowing the user to have a quick understanding of the ocean freight rates fluctuations and evolution over a given period of time.

### Sauron

The _Sauron_ tool is helping me to quickly retrieve macroeconomic data about specific countries.

Based on the publicly available API from The World Bank, the _Sauron_ project helps me to quickly have access to key macro-econmic indicators of specific countries such as the unemployment rate, the level of souvereign debt of a country etc...

### Sanitizer

#### The idea behind the project

I work in the industry of freight forwarding, specifically in the tender department of a freight forwarding company. A part of my job is to receive tender rate cards from different companies that have cargo to transport all over the world. Because there is no standards to how these tender rate cards are formatted, the team I work with has to manually clean the data provided by the tendering company to make sure that the data initially provided matches the industry standards and denominations. While there are several providers that can do this job for us, I am looking to build my own solution to be able to customize it to my needs and to be able to integrate it with my existing workflow.

#### About the tool

The _Sanitizer_ tool is used to clean Excel files that I receive from customers specifically pseudo TI-contract (or Transporeon) templates that resemble, but are not identical to, TI-Contract templates. The main functionality of the _Sanitizer_ tool is to analyze an Excel file and to clean it by standardizing country data contained within the Excel file. This feature ensures that the proper country code is returned for each entry, making it especially useful for datasets with approximate country names, typos, or inconsistent formatting.

Initially designed to clean country data, the _Sanitizer_ tool will be improved over time to display volumes flow between different trade lanes in order to quickly generate a volume and geographic report based on the lanes mentionned in a bidding sheet, regardless of the data quality contained in it.

## Note
Initially developed with hand-made CSS, I am currently refactoring the components and transitioning this small app from custom CSS to something more flexible based on the [Flowbite component library](https://flowbite.com/)

## License

[_Marguerite_ project](https://github.com/cl3mcg/_Marguerite_) by [cl3mcg](http://www.linkedin.com/in/cl3mcg) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1).
