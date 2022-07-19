// 只找一层
export interface ListInt {
    id: number,
    role: RoleInt,
    nickName: string,
    userName: string,

}
interface RoleInt {
    [x: string]: any
    role: number,
    roleName: string
}
interface SelectDataInt {
    role: number,
    nickName: string
}
interface RoleListInt {
    // 装数字的数组
    authority: number[]
    roleId: number
    roleName: string

}
interface ActiveInt {
    id: number,
    role: number[],
    nickName: string,
    userName: string,
}
export class InitData {
    //    数组形式     赋值为空数组  接收用户信息
    list: ListInt[] = []
    selectData: SelectDataInt = {
        role: 0,
        nickName: ""
    }
    // 接收角色信息
    roleList: RoleListInt[] = []
    isShow = false
    // 选中的对象
    active: ActiveInt = {
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}