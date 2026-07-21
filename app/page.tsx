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
    theme: "溫體牛・法老展・古城夜色",
    subtitle: "一路南下先吃湖東牛肉館，再走進奇美博物館的古埃及世界，晚上繼續台南散策。",
    accent: "brick",
    stops: [
      {
        period: "上午",
        time: "08:00 — 11:15",
        title: "台北五股出發 → 湖東牛肉館",
        area: "國道 1 號・高雄湖內",
        cost: "—",
        note: "直接前往高雄湖內。途中可在泰安或西螺服務區短暫休息，抵達前留意國道與台 1 線即時路況。",
        image: "/images/taiwan-road.jpg",
        imageAlt: "從五股南下前往高雄湖內的公路旅行",
        mapQuery: "五股區到湖東牛肉館",
        badge: "出發",
      },
      {
        period: "上午",
        time: "11:15 — 12:45",
        title: "湖東牛肉館・午餐",
        area: "高雄市湖內區",
        cost: "約 $800／人・依點餐",
        note: "品嚐台南直送溫體牛火鍋。店家午間營業至 13:30、週一公休且採現金付款，熱門時段建議先完成訂位。",
        image: "/images/hudong-beef.jpg",
        imageAlt: "湖東牛肉館的新鮮溫體牛肉盤",
        mapQuery: "湖東牛肉館 高雄市湖內區中山路一段107號",
        badge: "必比登",
      },
      {
        period: "下午",
        time: "13:15 — 16:15",
        title: "奇美博物館・《埃及之王：法老》",
        area: "仁德區",
        cost: "全票 $580・優惠票 $480",
        note: "大英博物館 × 奇美博物館特展，集結 280 件古埃及文物。展期至 2027/01/10，購票需指定日期；週三休館。",
        image: "/images/chimei-pharaoh.jpg",
        imageAlt: "奇美博物館埃及之王法老特展展場",
        mapQuery: "奇美博物館 台南市仁德區文華路二段66號",
        badge: "年度特展",
      },
      {
        period: "下午",
        time: "16:40 — 17:20",
        title: "安全帽店",
        area: "東門路二段",
        cost: "依消費而定",
        note: "營業時間 13:00–21:30。先確認尺寸與配戴舒適度，再挑喜歡的款式與鏡片。",
        image: "/images/helmet-shop.jpg",
        imageAlt: "陳列各式機車安全帽的專賣店",
        mapQuery: "台南市東門路二段 安全帽店",
        badge: "採買",
      },
      {
        period: "傍晚",
        time: "17:40 — 18:10",
        title: "心宅 Check-in・稍作休息",
        area: "安平／中西區",
        cost: "已預訂",
        note: "先辦理入住、放行李。補水休息一下，傍晚再輕裝出門。",
        image: "/images/heart-guesthouse.jpg",
        imageAlt: "台南心宅老屋民宿",
        mapQuery: "台南 心宅 住宿",
        badge: "入住",
      },
      {
        period: "晚上",
        time: "18:30 — 19:30",
        title: "文章牛肉湯・安平店",
        area: "安平區",
        cost: "依點餐而定",
        note: "午餐已吃牛肉火鍋，這一站建議少量分食牛肉湯與熱炒；若還不餓，也可視當天狀況彈性縮短。",
        image: "/images/wenzhang-beef-soup.jpg",
        imageAlt: "台南文章牛肉湯安平店",
        mapQuery: "文章牛肉湯 安平店",
        badge: "台南味",
      },
      {
        period: "晚上",
        time: "20:00 — 21:00",
        title: "神農街夜間漫步",
        area: "中西區",
        cost: "—",
        note: "晚餐後到神農街慢慢散步，欣賞老屋、燈籠與入夜後的街景。若當天較疲累，也可彈性縮短停留時間。",
        image: "/images/shennong-street.jpg",
        imageAlt: "燈籠映照的台南神農街夜景",
        mapQuery: "台南神農街",
        badge: "夜間散策",
      },
    ],
  },
  {
    number: 2,
    city: "台南慢遊",
    theme: "化石探險・選物・花園夜市",
    subtitle: "早餐吃得像台南人，午後留給化石、冰品與器皿美學，晚上再用花園夜市收尾。",
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
        image: "/images/yongle-market.jpg",
        imageAlt: "台南國華街永樂市場美食街區",
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
        image: "/images/luzao-tableware.jpg",
        imageAlt: "台南餐桌上的鹿早老屋器皿選物店",
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
        image: "/images/28-the-loft.jpg",
        imageAlt: "台南 28 The Loft 客房實景",
        mapQuery: "28 The Loft 台南",
        badge: "入住",
      },
      {
        period: "晚上",
        time: "20:00 — 21:30",
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
        image: "/images/sweet-moon-gelato.jpg",
        imageAlt: "台中審計新村甜月亮義大利手工冰淇淋",
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
        image: "/images/explore-hotel.jpg",
        imageAlt: "台中探索私旅飯店外觀",
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
        image: "/images/laojing-bbq.jpg",
        imageAlt: "台中老井極上燒肉福科店",
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
    theme: "睡飽・午餐・飛行體驗",
    subtitle: "最後一天睡飽再吃午餐，到中央公園體驗飛行後，帶著旅行的餘韻輕鬆回家。",
    accent: "blue",
    stops: [
      {
        period: "上午",
        time: "11:00 — 11:30",
        title: "探索私旅 Check-out",
        area: "西屯區",
        cost: "—",
        note: "檢查充電器、冰箱與浴室小物，行李上車後準備享用回程前的午餐。",
        image: "/images/explore-hotel.jpg",
        imageAlt: "台中探索私旅飯店外觀",
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
        image: "/images/noodle-lunch.jpg",
        imageAlt: "台中麵由辛生南屯店麻辣麵食",
        mapQuery: "麵由辛生 南屯店",
        badge: "二選一",
      },
      {
        period: "下午",
        time: "13:45 — 15:15",
        title: "中央公園遊客中心・飛行體驗館",
        area: "西屯區",
        cost: "免費參觀",
        note: "遊客中心 09:00–17:00 開放。館內特色飛航館以實體 737 客機打造座艙，還有航空展示與互動體驗；出發前可再確認當日設施公告。",
        image: "/images/central-park-flight.jpg",
        imageAlt: "台中中央公園遊客中心特色飛航館的飛機座艙體驗空間",
        mapQuery: "台中中央公園遊客中心 中科路2966號",
        badge: "飛行體驗",
      },
      {
        period: "下午",
        time: "15:30 — 18:00",
        title: "輕鬆北上返家・五股",
        area: "國道北上",
        cost: "—",
        note: "結束豐富的四天三夜。若精神或路況需要，服務區停一次也比硬撐更快樂。",
        image: "/images/taiwan-road.jpg",
        imageAlt: "晴朗的台灣公路回家路上",
        mapQuery: "台中中央公園遊客中心到五股區",
        badge: "平安回家",
      },
    ],
  },
];

