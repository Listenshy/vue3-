export interface ListInt {
    name: string
    roleId: 0
    // 是否可选
    roleList?: ListInt[]
    viewRole?: string
}


export class InieData {
    id: number
    authority: number[]
    constructor(id: number, authority: number[]) {
        this.id = id
        this.authority = authority
    }
    list: ListInt[] = []
    treeRef: any
}