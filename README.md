# Synapse Portal Template

## What is the Synapse Portal Template?

This template provides a foundation for building your own Synapse-integrated portal. It streamlines the process, enabling you to create a portal tailored to your community’s needs while utilizing Synapse's powerful infrastructure. Visit https://www.synapse.org to learn more about Synapse.

## Viewing the Synapse Portal Template

To see the template website, go to: https://synapse-portal-template.vercel.app. You must be signed in to your Synapse account to view certain components of the website due to some data currently not being open access. To learn more about access types, [go to the Open Access section](#open-access).

## Key Terms

1. Synapse: A collaborative platform that allows scientists to share, analyze and collaborate on research data.

2. Sage Web Monorepo: A centralized repository containing multiple projects within the Sage ecosystem.

3. Synapse React Client: A React Library for building Synapse-related UI.

4. Continuous Integration and Continuous Deployment (CI/CD): The practice of automating software development processes such as building, testing, and deployment.

5. GitHub Actions: A feature provided by GitHub that enables you to automate software workflows, such as building, testing, and deploying directly within your GitHub repository.

6. End-to-End Testing (E2E): A testing approach designed to validate the functionality and performance of an application by simulating real user scenarios.

7. Playwright: A testing framework developed by Microsoft that allows us to perform reliable end-to-end testing for web applications.

8. Vercel: A platform for deploying and managing frontend applications.

## Getting Started

This is a template repository so you can easily create a new repository based on this template repository.

1. Click on the "Use this template" dropdown on the repository page and select "Create a new repository". This will create a new repository in your GitHub account based on this template.

<img width="207" alt="Screenshot 2024-08-30 at 10 14 55 AM" src="https://github.com/user-attachments/assets/68c947da-4800-484f-89c4-588e8381e5a2">

3. Once your new repository is created, clone it to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

4. Build your project to ensure all packages and dependencies are linked and built before use:

   ```bash
   cd apps
   cd portal
   pnpm build
   ```
  
6. To run, in the root of the project, use the following commands:
   ```bash
   pnpm i
   pnpm dev
   ```
