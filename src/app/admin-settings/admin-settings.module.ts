import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {SharedModule} from '../shared/shared.module';

import { SearchableTableComponent } from '../components/searchable-table.component';

import { AdminSettingsComponent } from './admin-settings.component';
import { EditOrganizationComponent } from './editorganization/edit-organization.component';
import { ManageDivisionComponent } from './managedivision/manage-division.component';
import { ManageApplicationGroupComponent } from './manageapplicationgroup/manage-application-group.component';
import { ManageApplicationComponent } from './manageapplication/manage-application.component';
import { ManageProjectComponent } from './manageproject/manage-project.component';
import { ManageEmployeeComponent } from './manageemployee/manage-employee.component';
import { ManageVendorComponent } from './managevendor/manage-vendor.component';
import { ManageDesignationComponent } from './managedesignation/manage-designation.component';
import { ManageReleaseComponent } from './managerelease/manage-release.component';
import { ManagePhaseComponent } from './managephase/manage-phase.component';
import { ManageStatusComponent } from './managestatus/manage-status.component';
import { ManageRoleComponent } from './managerole/manage-role.component';
import { RequirementTypeComponent } from './managerequirementtype/requirement-type.component';
import { AttributeComponent } from './manageattribute/attribute.component';

import { SearchableDropdownComponent } from './common-components/searchable-dropdown.control';
//import { SummernoteModule } from 'ng2-alt-summernote';
import { DialogBoxDirective } from './common-components/dialog-box.directive';
import { MultiSelectDropDown } from './common-components/MultiSelectDropDown.component';
import { RequirementTypeBoxComponent } from './common-components/requirement-type-box.component';

import { AdminSettingsService } from '../services/admin-settings.service';
import { RequirementTypeService } from '../services/requirement-type.service';
import { AttributeService } from '../services/attribute.service';
import {GlobalSharedService} from '../services/globalShared.service';
import { AdminRoute } from './admin-route.enum';
// 8003486147
const routes: Routes = [
	{ 	
		path: '', component: AdminSettingsComponent,
		children: [
			{ path: `${AdminRoute.ORGANIZATION}`, component: EditOrganizationComponent, data: { title: "Organization" } },
			{ path: `${AdminRoute.DIVISION}`,component: ManageDivisionComponent, data: { title: "Division" } },
			{ path: `${AdminRoute.APPLICATION_GROUP}`,component: ManageApplicationGroupComponent, data: { title: "Application Group" } },
			{ path: `${AdminRoute.APPLICATION}`,component: ManageApplicationComponent, data: { title: "Application" } },
			{ path: `${AdminRoute.SPRINT}`,component: ManageProjectComponent, data: { title: "Sprint" } },
			{ path: `${AdminRoute.EMPLOYEE}`,component: ManageEmployeeComponent, data: { title: "Employee" } },
			{ path: `${AdminRoute.VENDOR}`,component: ManageVendorComponent, data: { title: "Vendor" } },
			{ path: `${AdminRoute.DESIGNATION}`,component: ManageDesignationComponent, data: { title: "Designation" } },
			{ path: `${AdminRoute.RELEASE}`,component: ManageReleaseComponent, data: { title: "Program" } },
			{ path: `${AdminRoute.STATUS}`,component: ManageStatusComponent, data: { title: "Sprint Status" } },
			{ path: `${AdminRoute.PHASE}`,component: ManagePhaseComponent, data: { title: "Sprint Phase" } },
			{ path: `${AdminRoute.ROLE}`,component: ManageRoleComponent, data: { title: "Role" } },
			{ path: `${AdminRoute.REQUIREMENT_TYPE}`,component: RequirementTypeComponent, data: { title: "Requirement Type" } },
			{ path: `${AdminRoute.ATTRIBUTE}`,component: AttributeComponent, data: { title: "Attribute" } }
		]
	}
];
@NgModule({
	imports: [AngularMaterialModule, SharedModule, RouterModule.forChild(routes)],
	declarations: [
		DialogBoxDirective,
		MultiSelectDropDown,
		RequirementTypeBoxComponent,
		SearchableDropdownComponent,
		SearchableTableComponent,
		AdminSettingsComponent,
		EditOrganizationComponent,
		ManageDivisionComponent,
		ManageApplicationGroupComponent,
		ManageApplicationComponent,
		ManageProjectComponent,
		ManageEmployeeComponent,
		ManageVendorComponent,
		ManageDesignationComponent,
		ManageReleaseComponent,
		ManageStatusComponent,
		ManagePhaseComponent,
		ManageRoleComponent,
		RequirementTypeComponent,
		AttributeComponent
	],
	providers: [GlobalSharedService,AdminSettingsService,RequirementTypeService,AttributeService]
})

export class AdminSettingsModule { 
	
}