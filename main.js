// F1 2026 Schedule Data (with Translation)
const races = [
    { round: 1, name: "Bahrain Grand Prix", nameKo: "바레인 그랑프리", date: "2026-03-14", location: "Sakhir, Bahrain", locationKo: "사키르, 바레인", track: "Bahrain International Circuit" },
    { round: 2, name: "Saudi Arabian Grand Prix", nameKo: "사우디아라비아 그랑프리", date: "2026-03-21", location: "Jeddah, Saudi Arabia", locationKo: "제다, 사우디아라비아", track: "Jeddah Corniche Circuit" },
    { round: 3, name: "Australian Grand Prix", nameKo: "호주 그랑프리", date: "2026-04-04", location: "Melbourne, Australia", locationKo: "멜버른, 호주", track: "Albert Park Circuit" },
    { round: 4, name: "Japanese Grand Prix", nameKo: "일본 그랑프리", date: "2026-04-19", location: "Suzuka, Japan", locationKo: "스즈카, 일본", track: "Suzuka International Racing Course" },
    { round: 5, name: "Chinese Grand Prix", nameKo: "중국 그랑프리", date: "2026-05-02", location: "Shanghai, China", locationKo: "상하이, 중국", track: "Shanghai International Circuit" },
    { round: 6, name: "Miami Grand Prix", nameKo: "마이애미 그랑프리", date: "2026-05-16", location: "Miami, USA", locationKo: "마이애미, 미국", track: "Miami International Autodrome" },
    { round: 7, name: "Monaco Grand Prix", nameKo: "모나코 그랑프리", date: "2026-05-30", location: "Monte Carlo, Monaco", locationKo: "몬테카를로, 모나코", track: "Circuit de Monaco" },
    { round: 8, name: "Spanish Grand Prix", nameKo: "스페인 그랑프리", date: "2026-06-13", location: "Barcelona, Spain", locationKo: "바르셀로나, 스페인", track: "Circuit de Barcelona-Catalunya" },
    { round: 9, name: "Canadian Grand Prix", nameKo: "캐나다 그랑프리", date: "2026-06-27", location: "Montreal, Canada", locationKo: "몬트리올, 캐나다", track: "Circuit Gilles Villeneuve" },
    { round: 10, name: "British Grand Prix", nameKo: "영국 그랑프리", date: "2026-07-11", location: "Silverstone, UK", locationKo: "실버스톤, 영국", track: "Silverstone Circuit" }
];

// 1. Hover Translation Logic
document.querySelectorAll('[data-ko]').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const koText = el.getAttribute('data-ko');
        if (koText) {
            el.innerHTML = koText;
        }
    });
    el.addEventListener('mouseleave', () => {
        const enText = el.getAttribute('data-en');
        if (enText) {
            el.innerHTML = enText;
        }
    });
});

// 2. Target Race Countdown
const targetRaceDate = new Date("2026-04-19T14:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetRaceDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "<h3>RACE STARTED!</h3>";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// 3. Render Schedule Cards
const scheduleGrid = document.getElementById("schedule-grid");
const today = new Date();

races.forEach(race => {
    const raceDate = new Date(race.date);
    const isPast = raceDate < today;
    
    const card = document.createElement("div");
    card.className = `race-card ${isPast ? 'past' : ''}`;
    
    // Inject Translation Attributes into Dynamic Cards
    card.innerHTML = `
        <div class="race-num">ROUND ${race.round}</div>
        <h3 class="race-name" data-en="${race.name}" data-ko="${race.nameKo}">${race.name}</h3>
        <div class="race-date">📅 ${race.date}</div>
        <div class="race-location" data-en="📍 ${race.location}" data-ko="📍 ${race.locationKo}">📍 ${race.location}</div>
        <div class="race-track" style="font-size: 0.8rem; margin-top: 10px; color: #888;">${race.track}</div>
    `;

    // Add Hover Event for Dynamic Card Elements
    card.querySelectorAll('[data-ko]').forEach(el => {
        el.addEventListener('mouseenter', () => el.innerHTML = el.getAttribute('data-ko'));
        el.addEventListener('mouseleave', () => el.innerHTML = el.getAttribute('data-en'));
    });
    
    scheduleGrid.appendChild(card);
});
