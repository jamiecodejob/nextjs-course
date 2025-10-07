export const getPostList = async (page:number)=> {
    const response = await fetch(`/api/post/list?page=${page}&limit=5`);
    const resData = await response.json();
    return resData.data;
};
