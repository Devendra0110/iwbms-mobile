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

export interface SchemeID {
    E01: boolean;
    E02: boolean;
    E03: boolean;
    E04: boolean;
    E05: boolean;
    E06: boolean;
    E07: boolean;
    F01: boolean;
    F02: boolean;
    F03: boolean;
    F04: boolean;
    F05: boolean;
    F06: boolean;
    H01: boolean;
    H02: boolean;
    H03: boolean;
    H04: boolean;
    H05: boolean;
    H06: boolean;
    S01: boolean;
    S02: boolean;
    S03: boolean;
    S04: boolean;
    S05: boolean;
    S06: boolean;
    S07: boolean;
    S08: boolean;
    S09: boolean;
}