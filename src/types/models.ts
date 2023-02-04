export interface IMemberInfo {
    id?: number,
    position: string,
    fullname: string,
    picture:string,
};

export interface IMember  {
    created_at:string,
    id: number,
    picture: string,
    position: string,
    fullname: string,
    status:string,
    role:string,
    updated_at:string,

}
export interface IMemberFullInfo{
created_at:string,  
id:number, 
fullname:string, 
picture: string, 
position: string,
role:string, 
status: string,
surname: string,
updated_at: string,
username: string,

}