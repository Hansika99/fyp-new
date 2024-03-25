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
import { toast } from "react-toastify";

const FormLayout = () => {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  console.log("🚀 ~ FormLayout ~ isConnected:", isConnected);
  const [formData, setFormData] = useState({
    // Initialize form data state

    amount: "",
    reason: "",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/withdraw", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Handle form submission logic here
    console.log("Form submitted:", formData);
    toast("Withdraw Successful!");

    // Reload the page after submission
    window.location.reload();
  };

  const [donationAmount, setDonationAmount] = useState(0);

  const [withdrawAmount, setWithdrawAmount] = useState("");

  async function handleWithdraw() {
    const result = await writeContractAsync({
      abi,
      address: "0x4076d780739328b44Ba3C2BBDB66DC2d23388675",
      functionName: "WithdrawDonations",
      args: [(Number(withdrawAmount) * 10 ** 18).toString(), formData.reason],
    });
    console.log(result);
    handleSubmit();
  }

  return (
    <>
      <Breadcrumb pageName="Make a Withdrawal" />
      <div className="content-wrapper">
        <form className="max-w-xl mx-auto mt-8">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Make A Withdrawal</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                1. Amount
              </label>
              <input
                type="number"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    amount: e.target.value,
                  }));
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                2. Withdraw Reason :
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 ml-1 border rounded-md"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    reason: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-white rounded bg-primary "
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </form>
      </div>
    </>
  );
};

export default FormLayout;
