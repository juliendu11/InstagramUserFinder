# InstagramUserFinder
Find users by keyword, extract their username

Do a google search by targeting the instagram site with a keyword and then extract the username by looking at the title, description and link, only public accounts will be found.

Using google-it to scrap the results and put them in JSON format

## Install

```bash
npm i @juliendu11/instagramuserfinder
```

# How to use ?

````javascript
const instagram_user_finder = require ('@juliendu11/instagramuserfinder');

(async () =>{
console.log(await instagram_user_finder.getUsersWithKeyword('travel', 100)) //('keyword', limit (default is 100))
})()
````



## Dependencies

- [google-it](https://www.npmjs.com/package/google-it)
