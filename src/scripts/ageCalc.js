/**
 * ageCalc.js — Core Age Calculation Engine
 * agecalconline.com
 */

// ─── Primary Age Calculation ───────────────────────────────
export function calculateAge(dob) {
  const now = new Date();
  const birth = new Date(dob);
  if (isNaN(birth.getTime()) || birth > now) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalMs = now - birth;
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const totalDays    = Math.floor(totalHours / 24);
  const totalWeeks   = Math.floor(totalDays / 7);
  const totalMonths  = years * 12 + months;

  return {
    years, months, days,
    totalDays, totalWeeks, totalMonths,
    totalHours, totalMinutes, totalSeconds,
    totalMs, birthDate: birth, now
  };
}

// ─── Next Birthday ─────────────────────────────────────────
export function getNextBirthday(dob) {
  const birth = new Date(dob);
  const now = new Date();
  const thisYear = now.getFullYear();

  let next = new Date(thisYear, birth.getMonth(), birth.getDate());
  if (next <= now) next = new Date(thisYear + 1, birth.getMonth(), birth.getDate());

  const msUntil = next - now;
  const daysUntil = Math.floor(msUntil / 86400000);
  const hoursUntil = Math.floor((msUntil % 86400000) / 3600000);
  const minutesUntil = Math.floor((msUntil % 3600000) / 60000);

  const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months   = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  // Was today birthday?
  const isToday = now.getDate() === birth.getDate() && now.getMonth() === birth.getMonth();

  // Count birthdays celebrated
  const celebrated = now.getFullYear() - birth.getFullYear() - (
    (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) ? 1 : 0
  );

  // Is birth year a leap year?
  const birthIsLeap = isLeapYear(birth.getFullYear());
  // Is this birthday year a leap year?
  const nextIsLeap = isLeapYear(next.getFullYear());

  return {
    date: next,
    weekday: weekdays[next.getDay()],
    monthName: months[next.getMonth()],
    day: next.getDate(),
    year: next.getFullYear(),
    daysUntil, hoursUntil, minutesUntil,
    isToday, celebrated, birthIsLeap, nextIsLeap
  };
}

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

// ─── Milestones ────────────────────────────────────────────
export function getMilestones(dob) {
  const birth = new Date(dob);
  const now = new Date();

  const milestones = [
    { label: '1 Million Minutes', icon: '⏱️', seconds: 1_000_000 * 60 },
    { label: '10,000 Days', icon: '📅', seconds: 10_000 * 86400 },
    { label: '500 Million Seconds', icon: '💫', seconds: 500_000_000 },
    { label: '1 Billion Seconds', icon: '🚀', seconds: 1_000_000_000 },
    { label: '1 Million Hours', icon: '⏰', seconds: 1_000_000 * 3600 },
    { label: '50,000 Days', icon: '🌟', seconds: 50_000 * 86400 },
    { label: '100 Years', icon: '🎉', seconds: 100 * 365.25 * 86400 },
    { label: '1 Trillion Seconds', icon: '🌌', seconds: 1_000_000_000_000 },
  ];

  return milestones.map(m => {
    const milestoneDate = new Date(birth.getTime() + m.seconds * 1000);
    const isPast = milestoneDate <= now;
    const daysAway = Math.abs(Math.round((milestoneDate - now) / 86400000));
    return { ...m, date: milestoneDate, isPast, daysAway };
  }).sort((a, b) => a.date - b.date);
}

// ─── Planetary Age ─────────────────────────────────────────
export function getPlanetaryAge(totalDays) {
  const planets = [
    { name: 'Mercury', symbol: '☿', orbitalDays: 87.97,  emoji: '⚫', color: '#9ca3af' },
    { name: 'Venus',   symbol: '♀', orbitalDays: 224.70, emoji: '🟡', color: '#f59e0b' },
    { name: 'Mars',    symbol: '♂', orbitalDays: 686.97, emoji: '🔴', color: '#ef4444' },
    { name: 'Jupiter', symbol: '♃', orbitalDays: 4332.59,emoji: '🟠', color: '#f97316' },
    { name: 'Saturn',  symbol: '♄', orbitalDays: 10759.22,emoji:'🪐', color: '#eab308' },
    { name: 'Uranus',  symbol: '♅', orbitalDays: 30685.4,emoji: '🔵', color: '#06b6d4' },
    { name: 'Neptune', symbol: '♆', orbitalDays: 60190.0,emoji: '🔵', color: '#3b82f6' },
  ];
  return planets.map(p => ({
    ...p,
    age: (totalDays / p.orbitalDays).toFixed(2),
    ageInt: Math.floor(totalDays / p.orbitalDays)
  }));
}

