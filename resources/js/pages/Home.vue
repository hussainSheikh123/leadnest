<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import {
    ArrowRight,
    BarChart3,
    BriefcaseBusiness,
    Building2,
    GraduationCap,
    Landmark,
    LayoutDashboard,
    PhoneCall,
    Scale,
    Search,
    ShieldCheck,
    Stethoscope,
    Truck,
    Zap,
} from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { contact, dashboard, home, login, register } from '@/routes';

withDefaults(
    defineProps<{
        canRegister?: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);
let revealObserver: IntersectionObserver | null = null;

const navItems = [
    { label: 'How It Works', href: '#hiw' },
    { label: 'Features', href: '#features' },
    { label: 'Industries', href: '#industries' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
];

const heroStats = [
    { value: '12', suffix: 'K+', label: 'Verified Leads' },
    { value: '98', suffix: '%', label: 'Accuracy Rate' },
    { value: '500', suffix: '+', label: 'Active Buyers' },
];

const howItWorks = [
    {
        step: 'STEP - 01',
        title: 'Submit a Lead',
        description:
            'Businesses submit prospective buyer information through our secure portal. Every submission is checked for completeness and quality before it enters the pipeline.',
        bg: '01',
        icon: LayoutDashboard,
    },
    {
        step: 'STEP - 02',
        title: 'Get Matched',
        description:
            'Our matching engine cross-references lead profiles against buyer criteria, budget, geography, and intent signals to deliver higher-relevance opportunities.',
        bg: '02',
        icon: Search,
    },
    {
        step: 'STEP - 03',
        title: 'Buyer Notified',
        description:
            'Matched buyers receive detailed lead cards with contact info and intent data so they can respond while prospect interest is still high.',
        bg: '03',
        icon: PhoneCall,
    },
];

const features = [
    {
        title: 'Verified Lead Quality',
        description:
            'Every lead is checked against structured quality signals before delivery, reducing noise and improving buyer confidence.',
        icon: ShieldCheck,
    },
    {
        title: 'Real-Time Delivery',
        description:
            'Leads are delivered when they match, not hours later. That keeps your team closer to live buyer intent.',
        icon: Zap,
    },
    {
        title: 'Smart Matching Engine',
        description:
            'LeadNest learns from your buyer criteria and improves lead relevance over time.',
        icon: Search,
    },
    {
        title: 'Performance Analytics',
        description:
            'Track lead velocity, conversion quality, and channel performance so you can refine spend and close more efficiently.',
        icon: BarChart3,
        wide: true,
    },
    {
        title: 'Advanced Dashboard',
        description:
            'A clean, data-rich workspace gives your team full visibility into lead status, spend efficiency, and pipeline health.',
        icon: LayoutDashboard,
    },
];

const industries = [
    {
        name: 'Real Estate',
        sub: 'Property buyers & investors',
        icon: Building2,
    },
    {
        name: 'Financial Services',
        sub: 'Banking, insurance & wealth',
        icon: Landmark,
    },
    {
        name: 'Technology',
        sub: 'SaaS, IT & digital solutions',
        icon: Zap,
    },
    {
        name: 'Healthcare',
        sub: 'Clinics, pharma & medtech',
        icon: Stethoscope,
    },
    {
        name: 'Construction',
        sub: 'Contractors & materials',
        icon: BriefcaseBusiness,
    },
    {
        name: 'Logistics',
        sub: 'Freight & supply chain',
        icon: Truck,
    },
    {
        name: 'Education',
        sub: 'Training & professional development',
        icon: GraduationCap,
    },
    {
        name: 'Legal Services',
        sub: 'Law firms & consultancies',
        icon: Scale,
    },
];

const numberCards = [
    { value: '12', suffix: 'K+', label: 'Verified Leads Delivered' },
    { value: '98', suffix: '%', label: 'Lead Accuracy Rate' },
    { value: '500', suffix: '+', label: 'Active Buyers' },
    { value: '40', suffix: '%+', label: 'Avg. Close Rate Improvement' },
];

const pricingPlans = [
    {
        name: 'Starter',
        price: '499',
        period: 'per month',
        featured: false,
        features: [
            'Up to 25 verified leads/month',
            '1 industry category',
            'Standard delivery within 24h',
            'Email notifications',
            'Basic dashboard access',
            'Email support',
        ],
        cta: 'Get Started',
    },
    {
        name: 'Growth',
        price: '1,299',
        period: 'per month',
        featured: true,
        badge: 'Most Popular',
        features: [
            'Up to 100 verified leads/month',
            '3 industry categories',
            'Real-time lead delivery',
            'SMS, email, and WhatsApp alerts',
            'Full analytics dashboard',
            'CRM integration support',
            'Priority support',
        ],
        cta: 'Get Started',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'tailored to your team',
        featured: false,
        features: [
            'Unlimited verified leads',
            'All industries and custom verticals',
            'Dedicated account manager',
            'API access and full CRM sync',
            'Custom lead scoring model',
            'White-label option available',
            'SLA guarantee and 24/7 support',
        ],
        cta: 'Contact Sales',
    },
];

const testimonials = [
    {
        quote: 'LeadNest completely transformed our sales pipeline. The quality of every contact is unlike anything we had before.',
        initials: 'KA',
        name: 'Khalid Al-Mansouri',
        company: 'CEO, Pinnacle Real Estate - Dubai',
    },
    {
        quote: 'We moved from long cold outreach cycles to faster deal movement. The matching flow feels like an elite BD team working in the background.',
        initials: 'SR',
        name: 'Sara Rahman',
        company: 'Head of Growth, NovaTech - Abu Dhabi',
    },
    {
        quote: 'The ROI showed up early. LeadNest does not just send contacts, it sends qualified opportunities our team can actually work.',
        initials: 'FJ',
        name: 'Faisal Jaber',
        company: 'Director, Gulf Logistics - Sharjah',
    },
];

const handleScroll = () => {
    isScrolled.value = window.scrollY > 60;
};

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>('.reveal'),
    );

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('visible');
                revealObserver?.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px',
        },
    );

    revealElements.forEach((element) => revealObserver?.observe(element));
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    revealObserver?.disconnect();
});
</script>

