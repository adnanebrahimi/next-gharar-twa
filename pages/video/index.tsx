import {useSearchParams} from "next/navigation";
import Gharar from "../../components/gharar/gharar.component";

export default function Video() {
  const searchParams = useSearchParams();
  const roomAddress = searchParams.get('roomAddress');
  return roomAddress ? (
    <Gharar redirectTo={"/"} roomAddress={roomAddress}></Gharar>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1>No roomAddress detected in Qeury Params</h1>
    </div>
  );
}
