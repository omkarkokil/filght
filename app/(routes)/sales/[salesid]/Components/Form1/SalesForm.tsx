"use client";

import InputField from "@/components/Custom/Input/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import * as z from "zod";
import DateSelect from "@/components/Custom/Input/DateSelect";
import PhoneNumberInput from "@/components/Custom/Input/PhoneNumberInput";
import SearchSelect from "@/components/Custom/Select/SearchSelect";
import { Antenna, CalendarIcon, CarTaxiFront, Siren } from "lucide-react";
import Indicator from "../Indicator";
import { format } from "date-fns";
import Form1SideDiv from "./Form1SideDiv";
const formSchema = z.object({
  assignedTo: z.string().min(1, {
    message: "Assigned to field must not be empty",
  }),
  guest: z.string().min(1, {
    message: "Guest field is mandatory.",
  }),

  service: z.string().min(1, {
    message: "Service field is mandatory.",
  }),
  category: z.string().min(1, {
    message: "Category field is mandatory.",
  }),
  adult: z.string().min(1, {
    message: "Adult field is mandatory.",
  }),
  adult12: z.string().min(1, {
    message: "Adult field is mandatory.",
  }),
  ch512: z.string().min(1, {
    message: "This field is mandatory.",
  }),
  ch35: z.string().min(1, {
    message: "This field is mandatory.",
  }),
  infant: z.string().min(1, {
    message: "This field is mandatory.",
  }),
  total: z.string().min(1, {
    message: "This field is mandatory.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
});

export type StateInputProps = {
  assignedTo: string;
  service: string;
  email: string;
  guest: string;
  contact: string;
  category: string;
  adult: string;
  adult12: string;
  ch512: string;
  ch35: string;
  infant: string;
  total: string;
};

const SalesForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const channelData: string[] = [
    "Custom",
    "Guest",
    "Brochure",
    "Website",
    "B2B",
  ];

  const VIPData: string[] = ["High", "Mid", "Low", "Reg"];

  /* ---------------------------- TimeArrival state --------------------------- */
  const [arrivalValue, setArrivalValue] = useState("");
  const [openArrivalTime, setOpenArrivalTime] = useState(false);
  /* ---------------------------- TimeArrival state --------------------------- */

  /* -------------------------  TimeDeparture state ------------------------- */
  const [departureValue, setDepartureValue] = useState("");
  const [openDepartureTime, setOpenDepartureTime] = useState(false);
  /* -------------------------  TimeDeparture state ------------------------- */

  /* -------------------------------- Vip State ------------------------------- */
  const [vipValue, setVipValue] = useState("");
  const [openVip, setOpenVip] = useState(false);
  /* -------------------------------- Vip State ------------------------------- */

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const [inputValues, setInputValues] = useState<StateInputProps>({
    assignedTo: "",
    service: "",
    email: "",
    guest: "",
    contact: "",
    category: "",
    adult: "",
    adult12: "",
    ch512: "",
    ch35: "",
    infant: "",
    total: "",
    // ... add other fields as needed
  });

  /**
   * UseFormHook
   * Form variable which conatins useForm Basic implementation with zode resolver for client side validations
   *  And onsubmit function which is used to send data
   */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: "",
      service: "",
      email: "",
      guest: "",
      category: "",
      adult: "",
      adult12: "",
      ch512: "",
      ch35: "",
      infant: "",
      total: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!inputValues.contact) return null;
    console.log(values);
    console.log(inputValues.contact);
  }

  /* ------------------------------- UseFormHook ------------------------------ */

  const [arrivedDate, setArrivedDate] = useState();

  const [departTureDate, setDepartTureDate] = useState();
  const [formFilledDate, setformFilledDate] = useState();

  const handleInputChange = (inputName: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
  };

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = 15 * (i % 4);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  });

  return (
    <>
      <section className="flex mt-8  gap-4 h-max">
        <div className="flex flex-col w-[45%] h-max rounded-md ">
          <Form {...form}>
            <form
              autoComplete="off"
              autoCorrect="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 "
            >
              <div className="flex gap-2 w-full items-center">
                <div className="w-[50%]">
                  <DateSelect
                    date={formFilledDate}
                    setDate={setformFilledDate}
                    label={"Form Filling Date"}
                  />
                </div>
                <div className="w-[50%]">
                  <InputField
                    form={form}
                    name="assignedTo"
                    label="Assigned To :"
                    setState={setInputValues}
                    onChange={handleInputChange}
                    placeholder="xyz"
                    desc=" This is your public display assignedTo."
                  />
                </div>
              </div>

              <div className="py-2 px-4 bg-white rounded-md shadow-md h-max space-y-6">
                <InputField
                  form={form}
                  name="guest"
                  label="Guest Name"
                  placeholder="Enter guest name"
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc=" This is your public display guest."
                />

                <PhoneNumberInput
                  form={form}
                  name="contact"
                  state={inputValues.contact}
                  label="Contact Number"
                  placeholder="Enter contact name"
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc=" This is your public display contact."
                />

                <InputField
                  form={form}
                  name="email"
                  label="Enter Email id"
                  type="email"
                  placeholder="Enter email"
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc=" This is your public display email."
                />

                <SearchSelect
                  label={"Select Channel"}
                  placeholder={"Channel..."}
                  data={channelData}
                  value={value}
                  icon={Antenna}
                  setValue={setValue}
                  open={open}
                  setOpen={setOpen}
                />

                <InputField
                  form={form}
                  name="service"
                  label="Enter Services"
                  setState={setInputValues}
                  onChange={handleInputChange}
                  placeholder="service..."
                  desc=" This is your public display service."
                />

                <InputField
                  form={form}
                  name="category"
                  label="Enter Category"
                  setState={setInputValues}
                  onChange={handleInputChange}
                  placeholder="category..."
                  desc="This is your public display category."
                />
                <SearchSelect
                  label={"Select VIP Courtesy"}
                  placeholder={"vip..."}
                  data={VIPData}
                  value={vipValue}
                  icon={Siren}
                  setValue={setVipValue}
                  open={openVip}
                  setOpen={setOpenVip}
                />

                <div className="flex gap-2 w-full items-center">
                  <div className="w-[50%]">
                    <DateSelect
                      date={arrivedDate}
                      setDate={setArrivedDate}
                      label={"Date of Arrival"}
                    />
                  </div>
                  <div className="w-[50%]">
                    <SearchSelect
                      label={"Time for arrival"}
                      placeholder={"select time... "}
                      data={times}
                      value={arrivalValue}
                      setValue={setArrivalValue}
                      icon={CalendarIcon}
                      open={openArrivalTime}
                      setOpen={setOpenArrivalTime}
                    />
                  </div>
                </div>

                <div className="flex gap-2 w-full items-center">
                  <div className="w-[50%]">
                    <DateSelect
                      date={departTureDate}
                      setDate={setDepartTureDate}
                      label={"Date of departure"}
                    />
                  </div>
                  <div className="w-[50%]">
                    <SearchSelect
                      label={"Time for departure"}
                      placeholder={"select time... "}
                      data={times}
                      value={departureValue}
                      setValue={setDepartureValue}
                      icon={CalendarIcon}
                      open={openDepartureTime}
                      setOpen={setOpenDepartureTime}
                    />
                  </div>
                </div>

                <InputField
                  form={form}
                  name="adult"
                  label="Enter Adult"
                  placeholder="adult..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display adult."
                />
                <InputField
                  form={form}
                  name="adult12"
                  label="Adult 12+"
                  placeholder="adult12..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display adult12."
                />
                <InputField
                  form={form}
                  name="ch512"
                  label="Ch 5 - 12"
                  placeholder="ch5-12..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display ch5-12."
                />
                <InputField
                  form={form}
                  name="ch35"
                  label="Ch 3 - 5"
                  placeholder="ch3-5..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display ch35."
                />
                <InputField
                  form={form}
                  name="infant"
                  label="Infant"
                  placeholder="infant..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display infant."
                />
                <InputField
                  form={form}
                  name="total"
                  label="Enter total"
                  placeholder="total..."
                  setState={setInputValues}
                  onChange={handleInputChange}
                  desc="This is your public display infant."
                />
                <Button
                  className=" text-white px-10"
                  disabled={
                    !formFilledDate ||
                    !inputValues.assignedTo ||
                    !inputValues.guest ||
                    // !inputValues.contact ||
                    !inputValues.email ||
                    !inputValues.service ||
                    !inputValues.category ||
                    !vipValue ||
                    !channelData ||
                    !arrivedDate ||
                    !arrivalValue ||
                    !departTureDate ||
                    !departureValue ||
                    !inputValues.adult ||
                    !inputValues.adult12 ||
                    !inputValues.infant ||
                    !inputValues.total ||
                    !inputValues.ch35 ||
                    !inputValues.ch512
                  }
                  type="submit"
                >
                  {isLoading ? (
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    "Next step"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <Form1SideDiv
          filledData={formFilledDate}
          arrivedDate={arrivedDate}
          arrivalValue={arrivalValue}
          departTureDate={departTureDate}
          departureValue={departureValue}
          vipValue={vipValue}
          channel={value}
          state={inputValues}
        />
        <Indicator />
      </section>
    </>
  );
};

export default SalesForm;