const imageCredits = [
  ["國華街永樂市場", "https://marketoffice.tainan.gov.tw/News_Content.aspx?n=44648&s=8749104"],
  ["湖東牛肉館", "https://curly.com.tw/beefpot/"],
  ["奇美博物館《埃及之王：法老》", "https://www.chimeimuseum.org/news/6979c778ee209/detail"],
  ["心宅", "https://www.dearbnb.com/zh/bnb/made-in-heart-guesthouse/"],
  ["文章牛肉湯", "https://www.bigfang.tw/blog/post/winchangbeef-main-tainan"],
  ["花園夜市", "https://commons.wikimedia.org/wiki/File:The_Garden_Night_Market_in_Tainan_2014-05-29.jpg"],
  ["丹丹漢堡", "https://commons.wikimedia.org/wiki/File:%E4%B8%B9%E4%B8%B9%E6%BC%A2%E5%A0%A1_Dain_Dain_Burger_(30841133482).jpg"],
  ["左鎮化石園區", "https://commons.wikimedia.org/wiki/File:%E8%87%BA%E5%8D%97%E5%B7%A6%E9%8E%AE%E5%8C%96%E7%9F%B3%E5%9C%92%E5%8D%80.jpg"],
  ["餐桌上的鹿早", "https://flower033880.pixnet.net/blog/posts/8232819060"],
  ["28 The Loft", "https://life.tw/?app=view&no=1318980"],
  ["神農街", "https://commons.wikimedia.org/wiki/File:%E7%A5%9E%E8%BE%B2%E8%A1%97_Shennong_Street_Tainan_City02.jpg"],
  ["新社採菇", "https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E4%B8%AD%E6%96%B0%E7%A4%BE%E6%8E%A1%E8%8F%87.jpg"],
  ["甜月亮 Gelato", "https://baofamily.tw/dlgelato/"],
  ["探索私旅", "https://ericgo.com/taiwan-taichung-explorehotel/"],
  ["老井燒肉福科店", "https://supertaste.tvbs.com.tw/food/354114"],
  ["逢甲夜市", "https://commons.wikimedia.org/wiki/File:1_fengjia_night_market_2019.jpg"],
  ["麵由辛生南屯店", "https://footinder.com.tw/%E5%8F%B0%E4%B8%AD%E5%B8%82%E5%8D%97%E5%B1%AF%E5%8D%80/137095/"],
  ["中央公園遊客中心特色飛航館", "https://www.taichung.gov.tw/8868/8872/9962/3215831"],
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
          <p>景點照片取自政府、旅宿與旅遊媒體公開頁面及 Wikimedia Commons；各照片權利依原始頁面標示。安全帽店情境與分享封面為本站專屬生成圖像。</p>
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
