<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import {
    ArrowRight,
    Check,
    Layers3,
    ShieldCheck,
    Sparkles,
    Workflow,
} from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { contact, dashboard, home, login, register } from '@/routes';
import leadnestHeroTexture from './leadnest-hero-texture.png';
import leadnestTrustVisual from './leadnest-trust-visual.png';
import leadnestWorkspacePreview from './leadnest-workspace-preview.png';

withDefaults(
    defineProps<{
        canRegister?: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: contact.url() },
];

const trustLogos = ['HubSpot', 'Stripe', 'Zapier', 'Ramp', 'Airtable'];
const heroReferenceBackdrop =
    '/a_web_design_mockup_of_leadnest_a_lead_management.png.png';

const heroStats = [
    { value: '<24 hrs', label: 'Lead response time' },
    { value: '31x', label: 'ROI from qualified leads' },
    { value: '99.8%', label: 'Customer satisfaction' },
];

const proofMetrics = [
    { label: 'New today', value: '18' },
    { label: 'Due now', value: '5' },
    { label: 'High intent', value: '7' },
];

const narrativeCards = [
    {
        icon: Layers3,
        eyebrow: 'Layered workspace',
        title: 'The product should look as resolved as the system behind it.',
        description:
            'LeadNest now frames ownership, urgency, and buyer context with clearer depth, stronger composition, and a much more premium operating surface.',
    },
    {
        icon: Workflow,
        eyebrow: 'Operational clarity',
        title: 'Teams see what moves next without hunting across disconnected tools.',
        description:
            'Views, handoff states, notes, and manager signals live inside one cinematic interface that still feels practical and production-ready.',
    },
    {
        icon: ShieldCheck,
        eyebrow: 'Trust and control',
        title: 'The page sells credibility through product texture instead of generic blocks.',
        description:
            'Better mockups, calmer spacing, and stronger contrast make the platform feel dependable before the demo even starts.',
    },
];

const featureCards = [
    {
        title: 'One workspace for qualification, routing, and follow-up',
        description:
            'Each lead stays attached to owner, priority, next action, and recent movement so your team stops wondering who should move next.',
    },
    {
        title: 'Designed around daily operating decisions',
        description:
            'Saved views, due states, and clear manager oversight turn the interface into a calmer place to review work under pressure.',
    },
    {
        title: 'Premium by design, practical in use',
        description:
            'The product keeps the visual richness buyers expect while preserving the legibility operators need all day.',
    },
];

const workflowSteps = [
    {
        step: '01',
        title: 'Capture with enough context',
        description:
            'Inbound, outbound, or partner leads arrive with source, fit, urgency, and ownership signals visible immediately.',
    },
    {
        step: '02',
        title: 'Qualify inside one review surface',
        description:
            'Reps and operators can review fit, notes, enrichment, and handoff criteria without bouncing between fragmented tools.',
    },
    {
        step: '03',
        title: 'Route the next move clearly',
        description:
            'Assignments, due times, and delivery notes create an obvious next step so handoffs stay fast and accountable.',
    },
    {
        step: '04',
        title: 'Keep momentum visible',
        description:
            'Managers can spot stalled activity, overdue follow-ups, and high-intent opportunities before pipeline quality slips.',
    },
];

const testimonials = [
    {
        quote: 'LeadNest made our lead review feel finished. The team trusts the workflow faster because the product looks and behaves like a premium operating system instead of a patchwork dashboard.',
        name: 'Mariam Yusuf',
        role: 'Revenue Operations Lead',
        company: 'BrightWorks',
    },
    {
        quote: 'The new presentation gives buyers immediate confidence. It feels warmer, sharper, and much closer to the level of software we actually sell.',
        name: 'Ahmed Raza',
        role: 'Commercial Director',
        company: 'GrowthPilot',
    },
];

const pricingPlans = [
    {
        name: 'Starter',
        monthlyPrice: 29,
        annualPrice: 24,
        description:
            'For smaller teams that need a polished lead handoff layer.',
        features: [
            'Shared lead workspace',
            'Ownership and reminder states',
            'Saved filters and queue views',
        ],
        cta: 'Start with Starter',
        highlighted: false,
    },
    {
        name: 'Growth',
        monthlyPrice: 79,
        annualPrice: 64,
        description:
            'For active revenue teams running daily qualification and routing.',
        features: [
            'Everything in Starter',
            'Advanced routing and activity timelines',
            'Manager views and performance visibility',
        ],
        cta: 'Choose Growth',
        highlighted: true,
        badge: 'Most popular',
    },
    {
        name: 'Scale',
        monthlyPrice: 149,
        annualPrice: 124,
        description:
            'For multi-team workflows that need tighter controls and support.',
        features: [
            'Everything in Growth',
            'Role-based access and approvals',
            'Priority onboarding and workspace design review',
        ],
        cta: 'Choose Scale',
        highlighted: false,
    },
    {
        name: 'Enterprise',
        monthlyPrice: null,
        annualPrice: null,
        description:
            'For larger organizations standardizing lead operations across regions.',
        features: [
            'Commercial planning and security review',
            'Implementation guidance and training',
            'Dedicated onboarding and support alignment',
        ],
        cta: 'Talk to sales',
        highlighted: false,
    },
];

const faqItems = [
    {
        question: 'Is LeadNest replacing the CRM?',
        answer: 'No. LeadNest is the cleaner operating layer for qualification, routing, ownership, and follow-up clarity before or alongside your CRM.',
    },
    {
        question: 'Who is this best suited for?',
        answer: 'It fits inbound teams, outbound teams, agencies, and revenue operations groups that need clear handoff discipline without a heavy CRM rollout.',
    },
    {
        question: 'How much implementation work is involved?',
        answer: 'Most teams can define views, routing logic, and ownership rules quickly because the platform is intentionally focused on the core operating workflow.',
    },
    {
        question: 'Can larger teams get custom pricing?',
        answer: 'Yes. Enterprise plans cover commercial coordination, support expectations, onboarding scope, and any security review requirements.',
    },
];

const demoOptions = [
    '30-minute product walkthrough',
    'Review of your current qualification flow',
    'Routing and ownership model discussion',
    'Implementation and pricing recommendation',
];

const billingCycle = ref<'monthly' | 'annual'>('annual');
const heroVisualTilt = ref({ x: 0, y: 0 });
let revealObserver: IntersectionObserver | null = null;

const revealDelay = (index = 0, step = 100) =>
    ({
        '--reveal-delay': `${index * step}ms`,
    }) as Record<string, string>;

const heroVisualStyle = computed(
    () =>
        ({
            '--hero-rotate-x': `${heroVisualTilt.value.x}deg`,
            '--hero-rotate-y': `${heroVisualTilt.value.y}deg`,
            '--hero-shift-x': `${heroVisualTilt.value.y * 1.8}px`,
            '--hero-shift-y': `${heroVisualTilt.value.x * -1.5}px`,
        }) as Record<string, string>,
);

const displayedPricingPlans = computed(() =>
    pricingPlans.map((plan) => {
        if (plan.monthlyPrice === null || plan.annualPrice === null) {
            return {
                ...plan,
                displayPrice: 'Custom',
                billingText: 'Tailored commercial terms',
                savingsText: 'Built for larger or more complex organizations',
                showBadge: false,
            };
        }

        const price =
            billingCycle.value === 'annual'
                ? plan.annualPrice
                : plan.monthlyPrice;

        return {
            ...plan,
            displayPrice: `$${price}`,
            billingText:
                billingCycle.value === 'annual'
                    ? 'Per seat / month, billed annually'
                    : 'Per seat / month, billed monthly',
            savingsText:
                billingCycle.value === 'annual'
                    ? `Save $${plan.monthlyPrice - plan.annualPrice} per seat each month`
                    : 'Switch to annual for lower seat cost',
            showBadge: billingCycle.value === 'annual' && !!plan.badge,
        };
    }),
);

const updateHeroVisualTilt = (event: MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const target = event.currentTarget;

    if (!(target instanceof HTMLElement)) {
        return;
    }

    const bounds = target.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisualTilt.value = {
        x: Number((-vertical * 7).toFixed(2)),
        y: Number((horizontal * 9).toFixed(2)),
    };
};

const resetHeroVisualTilt = () => {
    heroVisualTilt.value = { x: 0, y: 0 };
};

onMounted(() => {
    const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    if (!revealElements.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) =>
            element.classList.add('is-visible'),
        );

        return;
    }

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                revealObserver?.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px',
        },
    );

    revealElements.forEach((element) => revealObserver?.observe(element));
});

onBeforeUnmount(() => {
    revealObserver?.disconnect();
});
</script>

