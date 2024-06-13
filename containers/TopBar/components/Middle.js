import { useState, useEffect, use } from 'react';
import { LotteryContractConfig } from '@config/constants'
import { readContract } from '@wagmi/core'
// 公售时间
const PublicSaleStartTime = async () => {
  const res = await readContract({
    ...LotteryContractConfig,
    functionName: 'PublicSaleStartTime',
    args: []
  });
  return res;
};

const Middle = () => {
  const [saleStartTime, setSaleStartTime] = useState(1717849815000);
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const fetchSaleStartTime = async () => {
      const timestamp = await PublicSaleStartTime();
      const date = new Date(Number(timestamp) * 1000); // 转换为毫秒
      setSaleStartTime(date);
    };

    fetchSaleStartTime();
  }, [])
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();

      const distance = saleStartTime - now;
      if (distance < 0) {
        setCountdown('公售已开始');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
      }
    };

    // updateCountdown(); // 立即调用一次，防止第一次渲染时显示空白
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000); // 每秒更新一次

    return () => clearInterval(timer); // 清除定时器
  }, [saleStartTime]);
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-blue-500 mb-4">公售时间为：{saleStartTime.toLocaleString()}</p>
      <p className="text-3xl font-bold text-red-600 bg-black p-5 rounded-lg shadow-lg inline-block">距离公售倒计时：{countdown}</p>
    </div>
  )
}
export default Middle;