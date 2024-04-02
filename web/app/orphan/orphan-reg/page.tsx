"use client";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Package, orphanage } from "../../types/package";


import axios from "axios";

const FormElements = () => {
  const initialFormData = {
    personalInformation: {
      name: "",
      dateOfBirth: "",
      gender: "",
      placeOfBirth: "",
      nationality: "",
      religion: "",
      birthCity: "",
      address: "",
    },
    guardianInformation: {
      guardianName: "",
      relationship: "",
      contactNumber: "",
      guardianAddress: "",
    },
    howFound: "Select",
    dateFound: "",
    orphanage: "", // New state for orphanage dropdown
    healthInformation: {
      allergies: "",
      medications: "",
    },
    educationInformation: {
      schoolName: "",
      gradeClass: "",
      specialNeeds: "",
      hobbiesInterests: "",
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  const [orphanageList, setOrphanageList] = useState<orphanage[]>([]); // State to hold orphanage list

  useEffect(() => {
    // Fetch orphanage list from API
    axios
      .get("http://localhost:3000/orphanage")
      .then((response) => {
        setOrphanageList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orphanage list:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orphanage")
      .then((response) => {
        const orphanages = response.data.orphanageData; // Extract orphanageData array from response
        setOrphanageList(orphanages); // Set orphanageList state with the extracted orphanages
        console.error("orphanage list", orphanages);
      })
      .catch((error) => {
        console.error("Error fetching orphanage list:", error);
      });
  }, []);

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
      .post("http://localhost:3000/orphan", formData)
      .then(function (response) {
        console.log(response);
        toast("Orphanage Registration Successful!");
        setFormData(initialFormData);
        console.log(formData);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Handle form submission logic here
    console.log("Form submitted:", formData);

    // Reload the page after submission
    window.location.reload();
  };

  return (
    <>
      <Breadcrumb pageName="Orphan Registration" />
      <div className="mb-40 content-wrapper">
        <form className="max-w-xl mx-auto mt-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {" "}
              Orphan Information :
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Orphan Name :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter orphan name"
                value={formData.personalInformation.name}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      name: e.target.value,
                    },
                  }));
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Date of Birth (If Applicable) :
              </label>
              <input
                type="date"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.personalInformation.dateOfBirth}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      dateOfBirth: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                3. Gender :
              </label>
              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.personalInformation.gender || "select"}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      gender: e.target.value,
                    },
                  }));
                }}
                required
              >
                <option value="select">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                4. Place Of Birth (If Applicable) :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter birth place"
                value={formData.personalInformation.placeOfBirth}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      placeOfBirth: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. Nationality (If Applicable) :
              </label>

              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.personalInformation.nationality}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      nationality: e.target.value,
                    },
                  }));
                }}
              >
                <option value="select">select</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Burgher">Burgher</option>
                <option value="Muslim">Muslim</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                6. Religion (If Applicable) :
              </label>

              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.personalInformation.religion}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      religion: e.target.value,
                    },
                  }));
                }}
              >
                <option value="select">select</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                7. Birth City (If Applicable) :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter birth city"
                value={formData.personalInformation.birthCity}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      birthCity: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                8. Address (If Applicable) :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter address"
                value={formData.personalInformation.address}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInformation: {
                      ...prevData.personalInformation,
                      address: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Orphan Health Information (If Applicable) :
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Allergies :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Type here"
                value={formData.healthInformation.allergies}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    healthInformation: {
                      ...prevData.healthInformation,
                      allergies: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Current Medications :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Type here"
                value={formData.healthInformation.medications}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    healthInformation: {
                      ...prevData.healthInformation,
                      medications: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Orphan Education Information (If Applicable) :
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. School (If Applicable) :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="School name"
                value={formData.educationInformation.schoolName}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    educationInformation: {
                      ...prevData.educationInformation,
                      schoolName: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Grade/Class (If applicable) :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Grade"
                value={formData.educationInformation.gradeClass}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    educationInformation: {
                      ...prevData.educationInformation,
                      gradeClass: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                3. Special Needs/Requirements :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Type here"
                value={formData.educationInformation.specialNeeds}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    educationInformation: {
                      ...prevData.educationInformation,
                      specialNeeds: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                4. Preferred Hobbies/Interests :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Type here"
                value={formData.educationInformation.hobbiesInterests}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    educationInformation: {
                      ...prevData.educationInformation,
                      hobbiesInterests: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {" "}
              Gardian Information (If Applicable) :
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Name :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter gardian name"
                value={formData.guardianInformation.guardianName}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    guardianInformation: {
                      ...prevData.guardianInformation,
                      guardianName: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Relation to Orphan :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Relation"
                value={formData.guardianInformation.relationship}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    guardianInformation: {
                      ...prevData.guardianInformation,
                      relationship: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                3. Gardian Contact No :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Contact No"
                value={formData.guardianInformation.contactNumber}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    guardianInformation: {
                      ...prevData.guardianInformation,
                      contactNumber: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                4. Gardian Address :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Enter Gardian address"
                value={formData.guardianInformation.guardianAddress}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    guardianInformation: {
                      ...prevData.guardianInformation,
                      guardianAddress: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. How the Orphan was Found :
              </label>
              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.howFound}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    howFound: e.target.value,
                  }));
                }}
              >
                <option value="select">select</option>
                <option value="outreachProgram">Outreach Program</option>
                <option value="hospital">Hospital</option>
                <option value="police">Police</option>
                <option value="throughGuardian">
                  Through a guardian/ Relation
                </option>
                <option value="throughNonRelation">
                  Through a non-relation person
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                6. Date Found :
              </label>
              <input
                type="date"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.dateFound}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    dateFound: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                6. Orphanage:
              </label>
              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                value={formData.orphanage}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    orphanage: e.target.value,
                  }));
                  console.log("Orphanage ",formData.orphanage)
                }}
                required
              >
                {Array.isArray(orphanageList) &&
                  orphanageList.map((orphanageItem) => (
                    <option key={orphanageItem._id} value={orphanageItem.name}>
                      {orphanageItem.name}
                    </option>
                  ))}
              </select>
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
