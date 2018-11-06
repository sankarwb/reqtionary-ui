// common endpoints
export let authenticate = '/authenticate';

// artifact
export let artifacts = '/artifacts';
export let agileArtifacts = '/artifacts/agile-artifacts';
export let parentArtifactsByApplication = '/artifacts/parent-artifacts/byApplication/:applicationId';

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

// agile
export let agileStatusesByApplication = '/application-agile-status/statuses/byApplication/:applicationId';
