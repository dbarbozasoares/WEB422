import Link from "next/link";
import Card from "react-bootstrap/Card";
import ListingDetails from "@/components/ListingDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch(
    "https://webassignments-three.vercel.app/api/listings/10006546"
  );
  const data = await res.json();
  console.log(data.name);

  return {
    props: { listing: data },
  };
}

const about = ({ listing }) => {
  return (
    <div>
      <PageHeader text="About the Developer - Diego B Soares" />

      <Card className="bg-light">
        <Card.Body>
          <p>
            Hi, I'm Diego B Soares, a passionate backend developer with a strong
            focus on building modern, scalable applications and perfomance apps.
            My expertise includes React, Next.js, C++, Python and API
            integrations.
          </p>

          {listing ? (
            <>
              <p>{listing.name}</p>
              <Link href={`/listing/${listing._id}`} passHref>
                View Featured Listing
              </Link>
            </>
          ) : (
            <p>Loading listing...</p>
          )}
        </Card.Body>

        {listing && <ListingDetails listing={listing} />}
      </Card>
    </div>
  );
};

export default about;
