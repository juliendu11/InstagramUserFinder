"use strict";
const googleIt = require("google-it");
const Url =require('url')

const INSTAGRAM_SEARCH = "site:instagram.com";

const REGEX_USERNAME = /(@[a-zA-Z0-9!@#$%^&*£ù(_+\-=\[\]{};':"\\|,.<>§^$\/?]+)/;
const REGEX_PARANTHESES = /\(@([^)]+)\)/;

/**
 * Main function for get usernames with google scrappe
 * @param {string} keyword
 * @param {number} [limit] - Result limit default is "100"
 * @returns {string[]} - Usernames list
 */
async function getUsersWithKeyword(keyword, limit = 100) {
  if(typeof limit === 'number'){
    limit = limit.toString()
  }
  try {
    const results = await googleIt({
      query: `${INSTAGRAM_SEARCH} "${keyword}"`,
      limit: limit,
      "no-display": "true",
    });
    return clearUsernames(extractUsername(results));
  } catch (error) {
    throw error;
  }
}

/**
 * Remove undefined and null result in usernames list
 * @param {string[]} usernames
 * @returns {string[]}
 */
function clearUsernames(usernames) {
  return usernames.filter(Boolean);
}

function extractUsernameRegex(results) {
  return results.map((result) =>
    result.title.match(REGEX_USERNAME)[0].replace("@", "")
  );
}

/**
 * @typedef {Object} GoogleResult
 * @property {string} title - Google search, item title
 * @property {string} link: - Google search, item link
 * @property {string} snippet: - Google search, item snippet
 */


 /**
 * Extract username with 3 methods if none were able to obtain a username then return null
 * @param {GoogleResult[]} results
 * @returns {string[]} - usernames list
 */
 function extractUsername(results){
  return results.map((result) => {
    let withTitle = extractUsernameTitle(result)
    if (withTitle === false){
      let withSnippet = extractUsernameSnippet(result)
      if (withSnippet === false){
        let withLink = extractUsernameWithLink(result)
        if (withLink== false){
          return null
        }
        else{
          return withLink
        }
      }
      else{
        return withSnippet
      }
    }
    else{
      return withTitle
    }
  })
 }

  /**
 * Extract username with title result
 * @param {GoogleResult} result
 * @returns {string|boolean} - Return username or false
 */
 function extractUsernameTitle(result){
  if (result.title.match(REGEX_PARANTHESES)) {
    return (
      result.title.match(REGEX_PARANTHESES)[1] ||
      result.title.match(REGEX_PARANTHESES)[0]
    );
  }
  else{
    return false
  }
 }

  /**
 * Extract username with snippet result
 * @param {GoogleResult} result
 * @returns {string|boolean} - Return username or false
 */
 function extractUsernameSnippet(result){
  if (result.snippet.match(REGEX_PARANTHESES)){
    return (
      result.snippet.match(REGEX_PARANTHESES)[1] ||
      result.snippet.match(REGEX_PARANTHESES)[0]
    );
  }
  else{
    return false
  }
 }

  /**
 * Extract username with link result
 * @param {GoogleResult} result
 * @returns {string|boolean} - Return username or false
 */
 function extractUsernameWithLink(result){
  try {
    const url = Url.parse(result.link)
  return url.pathname.split("/").join("")
  } catch (error) {
    return false
  }
 }

module.exports = {
  getUsersWithKeyword,
};
