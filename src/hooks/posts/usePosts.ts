import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../apollo/queries/posts";

export const usePosts = (count: number) => {
  const { loading, error, data, called } = useQuery(GET_POSTS, {
    variables: { count }
  });

  return {
    loading,
    error,
    data,
    called
  };
};
