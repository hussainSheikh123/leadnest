<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import {
    ArrowUpRight,
    CalendarClock,
    CheckCheck,
    ChevronRight,
    Download,
    Filter,
    Mail,
    Phone,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Users,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { getInitials } from '@/composables/useInitials';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { home } from '@/routes';

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Negotiation';
type LeadSource = 'LinkedIn' | 'Website' | 'Referral' | 'Outbound';
type LeadPriority = 'High' | 'Medium' | 'Low';

type Lead = {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    age: number;
    city: string;
    company: string;
    companySize: string;
    role: string;
    source: LeadSource;
    status: LeadStatus;
    priority: LeadPriority;
    score: number;
    owner: string;
    lastTouch: string;
    nextStep: string;
    tags: string[];
    needsReply: boolean;
};

const page = usePage();
const auth = computed(() => page.props.auth);

const leads: Lead[] = [
    {
        id: 1,
        username: 'amna.r',
        fullName: 'Amna Rashid',
        email: 'amna@northflow.io',
        phone: '+92 300 445 1182',
        age: 29,
        city: 'Lahore',
        company: 'Northflow',
        companySize: '24 employees',
        role: 'Growth Manager',
        source: 'LinkedIn',
        status: 'Qualified',
        priority: 'High',
        score: 92,
        owner: 'Areeb Khan',
        lastTouch: '2h ago',
        nextStep: 'Book qualification call',
        tags: ['SaaS', 'Inbound', 'High intent'],
        needsReply: true,
    },
    {
        id: 2,
        username: 'haris.q',
        fullName: 'Haris Qureshi',
        email: 'haris@novastack.ai',
        phone: '+92 321 553 9144',
        age: 33,
        city: 'Karachi',
        company: 'Novastack',
        companySize: '46 employees',
        role: 'Revenue Lead',
        source: 'Website',
        status: 'Contacted',
        priority: 'Medium',
        score: 81,
        owner: 'Mehak Ali',
        lastTouch: 'Yesterday',
        nextStep: 'Send pricing overview',
        tags: ['AI', 'Demo requested'],
        needsReply: false,
    },
    {
        id: 3,
        username: 'maria.h',
        fullName: 'Maria Hassan',
        email: 'maria@brightworks.co',
        phone: '+92 333 195 0028',
        age: 27,
        city: 'Islamabad',
        company: 'BrightWorks',
        companySize: '18 employees',
        role: 'Partnerships Manager',
        source: 'Referral',
        status: 'Qualified',
        priority: 'High',
        score: 89,
        owner: 'Areeb Khan',
        lastTouch: '30m ago',
        nextStep: 'Share campaign case study',
        tags: ['Agency', 'Referral'],
        needsReply: true,
    },
    {
        id: 4,
        username: 'fahad.a',
        fullName: 'Fahad Ali',
        email: 'fahad@marketpilot.io',
        phone: '+92 300 889 3311',
        age: 31,
        city: 'Dubai',
        company: 'MarketPilot',
        companySize: '62 employees',
        role: 'Sales Director',
        source: 'Outbound',
        status: 'New',
        priority: 'Medium',
        score: 74,
        owner: 'Hoor Fatima',
        lastTouch: 'Just now',
        nextStep: 'Verify decision-maker fit',
        tags: ['Outbound', 'Cold lead'],
        needsReply: false,
    },
    {
        id: 5,
        username: 'sara.k',
        fullName: 'Sara Khan',
        email: 'sara@peaklaunch.com',
        phone: '+92 302 103 7742',
        age: 30,
        city: 'Lahore',
        company: 'PeakLaunch',
        companySize: '33 employees',
        role: 'Operations Manager',
        source: 'LinkedIn',
        status: 'Negotiation',
        priority: 'High',
        score: 94,
        owner: 'Mehak Ali',
        lastTouch: '4h ago',
        nextStep: 'Finalize proposal follow-up',
        tags: ['Proposal sent', 'Warm account'],
        needsReply: true,
    },
    {
        id: 6,
        username: 'talha.m',
        fullName: 'Talha Mahmood',
        email: 'talha@signalgrid.io',
        phone: '+92 311 665 9012',
        age: 35,
        city: 'Karachi',
        company: 'SignalGrid',
        companySize: '11 employees',
        role: 'Founder',
        source: 'Website',
        status: 'Qualified',
        priority: 'High',
        score: 95,
        owner: 'Hoor Fatima',
        lastTouch: '1h ago',
        nextStep: 'Schedule founder intro',
        tags: ['Founder-led', 'Hot lead'],
        needsReply: true,
    },
    {
        id: 7,
        username: 'zain.s',
        fullName: 'Zain Shah',
        email: 'zain@adstreamhq.com',
        phone: '+92 304 801 1123',
        age: 28,
        city: 'Islamabad',
        company: 'AdStream',
        companySize: '29 employees',
        role: 'Performance Lead',
        source: 'Referral',
        status: 'Contacted',
        priority: 'Low',
        score: 72,
        owner: 'Areeb Khan',
        lastTouch: '3d ago',
        nextStep: 'Re-engage with benchmark email',
        tags: ['Paid ads', 'Needs nurture'],
        needsReply: false,
    },
    {
        id: 8,
        username: 'hira.n',
        fullName: 'Hira Nadeem',
        email: 'hira@closelooplabs.ai',
        phone: '+92 345 111 9821',
        age: 32,
        city: 'Lahore',
        company: 'CloseLoop Labs',
        companySize: '54 employees',
        role: 'Head of Demand Gen',
        source: 'Outbound',
        status: 'Qualified',
        priority: 'Medium',
        score: 86,
        owner: 'Mehak Ali',
        lastTouch: '5h ago',
        nextStep: 'Prepare custom lead list sample',
        tags: ['Demand gen', 'SQL'],
        needsReply: false,
    },
];

const searchTerm = ref('');
const selectedSource = ref<'All' | LeadSource>('All');
const selectedStatus = ref<'All' | LeadStatus>('All');
const selectedLeadId = ref(leads[0]?.id ?? 0);

const sourceOptions: Array<'All' | LeadSource> = [
    'All',
    'LinkedIn',
    'Website',
    'Referral',
    'Outbound',
];

const statusOptions: Array<'All' | LeadStatus> = [
    'All',
    'Qualified',
    'Contacted',
    'Negotiation',
    'New',
];

const filteredLeads = computed(() => {
    const term = searchTerm.value.trim().toLowerCase();

    return leads.filter((lead) => {
        const matchesTerm =
            term.length === 0 ||
            [
                lead.username,
                lead.fullName,
                lead.email,
                lead.phone,
                lead.company,
                lead.role,
                lead.city,
                lead.owner,
            ]
                .join(' ')
                .toLowerCase()
                .includes(term);

        const matchesSource =
            selectedSource.value === 'All' ||
            lead.source === selectedSource.value;

        const matchesStatus =
            selectedStatus.value === 'All' ||
            lead.status === selectedStatus.value;

        return matchesTerm && matchesSource && matchesStatus;
    });
});

const selectedLead = computed(
    () =>
        filteredLeads.value.find((lead) => lead.id === selectedLeadId.value) ||
        filteredLeads.value[0] ||
        null,
);

const totalLeads = computed(() => leads.length);
const hotLeads = computed(
    () => leads.filter((lead) => lead.score >= 90).length,
);
const responseDue = computed(
    () => leads.filter((lead) => lead.needsReply).length,
);
const averageScore = computed(() =>
    Math.round(
        leads.reduce((total, lead) => total + lead.score, 0) / leads.length,
    ),
);

const summaryCards = computed(() => [
    {
        title: 'Active leads',
        value: totalLeads.value.toString(),
        note: 'Current frontend preview dataset',
        icon: Users,
    },
    {
        title: 'Hot leads',
        value: hotLeads.value.toString(),
        note: 'Score above 90 and close to conversion',
        icon: Target,
    },
    {
        title: 'Response due',
        value: responseDue.value.toString(),
        note: 'Leads needing quick follow-up today',
        icon: CalendarClock,
    },
    {
        title: 'Average fit',
        value: `${averageScore.value}%`,
        note: 'Average score across all uploaded records',
        icon: Sparkles,
    },
]);

const pipelineStages = computed(() => {
    const base = [
        { key: 'New' as LeadStatus, title: 'New', caption: 'Fresh records' },
        {
            key: 'Contacted' as LeadStatus,
            title: 'Contacted',
            caption: 'Initial outreach sent',
        },
        {
            key: 'Qualified' as LeadStatus,
            title: 'Qualified',
            caption: 'Good fit and ready to route',
        },
        {
            key: 'Negotiation' as LeadStatus,
            title: 'Negotiation',
            caption: 'Proposal or pricing discussion',
        },
    ];

    return base.map((stage) => ({
        ...stage,
        count: leads.filter((lead) => lead.status === stage.key).length,
    }));
});

const sourcePerformance = computed(() => {
    const grouped = sourceOptions
        .filter((source): source is LeadSource => source !== 'All')
        .map((source) => {
            const sourceLeads = leads.filter((lead) => lead.source === source);
            const qualified = sourceLeads.filter(
                (lead) =>
                    lead.status === 'Qualified' ||
                    lead.status === 'Negotiation',
            ).length;

            return {
                source,
                count: sourceLeads.length,
                score:
                    sourceLeads.length > 0
                        ? Math.round(
                              sourceLeads.reduce(
                                  (total, lead) => total + lead.score,
                                  0,
                              ) / sourceLeads.length,
                          )
                        : 0,
                conversion:
                    sourceLeads.length > 0
                        ? Math.round((qualified / sourceLeads.length) * 100)
                        : 0,
            };
        });

    const highestCount = Math.max(...grouped.map((item) => item.count), 1);

    return grouped.map((item) => ({
        ...item,
        width: `${Math.max((item.count / highestCount) * 100, 18)}%`,
    }));
});

const selectedLeadActions = computed(() => {
    if (!selectedLead.value) {
        return [];
    }

    return [
        {
            title: selectedLead.value.nextStep,
            detail: `Owner: ${selectedLead.value.owner}`,
            icon: ArrowUpRight,
        },
        {
            title: `Reply to ${selectedLead.value.fullName.split(' ')[0]}`,
            detail: `Last touch ${selectedLead.value.lastTouch}`,
            icon: Mail,
        },
        {
            title: `Route ${selectedLead.value.company} to sales`,
            detail: `${selectedLead.value.source} source • ${selectedLead.value.priority} priority`,
            icon: CheckCheck,
        },
    ];
});

const csvFields = [
    'username',
    'full_name',
    'email',
    'number',
    'age',
    'city',
    'company',
    'role',
    'source',
    'status',
];

const statusClasses: Record<LeadStatus, string> = {
    New: 'border border-zinc-200 bg-white text-zinc-700',
    Contacted: 'bg-zinc-200 text-zinc-800',
    Qualified: 'bg-zinc-950 text-white',
    Negotiation: 'bg-zinc-900 text-white',
};

const priorityClasses: Record<LeadPriority, string> = {
    High: 'bg-zinc-950 text-white',
    Medium: 'bg-zinc-200 text-zinc-800',
    Low: 'border border-zinc-200 bg-white text-zinc-700',
};
</script>

<template>
    <PublicLayout>
        <Head title="Dashboard" />

        <div class="min-h-screen bg-[#f7f5ef] text-zinc-950">
            <header
                class="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#fcfbf8]/90 backdrop-blur-xl"
            >
                <div
                    class="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
                >
                    <div class="flex items-center gap-3">
                        <Link
                            :href="home()"
                            class="inline-flex items-center gap-3"
                        >
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
                                    Lead workspace
                                </div>
                            </div>
                        </Link>
                        <div
                            class="hidden rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium tracking-[0.18em] text-zinc-600 uppercase sm:inline-flex"
                        >
                            Dashboard
                        </div>
                    </div>

                    <div class="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            class="hidden cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 md:inline-flex"
                        >
                            <Download class="h-4 w-4" />
                            Export preview
                        </button>

                        <div class="hidden text-right sm:block">
                            <div class="text-sm font-medium text-zinc-950">
                                {{ auth.user.name }}
                            </div>
                            <div class="text-xs text-zinc-500">
                                Lead operations view
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger :as-child="true">
                                <button
                                    type="button"
                                    class="relative flex cursor-pointer items-center gap-3 rounded-full border border-zinc-200 bg-white p-1 pr-3 pl-1 transition hover:border-zinc-950 focus:outline-none"
                                >
                                    <Avatar
                                        class="size-9 overflow-hidden rounded-full"
                                    >
                                        <AvatarImage
                                            v-if="auth.user.avatar"
                                            :src="auth.user.avatar"
                                            :alt="auth.user.name"
                                        />
                                        <AvatarFallback
                                            class="bg-zinc-950 font-semibold text-white"
                                        >
                                            {{ getInitials(auth.user?.name) }}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span
                                        class="hidden text-sm font-medium text-zinc-900 sm:inline"
                                    >
                                        Account
                                    </span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <UserMenuContent :user="auth.user" />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main
                class="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8"
            >
                <section
                    class="overflow-hidden rounded-[34px] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.06)]"
                >
                    <div class="grid gap-0 xl:grid-cols-[1.12fr_0.88fr]">
                        <div class="px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
                            <div
                                class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[#f6f4ef] px-3 py-1.5 text-xs font-medium tracking-[0.18em] text-zinc-600 uppercase"
                            >
                                Lead command center
                            </div>
                            <h1
                                class="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl"
                            >
                                A cleaner leads dashboard built for fast
                                follow-up and better conversion focus.
                            </h1>
                            <p
                                class="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg"
                            >
                                This frontend preview is structured like a
                                modern lead-ops workspace: performance at the
                                top, prioritized leads in the middle, and full
                                record context on the right.
                            </p>
                            <div class="mt-5 flex flex-wrap gap-2">
                                <span
                                    class="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700"
                                >
                                    CSV-ready structure
                                </span>
                                <span
                                    class="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700"
                                >
                                    Mobile responsive
                                </span>
                                <span
                                    class="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700"
                                >
                                    Lead generation focus
                                </span>
                            </div>

                            <div
                                class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                            >
                                <article
                                    v-for="card in summaryCards"
                                    :key="card.title"
                                    class="rounded-[26px] border border-zinc-200 bg-[#faf9f6] p-5"
                                >
                                    <div
                                        class="flex items-center justify-between gap-3"
                                    >
                                        <div
                                            class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                        >
                                            {{ card.title }}
                                        </div>
                                        <div
                                            class="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-950"
                                        >
                                            <component
                                                :is="card.icon"
                                                class="h-4 w-4"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950"
                                    >
                                        {{ card.value }}
                                    </div>
                                    <p
                                        class="mt-2 text-sm leading-6 text-zinc-600"
                                    >
                                        {{ card.note }}
                                    </p>
                                </article>
                            </div>
                        </div>

                        <div
                            class="border-t border-zinc-200 bg-[#fbfaf7] xl:border-t-0 xl:border-l"
                        >
                            <div
                                class="h-full px-6 py-7 sm:px-8 lg:px-10 lg:py-9"
                            >
                                <div
                                    class="flex items-center justify-between gap-3"
                                >
                                    <div>
                                        <p
                                            class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                        >
                                            Source performance
                                        </p>
                                        <h2
                                            class="mt-2 text-2xl font-semibold tracking-tight text-zinc-950"
                                        >
                                            Where the strongest leads are coming
                                            from.
                                        </h2>
                                    </div>
                                    <div
                                        class="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700"
                                    >
                                        This week
                                    </div>
                                </div>

                                <div class="mt-6 space-y-4">
                                    <article
                                        v-for="item in sourcePerformance"
                                        :key="item.source"
                                        class="rounded-[24px] border border-zinc-200 bg-white p-4"
                                    >
                                        <div
                                            class="flex items-start justify-between gap-4"
                                        >
                                            <div>
                                                <div
                                                    class="text-sm font-semibold text-zinc-950"
                                                >
                                                    {{ item.source }}
                                                </div>
                                                <div
                                                    class="mt-1 text-sm text-zinc-500"
                                                >
                                                    {{ item.count }} leads •
                                                    {{ item.score }}% avg fit
                                                </div>
                                            </div>
                                            <div class="text-right">
                                                <div
                                                    class="text-sm font-semibold text-zinc-950"
                                                >
                                                    {{ item.conversion }}%
                                                </div>
                                                <div
                                                    class="text-xs text-zinc-500"
                                                >
                                                    converted to high intent
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="mt-4 h-2.5 rounded-full bg-zinc-100"
                                        >
                                            <div
                                                class="h-2.5 rounded-full bg-zinc-950"
                                                :style="{ width: item.width }"
                                            />
                                        </div>
                                    </article>
                                </div>

                                <div
                                    class="mt-6 rounded-[26px] border border-zinc-200 bg-zinc-950 p-5 text-white"
                                >
                                    <div
                                        class="flex items-center gap-2 text-sm text-zinc-300"
                                    >
                                        <TrendingUp class="h-4 w-4" />
                                        Conversion note
                                    </div>
                                    <p
                                        class="mt-3 text-sm leading-7 text-zinc-100/90"
                                    >
                                        Referral and LinkedIn leads are carrying
                                        the best quality signal in this preview,
                                        so the layout keeps source clarity
                                        visible above the inbox.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    class="rounded-[34px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-6"
                >
                    <div
                        class="flex flex-col gap-4 border-b border-zinc-200 pb-5 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div>
                            <p
                                class="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase"
                            >
                                Pipeline view
                            </p>
                            <h2
                                class="mt-3 text-2xl font-semibold tracking-tight text-zinc-950"
                            >
                                Visual lead stages with quick volume checks.
                            </h2>
                        </div>

                        <div
                            class="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-[#f6f4ef] px-3 py-2 text-sm text-zinc-600"
                        >
                            <ShieldCheck class="h-4 w-4 text-zinc-950" />
                            Built for uploaded CSV records
                        </div>
                    </div>

                    <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <article
                            v-for="stage in pipelineStages"
                            :key="stage.key"
                            class="rounded-[26px] border border-zinc-200 bg-[#faf9f6] p-5"
                        >
                            <div
                                class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                            >
                                {{ stage.title }}
                            </div>
                            <div
                                class="mt-3 flex items-end justify-between gap-3"
                            >
                                <div
                                    class="text-4xl font-semibold tracking-tight text-zinc-950"
                                >
                                    {{ stage.count }}
                                </div>
                                <div
                                    class="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600"
                                >
                                    {{
                                        Math.round(
                                            (stage.count / totalLeads) * 100,
                                        )
                                    }}%
                                </div>
                            </div>
                            <p class="mt-3 text-sm leading-6 text-zinc-600">
                                {{ stage.caption }}
                            </p>
                        </article>
                    </div>
                </section>

                <section class="grid gap-6 xl:grid-cols-[1.22fr_0.78fr]">
                    <div
                        class="rounded-[34px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-6"
                    >
                        <div
                            class="flex flex-col gap-4 border-b border-zinc-200 pb-5"
                        >
                            <div
                                class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
                            >
                                <div>
                                    <p
                                        class="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase"
                                    >
                                        Leads inbox
                                    </p>
                                    <h2
                                        class="mt-3 text-2xl font-semibold tracking-tight text-zinc-950"
                                    >
                                        Prioritized lead records with quick
                                        context.
                                    </h2>
                                </div>
                                <div
                                    class="rounded-full border border-zinc-200 bg-[#f6f4ef] px-3 py-2 text-sm text-zinc-600"
                                >
                                    {{ filteredLeads.length }} visible records
                                </div>
                            </div>

                            <div
                                class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
                            >
                                <div class="relative w-full xl:max-w-md">
                                    <Search
                                        class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400"
                                    />
                                    <input
                                        v-model="searchTerm"
                                        type="text"
                                        placeholder="Search by username, full name, email, company..."
                                        class="h-12 w-full rounded-2xl border border-zinc-200 bg-[#f6f4ef] pr-4 pl-11 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <button
                                        v-for="source in sourceOptions"
                                        :key="source"
                                        type="button"
                                        @click="selectedSource = source"
                                        :class="[
                                            'cursor-pointer rounded-full px-3 py-2 text-xs font-semibold transition',
                                            selectedSource === source
                                                ? 'bg-zinc-950 text-white'
                                                : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950',
                                        ]"
                                    >
                                        {{ source }}
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="status in statusOptions"
                                    :key="status"
                                    type="button"
                                    @click="selectedStatus = status"
                                    :class="[
                                        'cursor-pointer rounded-full px-3 py-2 text-xs font-semibold transition',
                                        selectedStatus === status
                                            ? 'bg-zinc-950 text-white'
                                            : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950',
                                    ]"
                                >
                                    {{ status }}
                                </button>
                                <button
                                    type="button"
                                    class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950"
                                >
                                    <Filter class="h-3.5 w-3.5" />
                                    More filters
                                </button>
                            </div>
                        </div>

                        <div class="mt-5 space-y-3">
                            <button
                                v-for="lead in filteredLeads"
                                :key="lead.id"
                                type="button"
                                @click="selectedLeadId = lead.id"
                                :class="[
                                    'w-full cursor-pointer rounded-[28px] border p-4 text-left transition sm:p-5',
                                    selectedLeadId === lead.id
                                        ? 'border-zinc-950 bg-[#faf9f6] shadow-[0_18px_48px_rgba(24,24,27,0.08)]'
                                        : 'border-zinc-200 bg-white hover:border-zinc-950/40 hover:bg-[#faf9f6]',
                                ]"
                            >
                                <div
                                    class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"
                                >
                                    <div class="min-w-0 flex-1">
                                        <div
                                            class="flex flex-wrap items-center gap-2"
                                        >
                                            <div
                                                class="text-base font-semibold text-zinc-950"
                                            >
                                                {{ lead.fullName }}
                                            </div>
                                            <span
                                                :class="[
                                                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                                    statusClasses[lead.status],
                                                ]"
                                            >
                                                {{ lead.status }}
                                            </span>
                                            <span
                                                :class="[
                                                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                                    priorityClasses[
                                                        lead.priority
                                                    ],
                                                ]"
                                            >
                                                {{ lead.priority }} priority
                                            </span>
                                        </div>

                                        <div class="mt-1 text-sm text-zinc-500">
                                            @{{ lead.username }} •
                                            {{ lead.role }} at
                                            {{ lead.company }}
                                        </div>

                                        <div
                                            class="mt-4 grid gap-3 text-sm text-zinc-600 sm:grid-cols-2"
                                        >
                                            <div class="min-w-0">
                                                <div
                                                    class="font-medium text-zinc-950"
                                                >
                                                    {{ lead.email }}
                                                </div>
                                                <div class="mt-1">
                                                    {{ lead.phone }}
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="font-medium text-zinc-950"
                                                >
                                                    {{ lead.source }} source
                                                </div>
                                                <div class="mt-1">
                                                    Owner {{ lead.owner }} •
                                                    {{ lead.lastTouch }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="flex flex-col items-start gap-3 xl:min-w-[180px] xl:items-end"
                                    >
                                        <div class="text-right">
                                            <div
                                                class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                            >
                                                Fit score
                                            </div>
                                            <div
                                                class="mt-1 text-3xl font-semibold tracking-tight text-zinc-950"
                                            >
                                                {{ lead.score }}%
                                            </div>
                                        </div>

                                        <div
                                            class="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 xl:text-right"
                                        >
                                            <div
                                                class="font-medium text-zinc-950"
                                            >
                                                {{ lead.nextStep }}
                                            </div>
                                            <div class="mt-1">
                                                Next best action
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <div
                                v-if="filteredLeads.length === 0"
                                class="rounded-[28px] border border-dashed border-zinc-300 bg-[#faf9f6] p-8 text-center"
                            >
                                <div
                                    class="text-lg font-semibold text-zinc-950"
                                >
                                    No leads match these filters.
                                </div>
                                <p class="mt-2 text-sm text-zinc-600">
                                    Adjust source, status, or search to bring
                                    records back into view.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <section
                            class="rounded-[34px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-6"
                        >
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <p
                                        class="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase"
                                    >
                                        Lead profile
                                    </p>
                                    <h2
                                        class="mt-2 text-2xl font-semibold tracking-tight text-zinc-950"
                                    >
                                        {{
                                            selectedLead?.fullName ||
                                            'No lead selected'
                                        }}
                                    </h2>
                                    <p class="mt-2 text-sm text-zinc-600">
                                        {{ selectedLead?.role }} at
                                        {{ selectedLead?.company }}
                                    </p>
                                </div>

                                <div
                                    v-if="selectedLead"
                                    class="flex h-14 w-14 items-center justify-center rounded-[20px] bg-zinc-950 text-lg font-semibold text-white"
                                >
                                    {{ selectedLead.fullName.charAt(0) }}
                                </div>
                            </div>

                            <template v-if="selectedLead">
                                <div
                                    class="mt-6 rounded-[28px] border border-zinc-200 bg-[#faf9f6] p-5"
                                >
                                    <div
                                        class="flex items-center justify-between gap-4"
                                    >
                                        <div>
                                            <div
                                                class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                            >
                                                Conversion readiness
                                            </div>
                                            <div
                                                class="mt-2 text-4xl font-semibold tracking-tight text-zinc-950"
                                            >
                                                {{ selectedLead.score }}%
                                            </div>
                                        </div>
                                        <span
                                            :class="[
                                                'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                                statusClasses[
                                                    selectedLead.status
                                                ],
                                            ]"
                                        >
                                            {{ selectedLead.status }}
                                        </span>
                                    </div>

                                    <div
                                        class="mt-4 h-2.5 rounded-full bg-zinc-200"
                                    >
                                        <div
                                            class="h-2.5 rounded-full bg-zinc-950"
                                            :style="{
                                                width: `${selectedLead.score}%`,
                                            }"
                                        />
                                    </div>
                                </div>

                                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div
                                            class="flex items-center gap-2 text-sm text-zinc-500"
                                        >
                                            <Mail class="h-4 w-4" />
                                            Email
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.email }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div
                                            class="flex items-center gap-2 text-sm text-zinc-500"
                                        >
                                            <Phone class="h-4 w-4" />
                                            Number
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.phone }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Username
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            @{{ selectedLead.username }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Age
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.age }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Company
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.company }} -
                                            {{ selectedLead.companySize }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Location
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.city }}
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-5">
                                    <div
                                        class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                    >
                                        Tags
                                    </div>
                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <span
                                            v-for="tag in selectedLead.tags"
                                            :key="tag"
                                            class="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700"
                                        >
                                            {{ tag }}
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </section>

                        <section
                            class="rounded-[34px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-6"
                        >
                            <div
                                class="flex items-center justify-between gap-3"
                            >
                                <div>
                                    <p
                                        class="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase"
                                    >
                                        Next actions
                                    </p>
                                    <h2
                                        class="mt-2 text-2xl font-semibold tracking-tight text-zinc-950"
                                    >
                                        What sales should do next.
                                    </h2>
                                </div>
                                <div
                                    class="rounded-full border border-zinc-200 bg-[#f6f4ef] px-3 py-2 text-xs font-semibold text-zinc-700"
                                >
                                    Follow-up
                                </div>
                            </div>

                            <div class="mt-5 space-y-3">
                                <article
                                    v-for="action in selectedLeadActions"
                                    :key="action.title"
                                    class="flex items-start justify-between gap-4 rounded-[24px] border border-zinc-200 p-4"
                                >
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white"
                                        >
                                            <component
                                                :is="action.icon"
                                                class="h-4 w-4"
                                            />
                                        </div>
                                        <div>
                                            <div
                                                class="text-sm font-semibold text-zinc-950"
                                            >
                                                {{ action.title }}
                                            </div>
                                            <div
                                                class="mt-1 text-sm text-zinc-600"
                                            >
                                                {{ action.detail }}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight
                                        class="mt-1 h-4 w-4 text-zinc-400"
                                    />
                                </article>
                            </div>
                        </section>

                        <section
                            class="rounded-[34px] border border-zinc-200 bg-zinc-950 p-5 text-white shadow-[0_20px_60px_rgba(24,24,27,0.12)] sm:p-6"
                        >
                            <p
                                class="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase"
                            >
                                CSV-ready fields
                            </p>
                            <h2
                                class="mt-3 text-2xl font-semibold tracking-tight"
                            >
                                Structure prepared for admin uploads later.
                            </h2>
                            <p class="mt-3 text-sm leading-7 text-zinc-300">
                                Once CSV import is connected, these are the core
                                fields this UI is already ready to display.
                            </p>

                            <div class="mt-5 flex flex-wrap gap-2">
                                <span
                                    v-for="field in csvFields"
                                    :key="field"
                                    class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-100"
                                >
                                    {{ field }}
                                </span>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    </PublicLayout>
</template>
