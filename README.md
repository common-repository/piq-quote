# PIQ WordPress Plugin
Use the Pet Insurance Quotes plug-in to give your readers the opportunity to get free pet insurance quotes from multiple companies quickly and easily! Visitors to your site or blog provide basic data about their cat or dog and receive instant quotes from multiple providers, allowing your readers to compare offerings and pricing to find a plan that works for them and make an educated pet insurance purchase based on their specific needs.

The installed plug-in inserts a brief quote form on your page that, upon submission, will launch a results page that lists all of the available insurance providers and their offerings. Your readers won’t lose sight of your page in the process. If your readers are pet lovers, this is a great plug-in to offer.


## Dev Environment

### Docker WordPress

A WordPress and MariaDB environment to test the plugin

1. ``cd wordpress``
2. ``docker-compose up``
3. Start the ``piq-quote`` web app and the piq-quote vuejs dev server. 
4. WordPress will be running at [http://localhost:7777]().
The first time you access this installation you'll need to answer a few questions to configure WordPress.
6. Use WordPress to install and test the plugin.


## How to Build

### Build the WordPress Block
If there are changes to the "src" directory for the WordPress Blocks part of the plugin, prior to creating the plugin zip file, you must run ```npm run build``` to build the files for the block. 

### Create Zip for review

1. Validate readme.txt file at [https://wordpress.org/plugins/developers/readme-validator/](https://wordpress.org/plugins/developers/readme-validator/)
2. Run ``npm run plugin-zip`` to create the zip file
3. Upload ``wordpress-piq.zip`` to WordPress.org for review at [https://wordpress.org/plugins/developers/add/](https://wordpress.org/plugins/developers/add/)
4. After approval follow steps to publish.

### Publish

After making appropriate changes copy everything over into the folder
``wordpress-piq-plugin/piq-wordpress/trunk``
then make a copy of that folder and drop it into
``wordpress-piq-plugin/piq-wordpress/tags/xxx`` 
where xxx = your new version number

Publishing is done by committing code to the SVN repo using petco's credentials.
username: petco
password: look it up in 1pass

SVN repo: https://plugins.svn.wordpress.org/piq-quote


## Notes

The following locations are for local/staging/live development to be replaced in the iframe src field for testing.
src='http://localhost:3000/quote/embedded-form'
src='https://staging.petinsurancequotes.com/quote/embedded-form'
src='https://www.petinsurancequotes.com/quote/embedded-form'