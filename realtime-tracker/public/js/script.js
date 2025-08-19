const socket = io();

// navigator is an object which contains all the tools which a browser
// provides to interact with the User.

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing map...');
    // Initialize map
    const map = L.map("map").setView([0, 0], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = {};

    if (navigator.geolocation) {
        console.log('Geolocation supported, watching position...');
        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log('Position received:', latitude, longitude);
            socket.emit("send-location", {
                latitude,
                longitude
            });
        }, (error) => {
            console.error("Error getting location:", error);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0, // MaximumAge is 0 means the browser will not use a cached position
            timeout: 5000 // Timeout is 5000 means the browser will wait for 5 seconds to get the position
        });
    } else {
        console.log('Geolocation not supported');
    }

    socket.on("receive-location", (data) => {
        const { id, latitude, longitude } = data;
        map.setView([latitude, longitude], 16);

        if (markers[id]) {
            markers[id].setLatLng([latitude, longitude]);
        } else {
            markers[id] = L.marker([latitude, longitude]).addTo(map);
        }
    });

    socket.on("user-disconnect", (id) => {
        if (markers[id]) {
            map.removeLayer(markers[id]);
            delete markers[id];
        }
    });
});