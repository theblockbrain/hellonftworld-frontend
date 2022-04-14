import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import NFTCard from "../components/NFTCard";
import PaginationNav from "../components/PaginationNav";

import "./Collection.css";

const Collection = (props) => {
  const [collectionAddress, setCollectionAddress] = useState("");
  const [estimates, setEstimates] = useState([]);
  const [meta, setMeta] = useState([]);
  const [OSDetails, setOSDetails] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState("_id");
  const [sortAsc, setSortAsc] = useState(true);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenIDFilterArray, setTokenIDFilterArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [modalContext, setModalContext] = useState({});
  let params = useParams();

  useEffect(() => {
    if (params.collection !== collectionAddress) {
      setCollectionAddress(params.collection_address);
    }
  }, [params.collection_address]);

  useEffect(() => {
    const fetchEstimates = async (collection_address) => {
      const res = await fetch(
        `http://localhost:8000/estimates/${collection_address}`
      );
      const estimates = await res.json();

      return estimates;
    };

    if (collectionAddress && estimates.length === 0) {
      fetchEstimates(collectionAddress).then((estimates) => {
        setEstimates(estimates);
      });
    }
  }, [collectionAddress]);

  useEffect(() => {
    const fetchMeta = async (collection_address) => {
      const res = await fetch(
        `http://localhost:8000/rarity/${collection_address}`
      );
      const meta = await res.json();

      return meta;
    };

    if (collectionAddress && meta.length === 0) {
      fetchMeta(collectionAddress).then((meta) => {
        setMeta(meta);
      });
    }
  }, [collectionAddress]);

  useEffect(() => {
    const fetchOSInfo = async (collection_address) => {
      const res = await fetch(
        `https://api.opensea.io/api/v1/asset_contract/${collection_address}`
      );
      const os_details = await res.json();

      return os_details;
    };

    if (collectionAddress && Object.keys(OSDetails).length === 0) {
      fetchOSInfo(collectionAddress).then((details) => {
        setOSDetails(details);
      });
    }
  }, [collectionAddress]);

  useEffect(() => {
    if (meta.length > 0 && estimates.length > 0) {
      console.log(meta);
      setLoading(false);

      const mergeByProperty = (target, source, target_prop, source_prop) => {
        source.forEach((sourceElement) => {
          let targetElement = target.find((targetElement) => {
            return sourceElement[source_prop] === targetElement[target_prop];
          });
          targetElement
            ? Object.assign(targetElement, sourceElement)
            : target.push(sourceElement);
        });
      };

      mergeByProperty(meta, estimates, "_id", "token_id");

      console.log(meta);
    }
  }, [meta, estimates]);

  useEffect(() => {
    if (meta.length > 0) {
      if (sortAsc) {
        meta.sort((a, b) => parseFloat(a[sorting]) - parseFloat(b[sorting]));
      } else {
        meta.reverse((a, b) => parseFloat(a[sorting]) - parseFloat(b[sorting]));
      }

      let filtered = [];

      if (tokenIDFilterArray.length > 0) {
        filtered = meta.filter((token) =>
          tokenIDFilterArray.includes(token["_id"].toString())
        );
      } else {
        filtered = meta;
      }

      const itemcount = filtered.length;

      if (itemcount > 25) {
        setFilteredData(filtered.slice(0, 25));
        setMaxPage(Math.ceil(itemcount / 25));
      } else {
        setFilteredData(filtered);
        setMaxPage(0);
      }
    }
  }, [meta, sorting, sortAsc, tokenIDFilterArray]);

  useEffect(() => {
    console.log(modalContext);
  }, [modalContext]);

  const changeCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const clearModal = () => {
    setModalContext({});
  };

  return (
    <div className="collection">
      <h1>
        {OSDetails && Object.keys(OSDetails).length > 0
          ? OSDetails.collection.name
          : props.collection_address}
      </h1>
      {loading ? (
        <div className="loading-wrapper">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="collection-main">
          <div className="collection-filters">
            <form className="collection-filter-sorting">
              <div className="filter-row">
                <label htmlFor="sorting">Sort By:</label>
                <div className="sorting-container">
                  <div className="select">
                    <select
                      name="sorting"
                      id="sorting"
                      value={sorting}
                      onChange={(e) => setSorting(e.target.value)}
                    >
                      <option value="_id">ID</option>
                      <option value="rarity_rank">Rank</option>
                      <option value="estimate">Estimate</option>
                      <span className="focus"></span>
                    </select>
                  </div>
                  <div
                    className="sorting-button"
                    onClick={() => {
                      setSortAsc((prev) => !prev);
                    }}
                  >
                    {sortAsc ? "ASC" : "DESC"}{" "}
                  </div>
                </div>
              </div>
              <div className="filter-row">
                <label htmlFor="tokens" className="tokens">
                  Search for Token ID:
                </label>
                <div className="tokenid_container">
                  <input
                    type="text"
                    name="tokens"
                    id="tokens"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                  />
                  <div
                    className="add-button"
                    onClick={() => {
                      setTokenIDFilterArray((prev) => prev.concat(tokenInput));
                      setTokenInput("");
                    }}
                  >
                    ADD
                  </div>
                </div>
                {tokenIDFilterArray.length > 0 && (
                  <>
                    <div className="acitve-token-filter">
                      {tokenIDFilterArray.map((token) => (
                        <div className="tokenpill">{token}</div>
                      ))}
                      <div
                        className="reset-button"
                        onClick={() => {
                          setTokenIDFilterArray([]);
                          setTokenInput("");
                        }}
                      >
                        X
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
          <div className="collection-left-area">
            <div className="collection-container">
              {filteredData.map((token) => (
                <NFTCard
                  meta={token}
                  key={token["_id"]}
                  estimate={
                    estimates.filter((e) => e["token_id"] === token["_id"])[0]
                  }
                  onOpenModal={() => setModalContext(token)}
                />
              ))}
            </div>
            {maxPage > 0 && (
              <PaginationNav
                currentPage={currentPage}
                lastPage={maxPage}
                onChangePage={changeCurrentPage}
              />
            )}
          </div>
          {modalContext && Object.keys(modalContext).length > 0 && (
            <Modal token={modalContext} onCloseModal={clearModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
