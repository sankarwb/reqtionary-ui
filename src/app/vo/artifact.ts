export class Artifact {
	constructor (
		public selected: boolean=false,
		public deleted: boolean=false,
		public orgId: number=0,
		public appId: number=0,
		public projectId: number=0,
		public objectId: number=0,
		public primaryArtifactId: number=0,
		public deleteAssociationIds: any[]=[],
		public artifactId: number=0,
		public artifactParentId: number=0,
		public artifactLock: number=0,
		public artifactUID: string="",
		public artifactName: string="",
		public artifactDesc: string=" ",
		public artifactHtmlName: string="",
		public artifactHtmlDesc: string="",
		public artifactEffDate: any=new Date,
		public artifactDispSeq: number=0,
		public artifactVersion: number=0,
		public artifactComments: string="",
		public artifactChanges: string="NEW",
		public artifactFilepath: string="",
		public artifactAssignedTo: number=0,
		public artifactStatus: string="",
		public artifactExpectedPoints: number=0,
		public artifactActualPoints: number=0,
		public artifactLastMdBy: number=0,
		public artifactLastModified: any=new Date,
		public statusList: any|any[]=[],
		public artifactAssociations: any[]=[],
		public artifactMovedTo: number=0,
		public artifactMoveOptions: any[]=[],
		public attributes: any[]=[],
		public appObjectArtifacts: any[]=[]
	) {}
}