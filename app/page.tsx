"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stop = {
  period: string;
  time: string;
  title: string;
  area: string;
  cost: string;
  note: string;
  image: string;
  imageAlt: string;
  mapQuery?: string;
  badge?: string;
};

type Day = {
  number: number;
  city: string;
  theme: string;
  subtitle: string;
  accent: string;
  stops: Stop[];
};

const days: Day[] = [
  {
    number: 1,
    city: "五股 → 台南",
    theme: "古城初見・夜市開吃",
    subtitle: "從北部出發，讓博物館、老街小吃與台南夜色慢慢接住旅程。",
    accent: "brick",
    stops: [
      {
        period: "上午",
        time: "08:00 — 11:30",
        title: "台北五股出發 → 國道南下",
        area: "國道 1 號",
        cost: "—",
        note: "途中可在泰安或西螺服務區稍作休息，換手駕駛、補充水分。",
        image: "/images/taiwan-road.jpg",
        imageAlt: "台灣公路旅行情境",
        mapQuery: "五股區到國立臺灣歷史博物館",
        badge: "出發",
      },
      {
        period: "上午",
        time: "11:30 — 13:00",
        title: "國立臺灣歷史博物館",
        area: "安南區",
        cost: "全票 $100・優待票 $50",
        note: "下交流道後的第一站。用一座博物館讀懂台灣，園區也適合舒展長途車程後的筋骨。",
        image: "/images/history-museum.jpg",
        imageAlt: "國立臺灣歷史博物館建築",
        mapQuery: "國立臺灣歷史博物館",
        badge: "文化",
      },
      {
        period: "下午",
        time: "13:15 — 14:30",
        title: "國華街商圈・午餐",
        area: "中西區",
        cost: "依消費而定",
        note: "從永樂市場一路吃：富盛號碗粿、阿松割包，看到想吃的就少量分食，為後面留胃。",
        image: "/images/beef-soup.jpg",
        imageAlt: "台南國華街在地小吃情境",
        mapQuery: "台南國華街永樂市場",
        badge: "必吃",
      },
      {
        period: "下午",
        time: "14:45 — 15:30",
        title: "安全帽店",
        area: "東門路二段",
        cost: "依消費而定",
        note: "營業時間 13:00–21:30。先確認尺寸與配戴舒適度，再挑喜歡的款式與鏡片。",
        image: "/images/anping-street.jpg",
        imageAlt: "台南街區購物情境",
        mapQuery: "台南市東門路二段 安全帽店",
        badge: "採買",
      },
      {
        period: "下午",
        time: "15:45 — 16:30",
        title: "心宅 Check-in・稍作休息",
        area: "安平／中西區",
        cost: "已預訂",
        note: "先辦理入住、放行李。補水休息一下，傍晚再輕裝出門。",
        image: "/images/hotel-room.jpg",
        imageAlt: "溫暖舒適的旅宿房間情境",
        mapQuery: "台南 心宅 住宿",
        badge: "入住",
      },
      {
        period: "傍晚",
        time: "17:00 — 18:30",
        title: "文章牛肉湯・安平店",
        area: "安平區",
        cost: "依點餐而定",
        note: "用餐尖峰前抵達，品嚐台南溫體牛的鮮甜。若想多吃幾樣，建議湯與熱炒分食。",
        image: "/images/beef-soup.jpg",
        imageAlt: "台南牛肉湯",
        mapQuery: "文章牛肉湯 安平店",
        badge: "台南味",
      },
      {
        period: "晚上",
        time: "19:00 — 21:30",
        title: "台南花園夜市",
        area: "北區",
        cost: "依消費而定",
        note: "夜市通常於週四、六、日營業；出發前再確認當日公告。建議先繞一圈再決定吃什麼。",
        image: "/images/garden-night-market.jpg",
        imageAlt: "燈火熱鬧的台南花園夜市",
        mapQuery: "台南花園夜市",
        badge: "夜生活",
      },
    ],
  },
  {
    number: 2,
    city: "台南慢遊",
    theme: "化石探險・巷弄選物",
    subtitle: "早餐吃得像台南人，午後把步調放慢，留給老街、冰品與器皿美學。",
    accent: "mustard",
    stops: [
      {
        period: "上午",
        time: "08:30 — 09:30",
        title: "丹丹漢堡・早餐",
        area: "市區／永康區",
        cost: "依點餐而定",
        note: "體驗南部限定的麵線羹＋炸雞早餐組合。熱門時段人多，可先想好備選分店。",
        image: "/images/dandan.jpg",
        imageAlt: "丹丹漢堡店面",
        mapQuery: "丹丹漢堡 台南",
        badge: "南部限定",
      },
      {
        period: "上午",
        time: "10:15 — 12:45",
        title: "臺南左鎮化石園區",
        area: "左鎮區",
        cost: "全票 $100・半票 $50",
        note: "園區內容豐富，適合慢慢逛。戶外區日照較強，記得防曬、帶水與穿好走的鞋。",
        image: "/images/fossil-park.jpg",
        imageAlt: "臺南左鎮化石園區建築",
        mapQuery: "臺南左鎮化石園區",
        badge: "親子友善",
      },
      {
        period: "下午",
        time: "13:30 — 14:45",
        title: "國華街補漏美食・冰品",
        area: "中西區",
        cost: "依消費而定",
        note: "把昨天錯過的口袋名單補齊，再用一碗冰收尾。避開正午後，走逛更舒服。",
        image: "/images/beef-soup.jpg",
        imageAlt: "台南街頭美食情境",
        mapQuery: "台南國華街 美食 冰品",
        badge: "二刷",
      },
      {
        period: "下午",
        time: "15:00 — 16:00",
        title: "餐桌上的鹿早",
        area: "中西區・衛民街",
        cost: "依消費而定",
        note: "13:00–18:00 營業的巷弄日式器皿選物店。易碎品建議請店家加強包裝，回旅宿再整理。",
        image: "/images/anping-street.jpg",
        imageAlt: "台南巷弄選物散步情境",
        mapQuery: "餐桌上的鹿早 衛民街",
        badge: "選物",
      },
      {
        period: "下午",
        time: "16:30 — 17:30",
        title: "28 The Loft Check-in",
        area: "中西區",
        cost: "已預訂",
        note: "入住休息、放置採買戰利品。晚間行程以散步為主，不必帶太多東西。",
        image: "/images/hotel-room.jpg",
        imageAlt: "質感旅宿房間情境",
        mapQuery: "28 The Loft 台南",
        badge: "入住",
      },
      {
        period: "晚上",
        time: "18:00 — 21:00",
        title: "海安路・神農街慢步與晚餐",
        area: "中西區",
        cost: "依消費而定",
        note: "老屋、燈籠與街頭光影，是台南最迷人的夜晚。邊走邊選晚餐，把時間留給偶遇。",
        image: "/images/shennong-street.jpg",
        imageAlt: "夜色中的台南神農街",
        mapQuery: "台南神農街 海安路",
        badge: "散步",
      },
    ],
  },
  {
    number: 3,
    city: "台南 → 台中",
    theme: "採菇・Gelato・逢甲夜",
    subtitle: "換一座城市繼續玩：山城採菇、審計散步，晚上用燒肉與夜市把快樂拉滿。",
    accent: "green",
    stops: [
      {
        period: "上午",
        time: "08:30 — 10:30",
        title: "台南 Check-out → 前往台中",
        area: "國道北上",
        cost: "—",
        note: "退房後直接北上。前往新社前可先確認山區路況，預留市區轉山路的時間。",
        image: "/images/taiwan-road.jpg",
        imageAlt: "台灣北上公路旅行情境",
        mapQuery: "台南到新社百菇莊",
        badge: "移動日",
      },
      {
        period: "上午",
        time: "11:00 — 13:00",
        title: "新社百菇莊",
        area: "新社區",
        cost: "採菇按斤計價・輕食另計",
        note: "體驗採香菇，再試香菇香腸與香菇冰淇淋。採菇區可能濕滑，鞋底止滑會更安心。",
        image: "/images/xinshe-mushroom.jpg",
        imageAlt: "台中新社採菇體驗",
        mapQuery: "新社百菇莊",
        badge: "體驗",
      },
      {
        period: "下午",
        time: "14:00 — 15:30",
        title: "甜月亮義大利手工冰淇淋",
        area: "西區・審計新村",
        cost: "依消費而定",
        note: "先吃一球 Gelato，再散步逛審計新村。造型可愛、口味精緻，適合拍一張旅行紀念。",
        image: "/images/shennong-street.jpg",
        imageAlt: "老屋街區與甜點散步情境",
        mapQuery: "甜月亮義大利手工冰淇淋 審計新村",
        badge: "甜點",
      },
      {
        period: "下午",
        time: "16:00 — 16:30",
        title: "探索私旅 Check-in",
        area: "西屯區",
        cost: "已預訂",
        note: "鄰近逢甲夜市，先停好車、放行李。晚餐有訂位，休息時間記得設提醒。",
        image: "/images/hotel-room.jpg",
        imageAlt: "台中旅宿房間情境",
        mapQuery: "探索私旅 台中",
        badge: "入住",
      },
      {
        period: "晚間",
        time: "17:00 — 19:00",
        title: "老井燒肉・福科店",
        area: "西屯區",
        cost: "已訂位",
        note: "已預訂 17:00，請準時抵達。從旅宿出發前先看車程與停車位置，避免壓縮用餐時間。",
        image: "/images/xinshe-mushroom.jpg",
        imageAlt: "台中山產與燒烤美食情境",
        mapQuery: "老井極上燒肉 福科店",
        badge: "已訂位",
      },
      {
        period: "晚間",
        time: "19:30 — 21:30",
        title: "逢甲夜市",
        area: "西屯區",
        cost: "依消費而定",
        note: "散步消化、感受台中夜市活力。剛吃完燒肉，這一站以逛街與少量分享小吃為主。",
        image: "/images/fengjia-night-market.jpg",
        imageAlt: "人潮熱鬧的台中逢甲夜市",
        mapQuery: "逢甲夜市",
        badge: "夜生活",
      },
    ],
  },
  {
    number: 4,
    city: "台中 → 五股",
    theme: "睡飽・午餐・輕鬆回家",
    subtitle: "最後一天不趕行程，睡飽再吃一頓喜歡的午餐，把旅行的餘韻帶回家。",
    accent: "blue",
    stops: [
      {
        period: "上午",
        time: "11:00 — 11:30",
        title: "探索私旅 Check-out",
        area: "西屯區",
        cost: "—",
        note: "檢查充電器、冰箱與浴室小物，行李上車後準備享用回程前的午餐。",
        image: "/images/hotel-room.jpg",
        imageAlt: "旅宿退房前的舒適房間",
        mapQuery: "探索私旅 台中",
        badge: "退房",
      },
      {
        period: "午餐",
        time: "11:45 — 13:15",
        title: "麵由辛生・南屯店 或 大埔鐵板燒",
        area: "南屯區",
        cost: "依點餐而定",
        note: "想吃香麻麵食選麵由辛生；想快速熱炒選大埔鐵板燒。南屯離交流道近，吃完順勢北上。",
        image: "/images/beef-soup.jpg",
        imageAlt: "熱騰騰的台式午餐情境",
        mapQuery: "麵由辛生 南屯店",
        badge: "二選一",
      },
      {
        period: "下午",
        time: "13:30 — 16:00",
        title: "輕鬆北上返家・五股",
        area: "國道北上",
        cost: "—",
        note: "結束豐富的四天三夜。若精神或路況需要，服務區停一次也比硬撐更快樂。",
        image: "/images/taiwan-road.jpg",
        imageAlt: "晴朗的台灣公路回家路上",
        mapQuery: "南屯區到五股區",
        badge: "平安回家",
      },
    ],
  },
];

