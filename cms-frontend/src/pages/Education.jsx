import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function Education() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    major: "",
    year: "",
    gpa: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch data dari backend
  const fetchEducation = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/education", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // Handle Save (Add/Edit)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/education/${editId}` : "/api/education";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setModalOpen(false);
      setForm({ institution: "", degree: "", major: "", year: "", gpa: "" });
      setEditId(null);
      fetchEducation();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus data ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEducation();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Education</h2>
        <button
          onClick={() => {
            setEditId(null);
            setForm({ institution: "", degree: "", major: "", year: "", gpa: "" });
            setModalOpen(true);
          }}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2">Institution</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Major</th>
              <th className="p-2">Year</th>
              <th className="p-2">GPA</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((edu) => (
              <tr key={edu._id} className="border-b dark:border-gray-700">
                <td className="p-2">{edu.institution}</td>
                <td className="p-2">{edu.degree}</td>
                <td className="p-2">{edu.major}</td>
                <td className="p-2">{edu.year}</td>
                <td className="p-2">{edu.gpa}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditId(edu._id);
                      setForm({
                        institution: edu.institution,
                        degree: edu.degree,
                        major: edu.major,
                        year: edu.year,
                        gpa: edu.gpa,
                      });
                      setModalOpen(true);
                    }}
                    className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {editId ? "Edit Education" : "Add Education"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              {["institution", "degree", "major", "year", "gpa"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800"
                />
              ))}
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
