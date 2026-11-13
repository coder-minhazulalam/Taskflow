"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Calendar, 
  Trash2, 
  Check, 
  CheckSquare,
  Sparkles,
  ArrowRight,
  BarChart3,
  Users2,
  Zap,
  Shield,
  Layers,
  ChevronRight,
  X,
  Filter,
  Tag
} from "lucide-react";

// বাস্তবসম্মত প্রজেক্ট ও টাস্ক ডেটা (কোনো টেকনিক্যাল জার্গন ছাড়া)
const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Launch Mobile App Redesign",
    description: "Finalize high-fidelity Figma mockups and prepare design handoff for the development team.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Design",
    categoryColor: "bg-purple-100 text-purple-700 border-purple-200",
    tags: ["UI/UX", "Mobile", "Figma"],
    dueDate: "Nov 20, 2026",
    assignee: "Sarah K.",
    assigneeAvatar: "SK",
    avatarBg: "bg-purple-600"
  },
  {
    id: "task-2",
    title: "Prepare Q4 Marketing Strategy",
    description: "Define campaign targets, budget distribution across social channels, and ad creatives.",
    status: "TODO",
    priority: "HIGH",
    category: "Marketing",
    categoryColor: "bg-amber-100 text-amber-700 border-amber-200",
    tags: ["Campaign", "Growth", "Q4"],
    dueDate: "Nov 25, 2026",
    assignee: "David M.",
    assigneeAvatar: "DM",
    avatarBg: "bg-amber-600"
  },
  {
    id: "task-3",
    title: "Customer Feedback & User Interviews",
    description: "Conduct 10 in-depth user feedback sessions on the new dashboard usability and performance.",
    status: "COMPLETED",
    priority: "MEDIUM",
    category: "Research",
    categoryColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    tags: ["Interviews", "Usability"],
    dueDate: "Nov 15, 2026",
    assignee: "Amina R.",
    assigneeAvatar: "AR",
    avatarBg: "bg-emerald-600"
  },
  {
    id: "task-4",
    title: "Annual Cloud Security Audit",
    description: "Review IAM permissions, multi-factor authentication policies, and data encryption certificates.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Operations",
    categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
    tags: ["Security", "Compliance"],
    dueDate: "Dec 01, 2026",
    assignee: "Minhaz A.",
    assigneeAvatar: "MA",
    avatarBg: "bg-blue-600"
  },
  {
    id: "task-5",
    title: "Update Employee Onboarding Guide",
    description: "Revise team workflows, project documentation links, and communication guidelines for newcomers.",
    status: "TODO",
    priority: "LOW",
    category: "HR",
    categoryColor: "bg-rose-100 text-rose-700 border-rose-200",
    tags: ["Documentation", "HR"],
    dueDate: "Dec 05, 2026",
    assignee: "Elena V.",
    assigneeAvatar: "EV",
    avatarBg: "bg-rose-600"
  }
];

