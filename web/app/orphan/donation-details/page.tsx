import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "../../donors/tables/TableTwo";

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Donation Details" />

      {/* <TableThree /> */}
      <TableTwo />
    </>
  );
};

export default FormLayout;