<template>
    <PublicLayout>
        <Head title="LeadNest">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
        </Head>

        <div class="leadnest-white">
            <div class="mob-menu" :class="{ open: mobileMenuOpen }">
                <button
                    class="mob-close"
                    type="button"
                    @click="closeMobileMenu"
                >
                    ×
                </button>
                <a
                    v-for="item in navItems"
                    :key="`mobile-${item.label}`"
                    :href="item.href"
                    @click="closeMobileMenu"
                >
                    {{ item.label }}
                </a>
                <Link
                    v-if="!$page.props.auth.user"
                    :href="login()"
                    @click="closeMobileMenu"
                >
                    Login
                </Link>
                <Link
                    v-if="!$page.props.auth.user && canRegister"
                    :href="register()"
                    @click="closeMobileMenu"
                >
                    Register
                </Link>
                <Link :href="contact()" @click="closeMobileMenu">Contact</Link>
            </div>

            <header class="site-nav" :class="{ scrolled: isScrolled }">
                <Link :href="home()" class="logo">
                    <div class="logo-mark">LN</div>
                    <span class="logo-text">Lead<span>Nest</span></span>
                </Link>

                <nav class="nav-links">
                    <a
                        v-for="item in navItems"
                        :key="item.label"
                        :href="item.href"
                    >
                        {{ item.label }}
                    </a>
                    <Link v-if="!$page.props.auth.user" :href="login()">
                        Login
                    </Link>
                    <Link
                        v-if="!$page.props.auth.user && canRegister"
                        :href="register()"
                        class="nav-cta"
                    >
                        Register
                    </Link>
                    <Link
                        v-if="$page.props.auth.user"
                        :href="dashboard()"
                        class="nav-cta"
                    >
                        Dashboard
                    </Link>
                </nav>

                <button
                    class="hamburger"
                    type="button"
                    @click="toggleMobileMenu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            <section id="hero">
                <div class="hero-left">
                    <div class="hero-eyebrow">
                        UAE's Premier B2B Lead Platform
                    </div>
                    <h1>
                        Connect. Convert.<br />
                        <em>Dominate</em><br />
                        Your Market.
                    </h1>
                    <p class="hero-sub">
                        LeadNest delivers verified, intent-driven B2B leads
                        directly to buyers across the UAE. Stop chasing cold
                        prospects and start closing qualified opportunities.
                    </p>
                    <div class="hero-actions">
                        <Link :href="contact()" class="btn-primary">
                            Start Generating Leads
                            <ArrowRight class="h-4 w-4" />
                        </Link>
                        <a href="#hiw" class="btn-ghost">See How It Works</a>
                    </div>
                    <div class="hero-stats">
                        <div v-for="item in heroStats" :key="item.label">
                            <div class="s-num">
                                {{ item.value }}<span>{{ item.suffix }}</span>
                            </div>
                            <div class="s-lbl">{{ item.label }}</div>
                        </div>
                    </div>
                </div>

                <div class="hero-right">
                    <div class="hero-visual">
                        <div class="hv-card c3" />
                        <div class="hv-card c2" />
                        <div class="hv-card c1">
                            <div class="hv-tag">New Lead</div>
                            <div class="hv-name">Al-Futtaim Properties</div>
                            <div class="hv-company">
                                Real Estate · Dubai, UAE
                            </div>
                            <div class="hv-row">
                                <span class="hv-row-lbl">Budget</span>
                                <span class="hv-row-val gold">AED 4.5M</span>
                            </div>
                            <div class="hv-row">
                                <span class="hv-row-lbl">Interest</span>
                                <span class="hv-row-val">Commercial Units</span>
                            </div>
                            <div class="hv-row">
                                <span class="hv-row-lbl">Timeline</span>
                                <span class="hv-row-val">Q1 2025</span>
                            </div>
                            <div class="hv-row">
                                <span class="hv-row-lbl">Status</span>
                                <span class="hv-badge green">Live Match</span>
                            </div>
                            <div class="hv-row">
                                <span class="hv-row-lbl">Score</span>
                                <span class="hv-badge amber">9.4 / 10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="marquee-wrap" aria-hidden="true">
                <div class="marquee-track">
                    <span
                        v-for="(item, index) in [...industries, ...industries]"
                        :key="`${item.name}-${index}`"
                        class="mi"
                    >
                        {{ item.name }}
                    </span>
                </div>
            </div>

            <section id="hiw">
                <div class="si">
                    <div class="hiw-header">
                        <div>
                            <div class="slabel reveal">How It Works</div>
                            <h2 class="reveal">
                                Three steps to a <em>qualified</em><br />
                                sales pipeline
                            </h2>
                        </div>
                        <p class="sdesc reveal">
                            Our process keeps every delivered lead verified,
                            relevant, and closer to conversion.
                        </p>
                    </div>

                    <div class="hiw-grid">
                        <article
                            v-for="(item, index) in howItWorks"
                            :key="item.title"
                            class="step-card reveal"
                            :style="{ transitionDelay: `${index * 0.08}s` }"
                        >
                            <div class="step-n">{{ item.step }}</div>
                            <div class="step-icon-wrap">
                                <component :is="item.icon" />
                            </div>
                            <div class="step-title">{{ item.title }}</div>
                            <p class="step-desc">{{ item.description }}</p>
                            <div class="step-num-bg">{{ item.bg }}</div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="features">
                <div class="si">
                    <div class="f-header">
                        <div>
                            <div class="slabel reveal">Platform Features</div>
                            <h2 class="reveal">
                                Built for <em>serious</em><br />
                                B2B growth
                            </h2>
                        </div>
                        <p class="sdesc reveal">
                            Everything you need to capture, qualify, and convert
                            high-value leads in the UAE market.
                        </p>
                    </div>

                    <div class="f-grid">
                        <article
                            v-for="(item, index) in features"
                            :key="item.title"
                            class="f-card reveal"
                            :class="{ wide: item.wide }"
                            :style="{
                                transitionDelay: `${(index % 3) * 0.06}s`,
                            }"
                        >
                            <div>
                                <div class="f-icon">
                                    <component :is="item.icon" />
                                </div>
                                <div class="f-title">{{ item.title }}</div>
                                <p class="f-desc">{{ item.description }}</p>
                            </div>
                            <div
                                v-if="item.wide"
                                class="f-anim"
                                aria-hidden="true"
                            >
                                <div class="bar" />
                                <div class="bar" />
                                <div class="bar" />
                                <div class="bar" />
                                <div class="bar" />
                                <div class="bar" />
                                <div class="bar" />
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="industries">
                <div class="si">
                    <div class="slabel reveal">Industries Served</div>
                    <h2 class="reveal">
                        Leads across every <em>major sector</em><br />
                        in the UAE
                    </h2>

                    <div class="ind-grid">
                        <article
                            v-for="(item, index) in industries"
                            :key="item.name"
                            class="ind-card reveal"
                            :style="{
                                transitionDelay: `${(index % 4) * 0.05}s`,
                            }"
                        >
                            <div class="ind-icon">
                                <component :is="item.icon" />
                            </div>
                            <div class="ind-name">{{ item.name }}</div>
                            <div class="ind-sub">{{ item.sub }}</div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="numbers">
                <div class="si zero-pad">
                    <div class="num-grid">
                        <article
                            v-for="(item, index) in numberCards"
                            :key="item.label"
                            class="num-card reveal"
                            :style="{ transitionDelay: `${index * 0.08}s` }"
                        >
                            <div class="num-val">
                                {{ item.value }}<span>{{ item.suffix }}</span>
                            </div>
                            <div class="num-lbl">{{ item.label }}</div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="pricing">
                <div class="si">
                    <div class="p-header">
                        <div class="slabel reveal centered">Pricing</div>
                        <h2 class="reveal">
                            Transparent pricing.<br />
                            <em>Exceptional</em> value.
                        </h2>
                        <p class="sdesc reveal centered-copy">
                            No hidden fees. No lock-ins. Scale as your pipeline
                            grows.
                        </p>
                    </div>

                    <div class="p-grid">
                        <article
                            v-for="(item, index) in pricingPlans"
                            :key="item.name"
                            class="p-card reveal"
                            :class="{ featured: item.featured }"
                            :style="{ transitionDelay: `${index * 0.08}s` }"
                        >
                            <div v-if="item.badge" class="feat-badge">
                                {{ item.badge }}
                            </div>
                            <div class="p-tier">{{ item.name }}</div>
                            <div
                                class="p-amount"
                                :class="{ compact: item.price === 'Custom' }"
                            >
                                <template v-if="item.price !== 'Custom'">
                                    <sup>AED</sup>{{ item.price }}
                                </template>
                                <template v-else>
                                    {{ item.price }}
                                </template>
                            </div>
                            <div class="p-period">{{ item.period }}</div>
                            <div class="p-div" />
                            <ul class="p-feats">
                                <li
                                    v-for="feature in item.features"
                                    :key="feature"
                                >
                                    {{ feature }}
                                </li>
                            </ul>
                            <Link :href="contact()" class="p-btn">
                                {{ item.cta }}
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            <section id="testimonials">
                <div class="si">
                    <div class="t-header">
                        <div class="slabel reveal centered">Testimonials</div>
                        <h2 class="reveal">
                            Trusted by UAE's<br />
                            <em>leading</em> businesses
                        </h2>
                    </div>

                    <div class="t-grid">
                        <article
                            v-for="(item, index) in testimonials"
                            :key="item.name"
                            class="t-card reveal"
                            :style="{ transitionDelay: `${index * 0.12}s` }"
                        >
                            <div class="t-stars">
                                <span
                                    v-for="star in 5"
                                    :key="star"
                                    class="t-star"
                                    >★</span
                                >
                            </div>
                            <div class="t-qmark">"</div>
                            <p class="t-text">{{ item.quote }}</p>
                            <div class="t-div" />
                            <div class="t-author">
                                <div class="t-avatar">{{ item.initials }}</div>
                                <div>
                                    <div class="t-name">{{ item.name }}</div>
                                    <div class="t-company">
                                        {{ item.company }}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="cta">
                <div class="cta-inner">
                    <div class="cta-text">
                        <h2 class="reveal">
                            Ready to fill your pipeline<br />
                            with <em>qualified</em> leads?
                        </h2>
                        <p class="reveal">
                            Join growing UAE businesses already using LeadNest
                            to improve sales quality.
                        </p>
                    </div>
                    <div class="reveal">
                        <Link :href="contact()" class="btn-gold">
                            Start Today
                            <ArrowRight class="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <footer>
                <div class="ft">
                    <div class="fb-brand">
                        <Link :href="home()" class="logo">
                            <div class="logo-mark">LN</div>
                            <span class="logo-text light"
                                >Lead<span>Nest</span></span
                            >
                        </Link>
                        <p>
                            UAE's premium B2B lead generation platform,
                            connecting verified leads with serious buyers across
                            major industries.
                        </p>
                    </div>

                    <div class="ft-col">
                        <h4>Platform</h4>
                        <ul>
                            <li
                                v-for="item in navItems"
                                :key="`footer-${item.label}`"
                            >
                                <a :href="item.href">{{ item.label }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="ft-col">
                        <h4>Account</h4>
                        <ul>
                            <li v-if="!$page.props.auth.user && canRegister">
                                <Link :href="register()">Register</Link>
                            </li>
                            <li v-if="!$page.props.auth.user">
                                <Link :href="login()">Login</Link>
                            </li>
                            <li v-if="$page.props.auth.user">
                                <Link :href="dashboard()">Dashboard</Link>
                            </li>
                            <li>
                                <Link :href="contact()">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div class="ft-col">
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <Link :href="contact()">Talk to Sales</Link>
                            </li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#testimonials">Testimonials</a></li>
                        </ul>
                    </div>
                </div>

                <div class="fb-bottom">
                    <p>© 2026 LeadNest. All rights reserved.</p>
                    <div class="fb-links">
                        <Link :href="contact()">Contact</Link>
                        <Link :href="home()">Home</Link>
                    </div>
                </div>
            </footer>
        </div>
    </PublicLayout>
</template>

<style scoped>
:global(html) {
    scroll-behavior: auto;
}

.leadnest-white {
    --black: #0d0d0d;
    --white: #ffffff;
    --off: #f8f7f4;
    --off2: #f2f0eb;
    --g2: #333333;
    --g3: #555555;
    --g4: #888888;
    --g6: #dddddd;
    --g7: #ebebeb;
    --gold: #b8892a;
    --gold-l: #d4a84b;
    --gold-ll: #f0d080;
    --gold-bg: #fdf9f0;
    --fd: 'Playfair Display', serif;
    --fb: 'Outfit', sans-serif;
    --fm: 'JetBrains Mono', monospace;
    --r: 6px;
    --shadow: 0 2px 24px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 8px 48px rgba(0, 0, 0, 0.12);
    background: var(--white);
    color: var(--black);
    font-family: var(--fb);
    overflow-x: hidden;
}

.leadnest-white *,
.leadnest-white *::before,
.leadnest-white *::after {
    box-sizing: border-box;
}

.site-nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 5rem;
    transition:
        background 0.4s,
        box-shadow 0.4s,
        padding 0.4s;
}

