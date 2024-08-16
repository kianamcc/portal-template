# Synapse Portal Template

## What is the Synapse Portal Template?

This template provides a foundation for building your own Synapse-integrated portal. It streamlines the process, enabling you to create a portal tailored to your community’s needs while utilizing Synapse's powerful infrastructure. Visit https://www.synapse.org to learn more about Synapse.

## Viewing the Synapse Portal Template

To see the template website, go to: https://synapse-portal-template.vercel.app. You must be signed in to your Synapse account to view certain components of the website due to some data currently not being open access. To learn more about access types, [go to the Open Access section](#open-access).

## Getting Started

This is a template repository so you can easily create a new repository based on this template repository.

1. Click on the "Use this template" dropdown on the repository page and select "Create a new repository". This will create a new repository in your GitHub account based on this template.

2. Once your new repository is created, clone it to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

3. To run the project:
   ```bash
   pnpm i
   pnpm dev
   ```

## Using Synapse as a Backend

This portal template uses Synapse as its backend. Synapse can handle and store all the data you want to display in your portal, including files, datasets, tables, and more. The portal retrieves this data dynamically from Synapse, meaning any updates made to the relevant data in your Synapse project will be reflected in the portal as well. Synapse also allows you to manage the accessibility of your data through permissions, ensuring that the right people can view and contribute to your project.

The data used in this portal template can be found in this Synapse project: https://www.synapse.org/Synapse:syn60582629/wiki/.

### Create Your Own Synapse Project

1. First, register for a Synapse account at https://www.synapse.org to get basic functionality access.

2. Create a new project by clicking "Projects" > "Create a New Project".

3. You can copy tables, links, files, folders, and projects used in this portal into your new project using the copy function. Below is an example using the Synapse Python Client.

```
import synapseclient
import synapseutils


syn = synapseclient.login(authToken=YOUR_ACCESS_TOKEN)

synapseutils.copy(syn, "syn60582629", SYN_ID_OF_DESTINATION)
```

Refer to the docs for more details about this copy function: https://python-docs.synapse.org/reference/synapse_utils/#synapseutils.copy_functions.copy.

## Using Synapse as an OAuth Server

To quickly setup login functionality for your portal, you can use Synapse as your OAuth Server.

1. First, login to [Synapse](https://www.synapse.org).

2. Click on your user icon then navigate to "Account Settings" > "OAuth Clients" > "Manage OAuth Clients" then click the "Create New Client" button. This will open up a popup form. Fill in the popup form and click save. Take note of your client ID and ID.

3. You must have your OAuth Client verified in order to use it. Click on the "Submit Verificaiton" button for your newly created OAuth Client under the "Verified Column" and follow the instructions.

4. Once verified, update the value for VITE_PORTAL_SECRET and VITE_PORTAL_CLIENT in the .env file with your OAuth secret ID and client ID. Environment variables can also be configured in your deployment platform of choice.

5. Update the redirect_uris.json file with your production environment/any other environment you want. Redirect uri http://127.0.0.1:3000 in the json file is for the development environment.

For more information about using Synapse as an OAuth Server, please refer to: https://help.synapse.org/docs/Using-Synapse-as-an-OAuth-Server.2048327904.html

## Open Access

When signed out of the portal template website, users can view datasets and files but not publications. To view publications, you must be signed in. This is because file contents and table row data are not viewable or downloadable anonymously unless they are marked as OPEN_DATA.

Please refer to https://help.synapse.org/docs/Data-Access-Types.2014904611.html for more information about the different data access types in Synapse.

## Deployment

This portal template is deployed on [Vercel](https://vercel.com) at https://synapse-portal-template.vercel.app. Vercel is a fast and reliable platform that allows you to deploy frontend applications, offering integration with GitHub for automatic deployments. Whenever changes are pushed to the repository, Vercel automatically builds and deploys the site, providing preview URLs for testing.

## Resources

- [Synapse Website](https://www.synapse.org)
- [Synapse Documentation](https://help.synapse.org/docs/)
- [Synapse Python Client](https://python-docs.synapse.org)
- [Vercel](https://vercel.com)