// ─── Life Statistics ───────────────────────────────────────
export function getLifeStats(totalDays, totalSeconds) {
  const heartbeats = Math.floor(totalSeconds * 1.17); // ~70 bpm avg
  const breaths    = Math.floor(totalSeconds * 0.27); // ~16 per min
  const steps      = Math.floor(totalDays * 7500);
  const meals      = Math.floor(totalDays * 3);
  const sleepHours = Math.floor(totalDays * 8);
  const blinks     = Math.floor(totalSeconds * 0.28); // ~17/min avg
  const distanceKm = Math.floor(totalDays * 5.6);    // avg 5.6km/day
  const wordsSpoken= Math.floor(totalDays * 16000);   // ~16k words/day

  return [
    { label: 'Heartbeats', value: heartbeats, icon: '❤️', unit: 'beats' },
    { label: 'Breaths Taken', value: breaths, icon: '💨', unit: 'breaths' },
    { label: 'Steps Walked', value: steps, icon: '👣', unit: 'steps' },
    { label: 'Meals Eaten', value: meals, icon: '🍽️', unit: 'meals' },
    { label: 'Hours Slept', value: sleepHours, icon: '😴', unit: 'hours' },
    { label: 'Blinks', value: blinks, icon: '👁️', unit: 'blinks' },
    { label: 'Distance Walked', value: distanceKm, icon: '🚶', unit: 'km' },
    { label: 'Words Spoken', value: wordsSpoken, icon: '💬', unit: 'words' },
  ];
}

// ─── Generation ────────────────────────────────────────────
export function getGeneration(year) {
  const generations = [
    {
      name: 'Gen Alpha', range: '2013–2025', years: [2013, 2025],
      emoji: '🤖', color: '#7928ca',
      fact: 'The first generation to grow up entirely with touchscreens and AI assistants.'
    },
    {
      name: 'Gen Z', range: '1997–2012', years: [1997, 2012],
      emoji: '📱', color: '#0070f3',
      fact: 'Digital natives who came of age during the rise of social media and streaming.'
    },
    {
      name: 'Millennial', range: '1981–1996', years: [1981, 1996],
      emoji: '💻', color: '#50e3c2',
      fact: 'The generation that bridged the analog and digital worlds.'
    },
    {
      name: 'Gen X', range: '1965–1980', years: [1965, 1980],
      emoji: '🎸', color: '#f5a623',
      fact: 'Independent, resourceful, and skeptical — the "forgotten" generation.'
    },
    {
      name: 'Baby Boomer', range: '1946–1964', years: [1946, 1964],
      emoji: '🌸', color: '#ff0080',
      fact: 'Born during post-WWII economic prosperity, the largest generation.'
    },
    {
      name: 'Silent Generation', range: '1928–1945', years: [1928, 1945],
      emoji: '🌍', color: '#888888',
      fact: 'Grew up during WWII, known for civic responsibility and loyalty.'
    },
  ];
  return generations.find(g => year >= g.years[0] && year <= g.years[1]) || generations[generations.length - 1];
}

