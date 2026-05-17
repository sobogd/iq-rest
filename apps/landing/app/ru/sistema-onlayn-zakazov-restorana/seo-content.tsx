import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR на каждом столе, сканируй-и-заказывай, без приложения",
  "Заказы в реальном времени на планшет кухни или менеджера",
  "Или направлены в WhatsApp ресторана — выбираете вы",
  "Модификаторы, варианты и аллергены приходят в тикет",
  "Свободный комментарий гостя в каждом заказе",
  "Дневная нумерация для кухни",
  "Многоязычный checkout в 35 языках, по телефону гостя",
  "Ноль комиссий с заказа — фиксированная месячная подписка",
];

const HOW_STEPS = [
  { title: "Включите заказы для ресторана", desc: "Откройте настройки ресторана, активируйте переключатель Заказы и выберите, какие поля гостя (имя, телефон, адрес) собирать." },
  { title: "Выберите канал доставки", desc: "Внутренний режим отправляет новые заказы во вкладку Кухня. WhatsApp-режим форматирует заказ как сообщение в WhatsApp ресторана. Или оба сразу." },
  { title: "Распечатайте и наклейте QR", desc: "Скачайте QR (один на стол или один на ресторан) как PDF или PNG и наклейте на столы. Гости сканируют родной камерой — без App Store, без трения." },
  { title: "Работайте смену", desc: "Заказы появляются во вкладке Кухня с номером стола, блюдами, вариантами, аллергенами, комментарием и номером дня. Переводите между новый → в работе → готово. Браузер гостя обновляется в реальном времени." },
];

const COMPARISON_ROWS = [
  ["Комиссия с заказа", "20–30%", "0%", "0% (€6,90/мес фикс)"],
  ["Куда идёт заказ", "Приложение агрегатора", "Ваша касса", "Ваш планшет кухни или WhatsApp"],
  ["Номер стола на тикете", "Нет", "Вручную", "Да, автоматом"],
  ["Модификаторы / варианты", "Ограниченно", "Да", "Да, с аллергенами"],
  ["Многоязычный checkout", "Язык их приложения", "Нет", "35 языков, автоматом"],
  ["Нужное железо", "Планшет агрегатора", "POS-терминал", "Любой планшет с браузером"],
  ["Время настройки", "Onboarding-звонок", "Дни-недели", "5 минут"],
];

export function SeoContent() {
  return (
    <>
      <Section dataSection="seo-intro">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center">Подробнее</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">
            Что такое система онлайн-заказов для ресторана{" "}
            <span className="text-muted-foreground">по-настоящему</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">
            Не marketplace. Не агрегатор доставки. Прямая линия от телефона гостя за вашим столом к планшету кухни — или в WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              <strong>Система онлайн-заказов для ресторана</strong> в смысле IQ Rest — это софт, который даёт гостю за вашим столом открыть меню в телефоне, собрать корзину и отправить заказ на кухню — без Uber Eats, Glovo, Wolt или любого другого marketplace. Гость не покидает ваше QR-меню, вы не платите комиссию с заказа, и тикет приходит с реальным номером стола.
            </p>
            <p>
              IQ Rest построен вокруг двух каналов. По умолчанию <em>внутренний режим</em>: каждый новый заказ приходит во вкладку Кухня панели на планшете, телефоне или ноуте у раздачи — с номером стола, блюдами с вариантами и аллергенами, свободным комментарием гостя и дневным номером заказа. Альтернатива — <em>WhatsApp-режим</em>: тот же заказ форматируется как сообщение в WhatsApp ресторана. Полезно для маленьких команд, преимущественно самовывоза или когда менеджер вне зала. Оба режима могут работать одновременно.
            </p>
          </div>
        </div>
      </Section>

      <Section dataSection="seo-benefits">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Что вы реально получаете</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4" strokeWidth={2.5} /></div>
                <p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section dataSection="seo-how">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Как работает поток заказов IQ Rest</h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center">Четыре переключателя в панели — и вы в эфире. Без установщика, без POS-железа, без проекта интеграции.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section dataSection="seo-table">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">Агрегатор, классический POS или система заказов</h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">Характеристика</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Агрегатор доставки</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Классический POS</th>
                  <th className="text-left font-semibold py-3 text-primary">Заказы IQ Rest</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}>
                    <td className="py-3 pr-3 font-medium">{row[0]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center">
            Система онлайн-заказов, которой владеет сам ресторан, окупается с первого уикенда — каждый рубль, что гость тратит в зале, остаётся в зале, а тикет у раздачи всегда с реальным номером стола.
          </p>
        </div>
      </Section>
    </>
  );
}
