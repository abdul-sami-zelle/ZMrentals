import React, { useEffect, useRef } from 'react'
import './BottomSignature.css'
import SignaturePad from 'react-signature-pad-wrapper';
import { url } from '@/utils/services';

const BottomSignature = ({ editBookingPayload, setEditBookingPayload, setCustomerSignature, isEditabel }) => {
  const sigPadRef = useRef(null);

  const handleClear = () => {
    sigPadRef.current.clear();
  };

  const handleSave = () => {
    if (!sigPadRef.current.isEmpty()) {
      const dataURL = sigPadRef.current.toDataURL("image/png");

      // Convert Base64 → Blob
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Now you have a real PNG blob ✅

      // If you want as a File (to upload)
      const file = new File([blob], "signature.png", { type: "image/png" });

      setCustomerSignature(file)
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomerSignature(file);
    }
  };

  const handleShowPad = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      signature: {
        ...prev.signature,
        signature_image: ''
      }
    }))
  }


  return (
    <div className='mobile-signature-section'>
      <div className={`mobile-signature-modal-inner `} style={{opacity: isEditabel.signatureInfo ? 1 : 0.4}} >
        {editBookingPayload?.signature?.signature_image !== '' ? (
          <img
            src={
              editBookingPayload?.signature?.signature_image instanceof File
                ? URL.createObjectURL(editBookingPayload.signature.signature_image)
                : url + editBookingPayload?.signature?.signature_image
            }
            alt='img'
          />
        ) : (
          <div className='mobile-signature-modal-pad'>

            <SignaturePad
              ref={sigPadRef}
              options={{
                penColor: "blue", // 👈 custom pen color
              }}
              style={{
                border: "1px solid #ccc",
                width: "100%", // responsive
                height: 550,
                backgroundColor: "#d7d7d7",
              }}
            />
          </div>
        )}

        <div className='mobile-signature-modal-footer'>
          <div className='mobile-signature-upload-and-clear'>
            <button disabled={!isEditabel.signatureInfo} onClick={() => editBookingPayload?.signature?.signature_image !== '' ? handleShowPad() : handleClear()}>Clear Signature</button>
            <button disabled={!isEditabel.signatureInfo} onClick={() => document.getElementById("signatureUpload").click()}>Upload Signature</button>
            <input
              id="signatureUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}

            />
          </div>
          <button className='mobile-save-signature-button' disabled={!isEditabel.signatureInfo} onClick={handleSave}>Save Signature</button>
        </div>
      </div>
    </div>
  )
}

export default BottomSignature