// ─── Western Zodiac ────────────────────────────────────────
export function getWesternZodiac(month, day) {
  const signs = [
    { name: 'Capricorn', emoji: '♑', dates: 'Dec 22 – Jan 19', element: 'Earth', trait: 'Disciplined & ambitious' },
    { name: 'Aquarius',  emoji: '♒', dates: 'Jan 20 – Feb 18', element: 'Air',   trait: 'Innovative & independent' },
    { name: 'Pisces',    emoji: '♓', dates: 'Feb 19 – Mar 20', element: 'Water', trait: 'Compassionate & artistic' },
    { name: 'Aries',     emoji: '♈', dates: 'Mar 21 – Apr 19', element: 'Fire',  trait: 'Courageous & energetic' },
    { name: 'Taurus',    emoji: '♉', dates: 'Apr 20 – May 20', element: 'Earth', trait: 'Reliable & patient' },
    { name: 'Gemini',    emoji: '♊', dates: 'May 21 – Jun 20', element: 'Air',   trait: 'Versatile & curious' },
    { name: 'Cancer',    emoji: '♋', dates: 'Jun 21 – Jul 22', element: 'Water', trait: 'Intuitive & nurturing' },
    { name: 'Leo',       emoji: '♌', dates: 'Jul 23 – Aug 22', element: 'Fire',  trait: 'Confident & creative' },
    { name: 'Virgo',     emoji: '♍', dates: 'Aug 23 – Sep 22', element: 'Earth', trait: 'Analytical & meticulous' },
    { name: 'Libra',     emoji: '♎', dates: 'Sep 23 – Oct 22', element: 'Air',   trait: 'Diplomatic & fair' },
    { name: 'Scorpio',   emoji: '♏', dates: 'Oct 23 – Nov 21', element: 'Water', trait: 'Passionate & resourceful' },
    { name: 'Sagittarius',emoji:'♐', dates: 'Nov 22 – Dec 21', element: 'Fire',  trait: 'Adventurous & optimistic' },
  ];
  const m = month, d = day;
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return signs[0];
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return signs[1];
  if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return signs[2];
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return signs[3];
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return signs[4];
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return signs[5];
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return signs[6];
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return signs[7];
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return signs[8];
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return signs[9];
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return signs[10];
  return signs[11];
}

// ─── Chinese Zodiac ────────────────────────────────────────
export function getChineseZodiac(year) {
  const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
  const emojis  = ['🐀','🐂','🐅','🐇','🐉','🐍','🐎','🐑','🐒','🐓','🐕','🐖'];
  const traits  = ['Clever','Diligent','Brave','Kind','Majestic','Wise','Free','Gentle','Smart','Confident','Loyal','Generous'];
  const idx = (year - 1900) % 12;
  return { animal: animals[idx], emoji: emojis[idx], trait: traits[idx], year };
}

// ─── Birthstone & Birth Flower ─────────────────────────────
export function getBirthInfo(month) {
  const data = [
    { stone: 'Garnet',     flower: 'Carnation',  stoneEmoji: '💎', flowerEmoji: '🌸' },
    { stone: 'Amethyst',   flower: 'Violet',      stoneEmoji: '💜', flowerEmoji: '💜' },
    { stone: 'Aquamarine', flower: 'Daffodil',    stoneEmoji: '💎', flowerEmoji: '🌼' },
    { stone: 'Diamond',    flower: 'Daisy',        stoneEmoji: '💎', flowerEmoji: '🌼' },
    { stone: 'Emerald',    flower: 'Lily of Valley',stoneEmoji:'💚', flowerEmoji: '🌿' },
    { stone: 'Alexandrite',flower: 'Rose',         stoneEmoji: '💎', flowerEmoji: '🌹' },
    { stone: 'Ruby',       flower: 'Larkspur',     stoneEmoji: '❤️', flowerEmoji: '💐' },
    { stone: 'Peridot',    flower: 'Gladiolus',    stoneEmoji: '💚', flowerEmoji: '💐' },
    { stone: 'Sapphire',   flower: 'Aster',        stoneEmoji: '💙', flowerEmoji: '🌸' },
    { stone: 'Opal',       flower: 'Marigold',     stoneEmoji: '💎', flowerEmoji: '🌻' },
    { stone: 'Topaz',      flower: 'Chrysanthemum',stoneEmoji: '💛', flowerEmoji: '🌼' },
    { stone: 'Turquoise',  flower: 'Narcissus',    stoneEmoji: '💎', flowerEmoji: '🌸' },
  ];
  return data[month - 1];
}

