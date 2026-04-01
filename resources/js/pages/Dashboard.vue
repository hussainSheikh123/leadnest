<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard, home, logout } from '@/routes';
import { edit as profileSettings } from '@/routes/profile';

type SummaryCard = {
    label: string;
    value: string;
    suffix: string;
};

type LeadRow = {
    name: string;
    source: string;
    niche: string;
    city: string;
    status: string;
    score: string;
    statusTone: 'green' | 'amber';
};

type SourceRow = {
    name: string;
    percentage: string;
};

type FollowUpItem = {
    name: string;
    note: string;
};

const page = usePage();
const auth = computed(() => page.props.auth as { user: { name: string } });
const userInitial = computed(
    () => auth.value.user.name?.trim().charAt(0).toUpperCase() || 'U',
);

const navItems = [
    { label: 'Dashboard', href: dashboard(), active: true },
    { label: 'Leads', href: '#' },
    { label: 'Pipeline', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Outreach', href: '#' },
    { label: 'Buyers', href: '#' },
];

const bottomNavItems = [{ label: 'Settings', href: profileSettings() }];

const summaryCards: SummaryCard[] = [
    { label: 'Active leads', value: '8', suffix: 'total' },
    { label: 'In pipeline', value: '3', suffix: 'active' },
    { label: 'Meetings set', value: '4', suffix: 'this wk' },
    { label: 'Accuracy rate', value: '85', suffix: '%' },
];

const prioritisedLeads: LeadRow[] = [
    {
        name: 'Amna Rashid',
        source: 'LinkedIn',
        niche: 'Commercial',
        city: 'Dubai',
        status: 'Live',
        score: '92%',
        statusTone: 'green',
    },
    {
        name: 'Maria Dawson',
        source: 'Website',
        niche: 'Residential',
        city: 'Sharjah',
        status: 'Live',
        score: '81%',
        statusTone: 'green',
    },
    {
        name: 'Mian Osman',
        source: 'Outbound',
        niche: 'Industrial',
        city: 'Abu Dhabi',
        status: 'Pending',
        score: '89%',
        statusTone: 'amber',
    },
    {
        name: 'Raheela Ch.',
        source: 'LinkedIn',
        niche: 'High-rise',
        city: 'Dubai',
        status: 'Live',
        score: '74%',
        statusTone: 'green',
    },
    {
        name: 'Sara Khan',
        source: 'Referral',
        niche: 'Commercial',
        city: 'Dubai',
        status: 'Live',
        score: '94%',
        statusTone: 'green',
    },
];

const sourceRows: SourceRow[] = [
    { name: 'LinkedIn', percentage: '66%' },
    { name: 'Website', percentage: '80%' },
    { name: 'Defence', percentage: '82%' },
    { name: 'Outbound', percentage: '60%' },
];

const followUpQueue: FollowUpItem[] = [
    { name: 'Amna Rashid', note: 'Message today 4:00 PM' },
    { name: 'Maria Dawson', note: 'Send today 5:30 PM' },
    { name: 'Sara Khan', note: 'Follow-up 3 hrs' },
];
</script>

<template>
    <PublicLayout>
        <Head title="Dashboard">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
        </Head>

        <div class="dashboard-shell">
            <header class="dashboard-header">
                <div class="header-left">
                    <Link :href="home()" class="brand-lockup">
                        <div class="brand-mark">LN</div>
                        <span class="brand-text">Lead<span>Nest</span></span>
                    </Link>

                    <div class="crumb">
                        <span>/</span>
                        <span>Dashboard</span>
                    </div>
                </div>

                <div class="header-right">
                    <button type="button" class="generate-button">
                        + Generate Leads
                    </button>

                    <div class="user-name">{{ auth.user.name }}</div>

                    <div class="avatar-pill">{{ userInitial }}</div>

                    <Link :href="logout()" as="button" class="logout-link">
                        Logout
                    </Link>
                </div>
            </header>

            <div class="dashboard-layout">
                <aside class="sidebar">
                    <div class="sidebar-inner">
                        <nav class="sidebar-nav">
                            <Link
                                v-for="item in navItems"
                                :key="item.label"
                                :href="item.href"
                                class="sidebar-link"
                                :class="{ active: item.active }"
                            >
                                <span class="sidebar-bullet" />
                                <span>{{ item.label }}</span>
                            </Link>
                        </nav>

                        <nav class="sidebar-nav sidebar-bottom-nav">
                            <Link
                                v-for="item in bottomNavItems"
                                :key="item.label"
                                :href="item.href"
                                class="sidebar-link"
                            >
                                <span class="sidebar-bullet" />
                                <span>{{ item.label }}</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                <main class="dashboard-main">
                    <div class="dashboard-content">
                        <section class="hero-copy">
                            <h1>Lead Command Centre</h1>
                            <p>
                                A cleaner leads dashboard built for fast
                                follow-up and better conversion focus.
                            </p>
                        </section>

                        <section class="stats-grid">
                            <article
                                v-for="card in summaryCards"
                                :key="card.label"
                                class="stat-card"
                            >
                                <div class="stat-label">{{ card.label }}</div>
                                <div class="stat-value">
                                    {{ card.value }}
                                    <span>{{ card.suffix }}</span>
                                </div>
                            </article>
                        </section>

                        <section class="content-grid">
                            <article class="panel panel-large">
                                <h2>Prioritised lead records</h2>

                                <div class="lead-list">
                                    <div
                                        v-for="lead in prioritisedLeads"
                                        :key="lead.name"
                                        class="lead-row"
                                    >
                                        <div class="lead-copy">
                                            <div class="lead-name">
                                                {{ lead.name }}
                                            </div>
                                            <div class="lead-meta">
                                                {{ lead.source }} -
                                                {{ lead.niche }} -
                                                {{ lead.city }}
                                            </div>
                                        </div>

                                        <div class="lead-actions">
                                            <span
                                                class="status-pill"
                                                :class="lead.statusTone"
                                            >
                                                {{ lead.status }}
                                            </span>
                                            <span class="score-pill">
                                                {{ lead.score }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article class="panel panel-side">
                                <div class="side-section">
                                    <h2>Where the strongest leads come from</h2>

                                    <div class="source-list">
                                        <div
                                            v-for="row in sourceRows"
                                            :key="row.name"
                                            class="source-row"
                                        >
                                            <span>{{ row.name }}</span>
                                            <div class="source-value">
                                                <span class="source-line" />
                                                <span>{{
                                                    row.percentage
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="side-section">
                                    <h3>Follow-up queue</h3>

                                    <div class="queue-list">
                                        <div
                                            v-for="item in followUpQueue"
                                            :key="item.name"
                                            class="queue-row"
                                        >
                                            <div class="queue-name">
                                                {{ item.name }}
                                            </div>
                                            <div class="queue-note">
                                                {{ item.note }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    </PublicLayout>
</template>

<style scoped>
.dashboard-shell {
    --black: #0d0d0d;
    --white: #ffffff;
    --bg: #f5f1e8;
    --panel: #fffdf9;
    --line: #e0d6c7;
    --text: #1a1713;
    --muted: #776b5b;
    --gold: #b8892a;
    --green-soft: #edf7ee;
    --green-text: #2d7a34;
    --amber-soft: #f8f0df;
    --amber-text: #b8892a;
    --fd: 'Playfair Display', serif;
    --fb: 'Outfit', sans-serif;
    --fm: 'JetBrains Mono', monospace;
    min-height: 100vh;
    background: #fbf8f2;
    color: var(--text);
    font-family: var(--fb);
}

.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--line);
    background: rgba(255, 253, 249, 0.96);
    padding: 0.75rem 1.75rem;
}

.header-left,
.header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.brand-lockup {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    text-decoration: none;
}

.brand-mark {
    display: flex;
    height: 32px;
    width: 32px;
    align-items: center;
    justify-content: center;
    clip-path: polygon(
        0 0,
        calc(100% - 7px) 0,
        100% 7px,
        100% 100%,
        7px 100%,
        0 calc(100% - 7px)
    );
    background: var(--black);
    color: #d4a84b;
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.05em;
}

.brand-text {
    color: var(--black);
    font-family: var(--fd);
    font-size: 1.32rem;
    font-weight: 500;
}

.brand-text span {
    color: var(--gold);
}

.crumb {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: #857869;
    font-size: 0.95rem;
}

.generate-button {
    border: 1px solid #d3c7b7;
    background: var(--white);
    padding: 0.8rem 1.15rem;
    color: var(--black);
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 8px 18px rgba(13, 13, 13, 0.04);
}

.user-name,
.logout-link {
    color: #5a4f40;
    font-size: 0.95rem;
    text-decoration: none;
}

.avatar-pill {
    display: flex;
    height: 2.1rem;
    width: 2.1rem;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: var(--black);
    color: var(--white);
    font-size: 0.85rem;
    font-weight: 600;
}

.dashboard-layout {
    display: grid;
    min-height: calc(100vh - 73px);
    grid-template-columns: 215px 1fr;
}

.sidebar {
    border-right: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.56);
    padding: 1.55rem 0;
}

.sidebar-inner {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
}

.sidebar-bottom-nav {
    margin-top: 2rem;
}

.sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.95rem 1.55rem;
    color: #4a4034;
    font-size: 0.98rem;
    text-decoration: none;
}

.sidebar-link.active {
    background: rgba(13, 13, 13, 0.04);
    color: var(--black);
    font-weight: 600;
}

.sidebar-bullet {
    height: 6px;
    width: 6px;
    background: #4b4035;
}

.dashboard-main {
    background: var(--bg);
    padding: 1.6rem 1.6rem 2rem;
}

.dashboard-content {
    width: 100%;
    max-width: none;
}

.hero-copy h1,
.panel h2,
.side-section h3 {
    font-family: var(--fd);
    letter-spacing: -0.02em;
}

.hero-copy h1 {
    font-size: clamp(2.1rem, 3.2vw, 3rem);
    font-weight: 600;
}

.hero-copy p {
    max-width: 42rem;
    margin-top: 0.55rem;
    color: var(--muted);
    font-size: 1.05rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.1rem;
    margin-top: 1.6rem;
}

.stat-card,
.panel {
    border: 1px solid #d8cebe;
    background: var(--panel);
    box-shadow: 0 10px 30px rgba(13, 13, 13, 0.04);
}

.stat-card {
    min-height: 10.5rem;
    padding: 1.4rem 1.25rem;
}

.stat-label {
    color: #6f6557;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.stat-value {
    margin-top: 1.55rem;
    font-family: var(--fd);
    font-size: 2.55rem;
    font-weight: 700;
}

.stat-value span {
    margin-left: 0.35rem;
    color: var(--gold);
    font-size: 1rem;
    font-weight: 600;
}

.content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(360px, 1.08fr);
    gap: 1.1rem;
    margin-top: 1.75rem;
}