## Project Code Structure
Refer to the [Synapse Web Monorepo (GitHub)](https://github.com/Sage-Bionetworks/synapse-web-monorepo/tree/main) for code context.

Reference to some of the key areas of the project:
```
├── ./.github	GitHub workflows and actions can be found here
├── ./apps
│   ├── ./portal	Main project directory
│   │   ├── ./src
│   │   │   ├── ./config	Contains portal configurations, routing, SQL strings to obtain Synapse data, etc.	
│   │   │   │   ├── ./style	Add style overrides here such as button colors, header background image, and etc.
│   │   │   │   ├── ./synapseConfigs	Contains data display configurations
│   ├── ./portals-base	This directory serves as the foundation of the portal, providing essential components and infrastructure
│   └── ./portals-e2e	Test directory
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

By using Synapse as the OAuth provider, we can simplify the authentication process for third party applications and allow them to securely access user data in Synapse. The app redirects users to https://signin.synapse.org and Synapse will handle the login process. Synapse will then return back with an authorization code, which can be used to obtain an access token to make authenticated requests.

To create a new OAuth client with Synapse, you can do so directly from the Synapse website or the Python and R clients.

### Make a Synapse OAuth Client in synapse.org
1. First, login to [Synapse](https://www.synapse.org).

2. Click on your user icon then navigate to "Account Settings" > "OAuth Clients" > "Manage OAuth Clients" then click the "Create New Client" button. This will open up a popup form. Fill in the popup form and click save.

<img width="700" alt="Screenshot 2024-08-28 at 1 09 30 PM" src="https://github.com/user-attachments/assets/3beca915-42c3-4be9-8811-ce298b609936">

3. Take note of your client ID and secret.
<img width="700" alt="Screenshot 2024-08-02 at 4 05 07 PM" src="https://github.com/user-attachments/assets/09619cbb-01b5-49aa-9e07-fe396668bdad">

4. You must have your OAuth Client verified in order to use it. Click on the "Submit Verification" button for your newly created OAuth Client under the "Verified Column" and follow the instructions.

5. Once verified, update the value for VITE_PORTAL_SECRET and VITE_PORTAL_CLIENT in the .env file with your OAuth secret ID and client ID. Environment variables can also be configured in your deployment platform of choice.

### Redirect URIs

When using multiple hosts (ex: production and dev) as redirect URIs, a sector_identifier_uri parameter (https://openid.net/specs/openid-connect-registration-1_0.html#SectorIdentifierValidation ) is required.

Create a file named _redirect_uris.json_ in the public folder of the project for example with your production environment/any other environment you want (for Synapse, you can't register _localhost_ as a redirect URI for development environments; use _127.0.0.1_ instead.).

<img width="409" alt="Screenshot 2024-08-30 at 11 15 10 AM" src="https://github.com/user-attachments/assets/33d33012-aab3-4235-8442-333bf7a54db4">

Make sure to fill out the Sector Identifier URI section on the OAuth Client form with the URL of where the redirect_uris.json is hosted (your-hosted-website.someHost/redirect-uris.json. Ex: https://synapse-portal-template.vercel.app/redirect_uris.json.

<img width="410" alt="Screenshot 2024-08-28 at 1 13 09 PM" src="https://github.com/user-attachments/assets/a947b5c8-91a9-4edc-8ead-1f257f8a6735">

### Make a Synapse OAuth Client with the Python Client

You can create an OAuth client using the Python Client as shown below:

```
# client.py

import synapseclient
import json
syn = synapseclient.login()

client_meta_data = {
  'client_name': 'gf-portal',
  # Refer to section below for setting up redirect_uris
  'redirect_uris': [
    'http://127.0.0.1:3000',
    'https://synapse-portal-template.vercel.app',
  ],
  'sector_identifier_uri': "https://synapse-portal-template.vercel.app/redirect_uris.json"
}

# Create the client:
client_meta_data = syn.restPOST(uri='/oauth2/client', 
	endpoint=syn.authEndpoint, body=json.dumps(client_meta_data))

client_id = client_meta_data['client_id']

# Generate and retrieve the client secret:
client_id_and_secret = syn.restPOST(uri='/oauth2/client/secret/'+client_id, 
	endpoint=syn.authEndpoint, body='')

print(client_id_and_secret)
```

For more information about using Synapse as an OAuth Server, please refer to: https://help.synapse.org/docs/Using-Synapse-as-an-OAuth-Server.2048327904.html

## Open Access

When signed out of the portal template website, users can view datasets and files but not publications. To view publications, you must be signed in. This is because file contents and table row data are not viewable or downloadable anonymously unless they are marked as OPEN_DATA.

Please refer to https://help.synapse.org/docs/Data-Access-Types.2014904611.html for more information about the different data access types in Synapse.

## Forms

You can create forms using your own service or Synapse Form Services.

### Using Your Own Service

The DynamicForm component allows you to submit form data to a third-party service. This component accepts a URL for the schema JSON, the UI schema JSON, and the endpoint to which the form data will be submitted to. For the code snippet below, we use [formspark.io](https://formspark.io) as our postUrl to submit our form data to.

```
  {
    path: "Apply",
    exact: true,
    hideRouteFromNavbar: false,
    synapseConfigArray: [
      {
        name: "DynamicForm",
        props: {
          schemaUrl:
            "https://raw.githubusercontent.com/kianamcc/portal-template/main/schemas/form.json",
          uiSchemaUrl:
            "https://raw.githubusercontent.com/kianamcc/portal-template/main/schemas/formUi.json",
          postUrl: "https://submit-form.com/1mGwgZpqX",
        },
        isOutsideContainer: false,
      },
    ],
  },
```

### Using Synapse Form Services

#### Creating a Form Group

Create a form group to start using Synapse Form Services. A form group is a collection of forms that you can manage and access through the Synapse API.

```
  const createFormGroup = async (name: string, token: string) => {
    const url = `https://repo-prod.prod.sagebase.org/repo/v1/form/group?name=${encodeURIComponent(
      name
    )}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `An error occured. ${response.status}: ${response.statusText}`
      );
    }

    console.log("Successfully created form group.");
    const data: FormGroup = await response.json();
    return data;
  };
```

Your response will look something like this:

<img width="310" alt="Screenshot 2024-09-05 at 3 24 08 PM" src="https://github.com/user-attachments/assets/b5a93a51-dd04-4635-9d36-3f48f9a5b907">

#### Updating the ACL

To allow other users other than the administrator (creator of the form group), we need to update the ACL for the form group: https://rest-docs.synapse.org/rest/PUT/form/group/id/acl.html.

1. Get the form group's ACL to obtain the etag (identifier that represents a specific version of a resource).

```
  const fetchCurrentACL = async (groupId: string, accessToken: string) => {
    const url = `https://repo-prod.prod.sagebase.org/repo/v1/form/group/${groupId}/acl`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching ACL: ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  };
```

2. Use the result from the previous function to update the ACL for the form group: https://rest-docs.synapse.org/rest/PUT/form/group/id/acl.html. Your principalId can be in the response when creating a form group (value of _createdBy_).

```
  interface ACLUpdateData {
    resourceAccess: Array<{
      principalId: string;
      accessType: Array<string>;
    }>;
    etag: string;
  }

  const updateACL = async (
    aclData: ACLUpdateData,
    groupId: string,
    accessToken: string
  ) => {
    const url = `https://repo-prod.prod.sagebase.org/repo/v1/form/group/${groupId}/acl`;

    const updatedAclData = {
      ...aclData,
      resourceAccess: [
        ...aclData.resourceAccess,
        {
          principalId: "273948", // Represents authenticated users (273949 represents all users, authenticated or not)
          accessType: ["READ", "SUBMIT"], // Give authorized users READ and SUBMIT access
        },
        {
          principalId: "3503364",
          accessType: [
            "READ",
            "SUBMIT",
            "CHANGE_PERMISSIONS",
            "READ_PRIVATE_SUBMISSION",
          ], // Administrator gets full access
        },
      ],
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedAclData),
    });

    if (!response.ok) {
      throw new Error(
        `Error updating ACL: ${response.status}: ${response.statusText}`
      );
    }
  };
