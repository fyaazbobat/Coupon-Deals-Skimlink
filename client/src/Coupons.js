import React from "react";
import Typography from "@material-ui/core/Typography";

import Coupon from "./Coupon";

export default function Coupons({ coupons }) {
  console.log(coupons.lrngth);
  return (
    <div className="coupons">
      {coupons.map((coupon, i) => (
        <Coupon key={i} coupon={coupon} />
      ))}
    </div>
  );
}
