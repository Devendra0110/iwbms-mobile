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
    index: number;
    mode: string;
    familyDetail?: FormGroup;
}

export interface EmployerModalData {
    index: number;
    mode: string;
    employerDetail?: FormGroup;
    fromDate: string;
    toDate: string;
    appointmentDate: string;
    dispatchDate: string;
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
export interface ReportSettings {
    from: string;
    to: string;
    systemUser: string;
    systemUserType: string;
    action: string;
    district: string;
    wfc: string;
}

export interface BocwRegistration {
    maritalStatusPersonal_mr: string;
    maritalStatusPersonal: string;
    family_details: string;
    subscription: string;
    rationCardTypePersonal: string;
    genderPersonal: string;
}

export interface TypeOfIllness {
    type: string;
    id: string;
}

export interface TypeOfIssuer {
    type: string;
    id: string;
}

export interface UserApplicationData {
    aadharNoPersonal: number;
    accountNumberBank: number;
    agePersonal: number;
    bankAddressBank: string;
    bankBranchBank: string;
    bankNameBank: string;
    bocw_id: number;
    dobPersonal: object;
    firstNamePersonal: string;
    firstNamePersonal_mr: string;
    genderPersonal: string;
    ifscCodeBank: string;
    lastNamePersonal: string;
    lastNamePersonal_mr: string;
    maritalStatusPersonal: string;
    middleNamePersonal: string;
    middleNamePersonal_mr: string;
    mobilePersonal: number;
    rationCardNumberPersonal: string;
    rationCardTypePersonal: string;
    registration_no: string;
    registrationDatePersonal: object;
    schemeID: string;
}

export interface JWTData {
    description: string;
    district_id: number;
    iat: number;
    userId: number;
    userType: number;
    wfc_id: number;
}

export interface SchemeDetails {
    scheme_number: string;
    gap_months: number;
    frequency: number;
    category_id: number;
    eligibility_criteria: string;
    validation_rules: string;
    available_in_districts: any;
    benefit_amount: any;
}

export interface NGBDateFormat {
    day: number;
    year: number;
    month: number;
}

export interface UpdateApplicatonStatus {
    status: string,
    rejectNote?: string
}

export interface ClaimDetails {
    created_on: any;
    childrenDetail: string;
    scheme_number: string;
    registration_no: number;
    claim_data: string;
    standard: string;
    yearOfDegree: string;
    degreeName: number;
    rationCardtype: string;
    typeOfDegree: string;
    aadhar: number;
    death_date: any;
    aadharNumber: number;
    category: string;
    dateOfAdmission: string;
    year: string;
    aadharNoChild: string;
    amountToBeCollected: any;
}

export interface CategoryDetails {
    category_id: number;
    scheme_category: string;
    eligibility_criteria: string;
}

export interface UserInfo {
    user_id?: string;
    fullName: string;
    userDescription: string;
    userType: number;
    wfc_district: string;
    wfc_id: number;
    wfc_taluka: string;
    wfc_name: string;
    district_code?: string;
    district_id?: number;
}

export interface ToasterObj {
    title: string;
    type: string;
    width: string;
    timer: number;
    position: string;
}

export interface SchemeCategories {
    E01: boolean;
    E02: boolean;
    E03: boolean;
    E04: boolean;
    E05: boolean;
    E06: boolean;
    E07: boolean;
    S01: boolean;
    S02: boolean;
    S03: boolean;
    S04: boolean;
    S05: boolean;
    S06: boolean;
    S07: boolean;
    S08: boolean;
    S09: boolean;
    H01: boolean;
    H02: boolean;
    H03: boolean;
    H04: boolean;
    H05: boolean;
    H06: boolean;
    F01: boolean;
    F02: boolean;
    F03: boolean;
    F04: boolean;
    F05: boolean;
    F06: boolean;
}

export interface TokenProperties {
    acknowledgement_no: number;
    bocw_id: number;
    claim_id: number;
    document_verification_reject_note: string;
    document_verification_status: string;
    fullName: string;
    purpose: string;
    registrationNo: string;
    tokenNo: number;
    token_id: number;
    token_status: number;
    mobileNo?: number;
}
