import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, Plus, X, Search, Bot, Send, Settings, Bell, User, HelpCircle,
  MapPin, Gauge, Maximize2, ChevronRight, RefreshCw,
  Thermometer, Check, Loader2, Trash2, Navigation,
  Droplets, Sunrise, Sunset, LocateFixed, Wind, Compass,
  Sun, Moon, CloudRain, ShieldAlert, Sparkles, Activity, Eye
} from 'lucide-react';
import './styles.css';

/* ------------------------------------------------------------------ */
/* Illustrated weather icons                                          */
/* ------------------------------------------------------------------ */

function IconBase({ size, className, children, viewBox = '0 0 64 64' }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

const cloudPuff = (fill, stroke) => (
  <path
    d="M18 44c-6.6 0-12-5.2-12-11.6 0-6 4.6-11 10.6-11.6C18.6 14.4 25 9.5 32.5 9.5c8 0 14.8 5.6 16.3 13.1 6 .8 10.7 5.9 10.7 12 0 6.7-5.6 12.2-12.5 12.2H18z"
    fill={fill}
    stroke={stroke}
    strokeWidth="1.6"
    strokeLinejoin="round"
  />
);

function SunIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <g stroke="#FFA733" strokeWidth="3.2" strokeLinecap="round">
        <path d="M32 4v6M32 54v6M60 32h-6M10 32H4M51.5 12.5l-4.2 4.2M16.7 47.3l-4.2 4.2M51.5 51.5l-4.2-4.2M16.7 16.7l-4.2-4.2" />
      </g>
      <circle cx="32" cy="32" r="15" fill="#FFC64B" stroke="#FFA733" strokeWidth="1.5" />
    </IconBase>
  );
}

function MoonIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path d="M42 8a22 22 0 1 0 14 39.4A22 22 0 0 1 42 8z" fill="#B9C6E8" stroke="#8FA0D6" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="24" r="2.4" fill="#8FA0D6" />
      <circle cx="40" cy="36" r="1.6" fill="#8FA0D6" />
    </IconBase>
  );
}

function CloudIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      {cloudPuff('#EAF1FB', '#B9CEEC')}
    </IconBase>
  );
}

function CloudSunIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <g stroke="#FFA733" strokeWidth="2.6" strokeLinecap="round">
        <path d="M44 8v4.5M60 24h-4.5M27 14l3.2 3.2M56.8 14l-3.2 3.2" />
      </g>
      <circle cx="44" cy="24" r="10.5" fill="#FFC64B" stroke="#FFA733" strokeWidth="1.5" />
      <path d="M14 48c-5.7 0-10.4-4.5-10.4-10 0-5.2 4-9.5 9.2-10 1.1-6.5 6.8-11.4 13.7-11.4 6.9 0 12.7 4.8 13.9 11.2 5.2.7 9.2 5.1 9.2 10.4 0 5.8-4.8 10.5-10.8 10.5H14z" fill="#F3F7FC" stroke="#C4D2E6" strokeWidth="1.5" strokeLinejoin="round" />
    </IconBase>
  );
}

function CloudMoonIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path d="M50 8a13 13 0 1 0 8.3 23A13 13 0 0 1 50 8z" fill="#C7D2EE" stroke="#9AABDA" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14 48c-5.7 0-10.4-4.5-10.4-10 0-5.2 4-9.5 9.2-10 1.1-6.5 6.8-11.4 13.7-11.4 6.9 0 12.7 4.8 13.9 11.2 5.2.7 9.2 5.1 9.2 10.4 0 5.8-4.8 10.5-10.8 10.5H14z" fill="#F3F7FC" stroke="#C4D2E6" strokeWidth="1.5" strokeLinejoin="round" />
    </IconBase>
  );
}

function CloudFogIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path d="M18 38c-6.1 0-11-4.7-11-10.5 0-5.4 4.2-9.9 9.6-10.4C17.5 11 23.4 6.5 30.4 6.5c7.2 0 13.3 5 14.7 11.8 5.4.7 9.6 5.3 9.6 10.8 0 3.2-1.4 6-3.7 8H18z" fill="#DCE4F0" stroke="#B7C4DB" strokeWidth="1.5" strokeLinejoin="round" />
      <g stroke="#8FA0C4" strokeWidth="3.2" strokeLinecap="round">
        <path d="M10 44h44M14 51h36M18 58h28" />
      </g>
    </IconBase>
  );
}

function CloudDrizzleIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      {cloudPuff('#EAF1FA', '#C4D2E6')}
      <g stroke="#5B9CF2" strokeWidth="3" strokeLinecap="round">
        <path d="M22 50l-2 4M32 50l-2 4M42 50l-2 4" />
      </g>
    </IconBase>
  );
}

function CloudRainIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      {cloudPuff('#E6EEFA', '#C4D2E6')}
      <g stroke="#38BDF8" strokeWidth="3.4" strokeLinecap="round">
        <path d="M20 49l-3 7M32 49l-3 7M44 49l-3 7" />
      </g>
    </IconBase>
  );
}

function CloudRainWindIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      {cloudPuff('#DDE8FA', '#B6C7E4')}
      <g stroke="#3B82F6" strokeWidth="3.4" strokeLinecap="round">
        <path d="M18 48l-4 8M28 48l-4 8M38 48l-4 8M48 48l-3 6" />
      </g>
      <path d="M6 20h10M4 26h7" stroke="#B6C7E4" strokeWidth="2.4" strokeLinecap="round" />
    </IconBase>
  );
}

function CloudSnowIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      {cloudPuff('#EEF3FB', '#C4D2E6')}
      <g fill="#9DC0F0">
        <circle cx="20" cy="52" r="2.6" /><circle cx="32" cy="55" r="2.6" /><circle cx="44" cy="52" r="2.6" />
      </g>
    </IconBase>
  );
}

function CloudLightningIcon({ size = 24, className = '' }) {
  return (
    <IconBase size={size} className={className}>
      <path d="M18 40c-6.1 0-11-4.7-11-10.5 0-5.4 4.2-9.9 9.6-10.4C17.5 13 23.4 8.5 30.4 8.5c7.2 0 13.3 5 14.7 11.8 5.4.7 9.6 5.3 9.6 10.8 0 5.4-4.5 9.9-10.1 9.9H18z" fill="#D9E1F5" stroke="#AFC0E2" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 40l-7 12h6l-3 10 11-14h-6l4-8z" fill="#FFC64B" stroke="#FFA733" strokeWidth="1.2" strokeLinejoin="round" />
    </IconBase>
  );
}

const ICONS = {
  Sun: SunIcon, Moon: MoonIcon, CloudSun: CloudSunIcon, CloudMoon: CloudMoonIcon,
  Cloud: CloudIcon, CloudFog: CloudFogIcon, CloudDrizzle: CloudDrizzleIcon,
  CloudRain: CloudRainIcon, CloudRainWind: CloudRainWindIcon, CloudSnow: CloudSnowIcon,
  CloudLightning: CloudLightningIcon
};

