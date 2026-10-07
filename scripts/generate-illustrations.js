// Generates the flat illustration set in public/illustrations (same visual language as the supplied
// campus picture: night-blue gradient, faint grid, pale building surfaces, blue glass, dark figures).
const fs = require('fs');
const out = 'public/illustrations';
fs.mkdirSync(out, { recursive: true });

const defs = `
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1326"/><stop offset=".45" stop-color="#142a78"/><stop offset="1" stop-color="#1d4ed8"/></linearGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef1f8"/><stop offset="1" stop-color="#bfcbe6"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb2ff"/><stop offset="1" stop-color="#3b63e0"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ec0ff"/><stop offset="1" stop-color="#2f5be0"/></linearGradient>
  <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
</defs>`;
const frame = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img">${defs}
<rect width="1200" height="800" fill="url(#bg)"/><rect width="1200" height="800" fill="url(#grid)"/>
${body}</svg>`;

const INK = '#2b3448';
const moon = (cx = 960, cy = 170, r = 70) => `<circle cx="${cx}" cy="${cy}" r="${r * 1.7}" fill="#fff" opacity=".08"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" opacity=".22"/>`;
const ground = (y = 656) => `<rect x="0" y="${y}" width="1200" height="12" rx="6" fill="#aebbe6"/>`;
// Head-and-shoulders figure standing on baseline y.
const person = (x, y, s = 1, fill = INK) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-50" r="18" fill="${fill}"/><path d="M-28 0a28 28 0 0 1 56 0z" fill="${fill}"/></g>`;
const tree = (x, y, r = 36) => `<rect x="${x - 5}" y="${y - 60}" width="10" height="60" rx="5" fill="#16204a"/><circle cx="${x}" cy="${y - 78}" r="${r}" fill="#1f8a8a" opacity=".9"/>`;
const tower = (x, y, w, h) => {
  let wins = '';
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) wins += `<rect x="${x + 26 + c * 44}" y="${y + 36 + r * 54}" width="30" height="34" rx="5" fill="#3a5a9c"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#15285e" opacity=".85"/>${wins}`;
};
const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#glass)"/><rect x="${x + w / 2 - 1}" y="${y}" width="2" height="${h}" fill="#fff" opacity=".35"/>`;
const monitor = (x, y, w = 150, h = 100) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${INK}"/><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="6" fill="url(#screen)"/><rect x="${x + w / 2 - 6}" y="${y + h}" width="12" height="18" fill="${INK}"/><rect x="${x + w / 2 - 34}" y="${y + h + 16}" width="68" height="8" rx="4" fill="${INK}"/>`;
const lines = (x, y, widths, color = '#fff', op = 0.85, gap = 20, h = 8) => widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}" opacity="${op}"/>`).join('');

const art = {};

// 1. Campus — the building from the supplied picture.
art.campus = frame(`${moon()}${tower(70, 330, 150, 330)}${tower(1000, 290, 140, 370)}
<rect x="250" y="200" width="700" height="460" rx="22" fill="url(#wall)"/>
<path d="M250 286V222a22 22 0 0 1 22-22h656a22 22 0 0 1 22 22v64z" fill="#1d4ed8"/>
<rect x="300" y="228" width="176" height="30" rx="8" fill="#eef2ff"/><rect x="316" y="238" width="144" height="10" rx="5" fill="#4f74e6"/><rect x="496" y="234" width="120" height="18" rx="6" fill="#77a4f5"/>
${win(290, 320, 180, 120)}${win(510, 320, 180, 120)}${win(730, 320, 180, 120)}${win(290, 470, 180, 120)}${win(730, 470, 180, 120)}
<rect x="480" y="440" width="240" height="18" rx="9" fill="#2f5be0"/>
<path d="M510 660V482a12 12 0 0 1 12-12h156a12 12 0 0 1 12 12v178z" fill="${INK}"/><rect x="530" y="500" width="140" height="160" rx="8" fill="#43608c"/><rect x="599" y="500" width="2" height="160" fill="#fff" opacity=".35"/>
${tree(197, 656, 38)}${tree(987, 656, 32)}${person(410, 656)}${person(466, 656, 0.82)}${person(796, 656, 0.95)}${ground()}`);

// 2. Classroom — a board, a trainer and rows of learners.
art.classroom = frame(`${moon(1010, 150, 56)}
<rect x="150" y="150" width="900" height="510" rx="22" fill="url(#wall)"/>
<rect x="250" y="200" width="520" height="250" rx="14" fill="#16306f"/><rect x="262" y="212" width="496" height="226" rx="8" fill="#1d3f97"/>
${lines(296, 250, [260, 340, 200], '#cfe0ff', 0.9, 30, 12)}
<path d="M300 400l70-46 60 26 80-64 70 38 90-70" fill="none" stroke="#7fb2ff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
${win(820, 210, 170, 200)}
${person(700, 560, 1.5)}<rect x="738" y="470" width="90" height="10" rx="5" fill="${INK}" transform="rotate(-28 738 470)"/>
<rect x="150" y="560" width="900" height="100" fill="#aebbe6" opacity=".55"/>
${[230, 370, 510, 650, 790, 930].map((x) => person(x, 668, 1.25)).join('')}
${[300, 440, 580, 860].map((x) => person(x, 720, 1.5, '#1b2338')).join('')}
${ground(700)}`);