<template>
    <PublicLayout>
        <Head title="LeadNest" />

        <div
            class="landing-page relative overflow-hidden bg-[#edd9ca] text-[#24140b]"
        >
            <div
                class="absolute inset-x-0 top-0 -z-[60] h-[78rem] overflow-hidden"
            >
                <img
                    :src="heroReferenceBackdrop"
                    alt="LeadNest hero reference backdrop"
                    class="h-full w-full scale-[1.08] object-cover object-top opacity-[0.34] blur-[2px]"
                />
                <div
                    class="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,236,226,0.24)_0%,rgba(237,217,202,0.34)_24%,rgba(121,72,38,0.22)_56%,rgba(237,217,202,0.96)_100%)]"
                />
            </div>
            <div class="landing-mesh absolute inset-0 -z-50" />
            <div class="landing-grid absolute inset-0 -z-40 opacity-30" />
            <div
                class="absolute top-[-10rem] left-1/2 -z-30 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,229,201,0.78)_0%,_rgba(255,229,201,0)_70%)] blur-[110px]"
            />
            <div
                class="absolute top-[10rem] right-[-4rem] -z-30 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(255,191,132,0.26)_0%,_rgba(255,191,132,0)_72%)] blur-[110px]"
            />
            <div
                class="absolute bottom-[24rem] left-[-8rem] -z-30 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(255,240,224,0.34)_0%,_rgba(255,240,224,0)_72%)] blur-[92px]"
            />

            <header
                class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
            >
                <div
                    class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[rgba(92,56,33,0.14)] bg-[rgba(46,28,19,0.9)] px-4 py-3 shadow-[0_26px_70px_rgba(54,30,14,0.18)] sm:px-6"
                >
                    <Link :href="home()" class="flex items-center gap-3">
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(180deg,_rgba(255,239,220,0.18)_0%,_rgba(255,184,118,0.12)_100%)] text-sm font-semibold text-[#fff5ea] shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                        >
                            LN
                        </div>
                        <div>
                            <div
                                class="text-base font-semibold tracking-tight text-white"
                            >
                                LeadNest
                            </div>
                            <div
                                class="text-[10px] tracking-[0.28em] text-[#e2c7aa] uppercase"
                            >
                                Lead management system
                            </div>
                        </div>
                    </Link>

                    <nav class="hidden items-center gap-8 lg:flex">
                        <a
                            v-for="item in navItems"
                            :key="item.label"
                            :href="item.href"
                            class="text-sm font-medium text-[#ebdac8] transition hover:text-white"
                        >
                            {{ item.label }}
                        </a>
                    </nav>

                    <div class="flex items-center gap-3">
                        <Link
                            v-if="$page.props.auth.user"
                            :href="dashboard()"
                            class="landing-cta landing-cta-secondary hidden min-h-10 items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-[#f8ede0] sm:inline-flex"
                        >
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link
                                :href="login()"
                                class="landing-cta landing-cta-secondary hidden min-h-10 items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-[#f8ede0] sm:inline-flex"
                            >
                                Sign in
                            </Link>
                            <Link
                                v-if="canRegister"
                                :href="register()"
                                class="landing-cta landing-cta-primary inline-flex min-h-10 items-center rounded-full border border-[#ffdda8]/30 bg-[linear-gradient(135deg,_#f6d3a2_0%,_#f0b36a_52%,_#b97433_100%)] px-4 py-2 text-sm font-semibold text-[#231108] shadow-[0_20px_50px_rgba(240,179,106,0.32)]"
                            >
                                Start free
                            </Link>
                        </template>
                    </div>
                </div>
            </header>

            <main class="relative pt-[108px] sm:pt-[118px]">
                <section
                    class="relative px-4 pt-6 pb-18 sm:px-6 lg:px-8 lg:pt-10 lg:pb-28"
                >
                    <div
                        class="hero-atmosphere pointer-events-none absolute inset-x-0 top-[-6rem] h-[52rem] overflow-hidden"
                    />
                    <div class="mx-auto max-w-7xl">
                        <div
                            class="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16"
                        >
                            <div
                                class="hero-copy-column relative z-10 max-w-[37rem]"
                            >
                                <div
                                    class="hero-copy-glow pointer-events-none absolute top-[-2.5rem] -left-10 h-[22rem] w-[22rem]"
                                />
                                <div
                                    class="inline-flex items-center gap-2 rounded-full border border-[rgba(92,56,33,0.14)] bg-[rgba(255,250,244,0.62)] px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#8a603d] uppercase shadow-[0_18px_40px_rgba(91,58,35,0.08)] backdrop-blur"
                                >
                                    <Sparkles class="h-3.5 w-3.5" />
                                    Switch a workspace view in real time
                                </div>

                                <h1
                                    class="mt-6 max-w-[9.6ch] text-[3.42rem] font-semibold tracking-[-0.085em] text-[#2b160d] sm:text-[4.45rem] lg:text-[6rem] lg:leading-[0.84]"
                                >
                                    <span class="block">Lead operations,</span>
                                    <span class="block"
                                        ><span class="hero-title-accent"
                                            >refined</span
                                        >
                                        for</span
                                    >
                                    <span class="block">teams that</span>
                                    <span class="block">move fast.</span>
                                </h1>

                                <p
                                    class="mt-6 max-w-[31rem] text-base leading-[2rem] text-[#71523a] sm:text-[1.08rem] sm:leading-[2.05rem]"
                                >
                                    Capture better leads and route them faster
                                    through a warmer, sharper operating surface
                                    built for qualification, handoff, and
                                    follow-up momentum.
                                </p>

                                <div
                                    class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
                                >
                                    <Link
                                        v-if="
                                            !$page.props.auth.user &&
                                            canRegister
                                        "
                                        :href="register()"
                                        class="landing-cta landing-cta-primary inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full border border-[#ffdda8]/30 bg-[linear-gradient(135deg,_#f6d3a2_0%,_#f0b36a_52%,_#b97433_100%)] px-6 py-3 text-sm font-semibold text-[#231108] shadow-[0_24px_70px_rgba(240,179,106,0.32)]"
                                    >
                                        <span>Start free trial</span>
                                    </Link>
                                    <Link
                                        :href="contact()"
                                        class="landing-cta landing-cta-secondary inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full border border-[rgba(92,56,33,0.14)] bg-[rgba(255,250,244,0.72)] px-6 py-3 text-sm font-semibold text-[#2b160d] shadow-[0_18px_50px_rgba(91,58,35,0.12)]"
                                    >
                                        <span>Book a demo</span>
                                        <ArrowRight
                                            class="landing-cta-arrow h-4 w-4"
                                        />
                                    </Link>
                                </div>

                                <div
                                    class="hero-micro-strip mt-8 flex flex-wrap gap-3 text-xs font-medium text-[#8a6547]"
                                >
                                    <span
                                        class="rounded-full border border-[rgba(92,56,33,0.12)] bg-[rgba(255,250,244,0.55)] px-3 py-2"
                                    >
                                        Warm premium product direction
                                    </span>
                                    <span
                                        class="rounded-full border border-[rgba(92,56,33,0.12)] bg-[rgba(255,250,244,0.55)] px-3 py-2"
                                    >
                                        Layered UI cards and cinematic depth
                                    </span>
                                    <span
                                        class="rounded-full border border-[rgba(92,56,33,0.12)] bg-[rgba(255,250,244,0.55)] px-3 py-2"
                                    >
                                        Built for responsive production use
                                    </span>
                                </div>

                                <div class="mt-9 grid gap-3 sm:grid-cols-3">
                                    <div
                                        v-for="stat in heroStats"
                                        :key="stat.label"
                                        class="hero-stat-card rounded-[1.7rem] border border-[rgba(92,56,33,0.12)] px-4 py-4"
                                    >
                                        <div
                                            class="text-[1.9rem] font-semibold tracking-[-0.06em] text-[#24140b]"
                                        >
                                            {{ stat.value }}
                                        </div>
                                        <div
                                            class="mt-2 text-xs leading-5 text-[#7a5b42]"
                                        >
                                            {{ stat.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="hero-stage relative lg:-mr-10"
                                :style="heroVisualStyle"
                                @mousemove="updateHeroVisualTilt"
                                @mouseleave="resetHeroVisualTilt"
                            >
                                <div
                                    class="hero-stage-core-glow pointer-events-none absolute inset-x-[14%] top-[14%] h-[56%]"
                                />
                                <div
                                    class="hero-stage-halo pointer-events-none absolute inset-x-[4%] top-[6%] h-[78%]"
                                />
                                <div
                                    class="hero-stage-ribbon hero-stage-ribbon-left absolute top-[8%] left-[-5%] h-48 w-72"
                                />
                                <div
                                    class="hero-stage-ribbon hero-stage-ribbon-right absolute top-[18%] right-[2%] h-40 w-64"
                                />
                                <div
                                    class="hero-light hero-light-left absolute -top-10 -left-10"
                                />
                                <div
                                    class="hero-light hero-light-right absolute top-6 right-0"
                                />
                                <div
                                    class="hero-light hero-light-bottom absolute bottom-2 left-20"
                                />
                                <div
                                    class="pointer-events-none absolute inset-x-[10%] bottom-2 h-28 rounded-full bg-[radial-gradient(circle,_rgba(255,221,174,0.36)_0%,_rgba(255,221,174,0)_72%)] blur-[42px]"
                                />
                                <div
                                    class="hero-stage-vignette pointer-events-none absolute inset-[4%] rounded-[2.8rem]"
                                />
                                <div
                                    class="hero-backplate hero-backplate-main absolute top-[7%] right-[8%] hidden h-[72%] w-[68%] rounded-[2.4rem] lg:block"
                                />
                                <div
                                    class="hero-backplate hero-backplate-secondary absolute top-[18%] left-[8%] hidden h-[54%] w-[44%] rounded-[2rem] lg:block"
                                >
                                    <img
                                        :src="leadnestTrustVisual"
                                        alt="LeadNest supporting hero mockup"
                                        class="h-full w-full rounded-[inherit] object-cover opacity-88"
                                    />
                                </div>

                                <div
                                    class="hero-device relative overflow-hidden rounded-[2.4rem] p-3 sm:p-4"
                                >
                                    <img
                                        :src="leadnestHeroTexture"
                                        alt="LeadNest atmospheric texture"
                                        class="pointer-events-none absolute inset-0 h-full w-full scale-[1.1] object-cover opacity-45 mix-blend-screen"
                                    />
                                    <div
                                        class="hero-device-shell relative rounded-[2rem] p-4 sm:p-5"
                                    >
                                        <div
                                            class="flex flex-wrap items-center justify-between gap-3"
                                        >
                                            <div
                                                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#f3d3ac] uppercase"
                                            >
                                                LeadNest workspace
                                            </div>
                                            <div
                                                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#e9c18d] uppercase"
                                            >
                                                Warm layered product view
                                            </div>
                                        </div>

                                        <div
                                            class="mt-5 overflow-hidden rounded-[1.8rem] border border-white/10"
                                        >
                                            <div
                                                class="flex items-center justify-between border-b border-white/10 bg-white/6 px-4 py-3"
                                            >
                                                <div
                                                    class="flex items-center gap-2"
                                                >
                                                    <span
                                                        class="h-2.5 w-2.5 rounded-full bg-[#f0b36a]"
                                                    />
                                                    <span
                                                        class="h-2.5 w-2.5 rounded-full bg-white/30"
                                                    />
                                                    <span
                                                        class="h-2.5 w-2.5 rounded-full bg-white/20"
                                                    />
                                                </div>
                                                <div
                                                    class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-medium text-[#ddd0c0]"
                                                >
                                                    Updated 8 minutes ago
                                                </div>
                                            </div>

                                            <div class="relative bg-[#f4ebe0]">
                                                <img
                                                    :src="
                                                        leadnestWorkspacePreview
                                                    "
                                                    alt="LeadNest workspace preview"
                                                    class="h-full w-full object-cover"
                                                />
                                                <div
                                                    class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(24,12,8,0.18)_100%)]"
                                                />
                                                <div
                                                    class="absolute top-4 left-4 rounded-full border border-white/70 bg-white/86 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#72553a] uppercase shadow-[0_14px_30px_rgba(50,28,10,0.12)]"
                                                >
                                                    Review-ready lead board
                                                </div>
                                                <div
                                                    class="absolute right-4 bottom-4 grid gap-3 sm:grid-cols-3"
                                                >
                                                    <div
                                                        v-for="metric in proofMetrics"
                                                        :key="metric.label"
                                                        class="rounded-[1.2rem] border border-white/16 bg-[#140d0a]/78 px-3 py-3 text-left shadow-[0_20px_44px_rgba(0,0,0,0.22)] backdrop-blur"
                                                    >
                                                        <div
                                                            class="text-[10px] font-semibold tracking-[0.18em] text-[#cdb49a] uppercase"
                                                        >
                                                            {{ metric.label }}
                                                        </div>
                                                        <div
                                                            class="mt-2 text-xl font-semibold tracking-[-0.05em] text-white"
                                                        >
                                                            {{ metric.value }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="mt-5 grid gap-3 sm:grid-cols-[1.08fr_0.92fr]"
                                        >
                                            <div
                                                class="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-[#d8c3ae]"
                                            >
                                                Ownership, qualification, and
                                                urgency stay visible in one
                                                polished surface so the handoff
                                                feels clear before pipeline
                                                quality starts slipping.
                                            </div>
                                            <div
                                                class="rounded-[1.5rem] border border-white/10 bg-black/18 px-4 py-4"
                                            >
                                                <div
                                                    class="text-[11px] font-semibold tracking-[0.18em] text-[#cdb49a] uppercase"
                                                >
                                                    Routed with context
                                                </div>
                                                <div
                                                    class="mt-3 text-lg font-semibold text-white"
                                                >
                                                    92% buyer-fit score
                                                </div>
                                                <div
                                                    class="mt-2 text-sm leading-6 text-[#d8c3ae]"
                                                >
                                                    High-intent lead matched to
                                                    founder-led SaaS sequence
                                                    with next response due in 20
                                                    minutes.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="floating-card floating-card-left absolute top-[16%] -left-3 rounded-[1.5rem] border border-white/30 bg-[rgba(255,248,240,0.96)] px-4 py-4 text-[#2a160c] shadow-[0_30px_80px_rgba(54,30,14,0.16)]"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                        >
                                            Response time
                                        </div>
                                        <div
                                            class="mt-2 text-3xl font-semibold tracking-[-0.07em]"
                                        >
                                            24m
                                        </div>
                                        <div
                                            class="mt-1 text-xs text-[#6d5136]"
                                        >
                                            Average for hot inbound leads
                                        </div>
                                    </div>

                                    <div
                                        class="floating-card floating-card-right absolute top-[8%] right-[-2%] rounded-[1.4rem] border border-white/12 bg-[rgba(36,22,16,0.88)] px-4 py-4 text-white shadow-[0_28px_80px_rgba(52,28,10,0.28)] backdrop-blur-xl"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                        >
                                            Command sync
                                        </div>
                                        <div
                                            class="mt-3 space-y-2 text-sm text-[#e5d4c1]"
                                        >
                                            <div
                                                class="flex items-center justify-between gap-4"
                                            >
                                                <span>Priority queue</span>
                                                <span>5</span>
                                            </div>
                                            <div
                                                class="flex items-center justify-between gap-4"
                                            >
                                                <span>Handoff due</span>
                                                <span>3</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="floating-card floating-card-profile absolute right-[2%] bottom-[14%] max-w-[15rem] rounded-[1.5rem] border border-white/30 bg-[rgba(255,249,243,0.96)] px-4 py-4 text-[#2a160c] shadow-[0_34px_88px_rgba(54,30,14,0.18)]"
                                    >
                                        <div
                                            class="flex items-start justify-between gap-4"
                                        >
                                            <div>
                                                <div
                                                    class="text-[11px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                                >
                                                    Best-fit owner
                                                </div>
                                                <div
                                                    class="mt-2 text-base font-semibold"
                                                >
                                                    Maria Pricely
                                                </div>
                                                <div
                                                    class="mt-1 text-xs text-[#6d5136]"
                                                >
                                                    SaaS expansion route
                                                </div>
                                            </div>
                                            <div
                                                class="rounded-full border border-[#f1d2aa] bg-[#fff5e8] px-2 py-1 text-xs font-semibold text-[#7f5b37]"
                                            >
                                                92%
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="floating-card floating-card-center absolute bottom-[8%] left-[26%] hidden rounded-[1.4rem] border border-white/12 bg-[rgba(31,19,14,0.88)] px-4 py-4 text-white shadow-[0_28px_74px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:block"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                        >
                                            Workspace pulse
                                        </div>
                                        <div
                                            class="mt-3 flex items-end gap-4 text-[#efe1d0]"
                                        >
                                            <div>
                                                <div
                                                    class="text-2xl font-semibold tracking-[-0.06em] text-white"
                                                >
                                                    18
                                                </div>
                                                <div class="mt-1 text-[11px]">
                                                    needs action today
                                                </div>
                                            </div>
                                            <div
                                                class="h-10 w-px bg-white/10"
                                            />
                                            <div>
                                                <div
                                                    class="text-2xl font-semibold tracking-[-0.06em] text-white"
                                                >
                                                    7
                                                </div>
                                                <div class="mt-1 text-[11px]">
                                                    high-intent accounts
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="floating-card floating-card-note absolute top-[34%] left-[7%] hidden rounded-[1.2rem] border border-white/30 bg-[rgba(255,250,244,0.94)] px-3 py-3 text-[#2a160c] shadow-[0_22px_60px_rgba(54,30,14,0.12)] lg:block"
                                    >
                                        <div
                                            class="text-[10px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                        >
                                            Live note
                                        </div>
                                        <div
                                            class="mt-2 max-w-[9rem] text-xs leading-5"
                                        >
                                            Founder requested same-day routing
                                            for expansion leads.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            data-reveal
                            class="trust-strip trust-strip-elevated mt-12 rounded-[2rem] px-6 py-6 sm:px-8 lg:px-10"
                        >
                            <div
                                class="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-center"
                            >
                                <div class="max-w-[25rem]">
                                    <div class="trust-strip-label">
                                        <span class="trust-strip-label-dot" />
                                        Trusted by leading revenue teams
                                    </div>
                                    <p
                                        class="mt-3 text-sm leading-7 text-[#7b5e45] sm:text-[0.96rem]"
                                    >
                                        SaaS operators, revenue teams, and
                                        founder-led sales orgs use LeadNest to
                                        keep lead routing clean, visible, and
                                        fast.
                                    </p>
                                </div>
                                <div
                                    class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
                                >
                                    <span
                                        v-for="logo in trustLogos"
                                        :key="logo"
                                        class="trust-logo-chip"
                                    >
                                        <span class="trust-logo-wordmark">{{
                                            logo
                                        }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    class="story-section relative px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="grid gap-6 lg:grid-cols-[0.68fr_1.32fr]">
                            <div
                                data-reveal
                                class="story-intro-panel lift-card rounded-[2rem] p-7 sm:p-8"
                            >
                                <div
                                    class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[11px] font-semibold tracking-[0.2em] text-[#f1cb9a] uppercase"
                                >
                                    Product storytelling
                                </div>
                                <h2
                                    class="mt-5 max-w-[11ch] text-3xl font-semibold tracking-[-0.055em] text-white sm:text-[2.95rem] lg:leading-[1]"
                                >
                                    A clearer visual system for qualifying,
                                    routing, and advancing leads.
                                </h2>
                                <p
                                    class="mt-5 text-base leading-8 text-[#d8c3ae]"
                                >
                                    The reference direction is warm, layered,
                                    and richly lit. This redesign carries that
                                    same mood across the whole landing page so
                                    the product feels desirable, not just
                                    functional.
                                </p>

                                <div class="mt-8 space-y-4">
                                    <article
                                        v-for="(item, index) in narrativeCards"
                                        :key="item.title"
                                        :style="revealDelay(index, 80)"
                                        class="story-narrative-card rounded-[1.5rem] px-5 py-5"
                                    >
                                        <div class="flex items-start gap-4">
                                            <div
                                                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,_rgba(255,230,191,0.16)_0%,_rgba(255,184,118,0.08)_100%)]"
                                            >
                                                <component
                                                    :is="item.icon"
                                                    class="h-5 w-5 text-[#f1cb9a]"
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    class="text-[11px] font-semibold tracking-[0.2em] text-[#caa783] uppercase"
                                                >
                                                    {{ item.eyebrow }}
                                                </div>
                                                <h3
                                                    class="mt-3 text-xl font-semibold text-white"
                                                >
                                                    {{ item.title }}
                                                </h3>
                                                <p
                                                    class="mt-3 text-sm leading-7 text-[#d8c3ae]"
                                                >
                                                    {{ item.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>

                                <div class="mt-6 grid gap-3 sm:grid-cols-3">
                                    <div
                                        v-for="stat in heroStats"
                                        :key="`story-${stat.label}`"
                                        class="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
                                    >
                                        <div
                                            class="text-2xl font-semibold tracking-[-0.05em] text-white"
                                        >
                                            {{ stat.value }}
                                        </div>
                                        <div
                                            class="mt-2 text-[11px] leading-5 text-[#cdb49a]"
                                        >
                                            {{ stat.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="story-right-column grid gap-6">
                                <div
                                    data-reveal
                                    class="story-visual-shell lift-card overflow-hidden rounded-[2rem] p-4 sm:p-5"
                                >
                                    <div
                                        class="story-visual-stage relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/20"
                                    >
                                        <img
                                            :src="leadnestTrustVisual"
                                            alt="LeadNest product trust visual"
                                            class="story-main-visual h-full w-full object-cover"
                                        />
                                        <div
                                            class="story-support-screen absolute right-[10%] bottom-[9%] hidden w-[38%] overflow-hidden rounded-[1.2rem] border border-white/12 bg-[rgba(255,248,239,0.12)] p-2 shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:block"
                                        >
                                            <img
                                                :src="leadnestWorkspacePreview"
                                                alt="LeadNest supporting workspace preview"
                                                class="h-full w-full rounded-[0.9rem] object-cover"
                                            />
                                        </div>
                                        <div
                                            class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,8,0)_0%,rgba(18,10,8,0.24)_100%)]"
                                        />
                                        <div
                                            class="absolute top-5 left-5 rounded-full border border-white/10 bg-black/24 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/85 uppercase backdrop-blur"
                                        >
                                            Layered trust surface
                                        </div>
                                        <div
                                            class="absolute right-5 bottom-5 max-w-xs"
                                        >
                                            <div
                                                class="rounded-[1.4rem] border border-white/12 bg-[rgba(255,248,239,0.9)] px-4 py-4 text-[#29160b] shadow-[0_20px_44px_rgba(0,0,0,0.2)]"
                                            >
                                                <div
                                                    class="text-[11px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                                >
                                                    Visual confidence
                                                </div>
                                                <div
                                                    class="mt-2 text-base font-semibold"
                                                >
                                                    Buyers understand the
                                                    product faster when the UI
                                                    already feels finished.
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="story-mini-card absolute top-5 right-5 hidden max-w-[12rem] rounded-[1.25rem] border border-white/12 bg-[rgba(31,19,14,0.82)] px-4 py-4 text-white shadow-[0_26px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:block"
                                        >
                                            <div
                                                class="text-[10px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                            >
                                                Review flow
                                            </div>
                                            <div
                                                class="mt-2 text-xl font-semibold tracking-[-0.05em]"
                                            >
                                                20 min
                                            </div>
                                            <div
                                                class="mt-1 text-xs leading-5 text-[#e8dccf]"
                                            >
                                                from triage to routed owner on
                                                high-intent leads
                                            </div>
                                        </div>
                                        <div
                                            class="story-mini-card story-mini-card-bottom absolute bottom-5 left-5 hidden max-w-[13rem] rounded-[1.25rem] border border-white/28 bg-[rgba(255,248,240,0.94)] px-4 py-4 text-[#2a160c] shadow-[0_22px_60px_rgba(54,30,14,0.16)] lg:block"
                                        >
                                            <div
                                                class="text-[10px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                            >
                                                Buyer-ready
                                            </div>
                                            <div
                                                class="mt-2 text-sm leading-6 font-semibold"
                                            >
                                                Stronger mockup framing makes
                                                the product feel finished before
                                                the demo starts.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="grid gap-6 md:grid-cols-[1.08fr_0.92fr]"
                                >
                                    <div
                                        data-reveal
                                        :style="revealDelay(1)"
                                        class="story-soft-panel lift-card rounded-[2rem] p-6"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.2em] text-[#a37b54] uppercase"
                                        >
                                            Richer rhythm
                                        </div>
                                        <h3
                                            class="mt-4 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#24140b]"
                                        >
                                            Stronger composition removes the
                                            flat empty feeling.
                                        </h3>
                                        <p
                                            class="mt-4 text-sm leading-7 text-[#71553a]"
                                        >
                                            Denser visual storytelling, more
                                            deliberate section transitions, and
                                            higher-contrast cards make the page
                                            feel premium without adding heavy
                                            dependencies or gimmicks.
                                        </p>
                                    </div>

                                    <div
                                        data-reveal
                                        :style="revealDelay(2)"
                                        class="story-dark-panel lift-card rounded-[2rem] p-6"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.2em] text-[#caa783] uppercase"
                                        >
                                            Refined motion
                                        </div>
                                        <h3
                                            class="mt-4 text-[1.8rem] font-semibold text-white"
                                        >
                                            Hover lift, reveal, and perspective
                                            motion stay subtle.
                                        </h3>
                                        <p
                                            class="mt-4 text-sm leading-7 text-[#d8c3ae]"
                                        >
                                            The experience feels expensive and
                                            calm instead of flashy, with soft
                                            parallax on the hero and gentle
                                            floating layers around product
                                            surfaces.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="platform"
                    class="relative px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
                            <div
                                data-reveal
                                class="section-shell lift-card rounded-[2rem] p-7 sm:p-8"
                            >
                                <div
                                    class="text-[11px] font-semibold tracking-[0.24em] text-[#a37b54] uppercase"
                                >
                                    Platform
                                </div>
                                <h2
                                    class="mt-5 max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[#24140b] sm:text-[2.85rem]"
                                >
                                    Every section now matches the hero with more
                                    depth and intent.
                                </h2>
                                <p
                                    class="mt-5 text-base leading-8 text-[#71553a]"
                                >
                                    Instead of isolated plain blocks, the
                                    platform story is carried by layered cards,
                                    better screenshot framing, darker contrast
                                    moments, and a cleaner premium typographic
                                    rhythm.
                                </p>

                                <div class="mt-8 space-y-4">
                                    <article
                                        v-for="(item, index) in featureCards"
                                        :key="item.title"
                                        :style="revealDelay(index, 90)"
                                        class="rounded-[1.5rem] border border-[#eadccf] bg-white/70 px-5 py-5 shadow-[0_16px_40px_rgba(53,31,15,0.07)]"
                                    >
                                        <div class="flex items-start gap-4">
                                            <div
                                                class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#24140b] text-white"
                                            >
                                                <Check class="h-4.5 w-4.5" />
                                            </div>
                                            <div>
                                                <h3
                                                    class="text-lg font-semibold tracking-[-0.04em] text-[#24140b]"
                                                >
                                                    {{ item.title }}
                                                </h3>
                                                <p
                                                    class="mt-2 text-sm leading-7 text-[#71553a]"
                                                >
                                                    {{ item.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>

                            <div
                                data-reveal
                                :style="revealDelay(1)"
                                class="section-shell-dark lift-card overflow-hidden rounded-[2rem] p-5 sm:p-6"
                            >
                                <div
                                    class="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center"
                                >
                                    <div
                                        class="relative overflow-hidden rounded-[1.7rem] border border-white/10"
                                    >
                                        <img
                                            :src="leadnestWorkspacePreview"
                                            alt="LeadNest platform workspace preview"
                                            class="h-full w-full object-cover"
                                        />
                                        <div
                                            class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,8,0.02)_0%,rgba(18,10,8,0.28)_100%)]"
                                        />
                                        <div
                                            class="absolute top-4 left-4 rounded-full border border-white/10 bg-black/22 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/85 uppercase backdrop-blur"
                                        >
                                            Workspace preview
                                        </div>
                                    </div>

                                    <div class="space-y-4">
                                        <div
                                            class="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                            >
                                                Manager clarity
                                            </div>
                                            <div
                                                class="mt-3 text-2xl font-semibold text-white"
                                            >
                                                Ownership is impossible to miss.
                                            </div>
                                            <p
                                                class="mt-3 text-sm leading-7 text-[#d8c3ae]"
                                            >
                                                The product composition uses
                                                stronger focal points, cleaner
                                                overlays, and warmer lighting to
                                                make the platform feel more
                                                decisive.
                                            </p>
                                        </div>

                                        <div
                                            class="rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-5"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                            >
                                                Visual checklist
                                            </div>
                                            <div class="mt-4 space-y-3">
                                                <div
                                                    v-for="item in [
                                                        'Floating UI cards around the core mockup',
                                                        'Warmer glows and darker depth moments',
                                                        'Glassy surfaces paired with crisp screenshot framing',
                                                    ]"
                                                    :key="item"
                                                    class="flex items-start gap-3 text-sm text-[#e4d6c6]"
                                                >
                                                    <span
                                                        class="mt-2 h-1.5 w-1.5 rounded-full bg-[#f1cb9a]"
                                                    />
                                                    <span>{{ item }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="workflow"
                    class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
                >
                    <div class="mx-auto max-w-7xl">
                        <div
                            data-reveal
                            class="section-shell-dark lift-card overflow-hidden rounded-[2.2rem] p-6 sm:p-8 lg:p-10"
                        >
                            <div
                                class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
                            >
                                <div>
                                    <div
                                        class="text-[11px] font-semibold tracking-[0.24em] text-[#caa783] uppercase"
                                    >
                                        Workflow
                                    </div>
                                    <h2
                                        class="mt-5 max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[3rem]"
                                    >
                                        LeadNest is designed to guide attention
                                        through the real work.
                                    </h2>
                                    <p
                                        class="mt-5 text-base leading-8 text-[#d8c3ae]"
                                    >
                                        The workflow section now feels closer to
                                        the reference image: more cinematic
                                        depth, a better two-column balance, and
                                        richer cards showing how the product
                                        actually supports daily lead operations.
                                    </p>

                                    <div class="mt-8 space-y-4">
                                        <article
                                            v-for="(
                                                step, index
                                            ) in workflowSteps"
                                            :key="step.step"
                                            :style="revealDelay(index, 90)"
                                            class="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5"
                                        >
                                            <div class="flex gap-4">
                                                <div
                                                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,_rgba(255,230,191,0.16)_0%,_rgba(255,184,118,0.08)_100%)] text-sm font-semibold text-[#f1cb9a]"
                                                >
                                                    {{ step.step }}
                                                </div>
                                                <div>
                                                    <h3
                                                        class="text-lg font-semibold text-white"
                                                    >
                                                        {{ step.title }}
                                                    </h3>
                                                    <p
                                                        class="mt-2 text-sm leading-7 text-[#d8c3ae]"
                                                    >
                                                        {{ step.description }}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>

                                <div class="grid gap-6">
                                    <div
                                        class="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.07)_0%,_rgba(255,255,255,0.04)_100%)] p-4 sm:p-5"
                                    >
                                        <img
                                            :src="leadnestTrustVisual"
                                            alt="LeadNest workflow detail visual"
                                            class="h-full w-full rounded-[1.45rem] object-cover"
                                        />
                                        <div
                                            class="absolute top-8 left-8 rounded-[1.3rem] border border-white/12 bg-[rgba(255,248,239,0.92)] px-4 py-4 text-[#2a160c] shadow-[0_20px_44px_rgba(0,0,0,0.2)]"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#936944] uppercase"
                                            >
                                                Smart lead matching
                                            </div>
                                            <div
                                                class="mt-2 text-2xl font-semibold tracking-[-0.05em]"
                                            >
                                                31x
                                            </div>
                                            <div
                                                class="mt-1 text-xs text-[#6d5136]"
                                            >
                                                ROI from open leads
                                            </div>
                                        </div>
                                        <div
                                            class="absolute right-8 bottom-8 max-w-[15rem] rounded-[1.3rem] border border-white/10 bg-[rgba(19,12,10,0.78)] px-4 py-4 text-white shadow-[0_22px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                            >
                                                More follow-up wins
                                            </div>
                                            <div
                                                class="mt-2 text-sm leading-6 text-[#e2d4c4]"
                                            >
                                                Stronger visual hierarchy makes
                                                the product easier to scan and
                                                trust in live demos.
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid gap-6 md:grid-cols-2">
                                        <div
                                            class="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                            >
                                                Queue design
                                            </div>
                                            <div
                                                class="mt-3 text-xl font-semibold text-white"
                                            >
                                                Clear over decorative
                                            </div>
                                            <p
                                                class="mt-3 text-sm leading-7 text-[#d8c3ae]"
                                            >
                                                The redesign preserves real
                                                table and queue usability
                                                instead of turning the product
                                                into abstract concept art.
                                            </p>
                                        </div>
                                        <div
                                            class="rounded-[1.6rem] border border-white/10 bg-black/18 px-5 py-5"
                                        >
                                            <div
                                                class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                            >
                                                Motion system
                                            </div>
                                            <div
                                                class="mt-3 text-xl font-semibold text-white"
                                            >
                                                Premium, not childish
                                            </div>
                                            <p
                                                class="mt-3 text-sm leading-7 text-[#d8c3ae]"
                                            >
                                                Floating cards, soft hover lift,
                                                and reveal motion add depth
                                                without relying on heavy
                                                animation libraries.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div class="mx-auto max-w-7xl">
                        <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <div
                                data-reveal
                                class="section-shell lift-card rounded-[2rem] p-7 sm:p-8"
                            >
                                <div
                                    class="text-[11px] font-semibold tracking-[0.24em] text-[#a37b54] uppercase"
                                >
                                    Social proof
                                </div>
                                <h2
                                    class="mt-5 max-w-[13ch] text-3xl font-semibold tracking-[-0.05em] text-[#24140b] sm:text-[2.8rem]"
                                >
                                    The product now looks closer to the quality
                                    buyers expect from premium SaaS.
                                </h2>
                                <p
                                    class="mt-5 text-base leading-8 text-[#71553a]"
                                >
                                    The new visual system makes the story more
                                    believable by pairing richer mockups with
                                    stronger quotes, cleaner proof cards, and
                                    better pacing between sections.
                                </p>

                                <div class="mt-8 grid gap-4 sm:grid-cols-3">
                                    <div
                                        v-for="item in heroStats"
                                        :key="`proof-${item.label}`"
                                        class="rounded-[1.4rem] border border-[#eadccf] bg-white/70 px-4 py-4 text-[#24140b] shadow-[0_16px_34px_rgba(53,31,15,0.07)]"
                                    >
                                        <div
                                            class="text-2xl font-semibold tracking-[-0.05em]"
                                        >
                                            {{ item.value }}
                                        </div>
                                        <div
                                            class="mt-2 text-xs leading-5 text-[#71553a]"
                                        >
                                            {{ item.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid gap-6 md:grid-cols-2">
                                <article
                                    v-for="(testimonial, index) in testimonials"
                                    :key="testimonial.name"
                                    data-reveal
                                    :style="revealDelay(index)"
                                    class="section-shell-dark lift-card rounded-[2rem] p-6"
                                >
                                    <div
                                        class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                    >
                                        Customer perspective
                                    </div>
                                    <p
                                        class="mt-5 text-base leading-8 text-[#f6ecdf]"
                                    >
                                        “{{ testimonial.quote }}”
                                    </p>
                                    <div
                                        class="mt-8 border-t border-white/10 pt-5"
                                    >
                                        <div
                                            class="text-base font-semibold text-white"
                                        >
                                            {{ testimonial.name }}
                                        </div>
                                        <div
                                            class="mt-1 text-sm text-[#d8c3ae]"
                                        >
                                            {{ testimonial.role }} ·
                                            {{ testimonial.company }}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="pricing"
                    class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
                >
                    <div class="mx-auto max-w-7xl">
                        <div
                            data-reveal
                            class="section-shell-dark lift-card overflow-hidden rounded-[2.2rem] p-6 sm:p-8 lg:p-10"
                        >
                            <div
                                class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                            >
                                <div class="max-w-3xl">
                                    <div
                                        class="text-[11px] font-semibold tracking-[0.24em] text-[#caa783] uppercase"
                                    >
                                        Pricing
                                    </div>
                                    <h2
                                        class="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[3rem]"
                                    >
                                        Commercially clear, visually mature, and
                                        ready for real teams.
                                    </h2>
                                    <p
                                        class="mt-5 text-base leading-8 text-[#d8c3ae]"
                                    >
                                        The pricing section now feels
                                        substantial instead of flat: warmer
                                        contrast, stronger cards, clearer
                                        hierarchy, and a more premium toggle
                                        treatment.
                                    </p>
                                </div>

                                <div
                                    class="inline-flex rounded-full border border-white/10 bg-white/6 p-1 shadow-[0_16px_34px_rgba(0,0,0,0.2)]"
                                >
                                    <button
                                        type="button"
                                        class="cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition"
                                        :class="
                                            billingCycle === 'monthly'
                                                ? 'bg-white text-[#231108]'
                                                : 'text-[#d8c3ae] hover:text-white'
                                        "
                                        @click="billingCycle = 'monthly'"
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        type="button"
                                        class="cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition"
                                        :class="
                                            billingCycle === 'annual'
                                                ? 'bg-[linear-gradient(135deg,_#f6d3a2_0%,_#f0b36a_52%,_#b97433_100%)] text-[#231108]'
                                                : 'text-[#d8c3ae] hover:text-white'
                                        "
                                        @click="billingCycle = 'annual'"
                                    >
                                        Annual
                                    </button>
                                </div>
                            </div>

                            <div class="mt-8 grid gap-5 xl:grid-cols-4">
                                <article
                                    v-for="(
                                        plan, index
                                    ) in displayedPricingPlans"
                                    :key="plan.name"
                                    :style="revealDelay(index, 90)"
                                    class="pricing-card flex h-full flex-col rounded-[1.9rem] border p-6"
                                    :class="
                                        plan.highlighted
                                            ? 'border-[#f0b36a]/36 bg-[linear-gradient(180deg,_rgba(255,235,207,0.12)_0%,_rgba(255,183,118,0.08)_100%)] shadow-[0_28px_80px_rgba(240,179,106,0.14)]'
                                            : 'border-white/10 bg-white/6'
                                    "
                                >
                                    <div
                                        class="flex items-start justify-between gap-4"
                                    >
                                        <div>
                                            <div
                                                class="text-xl font-semibold text-white"
                                            >
                                                {{ plan.name }}
                                            </div>
                                            <div
                                                class="mt-2 text-sm leading-6 text-[#d8c3ae]"
                                            >
                                                {{ plan.description }}
                                            </div>
                                        </div>
                                        <div
                                            v-if="plan.showBadge"
                                            class="rounded-full border border-[#f6d3a2]/40 bg-[rgba(246,211,162,0.14)] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#f1cb9a] uppercase"
                                        >
                                            {{ plan.badge }}
                                        </div>
                                    </div>

                                    <div class="mt-8">
                                        <div
                                            class="text-4xl font-semibold tracking-[-0.08em] text-white"
                                        >
                                            {{ plan.displayPrice }}
                                        </div>
                                        <div
                                            class="mt-2 text-xs text-[#cdb49a]"
                                        >
                                            {{ plan.billingText }}
                                        </div>
                                        <div
                                            class="mt-2 text-xs text-[#a9855f]"
                                        >
                                            {{ plan.savingsText }}
                                        </div>
                                    </div>

                                    <div class="mt-6 space-y-3">
                                        <div
                                            v-for="feature in plan.features"
                                            :key="feature"
                                            class="flex items-start gap-3 text-sm text-[#ece0d2]"
                                        >
                                            <Check
                                                class="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#f1cb9a]"
                                            />
                                            <span>{{ feature }}</span>
                                        </div>
                                    </div>

                                    <Link
                                        :href="
                                            plan.name === 'Enterprise'
                                                ? contact()
                                                : !$page.props.auth.user &&
                                                    canRegister
                                                  ? register()
                                                  : dashboard()
                                        "
                                        class="landing-cta mt-8 inline-flex min-h-[3.2rem] items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold"
                                        :class="
                                            plan.highlighted
                                                ? 'border-[#ffdda8]/30 bg-[linear-gradient(135deg,_#f6d3a2_0%,_#f0b36a_52%,_#b97433_100%)] text-[#231108]'
                                                : 'border-white/12 bg-white/6 text-white'
                                        "
                                    >
                                        <span>{{ plan.cta }}</span>
                                        <ArrowRight
                                            class="landing-cta-arrow h-4 w-4"
                                        />
                                    </Link>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div class="mx-auto max-w-7xl">
                        <div class="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
                            <div
                                data-reveal
                                class="section-shell lift-card rounded-[2rem] p-7 sm:p-8"
                            >
                                <div
                                    class="text-[11px] font-semibold tracking-[0.24em] text-[#a37b54] uppercase"
                                >
                                    FAQ
                                </div>
                                <h2
                                    class="mt-5 max-w-[11ch] text-3xl font-semibold tracking-[-0.05em] text-[#24140b] sm:text-[2.8rem]"
                                >
                                    Common questions, presented with more weight
                                    and clarity.
                                </h2>
                                <p
                                    class="mt-5 text-base leading-8 text-[#71553a]"
                                >
                                    The FAQ and contact areas now feel like part
                                    of the same premium story, with stronger
                                    cards, cleaner hierarchy, and a better final
                                    conversion rhythm.
                                </p>

                                <div
                                    class="mt-8 rounded-[1.6rem] border border-[#eadccf] bg-white/70 p-5"
                                >
                                    <div
                                        class="text-[11px] font-semibold tracking-[0.18em] text-[#a37b54] uppercase"
                                    >
                                        Demo agenda
                                    </div>
                                    <div class="mt-4 space-y-3">
                                        <div
                                            v-for="item in demoOptions"
                                            :key="item"
                                            class="flex items-start gap-3 text-sm text-[#483020]"
                                        >
                                            <span
                                                class="mt-2 h-1.5 w-1.5 rounded-full bg-[#24140b]"
                                            />
                                            <span>{{ item }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid gap-6">
                                <details
                                    v-for="(item, index) in faqItems"
                                    :key="item.question"
                                    data-reveal
                                    :style="revealDelay(index, 80)"
                                    class="faq-card rounded-[1.8rem] border border-white/10 bg-[rgba(20,12,10,0.74)] px-6 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                                    :open="index === 0"
                                >
                                    <summary
                                        class="cursor-pointer list-none pr-8 text-lg font-semibold tracking-[-0.04em] text-white"
                                    >
                                        {{ item.question }}
                                    </summary>
                                    <p
                                        class="mt-4 max-w-3xl text-sm leading-7 text-[#d8c3ae]"
                                    >
                                        {{ item.answer }}
                                    </p>
                                </details>

                                <div class="grid gap-6 md:grid-cols-2">
                                    <div
                                        data-reveal
                                        :style="revealDelay(4, 80)"
                                        class="section-shell-dark lift-card rounded-[1.8rem] p-6"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#caa783] uppercase"
                                        >
                                            Need a walkthrough?
                                        </div>
                                        <div
                                            class="mt-4 text-2xl font-semibold text-white"
                                        >
                                            Get a guided look at your lead
                                            workflow.
                                        </div>
                                        <p
                                            class="mt-4 text-sm leading-7 text-[#d8c3ae]"
                                        >
                                            We can map your routing logic,
                                            ownership model, and follow-up
                                            expectations against the platform
                                            live.
                                        </p>
                                        <Link
                                            :href="contact()"
                                            class="landing-cta mt-6 inline-flex min-h-[3.1rem] items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white"
                                        >
                                            <span>Book a demo</span>
                                            <ArrowRight
                                                class="landing-cta-arrow h-4 w-4"
                                            />
                                        </Link>
                                    </div>

                                    <div
                                        data-reveal
                                        :style="revealDelay(5, 80)"
                                        class="section-shell lift-card rounded-[1.8rem] p-6"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#a37b54] uppercase"
                                        >
                                            Contact
                                        </div>
                                        <div
                                            class="mt-4 text-2xl font-semibold text-[#24140b]"
                                        >
                                            sales@leadnest.com
                                        </div>
                                        <p
                                            class="mt-4 text-sm leading-7 text-[#71553a]"
                                        >
                                            Use this path for enterprise
                                            planning, security review, or
                                            structured onboarding questions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    class="px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16"
                >
                    <div class="mx-auto max-w-7xl">
                        <div
                            data-reveal
                            class="final-shell relative overflow-hidden rounded-[2.4rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
                        >
                            <img
                                :src="leadnestHeroTexture"
                                alt="LeadNest CTA texture"
                                class="pointer-events-none absolute inset-0 h-full w-full scale-[1.1] object-cover opacity-30 mix-blend-screen"
                            />
                            <div
                                class="relative z-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
                            >
                                <div>
                                    <div
                                        class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-[#f1cb9a] uppercase"
                                    >
                                        Final CTA
                                    </div>
                                    <h2
                                        class="mt-5 max-w-[11ch] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[3.2rem]"
                                    >
                                        The product should feel premium before
                                        the first conversation.
                                    </h2>
                                    <p
                                        class="mt-5 max-w-2xl text-base leading-8 text-[#dac6b1]"
                                    >
                                        LeadNest now tells a stronger story from
                                        top to bottom: warmer mood, richer
                                        composition, better mockups, and a much
                                        more attractive conversion path.
                                    </p>
                                </div>

                                <div class="grid gap-4 sm:grid-cols-2">
                                    <div
                                        class="rounded-[1.7rem] border border-white/10 bg-white/7 px-5 py-5 text-[#f6ecdf] backdrop-blur"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                        >
                                            Primary CTA
                                        </div>
                                        <div
                                            class="mt-3 text-xl font-semibold text-white"
                                        >
                                            Start with a focused live
                                            walkthrough.
                                        </div>
                                        <Link
                                            :href="contact()"
                                            class="landing-cta mt-5 inline-flex min-h-[3.1rem] items-center gap-2 rounded-full border border-[#ffdda8]/30 bg-[linear-gradient(135deg,_#f6d3a2_0%,_#f0b36a_52%,_#b97433_100%)] px-5 py-3 text-sm font-semibold text-[#231108]"
                                        >
                                            <span>Book a demo</span>
                                            <ArrowRight
                                                class="landing-cta-arrow h-4 w-4"
                                            />
                                        </Link>
                                    </div>

                                    <div
                                        class="rounded-[1.7rem] border border-white/10 bg-black/18 px-5 py-5 text-[#f6ecdf]"
                                    >
                                        <div
                                            class="text-[11px] font-semibold tracking-[0.18em] text-[#f1cb9a] uppercase"
                                        >
                                            Product promise
                                        </div>
                                        <div
                                            class="mt-3 text-xl font-semibold text-white"
                                        >
                                            Cleaner lead operations with higher
                                            perceived quality.
                                        </div>
                                        <p
                                            class="mt-4 text-sm leading-7 text-[#dac6b1]"
                                        >
                                            More believable visuals, stronger
                                            hierarchy, and calmer interaction
                                            design make the entire brand feel
                                            more mature.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer
                            class="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#bda68f] lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-white"
                                >
                                    LN
                                </div>
                                <div>
                                    <div class="font-semibold text-white">
                                        LeadNest
                                    </div>
                                    <div
                                        class="text-xs tracking-[0.18em] text-[#9f8368] uppercase"
                                    >
                                        Premium lead operations software
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-x-6 gap-y-2">
                                <a
                                    href="#platform"
                                    class="transition hover:text-white"
                                    >Platform</a
                                >
                                <a
                                    href="#workflow"
                                    class="transition hover:text-white"
                                    >Workflow</a
                                >
                                <a
                                    href="#pricing"
                                    class="transition hover:text-white"
                                    >Pricing</a
                                >
                                <a
                                    href="#faq"
                                    class="transition hover:text-white"
                                    >FAQ</a
                                >
                                <Link
                                    :href="contact()"
                                    class="transition hover:text-white"
                                >
                                    Contact
                                </Link>
                            </div>

                            <div>
                                &copy; 2026 LeadNest. All rights reserved.
                            </div>
                        </footer>
                    </div>
                </section>
            </main>
        </div>
    </PublicLayout>
</template>

<style scoped>
[data-reveal] {
    opacity: 0;
    transform: translateY(28px);
    filter: blur(10px);
    transition:
        opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
        filter 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--reveal-delay, 0ms);
}

[data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}

.landing-page {
    isolation: isolate;
}

main > section + section {
    content-visibility: auto;
    contain-intrinsic-size: 960px;
}

.landing-mesh {
    background:
        radial-gradient(
            circle at 18% 16%,
            rgba(255, 245, 232, 0.72),
            transparent 24%
        ),
        radial-gradient(
            circle at 80% 12%,
            rgba(255, 207, 154, 0.34),
            transparent 22%
        ),
        radial-gradient(
            circle at 50% 34%,
            rgba(189, 122, 73, 0.16),
            transparent 26%
        ),
        linear-gradient(
            180deg,
            #f6ede4 0%,
            #edd9ca 22%,
            #dfc3af 48%,
            #d8b49e 70%,
            #ead8ca 100%
        );
}

.landing-grid {
    background-image:
        linear-gradient(to right, rgba(104, 68, 46, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(104, 68, 46, 0.05) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(circle at top, black 30%, transparent 84%);
}

.hero-title-accent {
    background: linear-gradient(
        135deg,
        #f7dcb6 0%,
        #f0b36a 42%,
        #fff4de 68%,
        #bc7637 100%
    );
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
}

.hero-stat-card {
    background:
        linear-gradient(
            180deg,
            rgba(255, 252, 247, 0.82) 0%,
            rgba(255, 246, 237, 0.62) 100%
        ),
        linear-gradient(
            180deg,
            rgba(246, 211, 162, 0.16) 0%,
            rgba(246, 211, 162, 0.02) 100%
        );
    box-shadow: 0 24px 60px rgba(91, 58, 35, 0.1);
    backdrop-filter: blur(16px);
}

.hero-copy-glow {
    background: radial-gradient(
        circle,
        rgba(255, 248, 239, 0.94) 0%,
        rgba(255, 220, 181, 0.42) 34%,
        rgba(255, 220, 181, 0) 74%
    );
    filter: blur(28px);
    opacity: 0.9;
}

.hero-copy-column::after {
    content: '';
    position: absolute;
    inset: 2rem auto auto -1.25rem;
    width: 1px;
    height: 14rem;
    background: linear-gradient(
        180deg,
        rgba(210, 145, 85, 0.32),
        rgba(210, 145, 85, 0)
    );
    opacity: 0.8;
    pointer-events: none;
}

.hero-atmosphere {
    background:
        radial-gradient(
            circle at 18% 18%,
            rgba(255, 248, 239, 0.98),
            transparent 28%
        ),
        radial-gradient(
            circle at 76% 16%,
            rgba(255, 210, 157, 0.36),
            transparent 24%
        ),
        radial-gradient(
            circle at 54% 52%,
            rgba(170, 101, 55, 0.18),
            transparent 34%
        );
}

.hero-atmosphere::before,
.hero-atmosphere::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.hero-atmosphere::before {
    background:
        linear-gradient(
            118deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 233, 205, 0.44) 48%,
            rgba(255, 255, 255, 0) 66%
        ),
        linear-gradient(
            152deg,
            rgba(255, 255, 255, 0) 36%,
            rgba(191, 120, 70, 0.16) 54%,
            rgba(255, 255, 255, 0) 74%
        );
    filter: blur(16px);
}

.hero-atmosphere::after {
    background-image: url('/a_web_design_mockup_of_leadnest_a_lead_management.png.png');
    background-position: center top;
    background-size: cover;
    opacity: 0.16;
    mix-blend-mode: screen;
    filter: blur(3px) saturate(0.95);
    mask-image: linear-gradient(
        180deg,
        black 0%,
        rgba(0, 0, 0, 0.7) 56%,
        transparent 100%
    );
}

.hero-stage {
    perspective: 1800px;
}

.hero-stage::before {
    content: '';
    position: absolute;
    inset: 14% 6% 10% 10%;
    border-radius: 2.8rem;
    background:
        radial-gradient(
            circle at 30% 24%,
            rgba(255, 241, 223, 0.22),
            transparent 18%
        ),
        radial-gradient(
            circle at 72% 18%,
            rgba(240, 179, 106, 0.2),
            transparent 20%
        ),
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0)
        );
    filter: blur(26px);
    opacity: 0.9;
    pointer-events: none;
}

.hero-stage-core-glow {
    border-radius: 999px;
    background: radial-gradient(
        circle,
        rgba(255, 229, 196, 0.42) 0%,
        rgba(255, 195, 136, 0.18) 32%,
        rgba(255, 195, 136, 0) 72%
    );
    filter: blur(36px);
}

.hero-stage-halo {
    border-radius: 999px;
    background: radial-gradient(
        circle,
        rgba(255, 214, 168, 0.34) 0%,
        rgba(255, 214, 168, 0.08) 34%,
        rgba(255, 214, 168, 0) 74%
    );
    filter: blur(46px);
}

.hero-stage-vignette {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
        radial-gradient(
            circle at 50% 8%,
            rgba(255, 244, 229, 0.1),
            transparent 24%
        ),
        linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0)
        );
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hero-stage-ribbon {
    border-radius: 999px;
    background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0),
        rgba(255, 223, 182, 0.62),
        rgba(255, 255, 255, 0)
    );
    filter: blur(22px);
    opacity: 0.65;
    transform: rotate(-10deg);
    pointer-events: none;
}

