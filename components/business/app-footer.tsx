'use client'

import { docs_url } from "@/lib/utils";
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {

  const footerLinks = [
    {
      title: '架构支持',
      links: [
        { title: '裸金属与虚拟化', href: docs_url('features/baremetal') },
        { title: '阿里云', href: docs_url('features/aliyun') },
        { title: '腾讯云', href: docs_url('features/qcloud') },
        { title: '华为云', href: docs_url('features/huaweicloud') },
        { title: '国际云服务商', href: docs_url('features/aws-elastic') },
      ]
    },
    {
      title: '产品功能',
      links: [
        { title: '分布式存储', href: docs_url('features/distributed') },
        { title: '日志管理', href: docs_url('features/logging') },
        { title: '版本控制', href: docs_url('features/versioning') },
        { title: 'S3 兼容', href: docs_url('features/s3-compatibility') },
        { title: '纠删码计算器', href: '/erasure-code-calculator' },
        { title: '对象级只读', href: docs_url('features/worm') },
        { title: '跨区域复制', href: docs_url('features/replication') },
        { title: '加密', href: docs_url('features/encryption') },
        { title: '生命周期管理', href: docs_url('features/lifecycle') },
      ]
    },
    {
      title: '解决方案',
      links: [
        { title: '现代数据湖', href: docs_url('features/data-lake') },
        { title: 'AI 和机器学习', href: docs_url('features/ai') },
        { title: '云原生', href: docs_url('features/cloud-native') },
        { title: '大数据计算存储分离', href: docs_url('features/hdfs') },
        { title: 'SQL 支持', href: docs_url('features/sql-server') },
        { title: '量化交易', href: docs_url('features/quantitative-trading') },
        { title: '制造业降本', href: docs_url('features/industry') },
        { title: '冷归档存储', href: docs_url('features/cold-archiving') },
        { title: '视频存储方案', href: docs_url('features/video') },
        { title: '国产信创和 SM 解决方案', href: docs_url('features/domestic') },
      ]
    },
    {
      title: '关于我们',
      links: [
        { title: '关于我们', href: docs_url('about') },
        { title: '投资和合作', href: docs_url('about') },
        { title: '商标使用', href: docs_url('about') },
      ]
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Logo className="h-8 w-auto" />
              <div className="text-sm text-muted-foreground flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:hello@rustfs.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {'邮箱：hello@rustfs.com'}
                  </a>
                  <span className="hidden md:inline-block">|</span>
                  <a
                    href="tel:400-033-5363"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {'电话：400-033-5363'}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>{'北京地址：北京市海淀区西小口路 66 号中关村东升科技园北领地 C 区'}</span>
                  {true && (
                    <>
                      <span className="hidden md:inline-block">|</span>
                      <a
                        href="https://beian.miit.gov.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {'京 ICP 备 2024061305-1 号'}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LinkGitHub className="group inline-flex" />
              <LinkTwitter className="group inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
