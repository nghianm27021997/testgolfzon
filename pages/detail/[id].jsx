import { useRouter } from "next/router";
import { Button, Table, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import { isEmpty } from "lodash";
import Image from "next/image";
import { requestGet } from "../../src/apis/instance";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import LazyLoad from "react-lazy-load";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [idDetail, setIdDetail] = useState(id);
  const [loading, setLoading] = useState(true);

  const [dataDetail, setDataDetail] = useState({});
  const [disabledPrevious, setDisabledPrevious] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  const getDetail = (id) => {
    setLoading(true);
    if (id) {
      let url = `https://dummyjson.com/products/${id}`;
      requestGet(url)
        .then((res) => setDataDetail(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const previousPage = () => {
    router.push(`${Number(idDetail) - 1}`);
  };

  const nextPage = () => {
    router.push(`${Number(idDetail) + 1}`);
  };

  useEffect(() => {
    setIdDetail(id);
    getDetail(id);
  }, [id, idDetail]);

  return (
    <>
      <Button type='primary'>
        <Link href='/'>Back</Link>
      </Button>
      {!isEmpty(dataDetail) && (
        <>
          {
            <div className={styles.lazyloadImage}>
              {dataDetail.images.map((image, index) => (
                <LazyLoad height={200 + index * 150} key={index}>
                  <img src={image} alt='image' />
                </LazyLoad>
              ))}
            </div>
          }
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>DiscountPercentage</th>
                <th>Description</th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataDetail.id ?? ""}</td>
                <td>{dataDetail.title ?? ""}</td>
                <td>{dataDetail.brand ?? ""}</td>
                <td>{dataDetail.category ?? ""}</td>
                <td>{dataDetail.price ?? ""}</td>
                <td>{dataDetail.rating ?? ""}</td>
                <td>{dataDetail.stock ?? ""}</td>
                <td>{dataDetail.discountPercentage ?? ""}</td>
                <td>{dataDetail.description ?? ""}</td>
                <td>
                  <img
                    src={dataDetail.thumbnail ?? ""}
                    alt='Image Alt'
                    effect='blur'
                    width={150}
                    height={150}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.divButton}>
            <Button
              className={styles.buttonNext}
              type='primary'
              onClick={previousPage}
              disabled={idDetail == 1}
            >
              See Previous Product
            </Button>
            <Button disabled={idDetail == 30} type='primary' onClick={nextPage}>
              See Next Product
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