// 3. Lab — a bench of workstations with learners at the screens.
art.lab = frame(`${moon(200, 160, 56)}${tower(960, 250, 150, 410)}
<rect x="120" y="230" width="780" height="430" rx="22" fill="url(#wall)"/>
${win(170, 270, 150, 110)}${win(350, 270, 150, 110)}${win(530, 270, 150, 110)}${win(710, 270, 150, 110)}
<rect x="60" y="560" width="1080" height="26" rx="13" fill="#2f5be0"/><rect x="100" y="586" width="16" height="74" fill="${INK}"/><rect x="1084" y="586" width="16" height="74" fill="${INK}"/>
${monitor(170, 420)}${monitor(430, 420)}${monitor(690, 420)}${monitor(940, 420, 140, 96)}
${person(245, 730, 1.6, '#1b2338')}${person(505, 730, 1.6, '#1b2338')}${person(765, 730, 1.6, '#1b2338')}${person(1010, 730, 1.5, '#1b2338')}
${ground(660)}`);

// 4. Seminar — a speaker on stage in front of an audience.
art.seminar = frame(`${moon(990, 140, 52)}
<rect x="200" y="140" width="800" height="330" rx="20" fill="#16306f"/><rect x="216" y="156" width="768" height="298" rx="12" fill="url(#screen)" opacity=".9"/>
${lines(270, 220, [300, 420, 240], '#fff', 0.9, 34, 14)}
<circle cx="830" cy="300" r="78" fill="#fff" opacity=".2"/><path d="M800 262l74 38-74 38z" fill="#fff" opacity=".9"/>
<rect x="120" y="470" width="960" height="40" rx="12" fill="#2b3f86"/>
<rect x="560" y="400" width="80" height="70" rx="8" fill="${INK}"/>${person(520, 470, 1.35)}
${[150, 290, 430, 570, 710, 850, 990].map((x) => person(x + 30, 640, 1.3)).join('')}
${[110, 250, 390, 530, 670, 810, 950, 1090].map((x) => person(x, 730, 1.65, '#1b2338')).join('')}`);

// 5. Industry — the campus linked to an office tower.
art.industry = frame(`${moon(600, 150, 60)}
<rect x="110" y="330" width="400" height="330" rx="18" fill="url(#wall)"/><path d="M110 396V348a18 18 0 0 1 18-18h364a18 18 0 0 1 18 18v48z" fill="#1d4ed8"/><rect x="140" y="350" width="130" height="22" rx="7" fill="#eef2ff"/>
${win(140, 420, 150, 90)}${win(330, 420, 150, 90)}${win(140, 540, 150, 90)}<path d="M330 660V552a10 10 0 0 1 10-10h130a10 10 0 0 1 10 10v108z" fill="${INK}"/>
<rect x="760" y="200" width="320" height="460" rx="18" fill="#15285e"/>
${[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => `<rect x="${790 + c * 92}" y="${232 + r * 78}" width="68" height="52" rx="8" fill="${(r + c) % 3 === 0 ? 'url(#glass)' : '#3a5a9c'}"/>`).join('')).join('')}
<path d="M510 480C600 380 670 380 760 440" fill="none" stroke="#fcd000" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>
<circle cx="510" cy="480" r="14" fill="#fcd000"/><circle cx="760" cy="440" r="14" fill="#fcd000"/>
${person(580, 656, 1.1)}${person(660, 656, 1.1)}<rect x="596" y="610" width="48" height="12" rx="6" fill="${INK}"/>
${tree(60, 656, 30)}${tree(1140, 656, 30)}${ground()}`);

// 6. Certificate — an award certificate with a seal.
art.certificate = frame(`${moon(1000, 160, 60)}
<rect x="230" y="150" width="740" height="500" rx="24" fill="url(#wall)"/><rect x="262" y="182" width="676" height="436" rx="14" fill="none" stroke="#1d4ed8" stroke-width="4" stroke-opacity=".5"/>
<rect x="440" y="230" width="320" height="26" rx="13" fill="#1d4ed8"/>
${lines(350, 300, [500, 420, 460], '#5b6b8f', 0.55, 36, 14)}
<rect x="330" y="470" width="220" height="12" rx="6" fill="#5b6b8f" opacity=".55"/><rect x="330" y="520" width="150" height="8" rx="4" fill="#5b6b8f" opacity=".4"/>
<path d="M740 520l-24 110 54-34 54 34-24-110z" fill="#1d4ed8"/><circle cx="770" cy="500" r="74" fill="#fcd000"/><circle cx="770" cy="500" r="52" fill="none" stroke="#fff" stroke-width="6" stroke-opacity=".8"/>
<path d="M742 502l20 20 38-42" fill="none" stroke="#0f1d4a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
${ground(700)}`);

