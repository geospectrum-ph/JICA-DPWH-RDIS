import "./index.css";

export default function Settings () {
  return (
    <div id = "settings-container">
      <div>
        <span>{ "Settings" }</span>
      </div>
      <div>
        <button className = "admin-button">{ "Create User" }</button>
        <button className = "admin-button">{ "USER MANAGEMENT" }</button>
        <button className = "admin-button">{ "DATA AND STORAGE MANAGEMENT" }</button>
      </div>
    </div>
  );
}
