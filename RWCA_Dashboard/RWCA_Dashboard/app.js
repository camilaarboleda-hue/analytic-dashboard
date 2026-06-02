/**
 * Third Way Health - Operational Dashboard Application Engine
 */

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-twh-pine', 'border-twh-pine');
        btn.classList.add('text-twh-pine/40', 'border-transparent');
    });
    
    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
        activeNav.classList.add('text-twh-pine', 'border-twh-pine');
        activeNav.classList.remove('text-twh-pine/40', 'border-transparent');
    }

    // --- Chart re-trigger sequence ---
    if (viewId === 'dashboard') {
        const dashboardCharts = ['chartResults', 'chartPrePost', 'chartChallenges', 'chartCategory', 'chartWeeklySpikes'];
        dashboardCharts.forEach(id => {
            if (window.twhCharts && window.twhCharts[id]) {
                window.twhCharts[id].reset();  
                window.twhCharts[id].update(); 
            }
        });
    } else if (viewId === 'insights') {
        if (window.twhCharts && window.twhCharts.chartProjection) {
            window.twhCharts.chartProjection.reset();
            window.twhCharts.chartProjection.update();
        }
    }
}

// Global registry for charts
window.twhCharts = {};

document.addEventListener("DOMContentLoaded", () => {
    // Fonts updated to Light (300) to match the new crisp layout style
    const chartFontPreset = { family: 'Manrope', size: 12, weight: '300' };
    const labelColorPreset = '#2F5251';

    // --- SIBLING INTERACTION ENGINE: LATERALLY BALANCE STABLE SEPARATIONS ---
    const slots = document.querySelectorAll('.card-layout-slot');
    slots.forEach(slot => {
        slot.addEventListener('mouseenter', (e) => {
            let current = e.currentTarget;
            let previous = current.previousElementSibling;
            let next = current.nextElementSibling;

            while (previous && previous.classList.contains('card-layout-slot')) {
                previous.style.transform = 'translateX(-24px)';
                previous.style.opacity = '0.4';
                previous = previous.previousElementSibling;
            }
            while (next && next.classList.contains('card-layout-slot')) {
                next.style.transform = 'translateX(24px)';
                next.style.opacity = '0.4';
                next = next.nextElementSibling;
            }
        });

        slot.addEventListener('mouseleave', () => {
            slots.forEach(s => {
                s.style.transform = '';
                s.style.opacity = '';
            });
        });
    });

    // --- Chart 01: Daily Ticket Escalations Trend (Line) ---
    const ctxRes = document.getElementById('chartResults');
    if (ctxRes) {
        window.twhCharts.chartResults = new Chart(ctxRes.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 22 (Cut-off)', 'May 25', 'May 27', 'May 29'],
                datasets: [{
                    label: 'Daily Handoffs',
                    data: [44, 41, 45, 39, 43, 40, 14, 9, 7],
                    borderColor: '#2F5251',
                    borderWidth: 2.5,
                    pointBackgroundColor: (context) => context.dataIndex >= 6 ? '#10B981' : '#F0C4B9',
                    pointRadius: 5,
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 0, max: 50, grid: { color: 'rgba(47, 82, 81, 0.05)' }, ticks: { font: chartFontPreset, color: labelColorPreset } },
                    x: { grid: { display: false }, ticks: { font: chartFontPreset, color: labelColorPreset } }
                }
            }
        });
    }

    // --- Chart 02: Volume Comparison (Bar) ---
    const ctxPrePost = document.getElementById('chartPrePost');
    if (ctxPrePost) {
        window.twhCharts.chartPrePost = new Chart(ctxPrePost.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Pre-Migration', 'Post-Migration'],
                datasets: [{
                    data: [42.0, 10.0],
                    backgroundColor: ['#F0C4B9', '#C5F9D6'],
                    borderRadius: 6,
                    maxBarThickness: 50
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 0, max: 50, grid: { color: 'rgba(47, 82, 81, 0.05)' }, ticks: { font: chartFontPreset, color: labelColorPreset } },
                    x: { grid: { display: false }, ticks: { font: chartFontPreset, color: labelColorPreset } }
                }
            }
        });
    }

    // --- Chart 03: Root Cause Breakdown (Doughnut) ---
    const ctxChal = document.getElementById('chartChallenges');
    if (ctxChal) {
        window.twhCharts.chartChallenges = new Chart(ctxChal.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Knowledge Gap', 'Task Avoidance', 'Flow Process'],
                datasets: [{
                    data: [58, 15, 27],
                    backgroundColor: ['#2F5251', '#F0C4B9', '#CDB7FC'],
                    borderWidth: 3,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { font: chartFontPreset, color: '#2F5251', boxWidth: 14 } }
                }
            }
        });
    }

    // --- Chart 04: Category Volumes (Horizontal Bar) ---
    const ctxCat = document.getElementById('chartCategory');
    if (ctxCat) {
        window.twhCharts.chartCategory = new Chart(ctxCat.getContext('2d'), {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: ['Billing & Ins.', 'Patient Intake', 'Medical Rec.', 'Routing Errors'],
                datasets: [{
                    data: [25, 18, 10, 5],
                    backgroundColor: '#2F5251',
                    borderRadius: 4,
                    barThickness: 18
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { min: 0, max: 30, grid: { color: 'rgba(47, 82, 81, 0.05)' }, ticks: { font: chartFontPreset, color: labelColorPreset } },
                    y: { grid: { display: false }, ticks: { font: chartFontPreset, color: labelColorPreset } }
                }
            }
        });
    }

    // --- Chart 05: Weekly Spikes (Vertical Bar) ---
    const ctxWeek = document.getElementById('chartWeeklySpikes');
    if (ctxWeek) {
        window.twhCharts.chartWeeklySpikes = new Chart(ctxWeek.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    data: [45, 40, 41, 39, 7],
                    backgroundColor: '#AEBDF7',
                    borderRadius: 4,
                    maxBarThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 0, max: 50, grid: { color: 'rgba(47, 82, 81, 0.05)' }, ticks: { font: chartFontPreset, color: labelColorPreset } },
                    x: { grid: { display: false }, ticks: { font: chartFontPreset, color: labelColorPreset } }
                }
            }
        });
    }

    // --- Chart 06: Forecast Projections Model (Line) ---
    const ctxProj = document.getElementById('chartProjection');
    if (ctxProj) {
        window.twhCharts.chartProjection = new Chart(ctxProj.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Week 1 (Baseline)', 'Week 2 (Micro-Clips)', 'Week 3 (Form Audits)', 'Week 4 (TL Gate)'],
                datasets: [
                    {
                        label: 'Projected Rate',
                        data: [42, 31, 24, 18],
                        borderColor: '#2F5251',
                        borderWidth: 2,
                        backgroundColor: 'rgba(197, 249, 214, 0.1)',
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'Target Cap (20%)',
                        data: [20, 20, 20, 20],
                        borderColor: '#F0C4B9',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { font: chartFontPreset, color: '#2F5251' } } },
                scales: {
                    y: { min: 0, max: 50, grid: { color: 'rgba(47, 82, 81, 0.05)' }, ticks: { font: chartFontPreset, color: labelColorPreset } },
                    x: { grid: { display: false }, ticks: { font: chartFontPreset, color: labelColorPreset } }
                }
            }
        });
    }
});