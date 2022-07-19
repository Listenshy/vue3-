export interface ListInt {
    userId: number,
    id: number,
    title: string,
    introduce: string
}
interface selectDataInt {
    title: string,
    introduce: string,
    page: number,
    count: number,//总条数
    pagesize: number,//一页几条

}
export class InitData {
    selectData: selectDataInt = {
        title: "",
        introduce: "",
        page: 1,//当前页
        count: 0,//总条数
        pagesize: 10//一页多少条
    }
    list: ListInt[] = []
}