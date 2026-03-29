<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import {
    ArrowRight,
    Check,
    ListFilter,
    ShieldCheck,
    Workflow,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard, home, login, register } from '@/routes';

withDefaults(
    defineProps<{
        canRegister?: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const navItems = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '/contact' },
];

const heroAnnouncement = 'Meet the lead workspace, tuned for outbound teams';

const steps = [
    {
        step: '01',
        title: 'Submit a lead',
        description:
            'Upload or enter a lead with key details so LeadNest can evaluate fit quickly.',
        icon: ListFilter,
    },
    {
        step: '02',
        title: 'Get matched',
        description:
            'Our matching flow routes each lead to the right buyer profile based on quality and relevance.',
        icon: ShieldCheck,
    },
    {
        step: '03',
        title: 'Buyer notified',
        description:
            'Once matched, the buyer is notified instantly so the team can respond without delays.',
        icon: Workflow,
    },
];

const testimonials = [
    {
        name: 'Sarah Khan',
        company: 'Northline Media',
        quote: 'LeadNest made our lead handoff process much cleaner in week one.',
    },
    {
        name: 'Ahmed Raza',
        company: 'GrowthPilot UAE',
        quote: 'The matching flow helped our buyers respond faster to high-fit leads.',
    },
    {
        name: 'Mariam Yusuf',
        company: 'AdScale Labs',
        quote: 'Simple layout, fast onboarding, and less confusion for new team members.',
    },
];

const billingCycle = ref<'monthly' | 'annual'>('annual');

const pricingPlans = [
    {
        name: 'Free',
        monthlyPrice: 0,
        annualPrice: 0,
        description: 'For individuals getting started',
        features: [
            'Real-time contact syncing',
            'Automatic data enrichment',
            'Up to 3 seats',
        ],
        cta: 'Start for free',
        highlighted: false,
    },
    {
        name: 'Plus',
        monthlyPrice: 36,
        annualPrice: 29,
        description: 'For small teams collaborating',
        features: ['Private lists', 'Enhanced email sending', 'No seat limits'],
        cta: 'Continue with Plus',
        highlighted: false,
    },
    {
        name: 'Pro',
        monthlyPrice: 86,
        annualPrice: 69,
        description: 'For growing teams scaling up',
        features: [
            'Call Intelligence & sequences',
            'Advanced permissions',
            'Priority support',
        ],
        cta: 'Continue with Pro',
        highlighted: true,
        badge: 'Save 20%',
    },
    {
        name: 'Enterprise',
        monthlyPrice: null,
        annualPrice: null,
        description: 'For enterprises needing control',
        features: [
            'Unlimited objects',
            'Unlimited teams',
            'Advanced security & admin',
        ],
        cta: 'Talk to sales',
        highlighted: false,
    },
];

