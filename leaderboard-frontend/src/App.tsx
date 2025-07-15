import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import AddUserForm from './components/AddUserForm';
import LeaderBoard from './components/LeaaderBoard';
import { History, User } from './types';





function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<History[]>([]);

  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [claimedPoints, setClaimedPoints] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      if (res.data.success) {
        setUsers(res.data.users);
        if (!selectedUserId && res.data.users.length > 0) {
          setSelectedUserId(res.data.users[0]._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      if (res.data.success) {
        setLeaderboard(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUserId) return;

    try {
      const res = await axios.post("http://localhost:5000/api/claim", {
        userId: selectedUserId,
      });

      if (res.data.success) {
        setClaimedPoints(res.data.claimedpoints);
        setLeaderboard(res.data.leaderboard);
        await fetchUsers();
        await fetchHistory();
        setTimeout(() => {
          setClaimedPoints(null);
        }, 3000);
      }
    } catch (error) {
      console.log("Error claiming points", error);
    }
  };
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      console.log(res.data)
      if (res.data.success) {
        setHistory(res.data.history);

      }
    } catch (error: any) {
      console.log(error.message)
    }
  };




  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-100 to-pink-50 text-gray-800 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-2"> Leaderboard System</h1>
          <p className="text-gray-500">Track and rank user point claims in real-time!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <AddUserForm onUserAdded={fetchUsers} />

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selectedUserId ?? ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleClaimPoints}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
            >
              Claim Points
            </button>
          </div>

          {claimedPoints !== null && (
            <div className="text-center mt-2 text-green-700 font-semibold">
              Claimed <strong>{claimedPoints}</strong> points!
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-3"> Current Rankings</h2>
          <LeaderBoard users={leaderboard} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">🕒 Claim History</h2>
            <div className="bg-gray-100 p-4 rounded shadow-md max-h-60 overflow-y-scroll">
              {history.length === 0 ? (
                <p className="text-gray-500">No claims yet.</p>
              ) : (
                <ul className="space-y-2">
                  {history.map(entry => (
                    <li key={entry._id} className="border-b pb-1 text-sm">
                      <span className="font-medium">{entry.userName}</span> claimed <span className="text-green-600 font-semibold">{entry.claimedPoints} pts</span> on{" "}
                      <span className="text-gray-600">
                        {new Date(entry.claimAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
