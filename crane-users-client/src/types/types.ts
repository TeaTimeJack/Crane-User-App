
export interface UserType{
        userid: number,
        email: string,
        userfirstName: string,
        userLastName: string,
        userPhoneNumber: string,
        userRole:string
}

export interface UserTypeFromAPI{
        user_id: number,
        email: string,
        first_name: string,
        last_name: string,
        phone_number: string,
        role:string
}

export interface licenseTypeFromAPI{
        licenses_id: number,
        licenses_number: number,
        certification: string,
        licenses_max_load: string,
        start_date: string,
        end_date: string
}