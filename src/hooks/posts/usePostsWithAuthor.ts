import { useQuery } from "@apollo/client";
import { GET_POSTS_WITH_AUTHOR } from "../../apollo/queries/posts";

const usePostsWithAuthor = (count: number) => {
  const { loading, error, data, called } = useQuery(GET_POSTS_WITH_AUTHOR, {
    variables: { count }
  });

  return {
    loading,
    error,
    data,
    called
  };
};

export default usePostsWithAuthor;
