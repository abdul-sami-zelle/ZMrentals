import React, { useEffect, useState } from 'react'
import '../../manage-bookings-components/ExtrasUpdateModal/ExtrasUpdateModal.css'
import { url } from '@/utils/services';
import axios from 'axios';
import { FiMinus, FiPlus } from 'react-icons/fi';

const BottomExtras = ({ editBookingPayload, setEditBookingPayload, carId }) => {
  const [vehicleData, setVehicleData] = useState({});
  const handleGetCarWithId = async () => {
    const api = `${url}/cars/get/${editBookingPayload?.booking?.car_id}`;
    try {
      const response = await axios.get(api);
      console.log("respose", response)
      if (response.status === 200) {
        setVehicleData(response.data)
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }
  useEffect(() => { handleGetCarWithId() }, [carId])

  const [extraQuantities, setExtraQuantities] = useState({});

  // ✅ initialize state from payload.booking.extras (if any)
  useEffect(() => {
    if (!editBookingPayload?.booking?.extras?.length) return;
    const mapped = {};
    editBookingPayload.booking.extras.forEach((extra, index) => {
      // mapped[index] = { ...extra };
      mapped[index] = {
        main_id: extra.extras_option_id,
        extras_option_id: extra.id,
        quantity: extra.quantity
      };
    });

    // ✅ Only update if values actually changed
    setUpdateExtras((prev) => {
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(mapped);
      return prevString !== newString ? mapped : prev;
    });
  }, [editBookingPayload?.booking?.extras]);

  // const handleUpdateExtras = (index, type, item) => {
  //   console.log("extras item", item)
  //   setUpdateExtras((prev) => {
  //     const currentQuantity = parseInt(prev[index]?.quantity) || 0
  //     const minQty = parseInt(item.min_qty) || 1;
  //     const maxQty = parseInt(item.max_qty) || 99;

  //     let newQty = currentQuantity;

  //     if (type === 'increase') {
  //       if (currentQuantity === 0) {
  //         newQty = minQty
  //       } else if (currentQuantity < maxQty) {
  //         newQty = currentQuantity + 1
  //       } else {
  //         return prev
  //       }
  //     }

  //     if (type === 'decrease') {
  //       if (currentQuantity > minQty) {
  //         newQty = currentQuantity - 1
  //       } else if (currentQuantity === minQty) {
  //         newQty = 0
  //       } else {
  //         return prev
  //       }
  //     }

  //     const update = { ...prev }

  //     if (newQty === 0) {
  //       delete update[index]
  //     } else {
  //       update[index] = {
  //           main_id: item.extras_option_id,
  //           extras_option_id: item.id,
  //           quantity: newQty
  //       }
  //     }

  //     setEditBookingPayload((prevPayload) => ({
  //     ...prevPayload,
  //     booking: {
  //       ...prevPayload.booking,
  //       extras: Object.values(update),
  //     },
  //   }));

  //     return update
  //   })
  // }


  const handleQuantityChange = (index, type, item) => {
    setExtraQuantities((prev) => {
      const currentQty = prev[index]?.quantity || 0;
      const minQty = parseInt(item.min_qty) || 1;
      const maxQty = parseInt(item.max_qty) || 99;

      let newQty = currentQty;

      if (type === 'increment') {
        if (currentQty === 0) {
          newQty = minQty;
        } else if (currentQty < maxQty) {
          newQty = currentQty + 1;
        } else {
          return prev; // don't exceed max
        }
      }

      if (type === 'decrement') {
        if (currentQty > minQty) {
          newQty = currentQty - 1;
        } else if (currentQty === minQty) {
          newQty = 0;
        } else {
          return prev; // already 0
        }
      }

      const updated = { ...prev };

      if (newQty === 0) {
        delete updated[index]; // remove from list
      } else {
        updated[index] = {
          main_id: item.extras_option_id,
          extras_option_id: item.id,
          quantity: newQty
        };
      }

      // Update bookingPayload in context
      // setEditBookingPayload((prevPayload) => ({
      //   ...prevPayload,
      //   booking: {
      //     ...prevPayload.booking,
      //     extras: Object.values(updated)
      //   }
      // }));

      return updated;
    });
  };

  useEffect(() => {
    setEditBookingPayload((prevPayload) => ({
        ...prevPayload,
        booking: {
          ...prevPayload.booking,
          extras: Object.values(extraQuantities)
        }
      }));
  }, [extraQuantities])


  return (
      <div className='update-extras-options-contianer' style={{display: 'flex', width: '100%', height: '100%'}}>
        {vehicleData?.extras?.map((item, index) => (
          <div className='update-extras-single-option' key={index}>
            <span className='extras-name-and-price'>
              <h3>{item.name}</h3>
            <p>NZD {item.rate}</p>
            </span>
            <div className='update-extras-single-option-quantity-controler'>
              <button onClick={() => handleQuantityChange(index, 'decrease', item)} ><FiMinus size={20} color='#FFF' /> </button>
              <input
                type='text'
                name='quantity'
                className='quantity-show-input'
                inputMode='numeric'
                min={item.min_qty}
                max={item.max_qty}
                pattern='[0-9]*'
                readOnly
                value={extraQuantities[index]?.quantity || 0}
              />
              <button onClick={() => handleQuantityChange(index, 'increase', item)}><FiPlus size={20} color='#FFF' /></button>
            </div>

          </div>
        ))}
      </div>
  )
}

export default BottomExtras