const WMAP = {
  0: { label: 'Clear Sky', day: 'Sun', night: 'Moon' },
  1: { label: 'Mainly Clear', day: 'Sun', night: 'Moon' },
  2: { label: 'Partly Cloudy', day: 'CloudSun', night: 'CloudMoon' },
  3: { label: 'Overcast', day: 'Cloud', night: 'Cloud' },
  45: { label: 'Foggy', day: 'CloudFog', night: 'CloudFog' },
  48: { label: 'Depositing Rime Fog', day: 'CloudFog', night: 'CloudFog' },
  51: { label: 'Light Drizzle', day: 'CloudDrizzle', night: 'CloudDrizzle' },
  53: { label: 'Moderate Drizzle', day: 'CloudDrizzle', night: 'CloudDrizzle' },
  55: { label: 'Dense Drizzle', day: 'CloudDrizzle', night: 'CloudDrizzle' },
  56: { label: 'Light Freezing Drizzle', day: 'CloudDrizzle', night: 'CloudDrizzle' },
  57: { label: 'Dense Freezing Drizzle', day: 'CloudDrizzle', night: 'CloudDrizzle' },
  61: { label: 'Slight Rain', day: 'CloudRain', night: 'CloudRain' },
  63: { label: 'Moderate Rain', day: 'CloudRain', night: 'CloudRain' },
  65: { label: 'Heavy Rain', day: 'CloudRainWind', night: 'CloudRainWind' },
  66: { label: 'Light Freezing Rain', day: 'CloudRain', night: 'CloudRain' },
  67: { label: 'Heavy Freezing Rain', day: 'CloudRain', night: 'CloudRain' },
  71: { label: 'Slight Snow Fall', day: 'CloudSnow', night: 'CloudSnow' },
  73: { label: 'Moderate Snow Fall', day: 'CloudSnow', night: 'CloudSnow' },
  75: { label: 'Heavy Snow Fall', day: 'CloudSnow', night: 'CloudSnow' },
  77: { label: 'Snow Grains', day: 'CloudSnow', night: 'CloudSnow' },
  80: { label: 'Slight Rain Showers', day: 'CloudRain', night: 'CloudRain' },
  81: { label: 'Moderate Rain Showers', day: 'CloudRain', night: 'CloudRain' },
  82: { label: 'Violent Rain Showers', day: 'CloudRainWind', night: 'CloudRainWind' },
  85: { label: 'Slight Snow Showers', day: 'CloudSnow', night: 'CloudSnow' },
  86: { label: 'Heavy Snow Showers', day: 'CloudSnow', night: 'CloudSnow' },
  95: { label: 'Thunderstorm', day: 'CloudLightning', night: 'CloudLightning' },
  96: { label: 'Thunderstorm with Slight Hail', day: 'CloudLightning', night: 'CloudLightning' },
  99: { label: 'Thunderstorm with Heavy Hail', day: 'CloudLightning', night: 'CloudLightning' }
};

const DEFAULT_CITY = { id: 'newyork', name: 'New York', admin1: 'NY', country: 'United States', lat: 40.7128, lon: -74.006 };
const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const round = (n) => Math.round(Number(n || 0));
const conditionOf = (code, isDay) => WMAP[code] || WMAP[isDay ? 1 : 0];
const iconFor = (code, isDay) => ICONS[conditionOf(code, isDay)[isDay ? 'day' : 'night']] || CloudIcon;
const degToCompass = (deg) => COMPASS[Math.round((Number(deg || 0) % 360) / 22.5) % 16];
const hpaToInHg = (hpa) => (Number(hpa || 0) * 0.02953).toFixed(2);
const cityKey = (c) => c.id || `${c.lat.toFixed(2)},${c.lon.toFixed(2)}`;

function weekdayLabel(dateStr, idx) {
  if (idx === 0) return 'Today';
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function timeLabel(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '--';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function hourLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric' }).replace(' ', '');
}

function generateSmartAdvice(weather) {
  if (!weather || !weather.current) return 'Weather telemetry synchronized.';
  const cur = weather.current;
  const today = weather.daily[0];
  const precip = today?.precipChance || 0;

  if (cur.code >= 95) return 'Severe thunderstorm activity reported. Keep indoors and stay safe!';
  if (precip >= 70) return `High probability of rain (${precip}%). Bring an umbrella when stepping out.`;
  if (precip >= 40) return `Light rain or showers likely (${precip}% chance). Carry a jacket just in case.`;
  if (cur.uv >= 8) return `Very high UV Index (${cur.uv}). Wear sunscreen SPF 30+ and UV-blocking sunglasses.`;
  if (cur.humidity >= 85) return `High moisture level (${round(cur.humidity)}%). Humid atmosphere — remember to stay hydrated!`;
  if (cur.windSpeed >= 40) return `Strong gusts detected (${round(cur.windSpeed)} ${weather.unit === 'metric' ? 'km/h' : 'mph'}). Drive carefully outdoors.`;
  if (cur.temperature >= 35 && weather.unit === 'metric') return 'Sweltering summer heat! Avoid intense midday outdoor activity.';
  if (cur.temperature <= 5 && weather.unit === 'metric') return 'Chilly temperature outside. Layer up with warm attire, scarf, and gloves.';
  return 'Ideal atmospheric conditions — perfect time for outdoor activities and fresh air.';
}

/* ------------------------------------------------------------------ */
/* Live data (Open-Meteo)                                             */
/* ------------------------------------------------------------------ */

async function geocodeCity(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Search failed');
  const j = await r.json();
  return (j.results || []).map(res => ({
    id: `${res.id}`,
    name: res.name,
    admin1: res.admin1 || '',
    country: res.country || '',
    lat: res.latitude,
    lon: res.longitude
  }));
}

async function fetchForecast(lat, lon, unit) {
  const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';
  const windUnit = unit === 'metric' ? 'kmh' : 'mph';
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max',
    timezone: 'auto',
    forecast_days: 10,
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit
  });
  const r = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!r.ok) throw new Error('Forecast request failed');
  return r.json();
}

