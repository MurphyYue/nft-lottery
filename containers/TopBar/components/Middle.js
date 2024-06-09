import { useState, useEffect } from 'react';
const Middle = () => {
  // 设置公售开始时间2024.12.12 23:59:59
  const saleStartTime = new Date('2024/12/12 23:59:59');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = saleStartTime.getTime() - now;
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

    updateCountdown(); // 立即调用一次，防止第一次渲染时显示空白
    const timer = setInterval(() => {
      // console.log('update')
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