```

#### Reviewing Forms

Access and review forms on administrator account that has READ_PRIVATE_SUBMISSION.

<img width="700" alt="Screenshot 2024-09-05 at 11 59 34 AM" src="https://github.com/user-attachments/assets/30f15ad6-bf4d-4586-899a-58805213094b">

1. Access a list of forms for a specific form group: https://rest-docs.synapse.org/rest/POST/form/data/list/reviewer.html.

```
 const fetchFormData = async (groupId: string) => {
    const url =
      "https://repo-prod.prod.sagebase.org/repo/v1/form/data/list/reviewer";

    const requestBody = {
      groupId: groupId,
      filterByState: ["SUBMITTED_WAITING_FOR_REVIEW"],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `An error occured. ${response.status}: ${response.statusText}`
        );
      }

      console.log(`Successfully fetched forms from form group ${groupId}.`);
    } catch (err) {
      console.log(err);
    }
  };
```

Your response will look something like this:

<img width="424" alt="Screenshot 2024-09-05 at 1 31 23 PM" src="https://github.com/user-attachments/assets/a30431ed-36fb-41a6-80e3-543e8aec4c59">

2. Accept forms: https://rest-docs.synapse.org/rest/PUT/form/data/id/accept.html, or reject forms: https://rest-docs.synapse.org/rest/PUT/form/data/id/reject.html.

```
  const acceptForm = async (id: string) => {
    const url = `https://repo-prod.prod.sagebase.org/repo/v1/form/data/${id}/accept`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        `An error occured. ${response.status}: ${response.statusText}`;
      }

      console.log(`Form ${id} has been successfully accepted.`);
    } catch (err) {
      console.log(err);
    }
  };
