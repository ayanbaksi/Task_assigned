document.addEventListener('DOMContentLoaded', function () {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    
    const gmaps = document.getElementById('gmaps');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    let showCam1 = false;
    let showCam2 = false;
    let googleMapUrl = '';

    const handleModalContentClick = (event) => {
        event.stopPropagation();
    };

    const toggleWebcam1 = () => {
        showCam1 = !showCam1;
        webcam1.innerHTML = showCam1 ? '<Webcam1 HTML or button>' : '<button onclick="toggleWebcam1()">Access Webcam1</button>';
    };

    const toggleWebcam2 = () => {
        showCam2 = !showCam2;
        webcam2.innerHTML = showCam2 ? '<Webcam2 HTML or button>' : '<button onclick="toggleWebcam2()">Access Webcam2</button>';
    };

    const closeModal = () => {
        modalOverlay.style.display = 'none';
    };

    const updateGoogleMap = (lat,long,apiKey) => {
        const latitude = /* Get latitude */;
        const longitude = /* Get longitude */;
        const apiKey = /* Your Google Maps API key */;
        googleMapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=15`;
        gmaps.innerHTML = googleMapUrl ? `<iframe width="100%" height="100%" style="border: 0" src="${googleMapUrl}" allowFullScreen></iframe>` : '';
    };

    const updateLocation = () => {
        latitudeElement.textContent = `Latitude: ${/* Get latitude */}`;
        longitudeElement.textContent = `Longitude: ${/* Get longitude */}`;
    };

    modalOverlay.addEventListener('click', closeModal);
    modalContent.addEventListener('click', handleModalContentClick);

    updateGoogleMap();
    updateLocation();
});
