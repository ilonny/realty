import { FC, useEffect, useRef, useState } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Input, Select } from "../../../shared/components/input";
import { API_URL } from "../../../constants/globalApi.constants";
import { Loader } from "@googlemaps/js-api-loader";
import ImageUploading from "react-images-uploading";
import RUG, { Card, List } from "react-upload-gallery";
import "react-upload-gallery/dist/style.css"; // or scss
import { Label } from "../../../shared/components/input/styles";
import { UserCard } from "../../user/components/userCard";

const AddressInput = () => {};

const loader = new Loader({
  apiKey: "AIzaSyBbDfrPKMdXXJ4i1TVofmhrJOG7nsPDz0U",
  version: "weekly",
  libraries: ["places", "maps"],
});

export const DetailForm: FC<any> = (props) => {
  const { isEditMode = false, formData, setFormData, data } = props;
  const [gmapsLoaded, setGmapsLoaded] = useState(false);
  const [category, setCategory] = useState([]);
  const [series, setSeries] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [communication, setCommunication] = useState([]);
  const [state, setState] = useState([]);
  const [document, setDocument] = useState([]);
  const [type, setType] = useState([]);

  const [initialImages, setImages] = useState([]);
  const [galleryReady, setGalleryReady] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.photos) {
      let photos = [];
      try {
        photos = JSON.parse(data.photos);
        photos = photos.map((p) => {
          let url = API_URL + "/" + p;
          return { data_url: url, source: url };
        });
        setImages(photos);
      } catch (err) {
        console.log(err);
      } finally {
        // setGalleryReady(true);
      }
    } else {
      // setGalleryReady(true);
    }
    setTimeout(() => {
      setGalleryReady(true);
    }, 2000);
  }, [data]);

  useEffect(() => {
    loader.importLibrary("maps").then(() => {
      setGmapsLoaded(true);
    });
    fetch(API_URL + "/" + "category", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
    fetch(API_URL + "/" + "series", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSeries(res);
      });
    fetch(API_URL + "/" + "district", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDistrictData(res);
      });
    fetch(API_URL + "/" + "rooms", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setRooms(res);
      });
    fetch(API_URL + "/" + "communication", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCommunication(res);
      });
    fetch(API_URL + "/" + "state", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      });
    fetch(API_URL + "/" + "document", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDocument(res);
      });
    fetch(API_URL + "/" + "type", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setType(res);
      });
  }, []);

  const mapRef = useRef();
  const gmapRef = useRef();

  let address = "";
  try {
    address = JSON.parse(formData["address"] || "") || "";
  } catch (err) {}

  const findPlaceByCoords = (lat, lng) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        latLng: { lat, lng },
      },
      (cb) => {
        // console.log("cb?", cb);
        if (!cb?.length) {
          return;
        }
        setFormData((prev) => ({ ...prev, address: JSON.stringify(cb[0]) }));
      }
    );
  };

  useEffect(() => {
    if (!gmapsLoaded || !mapRef.current) {
      return;
    }
    const gmap = new window.google.maps.Map(mapRef.current, {
      center: address
        ? address.geometry.location
        : {
            lat: 42.8756504,
            lng: 74.5910862,
          },
      zoom: 13,
    });

    gmap.addListener("click", (e) => {
      // console.log("click e: ", e);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      findPlaceByCoords(lat, lng);
      // findPlaceByCoords(lat, lng);

      console.log("geocoder", geocoder);
    });
    gmapRef.current = gmap;
  }, [gmapsLoaded]);

  // console.log("formData", formData);
  // console.log("data", data);
  // console.log("images", images);

  // if (!isEditMode) {
  //   return (
  //     <Grid item xs={12}>
  //       <Grid item xs={6}>
  //         <TableContainer>
  //           <Table>
  //             <TableBody>
  //               <TableRow>
  //                 <TableCell>ID:</TableCell>
  //                 <TableCell>{formData?.id}</TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell>ID:</TableCell>
  //                 <TableCell>{formData?.id}</TableCell>
  //               </TableRow>
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //       </Grid>
  //     </Grid>
  //   );
  // }

  return (
    <div style={{ maxWidth: "800px" }}>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Название*"}
            value={formData?.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Категория"}
            value={formData?.category_id}
            data={category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Серия"}
            value={formData?.series_id}
            data={series}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                series_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ pointerEvents: "none" }}>
            <Input
              isEditMode={isEditMode}
              fullWidth
              readOnly
              labelTop={"Адрес (выберите на карте)"}
              value={address?.formatted_address || ""}
            />
          </div>
          <br />
          <div
            id="map"
            ref={mapRef}
            style={{ width: "100%", height: "300px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Район"}
            value={formData?.district_id}
            data={districtData}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                district_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Общая площадь (кв. м.)"}
            value={formData?.total_area}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, total_area: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Количество комнат"}
            value={formData?.rooms_id}
            data={rooms}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rooms_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Этаж"}
            value={formData?.floor}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, floor: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Этажей в доме"}
            value={formData?.house_floor_number}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                house_floor_number: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Балкон"}
            value={formData?.balcony}
            data={[
              {
                value: "",
                id: "",
                name: "Нет",
              },
              {
                value: "balcony",
                id: "balcony",
                name: "Балкон",
              },
              {
                value: "loggia",
                id: "loggia",
                name: "Лоджия",
              },
            ]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                balcony: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Балкон"}
            value={formData?.balcony_glass}
            data={[
              {
                value: "0",
                id: "0",
                name: "Нет",
              },
              {
                value: "1",
                id: "1",
                name: "Да",
              },
            ]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                balcony_glass: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Коммуникации"}
            value={formData?.communication_id}
            data={communication}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                communication_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Состояние"}
            value={formData?.state_id}
            data={state}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                state_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Правоустанавливающие документы"}
            value={formData?.document_id}
            data={document}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                document_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Цена"}
            value={formData?.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Цена на руки для агента"}
            value={formData?.agent_price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                agent_price: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Тип отношений"}
            value={formData?.type_id}
            data={type}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                type_id: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            multiline
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Описание"}
            value={formData?.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            multiline
            isEditMode={isEditMode}
            fullWidth
            labelTop={"ФИО собственника"}
            value={formData?.owner_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, owner_name: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            multiline
            isEditMode={isEditMode}
            fullWidth
            labelTop={"Телефон собственника"}
            value={formData?.owner_phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, owner_phone: e.target.value }))
            }
          />
        </Grid>
        {/* <Grid item xs={12}>
          <ImageUploading
            multiple
            value={images}
            onChange={(imagesList) => {
              setImages(imagesList);
            }}
            maxNumber={10}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => {
              return (
                <div
                  className="upload__image-wrapper"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {!imageList.length && (
                    <button>
                      Перетащите файлы сюда или нажмите, чтобы загрузить.
                    </button>
                  )}
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={URL.createObjectURL(image.file)}
                        alt=""
                        width="100"
                      />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </ImageUploading>
        </Grid> */}
        <Grid item xs={12}>
          <Label>Основное фото</Label>
          <UserCard
            data={data}
            formData={formData}
            userId={1}
            skipData
            onChoosePhoto={(photo) => {
              console.log("onChoosePhoto photo: ", photo);
              setFormData((prev) => ({ ...prev, main_photo: photo, photo }));
            }}
          />
        </Grid>
        {galleryReady && (
          <Grid item xs={12}>
            <br />
            <Label>Галерея фотографий</Label>
            <RUG
              initialState={initialImages}
              dataURLKey="source"
              autoUpload={false}
              onChange={(selectedImages) => {
                console.log("onChange selectedImages: ", selectedImages);
                setFormData((prev) => ({
                  ...prev,
                  photos: selectedImages.map((i) => i.file),
                }));
                setImages(selectedImages);
                // this.setState({ images }); // save current component
              }}
              // action="/api/upload" // upload route
              // source={(response) => response.source} // response image source
            >
              {(images) => {
                return (
                  <div className="rug-items __card __sorting">
                    {images.map((image) => {
                      console.log("image??", image);
                      return (
                        <div>
                          <div className="rug-item">
                            <div className="rug-card ">
                              <div
                                className="rug-card-image"
                                style={{
                                  backgroundImage: `url(${image.source})`,
                                }}
                              >
                                <img src={`${image.source}`} />
                              </div>
                              <div
                                className="rug-card-remove"
                                onClick={image.remove}
                              >
                                <svg viewBox="0 0 40 40">
                                  <path
                                    stroke="current"
                                    stroke-linecap="round"
                                    stroke-width="4"
                                    d="M 10,10 L 30,30 M 30,10 L 10,30"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </RUG>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
