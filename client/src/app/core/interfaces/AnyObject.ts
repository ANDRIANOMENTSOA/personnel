export interface AnyObject {
    [propriete: string]: any
}

export interface AnyModel extends AnyObject {
    id?: string;
}