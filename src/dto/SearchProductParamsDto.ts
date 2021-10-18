export class SearchProductParams {
    constructor(
        public name: string,
        public categoryName: string,
        public type: string,
        public currentPage: number,
        public pageSize: number
    ){}
}