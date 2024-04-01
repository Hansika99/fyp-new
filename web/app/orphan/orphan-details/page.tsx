import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableFour from "../../donors/tables/TableFour";

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Orphanages Contact Info" />

      {/* <TableThree /> */}
      <TableFour />
    </>
  );
};

export default FormLayout;