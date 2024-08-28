/* Get data from your Synapse project using SQL strings! See [link] for available SQL commands. */

export const datasetsSql = "SELECT * FROM syn62057395";
export const filesSql = "SELECT * FROM syn61835515";
export const publicationsSql = "SELECT * FROM syn61841834";
export const contributorsSql = `SELECT TRIM(CONCAT(COALESCE(firstName, ''), ' ', COALESCE(lastName, ''))) AS "fullName", role, affiliation, image, summary FROM syn62530132`;
