import { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layouts/Footer/Footer";
import Header from "./Layouts/Header/Header";

const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className="container mx-auto">
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </div>
        );
      }}
    />
  );
};

export default HomeTemplate;
