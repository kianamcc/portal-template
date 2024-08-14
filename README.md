# Synapse Portal Template

## What does this do?

This template allows you to build your own synapse-integrated portal.

## Setup Your Own Repository

This is a template repository so you can easily create a new repository based on this template repository.

1. Click on the "Use this template" dropdown on the repository page and select "Create a new repository". This will create a new repository in your GitHub account based on this template.

2. Once your new repository is created, clone it to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   cd YOUR-REPOSITORY
   ```

## Using Synapse as a Backend

This portal template uses Synapse as its backend. Synapse can handle and store all the data you want to display in your portal, including files, datasets, tables, and more. The portal retrieves this data dynamically from Synapse, meaning any updates made to the relevant data in your Synapse project will be reflected in the portal as well. Synapse also allows you to manage the accessibility of your data through permissions, ensuring that the right people can view and contribute to your project.

The data used in this portal template can be found in this Synapse project: https://www.synapse.org/Synapse:syn60582629/wiki/.

### Create Your Own Synapse Project

1. First, register for a Synapse account at https://www.synapse.org to get basic functionality access.

2. Create a new project by clicking "Projects" > "Create a New Project".

3. If you would like to base your project off of the Synapse project used in this portal, you can copy its contents over to your new project. Below is an example using the Synapse Python Client.

```
import synapseclient
import synapseutils


syn = synapseclient.login(authToken=YOUR_ACCESS_TOKEN)

synapseutils.copy(syn, "syn60582629", SYN_ID_OF_DESTINATION)
```

Refer to the docs for more details about this copy function: https://python-docs.synapse.org/reference/synapse_utils/#synapseutils.copy_functions.copy.

## Resources

Refer to the [Synapse documentation](https://help.synapse.org/docs/) for more information.