.site-nav.scrolled {
    background: rgba(255, 255, 255, 0.96);
    box-shadow:
        0 1px 0 var(--g7),
        0 4px 24px rgba(0, 0, 0, 0.06);
    padding: 0.9rem 5rem;
    backdrop-filter: blur(12px);
}

.logo {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
}

.logo-mark {
    display: flex;
    height: 36px;
    width: 36px;
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
    color: var(--gold-l);
    font-family: var(--fm);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.05em;
}

.logo-text {
    color: var(--black);
    font-family: var(--fd);
    font-size: 1.35rem;
    font-weight: 500;
    letter-spacing: 0.01em;
}

.logo-text span {
    color: var(--gold);
}

.logo-text.light {
    color: var(--white);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-links a {
    position: relative;
    color: var(--g3);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s;
}

.nav-links a::after {
    content: '';
    position: absolute;
    right: 100%;
    bottom: -3px;
    left: 0;
    height: 1.5px;
    background: var(--gold);
    transition: right 0.35s;
}

.nav-links a:hover {
    color: var(--black);
}

.nav-links a:hover::after {
    right: 0;
}

.nav-cta {
    border-radius: 2px;
    background: var(--black);
    color: var(--white) !important;
    padding: 0.6rem 1.6rem;
}

.nav-cta:hover {
    background: var(--gold);
    color: var(--black) !important;
}

.nav-cta::after {
    display: none;
}

.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    border: none;
    background: transparent;
    padding: 0;
}

