"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import {
  WagmiProvider,
  useAccount,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { writeContract } from "@wagmi/core";
import abi from "../../abis/contractabit.json";
import token from "../../abis/tokenabi.json";

import axios from "axios";
import { log } from "console";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Package, orphanage } from "../../types/package";

const FormLayout = () => {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  console.log("🚀 ~ FormLayout ~ isConnected:", isConnected);

  const [formData, setFormData] = useState({
    // Initialize form data state

    date: "",
    type: "select",
    amount: "",
    meal_time: "",
    visiting_time: "",
    donor_name: "",
    donor_contact: "",
    orphanage: "", // New state for orphanage dropdown
  });

  const [donationAmount, setDonationAmount] = useState(0);

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

  const handleSubmit = () => {
    console.log("Form data:", formData);

    // if (!formData.date || !formData.type) {
    //   toast.error(
    //     "Please fill in the required fields: Donation Date and Donation Type."
    //   );
    //   return; // Do not proceed if required fields are not filled
    // }

    if (!formData.date) {
      toast.error("Donation date is required. ");
      return; // Do not proceed if any required fields are not filled
    }
    if (!formData.type) {
      toast.error("Donation type is required. ");
      return; // Do not proceed if any required fields are not filled
    }
    if (!formData.donor_name.trim()) {
      toast.error("Donor name is required. ");
      return; // Do not proceed if any required fields are not filled
    }
    if (!formData.donor_contact.trim()) {
      toast.error("Donor contact is required. ");
      return; // Do not proceed if any required fields are not filled
    }

    axios
      .post("http://localhost:3000/donation", formData)
      .then(function (response) {
        console.log(response);
        toast("Donation Successful!");

        console.log("Form submitted:", formData);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Clear the form data to its initial state
    setFormData({
      date: "",
      type: "select",
      amount: "",
      meal_time: "",
      visiting_time: "",
      donor_name: "",
      donor_contact: "",
      orphanage: "", // New state for orphanage dropdown
    });

    console.log("Form submitted:", formData);

    // Reload the page after submission
    window.location.reload();
  };

  const [allowance, setAllowance] = useState(0);

  const wagmigotchiContract = {
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: token,
  } as const;

  const result = useReadContracts({
    contracts: [
      {
        address: "0x86dfA48971b165D39b6910174cD4D0104Df0AC36",
        abi: token,
        functionName: "allowance",
        args: [address, "0x4076d780739328b44Ba3C2BBDB66DC2d23388675"],
      },
    ],
  });

  const validateAndShowError = () => {
    if (formData.type === "monetaryDonation" && formData.amount === "") {
      toast.error("Please enter a donation amount for monetary donations.");
      return true; // Validation failed
    }
    return false; // Validation passed
  };

  useEffect(() => {
    setAllowance(Number(result.data?.[0].result));
  }, [result]);

  async function handleApprove() {
    if (validateAndShowError()) {
      return; // Validation failed, do not proceed
    }

    const result = await writeContractAsync({
      abi,
      address: "0x86dfA48971b165D39b6910174cD4D0104Df0AC36",
      functionName: "approve",
      args: [
        "0x4076d780739328b44Ba3C2BBDB66DC2d23388675",
        "100000000000000000000000000000000000",
      ],
    });
    console.log(result);
  }

  async function handleDonation() {
    if (validateAndShowError()) {
      return; // Validation failed, do not proceed
    }

    if (formData.type === "monetaryDonation") {
      const result = await writeContractAsync({
        abi,
        address: "0x4076d780739328b44Ba3C2BBDB66DC2d23388675",
        functionName: "Donate",
        args: ["1", (Number(formData.amount) * 10 ** 18).toString()],
      });
      console.log(result);
    }

    // Clear the form data to its initial state
    // setFormData({
    //   date: "",
    //   type: "select",
    //   amount: "",
    //   meal_time: "",
    //   visiting_time: "",
    //   donor_name: "",
    //   donor_contact: "",
    // });

    handleSubmit();
  }

  return (
    <>
      <Breadcrumb pageName="Make Donations" />
      <div className="content-wrapper">
        <form className="max-w-xl mx-auto mt-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Make A Donation</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Donation Date :
              </label>
              <input
                type="date"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    date: e.target.value,
                  }));
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Donation Type :
              </label>
              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    type: e.target.value,
                  }));
                }}
                required
              >
                <option value="select">select </option>
                <option value="materialDonation">Material Donations </option>
                <option value="monetaryDonation">Monetary donations</option>
                <option value="mealDonation">The Meal donations</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                3. Donation Amount :
              </label>
              <input
                type="number"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Mterials or Amount"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    amount: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                4. If you are planning to make a meal donation, please select a
                time :
              </label>
              <select
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    meal_time: e.target.value,
                  }));
                }}
              >
                <option value="select">select</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="teatime">Teatime</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. For the material donation, please mention the time that you
                are planning to visit the orphanage :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Mention Time"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    visiting_time: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. Donor Name :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Your Name"
                required
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    donor_name: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                5. Donor Contact No:
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                placeholder="Your Contact Number"
                required
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    donor_contact: e.target.value,
                  }));
                }}
              />
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

            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                6. For the monetary donation, please click here to proceed :
              </label>
              <span className="ml-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded text-red"
                >
                  Integration with the blockchain
                </button>
              </span>
            </div> */}
          </div>
          {formData.type === "monetaryDonation" ? (
            <div className="mt-8">
              <label className="block mb-5 text-sm font-medium text-gray-700">
                For the monetary donation, please click here to proceed :
              </label>
              {isConnected ? (
                allowance === 0 ? (
                  <button
                    type="button"
                    className="px-4 py-2 text-white rounded bg-primary "
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-4 py-2 text-white rounded bg-primary "
                    onClick={handleDonation}
                  >
                    Submit
                  </button>
                )
              ) : (
                <w3m-button />
              )}
            </div>
          ) : (
            <button
              type="button"
              className="px-4 py-2 text-white rounded bg-primary "
              onClick={handleDonation}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default FormLayout;
