import { cn } from './lib/utils';
import { motion } from 'motion/react';
import {
  CurrencyDollar,
  TrendUp,
  Target,
  ShoppingCart,
  Users,
  Eye,
  CursorClick,
  Megaphone,
  ChartLineUp,
  Funnel,
  Lightbulb,
  DownloadSimple
} from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';

// --- Components ---

const MetricCard = ({
  title,
  value,
  subtext,
  subtextHighlight,
  icon: Icon,
  delay = 0,
  accent = 'neutral',
  isPrimary = false,
}: {
  title: string;
  value: string | React.ReactNode;
  subtext?: string;
  subtextHighlight?: string;
  icon?: React.ElementType;
  delay?: number;
  accent?: 'neutral' | 'red' | 'blue' | 'green' | 'yellow';
  isPrimary?: boolean;
}) => {
  const accentColors = {
    neutral: 'bg-[#F4F4F4] text-[#4A4A4A]',
    red: 'bg-[#FDEBEC] text-[#9F2F2D]',
    blue: 'bg-[#E1F3FE] text-[#1F6C9F]',
    green: 'bg-[#EDF3EC] text-[#346538]',
    yellow: 'bg-[#FBF3DB] text-[#956400]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex flex-col h-full p-6 bg-white border border-[#EAEAEA]',
        'hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-default',
        isPrimary ? 'rounded-[12px] md:col-span-2 p-8' : 'rounded-[8px]'
      )}
    >
      <div className="flex items-start justify-between min-h-[40px] mb-4">
        <h3 className="text-[11px] font-medium text-[#787774] tracking-[0.05em] uppercase leading-snug pr-2">{title}</h3>
        {Icon && (
          <div className="text-[#A5A5A5] flex-shrink-0 ml-2">
            <Icon size={18} weight="regular" />
          </div>
        )}
      </div>

      <div className={cn(
        'font-light tracking-tight text-[#111111]',
        isPrimary ? 'text-5xl md:text-6xl font-serif tracking-[-0.02em]' : 'text-3xl md:text-4xl font-mono'
      )}>
        {value}
      </div>
      
      <div className="mt-auto pt-6">
        {(subtext || subtextHighlight) && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {subtextHighlight && (
              <span className={cn('px-2 py-0.5 rounded-[4px] text-[11px] font-medium tracking-wide uppercase', accentColors[accent])}>
                {subtextHighlight}
              </span>
            )}
            {subtext && <span className="text-[#787774] text-[13px] leading-tight">{subtext}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ icon: Icon, title, delay = 0 }: { icon: React.ElementType, title: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="text-[#111111]">
      <Icon size={20} weight="regular" />
    </div>
    <h2 className="text-[15px] font-medium tracking-wide text-[#111111]">{title}</h2>
  </motion.div>
);

export default function App() {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#FBFBFA] text-[#111111] font-sans px-4 py-24 md:py-32 relative">
      <main className="max-w-5xl mx-auto w-full relative z-10 flex flex-col gap-24">
        
        {/* Header Section */}
        <header className="flex flex-col w-full pb-12 md:pb-16 border-b border-[#EAEAEA]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-[15px] font-medium text-[#787774]">Relatório de Performance</h1>
            <div className="text-5xl md:text-7xl font-serif tracking-[-0.03em] leading-[1.1] text-[#111111]">
              01 a 08 de Maio, <span className="text-[#A5A5A5]">2026</span>
            </div>
          </motion.div>
        </header>

        {/* Executive Summary Row (Bottom Line) */}
        <section>
          <SectionTitle icon={TrendUp} title="Indicadores Financeiros Chave" delay={0.1} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <MetricCard
              title="Receita Gerada"
              value="R$ 19.449,60"
              icon={CurrencyDollar}
              accent="green"
              isPrimary={true}
              subtext="Retorno sobre investimento publicitário"
              subtextHighlight="ROAS 43.38x"
              delay={0.2}
            />
            <MetricCard
              title="Investimento Mensurável"
              value="R$ 448,38"
              icon={ChartLineUp}
              accent="neutral"
              subtext="Verba consumida direta"
              delay={0.3}
            />
            <MetricCard
              title="Custo por Compra (CPA)"
              value="R$ 2,99"
              icon={Target}
              accent="green"
              subtext="Dentro da margem de eficiência"
              delay={0.4}
            />
          </div>
        </section>

        {/* Funnel Efficiency */}
        <section>
           <SectionTitle icon={Funnel} title="Conversão e Volumetria" delay={0.1} />
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <MetricCard
                title="Total de Compras"
                value="150"
                icon={ShoppingCart}
                accent="blue"
                subtextHighlight="R$ 129,66"
                subtext="Ticket Médio"
                delay={0.2}
              />
              <MetricCard
                title="Adições ao Carrinho"
                value="277"
                icon={ShoppingCart}
                accent="neutral"
                subtext="~61% de conversão do site"
                delay={0.3}
              />
              <MetricCard
                title="Visualizações da Página"
                value="451"
                icon={Eye}
                accent="neutral"
                subtextHighlight="662"
                subtext="Cliques totais originados"
                delay={0.4}
              />
              <MetricCard
                title="Cliques no Link"
                value="429"
                icon={CursorClick}
                accent="blue"
                subtextHighlight="0.57%"
                subtext="CTR (Link) nos anúncios"
                delay={0.5}
              />
           </div>
        </section>

        {/* Media Metrics */}
        <section>
           <SectionTitle icon={Megaphone} title="Distribuição e Custos de Mídia" delay={0.1} />
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <MetricCard
                title="Impressões"
                value="75.154"
                icon={Eye}
                accent="neutral"
                delay={0.2}
              />
              <MetricCard
                title="Alcance Único"
                value="33.462"
                icon={Users}
                accent="neutral"
                subtextHighlight="2.25x"
                subtext="Frequência média no período"
                delay={0.3}
              />
              <MetricCard
                title="Custo por Mil (CPM)"
                value="R$ 5,97"
                icon={CurrencyDollar}
                accent="neutral"
                delay={0.4}
              />
              <MetricCard
                title="Custo por Clique (CPC)"
                value="R$ 0,68"
                icon={CurrencyDollar}
                accent="neutral"
                delay={0.5}
              />
           </div>
        </section>

        {/* Insights Section */}
        <section className="pt-2">
           <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-10 text-[#111111]">
              Insights Estratégicos
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
               {[
                 {
                   title: "01. Eficiência Extrema de ROAS",
                   body: <>O modelo operou com um retorno (ROAS) de <strong className="text-[#111111] font-medium">43.38x</strong>. Com um investimento exato de R$ 448,38, geramos R$ 19.449,60. O Custo por Compra operou a incomparáveis R$ 2,99, reforçando alinhamento ideal de oferta/público.</>
                 },
                 {
                   title: "02. Velocidade do Funil Intermediário",
                   body: <>Dentre 451 acessos, 277 registraram intenção real de compra no carrinho (<strong className="text-[#111111] font-medium">61% de aprovação inicial da LP</strong>). A experiência entre a chegada e entrada de pedido não possui atritos relevantes.</>
                 },
                 {
                   title: "03. Saturação vs Frequência de Exibição",
                   body: <>Frequência controlada em <strong className="text-[#111111] font-medium">2.25</strong> num alcance de 33K usuários. Não há sintomas graves de fadiga criativa. O leilão entregou um ótimo CPM de R$ 5,97, indicando competitividade forte dos ativos visuais e da conta.</>
                 },
                 {
                   title: "04. Descompasso Tátil nos Criativos",
                   body: <>Dos 662 cliques (Total), <strong className="text-[#111111] font-medium">apenas 429 (64%)</strong> direcionaram efetivamente ao site via link. Parte do orçamento está direcionando engajamento intra-plataforma. Sugere-se diretivas de call-to-action (CTA) mais nítidas para reduzir esse atrito em próximas fases.</>
                 }
               ].map((insight, idx) => (
                   <motion.div
                       key={idx}
                       initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                       whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                       viewport={{ once: true, margin: "-50px" }}
                       transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                       className="flex flex-col gap-3"
                   >
                       <h3 className="text-[17px] md:text-lg font-medium text-[#111111]">{insight.title}</h3>
                       <p className="text-[16px] md:text-[17px] text-[#787774] leading-[1.6]">
                           {insight.body}
                       </p>
                   </motion.div>
               ))}
           </div>
        </section>

      </main>
    </div>
  );
}

