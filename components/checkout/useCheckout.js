import { useState } from "react";
import API from "../subcomponents/scripts/apiCall";

const useCheckout = () => {
  const api = API();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleCouponChange = (e) => {
    const couponCode = e.target.value;
    if (couponCode.length === 9) checkDiscount(couponCode);
    else setDiscount(0);

    setCoupon(couponCode);
  };

  const plans = {
    Silver: { certificates: 100, price: 2 },
    Gold: { certificates: 500, price: 1.75 },
    Platinum: { certificates: 1000, price: 1.5 },
  };

  const checkDiscount = async (couponCode) => {
    await api
      .localCrud("GET", `subscription/coupon/${couponCode}`)
      .then((res) => {
        console.log(res);
        if (res.is_active) {
          if (res.status >= 200 && res.status <= 299) {
            const validFrom = new Date(res.valid_from);
            const validUntil = new Date(res.valid_until);
            const now = new Date();
            if (now >= validFrom && now <= validUntil) {
              setDiscount(parseFloat(res.discount_percent));
            }
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return { coupon, handleCouponChange, discount, plans };
};

export default useCheckout;