.hamburger span {
    height: 1.5px;
    width: 22px;
    background: var(--black);
}

.mob-menu {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background: var(--white);
}

.mob-menu.open {
    display: flex;
}

.mob-menu a {
    color: var(--black);
    font-family: var(--fd);
    font-size: 2rem;
    text-decoration: none;
}

.mob-close {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    border: none;
    background: transparent;
    color: var(--black);
    font-size: 2rem;
}

#hero {
    position: relative;
    display: flex;
    min-height: 100vh;
    align-items: center;
    overflow: hidden;
    background: var(--white);
    padding: 10rem 5rem 5rem;
}

#hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.08) 1px,
        transparent 1px
    );
    background-size: 28px 28px;
    pointer-events: none;
}

#hero::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.hero-left,
.hero-right {
    position: relative;
    z-index: 1;
    flex: 1;
}

.hero-left {
    max-width: 620px;
}

.hero-right {
    display: flex;
    justify-content: flex-end;
    padding-left: 4rem;
}

.hero-eyebrow,
.slabel {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
}

.hero-eyebrow::before,
.slabel::before {
    content: '';
    height: 1px;
    width: 28px;
    background: var(--gold);
}

h1,
h2 {
    font-family: var(--fd);
    font-weight: 500;
    letter-spacing: -0.02em;
}

