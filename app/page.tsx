"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    // Get data from the form.
    const token = event.target.token.value;
    const data = {
      name: event.target.roomName.value,
      is_private: false,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "https://gharar.ir/api/v1/service/rooms/";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (response.status === 400) {
      alert(result.name[0]);
      return;
    }
    router.push(`/video?roomAddress=${result.address}`);
  };

  const enterRoom = (event: any) => {
    event.preventDefault();
    router.push(`/video?roomAddress=${event.target.roomAddress.value}`);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
      <form
        className="mt-2 md:mt-40 h-96 w-96 rounded-md bg-gray-600 text-gray-100 flex flex-col gap-3 items-center justify-center"
        onSubmit={(event) => onFormSubmit(event)}
      >
        <label htmlFor="token">Access Token</label>
        <input type="text" name="token" id="token" required />
        <label htmlFor="roomName">Room Name</label>
        <input type="text" name="roomName" id="roomName" required />
        <button
          className="bg-black hover:bg-orange-500 rounded-md p-2"
          type="submit"
        >
          Create Room
        </button>
      </form>
      <form
        className="mt-2 md:mt-40 h-96 w-96 rounded-md bg-gray-600 text-gray-100 flex flex-col gap-3 items-center justify-center"
        onSubmit={(event) => enterRoom(event)}
      >
        <label htmlFor="roomAddress">Room Address</label>
        <input type="text" name="token" id="roomAddress" required />
        <button
          className="bg-black hover:bg-orange-500 rounded-md p-2"
          type="submit"
        >
          Enter Room
        </button>
      </form>
    </div>
  );
}
