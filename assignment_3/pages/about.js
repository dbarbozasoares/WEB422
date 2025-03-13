import Link from "next/link";
import Card from "react-bootstrap/Card";
import ListingDetails from "@/components/ListingDetails";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import styles from "@/styles/About.module.css";

export async function getStaticProps() {
  const res = await fetch(
    "https://webassignments-three.vercel.app/api/listings/10006546"
  );
  const data = await res.json();
  console.log(data);

  return {
    props: { listing: data },
  };
}

const About = ({ listing }) => {
  return (
    <>
      <div>
        <PageHeader text="About the Developer - Diego B Soares" />

        <Card className="bg-light">
          <Card.Body>
            <p>
              Hi, I'm Diego Barboza Soares, a passionate backend developer with
              a strong focus on building modern, scalable applications and
              perfomance apps. My expertise includes{" "}
              <Image
                className={styles.image}
                src="https://miro.medium.com/v2/resize:fit:1400/1*aF1u1vDDft_pzrZ0SlLRuw.png"
                alt=""
                width={55}
                height={20}
              />{" "}
              <Image
                className={styles.imagesml}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"
                alt=""
                width={20}
                height={20}
              />{" "}
              <Image
                className={styles.imagesml}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png"
                alt=""
                width={20}
                height={20}
              />
              and API integrations.
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
    </>
  );
};

export default About;
