export class RoleEmployee {
	constructor(
		public roleEmpId: number=0,
		public roleId: number=0,
		public empId: number=0,
		public orgId: number=0,
		public divId: number=0,
		public appGrpId: number=0,
		public appId: number=0,
		public accessId: number=0,
		public projectId: number=0,
		public roleName: string='Add Role',
		public empName: string='Add Employee',
		public modifiedByID: number=0,
	) {}
}