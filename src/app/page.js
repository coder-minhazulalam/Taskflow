"use client";

import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Chip } from "@heroui/react";
import { 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  Sparkles,
  ListTodo
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">TaskFlow</span>
              <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">Supabase DB</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="font-medium text-slate-700 hover:text-slate-900">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button color="primary" className="font-semibold bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Full-Stack Real-World Architecture
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight md:leading-tight">
          Supercharge Your Workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Supabase</span> &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">PostgreSQL</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
          একটি সম্পূর্ণ রিয়েল-ওয়ার্ল্ড টাস্ক ম্যানেজমেন্ট প্ল্যাটফর্ম। Next.js 16, Express.js REST API, Better Auth এবং ক্লাউড Supabase PostgreSQL এর শক্তিশালী ইন্টিগ্রেশন।
        </p>

        {/* Call to action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" color="primary" className="bg-blue-600 text-white font-medium px-8 shadow-lg shadow-blue-600/25 flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/tasks">
            <Button size="lg" variant="outline" className="border-slate-300 font-medium text-slate-700">
              View Tasks Demo
            </Button>
          </Link>
        </div>

        {/* Interactive Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Card 1 */}
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6 pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Database className="w-6 h-6" />
              </div>
              <CardTitle className="font-bold text-lg text-slate-900">PostgreSQL on Supabase</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-slate-600 leading-relaxed">
                রিলেশনাল ডেটাবেস, Foreign Keys, One-to-Many এবং Many-to-Many রিলেশনশিপ (Junction Tables) দিয়ে সম্পূর্ণ সুসংগঠিত ডেটাবেস।
              </p>
              <div className="mt-4 flex gap-2">
                <Chip size="sm" variant="soft" color="primary">Strict Schema</Chip>
                <Chip size="sm" variant="soft" color="default">UUID</Chip>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6 pb-2">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="font-bold text-lg text-slate-900">Better Auth Security</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-slate-600 leading-relaxed">
                মডার্ন সেশন ও কুকি বেসড অথেনটিকেশন। পাসওয়ার্ড হ্যাশিং, প্রটেক্টেড রাউটস এবং ইউজার ও সেশনের স্টেট ম্যানেজমেন্ট।
              </p>
              <div className="mt-4 flex gap-2">
                <Chip size="sm" variant="soft" color="success">Session Based</Chip>
                <Chip size="sm" variant="soft" color="default">HttpOnly Cookies</Chip>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6 pb-2">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <CardTitle className="font-bold text-lg text-slate-900">Express REST API</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-slate-600 leading-relaxed">
                পরিপূর্ণ CRUD অপারেশন (Create, Read, Update, Delete) এবং সিকিউর রেসপন্স হ্যান্ডলিং।
              </p>
              <div className="mt-4 flex gap-2">
                <Chip size="sm" variant="soft" color="accent">RESTful</Chip>
                <Chip size="sm" variant="soft" color="default">Full CRUD</Chip>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live System Preview Badge */}
        <div className="mt-16 w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-800">Supabase Cloud Connected</div>
              <div className="text-xs text-slate-500">PostgreSQL 16 Cluster • Project: taskflow-app</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tasks Table</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Categories</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Task Tags</span>
          </div>
        </div>
      </main>
    </div>
  );
}
