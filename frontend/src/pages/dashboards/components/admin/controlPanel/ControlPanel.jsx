import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaThLarge,
  FaUserPlus,
  FaUsers,
  FaCalendarAlt,
  FaAward,
  FaDollarSign,
  FaCodeBranch,
  FaBookOpen,
  FaSlidersH,
  FaMapMarkerAlt,
  FaSave,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";

export default function ControlPanel() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const branchesList = [
    { id: "all", name: "Global Hierarchy (All Branches)" },
    { id: "br-north", name: "North Campus - Regional Main Hub" },
    { id: "br-east", name: "East Side Corporate Node" },
    { id: "br-west", name: "West Tech Placement Ground" },
  ];

  // ─── TARGET PORTAL FEATURES STATE ──────────────────────────
  const [franchiseFeatures, setFranchiseFeatures] = useState({
    "/franchise/dashboard": {
      label: "Main Dashboard",
      enabled: true,
      icon: FaThLarge,
      desc: "Primary administrative overview metrics, system graphs, and priority alerts.",
    },
    "/franchise/admissions": {
      label: "Admissions Engine",
      enabled: true,
      icon: FaUserPlus,
      desc: "Onboard candidates, manage registration queues, and review application forms.",
    },
    "/franchise/students": {
      label: "Student Directory",
      enabled: true,
      icon: FaUsers,
      desc: "Deep profile history tracking, attendance matrix rosters, and student lookups.",
    },
    "/franchise/batches": {
      label: "Batches & Timelines",
      enabled: true,
      icon: FaCalendarAlt,
      desc: "Design master classroom routines, allocate shifts, and map batch cohorts.",
    },
    "/franchise/staff": {
      label: "Staff & Operations",
      enabled: true,
      icon: FaAward,
      desc: "Regulate operational worker logs, assignment permissions, and trainer ratings.",
    },
    "/franchise/billing": {
      label: "Financial Ledgers",
      enabled: true,
      icon: FaDollarSign,
      desc: "Real-time fee receipts processing, transaction books, and tax invoices.",
    },
    "/franchise/branches": {
      label: "Sub-Branch Controller",
      enabled: true,
      icon: FaCodeBranch,
      desc: "Oversee affiliate tracking nodes linked directly to this micro-license.",
    },
    "/franchise/courses": {
      label: "Curriculum Allocator",
      enabled: true,
      icon: FaBookOpen,
      desc: "Activate or restrict master syllabus courses and update module prices.",
    },
  });

  const toggleFeature = (targetPath) => {
    setFranchiseFeatures((prev) => ({
      ...prev,
      [targetPath]: { ...prev[targetPath], enabled: !prev[targetPath].enabled },
    }));
  };

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    const branchName = branchesList.find((b) => b.id === branchId)?.name;
    toast(`Active Profile: ${branchName}`, { icon: "🏢" });
  };

  const handleSave = () => {
    const branchName = branchesList.find((b) => b.id === selectedBranch)?.name;
    console.log(
      `Saving dynamic menu configuration for [${selectedBranch}]`,
      franchiseFeatures,
    );
    toast.success(`Access definitions applied smoothly to ${branchName}!`);
  };

  const totalEnabled = Object.values(franchiseFeatures).filter(
    (f) => f.enabled,
  ).length;

  return (
    <div className="container-fluid py-5 bg-light-smooth min-vh-100">
      {/* ── TOP HERO HEADER BAR ──────────────────────────────── */}
      <div className="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden position-relative">
        <div className="accent-glow-strip"></div>
        <div className="card-body p-4">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8 d-flex align-items-center gap-3">
              <div className="p-3 bg-dark text-white rounded-3 shadow-sm d-flex align-items-center justify-content-center">
                <FaSlidersH size={24} className="spinning-hover" />
              </div>
              <div>
                <h3 className="fw-black text-dark mb-1 tracking-tight">
                  Branch Architecture Matrix
                </h3>
                <p className="text-muted mb-0 small">
                  Restrict or instantiate core interface modules across specific
                  workspace territories instantly.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-md-end">
              <button
                className="btn btn-dark fw-bold px-4 py-2.5 rounded-3 shadow transition-all hover-lift d-flex align-items-center gap-2"
                onClick={handleSave}
              >
                <FaSave size={14} /> Commit Scope Matrix
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── WORKSPACE SELECTOR CARD ─────────────────────────── */}
      <div className="card border-0 rounded-4 shadow-sm mb-4 bg-white p-4">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <label className="form-label small fw-bold text-uppercase tracking-wider text-muted mb-2">
              Target Active Territory
            </label>
            <div className="position-relative group-focus">
              <select
                className="form-select form-select-lg border rounded-3 fw-bold text-dark ps-5 shadow-sm transition-all focus-ring-primary"
                value={selectedBranch}
                onChange={handleBranchChange}
                style={{ fontSize: "1rem" }}
              >
                {branchesList.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-primary">
                <FaMapMarkerAlt size={16} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-3 mt-lg-0 d-flex justify-content-lg-end">
            <div className="d-flex gap-3 text-center">
              <div className="px-4 py-2 bg-light rounded-3 border">
                <span className="d-block fw-black text-primary h4 mb-0">
                  {totalEnabled}
                </span>
                <small
                  className="text-muted font-monospace text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Active Modules
                </small>
              </div>
              <div className="px-4 py-2 bg-light rounded-3 border">
                <span className="d-block fw-black text-secondary h4 mb-0">
                  {Object.keys(franchiseFeatures).length - totalEnabled}
                </span>
                <small
                  className="text-muted font-monospace text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Suspended
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID PATTERN LAYOUT ──────────────────────────────── */}
      <div className="row g-3">
        {Object.entries(franchiseFeatures).map(([path, data]) => {
          const IconComponent = data.icon;
          return (
            <div className="col-12 col-md-6 col-xxl-4" key={path}>
              <div
                onClick={() => toggleFeature(path)}
                className={`card h-100 border rounded-4 cursor-pointer transition-all item-card-interactive ${
                  data.enabled
                    ? "border-primary-subtle bg-white shadow-sm"
                    : "border-light bg-light-muted opacity-75"
                }`}
              >
                <div className="card-body p-3.5 d-flex flex-column justify-content-between">
                  <div>
                    {/* Upper Line Header */}
                    <div className="d-flex align-items-center justify-content-between mb-2.5">
                      <div
                        className={`p-2.5 rounded-3 d-flex align-items-center justify-content-center transition-all ${
                          data.enabled
                            ? "bg-primary text-white shadow-sm"
                            : "bg-secondary-subtle text-secondary"
                        }`}
                      >
                        <IconComponent size={18} />
                      </div>

                      {/* Styled Status Badge pill */}
                      <div>
                        {data.enabled ? (
                          <span className="badge-pill bg-success-soft text-success">
                            <FaCheckCircle className="me-1" size={10} /> Active
                          </span>
                        ) : (
                          <span className="badge-pill bg-secondary-soft text-muted">
                            <FaBan className="me-1" size={10} /> Inactive
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <h5
                      className={`fw-bold mb-1 transition-all ${data.enabled ? "text-dark" : "text-muted text-decoration-line-through"}`}
                    >
                      {data.label}
                    </h5>
                    <p
                      className="text-muted mb-3 line-clamp-2"
                      style={{ fontSize: "0.825rem", lineHeight: "1.4" }}
                    >
                      {data.desc}
                    </p>
                  </div>

                  {/* Footer Path Tag */}
                  <div className="pt-2 border-top border-light d-flex justify-content-between align-items-center">
                    <code
                      className="text-muted font-monospace"
                      style={{ fontSize: "0.725rem", opacity: 0.75 }}
                    >
                      {path}
                    </code>
                    <div
                      className="form-check form-switch p-0 m-0 custom-switch-wrapper"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        className="form-check-input ms-0 cursor-pointer"
                        type="checkbox"
                        role="switch"
                        checked={data.enabled}
                        onChange={() => toggleFeature(path)}
                        style={{ width: "2.3em", height: "1.15em" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS-in-JS style configurations for modern look */}
      <style>{`
        .bg-light-smooth { background-color: #f8fafc; }
        .bg-light-muted { background-color: #f1f5f9; }
        .fw-black { font-weight: 800; }
        .tracking-tight { letter-spacing: -0.03em; }
        .tracking-wider { letter-spacing: 0.06em; }
        .cursor-pointer { cursor: pointer; }
        .p-3.5 { padding: 1.15rem !important; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        /* Accent strip inside top hero bar */
        .accent-glow-strip {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd 0%, #0284c7 50%, #6366f1 100%);
        }

        /* Card interactivity transitions */
        .transition-all { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .item-card-interactive:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.04) !important;
          border-color: #cbd5e1 !important;
        }

        /* Micro pill tags styling */
        .badge-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 50px;
        }
        .bg-success-soft { background-color: #e6f4ea; }
        .bg-secondary-soft { background-color: #e2e8f0; }

        /* Custom subtle focus style rules */
        .focus-ring-primary:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
      `}</style>
    </div>
  );
}
