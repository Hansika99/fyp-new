import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import TableThree from "../tables/TableThree";

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Donation Allocation" />
      <TableThree />
    </>
  );
};

export default FormLayout;
