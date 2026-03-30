<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import {
    ArrowUpRight,
    CalendarClock,
    CheckCheck,
    ChevronRight,
    Download,
    Filter,
    Inbox,
    Mail,
    Phone,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Users,
} from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
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
type SavedViewKey =
    | 'all'
    | 'reply'
    | 'priority'
    | 'qualified'
    | 'founder';

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

type LeadMeta = {
    createdAt: string;
    ownershipSince: string;
    nextActionDue: string;
    reminderAt: string;
    statusContext: string;
};

type LeadNote = {
    author: string;
    time: string;
    body: string;
};

type LeadActivityItem = {
    title: string;
    detail: string;
    time: string;
};

const page = usePage();
const auth = computed(() => page.props.auth);

const demoLeads: Lead[] = [
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

const leads = computed(() => {
    const pageLeads = (page.props as { leads?: Lead[] }).leads;

    return Array.isArray(pageLeads) ? pageLeads : demoLeads;
});

const savedViews = [
    {
        key: 'all' as SavedViewKey,
        label: 'All leads',
        description: 'Full working queue',
    },
    {
        key: 'reply' as SavedViewKey,
        label: 'Reply due',
        description: 'Needs follow-up today',
    },
    {
        key: 'priority' as SavedViewKey,
        label: 'High priority',
        description: 'Hot and urgent accounts',
    },
    {
        key: 'qualified' as SavedViewKey,
        label: 'Qualified + negotiation',
        description: 'Late-stage review',
    },
    {
        key: 'founder' as SavedViewKey,
        label: 'Founder-led',
        description: 'Executive attention accounts',
    },
] as const;

const leadMetaById: Record<number, LeadMeta> = {
    1: {
        createdAt: 'Today, 8:20 AM',
        ownershipSince: 'Owned by Areeb for 3h',
        nextActionDue: 'Today, 4:00 PM',
        reminderAt: 'Follow up by 4:00 PM',
        statusContext: 'Qualified after inbound request and pricing interest.',
    },
    2: {
        createdAt: 'Yesterday, 2:15 PM',
        ownershipSince: 'Owned by Mehak for 1 day',
        nextActionDue: 'Tomorrow, 11:30 AM',
        reminderAt: 'Review tomorrow',
        statusContext: 'Contacted and waiting for pricing summary review.',
    },
    3: {
        createdAt: 'Today, 9:10 AM',
        ownershipSince: 'Owned by Areeb for 2h',
        nextActionDue: 'Today, 5:30 PM',
        reminderAt: 'Send case study today',
        statusContext: 'Referral lead with strong agency fit and quick response window.',
    },
    4: {
        createdAt: 'Today, 11:05 AM',
        ownershipSince: 'Owned by Hoor for 20m',
        nextActionDue: 'Today, 6:00 PM',
        reminderAt: 'Verify fit today',
        statusContext: 'Fresh outbound record pending decision-maker validation.',
    },
    5: {
        createdAt: 'Yesterday, 4:45 PM',
        ownershipSince: 'Owned by Mehak for 18h',
        nextActionDue: 'Today, 3:30 PM',
        reminderAt: 'Proposal follow-up at 3:30 PM',
        statusContext: 'Negotiation stage after proposal delivery and warm reply.',
    },
    6: {
        createdAt: 'Today, 7:50 AM',
        ownershipSince: 'Owned by Hoor for 4h',
        nextActionDue: 'Today, 2:00 PM',
        reminderAt: 'Founder intro at 2:00 PM',
        statusContext: 'Founder-led account with high urgency and clear buying signal.',
    },
    7: {
        createdAt: '3 days ago, 1:10 PM',
        ownershipSince: 'Owned by Areeb for 3 days',
        nextActionDue: 'Tomorrow, 9:00 AM',
        reminderAt: 'Nurture tomorrow',
        statusContext: 'Contacted lead that needs re-engagement before it cools further.',
    },
    8: {
        createdAt: 'Today, 8:55 AM',
        ownershipSince: 'Owned by Mehak for 5h',
        nextActionDue: 'Tomorrow, 10:00 AM',
        reminderAt: 'Prepare sample by tomorrow',
        statusContext: 'Qualified outbound lead waiting on tailored list sample.',
    },
};

const leadNotesById: Record<number, LeadNote[]> = {
    1: [
        {
            author: 'Areeb Khan',
            time: 'Today, 10:15 AM',
            body: 'Asked for a qualification call and mentioned the team is comparing two vendors this week.',
        },
        {
            author: 'Ops',
            time: 'Today, 8:45 AM',
            body: 'Inbound form included monthly lead target and team size, so fit score moved up quickly.',
        },
    ],
    2: [
        {
            author: 'Mehak Ali',
            time: 'Yesterday, 5:05 PM',
            body: 'Requested a concise pricing overview rather than a full deck.',
        },
    ],
    3: [
        {
            author: 'Areeb Khan',
            time: 'Today, 11:00 AM',
            body: 'Referral source says they want campaign examples before routing internally.',
        },
    ],
    4: [
        {
            author: 'Hoor Fatima',
            time: 'Today, 11:20 AM',
            body: 'Need to confirm whether Fahad owns budget or is only evaluating options.',
        },
    ],
    5: [
        {
            author: 'Mehak Ali',
            time: 'Today, 9:30 AM',
            body: 'Proposal landed well. Follow-up should focus on implementation scope and timing.',
        },
        {
            author: 'Finance',
            time: 'Yesterday, 6:15 PM',
            body: 'Commercial terms are ready if they ask for annual pricing detail.',
        },
    ],
    6: [
        {
            author: 'Hoor Fatima',
            time: 'Today, 10:10 AM',
            body: 'Founder asked for a direct intro and a quick list sample before the call.',
        },
    ],
    7: [
        {
            author: 'Areeb Khan',
            time: 'Yesterday, 4:00 PM',
            body: 'No reply to last benchmark email. Queue for a lighter re-engagement note tomorrow morning.',
        },
    ],
    8: [
        {
            author: 'Mehak Ali',
            time: 'Today, 12:10 PM',
            body: 'Strong fit, but they want the sample tailored to demand gen leadership roles first.',
        },
    ],
};

const leadActivityById: Record<number, LeadActivityItem[]> = {
    1: [
        {
            title: 'Qualification call requested',
            detail: 'Amna asked for times this afternoon after reviewing the overview.',
            time: '2h ago',
        },
        {
            title: 'Owner assigned',
            detail: 'Areeb took ownership after the inbound form was scored high intent.',
            time: '3h ago',
        },
    ],
    2: [
        {
            title: 'Pricing note added',
            detail: 'Requested a short summary instead of a full proposal.',
            time: 'Yesterday',
        },
    ],
    3: [
        {
            title: 'Referral confirmed',
            detail: 'Source validated agency fit and introduced the buyer internally.',
            time: '30m ago',
        },
        {
            title: 'Case study queued',
            detail: 'Campaign example is the agreed next step.',
            time: '1h ago',
        },
    ],
    4: [
        {
            title: 'New outbound record added',
            detail: 'Lead entered queue from outbound list and is pending fit verification.',
            time: 'Just now',
        },
    ],
    5: [
        {
            title: 'Proposal follow-up scheduled',
            detail: 'Reminder set for 3:30 PM with pricing and rollout notes ready.',
            time: '4h ago',
        },
        {
            title: 'Proposal delivered',
            detail: 'PeakLaunch confirmed receipt and requested timing clarity.',
            time: 'Yesterday',
        },
    ],
    6: [
        {
            title: 'Founder intro pending',
            detail: 'Hoor is lining up a short call and sample handoff for this afternoon.',
            time: '1h ago',
        },
    ],
    7: [
        {
            title: 'Re-engagement queued',
            detail: 'Benchmark email underperformed, so the next touch is being reframed.',
            time: '3d ago',
        },
    ],
    8: [
        {
            title: 'Sample request added',
            detail: 'Custom list sample requested for demand gen leadership targeting.',
            time: '5h ago',
        },
    ],
};

const searchTerm = ref('');
const selectedView = ref<SavedViewKey>('all');
const selectedSource = ref<'All' | LeadSource>('All');
const selectedStatus = ref<'All' | LeadStatus>('All');
const selectedLeadId = ref(0);

watch(
    leads,
    (records) => {
        if (records.length === 0) {
            selectedLeadId.value = 0;
            return;
        }

        if (!records.some((lead) => lead.id === selectedLeadId.value)) {
            selectedLeadId.value = records[0].id;
        }
    },
    { immediate: true },
);

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

const matchesSavedView = (lead: Lead): boolean => {
    switch (selectedView.value) {
        case 'reply':
            return lead.needsReply;
        case 'priority':
            return lead.priority === 'High';
        case 'qualified':
            return (
                lead.status === 'Qualified' || lead.status === 'Negotiation'
            );
        case 'founder':
            return (
                lead.role === 'Founder' || lead.tags.includes('Founder-led')
            );
        case 'all':
        default:
            return true;
    }
};

const filteredLeads = computed(() => {
    const term = searchTerm.value.trim().toLowerCase();

    return leads.value.filter((lead) => {
        const matchesView = matchesSavedView(lead);
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

        return matchesView && matchesTerm && matchesSource && matchesStatus;
    });
});

const savedViewCounts = computed<Record<SavedViewKey, number>>(() => ({
    all: leads.value.length,
    reply: leads.value.filter((lead) => lead.needsReply).length,
    priority: leads.value.filter((lead) => lead.priority === 'High').length,
    qualified: leads.value.filter(
        (lead) =>
            lead.status === 'Qualified' || lead.status === 'Negotiation',
    ).length,
    founder: leads.value.filter(
        (lead) =>
            lead.role === 'Founder' || lead.tags.includes('Founder-led'),
    ).length,
}));

const selectedLead = computed(
    () =>
        filteredLeads.value.find((lead) => lead.id === selectedLeadId.value) ||
        filteredLeads.value[0] ||
        null,
);

const selectedLeadMeta = computed(() =>
    selectedLead.value ? leadMetaById[selectedLead.value.id] : null,
);

const selectedLeadNotes = computed(() =>
    selectedLead.value ? leadNotesById[selectedLead.value.id] ?? [] : [],
);

const selectedLeadActivity = computed(() =>
    selectedLead.value ? leadActivityById[selectedLead.value.id] ?? [] : [],
);

const reminderLeads = computed(() =>
    leads.value
        .filter((lead) => lead.needsReply)
        .map((lead) => ({
            id: lead.id,
            fullName: lead.fullName,
            owner: lead.owner,
            reminderAt: leadMetaById[lead.id].reminderAt,
            nextStep: lead.nextStep,
        })),
);

const selectedLeadActionCards = computed(() => {
    if (!selectedLead.value || !selectedLeadMeta.value) {
        return [];
    }

    return [
        {
            title: selectedLead.value.nextStep,
            detail: `${selectedLeadMeta.value.nextActionDue} | ${selectedLead.value.owner}`,
            icon: ArrowUpRight,
        },
        {
            title: `Reply to ${selectedLead.value.fullName.split(' ')[0]}`,
            detail: `Last touch ${selectedLead.value.lastTouch} | ${selectedLeadMeta.value.reminderAt}`,
            icon: Mail,
        },
        {
            title: `Route ${selectedLead.value.company} to sales`,
            detail: `${selectedLead.value.source} source | ${selectedLead.value.priority} priority`,
            icon: CheckCheck,
        },
    ];
});

const totalLeads = computed(() => leads.value.length);
const hotLeads = computed(
    () => leads.value.filter((lead) => lead.score >= 90).length,
);
const responseDue = computed(
    () => leads.value.filter((lead) => lead.needsReply).length,
);
const averageScore = computed(() => {
    if (leads.value.length === 0) {
        return 0;
    }

    return Math.round(
        leads.value.reduce((total, lead) => total + lead.score, 0) /
            leads.value.length,
    );
});

const hasNoLeads = computed(() => totalLeads.value === 0);

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
        count: leads.value.filter((lead) => lead.status === stage.key).length,
    }));
});

