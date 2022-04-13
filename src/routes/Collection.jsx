import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NFTCard from "../components/NFTCard";

const Collection = (props) => {
  const [estimates, setEstimates] = useState([]);
  const [meta, setMeta] = useState([]);
  const [OSDetails, setOSDetails] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    const fetchEstimates = async (collection_address) => {
      const res = await fetch(
        `http://localhost:8000/estimates/${collection_address}`
      );
      const estimates = await res.json();

      return estimates;
    };

    if (params && params.collection_address) {
      fetchEstimates(params.collection_address).then((estimates) => {
        setEstimates(estimates);
      });
    }
  }, [params]);

  useEffect(() => {
    const fetchMeta = async (collection_address) => {
      const res = await fetch(
        `http://localhost:8000/rarity/${collection_address}`
      );
      const meta = await res.json();

      return meta;
    };

    if (params && params.collection_address) {
      fetchMeta(params.collection_address).then((meta) => {
        setMeta(meta);
      });
    }
  }, [params]);

  useEffect(() => {
    const fetchOSInfo = async (collection_address) => {
      const res = await fetch(
        `https://api.opensea.io/api/v1/asset_contract/${collection_address}`
      );
      const os_details = await res.json();

      return os_details;
    };

    if (params && params.collection_address) {
      fetchOSInfo(params.collection_address).then((details) => {
        setOSDetails(details);
      });
    }
  }, [params]);

  useEffect(() => {
    if (meta.length > 0 && estimates.length > 0) {
      console.log(meta);
      setLoading(false);
    }
  }, [meta, estimates]);

  useEffect(() => {
    if (meta.length > 0) {
      setFilteredData(meta.slice(0, 51));
    }
  }, [meta]);

  return (
    <div className="collection">
      <h1>
        {OSDetails && Object.keys(OSDetails).length > 0
          ? OSDetails.collection.name
          : props.collection_address}
      </h1>
      <div className="collection-container">
        {loading ? (
          <div className="loading-wrapper">
            <div className="lds-dual-ring"></div>
          </div>
        ) : (
          filteredData.map((token) => (
            <NFTCard
              meta={token}
              key={token["_id"]}
              estimate={
                estimates.filter((e) => e["token_id"] === token["_id"])[0]
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
