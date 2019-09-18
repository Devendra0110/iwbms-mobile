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