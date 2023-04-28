export interface CommonItem {
    Bdate?: string;
    CtrId?: string;
    Edate?: string;
    Enabled?: boolean;
    Id?: string | number;
    IsDate?: boolean;
    Opaction?: string | number;
    Optime?: string;
    Ctime?:string;
    DevId?:string ;
    DevName?:string;
    ParamId?:string;
    ParamName?:string;
    Type?:string | number;
    Value?:string | number;
    Action?:string | number;
    Btime?:string | number;
    Duration?:string | number;
    Etime?:string | number;
    Frequency?:string | number;
    OverAction?:string | number;
}

export interface Ctrolitems {
    Ctrolitem: {
        Code?: any;
        Content?: any;
        Data?: CommonItem[];
        IsSuccess?: any;
        Message?: string;
    }
}