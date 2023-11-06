import {
    Button,
    Checkbox,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Spacer,
} from "@chakra-ui/react";
import { StyledContent } from "../StyledContent";
import styled from "styled-components";
import { Colors } from "../../constants";
import { IconCat1, IconCat2, IconCat3, IconCat4, IconCat5 } from "./icons";
import React, { useCallback, useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";

const Filters = () => {
    const {
        categoryId,
        setCategoryId,
        districts,
        districtsFilter,
        setDistrictsFilter,
        series,
        seriesFilter,
        setSeriesFilter,
        rooms,
        roomsFilter,
        setRoomsFilter,
        state,
        stateFilter,
        setStateFilter,
        type,
        typeFilter,
        setTypeFilter,
        priceMinFilter,
        setPriceMinFilter,
        priceMaxFilter,
        setPriceMaxFilter,
        developer,
        apartmentComplex,
        apartmentComplexFilter,
        setApartmentComplexFilter,
        idFilter,
        setIdFilter,
        districtsParent,
    } = useContext(FilterContext);
    const [districtsSearchString, setDistrictsSearchString] = useState("");
    const [apartmentSearchString, setApartmentSearchString] = useState("");
    const [districtsModalOpened, setDistrictsModalOpened] = useState(false);
    const [apartmensModalOpened, setApartmensModalOpened] = useState(false);
    const [chosenDev, setChosenDev] = useState([]);
    const [chosenDistrictParent, setChosenDistrictParent] = useState([]);

    return (
        <>
            <StyledContent>
                <div>
                    <FiltersContainer gap={5} justifyContent={"space-between"}>
                        <CategoryFilter
                            active={categoryId === 1}
                            onClick={
                                () => setCategoryId(1)
                                // setCategoryId((c) => (c === 1 ? null : 1))
                            }
                        >
                            <IconCat1 />
                            <p>Вторичная</p>
                        </CategoryFilter>
                        <CategoryFilter
                            active={categoryId === 2}
                            onClick={
                                () => setCategoryId(2)
                                // setCategoryId((c) => (c === 3 ? null : 3))
                            }
                        >
                            <IconCat3 />
                            <p>Новостройки</p>
                        </CategoryFilter>
                        <CategoryFilter
                            active={categoryId === 3}
                            onClick={
                                () => setCategoryId(3)
                                // setCategoryId((c) => (c === 2 ? null : 2))
                            }
                        >
                            <IconCat2 />
                            <p>Элитка</p>
                        </CategoryFilter>
                        <CategoryFilter
                            active={categoryId === 4}
                            onClick={
                                () => setCategoryId(4)
                                // setCategoryId((c) => (c === 4 ? null : 4))
                            }
                        >
                            <IconCat4 />
                            <p>Дома и участки</p>
                        </CategoryFilter>
                        <CategoryFilter
                            active={categoryId === 5}
                            onClick={
                                () => setCategoryId(5)
                                // setCategoryId((c) => (c === 5 ? null : 5))
                            }
                        >
                            <IconCat5 />
                            <p>Коммерческая</p>
                        </CategoryFilter>
                    </FiltersContainer>
                    <FiltersContainer gap={5} paddingTop={0}>
                        <Input
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            variant="outline"
                            placeholder="Недвижимость ID"
                        />
                        <Input
                            readOnly
                            onClick={() => setDistrictsModalOpened(true)}
                            placeholder="Выбрать район"
                            value={districtsFilter
                                .map((f) => f.name)
                                .join(", ")}
                        />
                        {!!(categoryId == 1) && (
                            <Select
                                placeholder="Выбрать серию"
                                onChange={(e) =>
                                    setSeriesFilter(e.target.value)
                                }
                            >
                                {series.map((s) => {
                                    return (
                                        <option
                                            selected={s.id == seriesFilter}
                                            value={s.id}
                                        >
                                            {s.name}
                                        </option>
                                    );
                                })}
                            </Select>
                        )}
                        {!!(categoryId == 3) && (
                            <Input
                                readOnly
                                placeholder="Жилой комплекс"
                                onClick={() => setApartmensModalOpened(true)}
                                value={apartmentComplexFilter
                                    .map((f) => f.name)
                                    .join(", ")}
                            />
                        )}
                        <Select
                            placeholder="Выбрать комнаты"
                            onChange={(e) => setRoomsFilter(e.target.value)}
                        >
                            {rooms.map((s) => {
                                return (
                                    <option
                                        selected={s.id == roomsFilter}
                                        value={s.id}
                                    >
                                        {s.name}
                                    </option>
                                );
                            })}
                        </Select>
                        <Select
                            placeholder="Выбор состояния"
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            {state.map((s) => {
                                return (
                                    <option
                                        selected={s.id == stateFilter}
                                        value={s.id}
                                    >
                                        {s.name}
                                    </option>
                                );
                            })}
                        </Select>
                    </FiltersContainer>
                    <FiltersContainer gap={5} paddingTop={0}>
                        <Select
                            placeholder="Выбор типа отношений"
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            {type.map((s) => {
                                return (
                                    <option
                                        selected={s.id == typeFilter}
                                        value={s.id}
                                    >
                                        {s.name}
                                    </option>
                                );
                            })}
                        </Select>
                        <RangeWrapper>
                            <p>
                                Ценовой диапазон:{" "}
                                <span>от $0 до $ 150,000</span>
                            </p>
                            <RangeSlider
                                defaultValue={[priceMinFilter, priceMaxFilter]}
                                min={0}
                                max={150000}
                                step={1}
                                onChange={(val) => {
                                    setPriceMinFilter(val[0]);
                                    setPriceMaxFilter(val[1]);
                                }}
                            >
                                <RangeSliderMark
                                    value={priceMinFilter}
                                    textAlign="center"
                                    bg={Colors.MAIN_RED}
                                    color="white"
                                    padding={"3px"}
                                    borderRadius={"3px"}
                                    mt="4"
                                    ml="-5"
                                    w="15"
                                >
                                    {priceMinFilter}$
                                </RangeSliderMark>
                                <RangeSliderMark
                                    value={priceMaxFilter}
                                    textAlign="center"
                                    bg={Colors.MAIN_RED}
                                    color="white"
                                    padding={"3px"}
                                    borderRadius={"3px"}
                                    mt="4"
                                    ml="-5"
                                    w="15"
                                >
                                    {priceMaxFilter}$
                                </RangeSliderMark>
                                <RangeSliderTrack bg="red.100">
                                    <RangeSliderFilledTrack
                                        bg={Colors.MAIN_RED}
                                    />
                                </RangeSliderTrack>
                                <RangeSliderThumb boxSize={6} index={0} />
                                <RangeSliderThumb boxSize={6} index={1} />
                            </RangeSlider>
                        </RangeWrapper>
                        {/* <SearchButton>Поиск</SearchButton> */}
                    </FiltersContainer>
                </div>
            </StyledContent>
            <Modal
                isOpen={districtsModalOpened}
                onClose={() => setDistrictsModalOpened(false)}
                size="3xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Выбрать район</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Искать"
                            value={districtsSearchString}
                            onChange={(e) =>
                                setDistrictsSearchString(e.target.value)
                            }
                        />
                        <br />
                        <br />
                        <ModalFiltersContainer>
                            {districtsParent?.map((parent) => {
                                return (
                                    <React.Fragment key={parent.id}>
                                        <ModalItemWrapperBig>
                                            <Checkbox
                                                onChange={() => {
                                                    setDistrictsFilter(
                                                        (chosenAparts) => {
                                                            return chosenAparts.filter(
                                                                (ap) =>
                                                                    ap.parent_id !=
                                                                    parent.id
                                                            );
                                                        }
                                                    );
                                                    if (
                                                        chosenDistrictParent.includes(
                                                            parent.id
                                                        )
                                                    ) {
                                                        setChosenDistrictParent(
                                                            (d) =>
                                                                d.filter(
                                                                    (old) =>
                                                                        old !==
                                                                        parent.id
                                                                )
                                                        );
                                                    } else {
                                                        setChosenDistrictParent(
                                                            (d) =>
                                                                d.concat(
                                                                    parent.id
                                                                )
                                                        );
                                                        setDistrictsFilter(
                                                            (chosenAparts) => {
                                                                const devAparts =
                                                                    districts.filter(
                                                                        (a) =>
                                                                            a.parent_id ==
                                                                            parent.id
                                                                    );
                                                                return chosenAparts.concat(
                                                                    devAparts
                                                                );
                                                            }
                                                        );
                                                    }
                                                }}
                                                size={"lg"}
                                                isChecked={chosenDistrictParent.includes(
                                                    parent.id
                                                )}
                                            >
                                                {parent.name}
                                            </Checkbox>
                                        </ModalItemWrapperBig>
                                        {districts
                                            .filter(
                                                (d) => d.parent_id == parent.id
                                            )
                                            .filter((d) => {
                                                if (!districtsSearchString) {
                                                    return true;
                                                }
                                                return d?.name
                                                    ?.toLowerCase()
                                                    .includes(
                                                        districtsSearchString.toLowerCase()
                                                    );
                                            })
                                            .map((district) => {
                                                return (
                                                    <ModalItemWrapper
                                                        key={district.id}
                                                    >
                                                        <Checkbox
                                                            isChecked={
                                                                !!districtsFilter?.find(
                                                                    (d) =>
                                                                        d.id ===
                                                                        district.id
                                                                )
                                                            }
                                                            onChange={() => {
                                                                if (
                                                                    !!districtsFilter?.find(
                                                                        (d) =>
                                                                            d.id ===
                                                                            district.id
                                                                    )
                                                                ) {
                                                                    setDistrictsFilter(
                                                                        (f) =>
                                                                            f.filter(
                                                                                (
                                                                                    oldFilter
                                                                                ) =>
                                                                                    oldFilter.id !==
                                                                                    district.id
                                                                            )
                                                                    );
                                                                } else {
                                                                    setDistrictsFilter(
                                                                        (f) =>
                                                                            f.concat(
                                                                                district
                                                                            )
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            {district.name}
                                                        </Checkbox>
                                                    </ModalItemWrapper>
                                                );
                                            })}
                                        <br />
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </ModalFiltersContainer>
                    </ModalBody>
                    <ModalFooter>
                        <SearchButton
                            colorScheme="blue"
                            mr={3}
                            onClick={() => setDistrictsModalOpened(false)}
                        >
                            Сохранить
                        </SearchButton>
                        <Button
                            onClick={() => {
                                setDistrictsModalOpened(false);
                                setDistrictsFilter([]);
                            }}
                            variant="ghost"
                        >
                            Сбросить фильтр
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/*  */}
            <Modal
                isOpen={apartmensModalOpened}
                onClose={() => setApartmensModalOpened(false)}
                size="3xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Жилой комплекс</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Искать"
                            value={apartmentSearchString}
                            onChange={(e) =>
                                setApartmentSearchString(e.target.value)
                            }
                        />
                        <br />
                        <br />
                        <ModalFiltersContainer>
                            {developer.map((dev) => {
                                return (
                                    <React.Fragment key={dev.id}>
                                        <ModalItemWrapperBig>
                                            <Checkbox
                                                onChange={() => {
                                                    setApartmentComplexFilter(
                                                        (chosenAparts) => {
                                                            return chosenAparts.filter(
                                                                (ap) =>
                                                                    ap.developer_id !=
                                                                    dev.id
                                                            );
                                                        }
                                                    );
                                                    if (
                                                        chosenDev.includes(
                                                            dev.id
                                                        )
                                                    ) {
                                                        setChosenDev((d) =>
                                                            d.filter(
                                                                (old) =>
                                                                    old !==
                                                                    dev.id
                                                            )
                                                        );
                                                    } else {
                                                        setChosenDev((d) =>
                                                            d.concat(dev.id)
                                                        );
                                                        setApartmentComplexFilter(
                                                            (chosenAparts) => {
                                                                const devAparts =
                                                                    apartmentComplex.filter(
                                                                        (a) =>
                                                                            a.developer_id ==
                                                                            dev.id
                                                                    );
                                                                return chosenAparts.concat(
                                                                    devAparts
                                                                );
                                                            }
                                                        );
                                                    }
                                                }}
                                                size={"lg"}
                                                isChecked={chosenDev.includes(
                                                    dev.id
                                                )}
                                            >
                                                {dev.name}
                                            </Checkbox>
                                        </ModalItemWrapperBig>
                                        {apartmentComplex
                                            .filter(
                                                (a) => a.developer_id == dev.id
                                            )
                                            .filter((a) => {
                                                if (!apartmentSearchString) {
                                                    return true;
                                                }
                                                return a?.name
                                                    ?.toLowerCase()
                                                    .includes(
                                                        apartmentSearchString.toLowerCase()
                                                    );
                                            })
                                            .map((ap) => {
                                                return (
                                                    <ModalItemWrapper
                                                        key={ap.id}
                                                    >
                                                        <Checkbox
                                                            isChecked={
                                                                !!apartmentComplexFilter.find(
                                                                    (a) =>
                                                                        a.id ==
                                                                        ap.id
                                                                )
                                                            }
                                                            onChange={() => {
                                                                if (
                                                                    !!apartmentComplexFilter?.find(
                                                                        (d) =>
                                                                            d.id ===
                                                                            ap.id
                                                                    )
                                                                ) {
                                                                    setApartmentComplexFilter(
                                                                        (f) =>
                                                                            f.filter(
                                                                                (
                                                                                    oldFilter
                                                                                ) =>
                                                                                    oldFilter.id !==
                                                                                    ap.id
                                                                            )
                                                                    );
                                                                } else {
                                                                    setApartmentComplexFilter(
                                                                        (f) =>
                                                                            f.concat(
                                                                                ap
                                                                            )
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            {ap.name}
                                                        </Checkbox>
                                                    </ModalItemWrapper>
                                                );
                                            })}
                                        <br />
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </ModalFiltersContainer>
                    </ModalBody>
                    <ModalFooter>
                        <SearchButton
                            colorScheme="blue"
                            mr={3}
                            onClick={() => setApartmensModalOpened(false)}
                        >
                            Сохранить
                        </SearchButton>
                        <Button
                            onClick={() => {
                                setApartmensModalOpened(false);
                                setApartmentComplexFilter([]);
                                setChosenDev([]);
                            }}
                            variant="ghost"
                        >
                            Сбросить фильтр
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Filters;

const FiltersContainer = styled(Flex)`
    padding: 20px;
    background: #fff;
    border-radius: 6px;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-wrap: wrap;
    }
`;

const RangeWrapper = styled.div`
    width: 100%;
    font-size: 13px;
    & span {
        color: ${Colors.MAIN_RED};
    }
`;

const SearchButton = styled.button`
    width: 100%;
    max-width: 250px;
    height: 40px;
    color: #fff;
    background: ${Colors.MAIN_RED};
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 250ms ease;
    border: 1px solid transparent;
    &:hover {
        color: ${Colors.MAIN_RED};
        background-color: #fff;
        border: 1px solid ${Colors.MAIN_RED};
    }
    @media screen and (max-width: 800px) {
        max-width: initial;
    }
`;

const CategoryFilter = styled(Flex)`
    cursor: pointer;
    padding: 10px;
    padding-top: 0px;
    border-bottom: ${(props) =>
        props.active
            ? `2px solid ${Colors.MAIN_RED}`
            : `2px solid transparent`};
    color: ${(props) =>
        props.active ? `${Colors.MAIN_RED}` : `${Colors.MAIN_BLACK}`};
    & svg {
        fill: ${(props) =>
            props.active ? `${Colors.MAIN_RED}` : `${Colors.MAIN_BLACK}`};
        fill-opacity: 0.5;
        display: block;
        margin-right: 10px;
    }
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`;

const ModalFiltersContainer = styled(Flex)`
    flex-wrap: wrap;
    @media screen and (max-width: 800px) {
    }
`;

const ModalItemWrapper = styled.div`
    width: 33.33333%;
    padding: 3px;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`;

const ModalItemWrapperBig = styled.div`
    width: 100%;
    padding: 3px;
    margin-bottom: 10px;
`;
