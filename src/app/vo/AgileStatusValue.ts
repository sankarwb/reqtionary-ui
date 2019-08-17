export class AgileStatusValue {
	constructor(
		public id: number=0,
		public orgId: number=0,
		public appId: number=0,
		public name: string='',
		public order: number=0,
		public active: number=1,
		public modifiedByID:number=0
	) {}
}