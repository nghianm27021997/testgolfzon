import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Input, Skeleton, Table } from "antd";
import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce, isEmpty } from "lodash";
import axios from "axios";
import { useVT } from "virtualizedtableforantd4";
import Link from "next/link";
import { requestGet } from "../src/apis/instance";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  //fetch data with limit and scroll
  const fetchData = (value) => {
    setLoading(true);
    let url = `https://dummyjson.com/products/?limit=${value ? value : limit}`;
    requestGet(url)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  //search data with key
  const searchData = (key) => {
    setLoading(true);
    if (!key) {
      fetchData();
    } else {
      let url = `https://dummyjson.com/products/search?q=${key}`;
      requestGet(url)
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const debounceDropDown = useCallback(
    debounce((nextValue) => searchData(nextValue), 1000),
    []
  );

  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
    debounceDropDown(value);
  };

  const [vt] = useVT(
    () => ({
      onScroll: async ({ top, isEnd }) => {
        if (isEnd) {
          if (products && products.length < 30) {
            await fetchData(limit + 10);
            setLimit(limit + 10);
          }
        }
      },
      scroll: {
        y: 400,
      },
      debug: false,
    }),
    [products]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <Link href={`detail/${text}`}>{text}</Link>,
    },
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
      <Input placeholder='Search Products' onKeyUp={handleInputOnchange} />

      <div className={styles.content}>
        <Skeleton loading={loading} active>
          {!loading && !isEmpty(products) ? (
            <Table
              dataSource={products}
              columns={columns}
              components={vt}
              pagination={false}
              scroll={{
                scrollToFirstRowOnChange: false,
                y: 400,
              }}
            />
          ) : (
            <span>No results</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
}