h1 {
    margin-bottom: 1.75rem;
    font-size: clamp(3rem, 5.5vw, 5rem);
    line-height: 1.08;
}

h2 {
    margin-bottom: 1.25rem;
    font-size: clamp(1.9rem, 3.8vw, 3rem);
    line-height: 1.1;
}

h1 em,
h2 em {
    color: var(--gold);
    font-style: italic;
    font-weight: 400;
}

.hero-sub,
.sdesc {
    color: var(--g3);
    font-size: 0.95rem;
    font-weight: 300;
    line-height: 1.8;
}

.hero-sub {
    margin-bottom: 2.5rem;
    max-width: 480px;
    font-size: 1.02rem;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
}

.btn-primary,
.btn-gold {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    border-radius: 2px;
    padding: 0.9rem 2rem;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
        background 0.3s,
        transform 0.3s;
}

.btn-primary {
    background: var(--black);
    color: var(--white);
}

.btn-primary:hover {
    background: var(--gold);
    color: var(--black);
    transform: translateY(-2px);
}

.btn-ghost {
    border-bottom: 1.5px solid var(--g6);
    color: var(--g3);
    padding-bottom: 2px;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
}

.hero-stats {
    display: flex;
    gap: 3rem;
    margin-top: 3.5rem;
    border-top: 1px solid var(--g7);
    padding-top: 3rem;
}

.s-num,
.num-val {
    font-family: var(--fd);
    font-weight: 500;
    line-height: 1;
}

.s-num {
    color: var(--black);
    font-size: 2.2rem;
}

.s-num span,
.num-val span {
    color: var(--gold);
}

