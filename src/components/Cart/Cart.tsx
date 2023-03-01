import React from "react";
import { useAppSelector, useAppDispatch } from "../../../src/app/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  toggleAddons,
  setDiscount
} from "../../../src/features/cart/cartSlice";
import { basePrice, addonPrice } from "../../../src/constants/constants";

function Cart() {
  const dispatch = useAppDispatch();
  const { quantity, addons, discount } = useAppSelector((state) => state.cart);
  
  const totalAddonPrice = addons ? addonPrice * quantity : 0;
  const totalAmount = quantity * basePrice + totalAddonPrice;
  const calculatedDiscount = 1 - discount / 100;
  const totalAmountToPay = totalAmount * calculatedDiscount;

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (value >= 0 && value <= 60) {
      dispatch(setDiscount(value));
    }
  };

  return (
    <div className="cart-box">
      <div className="cart-body">
        <div className="header">
          <h1>Pizza ABC</h1>
          <p>
            We are currently serving one pizza only. Please taste and review.
          </p>
        </div>

        <div className="content">
          <div className="left-block">
            <div className="quantity-setter-box">
              <h2>Add Quantity</h2>
              <div className="quantity-btn-wrap">
                <button
                  className="quantity-btn"
                  onClick={() => dispatch(decreaseQuantity())}
                >
                  -
                </button>
                <div className="quantity-value">{quantity}</div>
                <button
                  className="quantity-btn"
                  onClick={() => dispatch(increaseQuantity())}
                >
                  +
                </button>
              </div>
            </div>

            <div className="addon-setter-box">
              <input
                id="addon"
                type="checkbox"
                checked={addons}
                onChange={() => dispatch(toggleAddons())}
              />

              <div className="addon-label-box">
                <label htmlFor="addon">Add ons (+$5)</label>
              </div>
            </div>
          </div>

          <div className="right-block">
            <img src="Images/chad-montano--unsplash.jpg" alt="Pizza" />
          </div>
        </div>
      </div>

      <div className="cart-footer">
        <div className="footer-wrap">
          <div className="total-amount-box">
            <div>Total</div>
            <div>{`$${totalAmount}`}</div>
          </div>

          <div className="discount-setter-box">
            <div>Discount (%)</div>
            <input
              id="discount"
              type="number"
              min="0"
              max="60"
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>

          <div className="total-amount-to-pay-box">
            <div>To Pay</div>
            <div>{`$${totalAmountToPay}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
