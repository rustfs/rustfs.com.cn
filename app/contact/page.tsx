import ContactForm from '@/components/business/contact-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "联系我们 | RustFS | 面向 AI 的高性能 Apache 2.0 对象存储",
  description: '联系 RustFS 团队，咨询产品问题、技术支持或合作机会。',
  openGraph: {
    title: "联系我们 | RustFS | 面向 AI 的高性能 Apache 2.0 对象存储",
    description: '联系 RustFS 团队，咨询产品问题、技术支持或合作机会。',
    type: "website",
    locale: 'zh_CN',
  },
}

export default function ContactPage() {
  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <ContactForm />
      </div>
    </main>
  )
}
