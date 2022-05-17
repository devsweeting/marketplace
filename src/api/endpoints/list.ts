import Axios from '@/api/axios';
import { IFilter } from 'src/types';

interface ListAssetParams {
    page: number;
    limit?: number;
    sort: string | undefined;
    filter?: Array<IFilter>;
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
            filter.forEach((item: IFilter) => {
                query += `&attr_eq[${item.categoryId}]=${item.filterId}`;
            })
        }
        const res = await Axios.get(`/v1/assets?${query}`);
        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}