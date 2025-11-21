import UseAuth from "../../hooks/AuthContext";
export default function Dashboard() {
const {user}= UseAuth()
  return (
    <div>
      <h1>{`Hello ${user.Username}`}</h1>
    </div>
  );
}
