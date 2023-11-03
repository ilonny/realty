import { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styled from "styled-components";
import { useScript } from "@uidotdev/usehooks";
import { FilterContext } from "../../context/FilterContext";
import { API_URL } from "../../constants";

const defaultLatLng = {
    lat: 42.8756504,
    lng: 74.5910862,
};

export const Map = () => {
    const [gmapsLoaded, setGmapsLoaded] = useState(false);
    const mapDivRef = useRef();
    const gmapRef = useRef();
    const markersRef = useRef([]);
    const { filteredData } = useContext(FilterContext);
    const status = useScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbDfrPKMdXXJ4i1TVofmhrJOG7nsPDz0U&v=beta&libraries=marker&callback=Function.prototype`,
        {
            removeOnUnmount: false,
        }
    );

    useEffect(() => {
        if (status === "ready") {
            setTimeout(() => {
                if (!gmapRef.current) {
                    const gmap = new window.google.maps.Map(mapDivRef.current, {
                        center: defaultLatLng,
                        zoom: 13,
                        mapId: "DEMO_MAP_ID",
                    });
                    gmapRef.current = gmap;
                }
                setGmapsLoaded(true);
            }, 3000);
        }
    }, [status]);

    useEffect(() => {
        if (gmapsLoaded) {
            markersRef.current.forEach((m) => m?.setMap(null));
            markersRef.current = [];
            filteredData?.forEach((r) => {
                const priceTag = document.createElement("div");
                priceTag.className = "price-tag";
                priceTag.textContent = "$" + (r.price / 1000).toFixed(2) + "K";
                let address;
                try {
                    address = JSON.parse(r.address);
                    const infoWindow = new google.maps.InfoWindow();
                    const markerView =
                        new google.maps.marker.AdvancedMarkerView({
                            map: gmapRef.current,
                            position: address?.geometry?.location,
                            content: priceTag,
                        });
                    markerView.addListener("click", ({ domEvent, latLng }) => {
                        const { target } = domEvent;

                        infoWindow.close();
                        infoWindow.setContent(
                            `
                            <div class="marker-content">
                            <a href="#">
                                ${
                                    !!r.main_photo &&
                                    `
                                <img style="width: 70px" src=${
                                    API_URL + "/" + r.main_photo
                                } />`
                                }
                                <p>${r.name}</p>
                                </a>
                            </div>`
                        );
                        infoWindow.open(markerView.map, markerView);
                    });
                    markersRef.current.push(markerView);
                } catch (e) {
                    console.log("catch e", e);
                }
            });
        }
    }, [filteredData, gmapsLoaded]);

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
