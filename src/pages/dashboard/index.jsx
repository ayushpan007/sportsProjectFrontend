import { useEffect, useState } from "react";
const BASE_URL = "https://sportsprojectbackend.onrender.com"
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const token = localStorage.getItem('token');
    const [allMatches, setAllMatches] = useState([]);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/matches`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAllMatches(data?.data);
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error fetching the matches:", error);
            alert("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Match Name</th>
                                <th scope="col" className="px-6 py-3">City</th>
                                <th scope="col" className="px-6 py-3">Venue</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Team 1</th>
                                <th scope="col" className="px-6 py-3">Team 2</th>
                                <th scope="col" className="px-6 py-3">Overs</th>
                                <th scope="col" className="px-6 py-3">Outcome</th>
                                <th scope="col" className="px-6 py-3">Player Of the Match</th>
                                <th scope="col" className="px-6 py-3">See Ball by Ball Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMatches?.map((item, index) => (
                                <tr
                                    key={`AllMatches-${index}`}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item?.matchName}
                                    </th>
                                    <td className="px-6 py-4">{item?.city}</td>
                                    <td className="px-6 py-4">{item?.venue}</td>
                                    <td className="px-6 py-4">{item?.date}</td>
                                    <td className="px-6 py-4">{item?.team1}</td>
                                    <td className="px-6 py-4">{item?.team2}</td>
                                    <td className="px-6 py-4">{item?.overs}</td>
                                    <td className="px-6 py-4">{item?.outcome}</td>
                                    <td className="px-6 py-4">{item?.playerOfTheMatch}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            onClick={() => navigate(`/dashboard/${item._id}`)}
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Click Here To Watch Full Ball By Ball Summary
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;