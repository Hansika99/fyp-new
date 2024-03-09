import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import TableTwo from "../tables/TableTwo";

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Donation Allocation" />
      <TableTwo />
    </>
  );
};

export default FormLayout;
