import {fetchAPI} from '../helpers';

async function useGetList() {
    return await fetchAPI('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list');
}

export default useGetList;