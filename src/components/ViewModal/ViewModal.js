import React, { useState, useEffect } from 'react';
import styled from './ViewModal.module.scss';
import Webcam from 'react-webcam';
import config from "../../common/config.js";
const ViewModal = ({ data, onClose }) => {
    const [showCam1, setShowCam1] = useState(false);
    const [showCam2, setShowCam2] = useState(false);
    const [googleMapUrl, setGoogleMapUrl] = useState('');

    const handleModalContentClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const latitude = data.location.latitude;
        const longitude = data.location.longitude;
        const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
        const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=15`;
        setGoogleMapUrl(mapUrl);
    }, [data]);

    return (
        <div className={styled.modalOverlay} onClick={onClose}>
            <button style={{position:"absolute",right:'19rem',top:'9rem'}} onClick={onClose}>Close</button>
            <div className={styled.modalContent} onClick={handleModalContentClick}>

                <div className={styled.webcam1}>
                    {!showCam2 && <button onClick={() => setShowCam2(true)}>Access Webcam1</button>}
                    {showCam2 && <Webcam
                        audio={false}
                        style={{ width: '70%', height: 'auto' }}
                    />}
                </div>
                <div className={styled.webcam1}>
                    {!showCam1 && <button onClick={() => setShowCam1(true)}>Access Webcam2</button>}
                    {showCam1 && <Webcam
                        audio={false}
                        style={{ width: '70%', height: 'auto' }}
                    />}
                </div>
                <div className={styled.gmaps}>
                    {googleMapUrl && (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            src={googleMapUrl}
                            allowFullScreen
                        />
                    )}
                </div>
                <div className={styled.lat_long}>
                    <h1>Latitude : {data.location.latitude}</h1>
                    <h1>Longitude : {data.location.longitude}</h1>
                </div>
            </div>
        </div>
    );
};
export default ViewModal;