.s-lbl,
.num-lbl,
.p-tier {
    color: var(--g4);
    font-family: var(--fm);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.hero-visual {
    position: relative;
    width: 380px;
}

.hv-card {
    border: 1px solid var(--g7);
    border-radius: 12px;
    background: var(--white);
    padding: 1.8rem;
    box-shadow: var(--shadow-lg);
    transition: transform 0.5s ease;
}

.hv-card.c1 {
    position: relative;
    z-index: 3;
    transform: rotate(-1deg);
}

.hv-card.c2 {
    position: absolute;
    top: 20px;
    right: -16px;
    left: 16px;
    z-index: 2;
    background: var(--off);
    transform: rotate(1.5deg);
}

.hv-card.c3 {
    position: absolute;
    top: 40px;
    right: -32px;
    left: 32px;
    z-index: 1;
    background: var(--off2);
    transform: rotate(3.5deg);
}

.hero-visual:hover .c1 {
    transform: translateY(-8px) rotate(0deg);
}

.hero-visual:hover .c2 {
    transform: translateY(-4px) rotate(0deg);
}

.hero-visual:hover .c3 {
    transform: rotate(0deg);
}

.hv-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
    border-radius: 2px;
    background: var(--gold-bg);
    padding: 0.25rem 0.7rem;
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.hv-tag::before {
    content: '●';
    font-size: 0.45rem;
}

.hv-name {
    margin-bottom: 0.3rem;
    font-family: var(--fd);
    font-size: 1.2rem;
}

.hv-company,
.p-period,
.ind-sub,
.t-company {
    color: var(--g4);
}

.hv-company {
    margin-bottom: 1.2rem;
    font-size: 0.82rem;
}

.hv-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--g7);
    padding: 0.65rem 0;
}

.hv-row:last-child {
    border-bottom: none;
}

.hv-row-lbl {
    color: var(--g4);
    font-size: 0.78rem;
}

.hv-row-val {
    color: var(--black);
    font-size: 0.82rem;
    font-weight: 500;
}

.hv-row-val.gold {
    color: var(--gold);
}

.hv-badge {
    display: inline-block;
    border-radius: 20px;
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 500;
}

.hv-badge.green {
    background: #edf7ee;
    color: #2d7a34;
}

.hv-badge.amber {
    background: var(--gold-bg);
    color: var(--gold);
}

.marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--g7);
    border-bottom: 1px solid var(--g7);
    background: var(--off);
    padding: 1rem 0;
}

.marquee-track {
    display: flex;
    gap: 2.5rem;
    white-space: nowrap;
    animation: marquee 22s linear infinite;
}

.mi {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.75rem;
    color: var(--g4);
    font-family: var(--fm);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.mi::before {
    content: '◆';
    color: var(--gold);
    font-size: 0.4rem;
}

section {
    position: relative;
}

.si {
    max-width: 1200px;
    margin: 0 auto;
    padding: 7rem 5rem;
}

.zero-pad {
    padding-top: 0;
    padding-bottom: 0;
}

#hiw,
#numbers,
#cta,
footer {
    background: var(--black);
}

#hiw .slabel,
#numbers .num-lbl,
#cta h2,
footer .logo-text,
footer h4 {
    color: var(--white);
}

#hiw .slabel::before {
    background: var(--gold-l);
}

#hiw h2,
#cta h2 {
    color: var(--white);
}

#hiw .sdesc,
#cta p,
footer p,
footer a {
    color: rgba(255, 255, 255, 0.45);
}

.hiw-header,
.f-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 4.5rem;
}

.hiw-grid,
.num-grid {
    display: grid;
    gap: 1px;
}

.hiw-grid {
    grid-template-columns: repeat(3, 1fr);
    background: rgba(255, 255, 255, 0.06);
}

.step-card,
.num-card {
    position: relative;
    overflow: hidden;
    background: var(--black);
    transition: background 0.4s;
}

.step-card {
    padding: 3.5rem 3rem;
}

.num-card {
    padding: 3.5rem 3rem;
    text-align: center;
}

.step-card:hover,
.num-card:hover {
    background: #111111;
}

.step-card::after {
    content: '';
    position: absolute;
    right: 100%;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--gold);
    transition: right 0.5s;
}

.step-card:hover::after {
    right: 0;
}

.step-n {
    margin-bottom: 2.5rem;
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
}

.step-icon-wrap,
.f-icon,
.ind-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-icon-wrap {
    height: 56px;
    width: 56px;
    margin-bottom: 2rem;
    border: 1px solid rgba(184, 137, 42, 0.3);
    background: rgba(184, 137, 42, 0.05);
}

.step-icon-wrap :deep(svg) {
    height: 22px;
    width: 22px;
    color: var(--gold-l);
    stroke-width: 1.5;
}

.step-title,
.f-title,
.ind-name {
    font-family: var(--fd);
    font-weight: 500;
}

.step-title {
    margin-bottom: 0.9rem;
    color: var(--white);
    font-size: 1.3rem;
}

.step-desc {
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.85;
}

.step-num-bg {
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.025);
    font-family: var(--fd);
    font-size: 7rem;
    font-weight: 700;
    line-height: 1;
    user-select: none;
}

#features {
    background: var(--off);
}

.f-grid,
.t-grid,
.p-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
}