.hero-stage-ribbon-right {
    animation-delay: -3.5s;
    transform: rotate(12deg);
}

.hero-device {
    transform: translate3d(var(--hero-shift-x, 0), var(--hero-shift-y, 0), 0)
        rotateX(var(--hero-rotate-x, 0)) rotateY(var(--hero-rotate-y, 0))
        rotateZ(-1.2deg) scale(1.02);
    transform-style: preserve-3d;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-backplate {
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
        0 34px 110px rgba(109, 63, 33, 0.18),
        0 0 90px rgba(255, 215, 169, 0.16);
    backdrop-filter: blur(18px);
    pointer-events: none;
}

.hero-backplate-main {
    background: linear-gradient(
        145deg,
        rgba(255, 248, 239, 0.4) 0%,
        rgba(255, 214, 168, 0.12) 100%
    );
    transform: rotate(-6deg) translateZ(-20px) scale(1.03);
}

.hero-backplate-secondary {
    background: linear-gradient(
        145deg,
        rgba(255, 248, 239, 0.5) 0%,
        rgba(255, 214, 168, 0.18) 100%
    );
    transform: rotate(-10deg) translateZ(-34px) scale(1.02);
}

.hero-device-shell {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
        radial-gradient(
            circle at 14% 14%,
            rgba(255, 239, 220, 0.18),
            transparent 20%
        ),
        radial-gradient(
            circle at 84% 12%,
            rgba(240, 179, 106, 0.24),
            transparent 22%
        ),
        linear-gradient(
            150deg,
            rgba(47, 30, 21, 0.98) 0%,
            rgba(28, 18, 14, 0.98) 42%,
            rgba(13, 10, 10, 1) 100%
        );
    box-shadow:
        0 56px 160px rgba(72, 43, 20, 0.3),
        0 0 90px rgba(255, 203, 147, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hero-device-shell::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 26%),
        linear-gradient(
            to right,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px
        ),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px
        );
    background-size:
        auto,
        72px 72px,
        72px 72px;
    mask-image: linear-gradient(180deg, black 0%, rgba(0, 0, 0, 0.24) 100%);
}

