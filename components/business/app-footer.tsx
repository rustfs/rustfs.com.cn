'use client'

import { footerNavigation } from '@/data/navigation';
import LinkGitHub from './buttons/link-github';
import { SITE_CONFIG } from '@/app.config';
import { Logo } from './logo';

export default function AppFooter() {
  return (
    <footer className="relative z-10 border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_repeat(3,1fr)]">
          <div className="max-w-sm pt-5">
            <Logo className="h-8 w-auto" />
            <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:hello@rustfs.com"
                className="transition-colors hover:text-foreground"
              >
                邮箱：hello@rustfs.com
              </a>
              <a href="tel:400-033-5363" className="transition-colors hover:text-foreground">
                电话：400-033-5363
              </a>
              <span>北京市海淀区西小口路 66 号中关村东升科技园北领地 C 区</span>
            </div>
          </div>
          {footerNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="pt-5">
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

        <div className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            本网站使用的产品名称、标志和品牌均归其各自所有者所有，仅用于识别相关公司、产品和服务，并不代表任何形式的认可或背书。
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} RustFS. 保留所有权利。</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                京 ICP 备 2024061305-1 号
              </a>
              <a href={SITE_CONFIG.secondaryDomain} className="transition-colors hover:text-foreground">English</a>
              <LinkGitHub className="group inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