.f-card,
.p-card,
.t-card {
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--white);
    box-shadow: var(--shadow);
}

.f-card {
    position: relative;
    overflow: hidden;
    padding: 2.5rem;
    transition:
        transform 0.4s,
        box-shadow 0.4s,
        border-color 0.4s;
}

.f-card:hover,
.p-card:hover,
.t-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.f-card::before,
.t-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
}

.f-card::before {
    inset: 0 auto auto 0;
    height: 2px;
    width: 100%;
    background: transparent;
    transition: background 0.4s;
}

.f-card:hover::before {
    background: linear-gradient(90deg, var(--gold), var(--gold-ll));
}

.f-icon {
    height: 46px;
    width: 46px;
    margin-bottom: 1.5rem;
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--off);
}

.f-icon :deep(svg),
.ind-icon :deep(svg) {
    height: 20px;
    width: 20px;
    color: var(--gold);
    stroke-width: 1.5;
}

.f-title {
    margin-bottom: 0.7rem;
    font-size: 1.15rem;
}

.f-desc {
    color: var(--g3);
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.8;
}

.f-card.wide {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.f-anim {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 160px;
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--off);
    padding: 1.5rem;
}

.bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(to top, var(--gold), var(--gold-ll));
    animation: barPulse 2s ease-in-out infinite;
}

.bar:nth-child(1) {
    height: 40%;
}

.bar:nth-child(2) {
    height: 72%;
    animation-delay: 0.15s;
}

.bar:nth-child(3) {
    height: 55%;
    animation-delay: 0.3s;
}

.bar:nth-child(4) {
    height: 88%;
    animation-delay: 0.45s;
}

.bar:nth-child(5) {
    height: 44%;
    animation-delay: 0.6s;
}

.bar:nth-child(6) {
    height: 96%;
    animation-delay: 0.75s;
}

.bar:nth-child(7) {
    height: 62%;
    animation-delay: 0.9s;
}

.ind-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    margin-top: 4rem;
    background: var(--g7);
}

.ind-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    text-align: center;
    transition:
        background 0.35s,
        transform 0.35s;
}

.ind-card:hover {
    background: var(--off);
    transform: translateY(-3px);
}

.ind-icon {
    height: 56px;
    width: 56px;
    margin: 0 auto 1.25rem;
    border: 1px solid var(--g7);
    border-radius: var(--r);
}

.ind-card:hover .ind-icon {
    border-color: var(--gold-ll);
    background: var(--gold-bg);
}

.ind-name {
    margin-bottom: 0.3rem;
    font-size: 1.05rem;
}

.num-grid {
    grid-template-columns: repeat(4, 1fr);
    background: rgba(255, 255, 255, 0.06);
}

.num-val {
    margin-bottom: 0.5rem;
    color: var(--white);
    font-size: 3rem;
}

#pricing {
    background: var(--off);
}

.p-header,
.t-header {
    margin-bottom: 5rem;
    text-align: center;
}

.centered {
    justify-content: center;
}

.centered-copy {
    margin: 0 auto;
}

.p-card {
    position: relative;
    padding: 3rem 2.5rem;
    transition:
        transform 0.4s,
        box-shadow 0.4s;
}

.p-card.featured {
    transform: translateY(-12px);
    border-color: var(--black);
    background: var(--black);
}

.p-card.featured:hover {
    transform: translateY(-18px);
}

.feat-badge {
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0 0 4px 4px;
    background: var(--gold);
    padding: 0.3rem 1rem;
    color: var(--black);
    font-family: var(--fm);
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.p-tier {
    margin-bottom: 1.5rem;
    color: var(--gold);
}

.p-amount {
    margin-bottom: 0.4rem;
    font-family: var(--fd);
    font-size: 3.2rem;
    line-height: 1;
}

.p-amount sup {
    margin-top: 0.5rem;
    color: var(--gold);
    font-size: 1.3rem;
    vertical-align: top;
}

.p-amount.compact {
    font-size: 2rem;
    line-height: 1.3;
}

.p-card.featured .p-amount,
.p-card.featured .p-feats li,
.p-card.featured .p-period {
    color: var(--white);
}

.p-card.featured .p-period {
    color: rgba(255, 255, 255, 0.35);
}

.p-div,
.t-div {
    height: 1px;
    background: var(--g7);
}

.p-div {
    margin: 1.75rem 0;
}

.p-card.featured .p-div {
    background: rgba(255, 255, 255, 0.08);
}

.p-feats {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin-bottom: 2.25rem;
    list-style: none;
}

.p-feats li {
    display: flex;
    gap: 0.75rem;
    color: var(--g3);
    font-size: 0.88rem;
    font-weight: 300;
}

.p-feats li::before {
    content: '◆';
    margin-top: 0.5rem;
    flex-shrink: 0;
    color: var(--gold);
    font-size: 0.42rem;
}

.p-btn {
    display: block;
    border: 1.5px solid var(--g6);
    border-radius: 2px;
    padding: 0.85rem;
    color: var(--black);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
}

.p-card.featured .p-btn {
    border-color: var(--gold);
    background: var(--gold);
    color: var(--black);
}

.p-btn:hover {
    border-color: var(--black);
    background: var(--black);
    color: var(--white);
}

.p-card.featured .p-btn:hover {
    border-color: var(--white);
    background: var(--white);
}

#testimonials {
    background: var(--white);
}