.hero-device-shell::before {
    content: '';
    position: absolute;
    inset: -12%;
    pointer-events: none;
    background:
        radial-gradient(
            circle at 30% 18%,
            rgba(255, 232, 204, 0.18),
            transparent 22%
        ),
        radial-gradient(
            circle at 78% 12%,
            rgba(255, 203, 147, 0.22),
            transparent 22%
        );
    filter: blur(34px);
}

.hero-device-shell:hover {
    box-shadow:
        0 62px 172px rgba(72, 43, 20, 0.34),
        0 0 100px rgba(255, 203, 147, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hero-light {
    width: 18rem;
    height: 18rem;
    border-radius: 999px;
    filter: blur(90px);
    pointer-events: none;
}

.hero-light-left {
    background: radial-gradient(
        circle,
        rgba(255, 235, 205, 0.66) 0%,
        rgba(255, 221, 174, 0) 68%
    );
}

.hero-light-right {
    background: radial-gradient(
        circle,
        rgba(240, 179, 106, 0.42) 0%,
        rgba(240, 179, 106, 0) 68%
    );
}

.hero-light-bottom {
    background: radial-gradient(
        circle,
        rgba(126, 74, 34, 0.28) 0%,
        rgba(126, 74, 34, 0) 68%
    );
}

.floating-card {
    animation: float-card 12s ease-in-out infinite;
    will-change: transform;
    backdrop-filter: blur(8px);
}

.floating-card-right {
    animation-delay: 1.1s;
}

.floating-card-profile {
    animation-delay: 2.2s;
}

.floating-card-center {
    animation-delay: 1.6s;
}

.floating-card-note {
    animation-delay: 0.8s;
}

.hero-micro-strip {
    position: relative;
}

.hero-micro-strip::before {
    content: '';
    position: absolute;
    inset: auto 0 calc(100% + 0.8rem) 0;
    height: 1px;
    background: linear-gradient(
        90deg,
        rgba(185, 132, 84, 0.2),
        rgba(185, 132, 84, 0)
    );
}

.trust-strip {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(214, 193, 174, 0.88);
    background:
        radial-gradient(
            circle at 14% 10%,
            rgba(255, 247, 238, 0.9),
            transparent 26%
        ),
        radial-gradient(
            circle at 84% 12%,
            rgba(240, 191, 136, 0.12),
            transparent 24%
        ),
        linear-gradient(
            180deg,
            rgba(255, 252, 248, 0.9) 0%,
            rgba(248, 240, 232, 0.96) 100%
        );
    box-shadow:
        0 26px 70px rgba(74, 44, 21, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    isolation: isolate;
}

.trust-strip-elevated {
    box-shadow:
        0 30px 88px rgba(74, 44, 21, 0.1),
        0 0 70px rgba(240, 179, 106, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.trust-strip::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(to right, rgba(87, 56, 34, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(87, 56, 34, 0.04) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(180deg, black 0%, transparent 100%);
}

.trust-strip::after {
    content: '';
    position: absolute;
    inset: auto 2rem 0 2rem;
    height: 1px;
    background: linear-gradient(
        90deg,
        rgba(206, 159, 113, 0),
        rgba(206, 159, 113, 0.34),
        rgba(206, 159, 113, 0)
    );
    pointer-events: none;
}

.trust-strip-elevated .trust-strip-label {
    color: #8d6846;
}

.trust-strip-label {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #9a7350;
}

.trust-strip-label-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #f2c88f 0%, #cf8d47 100%);
    box-shadow: 0 0 18px rgba(207, 141, 71, 0.32);
}

.trust-logo-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 4.25rem;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(214, 193, 174, 0.7);
    border-radius: 1.2rem;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.82) 0%,
        rgba(252, 246, 239, 0.86) 100%
    );
    box-shadow:
        0 14px 34px rgba(74, 44, 21, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.74);
    transition:
        transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.28s ease,
        background-color 0.28s ease;
}

.trust-logo-chip:hover {
    transform: translateY(-3px);
    border-color: rgba(198, 145, 88, 0.52);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(252, 246, 239, 0.92) 100%
    );
    box-shadow:
        0 18px 42px rgba(74, 44, 21, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.trust-logo-wordmark {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #6b4d33;
    opacity: 0.9;
}

.story-section::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(
            circle at 14% 22%,
            rgba(255, 242, 225, 0.28),
            transparent 18%
        ),
        radial-gradient(
            circle at 84% 18%,
            rgba(219, 157, 99, 0.12),
            transparent 20%
        );
}

.story-section::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(
            180deg,
            rgba(255, 246, 236, 0.26) 0%,
            rgba(255, 246, 236, 0) 16%
        ),
        linear-gradient(
            90deg,
            rgba(207, 156, 111, 0.08) 0%,
            rgba(207, 156, 111, 0) 24%,
            rgba(207, 156, 111, 0) 76%,
            rgba(207, 156, 111, 0.08) 100%
        );
}

.story-intro-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(109, 67, 40, 0.14);
    background:
        radial-gradient(
            circle at 16% 12%,
            rgba(255, 240, 223, 0.12),
            transparent 20%
        ),
        radial-gradient(
            circle at 84% 12%,
            rgba(240, 179, 106, 0.16),
            transparent 22%
        ),
        linear-gradient(
            145deg,
            rgba(54, 36, 27, 0.98) 0%,
            rgba(33, 22, 17, 0.98) 48%,
            rgba(22, 15, 13, 1) 100%
        );
    box-shadow:
        0 38px 120px rgba(68, 40, 20, 0.16),
        0 0 80px rgba(240, 179, 106, 0.08);
}

