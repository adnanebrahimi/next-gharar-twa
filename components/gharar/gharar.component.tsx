"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRouter } from "next/navigation";

export default function Gharar({
  redirectTo,
  roomAddress,
}: {
  redirectTo: string;
  roomAddress: string;
}) {
  const router = useRouter();
  return (
    <JitsiMeeting
      roomName={roomAddress}
      configOverwrite={{ prejoinPageEnabled: false }}
      getIFrameRef={(node) => (node.style.height = "100vh")}
      domain={"room.gharar.ir"}
      onReadyToClose={() => router.push(redirectTo)}
      spinner = {Spinner}
    />
  );
}

function Spinner() {
  return <h1>Loading...</h1>
}