export default function Home() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("MEDIUM");
  const [newTaskCategory, setNewTaskCategory] = useState("Marketing");
  const [newTaskTags, setNewTaskTags] = useState("Design, Strategy");

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Task metrics
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "TODO").length;
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || "No description provided.",
      status: "TODO",
      priority: newTaskPriority,
      category: newTaskCategory,
      categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
      tags: newTaskTags.split(",").map((t) => t.trim()).filter(Boolean),
      dueDate: "Dec 10, 2026",
      assignee: "You",
      assigneeAvatar: "YO",
      avatarBg: "bg-indigo-600"
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setIsModalOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">TaskFlow</span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                Workspace
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#dashboard" className="hover:text-blue-600 transition-colors">Project Board</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
          </nav>

          {/* User Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm shadow-blue-500/25 transition-all hover:shadow-md"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 pt-16 pb-20 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Smart Project &amp; Task Management Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight md:leading-tight">
            Organize, Track &amp; Manage Your Team&apos;s Work with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Total Clarity</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            কাজের তালিকা সাজিয়ে রাখুন, ডেডলাইন ট্র্যাক করুন এবং দলের সাথে সমন্বয় করুন এক ছাদের নিচে। রিয়েল-টাইম টাস্ক বোর্ড এবং প্রজেক্ট ট্র্যাকিং এর সম্পূর্ণ সমাধান।
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Create New Task
            </button>
            <a 
              href="#dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-7 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all"
            >
              Explore Live Board
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-black text-slate-900">99.9%</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Uptime Reliability</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-600">10k+</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">4.9/5</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">User Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-600">Real-Time</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Team Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TASK MANAGEMENT BOARD SECTION */}
      <section id="dashboard" className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        
        {/* Dashboard Title & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Project Task Board
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage your daily deliverables, monitor ongoing sprints, and update status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg p-1 text-xs">
              {["ALL", "Design", "Marketing", "Research", "Operations"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    selectedCategory === cat 
                      ? "bg-blue-600 text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Add Task Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm shadow-blue-500/20 transition-all ml-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">All Tasks</span>
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900">{totalTasks}</h3>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold uppercase text-amber-600 tracking-wider">To Do</span>
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900">{todoTasks}</h3>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">In Progress</span>
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900">{inProgressTasks}</h3>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Completed</span>
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900">{completedTasks}</h3>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. TO DO COLUMN */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h4 className="font-bold text-sm text-slate-800">To Do</h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shadow-xs">
                {filteredTasks.filter((t) => t.status === "TODO").length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {filteredTasks
                .filter((t) => t.status === "TODO")
                .map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={handleStatusChange} 
                    onDelete={handleDeleteTask} 
                  />
                ))}
              {filteredTasks.filter((t) => t.status === "TODO").length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/40">
                  No tasks waiting in To Do
                </div>
              )}
            </div>
          </div>

          {/* 2. IN PROGRESS COLUMN */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <h4 className="font-bold text-sm text-slate-800">In Progress</h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shadow-xs">
                {filteredTasks.filter((t) => t.status === "IN_PROGRESS").length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {filteredTasks
                .filter((t) => t.status === "IN_PROGRESS")
                .map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={handleStatusChange} 
                    onDelete={handleDeleteTask} 
                  />
                ))}
              {filteredTasks.filter((t) => t.status === "IN_PROGRESS").length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/40">
                  No active tasks in progress
                </div>
              )}
            </div>
          </div>

          {/* 3. COMPLETED COLUMN */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h4 className="font-bold text-sm text-slate-800">Completed</h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shadow-xs">
                {filteredTasks.filter((t) => t.status === "COMPLETED").length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {filteredTasks
                .filter((t) => t.status === "COMPLETED")
                .map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={handleStatusChange} 
                    onDelete={handleDeleteTask} 
                  />
                ))}
              {filteredTasks.filter((t) => t.status === "COMPLETED").length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/40">
                  No completed tasks yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES SECTION */}
      <section id="features" className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Built for Modern Product Teams
            </h2>
            <p className="mt-4 text-base text-slate-600">
              সবকিছু এক জায়গায় গোছানো থাকলে কাজের গতি বাড়ে বহু গুণ। দেখে নিন টাস্কফ্লো আপনাকে কীভাবে সহায়তা করবে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Progress Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                টাস্কের স্ট্যাটাস পরিবর্তন করার সাথে সাথে পুরো প্রজেক্টের অগ্রগতির চার্ট ও মেট্রিক আপডেট হয়ে যায়।
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Seamless Team Collaboration</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                দলের সদস্যদের টাস্ক অ্যাসাইন করুন, মতামত যোগ করুন এবং ডেডলাইন মিস হওয়া প্রতিরোধ করুন।
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise-Grade Security</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                আপনার ডেটা সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদ। প্রতিটি দল শুধুমাত্র তাদের নির্ধারিত প্রজেক্ট দেখতে পারে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">TaskFlow</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                আধুনিক দলের জন্য সবচেয়ে সহজ এবং কার্যকর টাস্ক ও প্রজেক্ট ম্যানেজমেন্ট সফটওয়্যার। আপনার কাজের গতিকে নিয়ে যান পরবর্তী ধাপে।
              </p>
              <div className="text-xs text-slate-500 mt-6">
                &copy; 2026 TaskFlow Platform, Inc. All rights reserved.
              </div>
            </div>

            {/* Links column 1 */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#dashboard" className="hover:text-white transition-colors">Kanban Board</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Links column 2 */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Links column 3 */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Add New Project Task</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Task Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Design Landing Page Hero Section" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the task details, requirements, and deliverables..." 
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Priority</label>
                  <select 
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Category</label>
                  <select 
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="Design">Design &amp; UI</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research &amp; UX</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">Human Resources</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Tags (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Design, Mobile, Sprint 1" 
                  value={newTaskTags}
                  onChange={(e) => setNewTaskTags(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Single Task Card Component
function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="bg-white hover:bg-slate-50/80 border border-slate-200 rounded-xl p-4 shadow-xs hover:shadow-md transition-all group">
      {/* Category & Priority Badge */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
          {task.category}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
          task.priority === "HIGH" ? "bg-red-50 text-red-600 border border-red-200" :
          task.priority === "MEDIUM" ? "bg-amber-50 text-amber-700 border border-amber-200" :
          "bg-emerald-50 text-emerald-700 border border-emerald-200"
        }`}>
          {task.priority}
        </span>
      </div>

      {/* Task Title */}
      <h5 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
        {task.title}
      </h5>

      {/* Task Description */}
      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {task.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer Info & Action Controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          {/* Assignee Avatar */}
          <div className={`w-6 h-6 rounded-full ${task.avatarBg} text-white flex items-center justify-center text-[10px] font-bold`}>
            {task.assigneeAvatar}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{task.dueDate}</span>
          </div>
        </div>

        {/* Quick Status Shift Controls */}
        <div className="flex items-center gap-1">
          {task.status !== "TODO" && (
            <button
              title="Move to To Do"
              onClick={() => onStatusChange(task.id, "TODO")}
              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-amber-600 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
            </button>
          )}

          {task.status !== "IN_PROGRESS" && (
            <button
              title="Move to In Progress"
              onClick={() => onStatusChange(task.id, "IN_PROGRESS")}
              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          )}

          {task.status !== "COMPLETED" && (
            <button
              title="Mark as Completed"
              onClick={() => onStatusChange(task.id, "COMPLETED")}
              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            title="Delete Task"
            onClick={() => onDelete(task.id)}
            className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors ml-0.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
