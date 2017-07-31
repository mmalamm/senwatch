# Senwatch

Live Demo: [senwatch.us](http://senwatch.us)

Senwatch is a full stack application which allows users to click on states on an Interactive map of the United States to see information about the state's senators, including basic contact information, campaign finance information, twitter feed, deleted tweets, and latest votes.

## Interface

![D3 map](/refs/map_gif.gif)

Users can click on a state to see detailed information about that state's senators. Information is laid out across two banners underneath the map, junior senator on the left and senior senator on the right.

![NY senators](/refs/ny_sens_info_pic.jpeg)

Under the senator's picture and basic contact and biographical information, users can select between several different tabs for content including visualizations for top donors by industry, twitter feed, deleted tweets and latest votes.

![OH senators](/refs/banner_gif.gif)

## Technical details

![Senwatch Stack](/refs/senwatch_stack.png)

Senwatch is built using a NodeJS backend with expressJS and mongoDB serving the API and storing data about senators. Frontend technologies used include jQuery and D3js, with plans to refactor to a full React/Redux app in the near future.

## Information Sources

Senwatch leverages the following API's for data about senators:
* [Propublica API](https://projects.propublica.org/api-docs/congress-api/) for contact information, personal information and votes
* [OpenSecrets API](https://www.opensecrets.org/resources/create/apis.php) for campaign finance information
* [Politwoops API](https://projects.propublica.org/politwoops/), a Propublica project archiving deleted tweets of politicians
* [Twitter API](https://dev.twitter.com/rest/public) for senator's latest tweets
* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) for senator image URL's

## Acknowledgments

 Many thanks to Derek Willis of Propublica for all his support throughout this project.

### Todo's

#### Next Patch
* Add dashboard with changelog to backend mongo updater
* Add spinners for async callbacks
* Refactor deleted tweets to eliminate async bugs
* Add click events with modal visualizations for all data on banners

#### Future Direction
* Add alternative data Sources
* Refactor into React/Redux to avoid Frontend async issues and reduce data usage
