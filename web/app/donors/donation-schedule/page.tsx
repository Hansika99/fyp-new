import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "../tables/TableThree";
import { Metadata } from "next";
import Calendar from "../calanedar/index";

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Donation Shedule" />

      <Calendar />
    </>
  );
};

export default FormLayout;
