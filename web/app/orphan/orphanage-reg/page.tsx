"use client";

import { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import { toast } from "react-toastify";

const FormElements = () => {
  const InitialDate = {
    name: "",
    address: "",
    contact_number: "",
    owners_name: "",
    owners_contact_number: "",
    orphan_count: "",
    staff_count: "",
  };
  const [formData, setFormData] = useState(InitialDate);

  type FormData = {
    [key: string]: {
      [key: string]: any;
    };
  };

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/orphanage", formData)
      .then(function (response) {
        console.log(response);
        setFormData(InitialDate);
        toast("Orphan Registration Successful!");
      })
      .catch(function (error) {
        console.log(error);
      });

    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };
  return (
    <>
      <Breadcrumb pageName="Orphanage Registration" />
      <div className="mb-40 content-wrapper">
        <form className="max-w-xl mx-auto mt-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {" "}
              Orphanage Information :
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Orphanage Name :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter orphanage name"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }));
                }}
				required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Orphanage Address:
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter orphanage address"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    address: e.target.value,
                  }));
                }}
				required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                3. Orphanage Contact Number :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter orphanage contact"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    contact_number: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                4. Owner's Name :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter owner name"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    owners_name: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. Owner's Contact Number :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter owner contact"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    owners_contact_number: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                6. Orphan Count :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter orphan count"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    orphan_count: e.target.value,
                  }));
                }}
				required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                7. Staff Count :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter staff count"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    staff_count: e.target.value,
                  }));
                }}
				required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-primary "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormElements;