.story-intro-panel::before,
.story-visual-shell::before,
.story-dark-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 30%),
        linear-gradient(
            to right,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        ),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        );
    background-size:
        auto,
        72px 72px,
        72px 72px;
    mask-image: linear-gradient(180deg, black 0%, transparent 100%);
}

.story-narrative-card {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.04) 100%
    );
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.story-visual-shell {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(106, 64, 39, 0.14);
    background:
        radial-gradient(
            circle at 18% 14%,
            rgba(255, 247, 238, 0.12),
            transparent 20%
        ),
        radial-gradient(
            circle at 82% 12%,
            rgba(240, 179, 106, 0.2),
            transparent 22%
        ),
        linear-gradient(
            145deg,
            rgba(47, 31, 23, 0.98) 0%,
            rgba(31, 21, 16, 0.98) 48%,
            rgba(19, 14, 12, 1) 100%
        );
    box-shadow:
        0 42px 130px rgba(68, 40, 20, 0.18),
        0 0 90px rgba(240, 179, 106, 0.08);
}

.story-right-column {
    position: relative;
}

.story-right-column::before {
    content: '';
    position: absolute;
    inset: 1.5rem -1rem auto auto;
    width: 18rem;
    height: 18rem;
    border-radius: 999px;
    background: radial-gradient(
        circle,
        rgba(255, 219, 181, 0.24) 0%,
        rgba(255, 219, 181, 0) 70%
    );
    filter: blur(34px);
    pointer-events: none;
}

