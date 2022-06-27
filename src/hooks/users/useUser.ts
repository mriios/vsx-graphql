import { useQuery } from "@apollo/client";
import { GET_USER } from "../../apollo/queries/users";

const useUser = (id: string) => {
  const { loading, error, data, called } = useQuery(GET_USER, {
    variables: { id }
  });

  return {
    loading,
    error,
    data,
    called
  };
};

export default useUser;