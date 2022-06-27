# Data visualization with Visx and GraphQL

## Goal

Communicate blog post analytics data in a visual manner to non-tech users

## Process

Step 1 was to play around with the GraphQL/Apollo server. This with the intention to find out what kind of data we had and what could we do with it.

Wrote down on paper plans to create charts. What data would we use and how would it be manipulated to get the results we needed. Some charts were chosen based on the data we had.

Started simple boilerplate code for the project. Created queries and hooks for later use.

For each chart, data was first manipulated to get the structure and results we needed. Then, the data was transformed into a chart.

## Choices

Folder structure is easy to understand, everything has it's own folder and file. Every function/parent folder was left at the same level for easy reach and readability, when developers start working on the project.

## Challenges

A big challenge was the whole Visx library. It seemed scary at first, creating graphs with relational data. After reading through the docs and seeing how everything was implemented, it was easier to understand what package did what and how to apply it. Docs were helpful for understanding the library.

Manipulating the data was also a challenge. I had to figure out how to get the data into the right format for the chart, based on mock data the examples were using in the docs.

## Final thoughts

Project took around 6hrs to complete. These 6 hours weren't continuous. I think the API could have a filter param for users. Also, type User could have the option to get posts by that specific user.

This was a fun project and a lot was learned from it. Visx is a great library for data visualization and I hope to use it more in the future.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