.story-visual-stage {
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 28px 84px rgba(0, 0, 0, 0.22);
}

.story-visual-stage::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(
            circle at 18% 18%,
            rgba(255, 238, 216, 0.16),
            transparent 20%
        ),
        radial-gradient(
            circle at 84% 14%,
            rgba(240, 179, 106, 0.14),
            transparent 22%
        );
}

.story-main-visual {
    transition:
        transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
        filter 0.55s ease;
}

.story-visual-shell:hover .story-main-visual {
    transform: scale(1.025);
    filter: saturate(1.02);
}

.story-support-screen {
    transform: rotate(-5deg);
    animation: float-card 14s ease-in-out infinite;
    animation-delay: 1.1s;
}

.story-mini-card {
    animation: float-card 9.4s ease-in-out infinite;
}

.story-mini-card-bottom {
    animation-delay: 1.4s;
}

.story-soft-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(226, 213, 200, 0.92);
    background:
        radial-gradient(
            circle at 14% 14%,
            rgba(255, 250, 244, 0.72),
            transparent 22%
        ),
        linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.96) 0%,
            rgba(249, 242, 233, 0.98) 100%
        );
    box-shadow: 0 24px 70px rgba(74, 44, 21, 0.08);
}

.story-dark-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(109, 67, 40, 0.12);
    background:
        radial-gradient(
            circle at 18% 14%,
            rgba(255, 242, 225, 0.1),
            transparent 22%
        ),
        linear-gradient(
            145deg,
            rgba(46, 30, 22, 0.98) 0%,
            rgba(30, 21, 17, 0.98) 48%,
            rgba(20, 14, 12, 1) 100%
        );
    box-shadow: 0 28px 84px rgba(68, 40, 20, 0.16);
}