// ─── Historical Facts (birth year) ─────────────────────────
export function getHistoricalFacts(year) {
  const facts = {
    1990: { event: 'German reunification', tech: 'World Wide Web invented', movie: 'Home Alone', song: 'Nothing Compares 2 U', population: '5.3 billion' },
    1991: { event: 'USSR dissolved', tech: 'Linux created', movie: 'The Silence of the Lambs', song: 'Everything I Do, I Do It for You', population: '5.4 billion' },
    1992: { event: 'Bill Clinton elected US president', tech: 'First SMS sent', movie: 'Aladdin', song: 'End of the Road', population: '5.5 billion' },
    1993: { event: 'Oslo Accords signed', tech: 'Mosaic browser released', movie: 'Schindler\'s List', song: 'I Will Always Love You', population: '5.6 billion' },
    1994: { event: 'Nelson Mandela elected South Africa', tech: 'Amazon & Yahoo! founded', movie: 'The Lion King', song: 'The Sign', population: '5.6 billion' },
    1995: { event: 'Oklahoma City bombing', tech: 'Windows 95 released', movie: 'Toy Story', song: 'Gangsta\'s Paradise', population: '5.7 billion' },
    1996: { event: 'Dolly the sheep cloned', tech: 'Google domain registered', movie: 'Independence Day', song: 'Macarena', population: '5.8 billion' },
    1997: { event: 'Hong Kong returned to China', tech: 'Netflix founded', movie: 'Titanic', song: 'Candle in the Wind', population: '5.9 billion' },
    1998: { event: 'Clinton impeachment', tech: 'Google founded', movie: 'Saving Private Ryan', song: 'My Heart Will Go On', population: '5.9 billion' },
    1999: { event: 'Euro currency introduced', tech: 'Napster launched', movie: 'The Matrix', song: 'Believe (Cher)', population: '6.0 billion' },
    2000: { event: 'Y2K — Millennium', tech: 'USB flash drive invented', movie: 'Gladiator', song: 'Breathe', population: '6.1 billion' },
    2001: { event: 'September 11 attacks', tech: 'Wikipedia & iPod launched', movie: 'Harry Potter & Sorcerer\'s Stone', song: 'Hanging by a Moment', population: '6.2 billion' },
    2002: { event: 'Euro coins & notes in circulation', tech: 'LinkedIn founded', movie: 'Spider-Man', song: 'How You Remind Me', population: '6.2 billion' },
    2003: { event: 'Iraq War began', tech: 'MySpace & Skype launched', movie: 'Finding Nemo', song: 'In da Club', population: '6.3 billion' },
    2004: { event: 'Indian Ocean Tsunami', tech: 'Facebook & Gmail launched', movie: 'Shrek 2', song: 'Yeah!', population: '6.4 billion' },
    2005: { event: 'Hurricane Katrina', tech: 'YouTube founded', movie: 'Star Wars: Revenge of the Sith', song: 'We Belong Together', population: '6.5 billion' },
    2006: { event: 'Pluto reclassified as dwarf planet', tech: 'Twitter launched', movie: 'Pirates of the Caribbean 2', song: 'Bad Day', population: '6.6 billion' },
    2007: { event: 'iPhone introduced', tech: 'Netflix streaming began', movie: 'Spider-Man 3', song: 'Irreplaceable', population: '6.7 billion' },
    2008: { event: 'Barack Obama elected president', tech: 'App Store & Android launched', movie: 'The Dark Knight', song: 'Low', population: '6.7 billion' },
    2009: { event: 'H1N1 Swine Flu pandemic', tech: 'Bitcoin created', movie: 'Avatar', song: 'I Gotta Feeling', population: '6.8 billion' },
    2010: { event: 'Haiti earthquake', tech: 'Instagram & iPad launched', movie: 'Toy Story 3', song: 'Need You Now', population: '6.9 billion' },
    2011: { event: 'Arab Spring, Osama bin Laden killed', tech: 'Siri introduced', movie: 'Harry Potter & Deathly Hallows Part 2', song: 'Rolling in the Deep', population: '7.0 billion' },
    2012: { event: 'Sandy Hook shooting', tech: 'Instagram acquired by Facebook', movie: 'The Avengers', song: 'Somebody That I Used to Know', population: '7.1 billion' },
    2013: { event: 'Edward Snowden leaks', tech: 'Snapchat rose to fame', movie: 'Frozen', song: 'Thrift Shop', population: '7.2 billion' },
    2014: { event: 'Ebola outbreak in West Africa', tech: 'Amazon Echo announced', movie: 'Guardians of the Galaxy', song: 'Happy', population: '7.3 billion' },
    2015: { event: 'Paris terror attacks', tech: 'Apple Watch released', movie: 'Star Wars: The Force Awakens', song: 'Uptown Funk', population: '7.4 billion' },
    2016: { event: 'Brexit vote & Trump elected', tech: 'Pokemon Go launched', movie: 'Captain America: Civil War', song: 'One Dance', population: '7.4 billion' },
    2017: { event: 'Me Too movement', tech: 'iPhone X launched', movie: 'Beauty and the Beast', song: 'Shape of You', population: '7.5 billion' },
    2018: { event: 'Kavanaugh confirmation hearings', tech: 'TikTok global launch', movie: 'Avengers: Infinity War', song: 'God\'s Plan', population: '7.6 billion' },
    2019: { event: 'Notre Dame fire & Hong Kong protests', tech: '5G networks launched', movie: 'Avengers: Endgame', song: 'Old Town Road', population: '7.7 billion' },
    2020: { event: 'COVID-19 pandemic', tech: 'Zoom became ubiquitous', movie: 'Tenet', song: 'Blinding Lights', population: '7.8 billion' },
    2021: { event: 'COVID-19 vaccines rolled out', tech: 'NFT boom', movie: 'Spider-Man: No Way Home', song: 'Levitating', population: '7.9 billion' },
    2022: { event: 'Russia-Ukraine war began', tech: 'ChatGPT launched', movie: 'Top Gun: Maverick', song: 'As It Was', population: '8.0 billion' },
    2023: { event: 'Israel-Hamas conflict', tech: 'AI revolution (GPT-4)', movie: 'Barbie', song: 'Flowers', population: '8.0 billion' },
    2024: { event: 'US Election', tech: 'AI agents became mainstream', movie: 'Inside Out 2', song: 'Espresso', population: '8.1 billion' },
  };
  return facts[year] || {
    event: `Major world events shaped ${year}`,
    tech: 'Technology was advancing rapidly',
    movie: 'Great films were released',
    song: 'Music was changing the world',
    population: 'The world population was growing'
  };
}