const sourcePerformance = computed(() => {
    const grouped = sourceOptions
        .filter((source): source is LeadSource => source !== 'All')
        .map((source) => {
            const sourceLeads = leads.value.filter(
                (lead) => lead.source === source,
            );
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
                    v-if="hasNoLeads"
                    class="rounded-[34px] border border-zinc-200 bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:px-8"
                >
                    <div
                        class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-[#faf9f6] text-zinc-700"
                    >
                        <Inbox class="h-6 w-6" />
                    </div>
                    <h2
                        class="mt-5 text-2xl font-semibold tracking-tight text-zinc-950"
                    >
                        No leads yet.
                    </h2>
                    <p
                        class="mx-auto mt-2 max-w-xl text-sm leading-7 text-zinc-600"
                    >
                        They will appear here once assigned.
                    </p>
                </section>

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
                                        Follow-up reminders
                                    </div>
                                    <div class="mt-4 space-y-3">
                                        <article
                                            v-for="item in reminderLeads"
                                            :key="item.id"
                                            class="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3"
                                        >
                                            <div
                                                class="flex items-start justify-between gap-3"
                                            >
                                                <div>
                                                    <div
                                                        class="text-sm font-semibold text-white"
                                                    >
                                                        {{ item.fullName }}
                                                    </div>
                                                    <div
                                                        class="mt-1 text-sm text-zinc-300"
                                                    >
                                                        {{ item.nextStep }}
                                                    </div>
                                                </div>
                                                <div
                                                    class="text-right text-xs font-medium text-zinc-400"
                                                >
                                                    {{ item.reminderAt }}
                                                </div>
                                            </div>
                                            <div
                                                class="mt-2 text-xs text-zinc-400"
                                            >
                                                Owner {{ item.owner }}
                                            </div>
                                        </article>
                                    </div>
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
                                        totalLeads === 0
                                            ? 0
                                            : Math.round(
                                                  (stage.count / totalLeads) *
                                                      100,
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
                                <div
                                    class="flex flex-wrap gap-2 xl:max-w-[520px] xl:justify-end"
                                >
                                    <button
                                        v-for="view in savedViews"
                                        :key="view.key"
                                        type="button"
                                        @click="selectedView = view.key"
                                        :class="[
                                            'cursor-pointer rounded-2xl border px-3 py-2 text-left transition',
                                            selectedView === view.key
                                                ? 'border-zinc-950 bg-zinc-950 text-white'
                                                : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950',
                                        ]"
                                    >
                                        <div class="text-xs font-semibold">
                                            {{ view.label }}
                                        </div>
                                        <div
                                            :class="[
                                                'mt-1 text-[11px]',
                                                selectedView === view.key
                                                    ? 'text-zinc-300'
                                                    : 'text-zinc-500',
                                            ]"
                                        >
                                            {{
                                                savedViewCounts[view.key]
                                            }}
                                            records | {{ view.description }}
                                        </div>
                                    </button>
                                </div>
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
                                    Saved filters active
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

                                        <div class="mt-4 flex flex-wrap gap-2">
                                            <span
                                                class="rounded-full border border-zinc-200 bg-[#faf9f6] px-3 py-1.5 text-xs font-medium text-zinc-600"
                                            >
                                                {{ leadMetaById[lead.id].ownershipSince }}
                                            </span>
                                            <span
                                                class="rounded-full border border-zinc-200 bg-[#faf9f6] px-3 py-1.5 text-xs font-medium text-zinc-600"
                                            >
                                                {{ leadMetaById[lead.id].statusContext }}
                                            </span>
                                            <span
                                                v-if="lead.needsReply"
                                                class="rounded-full border border-zinc-950 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white"
                                            >
                                                {{ leadMetaById[lead.id].reminderAt }}
                                            </span>
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
                                                Due {{ leadMetaById[lead.id].nextActionDue }}
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
                                        class="rounded-[22px] border border-zinc-200 bg-white p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Status context
                                        </div>
                                        <div
                                            class="mt-2 text-sm leading-7 text-zinc-700"
                                        >
                                            {{ selectedLeadMeta?.statusContext }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 bg-white p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Reminder
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLeadMeta?.reminderAt }}
                                        </div>
                                        <div class="mt-1 text-xs text-zinc-500">
                                            Next action due
                                            {{ selectedLeadMeta?.nextActionDue }}
                                        </div>
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

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Owner
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLead.owner }}
                                        </div>
                                        <div class="mt-1 text-xs text-zinc-500">
                                            {{ selectedLeadMeta?.ownershipSince }}
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-[22px] border border-zinc-200 p-4"
                                    >
                                        <div class="text-sm text-zinc-500">
                                            Lead created
                                        </div>
                                        <div
                                            class="mt-2 text-sm font-medium text-zinc-950"
                                        >
                                            {{ selectedLeadMeta?.createdAt }}
                                        </div>
                                        <div class="mt-1 text-xs text-zinc-500">
                                            Last touch {{ selectedLead.lastTouch }}
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

                                <div class="mt-5">
                                    <div
                                        class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                    >
                                        Lead notes
                                    </div>
                                    <div class="mt-3 space-y-3">
                                        <article
                                            v-for="note in selectedLeadNotes"
                                            :key="`${note.author}-${note.time}`"
                                            class="rounded-[22px] border border-zinc-200 bg-white p-4"
                                        >
                                            <div
                                                class="flex items-center justify-between gap-3"
                                            >
                                                <div
                                                    class="text-sm font-semibold text-zinc-950"
                                                >
                                                    {{ note.author }}
                                                </div>
                                                <div class="text-xs text-zinc-500">
                                                    {{ note.time }}
                                                </div>
                                            </div>
                                            <div
                                                class="mt-3 text-sm leading-7 text-zinc-600"
                                            >
                                                {{ note.body }}
                                            </div>
                                        </article>
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

                            <div
                                v-if="selectedLead && selectedLeadMeta"
                                class="mt-5 rounded-[26px] border border-zinc-200 bg-[#faf9f6] p-5"
                            >
                                <div
                                    class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                                >
                                    <div>
                                        <div
                                            class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                        >
                                            Primary next step
                                        </div>
                                        <div
                                            class="mt-3 text-xl font-semibold tracking-tight text-zinc-950"
                                        >
                                            {{ selectedLead.nextStep }}
                                        </div>
                                        <div
                                            class="mt-2 text-sm leading-7 text-zinc-600"
                                        >
                                            {{ selectedLeadMeta.statusContext }}
                                        </div>
                                    </div>
                                    <div
                                        class="rounded-[20px] border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 sm:text-right"
                                    >
                                        <div class="font-medium text-zinc-950">
                                            {{ selectedLeadMeta.nextActionDue }}
                                        </div>
                                        <div class="mt-1">
                                            Owner {{ selectedLead.owner }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5 space-y-3">
                                <article
                                    v-for="action in selectedLeadActionCards"
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
                                Recent activity
                            </p>
                            <h2
                                class="mt-3 text-2xl font-semibold tracking-tight"
                            >
                                Timeline for the selected lead.
                            </h2>
                            <p class="mt-3 text-sm leading-7 text-zinc-300">
                                A clearer activity trail helps sales and ops
                                understand what changed, who touched the lead,
                                and what should happen next.
                            </p>

                            <div class="mt-5 space-y-3">
                                <article
                                    v-for="item in selectedLeadActivity"
                                    :key="`${item.title}-${item.time}`"
                                    class="rounded-[22px] border border-white/10 bg-white/5 p-4"
                                >
                                    <div
                                        class="flex items-start justify-between gap-3"
                                    >
                                        <div class="text-sm font-semibold text-white">
                                            {{ item.title }}
                                        </div>
                                        <div class="text-xs text-zinc-400">
                                            {{ item.time }}
                                        </div>
                                    </div>
                                    <div
                                        class="mt-3 text-sm leading-7 text-zinc-300"
                                    >
                                        {{ item.detail }}
                                    </div>
                                </article>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    </PublicLayout>
</template>