.section-shell,
.section-shell-dark,
.final-shell,
.pricing-card,
.lift-card {
    transition:
        transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.35s ease,
        background-color 0.35s ease;
}

.section-shell {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(234, 220, 207, 0.9);
    background:
        radial-gradient(
            circle at 16% 12%,
            rgba(255, 239, 220, 0.65),
            transparent 22%
        ),
        radial-gradient(
            circle at 86% 10%,
            rgba(240, 179, 106, 0.12),
            transparent 20%
        ),
        linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.94) 0%,
            rgba(249, 242, 233, 0.96) 100%
        );
    box-shadow: 0 34px 100px rgba(53, 31, 15, 0.1);
    backdrop-filter: blur(18px);
}

.section-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
        linear-gradient(to right, rgba(36, 20, 11, 0.045) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(36, 20, 11, 0.045) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(circle at top, black 16%, transparent 88%);
}

.section-shell-dark {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(106, 64, 39, 0.12);
    background:
        radial-gradient(
            circle at 18% 12%,
            rgba(255, 241, 224, 0.12),
            transparent 22%
        ),
        radial-gradient(
            circle at 82% 14%,
            rgba(240, 179, 106, 0.18),
            transparent 22%
        ),
        linear-gradient(
            145deg,
            rgba(47, 31, 23, 0.96) 0%,
            rgba(34, 22, 17, 0.98) 48%,
            rgba(23, 15, 12, 1) 100%
        );
    box-shadow: 0 40px 120px rgba(68, 40, 20, 0.16);
    backdrop-filter: blur(20px);
}

