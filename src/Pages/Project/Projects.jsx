import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver"; // npm install file-saver
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable"; 
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [viewProject, setViewProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/projects/${deleteProject._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
    toast.success("Project deleted!");
  } catch (error) {
    console.error("Error deleting project:", error);
    toast.error("Failed to delete project.");
  } finally {
    setDeleteProject(null); // close modal
  }
};
  const [newProjectData, setNewProjectData] = useState({
  name: "",
  client: "",
  startDate: "",
  deadline: "",
  status: "Pending",
  description: "",
  priority: "Low",
  teamMembers: [],
});
 const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  useEffect(() => {
    fetchProjects();
  }, []);
const fetchProjects = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProjects(res.data.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
 const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);
  // Pagination logic
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this project?")) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
      toast.success("Project deleted!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  }
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/projects/${editingProject._id}`,
      editingProject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchProjects();
    setEditingProject(null);
    toast.success("Project updated!");
  } catch (error) {
    console.error("Error editing project:", error);
    toast.error("Failed to update project.");
  }
};
  const handleNewProjectSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // 👈 get saved token
    await axios.post(
      "http://localhost:5000/api/projects",
      newProjectData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token
        },
      }
    );
    fetchProjects();
    setShowNewProject(false);
    setNewProjectData({
      name: "",
      client: "",
      startDate: "",
      deadline: "",
      status: "Pending",
      description: "",
      priority: "Low",
      teamMembers: [],
    });
    toast.success("Project created successfully!");
  } catch (error) {
    console.error("Error creating project:", error);
    toast.error("Failed to create project.");
  }
};
// Download as CSV / Excel
 // ✅ Export to Excel
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(projects);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "Projects.xlsx");
};

// ✅ Export to PDF
const exportToPDF = () => {
  const doc = new jsPDF();

  // Table headers
  const tableColumn = ["Name", "Client", "Team", "Start Date", "End Date", "Priority"];

  // Table rows
  const tableRows = projects.map((p) => [
    p.name,
    p.client,
    (p.teamMembers || []).join(", "),
    p.startDate,
    p.deadline,   // ✅ use deadline instead of endDate since that's in your schema
    p.priority,
  ]);

  // ✅ Use autoTable correctly
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("projects.pdf");
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <div className="flex items-center gap-4">
          <select
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <button
            onClick={() => setShowNewProject(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlusCircle /> New Project
          </button>
        </div>
      </div>
       {/* ✅ Download buttons here */}
    <div className="flex gap-3 mb-4">
      <button
        onClick={exportToExcel}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
      >
        Download Excel
      </button>
      <button
        onClick={exportToPDF}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
      >
        Download PDF
      </button>
    </div>

      {/* Projects Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">StartDate</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Assigned Team</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {project.name}
                </td>
                <td className="px-6 py-4">{project.client}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      project.status === "Completed"
                        ? "bg-green-500"
                        : project.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4"> {new Date(project.startDate).toLocaleDateString("en-GB")}</td>
                <td className="px-6 py-4">{new Date(project.deadline).toLocaleDateString("en-GB")}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      project.priority === "High"
                        ? "bg-red-500"
                        : project.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {project.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{project.teamMembers.join(", ")}</td>
                <td className="px-6 py-4 flex justify-center space-x-4 text-blue-600">
                  <button onClick={() => setViewProject(project)} title="View">
                    <FaEye />
                  </button>
                  <button onClick={() => setEditingProject(project)} title="Edit">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteProject(project)}
                    title="Delete"
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                  {deleteProject && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                          <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
                          <p className="text-gray-700 mb-6">
                            Are you sure you want to delete project{" "}
                            <span className="font-semibold">{deleteProject.name}</span>?
                            This action cannot be undone.
                          </p>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setDeleteProject(null)}
                              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={confirmDelete}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Pagination */}
      <div className="flex items-right mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded hover:bg-blue-500 ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
      {/* View Modal */}
        {viewProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Project Name:</strong> {viewProject.name}</p>
                <p><strong>Client:</strong> {viewProject.client}</p>
                <p><strong>Start Date:</strong> {viewProject.startDate ? new Date(viewProject.startDate).toLocaleDateString() : "—"}</p>
                <p><strong>Deadline:</strong> {viewProject.deadline ? new Date(viewProject.deadline).toLocaleDateString() : "—"}</p>
                <p><strong>Status:</strong> {viewProject.status}</p>
                <p><strong>Description:</strong> {viewProject.description}</p>
                <p><strong>Priority:</strong> {viewProject.priority}</p>
                <p><strong>Assigned Team:</strong> {viewProject.teamMembers?.join(", ") || "—"}</p>
              </div>
              <button 
                onClick={() => setViewProject(null)} 
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

      {/* Edit Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Project</h1>

              <form onSubmit={handleEditSubmit} className="space-y-5">
                {/* Project Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Project Name</label>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, name: e.target.value })
                    }
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Client, Priority, Assigned Team in one row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Client Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Client Name</label>
                        <input
                          type="text"
                          name="client"
                          value={editingProject.client || ""}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, client: e.target.value })
                          }
                          required
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Priority</label>
                      <select
                        name="priority"
                        value={newProjectData.priority || "Low"}
                        onChange={(e) =>
                          setNewProjectData({ ...newProjectData, priority: e.target.value })
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>

                    {/* Assigned Team */}
                    <div>
  <label className="block text-gray-700 font-medium mb-1">Assigned Team</label>
  <input
    type="text"
    name="teamMembers"
    value={editingProject.teamMembers?.join(", ") || ""}
    onChange={(e) =>
      setEditingProject({
        ...editingProject,
        teamMembers: e.target.value.split(",").map((m) => m.trim()),
      })
    }
    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="comma separated"
  />
</div>
                  </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Start Date</label>
                    <input
                      type="date"
                      value={editingProject.startDate?.substring(0, 10)}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, startDate: e.target.value })
                      }
                      className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Deadline</label>
                    <input
                      type="date"
                      value={editingProject.deadline?.substring(0, 10)}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, deadline: e.target.value })
                      }
                      className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Status</label>
                    <select
                      value={editingProject.status}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, status: e.target.value })
                      }
                      className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>On Hold</option>
                    </select>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    rows="4"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      {/* ✅ New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h1>

            <form onSubmit={handleNewProjectSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProjectData.name}
                  onChange={(e) =>
                    setNewProjectData({ ...newProjectData, name: e.target.value })
                  }
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Client, Priority, Assigned Team in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Client Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Client Name</label>
            <input
              type="text"
              name="client"
              value={newProjectData.client}
              onChange={(e) =>
                setNewProjectData({ ...newProjectData, client: e.target.value })
              }
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={newProjectData.priority || "Low"}
              onChange={(e) =>
                setNewProjectData({ ...newProjectData, priority: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Assigned Team */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Assigned Team</label>
            <input
              type="text"
              name="teamMembers"
              value={newProjectData.teamMembers || ""}
              onChange={(e) =>
                setNewProjectData({
                  ...newProjectData,
                  teamMembers: e.target.value.split(",").map((m) => m.trim()),
                })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="comma separated"
            />
          </div>
        </div>
              {/* Start Date & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newProjectData.startDate}
                  onChange={(e) =>
                        setNewProjectData({ ...newProjectData, startDate: e.target.value })
                      }
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={newProjectData.deadline}
                    onChange={(e) =>
                        setNewProjectData({ ...newProjectData, deadline: e.target.value })
                      }
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                          {/* Status */}
              <div>
                <label className="block text-gray-700 font-medium">Status</label>
                <select
                  name="status"
                  value={newProjectData.status}
                  onChange={(e) =>
                        setNewProjectData({ ...newProjectData, status: e.target.value })
                      }
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProjectData.description}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
