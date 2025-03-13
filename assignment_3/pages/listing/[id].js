// pages/listing/[id].js

import { useRouter } from "next/router";
import useSWR from "swr";
import ListingDetails from "@/components/ListingDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

const Listing = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const { data, error, isLoading } = useSWR(
    `https://webassignments-three.vercel.app/api/listings/${id}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <PageHeader text={data.name} />
      <ListingDetails listing={data} />
    </div>
  );
};

export default Listing;