const imageCredits = [
  ["國立臺灣歷史博物館", "https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E7%AB%8B%E8%87%BA%E7%81%A3%E6%AD%B7%E5%8F%B2%E5%8D%9A%E7%89%A9%E9%A4%A8_01.jpg"],
  ["台南安平街屋", "https://commons.wikimedia.org/wiki/File:Anping_Taiwan_Old-houses-of-Anping-01.jpg"],
  ["台南牛肉湯", "https://commons.wikimedia.org/wiki/File:16-%E5%8F%B0%E5%8D%97%E6%97%A9%E9%A4%90%E5%9C%8B%E8%8F%AF%E8%A1%97%E9%98%BF%E6%9D%91%E7%89%9B%E8%82%89%E6%B9%AF%EF%BC%8C%E5%8F%B0%E5%8D%97%E7%9C%9F%E5%A5%BD_(29484622036).jpg"],
  ["花園夜市", "https://commons.wikimedia.org/wiki/File:The_Garden_Night_Market_in_Tainan_2014-05-29.jpg"],
  ["丹丹漢堡", "https://commons.wikimedia.org/wiki/File:%E4%B8%B9%E4%B8%B9%E6%BC%A2%E5%A0%A1_Dain_Dain_Burger_(30841133482).jpg"],
  ["左鎮化石園區", "https://commons.wikimedia.org/wiki/File:%E8%87%BA%E5%8D%97%E5%B7%A6%E9%8E%AE%E5%8C%96%E7%9F%B3%E5%9C%92%E5%8D%80.jpg"],
  ["神農街", "https://commons.wikimedia.org/wiki/File:%E7%A5%9E%E8%BE%B2%E8%A1%97_Shennong_Street_Tainan_City02.jpg"],
  ["新社採菇", "https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E4%B8%AD%E6%96%B0%E7%A4%BE%E6%8E%A1%E8%8F%87.jpg"],
  ["逢甲夜市", "https://commons.wikimedia.org/wiki/File:1_fengjia_night_market_2019.jpg"],
  ["旅宿情境", "https://commons.wikimedia.org/wiki/File:Guest_Room_in_22F_Shangri-La%27s_Far_Eastern_Plaza_Hotel,_Tainan_01_20260324.jpg"],
  ["台灣公路", "https://commons.wikimedia.org/wiki/File:202603_Town_entrance_of_Hukou_Township_,Hsinchu_County_TW_PHW1.jpg"],
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function PinIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const [shareLabel, setShareLabel] = useState("分享行程");
  const touchStart = useRef<number | null>(null);
  const itineraryRef = useRef<HTMLElement>(null);
  const day = days[activeDay];

  useEffect(() => {
    const match = window.location.hash.match(/day-(\d)/);
    let frame = 0;
    if (match) {
      const value = Number(match[1]) - 1;
      if (value >= 0 && value < days.length) {
        frame = window.requestAnimationFrame(() => setActiveDay(value));
      }
    }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") changeDay(Math.min(activeDay + 1, 3));
      if (event.key === "ArrowLeft") changeDay(Math.max(activeDay - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeDay]);

  const totalStops = useMemo(
    () => days.reduce((count, current) => count + current.stops.length, 0),
    [],
  );

  function changeDay(index: number, scroll = true) {
    setActiveDay(index);
    window.history.replaceState(null, "", `#day-${index + 1}`);
    if (scroll) {
      window.setTimeout(
        () => itineraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        30,
      );
    }
  }

  async function shareTrip() {
    const shareData = {
      title: "中南部四天三夜小旅行",
      text: `Day ${activeDay + 1}｜${day.theme}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareLabel("連結已複製");
        window.setTimeout(() => setShareLabel("分享行程"), 1800);
      }
    } catch {
      // The user can dismiss the native share sheet without showing an error.
    }
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 55) {
      if (distance < 0 && activeDay < 3) changeDay(activeDay + 1, false);
      if (distance > 0 && activeDay > 0) changeDay(activeDay - 1, false);
    }
    touchStart.current = null;
  }

  return (
    <main>
      <header className="hero">
        <img
          className="hero-image"
          src={`${basePath}/og.jpg`}
          alt="中南部四天三夜小旅行插畫，串連台南老街與台中山城"
        />
        <div className="hero-shade" />
        <nav className="topbar" aria-label="網站導覽">
          <a className="brand" href="#top" aria-label="回到頁首">
            <span className="brand-mark">遊</span>
            <span>南行手帖</span>
          </a>
          <button className="share-button" type="button" onClick={shareTrip}>
            {shareLabel} <span aria-hidden="true">↗</span>
          </button>
        </nav>
        <div id="top" className="hero-content">
          <p className="eyebrow">TAIWAN ROAD TRIP · 4 DAYS</p>
          <h1>中南部<br />四天三夜小旅行</h1>
          <p className="hero-copy">台南・台中｜一路吃，一路慢慢走</p>
          <div className="trip-facts" aria-label="行程摘要">
            <span><strong>4</strong> 天</span>
            <span><strong>3</strong> 夜</span>
            <span><strong>{totalStops}</strong> 站</span>
            <span><strong>2</strong> 城</span>
          </div>
        </div>
        <div className="scroll-cue"><span />往下看行程</div>
      </header>

      <div className="day-dock-wrap">
        <nav className="day-dock" aria-label="快速切換每天行程">
          {days.map((item, index) => (
            <button
              key={item.number}
              className={index === activeDay ? "active" : ""}
              type="button"
              aria-pressed={index === activeDay}
              onClick={() => changeDay(index)}
            >
              <small>DAY</small>
              <strong>0{item.number}</strong>
              <span>{item.city}</span>
            </button>
          ))}
        </nav>
      </div>

      <section
        ref={itineraryRef}
        className={`itinerary theme-${day.accent}`}
        aria-live="polite"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <div className="day-heading">
          <div className="day-number">0{day.number}</div>
          <div>
            <p className="day-route">DAY {day.number} · {day.city}</p>
            <h2>{day.theme}</h2>
            <p>{day.subtitle}</p>
          </div>
        </div>

        <div className="swipe-hint" aria-hidden="true">← 左右滑動切換日期 →</div>

        <div className="timeline">
          {day.stops.map((stop, index) => (
            <article className="stop-card" key={`${day.number}-${stop.time}-${stop.title}`}>
              <div className="stop-image-wrap">
                <img
                  className="stop-image"
                  src={`${basePath}${stop.image}`}
                  alt={stop.imageAlt}
                  loading={index > 1 ? "lazy" : "eager"}
                />
                <span className="stop-badge">{stop.badge}</span>
              </div>
              <div className="stop-body">
                <div className="stop-meta-top">
                  <span className="period">{stop.period}</span>
                  <time>{stop.time}</time>
                </div>
                <h3>{stop.title}</h3>
                <div className="chips">
                  <span>⌖ {stop.area}</span>
                  <span>費用 {stop.cost}</span>
                </div>
                <p className="stop-note">{stop.note}</p>
                {stop.mapQuery && (
                  <a
                    className="map-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`在 Google 地圖查看 ${stop.title}`}
                  >
                    地圖導航 <PinIcon />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="day-controls">
          <button
            type="button"
            disabled={activeDay === 0}
            onClick={() => changeDay(activeDay - 1)}
          >
            <span aria-hidden="true">←</span>
            <span><small>上一天</small>{activeDay > 0 ? days[activeDay - 1].theme : "已是第一天"}</span>
          </button>
          <button
            type="button"
            disabled={activeDay === 3}
            onClick={() => changeDay(activeDay + 1)}
          >
            <span><small>下一天</small>{activeDay < 3 ? days[activeDay + 1].theme : "旅程完成"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <aside className="travel-note">
        <p className="eyebrow">BEFORE YOU GO</p>
        <h2>出發前，留一點彈性給旅行。</h2>
        <p>票價、店休日與營業時間可能調整；尤其花園夜市、餐廳與選物店，建議出發前一天再看官方最新公告。國道車程也請依當日路況預留緩衝。</p>
      </aside>

      <footer>
        <div>
          <span className="brand-mark">遊</span>
          <p><strong>南行手帖</strong><br />四天三夜，一路好好玩。</p>
        </div>
        <details>
          <summary>照片來源與授權資訊</summary>
          <p>景點與情境照片取自 Wikimedia Commons；各照片授權依原始頁面標示。分享封面為本站專屬生成圖像。</p>
          <ul>
            {imageCredits.map(([label, url]) => (
              <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>
            ))}
          </ul>
        </details>
        <p className="copyright">Made for a slow & delicious road trip · 2026</p>
      </footer>
    </main>
  );
}
