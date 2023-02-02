import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Input, Skeleton, Table } from "antd";
import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce, isEmpty } from "lodash";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(true);

  //get all products with limit
  const fetchData = (key) => {
    setLoading(true)
    let url = `https://dummyjson.com/products/?limit=10&skip=5&q=${searchParams}`;
    axios
      .get(url)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchData(nextValue), 1500),
    []
  );

  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
    debounceDropDown(value);
  };

  useEffect(() => {
    fetchData(searchParams);
  }, []);

  const columns = useMemo(() => [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
  ]);

  return (
    <div className={styles.container}>
      <Input placeholder="Search Products" onKeyUp={handleInputOnchange} />

      {/* <div className={styles.content}>
        <Skeleton loading={loading} active>
          {!loading && !isEmpty(products) && (
            <Table dataSource={products} columns={columns} />
          )}
        </Skeleton>
      </div> */}
    </div>
  );
}