.panel {
    padding: 1.45rem 1.35rem 1.25rem;
}

.panel h2 {
    font-size: 1.3rem;
    font-weight: 600;
}

.lead-list {
    margin-top: 1.15rem;
}

.lead-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid #e6ddcf;
    padding: 0.95rem 0;
}

.lead-row:last-child,
.queue-row:last-child {
    border-bottom: none;
}

.lead-name,
.queue-name {
    font-size: 1.08rem;
    font-weight: 700;
}

.lead-meta,
.queue-note {
    color: #817462;
    font-size: 0.98rem;
    line-height: 1.2;
}

.lead-actions {
    display: flex;
    align-items: center;
    gap: 0.55rem;
}

.status-pill,
.score-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 0.26rem 0.72rem;
    font-size: 0.88rem;
}

.status-pill.green {
    background: var(--green-soft);
    color: var(--green-text);
}

.status-pill.amber {
    background: var(--amber-soft);
    color: var(--amber-text);
}

.score-pill {
    background: #fbf1da;
    color: var(--gold);
    font-weight: 600;
}

.panel-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.side-section + .side-section {
    margin-top: 1.45rem;
}

.side-section h3 {
    font-size: 1.18rem;
    font-weight: 600;
}

.source-list,
.queue-list {
    margin-top: 1.05rem;
}

