import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

export function RoomCode({ code }) {
  function copyRoomToClipboard() {
    navigator.clipboard.writeText(code);
  }
  return (
    <div className="room-code" onClick={copyRoomToClipboard}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Sala #{code}</span>
    </div>
  );
}