.t-card {
    position: relative;
    background: var(--off);
    padding: 2.75rem 2.5rem;
    transition:
        transform 0.4s,
        box-shadow 0.4s,
        border-color 0.4s;
}

.t-card::before {
    border: 1.5px solid transparent;
    transition: border-color 0.4s;
}

.t-card:hover::before {
    border-color: var(--gold-ll);
}

.t-stars {
    display: flex;
    gap: 3px;
    margin-bottom: 1.25rem;
}

.t-star {
    color: var(--gold);
    font-size: 0.75rem;
}

.t-qmark {
    margin-bottom: 1.25rem;
    color: var(--gold-ll);
    font-family: var(--fd);
    font-size: 3.5rem;
    line-height: 0.6;
    opacity: 0.7;
}

.t-text {
    margin-bottom: 2rem;
    color: var(--g2);
    font-family: var(--fd);
    font-size: 1.1rem;
    font-style: italic;
    line-height: 1.75;
}

.t-div {
    margin-bottom: 1.5rem;
}

.t-author {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.t-avatar {
    display: flex;
    height: 42px;
    width: 42px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background: var(--black);
    color: var(--gold-l);
    font-family: var(--fm);
    font-size: 0.65rem;
}

.t-name {
    color: var(--black);
    font-size: 0.88rem;
    font-weight: 500;
}

#cta {
    border-top: 3px solid var(--gold);
}

.cta-inner {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    padding: 5.5rem 5rem;
}

.cta-text p {
    margin-top: 0.5rem;
}

.btn-gold {
    background: var(--gold);
    color: var(--black);
    font-weight: 600;
}

.btn-gold:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
}

footer {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.ft {
    display: grid;
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4rem;
    padding: 5rem 5rem 4rem;
}

.fb-brand p {
    max-width: 250px;
    margin-bottom: 2rem;
    font-size: 0.88rem;
    line-height: 1.85;
}

.ft-col h4 {
    margin-bottom: 1.5rem;
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
}

.ft-col ul {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
}

.ft-col ul a {
    font-size: 0.88rem;
    text-decoration: none;
}

.fb-bottom {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 1.5rem 5rem;
}

.fb-bottom p,
.fb-links a {
    color: rgba(255, 255, 255, 0.25);
    font-size: 0.76rem;
    text-decoration: none;
}

.fb-links {
    display: flex;
    gap: 2rem;
}

.reveal {
    opacity: 0;
    transform: translateY(28px);
    transition:
        opacity 0.75s,
        transform 0.75s;
}

.reveal.visible {
    opacity: 1;
    transform: none;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

@keyframes barPulse {
    0%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
}

@media (max-width: 1024px) {
    .hero-right,
    .hv-card.c2,
    .hv-card.c3 {
        display: none;
    }

    .p-grid,
    .t-grid {
        grid-template-columns: 1fr;
    }

    .p-card.featured {
        transform: none;
    }

    .p-card.featured:hover {
        transform: translateY(-6px);
    }

    .ind-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .ft {
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem;
    }

    .f-grid {
        grid-template-columns: 1fr 1fr;
    }

    .f-card.wide {
        grid-column: span 1;
        grid-template-columns: 1fr;
    }

    .num-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .site-nav {
        padding: 1.2rem 1.5rem;
    }

    .site-nav.scrolled {
        padding: 0.8rem 1.5rem;
    }

    .nav-links {
        display: none;
    }

    .hamburger {
        display: flex;
    }

    #hero {
        flex-direction: column;
        padding: 8rem 1.5rem 4rem;
    }

    .si,
    .cta-inner,
    .ft,
    .fb-bottom {
        padding-right: 1.5rem;
        padding-left: 1.5rem;
    }

    .si {
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .hiw-grid,
    .f-grid,
    .t-grid {
        grid-template-columns: 1fr;
    }

    .cta-inner,
    .fb-bottom {
        flex-direction: column;
        text-align: center;
    }

    .ft {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .hero-stats,
    .hiw-header {
        flex-wrap: wrap;
        gap: 2rem;
    }

    .num-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (prefers-reduced-motion: reduce) {
    .reveal,
    .marquee-track,
    .bar,
    .hv-card,
    .btn-primary,
    .btn-gold,
    .f-card,
    .p-card,
    .t-card {
        animation: none !important;
        transition: none !important;
    }

    .reveal {
        opacity: 1;
        transform: none;
    }
}
</style>