.source-row,
.queue-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.52rem 0;
}

.source-row {
    color: #40362b;
    font-size: 1rem;
}

.source-value {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #6f6455;
}

.source-line {
    height: 11px;
    width: 1px;
    background: var(--gold);
}

.queue-row {
    border-bottom: 1px solid #e6ddcf;
    align-items: flex-start;
}

@media (max-width: 1024px) {
    .dashboard-layout {
        grid-template-columns: 1fr;
    }

    .sidebar {
        border-right: none;
        border-bottom: 1px solid var(--line);
        padding: 0.5rem 1rem;
    }

    .sidebar-inner {
        min-height: auto;
        gap: 0.35rem;
    }

    .sidebar-nav {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.35rem;
    }

    .sidebar-bottom-nav {
        margin-top: 0;
    }

    .sidebar-link {
        padding: 0.7rem 0.9rem;
    }

    .dashboard-content {
        max-width: none;
    }
}

@media (max-width: 820px) {
    .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
    }

    .header-left,
    .header-right {
        flex-wrap: wrap;
    }

    .dashboard-main {
        padding: 1.2rem 1rem 1.4rem;
    }

    .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .content-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 560px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .lead-row,
    .source-row,
    .queue-row {
        flex-direction: column;
        align-items: flex-start;
    }

    .lead-actions {
        justify-content: flex-start;
    }
}
</style>
