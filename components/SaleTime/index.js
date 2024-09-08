import { useState, useEffect, Fragment } from "react";
import styles from "./index.module.scss";
import { LotteryContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import { useSelector } from "react-redux";
// 公售时间
const PublicSaleStartTime = async () => {
  try {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "PublicSaleStartTime",
      args: [],
    });
    return res;
  } catch (error) {
    console.error("Error fetching PublicSaleStartTime:", error);
    return 0;
  }
};

const SaleTime = () => {
  // const selectedNetwork = useSelector((state) => state.user.selectedNetwork);
  // console.log("selectedNetwork", selectedNetwork);
  const [saleStartTime, setSaleStartTime] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    started: true,
  });
  useEffect(() => {
    const fetchSaleStartTime = async () => {
      const timestamp = await PublicSaleStartTime();
      const date = new Date(Number(timestamp)).getTime(); // 转换为秒
      setSaleStartTime(date);
    };

    fetchSaleStartTime();
  }, []);
  useEffect(() => {
    const updateCountdown = () => {
      const now = parseInt(new Date().getTime() / 1000);
      const distance = saleStartTime - now;
      if (distance < 0) {
        // setCountdown("Public sale has started!");
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          started: true,
        });
      } else {
        const days = Math.floor(distance / (60 * 60 * 24));
        const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((distance % (60 * 60)) / (60));
        const seconds = Math.floor((distance % (60)));
        setCountdown({
          days,
          hours,
          minutes,
          seconds,
          started: false,
        });
      }
    };

    // updateCountdown(); // 立即调用一次，防止第一次渲染时显示空白
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000); // 每秒更新一次

    return () => clearInterval(timer); // 清除定时器
  }, [saleStartTime]);
  return (
    <div className={styles.root}>
      {/* {countdown.started ? "Public sale has started!" : ""} */}
      {/* <p className="text-2xl font-semibold text-blue-500 mb-4">公售时间为：{saleStartTime.toLocaleString()}</p> */}
      {countdown.started ? (
        <div className={styles.item}>
          <div className={styles.itemNum}>Public sale has started!</div>
        </div>
      ) : (
        <Fragment>
          <div className={styles.item}>
            <div className={styles.itemNum}>{countdown.days}</div>
            <span className={styles.itemTxt}>D</span>
          </div>
          <div className={styles.item}>
            <div className={styles.itemNum}>{countdown.hours}</div>
            <span className={styles.itemTxt}>H</span>
          </div>
          <div className={styles.item}>
            <div className={styles.itemNum}>{countdown.minutes}</div>
            <span className={styles.itemTxt}>M</span>
          </div>
          <div className={styles.item}>
            <div className={styles.itemNum}>{countdown.seconds}</div>
            <span className={styles.itemTxt}>S</span>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default SaleTime;
