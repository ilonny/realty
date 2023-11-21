import { useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";

export const AboutScreen = () => {
  useEffect(() => {
    fetch(`https://jbnestate.tilda.ws/about`)
      .then((data) => data.text())
      .then((text) => {
        console.log("text: ", text);
      });
  }, []);

  return (
    <MainLayout>
      <p>AboutScreen</p>
    </MainLayout>
  );
};
