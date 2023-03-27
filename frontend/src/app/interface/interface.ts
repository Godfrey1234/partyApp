export interface Interface {

    booking_id: Number;
    user_id1: Number;
    user_id2: Number;
    date: Date;
    time: String;
    price: Number;
    booking_status: String;
    party_type: String;
    service_name: String;
    location: String;
    num_guests: Number

   
    user_lastname:string
    user_name:string
    user_id:number
    description:string
    area:string
    street:string
    profilepic:string
    rating:number


}


export interface gallery {

    image:string;
}



export interface notifications {

    message:string;
    date: string;
    time: string;
    status:string;
    notification_id:Number
}