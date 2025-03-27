import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Baz() {

    const params = useParams();
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['baz', params?.id],
        queryFn: async () => {
          return { info: "Baz page data from server" + params?.id };
        }
      });

  return <div>Baz {data?.info}</div>;
}