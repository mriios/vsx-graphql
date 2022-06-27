import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../apollo/queries/users";

const useUsers = (count: number) => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { count }
  });

  return {
    loading,
    error,
    data
  };
};

export default useUsers;