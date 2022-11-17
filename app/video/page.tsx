import Gharar from "../../components/gharar/gharar.component";

export default function VideoPage({
  searchParams,
}: {
  searchParams: { roomAddress: string };
}) {
  console.log("ADDRESS", searchParams.roomAddress);
  return searchParams.roomAddress ? (
    <Gharar redirectTo={"/"} roomAddress={searchParams.roomAddress}></Gharar>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1>No roomAddress detected in Qeury Params</h1>
    </div>
  );
}
