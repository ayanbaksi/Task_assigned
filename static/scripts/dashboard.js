document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('token') === null) {
        window.location.href = '/login';
    } else {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalContent = document.getElementById('modalContent');
        // const latitudeElement = document.getElementById('latitude');
        // const longitudeElement = document.getElementById('longitude');
        const gmaps = document.getElementById('gmaps'); // Add this line
        const alarmButton = document.getElementById('alarmButton');
        const webcam1 = document.getElementById('webcam1');
        const webcam2 = document.getElementById('webcam2');
        let selectedData = null;

        const toggleAlarm = (alarm) => {
            console.log(`Toggle alarm for index ${alarm}`);
            let bgColor;
            if (alarm) bgColor = "green";
            else bgColor = "red";
            alarmButton.style.backgroundColor = "red";
        };
        const updateGoogleMap = () => {
            const apiKey = "AIzaSyAJrVwfXdMdPHX2bLxXpQyZaczi1XvRx2o";
            
            // Get the current location using Geolocation API
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const googleMapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=15`;
                    
                    // Update the gmaps element with the Google Maps iframe
                    gmaps.innerHTML = googleMapUrl ? `<iframe width="100%" height="100%" style="border: 0" src="${googleMapUrl}" allowfullscreen></iframe>` : '';
                },
                () => {
                    // Handle errors here
                    alert("Error: The Geolocation service failed.");
                }
            );
        };

        const openModal = (lat, long) => {
            console.log("first", lat, "  ", long);
            modalOverlay.style.display = 'flex';
            // selectedData = { location: { latitude: lat, longitude: long } };
            updateModalContent();
            updateGoogleMap();
        };

        const closeModal = (event) => {
            modalOverlay.style.display = 'none';
            const originalWebcam1Content = "<button onclick='toggleWebcam1()'>Access Webcam1</button>";
            const originalWebcam2Content = "<button onclick='toggleWebcam2()'>Access Webcam2</button>";
            webcam1.innerHTML = originalWebcam1Content;
            webcam2.innerHTML = originalWebcam2Content;
        };

        const updateModalContent = () => {
            console.log("first")
            // latitudeElement.textContent = `Latitude: ${selectedData.location.latitude}`;
            // longitudeElement.textContent = `Longitude: ${selectedData.location.longitude}`;
        };

        const toggleWebcam1 = () => {
            // window.location = '/meeting'
            const webcam1 = document.getElementById('webcam1');
            const iframeCode = `
                <iframe
                    src='/meeting'
                    title='iframe Example 1'
                    width='100%'
                    height='100%'>
                </iframe>
            `;
            webcam1.innerHTML = iframeCode;
        };
        
        

        const toggleWebcam2 = () => {
            const webcam2 = document.getElementById('webcam2');
            const iframeCode = `
                <iframe
                    src='http://127.0.0.1:8080/'
                    title='iframe Example 1'
                    width='100%'
                    height='100%'>
                </iframe>
            `;
            webcam2.innerHTML = iframeCode;
            console.log('Toggle Webcam2');
        };
        const openCam = () => {
            let All_mediaDevices = navigator.mediaDevices
            if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
                console.log("getUserMedia() not supported.");
                return;
            }
            All_mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
                .then(function (vidStream) {
                    var video = document.getElementById('videoCam');
                    if ("srcObject" in video) {
                        video.srcObject = vidStream;
                    } else {
                        video.src = window.URL.createObjectURL(vidStream);
                    }
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                })
                .catch(function (e) {
                    console.log(e.name + ": " + e.message);
                });
        }

        window.toggleAlarm = toggleAlarm;
        window.openModal = openModal;
        window.toggleWebcam1 = toggleWebcam1;
        window.toggleWebcam2 = toggleWebcam2;
        window.closeModal = closeModal;
    }

});
