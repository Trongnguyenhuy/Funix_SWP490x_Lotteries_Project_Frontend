import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../Redux/Actions/CarouselAction";
import HomeCarouselSlide from "./SlickerCarousel";

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getCarouselAction();
    dispatch(action);
    
    const timer = setInterval(() => {
      dispatch(action);
    }, 3600000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return <HomeCarouselSlide arrImg={arrImg} />;
}