```

<img width="700" alt="Screenshot 2024-09-05 at 12 02 16 PM" src="https://github.com/user-attachments/assets/b6b38d9a-437a-4d5f-809b-36292ac75f9a">


```
  const rejectForm = async (id: string, reason: string) => {
    const url = `https://repo-prod.prod.sagebase.org/repo/v1/form/data/${id}/reject`;

    const requestBody = {
      reason,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        `An error occured. ${response.status}: ${response.statusText}`;
      }

      console.log(`Form ${id} has been successfully rejected.`);
    } catch (err) {
      console.log(err);
    }
  };
```

<img width="700" alt="Screenshot 2024-09-05 at 11 53 52 AM" src="https://github.com/user-attachments/assets/148ccae5-e9b5-44ba-acf6-eb6cf4e4b071">

## CI/CD

Continuous Integration and Continuous Development (CI/CD) is implemented for this portal using GitHub Actions and Vercel.

Actions:
- action.yml
  - Responsible for installing the correct version of Node.js, configuring Pnpm and caching dependencies.

Workflows:
- end-to-end-test-portals.yml
  - Retrieves latest codebase, uses the Pnpm setup action to make sure dependencies are installed, builds the portal project, installs and sets up Playwright Browsers for testing, runs end-to-end tests, and uploads test results as artifacts.

## Testing

This portal uses End-to-End (E2E) testing with Playwright.

### Testing Locally

1. Run the local server before starting tests. In the root directory, you can run the project using the command pnpm dev.

2. In the portals-e2e directory, use the pnpm e2e command to run the tests.

## Deployment

This portal template is deployed on [Vercel](https://vercel.com) at https://synapse-portal-template.vercel.app. Vercel is a fast and reliable platform that allows you to deploy frontend applications, offering integration with GitHub for automatic deployments. Whenever changes are pushed to the repository, Vercel automatically builds and deploys the site, providing preview URLs for testing.

When deploying your project to Vercel, make sure the root directory is apps/portal, the directory of the code we want to deploy.

<img width="700" alt="Screenshot 2024-08-28 at 2 44 05 PM" src="https://github.com/user-attachments/assets/86230cdb-f749-4f46-99ae-c1d4bf739af9">

<img width="700" alt="Screenshot 2024-08-28 at 2 43 55 PM" src="https://github.com/user-attachments/assets/1c3b04c2-0b28-41f5-a015-3641f2ec7645">

## Vercel OAuth Configuration: Handling Unique Preview URLs for Redirects

Vercel creates unique URLs for each preview which results in not being able to use OAuth for the previews as the URLs are not registered with the Synapse OAuth Client. To solve this issue, we use GitHub Actions. A branch named latest-preview was created specifically for managing preview deployments that require OAuth. This branch is automatically updated using GitHub Actions to mirror ([zofrex/mirror-branch](zofrex/mirror-branch)) the latest commit from any branch with this commit message: [latest-preview]. The Vercel CLI was used to assign a stable alias, _template-latest-preview.app.vercel_, to the latest-preview branch. In your GitHub repository, go to Settings > Secrets and variables > Actions, and add VERCEL_ORG_ID, VERCEL_PROJECT_ID, and VERCEL_TOKEN values. The organization ID and project ID can be found in .vercel > project.json file in your project.

<img width="700" alt="Screenshot 2024-08-30 at 10 57 19 AM" src="https://github.com/user-attachments/assets/d4fe1709-d55e-449e-97bb-37e8bb14a13c">

## Resources

- [Associated PR](https://github.com/Sage-Bionetworks/synapse-web-monorepo/pull/925)
- [synapse.org](https://www.synapse.org)
- [Synapse Web Monorepo (GitHub)](https://github.com/Sage-Bionetworks/synapse-web-monorepo/tree/main)
- [Synapse React Client (Storybook)](https://sage-bionetworks.github.io/synapse-web-monorepo/?path=/story/components-addconditionsforusebutton--demo)
- [Synapse Docs](https://help.synapse.org/docs/)
- [Synapse Python Client](https://python-docs.synapse.org)
- [GitHub Actions](https://docs.github.com/en/actions) 
- [Playwright](https://playwright.dev) 
- [Vercel](https://vercel.com)
