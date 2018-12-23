// common endpoints
export let authenticate = '/authenticate';

// artifact
export let artifacts = '/artifacts';
export let agileArtifacts = '/artifacts/agile-artifacts';
export let parentArtifactsByApplication = '/artifacts/parent-artifacts/byApplication/:applicationId';

// CRUD artifact
export let artifactById = '/artifacts/:artifactId';

// artifact history
export let recentActivity = '/artifact-history/recent-activity/byApplication/:applicationId';

// employee
export let employeeById = '/employees/:employeeId';
export let employeesByApplication = '/employees/byApplication/:applicationId';

// application
export let applicationsByEmployee = '/applications/byEmployee/:employeeId';

// project
export let projectsByApplication = '/projects/projectsGroupbyRelease/:applicationId';

// requirement types
export let requirementTypesByApplication = '/requirement-type/byApplication/:applicationId';

// attributes
export let attributesByApplication = '/attribute/byApplication/:applicationId';
export let attributesByApplicationAndRequirementType = '/attribute/byApplication/:applicationId/:requirementTypeId';

// agile
export let agileStatusesByApplication = '/application-agile-status/statuses/byApplication/:applicationId';
