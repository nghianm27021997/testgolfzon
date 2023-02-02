import { useRouter } from "next/router";
import { Button, Table, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import { isEmpty } from "lodash";
import Image from "next/image";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [idDetail, setIdDetail] = useState(id);
  const [loading, setLoading] = useState(true);

  const [dataDetail, setDataDetail] = useState({});
  const [disabledPrevious, setDisabledPrevious] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  const getDetail = (id) => {
    setLoading(true)
    if (id) {
      let url = `https://dummyjson.com/products/${id}`;
      axios
        .get(url)
        .then((res) => {
          setDataDetail(res.data);
        })
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
      <Button type="primary">
        <Link href="/">Back</Link>
      </Button>
      <Skeleton loading={loading} active>
        {!isEmpty(dataDetail) && (
          <>
            <div>
              {/* {
              <div className={styles.lazyloadImage}>
                {dataDetail.images.map((image) => (
                  <LazyLoadImage width="200" height="200" src={image} scrollPosition={scrollPosition}/>
                ))}
              </div>
            } */}
            </div>
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
                      width={150}
                      height={150}
                      alt="Image Alt"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.divButton}>
              <Button
                className={styles.buttonNext}
                type="primary"
                onClick={previousPage}
                disabled={idDetail == 1}
              >
                Previous
              </Button>
              <Button
                disabled={idDetail == 30}
                type="primary"
                onClick={nextPage}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Skeleton>
    </>
  );
};

export default Detail;
