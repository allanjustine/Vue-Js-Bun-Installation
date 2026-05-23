import axios from "axios";

const GQL_URL = "http://localhost:3001/graphql";

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  console.log(query, variables);
  const response = await axios.post(GQL_URL, { query, variables });
  const { data, errors } = response.data;
  if (errors?.length) throw new Error(errors[0].message);
  return data as T;
}
