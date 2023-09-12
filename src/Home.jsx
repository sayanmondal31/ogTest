import axios from "axios";
import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { Helmet } from "react-helmet";

function Home() {
  const [data, setdata] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const fetchData = async () => {
    const body = {
      inputData: {
        storeslug: "rose-fast-food",
        product_Id: "6183775",
      },
    };

    axios
      .post("https://webservice.dineapi.com/api/dine/storedata", body)
      .then((response) => {
        console.log(response, "response");
        setdata({
          title: response?.data?.store?.store_Name,
          description: response?.data?.store?.store_Banner,
          imageUrl: response?.data?.store?.store_Banner_Image,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <Helmet>
          <title>{data?.title}</title>
          <meta name="description" content={data?.description} />
          <meta property="og:title" content={data?.title} />
          <meta property="og:description" content={data?.description} />
          <meta
            property="og:type"
            content="https://6500d08dd6225e0b15ca1e24--sweet-klepon-a8e5fd.netlify.app"
          />
          <meta property="og:image" content={data?.imageUrl} />
          {/* <meta property="og:url" content="https://www.www.omiod.com" /> */}
          <link rel="canonical" href="/" />
        </Helmet>
      )}
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            fontWeight: "800",
          }}
        >
          Store details
        </div>
        <div>{data?.title}</div>

        <div>{data?.description}</div>
        <img
          src={data?.imageUrl}
          alt={`${data?.title} image`}
          width="50px"
          height="50px"
        />
      </div>
    </>
  );
}

export default Home;
