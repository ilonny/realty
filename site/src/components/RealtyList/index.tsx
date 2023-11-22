import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { StyledContent } from "../StyledContent";
import { FilterContext } from "../../context/FilterContext";
import styled from "styled-components";
import { Flex, Spacer } from "@chakra-ui/react";
import { API_URL, Colors } from "../../constants";
import { Link } from "react-router-dom";

const Arrow = () => {
  return (
    <div>
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1032_53015)">
          <path
            d="M16.6944 18.5011L24.3254 26.1319L22.1452 28.3121L12.334 18.5011L22.1452 8.68994L24.3254 10.8702L16.6944 18.5011Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1032_53015"
            x="10.334"
            y="8.68994"
            width="15.9922"
            height="23.6221"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1032_53015"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1032_53015"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: (
    <button
      type="button"
      data-role="none"
      class="slick-arrow slick-next"
      style={{
        display: "block",
      }}
    >
      <Arrow />
    </button>
  ),
  prevArrow: (
    <button
      type="button"
      data-role="none"
      class="slick-arrow slick-prev"
      style={{
        display: "block",
        transform: "rotate(90deg)",
      }}
    >
      <Arrow />
    </button>
  ),
};

export const RealtyList = ({ agentId }) => {
  const { filteredData, data } = useContext(FilterContext);
  const [agents, setAgents] = useState([]);

  const dataToRender = agentId
    ? data?.filter((r) => r.agent_id == agentId)
    : filteredData;

  useEffect(() => {
    fetch(API_URL + "/" + "user/get-agents")
      .then((res) => res.json())
      .then((res) => {
        setAgents(res);
      });
  }, []);

  if (!dataToRender || !dataToRender?.length) {
    return null;
  }
  return (
    <StyledContent>
      <Wrapper wrap="wrap">
        {dataToRender.map((realty) => {
          const agent = agents?.find((a) => a.id == realty.agent_id);
          console.log("agent?", agent);
          let photos = [];
          if (realty.main_photo) {
            photos.push(API_URL + "/" + realty.main_photo);
          }
          try {
            let gallery = JSON.parse(realty.photos);
            photos = photos.concat(gallery.map((g) => API_URL + "/" + g));
          } catch (e) {}
          return (
            <RealtyWrapper key={realty.id}>
              <RealtyContent>
                <Link to={`/realty/${realty.id}`}>
                  {!!photos.length && (
                    <Slider {...settings}>
                      {photos.map((p) => {
                        return (
                          <RealtyImageWrapper key={p}>
                            <img
                              src={p}
                              style={{
                                maxWidth: "100%",
                              }}
                            />
                          </RealtyImageWrapper>
                        );
                      })}
                    </Slider>
                  )}
                </Link>
                <RealtyContentPadding>
                  <Link to={`/realty/${realty.id}`}>
                    <RealtyTitle>{realty.name}</RealtyTitle>
                    <RealtyPrice>
                      ${(realty.price / 1000).toFixed(3)}
                    </RealtyPrice>
                    <RealtyText>
                      {realty?.description?.slice(0, 100)} ...
                    </RealtyText>
                    <br />
                    <hr />
                    <br />
                  </Link>
                  <Flex gap="20px">
                    <RealtyButton href={`tel:${agent?.phone}`}>
                      <svg
                        height="15px"
                        width="15px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 487.766 487.766"
                      >
                        <g>
                          <g>
                            <path
                              d="M345.487,487.566c2.2,0.1,4.3,0.2,6.5,0.2c23.5,0,43.1-8.5,58.5-25.2c0.1-0.1,0.3-0.3,0.4-0.4
			c5.5-6.6,11.7-12.6,18.3-18.9c4.5-4.3,9.1-8.7,13.4-13.3c20.5-21.4,20.4-48.5-0.2-69.1l-57-57c-9.8-10.2-21.5-15.6-33.9-15.6
			c-12.3,0-24.1,5.3-34.2,15.4l-33.7,33.7c-3-1.7-6.1-3.2-9.1-4.7c-3.8-1.9-7.3-3.7-10.4-5.6c-30.9-19.6-58.9-45.2-85.7-78.1
			c-13.5-17-22.4-31.2-28.7-45.8c8.8-8,17-16.3,24.9-24.4c2.9-2.9,5.8-5.9,8.8-8.9c21.4-21.4,21.4-47.9,0-69.2l-28.3-28.3
			c-3.3-3.3-6.5-6.6-9.7-9.8c-6.3-6.4-12.8-13.1-19.3-19.1c-9.8-9.8-21.4-14.9-33.7-14.9c-12.2,0-24,5.1-34.2,14.9l-35.5,35.4
			c-13,13-20.4,28.8-22,47.1c-1.8,22.8,2.4,47,13.2,76.2c16.7,45.1,41.8,87,79,131.8c45.3,54,99.7,96.7,161.9,126.8
			C278.487,472.066,310.187,485.266,345.487,487.566z M111.787,318.266c-35.4-42.6-59.1-82.2-74.8-124.6
			c-9.7-26.1-13.3-46.4-11.8-65.7c1.1-12.5,5.9-22.9,14.9-31.8l35.3-35.3c5.4-5.2,11.3-7.9,17.1-7.9c5.7,0,11.3,2.7,16.7,8
			c6.3,5.9,12.4,12.1,18.8,18.6c3.2,3.3,6.5,6.7,9.9,10l28.3,28.3c11.6,11.6,11.6,23,0,34.6c-3,3-6,6-8.9,9
			c-8.8,8.9-17,17.3-26.1,25.4c-0.2,0.2-0.3,0.3-0.5,0.5c-8.1,8.1-6.9,15.9-4.9,21.7c0.1,0.3,0.2,0.5,0.3,0.8
			c7.3,17.6,17.6,34.3,33.4,54.3c28.5,35.1,58.5,62.4,91.7,83.5c4.1,2.6,8.4,4.8,12.6,6.9c3.8,1.9,7.3,3.7,10.4,5.6
			c0.4,0.2,0.7,0.4,1.1,0.6c3.2,1.6,6.3,2.4,9.5,2.4c7.9,0,12.9-5,14.5-6.7l35.5-35.5c5.4-5.4,11.2-8.2,16.9-8.2
			c7,0,12.7,4.4,16.4,8.2l57.2,57.2c14,14,7.6,26.6-0.3,34.9c-4,4.3-8.2,8.3-12.6,12.6c-6.7,6.4-13.6,13.1-19.9,20.6
			c-10.8,11.6-23.6,17-40.3,17c-1.6,0-3.3-0.1-4.9-0.2c-31.1-2-59.9-14.1-81.6-24.4
			C206.487,410.166,154.787,369.666,111.787,318.266z"
                            ></path>
                            <path
                              d="M268.087,89.266c-6.7-1.1-13,3.4-14.1,10c-1.1,6.7,3.4,13,10,14.1c27.5,4.7,52.5,17.7,72.5,37.6
			c19.9,19.9,32.9,45,37.6,72.5c1,6,6.2,10.2,12.1,10.2c0.7,0,1.4-0.1,2.1-0.2c6.7-1.1,11.2-7.5,10-14.1
			c-5.5-32.5-20.9-62.2-44.4-85.7C330.187,110.066,300.587,94.766,268.087,89.266z"
                            ></path>
                            <path
                              d="M475.187,229.466c0.7,0,1.4-0.1,2.1-0.2c6.7-1.1,11.2-7.5,10-14.1c-9.1-53.8-34.5-102.7-73.4-141.6
			c-39-38.9-87.9-64.3-141.7-73.4c-6.7-1.1-13,3.4-14.1,10c-1.1,6.7,3.4,13,10,14.1c48.7,8.3,93.1,31.3,128.4,66.6
			s58.3,79.7,66.6,128.4C464.087,225.266,469.287,229.466,475.187,229.466z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span>Звонок</span>
                    </RealtyButton>
                    <RealtyButton href={`mailto:${agent?.email}`}>
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1426 0.0699463C12.8027 0.0699463 13.3613 0.62854 13.3613 1.2887V8.6012C13.3613 9.28674 12.8027 9.81995 12.1426 9.81995H1.58008C0.894531 9.81995 0.361328 9.28674 0.361328 8.6012V1.2887C0.361328 0.62854 0.894531 0.0699463 1.58008 0.0699463H12.1426ZM12.1426 1.2887H1.58008V2.32971C2.13867 2.81213 3.05273 3.52307 4.98242 5.04651C5.41406 5.37659 6.25195 6.18909 6.86133 6.1637C7.44531 6.18909 8.2832 5.37659 8.71484 5.04651C10.6445 3.52307 11.5586 2.81213 12.1426 2.32971V1.2887ZM1.58008 8.6012H12.1426V3.90393C11.5586 4.36096 10.7207 5.02112 9.47656 6.01135C8.89258 6.44299 7.92773 7.40784 6.86133 7.38245C5.76953 7.40784 4.7793 6.44299 4.2207 6.01135C2.97656 5.02112 2.13867 4.36096 1.58008 3.90393V8.6012Z"
                          fill="#CF1409"
                        />
                      </svg>

                      <span>E-mail</span>
                    </RealtyButton>
                    <RealtyButton href={`https://wa.me/${agent?.phone}`}>
                      <svg
                        height="15px"
                        width="15px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 308 308"
                      >
                        <g id="XMLID_468_">
                          <path
                            id="XMLID_469_"
                            d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
                          />
                          <path
                            id="XMLID_470_"
                            d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
                          />
                        </g>
                      </svg>
                    </RealtyButton>
                  </Flex>
                </RealtyContentPadding>
              </RealtyContent>
            </RealtyWrapper>
          );
        })}
      </Wrapper>
    </StyledContent>
  );
};

