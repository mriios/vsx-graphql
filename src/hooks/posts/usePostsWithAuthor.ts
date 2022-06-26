import { useQuery } from "@apollo/client";
import { GET_POSTS_WITH_AUTHOR } from "../../apollo/queries/posts";

export const usePostsWithAuthor = (count: number) => {
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

