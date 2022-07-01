# React Assignment

## Pre requisites
1. Node JS
2. IDE / Code editor
3. Web Browser

## About this Repo
This repo contains the feature requirements and all boilerplate for the Javascript assignment. This application is bootstrapped with [Vite](https://vitejs.dev/). The application is based on the [Figma Design](https://www.figma.com/file/kjHrdOxiH1npBQvo2qk62m/Movies-App?node-id=4%3A81)

## How to use the repo

1. Fork this repo from your github profile
2. Clone to your device from the forked repo
3. Run `yarn install` and `yarn run dev`

## Submitting your assignments

1. After forking the repo, create a new branch called `LIST-1`
2. Make changes in the branch `LIST-1` and commit the changes in the same branch.
3. When you are ready to submit the assignment raise a PR from the branch to master.

## Application Features

### **Feature 1:**

When user navigates to the homescreen, there must be an api call to [TMDB Api](https://developers.themoviedb.org/3) to get the first 15 popular movies.
<br />

**Please check the following references:**

**[Homescreen](https://www.figma.com/file/kjHrdOxiH1npBQvo2qk62m/Movies-App?node-id=1%3A3)**
<br />
<img src="./readme-files/homescreen.png" width="500" height="auto" />

**Movie Thumbnail default state**
<br />
<img src="./readme-files/thumbnail-default.png" width="150" height="auto" />

**Movie Thumbnail hover state**
<br />
<img src="./readme-files/thumbnail-hover.png" width="150" height="auto" />

### **Feature 2:**

When user searches for a movie, relevant movie must be displayed, the ui layout will look to similar to homescreen.

### **Feature 3:**

When the user searches for a search term that is not available in the database, the user should see the no data available screen

**[No result screen](https://www.figma.com/file/kjHrdOxiH1npBQvo2qk62m/Movies-App?node-id=18%3A221)**
<br />
<img src="./readme-files/homescreen-no-result.png" width="500" height="auto" />

## **Technical Pointers**

1. Follow clean code practices in naming variables, functions and components
2. Keep your commits small and follow the conventional commits
3. Make sure you commits are signed
4. Use semantic HTML tags instead of generic divs
5. Write reusable CSS.

## **Resources**

1. [Clean code](https://github.com/ryanmcdermott/clean-code-javascript)
2. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
3. [Convention commits extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
4. [Setup Signed Commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)