// ─── Life Expectancy by Country ────────────────────────────
export const lifeExpectancyData = {
  'Japan': 84.3, 'Switzerland': 83.8, 'Australia': 83.5, 'Spain': 83.4,
  'Italy': 83.2, 'Sweden': 83.0, 'France': 82.7, 'South Korea': 82.7,
  'Canada': 82.5, 'Norway': 82.4, 'Israel': 82.3, 'New Zealand': 82.0,
  'Germany': 81.4, 'UK': 81.3, 'Netherlands': 81.1, 'Portugal': 81.1,
  'USA': 78.9, 'China': 77.3, 'Brazil': 75.4, 'Mexico': 75.0,
  'Russia': 73.2, 'India': 70.8, 'Pakistan': 67.2, 'Nigeria': 54.7,
  'World Average': 73.4,
};

// ─── Pet Age ───────────────────────────────────────────────
export function getPetAge(petDays, petType, dogSize = 'medium') {
  switch (petType) {
    case 'dog': {
      const petYears = petDays / 365;
      const sizes = {
        small:  [15,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80],
        medium: [15,24,28,32,36,42,47,51,55,59,63,67,71,75,79,83],
        large:  [15,24,28,32,36,45,50,55,61,66,72,77,82,88,93,99],
      };
      const table = sizes[dogSize] || sizes.medium;
      const yr = Math.min(Math.floor(petYears), table.length - 1);
      return { human: table[yr], unit: 'years', note: `For a ${dogSize} dog` };
    }
    case 'cat': {
      const y = petDays / 365;
      let human;
      if (y <= 1) human = Math.round(y * 15);
      else if (y <= 2) human = Math.round(15 + (y - 1) * 9);
      else human = Math.round(24 + (y - 2) * 4);
      return { human, unit: 'years', note: 'Average indoor cat' };
    }
    case 'rabbit': return { human: Math.round((petDays / 365) * 9), unit: 'years', note: 'Average rabbit lifespan ~10 years' };
    case 'hamster': return { human: Math.round((petDays / 365) * 25), unit: 'years', note: 'Hamsters age very fast' };
    case 'horse': return { human: Math.round((petDays / 365) * 3.5), unit: 'years', note: 'Horses live ~25–30 years' };
    default: return { human: Math.round((petDays / 365) * 7), unit: 'years', note: '' };
  }
}

// ─── Formatters ────────────────────────────────────────────
export function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)         return n.toLocaleString();
  return String(n);
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function padTwo(n) {
  return String(n).padStart(2, '0');
}