function normalizeWeather(raw, city, unit) {
  const now = new Date();
  const nowHourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);
  const hourlyTimes = raw.hourly?.time || [];
  let nowIdx = hourlyTimes.findIndex(t => new Date(t) >= nowHourStart);
  if (nowIdx < 0) nowIdx = 0;

  const hourly = hourlyTimes.slice(nowIdx, nowIdx + 24).map((t, i) => {
    const idx = nowIdx + i;
    return {
      time: t,
      label: i === 0 ? 'Now' : hourLabel(t),
      temp: raw.hourly.temperature_2m[idx],
      code: raw.hourly.weather_code[idx],
      isDay: raw.hourly.is_day[idx] === 1,
      precipChance: raw.hourly.precipitation_probability?.[idx] ?? 0
    };
  });

  const precipWindowLabels = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const precipWindows = precipWindowLabels.map((label, w) => {
    const slice = hourlyTimes.slice(nowIdx + w * 6, nowIdx + w * 6 + 6);
    const probs = slice.map((_, i) => raw.hourly.precipitation_probability?.[nowIdx + w * 6 + i] ?? 0);
    const max = probs.length ? Math.max(...probs) : 0;
    return { label, chance: max };
  });

  const daily = (raw.daily?.time || []).map((d, i) => ({
    date: d,
    label: weekdayLabel(d, i),
    code: raw.daily.weather_code[i],
    high: raw.daily.temperature_2m_max[i],
    low: raw.daily.temperature_2m_min[i],
    precipChance: raw.daily.precipitation_probability_max?.[i] ?? 0,
    sunrise: timeLabel(raw.daily.sunrise[i]),
    sunset: timeLabel(raw.daily.sunset[i]),
    rawSunrise: raw.daily.sunrise[i],
    rawSunset: raw.daily.sunset[i],
    uvMax: raw.daily.uv_index_max?.[i] ?? null,
    isWeekend: [0, 6].includes(new Date(`${d}T00:00:00`).getDay())
  }));

  const cur = raw.current || {};
  const cond = conditionOf(cur.weather_code, cur.is_day === 1);

  return {
    city: city.name,
    admin1: city.admin1,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
    timezone: raw.timezone,
    tzAbbr: raw.timezone_abbreviation,
    unit,
    fetchedAt: Date.now(),
    current: {
      temperature: cur.temperature_2m,
      feelsLike: cur.apparent_temperature,
      humidity: cur.relative_humidity_2m,
      windSpeed: cur.wind_speed_10m,
      windDir: degToCompass(cur.wind_direction_10m),
      windDeg: cur.wind_direction_10m,
      pressure: hpaToInHg(cur.surface_pressure),
      hpa: cur.surface_pressure,
      uv: cur.uv_index ?? (daily[0]?.uvMax ?? 0),
      condition: cond.label,
      code: cur.weather_code,
      isDay: cur.is_day === 1
    },
    hourly,
    precipWindows,
    daily
  };
}

/* ------------------------------------------------------------------ */
/* Dynamic Weather Sky & Particle Background                          */
/* ------------------------------------------------------------------ */

