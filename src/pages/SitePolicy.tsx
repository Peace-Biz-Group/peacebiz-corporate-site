import React from 'react';
import { motion } from 'motion/react';

const SitePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* Hero */}
      <section className="relative py-32 px-6 md:px-20 border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-gray-400 mb-8 uppercase">
              サイトポリシー
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-500">
                SITE POLICY
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
              株式会社ピース・ビズ（以下「当社」）が運営する本ウェブサイト（以下「本サイト」）のご利用にあたり、以下のサイトポリシーをお読みいただき、同意のうえご利用ください。
            </p>
          </motion.div>

          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">1.</span>著作権・知的財産権
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本サイトに掲載されているテキスト、画像、映像、デザイン、ロゴ、プログラムその他すべてのコンテンツに関する著作権および知的財産権は、当社または正当な権利を有する第三者に帰属します。これらの無断での複製、転載、改変、配布、公衆送信、商業利用等は法律で禁止されています。
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">2.</span>免責事項
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              当社は、本サイトに掲載する情報の正確性・完全性・有用性について万全を期しておりますが、以下の事項についていかなる保証も行いません。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                本サイトの情報の正確性、最新性、完全性、信頼性
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                本サイトの利用により生じた損害（直接的・間接的を問わず）
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                本サイトの運営の中断、停止、変更、終了に起因する損害
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                コンピュータウイルス等の有害プログラムによる損害
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">3.</span>リンクについて
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              本サイトへのリンクは、原則として自由に設置いただけます。ただし、以下の場合はお断りいたします。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                当社の信用・品位を損なう、または損なうおそれのあるサイトからのリンク
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                フレーム内に本サイトを表示するなど、当社のコンテンツであることが不明確となるリンク
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                法令または公序良俗に反する内容を含むサイトからのリンク
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              また、本サイトから第三者のウェブサイトへのリンクが含まれる場合がありますが、リンク先の内容について当社は一切の責任を負いません。
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">4.</span>推奨環境
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              本サイトを快適にご利用いただくために、以下のブラウザの最新版でのご利用を推奨しております。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                Google Chrome
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                Mozilla Firefox
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                Apple Safari
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                Microsoft Edge
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              上記以外のブラウザや古いバージョンでは、一部の機能や表示が正しく動作しない場合があります。また、JavaScriptおよびCookieを有効に設定してご利用ください。
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">5.</span>禁止事項
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              本サイトのご利用にあたり、以下の行為を禁止いたします。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                本サイトのコンテンツを許可なく商業目的で利用する行為
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                本サイトの運営を妨害する行為、または妨害するおそれのある行為
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                不正アクセス、データの改ざん、ウイルスの送信等の行為
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                当社または第三者の権利を侵害する行為
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                その他、当社が不適切と判断する行為
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">6.</span>個人情報の取り扱い
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本サイトにおける個人情報の取り扱いについては、別途定める「プライバシーポリシー」に準じます。
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">7.</span>サイトポリシーの変更
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              当社は、必要に応じて本サイトポリシーを予告なく変更する場合があります。変更後のサイトポリシーは、本サイトに掲載した時点から効力を生じるものとします。本サイトをご利用いただく際には、最新のサイトポリシーをご確認ください。
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">8.</span>準拠法・管轄裁判所
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本サイトポリシーの解釈および適用は日本法に準拠するものとし、本サイトの利用に関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">9.</span>お問い合わせ窓口
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本サイトポリシーに関するお問い合わせは、下記までご連絡ください。
            </p>
            <div className="bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl p-8 space-y-3 font-medium text-gray-600 dark:text-gray-300">
              <p className="font-black text-black dark:text-white text-lg">株式会社ピース・ビズ</p>
              <p>〒170-0012 東京都豊島区上池袋1-10-8 エデン上池袋ビル5F</p>
              <p>E-Mail: <a href="mailto:contact@peace-biz.com" className="text-brand-blue hover:underline transition-colors">contact@peace-biz.com</a></p>
              <p>受付時間: 平日 9:00 - 18:00（土日祝除く）</p>
            </div>
          </div>

          {/* Effective Date */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10">
            <p className="text-sm text-gray-400 font-medium">
              制定日: 2020年9月15日<br />
              最終改定日: 2026年2月12日
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SitePolicy;
