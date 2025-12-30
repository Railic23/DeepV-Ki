/**
 * GitLab 同步教程弹窗组件
 * 在用户点击同步按钮前，先展示如何将代码同步到 gitlab.example.net 的教程
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaGitlab, FaExternalLinkAlt, FaCopy, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface GitLabSyncTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSync: () => void;
}

const GITLAB_URL = 'https://gitlab.example.net';

export default function GitLabSyncTutorialModal({
  isOpen,
  onClose,
  onConfirmSync,
}: GitLabSyncTutorialModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  // 当弹窗打开时，禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!isOpen) return null;

  const codeExamples = [
    {
      title: '1. 查看当前远程仓库',
      code: 'git remote -v',
      description: '查看你当前配置的远程仓库列表',
    },
    {
      title: '2. 添加猎豹 GitLab 为新的远程仓库',
      code: `git remote add liebao ${GITLAB_URL}/your-group/your-project.git`,
      description: '将猎豹 GitLab 添加为名为 "liebao" 的远程仓库（请替换为你的实际项目路径）',
    },
    {
      title: '3. 推送代码到猎豹 GitLab',
      code: 'git push liebao main',
      description: '将 main 分支推送到猎豹 GitLab（如果你使用 master 分支，请改为 master）',
    },
    {
      title: '4. 推送所有分支',
      code: 'git push liebao --all',
      description: '一次性推送所有本地分支到猎豹 GitLab',
    },
    {
      title: '5. 同时推送到多个远程仓库',
      code: 'git push origin main && git push liebao main',
      description: '使用 && 连接命令，同时推送到多个远程仓库',
    },
  ];

  const advancedExamples = [
    {
      title: '设置默认推送到多个远程',
      code: `# 创建一个推送别名，同时推送到 origin 和 liebao
git config alias.pushall '!git push origin && git push liebao'

# 使用方式
git pushall main`,
      description: '创建 Git 别名，一条命令推送到多个远程仓库',
    },
    {
      title: '设置上游追踪',
      code: `# 设置本地分支追踪猎豹 GitLab 的远程分支
git branch --set-upstream-to=liebao/main main

# 或者在推送时设置
git push -u liebao main`,
      description: '设置分支追踪关系，方便后续拉取和推送',
    },
    {
      title: '从猎豹 GitLab 拉取更新',
      code: `# 获取猎豹 GitLab 的更新
git fetch liebao

# 合并更新
git merge liebao/main`,
      description: '从猎豹 GitLab 拉取并合并最新代码',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FaGitlab className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">同步项目到猎豹 GitLab</h2>
                <p className="text-orange-100 text-sm mt-0.5">本系统仅同步 gitlab.example.net 上的项目</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* 内容区域 - 可滚动 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 重要提示 */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">重要提示</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  DeepV-Ki 仅能同步 <strong className="text-amber-900 dark:text-amber-100">{GITLAB_URL}</strong> 上的项目。
                  如果你的代码存储在其他 Git 服务（如 Gerrit、GitHub、其他 GitLab 实例），请按照以下步骤将代码同步到猎豹 GitLab。
                </p>
              </div>
            </div>
          </div>

          {/* 第一步：登录并创建仓库 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('step1')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold text-sm">1</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">登录猎豹 GitLab 并创建仓库</span>
              </div>
              {expandedSection === 'step1' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {expandedSection === 'step1' && (
              <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔐</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      访问{' '}
                      <a
                        href={GITLAB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-medium"
                      >
                        {GITLAB_URL}
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      <strong className="text-orange-600 dark:text-orange-400">请使用猎豹 OA 账号登录</strong>（使用LDAP登录，输入完整的猎豹OA邮箱）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📁</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">创建新项目</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm mt-2 space-y-1 list-disc list-inside ml-2">
                      <li>点击右上角 <strong>New project</strong> 按钮</li>
                      <li>选择 <strong>Create blank project</strong></li>
                      <li>填写项目名称（建议与原项目名称保持一致）</li>
                      <li>选择合适的 Group（如果没有可以创建新的）</li>
                      <li>点击 <strong>Create project</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 第二步：配置多远程仓库 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('step2')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold text-sm">2</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">配置多远程仓库（Git 命令）</span>
              </div>
              {expandedSection === 'step2' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {expandedSection === 'step2' && (
              <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  在你的本地项目目录中执行以下命令，将猎豹 GitLab 添加为额外的远程仓库：
                </p>

                {codeExamples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">{example.title}</h4>
                    </div>
                    <div className="relative group">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto font-mono">
                        <code>{example.code}</code>
                      </pre>
                      <button
                        onClick={() => handleCopy(example.code, index)}
                        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="复制"
                      >
                        {copiedIndex === index ? <FaCheck size={12} className="text-green-400" /> : <FaCopy size={12} />}
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{example.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 第三步：进阶技巧 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('step3')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold text-sm">💡</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">进阶技巧（可选）</span>
              </div>
              {expandedSection === 'step3' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {expandedSection === 'step3' && (
              <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                {advancedExamples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">{example.title}</h4>
                    <div className="relative group">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto font-mono whitespace-pre-wrap">
                        <code>{example.code}</code>
                      </pre>
                      <button
                        onClick={() => handleCopy(example.code, 100 + index)}
                        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="复制"
                      >
                        {copiedIndex === 100 + index ? <FaCheck size={12} className="text-green-400" /> : <FaCopy size={12} />}
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{example.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p><strong>小提示：</strong></p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>推送完成后，回到本页面点击下方的&ldquo;开始同步&rdquo;按钮</li>
                  <li>如果有任何使用问题，可联系管理员孔海峰</li>
                  <li>建议保持原有的 origin 远程不变，新增 liebao 远程用于同步</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              如果你的项目已在 {GITLAB_URL}，可直接开始同步
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                关闭
              </button>
              <button
                onClick={onConfirmSync}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                开始同步
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
