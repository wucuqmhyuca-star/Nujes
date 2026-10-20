'use client';

import React from 'react';
import { Cpu, ShieldCheck, FileCode, FolderTree } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                REA - Next.js Clean Application
              </h1>
              <p className="text-xs text-slate-400">
                تطبيق ويب نقي ومستقر دون أي حزم أو ملفات مؤقتة
              </p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4" />
            شجرة الملفات نظيفة 100%
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-4">
          <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 mb-2">
            <FolderTree className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            تم مسح مجلدات التجميع وحزم Debian بالكامل
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            تم مسح مجلدات <code className="text-cyan-300 font-mono">build-deb</code> و <code className="text-cyan-300 font-mono">temp_rea</code> وكافة ملفات <code className="text-cyan-300 font-mono">.deb</code> بشكل نهائي وفوري.
          </p>
        </div>

        {/* File Structure */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-md font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            شجرة الملفات الأساسية للمشروع
          </h3>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-loose dir-ltr text-left">
            <div className="text-cyan-400 font-bold mb-2">/app/applet</div>
            <p>├── <span className="text-emerald-400 font-semibold">app/</span></p>
            <p>│   ├── layout.tsx</p>
            <p>│   ├── page.tsx</p>
            <p>│   └── globals.css</p>
            <p>├── <span className="text-emerald-400 font-semibold">hooks/</span></p>
            <p>├── <span className="text-emerald-400 font-semibold">lib/</span></p>
            <p>├── <span className="text-yellow-400">package.json</span></p>
            <p>├── <span className="text-yellow-400">tsconfig.json</span></p>
            <p>├── <span className="text-yellow-400">metadata.json</span></p>
            <p>└── <span className="text-yellow-400">.gitignore</span></p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 bg-slate-900/50 text-center text-xs text-slate-500">
        REA Next.js Clean App · Google AI Studio
      </footer>
    </div>
  );
}