// 7. Team — a group standing together.
art.team = frame(`${moon(940, 170, 64)}${tower(60, 360, 150, 300)}${tower(990, 320, 150, 340)}
<rect x="260" y="300" width="680" height="360" rx="22" fill="url(#wall)" opacity=".95"/>
${win(300, 340, 170, 110)}${win(515, 340, 170, 110)}${win(730, 340, 170, 110)}
${[330, 470, 610, 750, 890].map((x, i) => person(x, 700, i % 2 ? 2.1 : 1.9, i % 2 ? '#1b2338' : INK)).join('')}
${ground(700)}`);

// 8. Roadmap — a path of milestones leading to a flag.
art.roadmap = frame(`${moon(980, 150, 60)}
<path d="M120 690C320 690 300 540 500 540S680 400 860 380 1010 300 1010 240" fill="none" stroke="#aebbe6" stroke-width="34" stroke-linecap="round" opacity=".5"/>
<path d="M120 690C320 690 300 540 500 540S680 400 860 380 1010 300 1010 240" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="6 22" stroke-linecap="round"/>
${[[250, 668], [500, 540], [760, 420]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="34" fill="#1d4ed8" stroke="#fff" stroke-width="6"/><text x="${x}" y="${y + 9}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#fff">${i + 1}</text>`).join('')}
<rect x="1004" y="120" width="10" height="130" rx="5" fill="#eef1f8"/><path d="M1014 124h110l-26 34 26 34h-110z" fill="#fcd000"/>
${person(150, 690, 1.3)}${tree(380, 760, 34)}${tree(900, 600, 30)}${tree(640, 700, 28)}`);

// 9. Contact — a phone, chat bubbles and a map pin.
art.contact = frame(`${moon(220, 170, 60)}
<rect x="440" y="130" width="320" height="560" rx="40" fill="${INK}"/><rect x="458" y="150" width="284" height="520" rx="26" fill="url(#wall)"/><rect x="560" y="162" width="80" height="12" rx="6" fill="${INK}"/>
<rect x="484" y="220" width="170" height="64" rx="20" fill="#1d4ed8"/>${lines(504, 240, [120, 80], '#fff', 0.9, 20, 8)}
<rect x="546" y="310" width="170" height="64" rx="20" fill="#fff"/>${lines(566, 330, [120, 90], '#5b6b8f', 0.6, 20, 8)}
<rect x="484" y="400" width="200" height="64" rx="20" fill="#1d4ed8"/>${lines(504, 420, [150, 100], '#fff', 0.9, 20, 8)}
<rect x="484" y="590" width="232" height="50" rx="25" fill="#fcd000"/>
<rect x="800" y="250" width="280" height="150" rx="28" fill="#fff" opacity=".95"/><path d="M850 400l-20 54 70-54z" fill="#fff" opacity=".95"/>${lines(836, 290, [200, 150, 180], '#1d4ed8', 0.8, 30, 12)}
<path d="M230 620c-70-90-110-150-110-210a110 110 0 0 1 220 0c0 60-40 120-110 210z" fill="#fcd000"/><circle cx="230" cy="410" r="42" fill="#0f1d4a"/>
${ground(700)}`);

// 10. FAQ — question and answer cards.
art.faq = frame(`${moon(1000, 150, 60)}
<rect x="170" y="150" width="560" height="130" rx="26" fill="url(#wall)"/><circle cx="240" cy="215" r="34" fill="#1d4ed8"/><text x="240" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#fff">?</text>${lines(300, 190, [360, 250], '#5b6b8f', 0.6, 32, 14)}
<rect x="470" y="330" width="560" height="130" rx="26" fill="#1d4ed8"/>${lines(510, 370, [400, 300], '#fff', 0.9, 32, 14)}<circle cx="970" cy="395" r="30" fill="#fcd000"/><path d="M956 396l10 10 20-22" fill="none" stroke="#0f1d4a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="170" y="510" width="560" height="130" rx="26" fill="url(#wall)"/><circle cx="240" cy="575" r="34" fill="#1d4ed8"/><text x="240" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#fff">?</text>${lines(300, 550, [300, 380], '#5b6b8f', 0.6, 32, 14)}
${person(900, 700, 2.2)}${ground(700)}`);

for (const [name, svg] of Object.entries(art)) fs.writeFileSync(`${out}/${name}.svg`, svg.replace(/\n\s*/g, ''));
console.log(Object.keys(art).join(', '));
