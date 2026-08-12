import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  path: "/privacy-policy/",
  title: "隐私政策 | RustFS",
  description:
    "了解 RustFS 在自托管软件部署与 RustFS 官方网站中如何处理隐私信息。",
});

const sectionClassName =
  "border-t border-border pt-8 first:border-t-0 first:pt-0";
const headingClassName =
  "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl";
const subheadingClassName = "text-lg font-semibold text-foreground";
const paragraphClassName = "text-base leading-8 text-muted-foreground";
const listClassName =
  "list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground marker:text-brand";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              法律信息
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              隐私政策
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              RustFS 在自托管软件部署与官方网站中处理信息的方式。
            </p>
          </div>
          <p className="border border-border bg-card px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            2026 年 7 月 30 日生效
          </p>
        </div>

        <article className="mx-auto mt-12 max-w-4xl space-y-12 border border-border bg-card p-6 sm:p-10 lg:p-12">
          <div className="space-y-5">
            <p className={paragraphClassName}>
              RustFS（下称“我们”）尊重您的隐私，并致力于保护用户与企业客户的数据。RustFS 是从零构建的开源高性能分布式对象存储平台，面向自托管、本地部署与云原生环境。
            </p>
            <p className={paragraphClassName}>
              本隐私政策说明以下场景中的信息处理方式：
            </p>
            <ol className="list-decimal space-y-3 pl-5 text-base leading-8 text-muted-foreground marker:font-semibold marker:text-brand">
              <li>
                <strong className="text-foreground">RustFS 软件</strong>（您部署的存储集群或实例）。
              </li>
              <li>
                <strong className="text-foreground">RustFS 中文官方网站</strong>（rustfs.com.cn 及其子域名）。
              </li>
            </ol>
          </div>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>
              1. RustFS 软件隐私架构（自托管部署）
            </h2>
            <p className={`${paragraphClassName} mt-5`}>
              RustFS 软件的隐私理念很简单：<strong className="text-foreground">您的数据完全属于您。</strong>
            </p>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>
                A. 不收集遥测与业务数据
              </h3>
              <p className={paragraphClassName}>
                RustFS 软件完全运行在您的私有基础设施中。
              </p>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">不访问内容或元数据：</strong>RustFS 不会在外部服务器上收集、传输、检查或存储您的应用数据、S3 对象内容、存储桶元数据、用户凭据、访问密钥或网络日志。
                </li>
                <li>
                  <strong className="text-foreground">不跟踪使用行为：</strong>软件不包含用于监控使用行为、访问模式或系统配置的隐藏遥测、分析脚本或后台跟踪机制。
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>
                B. 用于统计的最小版本检查
              </h3>
              <p className={paragraphClassName}>
                为了解平台活跃采用情况并指导后续版本工程，RustFS 软件包含最小化的自动版本检查机制。
              </p>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">收集内容：</strong>软件会定期发送仅包含<strong className="text-foreground">软件版本字符串</strong>的自动请求（例如 <code className="border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-sm text-foreground">v1.2.0-beta</code>）。
                </li>
                <li>
                  <strong className="text-foreground">不收集内容：</strong>该请求不包含个人身份信息、服务器主机名、IP 存储详情、集群拓扑、存储容量指标、硬件标识或 MAC 地址。
                </li>
                <li>
                  <strong className="text-foreground">处理目的：</strong>匿名版本数据仅用于<strong className="text-foreground">统计</strong>，包括估算部署总量、了解社区版本分布，以及确定活跃版本的维护优先级。
                </li>
                <li>
                  <strong className="text-foreground">退出控制：</strong>您可以完全控制此功能。在安装或配置集群时设置环境变量 <code className="border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-sm text-foreground">RUSTFS_TELEMETRY=off</code>，即可关闭版本请求，具体以部署指南为准。
                </li>
              </ul>
            </div>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>
              2. 官方网站收集的信息
            </h2>
            <p className={`${paragraphClassName} mt-5`}>
              当您访问 rustfs.com.cn、使用网站服务或提交在线表单时，我们会收集有限的个人数据，用于用户支持与业务沟通。
            </p>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>A. 您主动提供的信息</h3>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">联系与咨询表单：</strong>当您申请企业支持、填写联系表单或订阅产品动态时，我们可能收集您的姓名、公司职位、公司邮箱、联系电话、公司名称、所在省份与留言详情。
                </li>
                <li>
                  <strong className="text-foreground">营销订阅：</strong>如果您明确同意接收新闻、活动更新或技术公告，我们会依据您的同意处理邮箱地址。您可以随时撤回同意或通过邮件底部链接取消订阅。
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className={subheadingClassName}>B. 网站自动收集的数据</h3>
              <ul className={listClassName}>
                <li>
                  <strong className="text-foreground">服务器与安全日志：</strong>网站托管、内容分发和安全系统可能处理浏览器类型、操作系统、来源网址、IP 地址与时间戳等基础技术数据，用于提供服务、安全审计、网络性能优化与反滥用。
                </li>
                <li>
                  <strong className="text-foreground">百度统计：</strong>中文网站使用百度统计处理访问、页面使用、来源、设备、浏览器、IP 地址等技术数据，帮助我们了解并改进网站使用情况。相关处理同时受百度隐私政策约束。
                </li>
              </ul>
            </div>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>3. 处理个人数据的法律依据</h2>
            <p className={`${paragraphClassName} mt-5`}>
              在适用的数据保护法律下，我们基于以下依据处理个人数据：
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li>
                <strong className="text-foreground">合法利益：</strong>安全运营网站、分析汇总部署统计（匿名版本数量）并回应用户咨询。
              </li>
              <li>
                <strong className="text-foreground">同意：</strong>在您明确选择订阅后发送营销信息与新闻通讯。
              </li>
              <li>
                <strong className="text-foreground">履行合同所需：</strong>依据正式协议提供企业支持、二进制发布或许可服务。
              </li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>4. 数据共享、出售与披露</h2>
            <p className={`${paragraphClassName} mt-5`}>
              我们尊重您的数据隐私，并严格禁止将个人信息商业化：
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li>
                <strong className="text-foreground">不出售数据：</strong>我们<strong className="text-foreground">不会</strong>向第三方出售、出租、交易个人信息或使用统计，也不会从中获利。
              </li>
              <li>
                <strong className="text-foreground">第三方服务提供商：</strong>网站托管、内容分发、安全、表单、统计与通信服务商可能在提供服务所必需的范围内代表我们处理数据。联系表单使用 Web3Forms 传递提交内容，并使用 hCaptcha 进行反滥用验证；中文网站使用百度统计分析网站使用情况。我们会依据适用法律评估合同、保密与数据保护措施。
              </li>
              <li>
                <strong className="text-foreground">法律要求：</strong>仅在有约束力的法院命令或具有法律执行力的政府要求下披露信息。
              </li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>5. 跨境数据传输</h2>
            <p className={`${paragraphClassName} mt-5`}>
              RustFS 在全球运营。根据所使用的服务，您与网站互动或提交的个人信息可能被传输到您所在司法辖区之外处理。我们会在法律要求的情况下采用合同或其他认可的保护措施，评估适用的传输要求，并将处理限制在本政策说明的目的范围内。
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>6. 您的数据保护权利</h2>
            <p className={`${paragraphClassName} mt-5`}>
              根据您所在司法辖区适用的法律，您可能对我们持有的个人数据享有以下权利：
            </p>
            <ul className={`${listClassName} mt-4`}>
              <li><strong className="text-foreground">访问权：</strong>请求了解我们处理的个人数据详情。</li>
              <li><strong className="text-foreground">删除权：</strong>请求删除您的联系信息或邮件订阅数据。</li>
              <li><strong className="text-foreground">反对与退出权：</strong>反对基于合法利益的处理，或随时退出营销更新。</li>
              <li><strong className="text-foreground">数据可携带权：</strong>以结构化格式获取您的个人数据副本。</li>
            </ul>
            <p className={`${paragraphClassName} mt-5`}>
              如需行使上述权利，请发送邮件至{" "}
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="mailto:hello@rustfs.com">
                hello@rustfs.com
              </a>.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>7. 安全与保留</h2>
            <p className={`${paragraphClassName} mt-5`}>
              我们采取严格的技术、组织与物理安全控制，包括 TLS 加密、严格访问控制与边界防火墙，防止信息被未经授权访问、丢失或滥用。个人联系数据仅在实现收集目的或满足法定保留要求所必需的期限内保存。
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>8. 隐私政策更新</h2>
            <p className={`${paragraphClassName} mt-5`}>
              我们可能因技术改进、法律要求或运营变化不时更新本隐私政策。所有修订都会发布在本页面，并更新生效日期。
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>9. Cookie 与类似技术</h2>
            <p className={`${paragraphClassName} mt-5`}>
              我们使用浏览器存储保存您选择的主题等偏好。中文网站使用百度统计分析访问情况，您可以通过浏览器设置或拦截工具限制相关 Cookie 和脚本。
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>10. 联系我们</h2>
            <p className={`${paragraphClassName} mt-5`}>
              如果您对本隐私政策或 RustFS 数据处理方式有疑问、顾虑或请求，请联系我们：
            </p>
            <address className="mt-5 border-l-2 border-brand pl-5 text-base not-italic leading-8 text-muted-foreground">
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="mailto:hello@rustfs.com">
                hello@rustfs.com
              </a>
              <br />
              北京市海淀区西小口路 66 号中关村东升科技园北领地 C 区
              <br />
              400-033-5363
            </address>
          </section>
        </article>
      </section>
    </main>
  );
}
