import React from "react";
import { User } from "../types";

interface Props {
  users: User[];
}

const Leaderboard: React.FC<Props> = ({ users }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