const Wrapper = styled(Flex)`
  .slick-next:before,
  .slick-prev:before {
    content: "";
  }
  .slick-next {
    transform: translate(0, -50%) rotate(180deg);
  }
`;

const RealtyWrapper = styled.div`
  width: 100%;
  max-width: 33.33333%;
  padding: 10px;
  @media screen and (max-width: 800px) {
    max-width: 50%;
  }
  @media screen and (max-width: 400px) {
    max-width: initial;
  }
`;

const RealtyContent = styled.div`
  background-color: #fff  !important;
`;

const RealtyContentPadding = styled.div`
  padding: 20px;
`;

const RealtyImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  & img {
    min-width: 100%;
    max-width: initial !important;
    height: 200px;
  }
`;

const RealtyTitle = styled.a`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.MAIN_BLACK}  !important;
  margin-bottom: 5px;
  transition: all 250ms ease;
  cursor: pointer;
  &:hover {
    color: ${Colors.MAIN_RED}  !important;
  }
`;

const RealtyPrice = styled.p`
  color: ${Colors.MAIN_RED}  !important;
  font-weight: bold;
  margin-bottom: 5px;
`;

const RealtyText = styled.p`
  color: #5c727d  !important;
`;

export const RealtyButton = styled.a`
  white-space: nowrap;
  text-align: center;
  justify-content: center;
  width: 100%;
  min-height: 31px;
  height: 100%;
  background: #cf14091a;
  padding: 5px 15px;
  color: ${Colors.MAIN_RED}  !important;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  & svg {
    fill: ${Colors.MAIN_RED};
    transition: all 250ms ease;
  }
  transition: all 250ms ease;
  &:hover {
    color: #fff  !important;
    background: ${Colors.MAIN_RED};
    & svg,
    & path {
      fill: #fff;
    }
  }
`;
