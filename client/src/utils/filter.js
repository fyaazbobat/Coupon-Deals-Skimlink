const filter = (coupons, filtered, setCurrentPage) => {
  if (filtered === "" || coupons === []) return coupons;
  coupons = coupons.filter((coupon) => {
    //   console.log()
    return (
      (coupon.title &&
        coupon.title.toLowerCase().includes(filtered.toLowerCase())) ||
      (coupon.merchant_details.name &&
        coupon.merchant_details.name
          .toLowerCase()
          .includes(filtered.toLowerCase())) ||
      (coupon.description &&
        coupon.description.toLowerCase().includes(filtered.toLowerCase()))
    );
  });
  setCurrentPage(1);
  return coupons;
};

export default filter;

// coupon.title &&
// coupon.title.slice(0, filtered.length).toLowerCase() ===
//   filtered.toLowerCase()
// );
