'use client';

import React from 'react';
import { Cpu, ShieldCheck, FileCode, FolderTree, Terminal, Box, Download, CheckCircle, ExternalLink, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-lg shadow-cyan-500/5">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-l from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                تطبيق Nujes المستقل - نظام لينكس
              </h1>
              <p className="text-xs text-slate-400">
                منصة سطح مكتب خفيفة مع أتمتة حزم دبيان .deb والتصدير الثابت لـ Next.js
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4" />
              تصدير ثابت حقيقي 100%
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>
          
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              إصدار مستقر ومعزول بالكامل عن Git
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              تطبيقات ويب فائقة السرعة على سطح المكتب
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              تم إعداد هذا التطبيق ليعمل كـ <span className="text-cyan-300 font-semibold">Desktop Linux Application</span> خفيف جداً. يتم التجميع تلقائياً خارج مسار المستودع بداخل <code className="text-cyan-400 font-mono bg-slate-950 px-2 py-1 rounded">/tmp/nujes-build</code> وحزمه في حزمة <code className="text-cyan-400 font-mono bg-slate-950 px-2 py-1 rounded">.deb</code> جاهزة للرفع إلى إصدارات GitHub Release.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors space-y-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 w-fit">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              1. التصدير الثابت المباشر
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              يتم تصدير التطبيق تلقائياً عبر <code className="text-cyan-300 font-mono">npm run build</code> وتأكيد وجود مجلد المخرجات <code className="text-cyan-300 font-mono">out/</code> إجبارياً لمنع استخدام أي صفحات احتياطية.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors space-y-3">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 w-fit">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              2. حزمة دبيان المعزولة
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              يقوم السكربت <code className="text-cyan-300 font-mono">make-deb.sh</code> بإنشاء هيكل دبيان القياسي وقواطع التشغيل وبناء حزمة <code className="text-cyan-300 font-mono">nujes_1.0_all.deb</code>.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors space-y-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 w-fit">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              3. مشغل خفيف محلي
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              مشغل النظام <code className="text-cyan-300 font-mono">/usr/bin/nujes</code> يستضيف ملفات الويب محلياً بـ Python ويعرضها في نافذة تطبيق مستقلة وبأقل استهلاك للذاكرة.
            </p>
          </div>
        </div>

        {/* Action Specs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            خطوات التجميع المعتمدة في GitHub Actions Workflow
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 block mb-1 font-sans font-bold">1. تثبيت الاعتمادات</span>
              npm install --legacy-peer-deps
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 block mb-1 font-sans font-bold">2. تصدير البناء الثابت</span>
              npm run build
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 block mb-1 font-sans font-bold">3. التحقق الإجباري من out/</span>
              test -d out && test -n &quot;$(ls -A out)&quot;
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 block mb-1 font-sans font-bold">4. بناء حزمة .deb والرفع</span>
              ./make-deb.sh
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-900/50 text-center text-xs text-slate-500">
        Nujes Linux Desktop Application Suite · Next.js Static Export Edition
      </footer>
    </div>
  );
}
