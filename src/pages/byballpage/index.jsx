import React, { useEffect, useState } from "react";
const BASE_URL = "https://sportsprojectbackend.onrender.com"
import { useParams } from "react-router-dom";
import io from "socket.io-client";

function ByBallPage() {
  const { id: matchId } = useParams();
  const token = localStorage.getItem("token");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [socket, setSocket] = useState(null);

  const fetchMatchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/byballs/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedMatch(data?.data);
      } else {
        const errorData = await response.json();
        alert(`Failed to fetch match data: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching the matches:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchMatchData();

    const newSocket = io(BASE_URL, {
      transports: ["websocket"],
      auth: { token }, // Include token for authentication
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    newSocket.on("targetUpdated", (data) => {
      console.log("Received targetUpdated event:", data);
      if (data.matchId === matchId) {
        setSelectedMatch((prev) => ({
          ...prev,
          totalTarget: data.totalTarget,
        }));
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [matchId, token]);

  const updateTotalTarget = () => {
    const newTarget = prompt("Enter new target:");
    if (newTarget) {
      const parsedTarget = parseInt(newTarget, 10);
      if (isNaN(parsedTarget)) {
        alert("Please enter a valid number.");
        return;
      }
      setSelectedMatch((prev) => ({
        ...prev,
        totalTarget: parsedTarget,
      }));
      socket.emit("updateTarget", {
        matchId,
        newTarget: parsedTarget,
      });
    }
  };

  if (!selectedMatch) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div className="relative flex flex-col gap-4">
      <div className="rounded-3xl rounded-t-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-3xl w-1/3 overflow-x-auto shadow-md sm:rounded-lg">
        <h3 className="text-base/7 font-semibold text-indigo-600">
          Target Runs
        </h3>
        <p className="mt-4 flex items-baseline gap-x-2">
          <span className="text-5xl font-semibold tracking-tight text-gray-900">
            {selectedMatch.totalTarget}
          </span>
        </p>
        <button
          onClick={updateTotalTarget}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Update Target
        </button>
      </div>

        <div className="flex ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {selectedMatch?.playersTeam1?.teamName}
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedMatch?.playersTeam1?.players?.map((item, index) => {
                return (
                  <tr
                    key={`AllMatches-${index}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {selectedMatch?.playersTeam2?.teamName}
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedMatch?.playersTeam2?.players?.map((item, index) => {
                return (
                  <tr
                    key={`AllMatches-${index}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-4">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
            Innings table
          </h1>

          <div className="flex flex-col gap-4">
            {selectedMatch?.innings?.map((inning, index) => {
              return (
                <table
                  key={`inning-${index}`}
                  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                      <th
                        scope="col"
                        colSpan={`7`}
                        className="px-6 py-3 text-center"
                      >
                        {inning.team}
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Overs
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Veliveries
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Batter
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Bowler
                      </th>
                      <th scope="col" className="px-6 py-3">
                        non_striker
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Runs
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Wicket
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inning?.overs?.map((overItem, overIndex) => (
                      <React.Fragment key={`over-${overIndex}`}>
                        {overItem?.deliveries?.map(
                          (delivery, deliveryIndex) => (
                            <tr
                              key={`delivery-${deliveryIndex}`}
                              className="border-b dark:border-gray-700"
                            >
                              {deliveryIndex === 0 && (
                                <td
                                  rowSpan={overItem.deliveries.length}
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {overItem.over}
                                </td>
                              )}
                              <td className="px-6 py-4">{deliveryIndex + 1}</td>
                              <td className="px-6 py-4">{delivery.batter}</td>
                              <td className="px-6 py-4">{delivery.bowler}</td>
                              <td className="px-6 py-4">
                                {delivery.non_striker}
                              </td>
                              <td className="px-6 py-4">
                                {delivery.runsPerOver}
                              </td>
                              <td className="px-6 py-4">
                                {delivery.wickets.length > 0
                                  ? `${delivery.wickets[0].kind} (${delivery.wickets[0].player_out})`
                                  : "None"}
                              </td>
                            </tr>
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default ByBallPage;