const displayedPricingPlans = computed(() =>
    pricingPlans.map((plan) => {
        if (plan.monthlyPrice === null || plan.annualPrice === null) {
            return {
                ...plan,
                displayPrice: 'Custom',
                billingText:
                    billingCycle.value === 'annual'
                        ? 'Billed annually'
                        : 'Custom monthly plan',
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
                    ? 'Per user/month, billed annually'
                    : 'Per user/month, billed monthly',
            showBadge: billingCycle.value === 'annual' && !!plan.badge,
        };
    }),
);
</script>

<template>
    <PublicLayout>
        <Head title="LeadNest" />

        <div class="relative overflow-hidden bg-[#f8f7f4] text-zinc-950">
            <div
                class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.06),_transparent_22%),linear-gradient(to_bottom,_#fcfcfa,_#f8f7f4_42%,_#f1f0eb)]"
            />
            <div
                class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(24,24,27,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.025)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_top,black,transparent_78%)] bg-[size:52px_52px]"
            />

            <header
                class="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-[#fcfcfa]/88 backdrop-blur-xl"
            >
                <div
                    class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
                >
                    <a href="#" class="flex items-center gap-3">
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(24,24,27,0.16)]"
                        >
                            LN
                        </div>
                        <div>
                            <div
                                class="text-base font-semibold tracking-tight text-zinc-950"
                            >
                                LeadNest
                            </div>
                            <div
                                class="text-[11px] tracking-[0.24em] text-zinc-500 uppercase"
                            >
                                Lead generation OS
                            </div>
                        </div>
                    </a>

                    <nav class="hidden items-center gap-8 md:flex">
                        <a
                            v-for="item in navItems"
                            :key="item.label"
                            :href="item.href"
                            class="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
                        >
                            {{ item.label }}
                        </a>
                    </nav>

                    <div class="flex items-center gap-3">
                        <Link
                            v-if="$page.props.auth.user"
                            :href="dashboard()"
                            class="hidden rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 sm:inline-flex"
                        >
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link
                                :href="login()"
                                class="hidden rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 sm:inline-flex"
                            >
                                Sign in
                            </Link>
                            <Link
                                v-if="canRegister"
                                :href="register()"
                                class="inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-[0_16px_40px_rgba(24,24,27,0.18)] transition hover:-translate-y-0.5 hover:bg-black"
                            >
                                Start free
                            </Link>
                        </template>
                    </div>
                </div>
            </header>

            <main class="pt-[76px] sm:pt-[84px]">
                <section
                    class="px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-16 lg:pb-18"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="mx-auto max-w-4xl text-center">
                            <div
                                class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
                            >
                                <span
                                    class="h-1.5 w-8 rounded-full bg-zinc-950"
                                />
                                {{ heroAnnouncement }}
                                <ArrowRight class="h-4 w-4 text-zinc-500" />
                            </div>
                            <h1
                                class="mx-auto mt-8 max-w-5xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-[5.9rem] lg:leading-[0.92]"
                            >
                                Lead generation
                                <br />
                                relationship magic.
                            </h1>
                            <p
                                class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-500 sm:text-xl"
                            >
                                LeadNest is a cleaner workspace for finding,
                                reviewing, and routing the right accounts into
                                your pipeline.
                            </p>
                            <div
                                class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                            >
                                <Link
                                    v-if="!$page.props.auth.user && canRegister"
                                    :href="register()"
                                    class="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                                >
                                    Start for free
                                </Link>
                                <a
                                    href="/contact"
                                    class="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950"
                                >
                                    Talk to sales
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="how-it-works"
                    class="border-y border-zinc-200/70 bg-[#fcfcfa] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="mx-auto max-w-3xl text-center">
                            <p
                                class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                            >
                                How it works
                            </p>
                            <h2
                                class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl"
                            >
                                A simple workflow your team can run every day.
                            </h2>
                            <p
                                class="mt-4 max-w-2xl text-base leading-8 text-zinc-600"
                            >
                                From submission to buyer notification, every
                                step stays clear and predictable for operators
                                and sales teams.
                            </p>
                        </div>

                        <div class="mt-10 grid gap-6 lg:grid-cols-3">
                            <article
                                v-for="item in steps"
                                :key="item.step"
                                class="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-[#f6f5f1] p-6 text-center shadow-[0_20px_60px_rgba(24,24,27,0.05)] transition hover:-translate-y-1 hover:border-zinc-300 hover:bg-white sm:p-8"
                            >
                                <div
                                    class="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent"
                                />
                                <div
                                    class="flex flex-col items-center justify-center gap-4"
                                >
                                    <div
                                        class="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-950 shadow-sm"
                                    >
                                        <component
                                            :is="item.icon"
                                            class="h-5 w-5"
                                        />
                                    </div>
                                    <div
                                        class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-zinc-500 uppercase"
                                    >
                                        {{ item.step }}
                                    </div>
                                </div>
                                <h3
                                    class="mt-8 text-2xl font-semibold tracking-tight text-zinc-950"
                                >
                                    {{ item.title }}
                                </h3>
                                <p
                                    class="mx-auto mt-4 max-w-xs text-sm leading-7 text-zinc-600"
                                >
                                    {{ item.description }}
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section
                    id="testimonials"
                    class="border-b border-zinc-200/70 bg-[#f8f7f4] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="mx-auto max-w-3xl text-center">
                            <p
                                class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                            >
                                Testimonials
                            </p>
                            <h2
                                class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl"
                            >
                                What early teams are saying.
                            </h2>
                        </div>

                        <div class="mt-10 grid gap-5 md:grid-cols-3">
                            <article
                                v-for="item in testimonials"
                                :key="item.name"
                                class="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_16px_40px_rgba(24,24,27,0.05)]"
                            >
                                <p
                                    class="text-base leading-7 font-medium text-zinc-700"
                                >
                                    "{{ item.quote }}"
                                </p>
                                <div class="mt-6">
                                    <div
                                        class="text-sm font-semibold text-zinc-950"
                                    >
                                        {{ item.name }}
                                    </div>
                                    <div class="text-sm text-zinc-500">
                                        {{ item.company }}
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section
                    id="pricing"
                    class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
                >
                    <div class="mx-auto max-w-7xl">
                        <div class="mx-auto max-w-3xl text-center">
                            <p
                                class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                            >
                                Pricing
                            </p>
                            <h2
                                class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl"
                            >
                                Plans that fit every stage of growth.
                            </h2>
                            <p
                                class="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-600"
                            >
                                Clean pricing cards, clear positioning, and a
                                stronger highlighted plan for teams ready to
                                scale.
                            </p>

                            <div class="mt-8 flex justify-center">
                                <div
                                    class="inline-flex rounded-full border border-zinc-300 bg-white p-1 shadow-sm"
                                >
                                    <button
                                        type="button"
                                        @click="billingCycle = 'monthly'"
                                        :class="[
                                            'cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition',
                                            billingCycle === 'monthly'
                                                ? 'bg-zinc-950 text-white'
                                                : 'text-zinc-600 hover:text-zinc-950',
                                        ]"
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        type="button"
                                        @click="billingCycle = 'annual'"
                                        :class="[
                                            'cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition',
                                            billingCycle === 'annual'
                                                ? 'bg-zinc-950 text-white'
                                                : 'text-zinc-600 hover:text-zinc-950',
                                        ]"
                                    >
                                        Annual
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
                        >
                            <article
                                v-for="plan in displayedPricingPlans"
                                :key="plan.name"
                                :class="[
                                    'relative flex h-full flex-col rounded-[28px] border p-6 text-left shadow-[0_18px_50px_rgba(24,24,27,0.05)] transition hover:-translate-y-1',
                                    plan.highlighted
                                        ? 'border-[#8ab4ff] bg-white text-zinc-950 ring-2 ring-[#8ab4ff]/35'
                                        : 'border-zinc-200 bg-white text-zinc-950',
                                ]"
                            >
                                <div
                                    class="flex w-full items-start justify-between gap-4"
                                >
                                    <div>
                                        <h3
                                            class="text-2xl font-semibold tracking-tight"
                                        >
                                            {{ plan.name }}
                                        </h3>
                                        <p
                                            :class="[
                                                'mt-8 text-5xl font-semibold tracking-tight',
                                                plan.highlighted
                                                    ? 'text-zinc-950'
                                                    : 'text-zinc-950',
                                            ]"
                                        >
                                            {{ plan.displayPrice }}
                                        </p>
                                        <p
                                            class="mt-2 text-sm font-medium text-zinc-500"
                                        >
                                            {{ plan.billingText }}
                                        </p>
                                        <p
                                            class="mt-8 max-w-[14rem] text-sm leading-7 font-semibold text-zinc-900"
                                        >
                                            {{ plan.description }}
                                        </p>
                                    </div>
                                    <span
                                        v-if="plan.showBadge"
                                        class="rounded-xl border border-[#c7d8ff] bg-[#edf3ff] px-3 py-1 text-xs font-semibold whitespace-nowrap text-[#4b77d9]"
                                        >{{ plan.badge }}</span
                                    >
                                </div>

                                <ul class="mt-8 space-y-3">
                                    <li
                                        v-for="feature in plan.features"
                                        :key="feature"
                                        class="flex items-start gap-3 text-sm text-zinc-600"
                                    >
                                        <span
                                            class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-zinc-500"
                                        >
                                            <Check class="h-3.5 w-3.5" />
                                        </span>
                                        <span>{{ feature }}</span>
                                    </li>
                                </ul>

                                <a
                                    href="/contact"
                                    :class="[
                                        'mt-auto inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition',
                                        plan.highlighted
                                            ? 'bg-zinc-950 text-white hover:bg-black'
                                            : 'border border-zinc-300 bg-white text-zinc-950 hover:border-zinc-950',
                                    ]"
                                >
                                    {{ plan.cta }}
                                </a>
                            </article>
                        </div>
                    </div>
                </section>

                <section
                    id="contact"
                    class="border-t border-zinc-200/70 bg-[#fcfcfa] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
                >
                    <div class="mx-auto max-w-6xl">
                        <div class="mx-auto max-w-3xl text-center">
                            <p
                                class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                            >
                                Contact
                            </p>
                            <h2
                                class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl"
                            >
                                Give prospects a cleaner path into your
                                pipeline.
                            </h2>
                            <p
                                class="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-600"
                            >
                                This section is already strong enough for demo
                                requests, onboarding conversations, and pricing
                                discussions while the backend keeps evolving.
                            </p>
                            <div class="mt-6 grid gap-4 sm:grid-cols-2">
                                <div
                                    class="rounded-[24px] border border-zinc-200 bg-[#f6f5f1] px-5 py-4"
                                >
                                    <div
                                        class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                    >
                                        Email
                                    </div>
                                    <div
                                        class="mt-2 text-base font-medium text-zinc-950"
                                    >
                                        sales@leadnest.com
                                    </div>
                                </div>
                                <div
                                    class="rounded-[24px] border border-zinc-200 bg-[#f6f5f1] px-5 py-4 text-sm leading-7 text-zinc-600"
                                >
                                    Best for demo requests, team onboarding,
                                    list buying questions, and partnership
                                    outreach.
                                </div>
                            </div>
                        </div>

                        <div
                            class="mx-auto mt-8 max-w-3xl rounded-[34px] border border-zinc-200 bg-[#f6f5f1] p-6 shadow-[0_24px_70px_rgba(24,24,27,0.06)] sm:p-8"
                        >
                            <form class="grid gap-5">
                                <div class="grid gap-5 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Work email"
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                </div>
                                <div class="grid gap-5 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                    <select
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none focus:border-zinc-950"
                                    >
                                        <option>1-5</option>
                                        <option>6-20</option>
                                        <option>21-50</option>
                                        <option>50+</option>
                                    </select>
                                </div>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us what kind of leads you need and how your team works today."
                                    class="rounded-[24px] border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                />
                                <button
                                    type="button"
                                    class="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                                >
                                    Send inquiry
                                    <ArrowRight class="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer class="border-t border-zinc-200/70 bg-[#f6f5f1]">
                <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div
                        class="flex flex-col gap-6 border-b border-zinc-200 pb-6 md:flex-row md:items-center md:justify-between"
                    >
                        <Link
                            :href="home()"
                            class="inline-flex items-center gap-3"
                        >
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-xs font-semibold text-white"
                            >
                                LN
                            </div>
                            <div>
                                <div
                                    class="text-sm font-semibold text-zinc-950"
                                >
                                    LeadNest
                                </div>
                                <div
                                    class="text-[10px] tracking-[0.22em] text-zinc-500 uppercase"
                                >
                                    Lead generation OS
                                </div>
                            </div>
                        </Link>

                        <div
                            class="flex flex-wrap items-center gap-5 text-sm text-zinc-600"
                        >
                            <a
                                href="#how-it-works"
                                class="transition hover:text-zinc-900"
                                >How it works</a
                            >
                            <a
                                href="#pricing"
                                class="transition hover:text-zinc-900"
                                >Pricing</a
                            >
                            <Link
                                href="/contact"
                                class="transition hover:text-zinc-900"
                                >Contact</Link
                            >
                        </div>
                    </div>

                    <div
                        class="pt-5 text-xs font-medium tracking-wide text-zinc-500 sm:text-sm"
                    >
                        &copy; 2026 LeadNest. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    </PublicLayout>
</template>
