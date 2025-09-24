function buildShiprocketOrder(orderDoc) {
  const orderItems = orderDoc.productsBought.map((p, index) => ({
    name: p.productName,
    sku: `${p.productID || "SKU"}-${index + 1}`,
    units: p.quantity,
    selling_price: p.price - (p.productDiscount || 0)
  }));

  return {
    order_id: orderDoc.orderID,
    order_date: orderDoc.orderDate.toISOString().slice(0, 19).replace("T", " "),
    pickup_location: "Primary", // must match Shiprocket dashboard
    billing_customer_name: orderDoc.customerName,
    billing_last_name: "",
    billing_address: orderDoc.deliveryAddress,
    billing_city: orderDoc.deliveryCity || "Pune",
    billing_pincode: orderDoc.deliveryPincode || "411001",
    billing_state: orderDoc.deliveryState || "Maharashtra",
    billing_country: "India",
    billing_email: orderDoc.customerEmail || "test@example.com",
    billing_phone: orderDoc.customerPhone,
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: "Prepaid",  // since you don’t have COD
    sub_total: orderDoc.orderTotal,
    length: 10,
    breadth: 8,
    height: 3,
    weight: 0.5
  };
}

module.exports = { buildShiprocketOrder };
