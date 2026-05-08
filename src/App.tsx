import { cn } from './lib/utils';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
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

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

const monthlyData = [
  { name: 'Jan 26', xAxisPeriod: '1-31', period: '01 a 31 de janeiro', Investimento: 1169.75, Receita: 25872.40, ROAS: 22.12 },
  { name: 'Fev 26', xAxisPeriod: '1-28', period: '01 a 28 de fevereiro', Investimento: 645.36, Receita: 8894.00, ROAS: 13.78 },
  { name: 'Mar 26', xAxisPeriod: '1-31', period: '01 a 31 de março', Investimento: 1538.37, Receita: 36879.70, ROAS: 23.97 },
  { name: 'Abr 26', xAxisPeriod: '1-30', period: '01 a 30 de abril', Investimento: 1818.45, Receita: 55451.50, ROAS: 30.49 },
  { name: 'Mai 26', xAxisPeriod: '1-8', period: '01 a 08 de maio', Investimento: 448.41, Receita: 19449.60, ROAS: 43.37 },
];

const CustomAxisTick = ({ x, y, payload }: any) => {
  const data = monthlyData.find(d => d.name === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="#A5A5A5" fontSize={12}>
        {payload.value}
      </text>
      <text x={0} y={0} dy={26} textAnchor="middle" fill="#C5C5C5" fontSize={10}>
        {data?.xAxisPeriod}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-[#EAEAEA] p-3 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-[6px]">
        <p className="text-[10px] font-medium text-[#787774] tracking-wide uppercase mb-2">{data.period}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
               <span className="text-[12px] text-[#787774]">{entry.name}</span>
            </div>
            <span className="text-[12px] font-medium text-[#111111]">
               {entry.name === 'ROAS' 
                 ? `${entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x` 
                 : `R$ ${entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const EvolutionChart = ({ title, dataKey, color, delay = 0, prefix = '', suffix = '' }: any) => {
  const formatter = (value: number) => {
    if (value >= 1000) return `${prefix}${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}k${suffix}`;
    return `${prefix}${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}${suffix}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-[8px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center justify-between min-h-[24px] mb-8">
        <h3 className="text-[13px] font-medium text-[#787774] tracking-[0.05em] uppercase leading-snug">{title}</h3>
      </div>
      <div className="h-72 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={<CustomAxisTick />} 
              interval={0}
              padding={{ left: 30, right: 30 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#A5A5A5' }} 
              tickFormatter={formatter}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#EAEAEA', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#FFFFFF', stroke: color, strokeWidth: 1.5 }} 
              activeDot={{ r: 4, fill: color, strokeWidth: 0 }} 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <MetricCard
              title="Investimento"
              value={<AnimatedCounter value={448.38} prefix="R$ " />}
              icon={ChartLineUp}
              accent="neutral"
              delay={0.2}
            />
            <MetricCard
              title="Receita Gerada"
              value={<AnimatedCounter value={19449.60} prefix="R$ " />}
              icon={CurrencyDollar}
              accent="neutral"
              delay={0.3}
            />
            <MetricCard
              title="ROAS Geral"
              value="43.38x"
              icon={TrendUp}
              accent="green"
              subtext="Retorno sobre investimento publicitário"
              delay={0.4}
            />
          </div>
        </section>

        {/* Funnel Efficiency */}
        <section>
           <SectionTitle icon={Funnel} title="Conversão e Volumetria (Funil)" delay={0.1} />
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <MetricCard
                title="Cliques (Todos)"
                value="662"
                icon={CursorClick}
                accent="neutral"
                subtextHighlight="100%"
                subtext="Entrada do funil"
                delay={0.2}
              />
              <MetricCard
                title="Visualizações da Página"
                value="451"
                icon={Eye}
                accent="blue"
                subtextHighlight="68.1%"
                subtext="Retenção de cliques"
                delay={0.3}
              />
              <MetricCard
                title="Adições ao Carrinho"
                value="277"
                icon={ShoppingCart}
                accent="yellow"
                subtextHighlight="61.4%"
                subtext="Conv. de visualizações"
                delay={0.4}
              />
              <MetricCard
                title="Total de Compras"
                value="150"
                icon={CurrencyDollar}
                accent="green"
                subtextHighlight="54.1%"
                subtext="Conv. de carrinhos"
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
                title="Custo por Compra (CPA)"
                value={<AnimatedCounter value={2.99} prefix="R$ " />}
                icon={Target}
                accent="neutral"
                delay={0.4}
              />
              <MetricCard
                title="Custo por Clique (CPC)"
                value={<AnimatedCounter value={0.68} prefix="R$ " />}
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

        {/* Historical Evolution */}
        <section className="flex flex-col gap-6 pt-10 border-t border-[#EAEAEA] mt-4">
          <SectionTitle icon={TrendUp} title="Evolução Temporal" delay={0.1} />
          <div className="flex flex-col gap-6">
             <EvolutionChart title="Evolução de Investimento" dataKey="Investimento" color="#A5A5A5" delay={0.1} prefix="R$ " />
             <EvolutionChart title="Evolução de Receita" dataKey="Receita" color="#111111" delay={0.2} prefix="R$ " />
             <EvolutionChart title="Evolução de ROAS" dataKey="ROAS" color="#346538" suffix="x" delay={0.3} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-4 p-6 md:p-8 bg-[#FFFFFF] border border-[#EAEAEA] rounded-[8px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default mt-4"
          >
             <div className="mt-1 text-[#111111]">
               <Lightbulb size={24} weight="regular" />
             </div>
             <div className="flex flex-col gap-3">
               <h3 className="text-[17px] md:text-lg font-medium text-[#111111]">Aceleração do Ciclo de Maturidade</h3>
               <p className="text-[16px] md:text-[17px] text-[#787774] leading-[1.6]">
                 A proporção entre investimento e resultado alcançou seu pico de eficiência absoluta. Apenas nos primeiros 8 dias de maio, operamos sob um ROAS recorde de <strong className="text-[#111111] font-medium">43.37x</strong>. A receita gerada já bate de frente e supera a volumetria de meses completos anteriores em uma fração do tempo, consumindo quase 4x menos caixa. Maior escalabilidade e velocidade de absorção de receita com a melhor segurança financeira do projeto até aqui.
               </p>
             </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}