function skyVariant(code, isDay) {
  if (isDay === false) return 'night';
  if (code === 0 || code === 1) return 'clear';
  if (code === 2 || code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code >= 71 && code <= 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'clear';
}

function DynamicSky({ code, isDay = true }) {
  const variant = skyVariant(code, isDay);

  const rainDrops = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.1 + (i % 5) * 2)}%`,
      delay: `${(i * 0.06) % 1.2}s`,
      duration: `${0.55 + (i % 4) * 0.12}s`
    }));
  }, []);

  const snowFlakes = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2 + (i % 4) * 3)}%`,
      delay: `${(i * 0.25) % 3.5}s`,
      duration: `${3.2 + (i % 3)}s`,
      size: `${4 + (i % 4)}px`
    }));
  }, []);

  return (
    <div className={`rw-sky variant-${variant}`} aria-hidden="true">
      <div className="rw-sky-ambient-1" />
      <div className="rw-sky-ambient-2" />
      <div className="rw-sky-ambient-3" />
      <div className="rw-stars-layer" />

      {/* Weather condition ambient overlay effects */}
      {variant === 'clear' && isDay && <div className="rw-sun-rays" />}
      {variant === 'storm' && <div className="rw-lightning-flash" />}

      {/* Rain drop particles */}
      <div className="rw-rain-particles">
        {rainDrops.map(d => (
          <div
            key={d.id}
            className="rw-drop"
            style={{ left: d.left, animationDelay: d.delay, animationDuration: d.duration }}
          />
        ))}
      </div>

      {/* Snow flake particles */}
      <div className="rw-snow-particles">
        {snowFlakes.map(s => (
          <div
            key={s.id}
            className="rw-flake"
            style={{ left: s.left, animationDelay: s.delay, animationDuration: s.duration, width: s.size, height: s.size }}
          />
        ))}
      </div>

      {/* Subtle Skyline Vector */}
      <svg className="rw-skyline-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <g fill="rgba(255, 255, 255, 0.12)">
          <rect x="40" y="150" width="70" height="170" rx="3" />
          <rect x="120" y="110" width="85" height="210" rx="3" />
          <rect x="220" y="170" width="60" height="150" rx="3" />
          <rect x="290" y="90" width="95" height="230" rx="3" />
          <rect x="400" y="140" width="75" height="180" rx="3" />
          <rect x="490" y="120" width="110" height="200" rx="3" />
          <rect x="620" y="70" width="80" height="250" rx="3" />
          <rect x="715" y="150" width="90" height="170" rx="3" />
          <rect x="820" y="100" width="75" height="220" rx="3" />
          <rect x="910" y="130" width="105" height="190" rx="3" />
          <rect x="1030" y="80" width="85" height="240" rx="3" />
          <rect x="1130" y="140" width="95" height="180" rx="3" />
          <rect x="1240" y="110" width="80" height="210" rx="3" />
          <rect x="1335" y="160" width="80" height="160" rx="3" />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Condition Icon Component                                           */
/* ------------------------------------------------------------------ */

function ConditionIcon({ code, isDay, size = 24, className = '' }) {
  const Icon = iconFor(code, isDay);
  return <Icon size={size} className={className} />;
}

/* ------------------------------------------------------------------ */
/* Daylight Sun Arc Tracker Widget                                    */
/* ------------------------------------------------------------------ */

function DaylightArc({ sunrise, sunset, rawSunrise, rawSunset }) {
  const progress = useMemo(() => {
    if (!rawSunrise || !rawSunset) return 0.5;
    const now = Date.now();
    const rise = new Date(rawSunrise).getTime();
    const set = new Date(rawSunset).getTime();
    if (now <= rise) return 0;
    if (now >= set) return 1;
    return (now - rise) / (set - rise);
  }, [rawSunrise, rawSunset]);

  // SVG arc calculation (semi-ellipse)
  const cx = 150, cy = 60, rx = 130, ry = 48;
  const angle = Math.PI - progress * Math.PI;
  const sunX = cx + rx * Math.cos(angle);
  const sunY = cy - ry * Math.sin(angle);

  return (
    <div className="rw-sun-arc-wrap">
      <svg className="rw-sun-arc-svg" viewBox="0 0 300 70">
        <path
          d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="3"
          strokeDasharray="4 4"
        />
        <path
          d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${sunX} ${sunY}`}
          fill="none"
          stroke="url(#sunGrad)"
          strokeWidth="3.5"
        />
        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx={sunX} cy={sunY} r="7" fill="#FFC64B" stroke="#FFA733" strokeWidth="2" filter="drop-shadow(0 0 6px #f59e0b)" />
      </svg>
      <div className="rw-sun-times-row">
        <div className="rw-sun-time-box">
          <Sunrise size={18} />
          <div>
            <b>{sunrise || '--:--'}</b>
            <small>Sunrise</small>
          </div>
        </div>
        <div className="rw-sun-time-box" style={{ textAlign: 'right' }}>
          <Sunset size={18} />
          <div>
            <b>{sunset || '--:--'}</b>
            <small>Sunset</small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7-Day Forecast with Range Bars (Apple Weather Style)              */
/* ------------------------------------------------------------------ */

function WeeklyForecastCard({ daily, unit }) {
  const list = daily.slice(0, 7);
  const u = '°';

  const { minTemp, maxTemp } = useMemo(() => {
    let min = Infinity, max = -Infinity;
    list.forEach(d => {
      if (d.low < min) min = d.low;
      if (d.high > max) max = d.high;
    });
    if (min === max) { min -= 1; max += 1; }
    return { minTemp: min, maxTemp: max };
  }, [list]);

  const totalRange = maxTemp - minTemp || 1;

  return (
    <div className="rw-card">
      <div className="rw-card-header">
        <div className="rw-card-title">
          <Activity size={15} /> 7-Day Outlook
        </div>
        <span className="rw-card-extra">Min / Max</span>
      </div>

      <div className="rw-daily-list">
        {list.map((d, i) => {
          const leftPct = Math.max(0, ((d.low - minTemp) / totalRange) * 100);
          const widthPct = Math.max(8, ((d.high - d.low) / totalRange) * 100);

          return (
            <div className={`rw-daily-row ${i === 0 ? 'today' : ''}`} key={d.date}>
              <span className="rw-daily-day">{d.label}</span>
              <div className="rw-daily-icon">
                <ConditionIcon code={d.code} isDay={true} size={20} />
              </div>
              <span className="rw-daily-precip">{d.precipChance > 10 ? `${d.precipChance}%` : ''}</span>
              <div className="rw-range-bar-track">
                <div
                  className="rw-range-bar-fill"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </div>
              <span className="rw-daily-high-num">{round(d.high)}{u}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hourly Forecast Strip                                              */
/* ------------------------------------------------------------------ */

function HourlyForecastCard({ hourly, unit }) {
  const u = '°';
  return (
    <div className="rw-card">
      <div className="rw-card-header">
        <div className="rw-card-title">
          <Sparkles size={15} /> Hourly Forecast
        </div>
        <span className="rw-card-extra">Next 24 Hours</span>
      </div>

      <div className="rw-hourly-scroll">
        {hourly.map((h, i) => (
          <div className={`rw-hourly-item ${i === 0 ? 'now' : ''}`} key={h.time + i}>
            <span className="rw-hourly-time">{h.label}</span>
            <ConditionIcon code={h.code} isDay={h.isDay} size={22} />
            <span className="rw-hourly-temp">{round(h.temp)}{u}</span>
            <span className="rw-hourly-precip">
              {h.precipChance > 0 ? (
                <>
                  <Droplets size={10} />
                  {h.precipChance}%
                </>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive Wind & Compass Radar Card                              */
/* ------------------------------------------------------------------ */

function WindCompassCard({ current, unit }) {
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  const speedKmh = unit === 'metric' ? current.windSpeed : current.windSpeed * 1.60934;

  let windLevel = 'Calm';
  if (speedKmh >= 62) windLevel = 'Gale Warning';
  else if (speedKmh >= 39) windLevel = 'Strong Winds';
  else if (speedKmh >= 20) windLevel = 'Fresh Breeze';
  else if (speedKmh >= 6) windLevel = 'Light Breeze';

  return (
    <div className="rw-card">
      <div className="rw-card-header">
        <div className="rw-card-title">
          <Wind size={15} /> Wind Telemetry
        </div>
        <span className="rw-wind-badge">{windLevel}</span>
      </div>

      <div className="rw-wind-content">
        <div className="rw-wind-compass-dial">
          <span className="rw-compass-point n">N</span>
          <span className="rw-compass-point e">E</span>
          <span className="rw-compass-point s">S</span>
          <span className="rw-compass-point w">W</span>
          <Navigation
            size={32}
            className="rw-compass-needle"
            style={{ transform: `rotate(${current.windDeg || 0}deg)` }}
          />
        </div>

        <div className="rw-wind-stats">
          <div className="rw-wind-big-value">
            {round(current.windSpeed)}<small>{speedUnit}</small>
          </div>
          <div className="rw-wind-detail">
            Blowing from <b>{current.windDir}</b> ({current.windDeg}°)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mini Widgets Grid (Air Quality, Humidity, UV, Barometer, Sun Arc) */
/* ------------------------------------------------------------------ */

function MiniWidgetsGrid({ current, precipWindows, daily, onExpandMap, mapSrc }) {
  const uvVal = current.uv || 0;
  const uvDesc = uvVal <= 2 ? 'Low' : uvVal <= 5 ? 'Moderate' : uvVal <= 7 ? 'High' : uvVal <= 10 ? 'Very High' : 'Extreme';
  const humidityVal = round(current.humidity);
  const humDesc = humidityVal >= 80 ? 'Very Humid' : humidityVal >= 60 ? 'Sticky' : humidityVal >= 40 ? 'Comfortable' : 'Dry';

  // Air Quality Score estimation
  const aqiScore = Math.min(100, Math.max(18, Math.round(30 + (100 - humidityVal) * 0.35)));
  const aqiDesc = aqiScore <= 50 ? 'Good' : aqiScore <= 100 ? 'Moderate' : 'Unhealthy';
  const aqiColor = aqiScore <= 50 ? 'var(--accent-emerald)' : aqiScore <= 100 ? 'var(--accent-gold)' : 'var(--accent-rose)';

  return (
    <div className="rw-mini-grid">
      {/* Air Quality Card */}
      <div className="rw-mini-card">
        <div className="rw-mini-head">
          <span>Air Quality</span>
          <Activity size={14} style={{ color: aqiColor }} />
        </div>
        <div className="rw-mini-val" style={{ color: aqiColor }}>{aqiScore} <span style={{ fontSize: '13px', fontWeight: 600 }}>AQI</span></div>
        <div className="rw-progress-bar">
          <div className="rw-progress-fill" style={{ width: `${Math.min(100, (aqiScore / 100) * 100)}%`, background: aqiColor }} />
        </div>
        <span className="rw-mini-sub">{aqiDesc} air quality rating</span>
      </div>

      {/* Humidity Card */}
      <div className="rw-mini-card">
        <div className="rw-mini-head">
          <span>Humidity</span>
          <Droplets size={14} style={{ color: 'var(--accent-sky)' }} />
        </div>
        <div className="rw-mini-val">{humidityVal}%</div>
        <div className="rw-progress-bar">
          <div className="rw-progress-fill" style={{ width: `${Math.min(100, humidityVal)}%` }} />
        </div>
        <span className="rw-mini-sub">{humDesc} comfort level</span>
      </div>

      {/* UV Index Card */}
      <div className="rw-mini-card">
        <div className="rw-mini-head">
          <span>UV Index</span>
          <Sun size={14} style={{ color: 'var(--accent-gold)' }} />
        </div>
        <div className="rw-mini-val">{uvVal} <span style={{ fontSize: '13px', fontWeight: 600 }}>/ 11</span></div>
        <div className="rw-progress-bar">
          <div
            className="rw-progress-fill"
            style={{
              width: `${Math.min(100, (uvVal / 11) * 100)}%`,
              background: uvVal > 6 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #f59e0b)'
            }}
          />
        </div>
        <span className="rw-mini-sub">{uvDesc} sun exposure risk</span>
      </div>

      {/* Barometer Card */}
      <div className="rw-mini-card">
        <div className="rw-mini-head">
          <span>Pressure</span>
          <Gauge size={14} style={{ color: 'var(--accent-cyan)' }} />
        </div>
        <div className="rw-mini-val">{current.pressure} <span style={{ fontSize: '13px', fontWeight: 500 }}>inHg</span></div>
        <span className="rw-mini-sub">{round(current.hpa)} hPa · Steady</span>
      </div>

      {/* Sun Arc Mini Card */}
      <div className="rw-mini-card rw-mini-card-wide">
        <div className="rw-mini-head">
          <span>Sun Timeline</span>
          <Sunrise size={14} style={{ color: 'var(--accent-gold)' }} />
        </div>
        <DaylightArc
          sunrise={daily[0]?.sunrise}
          sunset={daily[0]?.sunset}
          rawSunrise={daily[0]?.rawSunrise}
          rawSunset={daily[0]?.rawSunset}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Precipitation Windows Card                                         */
/* ------------------------------------------------------------------ */

function PrecipitationCard({ precipWindows }) {
  return (
    <div className="rw-card">
      <div className="rw-card-header">
        <div className="rw-card-title">
          <CloudRain size={15} /> Precipitation Probability
        </div>
        <span className="rw-card-extra">Today's Windows</span>
      </div>
      <div className="rw-precip-bars">
        {precipWindows.map(p => (
          <div className="rw-precip-col" key={p.label}>
            <span className="rw-precip-pct">{p.chance}%</span>
            <Droplets size={16} style={{ color: p.chance > 30 ? 'var(--accent-sky)' : 'var(--text-dim)' }} />
            <span className="rw-precip-label">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive Live Map Card                                          */
/* ------------------------------------------------------------------ */

function LiveMapCard({ mapSrc, onExpandMap, cityName }) {
  return (
    <div className="rw-card rw-map-card">
      <div className="rw-card-header">
        <div className="rw-card-title">
          <MapPin size={15} /> Live Radar &amp; Region
        </div>
        <span className="rw-card-extra">{cityName}</span>
      </div>
      <div className="rw-map-frame">
        <iframe title="Location map" src={mapSrc} loading="lazy" />
        <button className="rw-map-expand-btn" onClick={onExpandMap}>
          <Maximize2 size={12} /> Expand
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modals & Shared UI Components                                      */
/* ------------------------------------------------------------------ */

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="rw-toast">
      <div className="rw-toast-icon"><Check size={14} /></div>
      <div>
        <b style={{ fontSize: '13px', display: 'block', color: '#fff' }}>{toast.title}</b>
        <small style={{ color: 'var(--text-secondary)', fontSize: '11.5px' }}>{toast.text}</small>
      </div>
    </div>
  );
}

function Modal({ title, subtitle, onClose, children, wide = false }) {
  return (
    <div className="rw-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className={`rw-modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true">
        <div className="rw-modal-head">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="rw-icon-btn" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="rw-modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search Modal                                                       */
/* ------------------------------------------------------------------ */

function SearchModal({ onClose, onPick }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const r = await geocodeCity(q.trim());
        setResults(r);
        setErr(r.length ? '' : 'No matching cities found.');
      } catch {
        setErr('Search failed — check your connection.');
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(timer.current);
  }, [q]);

  return (
    <Modal title="Search Global Cities" subtitle="Search any city or region worldwide for live real-time forecast." onClose={onClose}>
      <div className="rw-search-box">
        <Search size={18} style={{ color: 'var(--accent-sky)' }} />
        <input autoFocus placeholder="e.g. Lahore, Tokyo, London, New York…" value={q} onChange={e => setQ(e.target.value)} />
        {loading && <Loader2 className="rw-spin" size={18} style={{ color: 'var(--accent-gold)' }} />}
      </div>
      {err && <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '14px', textAlign: 'center' }}>{err}</div>}
      <div className="rw-search-results">
        {results.map(c => (
          <button key={c.id} className="rw-search-result" onClick={() => onPick(c)}>
            <MapPin size={16} style={{ color: 'var(--accent-sky)' }} />
            <div>
              <b>{c.name}</b>
              <small>{[c.admin1, c.country].filter(Boolean).join(', ')}</small>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--text-dim)' }} />
          </button>
        ))}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar Drawer                                                     */
