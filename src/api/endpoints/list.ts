import Axios from '@/api/axios';

interface ListAssetParams {
    page: number;
    limit?: number;
    sort: string | undefined;
    filter?: Array<string>;
}
export const loadListAssetByPage = async ({
    page, 
    limit = 12, 
    sort,
    filter,
}: ListAssetParams) => {
    try {
        let query = `page=${page}&limit=${limit}`;
        if(sort) {
            query += `&sort=${sort}&order=DESC`;
        }
        if(filter) {
            filter.forEach((item: string) => {
                query += `&attr_eq[${item.split('^')[0]}]=${item.split('^')[1]}`;
            })
        }
        const res = await Axios.get(`/v1/assets?${query}`);
        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}