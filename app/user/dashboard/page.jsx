"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";

export default function UserDashboard() {
  const { user, isAuthenticated, logout, socket, isClient } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Skip if not on client side yet
    console.log('socket', socket)
    if (!isClient) return;

    if (!isAuthenticated) {
      router.push("/user/login");
      return;
    }

    // Fetch user's tasks
    const fetchUserTasks = async () => {
      try {
        setLoading(true);
        // Get tasks assigned to current user
        const tasksData = await api.tasks.getAll({ assignedTo: user.id });
        setTasks(tasksData.tasks || []);
      } catch (err) {
        setError("Failed to load tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchUserTasks();
    }
  }, [isAuthenticated, user, router, isClient]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user?.name || "User"}
            </span>
            <div
              className={`w-3 h-3 rounded-full ${
                socket ? "bg-green-500" : "bg-gray-400"
              }`}
              title={socket ? "Connected" : "Disconnected"}
            ></div>
            <button
              onClick={() => logout()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Tasks section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tasks.length} Total
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No tasks assigned to you yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {task.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {task.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={async () => {
                            try {
                              await api.tasks.update(task.id, {
                                ...task,
                                status:
                                  task.status === "completed"
                                    ? "pending"
                                    : "completed",
                              });

                              // Refresh tasks after update
                              const updatedTasks = await api.tasks.getAll({
                                assignedTo: user.id,
                              });
                              setTasks(updatedTasks.tasks || []);
                            } catch (err) {
                              setError("Failed to update task status");
                            }
                          }}
                          className={`px-3 py-1 rounded text-white ${
                            task.status === "completed"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {task.status === "completed"
                            ? "Mark Pending"
                            : "Mark Complete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
