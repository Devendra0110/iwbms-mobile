import { FormGroup } from '@angular/forms';

export interface UserInfo {
    fullName: string;
    userDescription: string;
    userType: number;
    wfc_district: string;
    wfc_id: number;
    wfc_taluka: string;
    wfc_name: string;
}

export interface NavigatorCordova extends Navigator {
    app: {
        exitApp: () => any; // Or whatever is the type of the exitApp function
    }
}
export interface familyModalData {
    index:number;
    mode:string;
    familyDetail?: FormGroup;
}

export interface EmployerModalData{
    index:number;
    mode:string;
    employerDetail?:FormGroup;
    fromDate:string;
    toDate:string;
    appointmentDate:string;
    dispatchDate:string;
}