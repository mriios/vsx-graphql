import { useQuery } from "@apollo/client";
import { GET_POST } from "../../apollo/queries/posts";

const usePost = (id: string) => {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id }
  });

  return {
    loading,
    error,
    data
  };
};

export default usePost;