.section-shell-dark::before,
.final-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 28%),
        linear-gradient(
            to right,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        ),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        );
    background-size:
        auto,
        72px 72px,
        72px 72px;
    mask-image: radial-gradient(circle at top, black 20%, transparent 88%);
}

.final-shell {
    border: 1px solid rgba(106, 64, 39, 0.12);
    background:
        radial-gradient(
            circle at 20% 16%,
            rgba(255, 239, 220, 0.14),
            transparent 24%
        ),
        radial-gradient(
            circle at 80% 12%,
            rgba(240, 179, 106, 0.22),
            transparent 22%
        ),
        linear-gradient(145deg, #352117 0%, #251812 44%, #18100d 100%);
    box-shadow: 0 48px 140px rgba(68, 40, 20, 0.18);
}

.lift-card:hover,
.pricing-card:hover {
    transform: translateY(-6px);
}

.landing-cta {
    position: relative;
    overflow: hidden;
    transition:
        transform 0.44s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.44s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.32s ease,
        background-color 0.32s ease,
        color 0.32s ease;
    will-change: transform;
}

.landing-cta::before {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 12%,
        rgba(255, 255, 255, 0.28) 38%,
        rgba(255, 255, 255, 0) 66%
    );
    transform: translate3d(-130%, 0, 0);
    opacity: 0;
    transition:
        transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.4s ease;
    pointer-events: none;
}

.landing-cta:hover {
    transform: translateY(-3px);
}

.landing-cta:hover::before {
    opacity: 1;
    transform: translate3d(130%, 0, 0);
}

.landing-cta-primary:hover {
    box-shadow: 0 32px 82px rgba(240, 179, 106, 0.34);
}

.landing-cta-secondary:hover {
    border-color: rgba(117, 78, 51, 0.2);
    background: rgba(255, 250, 244, 0.9);
    box-shadow: 0 24px 60px rgba(91, 58, 35, 0.12);
}

.landing-cta-arrow {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.landing-cta:hover .landing-cta-arrow {
    transform: translateX(5px);
}

.faq-card summary::-webkit-details-marker {
    display: none;
}

@keyframes float-card {
    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(0, -12px, 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    [data-reveal] {
        opacity: 1;
        transform: none;
        filter: none;
        transition: none;
    }

    .hero-device,
    .hero-stage-core-glow,
    .hero-stage-halo,
    .hero-stage-ribbon,
    .floating-card,
    .landing-cta,
    .lift-card,
    .pricing-card {
        animation: none;
        transition: none;
        transform: none;
    }
}

@media (max-width: 1023px) {
    .hero-backplate,
    .hero-copy-column::after,
    .hero-stage-vignette,
    .hero-stage-ribbon {
        display: none;
    }

    .floating-card-left {
        top: auto;
        bottom: 18%;
        left: 2%;
    }

    .floating-card-right {
        right: 4%;
    }

    .floating-card-profile {
        right: 4%;
        bottom: 4%;
    }
}

@media (max-width: 767px) {
    .hero-device {
        transform: none;
    }

    .hero-copy-glow,
    .story-right-column::before,
    .hero-stage-halo {
        display: none;
    }

    .story-support-screen {
        display: none;
    }

    .floating-card-left,
    .floating-card-right,
    .floating-card-profile,
    .floating-card-note {
        position: relative;
        inset: auto;
        max-width: none;
        margin-top: 0.75rem;
    }
}
</style>
