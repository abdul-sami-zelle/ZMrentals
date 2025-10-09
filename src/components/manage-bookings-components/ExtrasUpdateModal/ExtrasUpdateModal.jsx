import React, { useEffect, useState } from 'react'
import './ExtrasUpdateModal.css';
import { CgCloseO } from 'react-icons/cg';
import { url } from '@/utils/services';
import axios from 'axios';
import { FiMinus, FiPlus } from "react-icons/fi";

const ExtrasUpdateModal = ({ showExtrasModal = false, setShowExtrasModal, payload, setPayload, carId }) => {

    const [vehicleData, setVehicleData] = useState({});

    const handleGetCarWithId = async () => {
        const api = `${url}/cars/get/${payload?.booking?.car_id}`;
        try {
            const response = await axios.get(api);
            if (response.status === 200) {
                setVehicleData(response.data)
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }
    useEffect(() => { handleGetCarWithId() }, [carId])

    const [updateExtras, setUpdateExtras] = useState({});

    // ✅ initialize state from payload.booking.extras (if any)
    useEffect(() => {
        if (!payload?.booking?.extras?.length) return;

        const mapped = {};
        payload.booking.extras.forEach((extra, index) => {
            mapped[index] = { ...extra };
            // mapped[index] = {
            //     main_id: extra.extras_option_id,
            //     extras_option_id: extra.id,
            //     quantity: extra.quantity,
            // };
        });

        // ✅ Only update if values actually changed
        setUpdateExtras((prev) => {
            const prevString = JSON.stringify(prev);
            const newString = JSON.stringify(mapped);
            return prevString !== newString ? mapped : prev;
        });
    }, [payload?.booking?.extras]);

    const handleUpdateExtras = (index, type, item) => {
        setUpdateExtras((prev) => {
            const currentQuantity = parseInt(prev[index]?.quantity) || 0
            const minQty = parseInt(item.min_qty) || 1;
            const maxQty = parseInt(item.max_qty) || 99;

            let newQty = currentQuantity;

            if (type === 'increase') {
                if (currentQuantity === 0) {
                    newQty = minQty
                } else if (currentQuantity < maxQty) {
                    newQty = currentQuantity + 1
                } else {
                    return prev
                }
            }

            if (type === 'decrease') {
                if (currentQuantity > minQty) {
                    newQty = currentQuantity - 1
                } else if (currentQuantity === minQty) {
                    newQty = 0
                } else {
                    return prev
                }
            }

            const update = { ...prev }

            if (newQty === 0) {
                delete update[index]
            } else {
                update[index] = {
                    main_id: item.extras_option_id,
                    extras_option_id: item.id,
                    quantity: newQty
                }
            }

            // console.log("updated values", update)

            return update



        })
    }

    useEffect(() => {
        setPayload((prevPayload) => ({
            ...prevPayload,
            booking: {
                ...prevPayload.booking,
                extras: Object.values(updateExtras),
            },
        }));
    }, [updateExtras]);

    // useEffect(() => { console.log("vehicle Data", vehicleData) }, [vehicleData])
    // useEffect(() => { console.log("initiall Data", payload) }, [payload])
    // useEffect(() => { console.log("temporary Data", updateExtras) }, [updateExtras])

    return (
        <div className={`extras-modal-main-contianer ${showExtrasModal ? 'show-extras-main-modal' : ''}`} onClick={() => setShowExtrasModal(false)}>
            <div className={`extrasinner-modal ${showExtrasModal ? 'show-extras-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>

                <div className='extras-head-contianer'>
                    <h3>Extras Update</h3>
                    <CgCloseO color='#000' size={20} style={{ cursor: 'pointer' }} onClick={() => setShowExtrasModal(false)} />
                </div>

                <div className='insurance-update-vehicle-contianer'>
                    <div className='insurance-modal-vehilce-image-contianer'>
                        <img src={url + vehicleData?.image} alt='img' />
                    </div>
                    <div className='insurance-update-vehicle-details-section'>
                        <h3>{vehicleData?.name}</h3>
                        <p>{vehicleData?.type?.name}</p>
                        <span>NZD {vehicleData?.base_rate}/Day</span>
                    </div>
                </div>

                <div className='update-extras-options-contianer'>
                    {vehicleData?.extras?.map((item, index) => (
                        <div className='update-extras-single-option' key={index}>
                            <h3>{item.name}</h3>
                            <div className='update-extras-single-option-quantity-controler'>
                                <button onClick={() => handleUpdateExtras(index, 'decrease', item)} ><FiMinus size={20} color='#FFF' /> </button>
                                <input
                                    type='text'
                                    readOnly
                                    pattern='[0-9]*'
                                    min={item.min_qty}
                                    max={item.max_qty}
                                    inputMode='numeric'
                                    name='quantity'
                                    value={updateExtras[index]?.quantity || 0}
                                />
                                <button onClick={() => handleUpdateExtras(index, 'increase', item)}><FiPlus size={20} color='#FFF' /></button>
                            </div>

                        </div>
                    ))}
                </div>



            </div>


        </div>
    )
}

export default ExtrasUpdateModal