/* ------------------------------------------------------------------ */

function Sidebar({ open, onClose, cities, activeId, onSelect, onRemove, onOpenSearch, onNav }) {
  return (
    <>
      <div className={`rw-drawer-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`rw-drawer ${open ? 'open' : ''}`}>
        <div className="rw-drawer-head">
          <b style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CloudSunIcon size={20} /> Weather Hub
          </b>
          <button className="rw-icon-btn small" onClick={onClose}><X size={16} /></button>
        </div>

        <button className="rw-drawer-search" onClick={onOpenSearch}>
          <Search size={15} /> Search new location…
        </button>

        <div className="rw-drawer-section">Saved Cities</div>
        <div className="rw-drawer-list">
          {cities.map(c => (
            <div
              className={`rw-drawer-city ${cityKey(c) === activeId ? 'active' : ''}`}
              key={cityKey(c)}
              onClick={() => onSelect(c)}
            >
              <MapPin size={15} style={{ color: 'var(--accent-sky)' }} />
              <div>
                <b>{c.name}</b>
                <small>{[c.admin1, c.country].filter(Boolean).join(', ')}</small>
              </div>
              {cities.length > 1 && (
                <button
                  className="rw-icon-btn small"
                  onClick={(e) => { e.stopPropagation(); onRemove(c); }}
                  aria-label="Remove city"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="rw-drawer-nav">
          <button onClick={() => onNav('settings')}><Settings size={16} /> Preferences &amp; Units</button>
          <button onClick={() => onNav('notifications')}><Bell size={16} /> Rain Alerts &amp; Activity</button>
          <button onClick={() => onNav('help')}><HelpCircle size={16} /> AI Assistant Guide</button>
          <button onClick={() => onNav('profile')}><User size={16} /> Workspace Profile</button>
        </div>
      </aside>
    </>
  );
}

function renderFormattedText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={idx} className="rw-msg-list-item">
          {content}
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={idx} className="rw-msg-spacer" />;
    }
    return <div key={idx}>{content}</div>;
  });
}

/* ------------------------------------------------------------------ */
/* AI Chat Assistant Widget                                           */
/* ------------------------------------------------------------------ */

function ChatWidget({ open, setOpen, messages, input, setInput, onSend, loading }) {
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  const quickPrompts = [
    'Will it rain today? ☔',
    'What should I wear? 🧣',
    'Weekend forecast? 📅',
    'Safe for outdoor sports? 🏃'
  ];

  return (
    <>
      <button className="rw-chat-fab" onClick={() => setOpen(v => !v)} aria-label="Toggle weather assistant">
        <div className="rw-chat-pulse" />
        {open ? <X size={24} /> : <Bot size={24} />}
      </button>

      {open && (
        <div className="rw-chat-panel">
          <div className="rw-chat-head">
            <div className="rw-chat-brand-info">
              <div className="rw-chat-avatar"><Bot size={18} /></div>
              <div>
                <b>Weather AI Assistant</b>
                <small>Powered by live weather intelligence</small>
              </div>
            </div>
            <button className="rw-icon-btn small" onClick={() => setOpen(false)}><X size={15} /></button>
          </div>

          <div className="rw-chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`rw-msg ${m.role}`}>
                {m.role === 'bot' ? renderFormattedText(m.text) : m.text}
              </div>
            ))}
            {loading && (
              <div className="rw-msg bot rw-typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="rw-chat-suggestions">
            {quickPrompts.map((q, i) => (
              <button key={i} className="rw-suggestion-chip" onClick={() => onSend(q)}>
                {q}
              </button>
            ))}
          </div>

          <form className="rw-chat-input-form" onSubmit={e => { e.preventDefault(); onSend(input); }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about rain, outfit, UV index…"
            />
            <button type="submit" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Main Application Component                                         */
/* ------------------------------------------------------------------ */

function App() {
  const [cities, setCities] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rw-cities') || 'null') || [DEFAULT_CITY]; }
    catch { return [DEFAULT_CITY]; }
  });
  const [activeId, setActiveId] = useState(() => localStorage.getItem('rw-active') || cityKey(DEFAULT_CITY));
  const [unit, setUnit] = useState(() => localStorage.getItem('rw-unit') || 'metric');
  const [weatherByCity, setWeatherByCity] = useState({});
  const [loadingActive, setLoadingActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [clockTick, setClockTick] = useState(0);
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rw-notifications') || '[]'); } catch { return []; }
  });

  const activeCity = useMemo(() => cities.find(c => cityKey(c) === activeId) || cities[0], [cities, activeId]);
  const weather = weatherByCity[activeId];

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! 👋 I am your Weather AI Assistant. Ask me anything about current conditions, rain forecasts, clothing advice, or weekend outdoor plans!' }
  ]);

  const notify = useCallback((title, text) => {
    setToast({ title, text });
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => setToast(null), 3200);
  }, []);

  const addNotification = useCallback((title, text) => {
    const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title, text, time: new Date().toISOString(), read: false };
    setNotifications(prev => [item, ...prev].slice(0, 20));
  }, []);

  useEffect(() => { localStorage.setItem('rw-cities', JSON.stringify(cities)); }, [cities]);
  useEffect(() => { localStorage.setItem('rw-active', activeId); }, [activeId]);
  useEffect(() => { localStorage.setItem('rw-unit', unit); }, [unit]);
  useEffect(() => { localStorage.setItem('rw-notifications', JSON.stringify(notifications)); }, [notifications]);

  useEffect(() => {
    const t = setInterval(() => setClockTick(x => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  // Global Keyboard Shortcut (⌘K or Ctrl+K) for City Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const clockFor = useCallback((w) => {
    if (!w) return '';
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: w.timezone, hour: 'numeric', minute: '2-digit' }).format(new Date());
      return `${parts} ${w.tzAbbr || ''}`.trim();
    } catch { return ''; }
  }, []);

  const loadCity = useCallback(async (city, { silent } = {}) => {
    const key = cityKey(city);
    if (!silent) setLoadingActive(true);
    try {
      const raw = await fetchForecast(city.lat, city.lon, unit);
      const norm = normalizeWeather(raw, city, unit);
      setWeatherByCity(prev => ({ ...prev, [key]: norm }));
      if (norm.precipWindows.some(p => p.chance >= 60) && !silent) {
        addNotification('Rain likely soon', `${norm.city} has high rain probability in coming hours.`);
      }
      return norm;
    } catch (e) {
      notify('Unable to fetch weather', 'Check connection and try refreshing.');
    } finally {
      if (!silent) setLoadingActive(false);
    }
  }, [unit, notify, addNotification]);

  useEffect(() => {
    if (activeCity) loadCity(activeCity);
  }, [activeId, unit, activeCity, loadCity]);

  useEffect(() => {
    const t = setInterval(() => { if (activeCity) loadCity(activeCity, { silent: true }); }, 10 * 60 * 1000);
    return () => clearInterval(t);
  }, [activeCity, loadCity]);

  const selectCity = (city) => {
    const key = cityKey(city);
    setActiveId(key);
    setSidebarOpen(false);
    notify(`Switched to ${city.name}`, 'Loading live conditions.');
  };

  const addCity = (city) => {
    const key = cityKey(city);
    setCities(prev => (prev.some(c => cityKey(c) === key) ? prev : [...prev, { ...city, id: key }]));
    setActiveId(key);
    setSearchOpen(false);
    setSidebarOpen(false);
    notify('Location added', `${city.name} added to saved locations.`);
  };

  const removeCity = (city) => {
    const key = cityKey(city);
    setCities(prev => {
      const next = prev.filter(c => cityKey(c) !== key);
      if (activeId === key && next.length) setActiveId(cityKey(next[0]));
      return next;
    });
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return notify('Not supported', 'Geolocation not available in this browser.');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const city = { id: `me-${latitude.toFixed(2)}-${longitude.toFixed(2)}`, name: 'My Location', admin1: '', country: '', lat: latitude, lon: longitude };
      addCity(city);
    }, () => notify('Location unavailable', 'Could not read device location.'));
  };

  const localAnswerClient = useCallback((message, w) => {
    const q = String(message || '').trim().toLowerCase();
    const c = w?.current || {};
    const daily = w?.daily || [];
    const city = w?.city || 'your location';
    const isMetric = w?.unit === 'metric';
    const tempU = isMetric ? '°C' : '°F';
    const speedU = isMetric ? 'km/h' : 'mph';
    const today = daily[0];
    const tomorrow = daily[1];
    const rnd = n => Math.round(Number(n || 0));

    if (/umbrella|rain|precipitation/i.test(q)) {
      const chance = today?.precipChance ?? 0;
      if (chance >= 60) return `☔ **Yes, definitely bring an umbrella.** There is a **${chance}% chance of rain** in ${city} today.`;
      if (chance >= 30) return `🌦️ **Rain is possible (${chance}%)** in ${city} today. Having a compact umbrella on hand is recommended.`;
      return `☀️ **No umbrella needed today!** Only a **${chance}% chance of precipitation** in ${city}.`;
    }

    if (/wear|outfit|jacket|coat|clothes|dress/i.test(q)) {
      const feels = rnd(c.feelsLike);
      let outfit = '';
      if (feels <= 0) outfit = 'Heavy winter parka, gloves, and thermal layers.';
      else if (feels <= 12) outfit = 'A warm jacket, sweater, and long trousers.';
      else if (feels <= 22) outfit = 'Light jacket, hoodie, or long-sleeve shirt.';
      else if (feels <= 28) outfit = 'T-shirt and comfortable trousers or shorts.';
      else outfit = 'Lightweight, breathable cotton or linen clothing, sunglasses, and plenty of water.';
      return `👕 **Outfit suggestion for ${city} (${rnd(c.temperature)}${tempU}, feels like ${feels}${tempU}):**\n\n${outfit}`;
    }

    if (/temp|how hot|how cold/i.test(q)) {
      return `🌡️ Currently in **${city}**: **${rnd(c.temperature)}${tempU}** (feels like **${rnd(c.feelsLike)}${tempU}**). Today's High: **${rnd(today?.high)}${tempU}** · Low: **${rnd(today?.low)}${tempU}**.`;
    }

    if (/wind/i.test(q)) {
      return `💨 Wind in **${city}**: **${rnd(c.windSpeed)} ${speedU}** from **${c.windDir}** (${c.windDeg}°).`;
    }

    if (/weekend|saturday|sunday/i.test(q)) {
      const wd = daily.filter(d => d.isWeekend).slice(0, 2);
      if (!wd.length) return `Weekend forecast data is loading for ${city}.`;
      const lines = wd.map(d => `• **${d.label}:** ${rnd(d.high)}${tempU} / ${rnd(d.low)}${tempU} (${d.precipChance}% rain)`).join('\n');
      return `📅 **Weekend Outlook for ${city}:**\n\n${lines}`;
    }

    return `🌤️ **${city} Weather Summary:** ${c.condition || 'Clear'}, **${rnd(c.temperature)}${tempU}** (feels like ${rnd(c.feelsLike)}${tempU}), 💧 ${rnd(c.humidity)}% humidity, 💨 ${rnd(c.windSpeed)} ${speedU} wind.`;
  }, []);

  const sendChat = async (text) => {
    const trimmed = String(text || '').trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');
    setChatLoading(true);

    try {
      let reply = null;
      try {
        const r = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(10000),
          body: JSON.stringify({ message: trimmed, weather })
        });
        if (r.ok) {
          const j = await r.json();
          reply = j.reply || null;
        }
      } catch {}

      if (!reply) {
        reply = localAnswerClient(trimmed, weather);
      }
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: localAnswerClient(trimmed, weather) }]);
    } finally {
      setChatLoading(false);
    }
  };

  const clock = clockFor(weather);
  const u = '°';
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  const mapSrc = weather
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${weather.lon - 0.28}%2C${weather.lat - 0.18}%2C${weather.lon + 0.28}%2C${weather.lat + 0.18}&layer=mapnik&marker=${weather.lat}%2C${weather.lon}`
    : '';

  return (
    <div className="rw-app">
      <DynamicSky code={weather?.current?.code} isDay={weather?.current?.isDay ?? true} />

      {/* Modern Glass Topbar */}
      <header className="rw-topbar">
        <div className="rw-brand-group">
          <button className="rw-icon-btn" onClick={() => setSidebarOpen(true)} aria-label="Open Menu">
            <Menu size={20} />
          </button>
          <a href="#" className="rw-brand">
            <div className="rw-brand-icon">
              <CloudSunIcon size={22} />
            </div>
            <span>Atmosphere</span>
            <span className="rw-brand-tag">PRO</span>
          </a>
        </div>

        <div className="rw-topbar-actions">
          <button className="rw-quick-search-btn" onClick={() => setSearchOpen(true)}>
            <Search size={14} />
            <span>Search city…</span>
            <kbd>⌘K</kbd>
          </button>

          {/* Unit Toggle */}
          <div className="rw-unit-toggle">
            <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>°C</button>
            <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>°F</button>
          </div>

          <button className="rw-icon-btn" onClick={useMyLocation} title="Use My Location" aria-label="Use My Location">
            <LocateFixed size={18} />
          </button>

          <button className="rw-icon-btn" onClick={() => setModal('notifications')} aria-label="Notifications">
            <Bell size={18} />
            {notifications.some(n => !n.read) && <span className="rw-dot-badge" />}
          </button>
        </div>
      </header>

      {/* Saved Cities Quick Pills Bar */}
      <div className="rw-cities-bar">
        {cities.map(c => {
          const isAct = cityKey(c) === activeId;
          const wData = weatherByCity[cityKey(c)];
          return (
            <button
              key={cityKey(c)}
              className={`rw-city-pill ${isAct ? 'active' : ''}`}
              onClick={() => selectCity(c)}
            >
              <MapPin size={13} style={{ color: isAct ? 'var(--accent-sky)' : 'inherit' }} />
              <span>{c.name}</span>
              {wData && <span className="rw-city-pill-temp">{round(wData.current.temperature)}{u}</span>}
            </button>
          );
        })}
        <button className="rw-add-city-pill" onClick={() => setSearchOpen(true)}>
          <Plus size={14} /> Add City
        </button>
      </div>

      {/* Main Dashboard Layout */}
      <main className="rw-dashboard-container">
        {loadingActive && !weather ? (
          <div className="rw-hero-card" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
            <Loader2 className="rw-spin" size={36} style={{ color: 'var(--accent-sky)' }} />
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Connecting to atmosphere satellites…</span>
          </div>
        ) : weather ? (
          <>
            {/* High-Impact Hero Weather Card */}
            <section className="rw-hero-card">
              <div className="rw-hero-top">
                <div className="rw-location-badge">
                  <div className="rw-location-title">
                    <MapPin size={26} /> {weather.city}
                  </div>
                  <div className="rw-location-sub">
                    <span>{[weather.admin1, weather.country].filter(Boolean).join(', ')}</span>
                    <span className="rw-time-badge"><Eye size={12} style={{ color: 'var(--accent-emerald)' }} /> {clock}</span>
                  </div>
                </div>

                <div className="rw-hero-actions">
                  <button className="rw-icon-btn" onClick={() => loadCity(activeCity)} title="Refresh Weather">
                    <RefreshCw size={17} />
                  </button>
                  <button className="rw-icon-btn" onClick={() => setModal('settings')} title="Settings">
                    <Settings size={17} />
                  </button>
                </div>
              </div>

              {/* AI Smart Insight Banner */}
              <div className="rw-ai-insight-banner">
                <div className="rw-ai-insight-icon">
                  <Sparkles size={15} />
                </div>
                <div className="rw-ai-insight-text">
                  <span className="rw-ai-insight-tag">AI SUMMARY</span>
                  <span>{generateSmartAdvice(weather)}</span>
                </div>
              </div>

              {/* Temperature, Condition, and Floating 3D Icon */}
              <div className="rw-hero-main">
                <div className="rw-temp-display-group">
                  <div className="rw-temp-big">
                    {round(weather.current.temperature)}
                    <span className="rw-temp-unit">{u}</span>
                  </div>
                  <div className="rw-temp-meta">
                    <div className="rw-condition-tag">
                      <ConditionIcon code={weather.current.code} isDay={weather.current.isDay} size={26} />
                      <span>{weather.current.condition}</span>
                    </div>
                    <div className="rw-feels-like">
                      Feels like <b>{round(weather.current.feelsLike)}{u}</b>
                    </div>
                    <div className="rw-range-pills">
                      <span className="rw-range-pill high">↑ {round(weather.daily[0]?.high)}{u} High</span>
                      <span className="rw-range-pill low">↓ {round(weather.daily[0]?.low)}{u} Low</span>
                    </div>
                  </div>
                </div>

                <div className="rw-hero-illustration">
                  <div className="rw-hero-glow-ring ring-1" />
                  <div className="rw-hero-glow-ring ring-2" />
                  <div className="rw-hero-icon-wrap">
                    <ConditionIcon code={weather.current.code} isDay={weather.current.isDay} size={116} />
                  </div>
                </div>
              </div>

              {/* Quick Summary Metrics Bar */}
              <div className="rw-hero-metrics">
                <div className="rw-metric-chip">
                  <div className="rw-metric-icon cyan"><Droplets size={18} /></div>
                  <div className="rw-metric-info">
                    <span>Humidity</span>
                    <b>{round(weather.current.humidity)}%</b>
                  </div>
                </div>
                <div className="rw-metric-chip">
                  <div className="rw-metric-icon blue"><Wind size={18} /></div>
                  <div className="rw-metric-info">
                    <span>Wind Speed</span>
                    <b>{round(weather.current.windSpeed)} {speedUnit}</b>
                  </div>
                </div>
                <div className="rw-metric-chip">
                  <div className="rw-metric-icon gold"><Sun size={18} /></div>
                  <div className="rw-metric-info">
                    <span>UV Index</span>
                    <b>{weather.current.uv} ({weather.current.uv <= 2 ? 'Low' : weather.current.uv <= 5 ? 'Mod' : 'High'})</b>
                  </div>
                </div>
                <div className="rw-metric-chip">
                  <div className="rw-metric-icon violet"><Gauge size={18} /></div>
                  <div className="rw-metric-info">
                    <span>Pressure</span>
                    <b>{weather.current.pressure} inHg</b>
                  </div>
                </div>
              </div>
            </section>

            {/* Bento Grid */}
            <div className="rw-bento-grid">
              {/* Left Bento Column */}
              <div className="rw-bento-col">
                <HourlyForecastCard hourly={weather.hourly} unit={unit} />
                <WeeklyForecastCard daily={weather.daily} unit={unit} />
                <PrecipitationCard precipWindows={weather.precipWindows} />
              </div>

              {/* Right Bento Column */}
              <div className="rw-bento-col">
                <WindCompassCard current={weather.current} unit={unit} />
                <MiniWidgetsGrid
                  current={weather.current}
                  precipWindows={weather.precipWindows}
                  daily={weather.daily}
                  mapSrc={mapSrc}
                  onExpandMap={() => window.open(`https://www.openstreetmap.org/?mlat=${activeCity?.lat}&mlon=${activeCity?.lon}#map=11/${activeCity?.lat}/${activeCity?.lon}`, '_blank')}
                />
                <LiveMapCard
                  mapSrc={mapSrc}
                  cityName={weather.city}
                  onExpandMap={() => window.open(`https://www.openstreetmap.org/?mlat=${activeCity?.lat}&mlon=${activeCity?.lon}#map=11/${activeCity?.lat}/${activeCity?.lon}`, '_blank')}
                />
              </div>
            </div>
          </>
        ) : null}
      </main>

      {/* Navigation Drawer */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        cities={cities}
        activeId={activeId}
        onSelect={selectCity}
        onRemove={removeCity}
        onOpenSearch={() => { setSidebarOpen(false); setSearchOpen(true); }}
        onNav={(id) => { setSidebarOpen(false); setModal(id); }}
      />

      {/* City Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onPick={addCity} />}

      {/* Settings Modal */}
      {modal === 'settings' && (
        <Modal title="Preferences & Units" subtitle="Personalize your weather experience." onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Thermometer size={20} style={{ color: 'var(--accent-sky)' }} />
                <div>
                  <b style={{ fontSize: '14px', display: 'block' }}>Measurement System</b>
                  <small style={{ color: 'var(--text-muted)' }}>°C (km/h) or °F (mph)</small>
                </div>
              </div>
              <div className="rw-unit-toggle">
                <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')}>Metric</button>
                <button className={unit === 'imperial' ? 'active' : ''} onClick={() => setUnit('imperial')}>Imperial</button>
              </div>
            </div>

            <button
              onClick={() => { if (activeCity) loadCity(activeCity); notify('Refreshed', 'Latest conditions fetched.'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <RefreshCw size={20} style={{ color: 'var(--accent-gold)' }} />
                <div style={{ textAlign: 'left' }}>
                  <b style={{ fontSize: '14px', display: 'block' }}>Sync Live Data</b>
                  <small style={{ color: 'var(--text-muted)' }}>Force update satellite telemetry</small>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)' }}>SYNC</span>
            </button>
          </div>
        </Modal>
      )}

      {/* Notifications Modal */}
      {modal === 'notifications' && (
        <Modal
          title="Weather Alerts"
          subtitle="Precipitation alerts and activity history."
          onClose={() => { setModal(null); setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
                <Bell size={24} style={{ color: 'var(--text-dim)', marginBottom: '8px' }} />
                <h4 style={{ color: '#fff', fontSize: '15px' }}>No Active Weather Alerts</h4>
                <p style={{ fontSize: '13px' }}>You will receive real-time notices when precipitation or storms approach.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-sky)', marginTop: '6px' }} />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#fff', display: 'block' }}>{n.title}</b>
                    <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{n.text}</span>
                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                      {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>
      )}

      {/* Help Modal */}
      {modal === 'help' && (
        <Modal title="Atmosphere Center" subtitle="Smart features & keyboard navigation." onClose={() => setModal(null)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)' }}>
              <Bot size={18} style={{ color: 'var(--accent-gold)', marginBottom: '6px' }} />
              <b style={{ display: 'block', fontSize: '13.5px' }}>AI Weather Intelligence</b>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Ask open questions about rain timing, outfit choices, or weekend plans.</p>
            </div>
            <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)' }}>
              <Search size={18} style={{ color: 'var(--accent-sky)', marginBottom: '6px' }} />
              <b style={{ display: 'block', fontSize: '13.5px' }}>Multi-City Hub</b>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Switch between your saved cities with 1 click from the top pill bar.</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Profile Modal */}
      {modal === 'profile' && (
        <Modal title="Workspace Profile" subtitle="Active dashboard configuration." onClose={() => setModal(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-sky))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '20px',
                color: '#fff'
              }}
            >
              A
            </div>
            <div>
              <h4 style={{ fontSize: '16px', color: '#fff' }}>Atmosphere Workspace</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Saved Locations: {cities.length} cities</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Floating AI Assistant Chat */}
      <ChatWidget
        open={chatOpen}
        setOpen={setChatOpen}
        messages={messages}
        input={chatInput}
        setInput={setChatInput}
        onSend={sendChat}
        loading={chatLoading}
      />

      <Toast toast={toast} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
