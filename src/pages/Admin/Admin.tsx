import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Target,
  Calendar,
  Info,
  LayoutDashboard,
  Clock,
  FileText,
  Bell,
  Users,
  Trophy,
  Ticket,
  GitCompare,
  Search,
  Menu,
  X
} from 'lucide-react';

interface RevenueData {
  month: string;
  value: number;
}

interface NewUserData {
  date: string;
  users: number;
}

interface AppSubmissionData {
  category: string;
  count: number;
  color: string;
  [key: string]: string | number; // Add index signature
}

interface PendingApprovalData {
  name: string;
  status: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const Dashboard: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('6 Months');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const revenueData: RevenueData[] = [
    { month: 'Apr 2025', value: 0 },
    { month: 'May 2025', value: 0 },
    { month: 'Jun 2025', value: 0 },
    { month: 'Jul 2025', value: 0 },
    { month: 'Aug 2025', value: 0 },
    { month: 'Sep 2025', value: 0 },
    { month: 'Oct 2025', value: 320 }
  ];

  const newUserData: NewUserData[] = [
    { date: 'Week 1', users: 45 },
    { date: 'Week 2', users: 78 },
    { date: 'Week 3', users: 52 },
    { date: 'Week 4', users: 95 },
    { date: 'Week 5', users: 112 },
    { date: 'Week 6', users: 88 }
  ];

  const appSubmissionData: AppSubmissionData[] = [
    { category: 'E-commerce', count: 35, color: '#3b82f6' },
    { category: 'Social Media', count: 28, color: '#8b5cf6' },
    { category: 'Productivity', count: 22, color: '#10b981' },
    { category: 'Entertainment', count: 15, color: '#f59e0b' }
  ];

  const pendingApprovalData: PendingApprovalData[] = [
    { name: 'ShopifyConnect Pro', status: 'Review', date: '2 hours ago', priority: 'high' },
    { name: 'Social Analytics Dashboard', status: 'Testing', date: '5 hours ago', priority: 'medium' },
    { name: 'Task Manager Plus', status: 'Documentation', date: '1 day ago', priority: 'low' },
    { name: 'Video Streaming App', status: 'Review', date: '1 day ago', priority: 'high' },
    { name: 'Email Marketing Suite', status: 'Testing', date: '2 days ago', priority: 'medium' }
  ];

  const dateRanges: string[] = ['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const totalNewUsers = newUserData.reduce((acc, curr) => acc + curr.users, 0);
  const totalSubmissions = appSubmissionData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-48 bg-slate-900/50 border-r border-slate-700/50 backdrop-blur-sm transition-transform duration-300 z-40 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo/Header Area */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="w-1 h-16 bg-cyan-400 rounded-full mx-auto"></div>
        </div>

        {/* Main Section */}
        <div className="px-4 py-6">
          <div className="text-xs text-slate-500 mb-3 font-semibold">MAIN</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Clock size={16} />
              <span>Apps Pending</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <FileText size={16} />
              <span>Media Library Pro</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-semibold">CONTENT</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Target size={16} />
              <span>Apps</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <FileText size={16} />
              <span>Manage Pages</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Bell size={16} />
              <span>Notifications</span>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="px-4 py-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-semibold">COMMUNITY</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Users size={16} />
              <span>Users</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Trophy size={16} />
              <span>Gamification</span>
            </div>
          </div>
        </div>

        {/* Business Section */}
        <div className="px-4 py-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-semibold">BUSINESS</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <DollarSign size={16} />
              <span>Financials</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Ticket size={16} />
              <span>Coupons</span>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="px-4 py-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-semibold">TOOLS</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <GitCompare size={16} />
              <span>Compare Apps</span>
            </div>
          </div>
        </div>

        {/* System Section */}
        <div className="px-4 py-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-semibold">SYSTEM</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
              <Search size={16} />
              <span>SEO Tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-48 p-4 md:p-6 lg:p-8">
        {/* Date Range Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 lg:mb-8"
        >
          <div className="flex items-center space-x-2 text-slate-300">
            <Calendar size={20} />
            <span className="text-sm font-medium">Date Range:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  selectedRange === range
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 lg:space-x-3 lg:ml-auto">
            <input
              type="text"
              value="04/22/2025"
              readOnly
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 md:px-4 py-2 text-xs md:text-sm w-24 md:w-32 text-center"
            />
            <span className="text-slate-500 text-xs md:text-sm">to</span>
            <input
              type="text"
              value="10/22/2025"
              readOnly
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 md:px-4 py-2 text-xs md:text-sm w-24 md:w-32 text-center"
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 lg:mb-8"
        >
          {/* Total Revenue Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-emerald-300">
                <span className="text-xs md:text-sm font-medium">Total Revenue</span>
                <Info size={14} className="text-emerald-400" />
              </div>
              <DollarSign size={20} className="text-emerald-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">$32</div>
          </motion.div>

          {/* Vendor Conversion Rate Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-blue-300">
                <span className="text-xs md:text-sm font-medium">Vendor Conversion Rate</span>
                <Info size={14} className="text-blue-400" />
              </div>
              <TrendingUp size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">66.7%</div>
          </motion.div>

          {/* GMV Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-purple-300">
                <span className="text-xs md:text-sm font-medium">GMV</span>
                <Info size={14} className="text-purple-400" />
              </div>
              <Activity size={20} className="text-purple-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">$320</div>
          </motion.div>

          {/* ARR Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-amber-300">
                <span className="text-xs md:text-sm font-medium">ARR</span>
                <Info size={14} className="text-amber-400" />
              </div>
              <Target size={20} className="text-amber-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">$239.76</div>
          </motion.div>
        </motion.div>

        {/* Revenue Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm mb-6 lg:mb-8"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <LineChart data={revenueData}>
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                ticks={[0, 80, 160, 240, 320]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom Cards with Data */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* New Users Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-blue-300">
                <span className="text-sm md:text-base font-medium">New Users</span>
                <Info size={14} className="text-blue-400" />
              </div>
              <Users size={20} className="text-blue-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">{totalNewUsers}</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={newUserData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* App Submissions Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-purple-300">
                <span className="text-sm md:text-base font-medium">App Submissions</span>
                <Info size={14} className="text-purple-400" />
              </div>
              <FileText size={20} className="text-purple-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">{totalSubmissions}</div>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={150}>
                <PieChart>
                  <Pie
                    data={appSubmissionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {appSubmissionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-xs">
                {appSubmissionData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-300">{item.category}: {item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pending Approval Card */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-amber-300">
                <span className="text-sm md:text-base font-medium">Pending Approval</span>
                <Info size={14} className="text-amber-400" />
              </div>
              <Clock size={20} className="text-amber-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">{pendingApprovalData.length}</div>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {pendingApprovalData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.date}</div>
                  </div>
                  <div className="ml-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;