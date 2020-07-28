<img src="./public/icons/icon-512x512.png" width="50px" />

# Edge - A dynamic site that lives on the edge

- [Website](https://edge-next.now.sh/)
- [Documentation](./DOCUMENTATION.md)
  
*Edge version 1.0 will be released on June/July 2020, this is a work in progress*

## Sponsors 

<a href="https://etereo.io" title="Etéreo" target="_blank"><img src="./public/static/sponsors/etereo.png" width="80px" /></a>

*Your name or company here?* Contact us at hi@nucleo.is


## What is Edge? 

Edge is a piece of software written on top of Next.js to create a Dynamic API / Dynamic Dashboard and fully functional site to help makers, developers and other creators to deploy a minimum viable product in minutes.

The main features of Edge are:
- Dynamic content types and permissions, and APIs.
- Comments on content types
- Users APIs (login, register, update)
- Emails (email verification, contact emails) templates and implementation
- Dynamic admin dashboard for all the content, comments and users.
- Block users the access to the site
- CSS themes that the user can change
- User activity log
- Login / Register with social providers
- A set of pre-implemented components
- PWA (Progressive Web APP)
- SSG (Static Site Generation) for static pages with markdown
- Web monetization
- Easy to deploy

If you want to read about all the features you can check the [Documentation](./DOCUMENTATION.md) or check the [Website Demo](https://edge-next.now.sh/).

You can login using one of the different social providers, or register a new account.

*The data on the demo site may be deleted at any time*


## How do I use Edge?

This tool is *not provided* as a package or framework you can add into your existing solutions. It is a solution by itself and it can fit your project for a determined set of use-cases. 

To use this tool:
- 1 Download or clone the repository
- 2 Do `yarn` or `npm install` 
- 3 Do `yarn dev` to launch your site (as any NextJS application)
- 4 Edit `edge.config.js` to add your own texts and content types or permissions
  - You can learn more on how to create new content types, permissions and themes in our tutorials
- 5 Deploy! We recommend services like [Vercel](https://vercel.com)
  - Check how to configure all the different providers in the documentation. You will need to create different set of environment variables and register in the different services like Email and Database.

## Issues

Do you have any problem understanding how to use Edge? 
Something is broken?
Any doubt?

- First: Check if there is any open issue
- Second: If not, create a new one

## Contributing

Did you build anything cool by extending your own Edge version? Send a Pull-Request and if it introduces a generic and configurable solution we will add it to the main repository. 

Do you think you can introduce best practices on the repository? Send us a pull request.

Do you think you can improve the performance of the solution? Send us a pull request.

Check our roadmap if you want to add more cool things into Edge.


----

## Roadmap


### Version 1

- Allow to report content and comments, we can use a flag on the content if anyone has reported it, instead of a list of reports.

- Review everything on lighthouse

- Add a cookies component

- Connect to an additional database:
  - Firebase 
  - See if there is any ORM that can work for this use case

- Add algolia as a search engine

- Introduce basic site stats

- https://help.github.com/en/github/supporting-the-open-source-community-with-github-sponsors/about-github-sponsors
- OpenColective

- profile react re-renders

### Refactor List

- use `use export * from package` instead of double naming variables.
- try to unify groups and content types logic somehow
- Test:
  - Group delete test
  - Delete comment in group test
  - Group user test (list , create , edit , delete )

### After Version 1: Additional features

- Groups
  - Test that group creation and edition allows to update the members list
  - Test that group retrieval returns the group members data fulfilled from DB
  

- Move to getStaticProps and getStaticPaths when the RFC is completed https://github.com/zeit/next.js/discussions/11552

- Field options
  - validation (NOT IMPLEMENTED)
    - Optional validarion function in the form of `(value) => { return true or false } `
  - permissions (NOT IMPLEMENTED)
    - Array, list of roles that can SEE this field when editing the content and when reading it

- Preprocess uploaded images to create a lighter version and allow the client to load them progresivelly

- Create an example site running an online shop
  - Create the concept of "shopping cart"
  - Integrate with a payment provider
  - Add a "buyable" option into content types

- Add site stats
  - Store stats for each page visit
  - Display the stats into the admin dashboard
  - Create stats components

- Add i18n
  - NextJS is preparing a RFC for i18n we will wait on that

- Add a `sitemap.xml` API endpoint. 
  - Generate a dynamic sitemap by fetching the database for public content and adding also the static routes.

- Redux
  - Study if we will add redux for the dashboard 
    - Examples: https://github.com/willianantunes/nextjs-playground, https://github.com/kirill-konshin/next-redux-wrapper
  
- Startup script
  - Preseed database 

- Dockerfile
  - See how to complete a good example


-----------

 2020 - Original idea of [@rafinskipg](https://github.com/rafinskipg) and [@hayderaldeen](https://github.com/hayderaldeen)

