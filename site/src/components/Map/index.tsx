import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styled from "styled-components";
import { useScript } from "@uidotdev/usehooks";

const defaultLatLng = {
    lat: 42.8756504,
    lng: 74.5910862,
};

export const Map = () => {
    const [gmapsLoaded, setGmapsLoaded] = useState(false);
    const mapDivRef = useRef();
    const gmapRef = useRef();
    const initMap = () => console.log("map initted!");
    const status = useScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbDfrPKMdXXJ4i1TVofmhrJOG7nsPDz0U&v=beta&libraries=marker&callback=Function.prototype`,
        {
            removeOnUnmount: false,
        }
    );
    useEffect(() => {
        console.log("status?", status);
        if (status === "ready") {
            const gmap = new window.google.maps.Map(mapDivRef.current, {
                center: defaultLatLng,
                zoom: 13,
                mapId: "DEMO_MAP_ID",
            });
            gmapRef.current = gmap;

            if (gmapRef.current) {
                const priceTag = document.createElement("div");

                priceTag.className = "price-tag";
                priceTag.textContent = "$2.5M";

                const markerView = new google.maps.marker.AdvancedMarkerView({
                    map: gmapRef.current,
                    position: defaultLatLng,
                    content: priceTag,
                });
            }
        }
    }, [status]);

    return (
        <>
            <MapWrapper ref={mapDivRef} id="map" />
        </>
    );
};

const MapWrapper = styled.div`
    width: 100%;
    height: 350px;
`;
