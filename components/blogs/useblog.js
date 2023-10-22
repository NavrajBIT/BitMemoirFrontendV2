import ServerAPI from "../subcomponents/scripts/serversideapicall";
const useblog = async () => {
  const api = ServerAPI();

  const getBlogs = async () => {
    return await api
      .crud("GET", "blog")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return null;
      });
  };

  const blogs = await getBlogs();

  return {
    blogs,
  };
};

export default useblog;
