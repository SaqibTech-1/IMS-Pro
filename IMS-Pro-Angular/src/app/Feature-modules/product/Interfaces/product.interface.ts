export interface Product{
    id:number;
    globalId:string;
    name:string;
    categoryId:number;
    price:number;
    createdBy:string;
    createdOn:Date;
    modifiedBy?:string;
    modifiedOn?:Date;
    isActive:boolean;
    isDeleted:boolean;
}