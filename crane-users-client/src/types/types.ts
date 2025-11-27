
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
        user_id:number
        license_number: string,
        certification: string,
        license_max_load: string,
        start_date: string,
        end_date: string
}

export interface FillerPostsType{
        post_id: number,
        user_id:number,
        start_date: string,
        end_date: string,
        work_hours:string,
        place: string,
        certification_needed: string,
        crane_type:string
        payment: string,
        extra_comments:string
        is_filler_found:boolean
}

// types of cranes: 
// 1."RT (Rough Terrain) Crane on Wheels with Hydraulic Boom",
// 2."Crawler Crane with Hydraulic Boom",
// 3."Crawler Crane with Lattice/Mechanical Boom"